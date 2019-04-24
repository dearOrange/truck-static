import Vue from 'vue'
import config from '@/config'
import { decamelize } from '@utils'
const requireAll = context => context.keys().map(context)

let commonComps = require.context('@components/common/', true, /\/index.vue$/)

requireAll(commonComps).forEach(({ default: item }) => {
  const name = item.name || /(\S+\/)(\S+)\.vue/.exec(item.hotID)[2]
  Vue.component(`${config.componentPrefix}-${decamelize(name)}`, item)
})
