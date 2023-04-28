<template>
  <div class="product-container">
    <div class="product-image_container">
      <img :src="productSrc" alt="Product photo" class="product-photo" />
      <input
        type="button"
        value="Назад"
        class="back-input"
        title="К списку товаров"
        @click.prevent="backToCatalog"
      />
    </div>
    <div class="product-info">
      <p class="chapter">Наименование:</p>
      <p class="chapter-info">
        {{ productTitle }}
      </p>

      <p class="chapter">Артикул:</p>
      <p class="chapter-info">{{ productId }}</p>
      <p class="chapter">О Товаре:</p>
      <ol class="chapter-advantages">
        <li>
          Легко монтируется. Укладку можно производить на любой тип поверхности:
          на полы из ПВХ, полы с подогревом, бесшовные или деревянные полы, или
          линолеум, а также неподготовленные покрытия.
        </li>
        <li>
          Долговечность материала. При грамотной укладке, материал прослужит
          более 10 лет.
        </li>
        <li>
          Это экологически чистый продукт. Он не содержит ядовитых химических
          веществ, вредящих здоровью человека, не скапливает на себе бактерии и
          грязь, гипоаллергенен и с уверенностью может быть использован в
          детских комнатах.
        </li>
        <li>
          Изделие достаточно устойчиво к истиранию, нагрузкам и давлению. На нем
          не остаются вмятины и другие следы от тяжелых предметов, по нему можно
          передвигать мебель с колесиками, не боясь оставить царапины или
          потертости.
        </li>
        <li>
          Не требует особого ухода, повторных циклевок и полировок, что
          свойственно другим видам материалов. Его достаточно протирать
          увлажненной тряпкой.
        </li>
        <li>Отлично переносит высокие температуры.</li>
        <li>
          Оптимальные цены на данный вид продукта. Идеальное сотношение цена /
          качество.
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "productDetail",
  props: {
    productId: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
    },
    productSrc: {
      type: String,
      required: true,
    },
  },
  emits: ["backToCatalog"],
  methods: {
    backToCatalog() {
      this.$emit("backToCatalog");
    },
  },
};
</script>

<style lang="scss" scoped>
$color-main-brown: #593f25;
$color-light-green: #d1e3ca;

.product-container {
  display: flex;
  align-content: flex-start;
  justify-content: space-around;
  background-color: $color-light-green;
  border-radius: 20px;

  .product-image_container {
    width: 100%;
    height: 40vh;
    margin-top: 30px;
    margin-left: 25px;

    .product-photo {
      display: block;
      width: 60%;
      margin: 0 auto;
      object-fit: contain;
    }

    .back-input {
      display: block;
      width: 110px;
      height: 30px;
      margin: 5% auto;
      border-radius: 10px;
      border: none;
      font-size: 1.5rem;
      font-weight: bold;
      color: $color-main-brown;
      background-color: white;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 5px $color-main-brown;
        border: 1px solid $color-main-brown;
      }

      &:active {
        cursor: pointer;
        transform: scale(0.95);
      }
    }
  }

  .product-info {
    width: 150%;
    height: 100%;
    margin-top: 15px;
    margin-left: 1%;
    margin-right: 30px;

    .chapter {
      font-size: 1.8rem;
      font-weight: 900;
      margin: 1.5rem 0 0.5rem;
      color: $color-main-brown;
    }

    .chapter-info {
      font-size: 1.5rem;
    }

    .chapter-advantages {
      font-size: 1.5rem;
      margin-bottom: 30px;
      padding-inline-start: 20px;
    }
  }
}
</style>
