<template>
  <div>
    <ul class="partner-list">
      <li>
        <img src="@/assets/img/partner/0.png" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/1.png" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/2.png" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/3.png" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/4.png" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/5.jpg" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/6.jpg" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/7.jpg" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/8.jpg" alt="图片">
      </li>
      <li>
        <img src="@/assets/img/partner/9.jpg" alt="图片">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PartnerList'
}
</script>


<style lang="postcss" scoped>
.partner-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
  &:first-child {
    margin-top: 0;
  }
  & > li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 192px;
    & > img {
      width: 100%;
      max-height: 100%;
    }
  }
}
</style>

