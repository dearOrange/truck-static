<template>
  <cool-link-thumbnails
    :link="'/depot/' + data.ptStockPublish.stockPublishUkid"
    class="result-item"
    borderless
    :mark="data.expectedPriceType === 'N' ? '面议' : data.ptStockPriceList[0].price + ' ' + data.ptStockPriceList[0].stockPriceUnitName"
    width="557"
    height="300"
    :srcImg="data.ptStockPublish.photoUrls"
  >
    <template slot="decorator">
      <div class="prize" v-if="data.ptStockPublish.certifiedType === '5A'">
        <img src="@/assets/img/xiehui.png" alt="图片">
      </div>
    </template>

    <template slot="desc">
      <div class="depot-desc">
        <div
          class="title"
        >{{data.ptStockPublish.publishTitle}} {{data.emptyArea}}-{{data.totalArea}}㎡</div>
        <div class="address">
          {{data.province}}-{{data.city}}-{{data.district}}
          <router-link
            :to="{name: 'depot-detail', params: {id: data.ptStockPublish.stockPublishUkid, districtCode: data.districtCode, isGoMap: true} }"
            tag="a"
          >查看地图</router-link>
        </div>
        <div class="tags">
          <cool-link-tag
            v-if="data.stockTypeName"
            :label="data.stockTypeName"
            themes="round unborder info"
          ></cool-link-tag>
          <!-- <cool-link-tag label="闲置中" themes="round unborder warn"></cool-link-tag>
          <cool-link-tag label="实地认证" themes="round unborder success"></cool-link-tag>-->
          <cool-link-tag
            label="五大商协会"
            themes="round unborder solemn"
            v-if="data.ptStockPublish.certifiedType === '5A'"
          ></cool-link-tag>
        </div>
      </div>
    </template>
  </cool-link-thumbnails>
</template>

<script>
export default {
  name: 'Item',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {}
}
</script>
<style lang="postcss" scoped>
.depot-desc {
  padding: 5px 0;
  & > .title {
    margin-top: 0;
  }
  & > .address {
    margin: 5px 0;
    color: var(--siteTextWeakColor);
    & > a {
      color: var(--siteColor);
    }
  }
  & > .tags {
    display: flex;
    & .tag {
      margin-right: 10px;
    }
  }
}

.prize {
  position: absolute;
  top: 15px;
  right: 13px;
  width: 53px;
  height: 65px;
  z-index: var(--zIndex6);
}
</style>


