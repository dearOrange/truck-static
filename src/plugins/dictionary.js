import commonApi from '@/api/common'
import config from '@/config'
import { isArray, curry, find, toUpper } from 'lodash'

let getDicts = commonApi.getDicts

async function formatter(dict, key) {
  let { success, data: list } = await getDicts(dict)
  if (success) {
    let foundItem = find(list, item => {
      // console.log(`${toUpper(item[config.dict.key])} === ${toUpper(key)}`)
      return toUpper(item[config.dict.key]) === toUpper(key)
    })
    if (foundItem) {
      return foundItem[config.dict.val]
    } else {
      return ''
    }
  }
  return ''
}

export default {
  install: function(Vue) {
    Vue.prototype.$dict = function(dict, keys) {
      let curryFormatter = curry(formatter)(dict)
      if (isArray(keys)) {
        return keys.map(key => {
          return curryFormatter(key)
        })
      } else {
        return curryFormatter(keys)
      }
    }

    Vue.component(`${config.componentPrefix}-dict`, {
      components: {
        'dict-value': {
          render(createElement) {
            return createElement('span', this.realValue)
          },
          props: {
            value: {
              type: [Promise],
              required: true
            }
          },
          data() {
            return {
              realValue: ''
            }
          },
          mounted() {
            if (this.value) {
              this.value.then(value => {
                this.realValue = value
              })
            }
          }
        }
      },

      render(createElement) {
        let curryFormatter = curry(formatter)(this.dict)
        let values

        if (isArray(this.keys)) {
          values = this.keys.map(item => {
            return curryFormatter(item)
          })
        } else {
          values = [curryFormatter(this.keys)]
        }
        return createElement(
          'div',
          values.map((item, index) => {
            return createElement('span', [
              index === 0
                ? null
                : createElement(
                    'span',
                    {
                      style: {
                        margin: '0 3px'
                      }
                    },
                    '|'
                  ),
              createElement(`dict-value`, {
                props: {
                  value: item
                }
              })
            ])
          })
        )
      },

      props: {
        dict: {
          type: String,
          required: true
        },
        keys: {
          type: [Array, String],
          required: true
        }
      }
    })
  }
}
