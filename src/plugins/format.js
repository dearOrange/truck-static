import { format } from 'date-fns'

export default {
  install: function(vm) {
    vm.prototype.$dateFormat = format
  }
}
