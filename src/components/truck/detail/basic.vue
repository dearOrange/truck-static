<template>
  <div class="basic">
    <div class="user">
      <div class="lt">
        <cool-link-avatar/>
        <span class="name">发布人用户名</span>
        <cool-link-score :score="3"></cool-link-score>
        <div class="count">
          <span>4.5分丨999次</span>
        </div>
      </div>
      <div class="rt">
        <div class="rate">
          <em>90%</em>
          <span>顺路度</span>
        </div>
        <cool-link-button class="user--btn" themes="linear block" size="middle">关注（342人关注）</cool-link-button>
        <cool-link-button class="user--btn" themes="stuffed block" size="middle">联系专员</cool-link-button>
      </div>
    </div>
    <div class="contact">
      <div class="line">
        <div class="address from">
          <span class="icon">始</span>
          <em>杭州 ·</em>
          江干区合达物流园流园流园流园
        </div>
        <svg class="icon arrow" aria-hidden="true">
          <use v-bind:xlink:href="'#icon-kaiwang'"></use>
        </svg>
        <div class="address to">
          <span class="icon">终</span>
          <em>杭州 ·</em>
          江干区合达物流园流园流园流园
        </div>
      </div>
      <div class="desc">
        <ul>
          <li>
            <span class="label">
              <svg class="icon arrow" aria-hidden="true">
                <use xlink:href="#icon-clock"></use>
              </svg>
              时 间：
            </span>
            <span class="value">2018-12-11</span>
          </li>
          <li>
            <span class="label">
              <svg class="icon arrow" aria-hidden="true">
                <use xlink:href="#icon-zaizhong"></use>
              </svg>
              载 重：
            </span>
            <span class="value">5.00吨</span>
          </li>
          <li>
            <span class="label">
              <svg class="icon arrow" aria-hidden="true">
                <use xlink:href="#icon-chepai"></use>
              </svg>
              车 牌：
            </span>
            <span class="value">浙YU99**</span>
          </li>
          <li>
            <span class="label">
              <svg class="icon arrow" aria-hidden="true">
                <use xlink:href="#icon-chexing"></use>
              </svg>
              车 型：
            </span>
            <span class="value">厢式密封车</span>
          </li>
          <li>
            <span class="label">
              <svg class="icon arrow" aria-hidden="true">
                <use xlink:href="#icon-chizi"></use>
              </svg>
              车 长：
            </span>
            <span class="value">4.2米</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Basic'
}
</script>

<style lang="postcss" scoped>
.basic {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px 105px;
}

.user {
  display: flex;
  align-items: center;
  & .lt {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & .rt {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-left: 60px;
  }
  & .name {
    margin: 12px 0 6px;
  }
  & .count {
    margin-top: 3px;
  }
  & .rate {
    font-size: 18px;
    height: 40px;
    line-height: @height;
    & > em {
      font-size: 38px;
      font-weight: 700;
      margin-right: 10px;
    }
  }
  & .user--btn {
    margin-top: 8px;
  }
}

.contact {
  & .line {
    display: flex;
    align-items: center;
    color: var(--siteColor);
    & .arrow {
      width: 60px;
      height: 40px;
    }
    & .address {
      display: flex;
      align-items: center;
      &.from {
        & > .icon {
          border: 1px solid #fabb7b;
          color: #fabb7b;
        }
      }
      &.to {
        & > .icon {
          border: 1px solid #7fb7f1;
          color: #7fb7f1;
        }
      }
      & .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        width: 26px;
        margin-right: 8px;
        font-weight: 700;
      }
      & > em {
        font-weight: 700;
        margin-right: 4px;
      }
    }
  }

  & .desc {
    margin-top: 10px;
    font-size: 16px;
    & > ul {
      display: flex;
      flex-wrap: wrap;
      & > li {
        display: flex;
        align-items: center;
        height: 50px;
        flex-basis: 50%;
        border-bottom: 1px dashed #eaeaea;
      }
    }

    & .label {
      display: flex;
      align-items: center;
      & > svg {
        width: 18px;
        height: 18px;
        margin-right: 15px;
      }
    }
  }
}
</style>

