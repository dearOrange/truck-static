<template>
  <div class="more">
    <div class="more--hd">
      <div class="more--text">
        <span class="more--text--sub">{{sub}}</span>
        <span v-if="sup" class="more--text--sup">{{sup}}</span>
      </div>
      <a v-if="link" :href="link.href" class="more--link">{{link.text}}</a>
    </div>
    <div class="more--bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'More',
  props: {
    sub: {
      type: String,
      required: true
    },
    sup: {
      type: String
    },
    link: {
      type: Object
    }
  }
}
</script>

<style lang="postcss">
.more--hd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more--text--sub {
  display: inline-block;
  font-size: 30px;
  font-weight: 700;
  color: rgba(57, 64, 67, 1);
}
.more--text--sup {
  display: inline-block;
  font-size: 30px;
  font-family: MicrosoftYaHei;
  margin-left: 10px;
  color: rgba(57, 64, 67, 1);
}
.more--link {
  font-size: 12px;
  line-height: 12px;
  color: rgba(57, 64, 67, 1);
  cursor: pointer;
  text-decoration: none;
}
.more--link:hover {
  color: #00ae66;
}
.more--bd {
  margin-top: 30px;
}
</style>


