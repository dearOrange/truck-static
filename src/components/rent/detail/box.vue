<template>
    <div class="box">
        <div class="box--title">
          <span class="text">{{title}}</span>
        </div>
        <div class="box--content">
          <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    title: String
  }
}
</script>

<style lang="postcss" scoped>
.box {
  padding: 47px 40px 26px 50px;
  background: #fff;
  margin-bottom: 20px;
}

.box--title {
  padding-bottom: 17px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  &:before {
    content: '';
    width: 6px;
    height: 20px;
    background: var(--siteColor);
  }
  & > .text {
    font-size: 18px;
    margin-left: 9px;
  }
}

.box--content {
  margin-top: 27px;
}
</style>



