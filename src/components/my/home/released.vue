<template>
  <div class="released">
    <template v-if="loading">
      <cool-link-loading></cool-link-loading>
    </template>

    <template v-else>
      <cool-link-empty v-if="isEmpty"></cool-link-empty>
      <cool-link-error v-else-if="isError" type="nopic" :message="this.list.message"></cool-link-error>
      <template v-else>
        <li v-for="(item,index) in list" :key="index">
          <released-item
            :data="item"
            @deleteOne="deleteOne"
            @editOne="editOne"
            @refreshOne="refreshOne"
          ></released-item>
        </li>
      </template>
    </template>
  </div>
</template>

<script>
import ReleasedItem from './released-item.vue'
import OnlineTrade from '@components/my/home/online-trade.vue'
import myApi from '@/api/my'
import depotApi from '@/api/depot'
import rentApi from '@/api/rent'
import { fmtDate } from '@/utils/date'

import asyncFetchMixin from '@/mixins/async-fetch'
import reactiveFetchMixin from '@/mixins/reactive-fetch'
import Dialog from '@components/common/dialog'

export default {
  name: 'Released',
  mixins: [asyncFetchMixin(myApi.getRecentDepotList), reactiveFetchMixin],
  components: {
    ReleasedItem,
    OnlineTrade
  },
  data() {
    return {}
  },
  methods: {
    deleteOne(val) {
      Dialog.confirm('是否删除', {
        confirm: {
          ok: () => {
            if (val.relatedDataType === 'SR') {
              myApi.deleteRent(val.ukid).then(({ success }) => {
                if (success) {
                  this.refresh()
                }
              })
            } else if (val.relatedDataType === 'SL') {
              myApi.deleteDepot(val.ukid).then(({ success }) => {
                if (success) {
                  this.refresh()
                }
              })
            } else {
              return
            }
          }
        }
      })
    },
    editOne(val) {
      if (val.relatedDataType === 'SR') {
        rentApi.getDetail(val.ukid).then(({ success, data }) => {
          if (success) {
            data.planEnterDate = fmtDate(data.planEnterDate)
            this.$router.push({
              name: 'pubreq',
              params: { dataNum: data, id: val.ukid, marks: 'ptSokTwo' }
            })
          }
        })
      } else if (val.relatedDataType === 'SL') {
        depotApi.getDepot(val.ukid).then(({ success, data }) => {
          if (success) {
            data.buildDate = fmtDate(data.buildDate)
            this.$router.push({
              name: 'pubinfo',
              params: { dataNum: data, id: val.ukid, marks: 'ptSokOne' }
            })
          }
        })
      } else {
        return
      }
    },
    refreshOne(val) {
      if (val.relatedDataType === 'SR') {
        myApi.refreshRent(val.ukid).then(({ success }) => {
          if (success) {
            this.refresh()
          }
        })
      } else if (val.relatedDataType === 'SL') {
        myApi.refreshDepot(val.ukid).then(({ success }) => {
          if (success) {
            this.refresh()
          }
        })
      } else {
        return
      }
    }
  },
  mounted() {}
}
</script>

