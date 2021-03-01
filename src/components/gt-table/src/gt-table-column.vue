<script>
import { TableColumn } from 'element-ui'

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function isEmpty(obj) {
  if (isObject(obj)) {
    return !Object.keys(obj).length
  }
}

export default {
  name: 'GtTableColumn',
  components: { TableColumn },
  props: {
    columnProps: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    column() {
      let columnProps = {
        type: 'default',
        resizeble: true,
        formatter(row, column, cell) {
          if (cell || cell === 0 || (isObject(cell) && !isEmpty(cell))) {
            return cell
          } else {
            return '/'
          }
        },
      }

      return {
        ...columnProps,
        ...this.columnProps,
      }
    },
  },
  render(h) {
    let column = this.column
    if (column.render) {
      return h('TableColumn', {
        props: column,
        scopedSlots: {
          default: scope => this.column.render(h, scope),
        },
      })
    } else if (column.component) {
      return h('TableColumn', {
        props: column,
        scopedSlots: {
          default: scope =>
            h(column.component, {
              props: {
                scope: scope,
                cell: scope.row[column.prop],
              },
            }),
        },
      })
    } else {
      return h('TableColumn', {
        props: column,
        key: column.label,
      })
    }
  },
}
</script>
