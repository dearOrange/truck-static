<template>
  <div class="renter">
    <div class="renter--card">
      <cool-link-avatar/>
      <div class="name">{{data.createUserName}}</div>
      <div class="tags">
        <auth-tag
          v-if="data.realNameCertified === 1"
          class="tags--item"
          color="#16C5FF"
          text="个人认证"
        ></auth-tag>
        <!-- <auth-tag class="tags--item" text="货源认证"></auth-tag> -->
      </div>
    </div>
    <cool-link-whitespace size="25"></cool-link-whitespace>
    <div class="renter--statistics">
      <ul>
        <li>
          <p>{{data.total}}</p>
          <p>所有发布</p>
        </li>
        <li>
          <p>{{data.registrationTime ? $dateFormat(data.registrationTime, 'YYYY-MM-DD') : '暂无'}}</p>
          <p>注册时间</p>
        </li>
      </ul>
    </div>
    <cool-link-whitespace size="35"></cool-link-whitespace>
    <div class="renter--contact">
      <cool-link-button
        class="contact--btn"
        prepend-icon="shoucang"
        themes="linear block"
        size="large"
        @click="focusSR(data.isFollow)"
      >{{data.isFollow==='已关注' ? data.isFollow : '关注'}}</cool-link-button>
      <cool-link-whitespace size="10"></cool-link-whitespace>
      <cool-link-button
        class="contact--btn"
        prepend-icon="dianhua1"
        themes="stuffed block"
        size="large"
        :className="'btn-mobile'"
      >
        <span style="font-size:22px;">{{data.mobileNumber}}</span>
        <span style="font-size:12px;">{{data.userName}}</span>
      </cool-link-button>
    </div>
  </div>
</template>

<script>
import AuthTag from '@components/rent/auth-tag.vue'
import TextTag from '@components/rent/text-tag.vue'
import commonApi from '@/api/common'
import { mapGetters } from 'vuex'
import Dialog from '@components/common/dialog'
export default {
  name: 'Renter',
  components: {
    AuthTag,
    TextTag
  },

  props: {
    data: Object
  },
  data() {
    return {
      isContinue: false
    }
  },
  computed: {
    ...mapGetters({
      isLogged: 'isLogged'
    })
  },
  methods: {
    focusSR(value) {
      if (this.isLogged) {
        if (value === '已关注') {
          Dialog.success('已关注')
        } else {
          let data = {
            relatedDataType: 'SR',
            relatedDataUkid: this.$route.params.id
          }
          if (this.isContinue) {
            return
          }
          commonApi.addFollow(data).then(({ success }) => {
            if (success) {
              this.isContinue = true
              Dialog.success('关注成功')
              this.data.isFollow = '已关注'
            } else {
              Dialog.error('关注失败')
            }
          })
        }
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.renter {
  padding: 25px 0;
  background: #fff;
}

.renter--card {
  display: flex;
  flex-direction: column;
  align-items: center;
  & .name {
    margin: 10px 0 15px;
    font-size: 16px;
  }
  & .tags {
    display: flex;
    justify-content: center;
    width: 100%;
    & .tags--item {
      margin: 0 4px;
    }
  }
}

.renter--statistics > ul {
  display: flex;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  font-size: 16px;
  & > li {
    flex: 1 auto;
    text-align: center;
    padding: 20px 0 16px;
    &:first-child {
      border-right: 1px solid #e9e9e9;
    }
  }
}

.renter--contact {
  padding: 0 35px;
}
</style>
