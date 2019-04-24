<template>
  <div>
    <cool-link-header/>
    <div class="pub-container">
      <div class="pubreq">
        <div class="pub-t">
          <h2>发布出租信息</h2>
        </div>
        <div class="basr-file">
          <PubReqBaseFile :baseTxt="'基本资料'">
            <template slot="fileFrom">
              <PubRentForm :data="data" ref="form1"></PubRentForm>
            </template>
          </PubReqBaseFile>
          <PubReqBaseFile :baseTxt="'设施及服务'">
            <template slot="fileFrom">
              <PubServerForm :data="data" ref="form2"></PubServerForm>
            </template>
          </PubReqBaseFile>
          <PubReqBaseFile :baseTxt="'出租相关'">
            <template slot="fileFrom">
              <PubRentTime :data="data" ref="form3"></PubRentTime>
            </template>
          </PubReqBaseFile>
          <PubReqBaseFile :baseTxt="'联系人信息'">
            <template slot="fileFrom">
              <PubReqPerForm :data="data" ref="form4"></PubReqPerForm>
            </template>
          </PubReqBaseFile>
          <PubSubmit @continueRelease="continueRelease" :isSave="isSave" @saveDrafts="saveDrafts"/>
        </div>
      </div>
    </div>
    <cool-link-footer/>
  </div>
</template>

<script>
import PubReqBaseFile from '@components/pubreq/base-file.vue'
import PubReqFileFrom from '@components/pubreq/file-from.vue'
import PubReqDescForm from '@components/pubreq/desc-form.vue'
import PubReqEnterForm from '@components/pubreq/enter-form.vue'
import PubReqPerForm from '@components/pubreq/personal-form.vue'
import PubRentForm from '@components/pubreq/rent-form.vue'
import PubServerForm from '@components/pubreq/server-form.vue'
import PubRentTime from '@components/pubreq/rent-time.vue'
import PubSubmit from '@components/pubreq/submit.vue'
import publishApi from '@/api/publish'
import Dialog from '@components/common/dialog'
import Success from '@components/pubreq/success.vue'
import Save from '@components/pubreq/save.vue'
import { sleep } from '@/utils'
export default {
  name: 'Pubinfo',
  components: {
    PubReqBaseFile,
    PubReqFileFrom,
    PubReqDescForm,
    PubReqEnterForm,
    PubReqPerForm,
    PubRentForm,
    PubServerForm,
    PubRentTime,
    PubSubmit
  },
  data() {
    return {
      isSave: true,
      data: {
        ptStockPriceList: [
          {
            price: '',
            stockPriceUnit: [],
            isDefault: '1'
          }
        ],
        baStockDetailList: [
          {
            totalArea: '',
            emptyArea: '',
            emptyCapacity: '',
            stockType: []
          }
        ],
        expectedPriceType: 'N',
        stockVal: [],
        suitcateVal: [],
        supportVal: [],
        typeVal: [],
        modeVal: [],
        systemVal: [],
        imgUrl: []
      }
    }
  },
  methods: {
    async continueRelease() {
      let [...valids] = await Promise.all(
        Object.keys(this.$refs).map(key => {
          let formComp = this.$refs[key]
          let formValidate = formComp.validForm

          return new Promise(resolve => {
            if (formValidate) {
              let validResult = formValidate()
                .then(result => {
                  resolve(result)
                })
                .catch(result => {
                  return resolve(result)
                })
            } else {
              resolve(true)
            }
          })
        })
      )
      let valid = valids.reduce((acc, rest) => {
        return acc && rest
      }, true)
      if (valid) {
        this.data.splitable = parseInt(this.data.splitable)
        // this.data.bizUnitId = parseInt(this.data.bizUnitId)

        if (this.$route.params.dataNum) {
          this.data.stockId = this.$route.params.id
          publishApi.updateDepot(this.data).then(({ success, data }) => {
            if (success) {
              Dialog.success('发布成功')
              if (data) {
                sleep(1200).then(() => {
                  this.$router.push({ path: '/depot/' + data })
                })
              }
            } else {
              Dialog.error('发布失败')
            }
          })
        } else {
          publishApi.storeRent(this.data).then(({ success, data }) => {
            if (success) {
              Dialog.success('发布成功')
              if (data) {
                sleep(1200).then(() => {
                  this.$router.push({ path: '/depot/' + data })
                })
              }
            } else {
              Dialog.error('发布失败')
            }
          })
        }
      } else {
        Dialog.error('请先验证')
      }
    },
    async saveDrafts() {
      let [...valids] = await Promise.all(
        Object.keys(this.$refs).map(key => {
          let formComp = this.$refs[key]
          let formValidate = formComp.validForm

          return new Promise(resolve => {
            if (formValidate) {
              let validResult = formValidate()
                .then(result => {
                  resolve(result)
                })
                .catch(result => {
                  return resolve(result)
                })
            } else {
              resolve(true)
            }
          })
        })
      )
      let valid = valids.reduce((acc, rest) => {
        return acc && rest
      }, true)
      if (valid) {
        publishApi.storeSaveDrafts(this.data).then(({ success }) => {
          if (success) {
            Dialog.open(Save)
          }
        })
      } else {
        Dialog.error('请先验证')
      }
    }
  },
  mounted() {
    if (this.$route.params.marks === 'ptSokOne') {
      this.isSave = false
    }
    let dataNum = this.$route.params.dataNum
    if (dataNum) {
      this.data.supportVal = dataNum.supportFacility
        ? dataNum.supportFacility.split(',')
        : []
      this.data.typeVal = dataNum.supportService
        ? dataNum.supportService.split(',')
        : []
      this.data.suitcateVal = dataNum.suitableCategory
        ? dataNum.suitableCategory.split(',')
        : []
      this.data.stockVal = dataNum.stockQualification
        ? dataNum.stockQualification.split(',')
        : []
      this.data.modeVal = dataNum.serviceMode
        ? dataNum.serviceMode.split(',')
        : []
      this.data.systemVal = dataNum.existingSystem
        ? dataNum.existingSystem.split(',')
        : []
      dataNum.splitable =
        dataNum.splitable === 1 || dataNum.splitable === 0
          ? dataNum.splitable.toString()
          : ''
      this.data.imgUrl = dataNum.photoUrls ? dataNum.photoUrls.split(',') : []
      let Photo = dataNum.scenePhoto ? dataNum.scenePhoto.split(',') : []

      this.data.imgUrl = this.data.imgUrl.map((ele, index) => {
        return {
          url: ele,
          uid: Photo[index]
        }
      })
      if (dataNum.expectedPriceType === 'N') {
        dataNum.ptStockPriceList.push({
          price: '',
          stockPriceUnit: 'MM',
          isDefault: '1'
        })
      }
      this.data = { ...this.data, ...this.$route.params.dataNum }
    }
  }
}
</script>

<style lang="less" scoped>
.pub-container {
  padding: 35px 0 110px;
  background: #f5f5f6;
}
.pubreq {
  width: 1150px;
  margin: 0 auto;
}
.pub-t {
  width: 100%;
  height: 64px;
  background: rgba(255, 255, 255, 1);
  h2 {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 18px;
    padding: 22px 0 22px 40px;
  }
}
</style>
