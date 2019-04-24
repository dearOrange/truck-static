<template>
  <div class="statistics">
    <ul>
      <li
        v-for="(item, index) in listData"
        :key="index"
        :class="{'statistics-active': changeRed == index}"
        @click="changeActive(index, item.type, item.mark)"
      >
        <span class="statistics--key">{{item.name}}</span>
        <span class="statistics--num">{{item.number}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import myApi from '@/api/my'
export default {
  name: 'Statistics',
  data() {
    return {
      changeRed: 0,
      listData: [
        {
          name: '冷库出租',
          number: 0,
          type: 'same',
          mark: 'rent'
        },
        {
          name: '冷库求租',
          number: 0,
          type: 'same',
          mark: 'rented'
        },
        // {
        //   name: '车辆路线',
        //   number: 0,
        //   type: 'same',
        //   mark: 'route'
        // },
        // {
        //   name: '货源求车',
        //   number: 0,
        //   type: 'same',
        //   mark: 'driver'
        // },
        {
          name: '未发布',
          number: 0,
          type: 'differend',
          mark: 'unpublish'
        },
        {
          name: '失效发布',
          number: 0,
          type: 'differend',
          mark: 'lose'
        }
      ]
    }
  },
  methods: {
    changeActive(index, type, mark) {
      this.changeRed = index
      if (type === 'differend') {
        this.bus.$emit('toChangeResult', { isShow: true, mark: mark })
      } else {
        this.bus.$emit('toChangeResult', { isShow: false, mark: mark })
      }
    }
  },
  mounted() {
    myApi.getReleaseStatistics().then(({ success, data }) => {
      if (success) {
        this.listData = [
          {
            name: '冷库出租',
            number: data.lease ? data.lease : 0,
            type: 'same',
            mark: 'rent'
          },
          {
            name: '冷库求租',
            number: data.rentSeek ? data.rentSeek : 0,
            type: 'same',
            mark: 'rented'
          },
          // {
          //   name: '车辆路线',
          //   number: data.car ? data.car : 0,
          //   type: 'same',
          //   mark: 'route'
          // },
          // {
          //   name: '货源求车',
          //   number: data.carSeek ? data.carSeek : 0,
          //   type: 'same',
          //   mark: 'driver'
          // },
          {
            name: '未发布',
            number: data.unpublished ? data.unpublished : 0,
            type: 'differend',
            mark: 'unpublish'
          },
          {
            name: '失效发布',
            number: data.invalid ? data.invalid : 0,
            type: 'differend',
            mark: 'lose'
          }
        ]
      }
    })
  }
}
</script>

<style lang="postcss" scoped>
.statistics {
  & > ul {
    display: flex;
    & > li {
      flex: 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      background: #f5f5f5;
      cursor: pointer;
      &.statistics-active {
        background: rgba(230, 229, 229, 1);
      }
    }
  }
}

.statistics--key {
  font-size: 20px;
}
.statistics--num {
  font-size: 18px;
  margin-left: 6px;
  color: #ff0101;
}
</style>

