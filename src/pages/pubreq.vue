<template>
  <div>
    <cool-link-header/>
    <div class="pub-container">
      <div class="pubreq">
        <div class="pub-t">
          <h2>发布冷库需求</h2>
        </div>
        <div class="basr-file">
          <PubReqBaseFile :baseTxt="'基本资料'">
            <template slot="fileFrom">
              <PubReqFileFrom :data="data" ref="form1"></PubReqFileFrom>
            </template>
          </PubReqBaseFile>
          <PubReqBaseFile :baseTxt="'货品描述'">
            <template slot="fileFrom">
              <PubReqDescForm :data="data" ref="form2"></PubReqDescForm>
            </template>
          </PubReqBaseFile>
          <PubReqBaseFile :baseTxt="'入驻信息'">
            <template slot="fileFrom">
              <PubReqEnterForm :data="data" ref="form3"></PubReqEnterForm>
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
import PubSubmit from '@components/pubreq/submit.vue'
import publishApi from '@/api/publish'
import Dialog from '@components/common/dialog'
import Success from '@components/pubreq/success.vue'
import Save from '@components/pubreq/save.vue'
import { sleep } from '@/utils'
export default {
  name: 'Pubreq',
  components: {
    PubReqBaseFile,
    PubReqFileFrom,
    PubReqDescForm,
    PubReqEnterForm,
    PubReqPerForm,
    PubSubmit
  },
  data() {
    return {
      isSave: true,
      data: {
        supportVal: [],
        typeVal: [],
        modeVal: [],
        imgUrl: [],
        expectedPriceType: 'N'
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
        if (this.$route.params.dataNum) {
          this.data.stockId = this.$route.params.id
          publishApi.updateRent(this.data).then(({ success, data }) => {
            if (success) {
              Dialog.success('发布成功')
              if (data) {
                sleep(1200).then(() => {
                  this.$router.push({ path: '/rent/' + data })
                })
              }
            } else {
              Dialog.error('发布失败')
            }
          })
        } else {
          publishApi.storeDemandRent(this.data).then(({ success, data }) => {
            if (success) {
              Dialog.success('发布成功')
              if (data) {
                sleep(1200).then(() => {
                  this.$router.push({ path: '/rent/' + data })
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
        publishApi.demandSaveDrafts(this.data).then(({ success }) => {
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
    if (this.$route.params.marks === 'ptSokTwo') {
      this.isSave = false
    }

    let support = this.$route.params.dataNum
    if (support) {
      this.data.supportVal = support.supportFacility
        ? support.supportFacility.split(',')
        : []

      this.data.typeVal = support.supportService
        ? support.supportService.split(',')
        : []
      this.data.modeVal = support.serviceMode
        ? support.serviceMode.split(',')
        : []
      this.data.imgUrl = support.photoUrls ? support.photoUrls.split(',') : []
      let Photo = support.scenePhoto ? support.scenePhoto.split(',') : []
      this.data.imgUrl = this.data.imgUrl.map((ele, index) => {
        return {
          url: ele,
          uid: Photo[index]
        }
      })
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
