/**
 * @desc 空对象判断
 *
 * @param {Any} obj
 * @returns {Boolean}
 */
function isEmptyObj(obj) {
  if (typeof obj === 'object' && obj !== null) {
    return !Object.keys(obj).length
  } else {
    return false
  }
}

/**
 * @desc 删除为空的属性
 *
 * @export
 * @param {Object} object
 * @returns
 */
export default function(object) {
  return Object.keys(object).reduce((pre, cur) => {
    if (
      object[cur] !== '' &&
      object[cur] !== null &&
      object[cur] !== void 0 &&
      !isEmptyObj(object[cur])
    ) {
      pre[cur] = object[cur]
    }
    return pre
  }, {})
}
