<template>
  <div class="auth-box">
    <div class="box--panel">
      <slot name="title"></slot>
      <div class="box--inputs">
        <slot name="inputs"></slot>
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AuthBox',
}
</script>


<style lang="postcss" scoped>
@import 'auth.postcss';
.auth-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  height: auto;
  border-radius: 3px;
  background-color: #fff;
}
.box--panel {
  padding: 40px 0;
}

.box--inputs {
  vertical-align: top;
  width: var(--authInnerWidth);
  display: inline-block;

  & ul > li {
    width: 100%;
  }
}
</style>

