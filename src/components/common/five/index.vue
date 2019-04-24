<template>
  <div class="five">
    <div class="five--hd">
      <div class="five--text">
        <span class="five--text--sub">{{label}}</span>
      </div>
    </div>
    <div class="five--bd">
      <inner-comp class="five--items" :render="render"></inner-comp>
    </div>
  </div>
</template>

<script>

let InnerComp = {
  render(h) {
    return h('div', this.render())
  },

  props: {
    render: {
      type: Function,
      required: true
    }
  }
}


export default {
  name: 'Five',
  components: {
    InnerComp
  },
  props: {
    label: {
      type: String,
      required: true
    },

    dataLoader: {
      type: Function
    },

    data: {
      type: Array
    },

    type: String
  },
  data() {
    return {
      list: [],
      limit: 5
    }
  },

  watch: {
    data(list) {
      this.list = list
    }
  },

  methods: {

    render() {
      return this.list.map((item) => {
        return this.$scopedSlots.default(item)
      })
    },


    toLimitList(list) {
      return list.slice(0, this.limit)
    },

    async fetch() {
      if(this.dataLoader) {
        let {success, data} = await this.dataLoader()
        if(success) {
          this.list = this.toLimitList(data)
        }
      }
    },
    init() {
      if(this.data) {
        this.list = this.toLimitList(this.data)
      }
      else {
        this.fetch()
      }
    },
  },

  mounted() {
    this.init()
  }
}
</script>

<style lang="postcss" scoped>
.five--hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.five--text--sub {
  display: inline-block;
  font-size: 24px;
}

.five--bd {
  margin-top: 16px;
}

.five--items {
  display: flex;
  justify-content: space-between;
}

</style>


