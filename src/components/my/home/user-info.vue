<template>
  <div class="user-info">
    <cool-link-avatar class="info--avatar" :url="info.photoUrl"/>
    <div class="info--detail">
      <div class="detail-name">
        <div class="text">{{info.userName}}</div>
        <cool-link-tag
          @goCert="info.realNameCertified === 1 ? '' : goCert()"
          :class="info.realNameCertified === 1 ? '' : 'gocert'"
          :label="info.realNameCertified === 1 ? '已认证' : '去认证'"
          themes="success"
        ></cool-link-tag>
      </div>
      <div class="detail-ohters">
        <div class="item">
          <span class="item-key">ID：</span>
          <span class="item-text">{{info.userId}}</span>
        </div>
        <div class="item">
          <span class="item-key">注册时间：</span>
          <span class="item-text">{{$dateFormat(info.registrationTime, 'YYYY-MM-DD')}}</span>
        </div>
        <div class="item">
          <span class="item-text">
            {{info.mobileNumber}}
            <a class="change-phone" @click="changeNumber">更换手机号</a>
          </span>
        </div>
        <!-- <div class="item">v-rebind
          <span class="item-key">区 域：</span>
          <span class="item-text">杭州市江干区秋涛路创意园</span>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dialog from '@components/common/dialog'
import Verify from './verify.vue'
export default {
  name: 'UserInfo',
  // props: {},
  computed: {
    ...mapGetters({ info: 'getUser' })
  },
  methods: {
    goCert() {
      this.$router.push({ name: 'my-cert' })
    },
    changeNumber() {
      Dialog.open(Verify)
    }
  }
}
</script>

<style lang="postcss" scoped>
.user-info {
  display: flex;
  align-items: center;
  padding: 33px 41px;
  background-color: #fff;
}

.info--avatar {
  flex-shrink: 0;
}

.info--detail {
  flex: 1 auto;
  margin-left: 25px;
}

.detail-name {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  & > .text {
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
  }
}

.detail-ohters {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 16px;
  & > .item {
    width: 50%;
    &:nth-child(n + 3) {
      margin-top: 4px;
    }
  }

  & .item-key {
    margin-right: 6px;
    color: var(--siteTextLightColor);
  }
  & .item-text {
  }
  & .change-phone {
    color: #026acb;
    text-decoration: underline;
    cursor: pointer;
  }
}
.gocert {
  cursor: pointer;
}
</style>


