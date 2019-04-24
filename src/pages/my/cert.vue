<template>
  <div class="cert">
    <my-cert v-for="(item, index) in identify" :key="index" :item="item"></my-cert>
  </div>
</template>

<script>
import MyCert from '@components/my/cert/cert.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Cert',
  components: {
    MyCert
  },
  computed: {
    ...mapGetters({ info: 'getUser' })
  },
  data() {
    return {
      identify: [
        {
          name: '个人认证',
          icon: 'renzhengchenggong1',
          indent: () => {
            return this.info.realNameCertified === 1 ? true : false
          },
          isIdentify: '去认证'
        },
        {
          name: '车辆认证',
          icon: 'cheliangrenzheng',
          indent: () => {
            return this.info.realNameCertified === 1 ? false : true
          },
          isIdentify: '去认证'
        },
        {
          name: '实地认证',
          icon: 'shidirenzheng',
          indent: () => {
            return this.info.realNameCertified === 1 ? false : true
          },
          isIdentify: '待审核'
        },
        {
          name: '货源认证',
          icon: 'huoyuan1',
          indent: () => {
            return this.info.realNameCertified === 1 ? false : true
          },
          isIdentify: '去看看'
        }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
.cert {
  padding: 38px 50px 30px;
  background: #fff;
}
</style>


