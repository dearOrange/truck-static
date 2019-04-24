<template>
  <div class="meta-info">
    <div class="price">
      <span
        class="amount"
      >{{data.expectedPriceType === 'N' ? '面议' : '¥' + data.ptStockPriceList[0].price}}</span>
      <span
        class="unit"
      >{{data.expectedPriceType === 'N' ? '' : data.ptStockPriceList[0].stockPriceUnitName}}</span>
    </div>
    <div class="depot-base">
      <ul>
        <li class="meta-info--text">
          <span class="label">总容量</span>
          <span class="value">{{data.totalCapacity}} 吨</span>
        </li>
        <li class="meta-info--text">
          <span class="label">可用容量</span>
          <span class="value">{{data.emptyCapacity}} 吨</span>
        </li>
        <li class="meta-info--text">
          <span class="label">总面积</span>
          <span class="value">{{data.totalArea}} ㎡</span>
        </li>
        <li class="meta-info--text">
          <span class="label">可用面积</span>
          <span class="value">{{data.emptyArea}} ㎡</span>
        </li>
        <li class="meta-info--text">
          <span class="label">层高</span>
          <span class="value">{{data.floorHeight}} m</span>
        </li>
        <li class="meta-info--text">
          <span class="label">楼层</span>
          <span class="value">{{data.locatedFloor}} 层</span>
        </li>
        <li class="meta-info--text">
          <span class="label">冷库温度范围</span>
          <span class="value">{{data.temperatureLower}}~{{data.temperatureUpper}} ℃</span>
        </li>
        <li class="meta-info--text">
          <span class="label">存放产品品类</span>
          <span class="value">{{data.ptStockPublish.suitableCategoryName}}</span>
        </li>
      </ul>
    </div>
    <div class="depot-temp">
      <el-tabs type="border-card">
        <el-tab-pane
          :label="item.stockTypeNames"
          v-for="(item, index) in data.baStockDetailList"
          :key="index"
        >
          <span>区域可用容量：{{item.emptyCapacity}} 吨</span>
          <span class="depot-temp-span">区域可用面积：{{item.emptyArea}} ㎡</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="tel">
      <span class="tel-num">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianhua"></use>
        </svg>
        <em>{{data.ptStockPublish.serviceUserMobile}}</em>
      </span>
      <span class="tel-name">（平台专员：{{data.ptStockPublish.serviceUserName}}）</span>
    </div>
    <div class="oper">
      <meta-btn
        :count="data.ptStockPublish.followCount"
        :count-render="payattention"
        :label="isFollow ? '已关注':'关注'"
      ></meta-btn>
      <meta-btn
        :count="data.ptStockPublish.sceneViewCount"
        :count-render="reserve"
        short-label="看过"
        label="免费预约看库"
        theme="light"
      ></meta-btn>
    </div>
    <div class="feedback">
      <a @click="feedbackMe">回电联系我</a>
    </div>
  </div>
</template>

<script>
import MetaBtn from './meta-btn.vue'
import Feedback from './feedback.vue'
import Reserve from './reserve.vue'
import { mapGetters } from 'vuex'
import Dialog from '@components/common/dialog'
import commonApi from '@/api/common'

export default {
  name: 'MetaInfo',

  components: {
    MetaBtn
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    isFollow() {
      return !!this.data.isFollow
    },
    ...mapGetters({
      isLogged: 'isLogged'
    })
  },

  methods: {
    feedbackMe() {
      Dialog.open(Feedback)
    },
    reserve() {
      return Dialog.open(Reserve)
    },
    payattention() {
      if (this.isLogged) {
        // 已关注
        if (this.isFollow) {
          return Promise.resolve(false)
        }
        let data = {
          relatedDataType: 'SL',
          relatedDataUkid: this.$route.params.id
        }
        return commonApi.addFollow(data).then(({ success }) => {
          this.data.isFollow = '已关注'
          return success
        })
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.meta-info--text {
  font-size: 16px;
  & .label {
    width: 96px;
    margin-right: 20px;
    color: var(--siteTextWeakColor);
    display: inline-block;
  }
}
.meta-info--line {
  height: 1px;
  width: 100%;
  background: #eee;
}

.price {
  margin-bottom: 10px;
  color: #e4393c;
  & .amount {
    font-size: 50px;
    font-weight: 700;
  }
  & .unit {
    font-size: 22px;
  }
}

.depot-base {
  & ul {
    display: flex;
    flex-wrap: wrap;
    & > li {
      width: 50%;
      margin-top: 8px;
    }
  }
}

.depot-temp {
  margin-top: 20px;
  background: rgba(244, 250, 252, 1);
}
.depot-temp .el-tab-pane {
  display: flex;
  justify-content: space-around;
}

.depot-type {
  margin-top: 8px;
}
.tel {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tel-num {
  & > svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    color: var(--siteColor);
  }
  & > em {
    font-family: MicrosoftYaHei-Bold;
    color: var(--siteColor);
    font-size: 22px;
    font-weight: 700;
  }
}
.tel-name {
  color: #bbb;
}

.oper {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.feedback {
  margin-top: 10px;
  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    width: 100%;
    border: 1px solid var(--siteColor);
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
<style>
.depot-temp .el-tabs--border-card {
  box-shadow: none;
}
.depot-temp .el-tabs__nav-scroll {
  display: flex;
}
.depot-temp .el-tabs__nav-scroll .el-tabs__nav {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.depot-temp .el-tabs__nav-scroll .el-tabs__nav .el-tabs__item {
  flex: 1;
  text-align: center;
}
</style>


