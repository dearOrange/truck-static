<template>
  <div class="live-picture">
    <ul>
      <!-- <li v-for="(item, index) in photos" :key="index">
        <img :src="item" alt="案例图">
      </li>-->
    </ul>
  </div>
</template>
<script>
import { trim, split } from 'lodash'

export default {
  name: 'LivePicture',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    // photos() {
    //   let oPhotoStr = this.data.ptStockPublish.photoUrls
    //   if (!oPhotoStr) {
    //     return []
    //   }
    //   return split(oPhotoStr, ',').map(str => {
    //     return trim(str)
    //   })
    // }
  }
}
</script>

<style lang="postcss" scoped>
@import 'depot.postcss';
.live-picture {
  width: var(--depotDetailLeftWidth);

  & ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > li {
      width: 348px;
      &:first-child {
        width: 100%;
      }

      & > img {
        width: 100%;
      }
    }
  }
}
</style>

