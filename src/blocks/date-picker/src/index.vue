<template lang="pug">
div
  el-date-picker(
    style="width: 178px",
    :type="dateType",
    :value-format="valueFormat",
    placeholder="开始时间",
    :picker-options="startTimePickerOpt",
    @change="changeStartTime",
    v-model="startValue",
    v-bind="$attrs"
  )
  span.mr-5.ml-5 至
  el-date-picker(
    style="width: 178px",
    :type="dateType",
    placeholder="结束时间",
    :value-format="valueFormat",
    @change="changeEndTime",
    v-model="endValue",
    :picker-options="endTimePickerOpt",
    v-bind="$attrs"
  )
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'DatePicker',
  props: {
    startKey: {
      type: String,
      default: 'start_time',
    },
    endKey: {
      type: String,
      default: 'end_time',
    },
    query: {
      type: Object,
      default: () => ({}),
    },
    disabledStartDate: {
      type: Function,
      default: null,
    },
    disabledEndDate: {
      type: Function,
      default: null,
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    dateType: {
      type: String,
      default: 'date',
    },
  },
  data() {
    return {
      startValue: this.query[this.startKey] || '',
      endValue: this.query[this.endKey] || '',
      startTimePickerOpt: {
        disabledDate: time => {
          let customFlag = false
          this.disabledStartDate &&
            (customFlag = this.disabledStartDate(time, this.endValue))
          return dayjs(time).isAfter(dayjs(this.endValue)) || customFlag
        },
      },
      endTimePickerOpt: {
        disabledDate: time => {
          let customFlag = false
          this.disabledEndDate &&
            (customFlag = this.disabledEndDate(time, this.startValue))
          return dayjs(time).isBefore(dayjs(this.startValue)) || customFlag
        },
      },
    }
  },
  watch: {
    startValue(n) {
      const query = this.query
      query[this.startKey] = n
      this.$emit('update:query', query)
    },
    endValue(n) {
      const query = this.query
      query[this.endKey] = n
      this.$emit('update:query', query)
    },
    query: {
      deep: true,
      handler(n) {
        this.startValue = n[this.startKey]
        this.endValue = n[this.endKey]
      },
    },
  },
  methods: {
    changeStartTime(value) {
      if (value && dayjs(value).isAfter(this.endValue)) {
        this.startValue = this.endValue
      }
      this.$emit('changeStartTime', value)
    },
    changeEndTime(value) {
      if (value && dayjs(value).isBefore(this.startValue)) {
        this.endValue = this.startValue
      }
      this.$emit('changeEndTime', value)
    },
    reset() {
      this.startValue = ''
      this.endValue = ''
    },
  },
}
</script>
