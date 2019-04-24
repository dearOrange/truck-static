<template>
  <div class="statistics">
    <ul>
      <li>
        <span class="primary">推荐路线</span>
        <span class="secondly">符合条件路线 100 个</span>
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
.statistics {
  padding: 15px 40px;
  border-bottom: 1px solid var(--siteBorderColor);
  & ul > li {
    & .primary {
      font-size: 18px;
    }
    & .secondly {
      margin-left: 10px;
      color: var(--siteTextLightColor);
    }
  }
}
</style>

