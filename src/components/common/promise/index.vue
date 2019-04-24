<template>
  <span>{{realValue}}</span>
</template>
<script>

import { isString } from 'lodash'

export default {
  name: 'Promise',
  props: {
    value: {
      type: Object | String,
      required: true
    }
  },

  data() {
    return {
      realValue: ''
    }
  },
  mounted() {
    if(isString(this.value)) {
      this.realValue = this.value
    }
    else {
      this.value.then((value) => {
        this.realValue = value
      })
    }
  }
}
</script>

