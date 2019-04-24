<template>
  <div class="filter">
    <ul>
      <li>
        <a>顺路程度</a>
      </li>
      <li>
        <a>出发时间</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Statistics'
}
</script>

<style lang="postcss" scoped>
.filter {
  padding: 20px 40px 15px;
  & ul {
    display: flex;
    & > li {
      margin-left: 25px;
      &:first-child {
        margin-left: 0;
      }
      & a {
        font-size: 16px;
        color: var(--siteTextColor);
        cursor: pointer;
      }
    }
  }
}
</style>

