<template lang="pug">
.table-pagination
  gt-table(
    v-loading="loading",
    :class="showBadge ? 'badge-table' : ''",
    :tableProps="tableOption.tableProps",
    :tableEvents="tableEvents",
    :columns="tableOption.columns",
    :actions="tableOption.actions",
    :headers="tableOption.headers",
    :data="data",
    @init="table => ($elTable = table)"
  )
  //- 页面刷新时total为0，此时如果query.page > 1页数渲染也只能渲染第一页，所以加入了v-if的判断
  el-pagination.mt-20(
    v-if="total",
    background,
    :pager-count="pagerCount",
    :layout="layout",
    :total="total",
    :current-page="query[this.pageKey]",
    :page-size="query[this.sizeKey]",
    :page-sizes="pageSizes",
    @size-change="sizeChange",
    @current-change="onCurrentPageChange"
  )
</template>

<script>
import gtTable from '@/components/gt-table'
import deleteEmptyProps from '@/utils/deleteEmptyProps.js'
import { Base64 } from 'js-base64'

function defaultPaginationProps() {
  return {
    page: 'page',
    size: 'count',
    total: 'total',
  }
}

export default {
  name: 'GtTablePagination',
  components: { gtTable },
  props: {
    name: {
      type: String,
      default: 'table',
    },
    layout: {
      type: String,
      default: '->, total, prev, pager, next, jumper',
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100],
    },
    // tableOption中属性有：id、selectedIdList、selectedList、tableProps、tableEvents、columns、actions、serviceUrl、fetch、data、loading(当传入data时表示前端分页，table-pagination不再发ajax请求，不需要loading可指定loading:false)
    tableOption: {
      type: Object,
      required: true,
    },
    query: {
      type: Object,
      default() {
        return {}
      },
    },
    router: {
      type: Boolean,
      default: true,
    },
    showBadge: {
      type: Boolean,
      default: false,
    },
    fetchImmediate: {
      type: Boolean,
      default: true,
    },
    props: {
      type: Object,
      default: defaultPaginationProps,
    },
    pagerCount: {
      type: Number,
      default: 7,
    },
  },
  data() {
    return {
      loading: false,
      $elTable: null,
      data: [],
      total: 0,
      defaultTableEvents: {
        // 选择和取消选id
        select: (selectionList, row) => {
          let { id = 'id', selectedIdList, selectedList } = this.tableOption

          const idx = selectedIdList.findIndex(i => i === row[id])

          if (~idx) {
            selectedIdList.splice(idx, 1)
            selectedList.splice(idx, 1)
          } else {
            selectedIdList.push(row[id])
            selectedList.push(row)
          }
          this.$emit('select')
        },
        'select-all': selectionList => {
          let {
            id = 'id',
            selectedIdList,
            selectedList,
            selectAllMc,
          } = this.tableOption

          if (selectAllMc) {
            ;(selectAllMc.onlyAll ? selectionList.length > 0 : true) &&
              this.$trackEvent({
                ...selectAllMc,
                vm: this,
              })
          }

          if (selectionList.length) {
            // 全选
            selectionList.forEach(select => {
              if (!selectedIdList.includes(select[id])) {
                selectedIdList.push(select[id])
                selectedList.push(select)
              }
            })
          } else {
            // 取消选择
            this.data.forEach(select => {
              let idx = selectedIdList.findIndex(i => i === select[id])
              if (~idx) {
                selectedIdList.splice(idx, 1)
                selectedList.splice(idx, 1)
              }
            })
          }
          this.$emit('select')
        },
      },
    }
  },
  computed: {
    tableEvents() {
      return Object.assign(
        {},
        this.defaultTableEvents,
        this.tableOption.tableEvents,
      )
    },
    pageKey() {
      return this.props.page || 'page'
    },
    sizeKey() {
      return this.props.size || 'count'
    },
    totalKey() {
      return this.props.total || 'total'
    },
  },
  watch: {
    'tableOption.data'() {
      this.fetchData({ [this.pagekey]: 1 })
    },
  },
  created() {
    let initialQuery = {
      [this.pageKey]: 1,
      [this.sizeKey]: 10,
    }
    Object.keys(this.query).forEach(item => {
      let value = this.query[item]
      if (Array.isArray(value)) {
        value = [].concat(value)
      }
      initialQuery[item] = value
    })
    Object.defineProperty(this, 'initialQuery', {
      value: initialQuery,
    })
    if (this.router) {
      let tableQuery = this.$route.query[this.name]
      let tableQueryBase = tableQuery ? Base64.decode(tableQuery) : tableQuery
      let query = JSON.parse(tableQueryBase || '{}')
      if (this.fetchImmediate) this.fetchData(query)
    } else {
      if (this.fetchImmediate) this.fetchData()
    }

    Object.assign(this.tableOption, {
      // 重置（覆盖默认）
      reset: query => this.reset(query),
      // 刷新
      reload: () => this.reload(),
      // 获取数据（覆盖当前，其余条件不变）
      fetchData: query => this.fetchData(query),
    })
  },
  mounted() {
    // 把当前组件实例和el-table组件实例对外提供
    this.$emit('init', this, this.$elTable)
  },
  methods: {
    fetchData(query = {}) {
      query = {
        [this.pageKey]: 1,
        [this.sizeKey]: 10,
        ...this.query,
        ...query,
      }
      // 更新query
      this.$emit('update:query', query)
      // 更新路由的query
      if (this.router) {
        this.$router.replace({
          query: {
            ...this.$route.query,
            [this.name]: Base64.encodeURI(JSON.stringify(query)),
          },
        })
      }
      let { fetch, serviceUrl, data, loading = true } = this.tableOption
      if (fetch || serviceUrl) {
        let fetchPromise = fetch
          ? fetch(deleteEmptyProps(query)) // 列表搜索删除空值
          : this.$http.get(serviceUrl, {
              params: query,
            })

        this.loading = loading ? true : false
        fetchPromise
          .then(res => {
            this.data = res.list
            this.total = res[this.totalKey]
            this.$emit('fetchData', res)
            this.loading = false
            this.initSelect()
          })
          .catch(e => {
            console.error(e)
            this.data = []
            this.total = 0
            this.loading = false
          })
      } else if (data) {
        // let { this.pageKey, size } = query
        let page = +query[this.pageKey] || 1
        let size = +query[this.sizeKey] || 10
        let data = this.tableOption.data
        this.data = data.slice((page - 1) * size, page * size)
        this.total = this.tableOption.data.length
        this.initSelect()
      } else {
        // 后端分页
        throw new Error('table需要data|serviceUrl|fetch')
      }
    },
    reload() {
      this.fetchData()
    },
    reset(query) {
      this.fetchData({
        ...this.initialQuery,
        ...query,
      })
      this.$emit('reset')
    },
    initSelect() {
      let { id = 'id', selectedIdList } = this.tableOption
      if (selectedIdList && selectedIdList.length === 0) {
        let states = this.$elTable.store.states
        states.selection = []
      }
      if (!selectedIdList) return
      this.$nextTick(() => {
        let states = this.$elTable.store.states
        states.selection = this.data.filter(item =>
          selectedIdList.includes(item[id]),
        )
        if (states.selection.length === this.query[this.sizeKey]) {
          states.isAllSelected = true
        }
      })
    },
    sizeChange(size) {
      this.query[this.sizeKey] = size
      this.query[this.pageKey] = 1
      this.reload()
    },
    onCurrentPageChange(page) {
      const vm = this

      if (this.$trackEvent) {
        this.$trackEvent(
          this.tableOption.pageMc
            ? { ...this.tableOption.pageMc, vm }
            : {
                behavior: '翻页',
                value: page,
                vm,
              },
        )
      }
      this.fetchData({ page })
    },
  },
}
</script>
