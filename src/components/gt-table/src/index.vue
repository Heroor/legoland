<script>
import { Table, TableColumn } from 'element-ui'
import gtTableColumn from './gt-table-column'

export default {
  name: 'GtTable',
  components: { Table, gtTableColumn, TableColumn },
  props: {
    tableProps: {
      type: Object,
      default() {
        return {}
      },
    },
    tableEvents: {
      type: Object,
      default() {
        return {}
      },
    },
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      default() {
        return []
      },
    },
    headers: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  mounted() {
    this.$emit('init', this.$refs.gtTable)
  },
  render(h) {
    const vm = this
    const defaultTableProps = {
      // stripe: true,
      size: 'mini',
      'highlight-current-row': true,
    }
    const columns = vm.columns
      .filter(column => !column.hidden || !column.hidden())
      .map(column => {
        // 有些文案长度固定的列 宽度固定写死
        if (column.type === 'expend' || column.type === 'selection') {
          column.width = column.width || '50'
        }
        if (column.type === 'index') {
          column.width = column.width || '80'
        }
        if (column.prop === 'operator' || column.prop === 'name') {
          // 运营商&姓名
          column.width = column.width || '100'
        }
        if (column.prop === 'sex' || column.prop === 'age') {
          // 性别&年龄
          column.width = column.width || '100'
        }
        if (column.prop === 'ip') {
          // IP
          column.width = column.width || '160'
        }
        if (/(.+(-|_)time)|^time$|(time(-|_).+)/.test(column.prop)) {
          // 时间相关
          column.width = column.width || '200'
        }

        if (column.click) {
          return h('TableColumn', {
            props: column,
            scopedSlots: {
              header:
                column.prop &&
                vm.headers[column.prop] &&
                vm.headers[column.prop].render
                  ? scope => vm.headers[column.prop].render(h, scope)
                  : null,
              default: props => {
                if (
                  !column.disabled ||
                  !column.disabled(props.row, props.column, props.$index)
                ) {
                  return h('a', {
                    class: 'link',
                    domProps: {
                      innerHTML: column.formatter
                        ? column.formatter(
                            props.row,
                            props.column,
                            props.$index,
                          )
                        : props.row[column.prop],
                    },
                    on: {
                      click() {
                        column.click(props.row, props.column, props.$index)
                      },
                    },
                  })
                } else {
                  return h('span', {
                    domProps: {
                      innerHTML: column.formatter
                        ? column.formatter(
                            props.row,
                            props.column,
                            props.$index,
                          )
                        : props.row[column.prop],
                    },
                  })
                }
              },
            },
          })
        } else if (column.class) {
          return h('TableColumn', {
            props: column,
            scopedSlots: {
              header:
                column.prop &&
                vm.headers[column.prop] &&
                vm.headers[column.prop].render
                  ? scope => vm.headers[column.prop].render(h, scope)
                  : null,
              default: props => {
                return h('span', {
                  class:
                    typeof column.class === 'function'
                      ? column.class(props.row, props.column, props.$index)
                      : column.class,
                  domProps: {
                    innerHTML: column.formatter
                      ? column.formatter(props.row, props.column, props.$index)
                      : props.row[column.prop],
                  },
                })
              },
            },
          })
        } else if (column.enums) {
          return h('TableColumn', {
            props: column,
            scopedSlots: {
              header:
                column.prop &&
                vm.headers[column.prop] &&
                vm.headers[column.prop].render
                  ? scope => vm.headers[column.prop].render(h, scope)
                  : null,
              default: props => {
                const curEnum =
                  column.enums.find(
                    item => item.value === props.row[column.prop],
                  ) || {}
                return <div class={curEnum.class}>{curEnum.label || '/'}</div>
              },
            },
          })
        } else {
          return h('gtTableColumn', {
            props: {
              columnProps: column,
            },
          })
        }
      })
    let actions = (vm.actions || []).filter(action =>
      vm.$isPermitted(action.auth || action.access),
    )
    const length = actions.length
    if (length > 0) {
      // 如果label 为function 形式，则需要加一个width,表示字符个数
      let fontSize = 12
      if (vm.$el) {
        fontSize = parseInt(
          window.getComputedStyle(vm.$el).getPropertyValue('font-size'),
        )
      }
      const width = actions.reduce((prv, cur) => {
        return prv + (cur.width || cur.label.length) * fontSize + 16
      }, 0)
      const actionProps = vm.headers.$action ? vm.headers.$action.props : {}
      const actionColumn = h('TableColumn', {
        props: {
          width: width + 20,
          label: '操作',
          ...actionProps,
        },
        scopedSlots: {
          header: vm.headers.$action
            ? vm.headers.$action.render
              ? scope => vm.headers.$action.render(h, scope)
              : () =>
                  h(
                    'div',
                    {
                      width: width + 20,
                    },
                    [
                      vm.headers.$action.title || '操作',
                      vm.headers.$action.tips &&
                        h(
                          'el-tooltip',
                          {
                            props: {
                              placement: 'right',
                              content: vm.headers.$action.tips || '操作',
                            },
                          },
                          [h('i', { class: 'ml-10 el-icon-question' })],
                        ),
                    ],
                  )
            : null,
          default: props => {
            return actions
              .filter(
                action =>
                  !action.hidden ||
                  !action.hidden(props.row, props.column, props.$index),
              )
              .map(action => {
                const domPropsHtml =
                  typeof action.label === 'string'
                    ? action.label
                    : action.label(props.row)
                const hasAccess =
                  !action.access ||
                  !props.row._act ||
                  props.row._act.includes(action.access)
                if (
                  !hasAccess ||
                  (action.disabled &&
                    action.disabled(props.row, props.column, props.$index))
                ) {
                  return h('span', {
                    class: 'link disabled mr-10',
                    domProps: {
                      innerHTML: domPropsHtml,
                    },
                  })
                } else {
                  return h('a', {
                    class: 'link mr-10',
                    domProps: {
                      innerHTML: domPropsHtml,
                    },
                    on: {
                      click() {
                        if (vm.$trackEvent) {
                          vm.$trackEvent(
                            action.mc
                              ? { ...action.mc, vm }
                              : {
                                  behavior: domPropsHtml,
                                  value: props.row,
                                  vm,
                                },
                          )
                        }
                        if (action.confirm) {
                          vm.$confirm(action.confirm, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                          }).then(() =>
                            action.click(props.row, props.column, props.$index),
                          )
                        } else {
                          action.click(props.row, props.column, props.$index)
                        }
                      },
                    },
                  })
                }
              })
          },
        },
      })
      columns.push(actionColumn)
    }
    // 可以从window.appData获取表格配置，优先级低于组件直接传入，高于默认配置
    if (!window.appData) {
      window.appData = { config: {} }
    }
    const { gtTable = {} } = window.appData.config.components || {}
    return h(
      'Table',
      {
        props: {
          ...defaultTableProps,
          ...gtTable,
          ...vm.tableProps,
          ...{ data: vm.data },
        },
        on: vm.tableEvents,
        ref: 'gtTable',
      },
      columns,
    )
  },
}
</script>

<style lang="less">
a.link.mr-10 {
  display: inline-block;
  margin-right: 10px;
}
span.link.disabled.mr-10 {
  display: inline-block;
  margin-right: 10px;
  // color: @disabled-color-base;
  text-decoration: underline;
}
span.link {
  display: inline-block;
  margin-right: 5px;
}
</style>
