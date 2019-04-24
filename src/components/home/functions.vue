<template>
  <div class="functions mid-layout">
    <home-functions-item v-for="(item, index) in functionData" :key="index" :dataItem="item"></home-functions-item>
  </div>
</template>

<script>
import HomeFunctionsItem from '@components/home/functions-item.vue'
import HomeApi from '@/api/homepage'
export default {
  name: 'Function',
  components: {
    HomeFunctionsItem
  },
  data() {
    return {
      functionData: [
        {
          pic: require('@/assets/img/zhaolengku.png'),
          subtext: '找冷库',
          suptext: '125698吨冷库容量',
          routeName: '/depot/list'
        },
        {
          pic: require('@/assets/img/lengkuqiuzu.png'),
          subtext: '冷库求租',
          suptext: '5698条求租信息',
          routeName: '/rent/list'
        }
        // {
        //   pic: require('@/assets/img/dituzhaoche.png'),
        //   subtext: '找车',
        //   suptext: '3498条运输线路',
        //   routeName: ''
        // },
        // {
        //   pic: require('@/assets/img/zhaoche.png'),
        //   subtext: '货源求车',
        //   suptext: '43498吨货求运走',
        //   routeName: ''
        // }
      ]
    }
  },
  methods: {
    async getList() {
      let { success, data } = await HomeApi.getHomeData()
      if (success) {
        this.functionData = [
          {
            pic: require('@/assets/img/zhaolengku.png'),
            subtext: '找冷库',
            suptext: data[0] + '万吨冷库容量',
            routeName: '/depot/list'
          },
          {
            pic: require('@/assets/img/lengkuqiuzu.png'),
            subtext: '冷库求租',
            suptext: data[1] + '条求租信息',
            routeName: '/rent/list'
          }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="postcss">
.functions {
  display: flex;
  justify-content: space-around;
  padding: 54px 100px;
}
</style>


