// Generated by cli
import DatePicker from '@blocks/date-picker'
import GtTablePagination from '@blocks/gt-table-pagination'
import GtExample from '@components/gt-example'
import GtInput from '@components/gt-input'
import GtTable from '@components/gt-table'

export { DatePicker, GtTablePagination, GtExample, GtInput, GtTable }

function install(Vue) {
  ;[
    'DatePicker',
    'GtTablePagination',
    'GtExample',
    'GtInput',
    'GtTable',
  ].forEach(lib => {
    Vue.use(lib, lib)
  })
}

export default {
  version: '0.1.5',
  install,
  DatePicker,
  GtTablePagination,
  GtExample,
  GtInput,
  GtTable,
}
