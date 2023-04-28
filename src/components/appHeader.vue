<template>
  <div class="header-catalog">
    <div>
      <a href="#" title="На главную страницу Refloor">
        <img src="/logo.png" alt="Refloor logo" />
      </a>
    </div>
    <h1>Каталог напольных покрытий и плинтуса</h1>
  </div>
</template>

<script>
export default {
  name: "appHeader",
};
</script>

<style lang="scss" scoped>
$color-main-green: #78b833;

.header-catalog {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3vh 0;

  h1 {
    position: absolute;
    margin-left: clamp(200px, 35vw, 800px);
    text-align: center;
    font-size: 2.5rem;
    font-weight: 900;
    color: $color-main-green;
  }
}
</style>
