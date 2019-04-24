<template>
  <div class="position-city">
    <h1>可选城市</h1>
    <div class="container">
      <div class="letter-city">
        <ul>
          <li v-for="item in list" :key="item.letter">
            <span class="sign">{{item.letter}}</span>
            <ul class="list">
              <li class="item" v-for="(citys, key) in item.list" :key="key">
                <div class="province-name">{{key}}</div>
                <div class="citys">
                  <a
                    class="city-name"
                    v-for="city in citys"
                    :key="city.areaId"
                    @click="saveCity(city)"
                  >{{city.areaName}}</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneRoute } from '@utils'
import { mapActions } from 'vuex'
import { SET_USER_LOCATION } from '@/store/types'

export default {
  name: 'PositionCity',

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  methods: {
    ...mapActions({
      updateCity: SET_USER_LOCATION
    }),
    onSelected() {
      this.$emit('close')
    },

    async saveCity(city) {
      let { success } = await this.updateCity(city)
      if (success) {
        this.$router.replace({
          name: 'authing',
          params: {
            to: cloneRoute(this.$router.currentRoute),
            text: '正在定位, 请稍后...'
          }
        })
      }
      this.$emit('close')
    }
  }
}
</script>

<style lang="postcss" scoped>
.position-city {
  width: 800px;
  padding: 15px 10px;
  border-radius: 4px;
  background: #fff;

  & > h1 {
    margin: 0 0 15px;
  }
}

.container {
  max-height: 400px;
  overflow-y: auto;
}

.letter-city {
  border: 1px solid #ddd;
  & > ul > li {
    display: flex;
    align-items: center;
    background-color: #e4e4e4;

    &:hover {
      background-color: var(--siteColor);
      & > .sign {
        color: #fff;
      }
    }

    &:last-child {
      & > .list > li {
        &:last-child {
          border-bottom: 0;
        }
      }
    }

    & > .sign {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 2em;
      font-size: 24px;
      font-weight: 700;
      color: #afb3bb;
    }
    & > .list {
      flex-basis: 100%;
      & > li {
        position: relative;
        display: flex;
        line-height: 24px;
        padding: 8px 20px;
        background: #fff;
        border-bottom: 1px solid #ddd;
        &:hover {
          background-color: #f8f8f8;

          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            border-width: 6px 0 6px 6px;
            border-style: solid;
            border-color: transparent transparent transparent var(--siteColor);
            margin-top: -6px;
          }
        }
        & .province-name {
          display: flex;
          align-items: center;
          margin-right: 15px;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        & > .citys {
          display: flex;
          flex: 1 auto;
          flex-wrap: wrap;
          & > .city-name {
            margin-right: 8px;
            cursor: pointer;
            &:hover {
              color: var(--siteColor);
            }
          }
        }
      }
    }
  }
}
</style>

