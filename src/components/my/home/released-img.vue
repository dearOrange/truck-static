<template>
  <div class="released-img">
    <img v-if="data.photoUrl" :src="data.photoUrl" alt>
    <img v-if="!data.photoUrl" src="@/assets/img/default.jpg" alt="图片">
    <div class="mask-box">
      <div
        class="mask-matter"
      >{{data.relatedDataType === 'SR' ? '求库' : data.relatedDataType === 'SL' ? '出租' : ''}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReleasedImg',
  props: {
    data: Object
  }
}
</script>

<style lang="postcss" scoped>
.released-img {
  width: 192px;
  height: 136px;
  position: relative;

  &:hover {
    & .mask-box {
      display: block;
    }
  }

  & > img {
    width: 100%;
    height: 100%;
  }
  & .mask-box {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    & .mask-matter {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 60px;
      margin-top: calc(@height / -2);
      background: rgba(53, 61, 58, 0.6);
      font-size: 36px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>

