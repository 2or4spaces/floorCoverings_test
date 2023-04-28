<template>
  <header>
    <app-header></app-header>
  </header>

  <div class="search">
    <div class="search-aside">
      <div class="search-aside_container">
        <div class="product-type">
          <p>Поиск товара</p>
          <input
            ref="searchInput"
            type="text"
            placeholder="Артикул или название"
            class="search-input"
            @keyup.enter.prevent="searchProduct"
          />
          <span>{{ searchMessage }}</span>
        </div>

        <div class="product-type">
          <p>Или выберите вид товара</p>
          <div>
            <input
              type="checkbox"
              id="laminate"
              value="ламинат "
              v-model="productCategory"
            />
            <label for="laminate" class="product-type_label">Ламинат</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="plinth"
              value="плинтус"
              v-model="productCategory"
            />
            <label for="plinth" class="product-type_label">Плинтус</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="substrate"
              value="подложка"
              v-model="productCategory"
            />
            <label for="substrate" class="product-type_label">Подложка</label>
          </div>
        </div>

        <div class="product-type" v-if="showlaminateType">
          <p>Коллекция ламината</p>
          <div>
            <input
              type="checkbox"
              id="classic"
              value="classic"
              v-model="laminateType"
            />
            <label for="classic" class="product-type_label">Сlassic</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="stone"
              value="stone"
              v-model="laminateType"
            />
            <label for="stone" class="product-type_label">Stone</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="parquet"
              value="parquet"
              v-model="laminateType"
            />
            <label for="parquet" class="product-type_label">Parquet</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="comfort"
              value="comfort"
              v-model="laminateType"
            />
            <label for="comfort" class="product-type_label">Comfort</label>
          </div>
        </div>

        <div class="product-type" v-if="showPlinthType">
          <p>Тип плинтуса</p>
          <div>
            <input
              type="checkbox"
              id="quartz"
              value="кварцевый плинтус"
              v-model="plinthType"
            />
            <label for="quartz" class="product-type_label">Кварцевый</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="duropolymer"
              value="дюрополимерный"
              v-model="plinthType"
            />
            <label for="duropolymer" class="product-type_label"
              >Дюрополимерный</label
            >
          </div>
        </div>

        <div class="search-buttons">
          <input
            type="button"
            value="Поиск"
            class="buttons-input"
            title="Найти товары"
            @click.prevent="searchProductsByFilter"
          />
          <input
            type="button"
            value="Сбросить"
            class="buttons-input"
            title="Сбросить выбранное"
            @click.prevent="cancelChoiceByFilter"
          />
        </div>
      </div>
    </div>

    <div class="search-main">
      <div class="grid-container" v-show="showSearchProduct">
        <product-card
          v-for="product in products"
          :key="product.id"
          :product-id="product.id"
          :product-title="product.title"
          :product-src="product.src"
          @chooseProduct="chooseProduct"
        ></product-card>
      </div>

      <p class="search-main_temporary" v-show="showInitialMessage">
        Нет товаров для просмотра. Попробуйте изменить поля фильтра слева.
      </p>

      <pre-loader v-show="showPreLoader"></pre-loader>

      <product-detail
        v-if="showProductDetail"
        :product-id="currentProductDetail.id"
        :product-title="currentProductDetail.title"
        :product-src="currentProductDetail.src"
        @backToCatalog="backToCatalog"
      ></product-detail>
    </div>
  </div>
  <div class="footer-imit"></div>
</template>

<script>
import appHeader from "./components/appHeader.vue";
import productCard from "./components/productCard.vue";
import productDetail from "./components/productDetail.vue";
import preLoader from "./components/preLoader.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: { appHeader, productCard, productDetail, preLoader },
  data() {
    return {
      currentProductDetail: [],
      showSearchProduct: false,
      showInitialMessage: false,
      showPreLoader: true,
      showProductDetail: false,
      productCategory: [],
      laminateType: [],
      plinthType: [],
    };
  },
  methods: {
    async searchProduct() {
      this.showInitialMessage = false;
      this.showProductDetail = false;
      this.showSearchProduct = false;
      this.showPreLoader = true;
      let inputValue = this.$refs.searchInput.value.trim();

      if (inputValue === "") {
        await this.$store.dispatch("noValueInSearchInput");
        await this.$store.dispatch("showAllProducts");
        this.showPreLoader = false;
        this.showInitialMessage = true;
      } else {
        if (parseInt(inputValue, 10)) {
          await this.$store.dispatch("searchProductByID", inputValue);
          this.showPreLoader = false;
          if (this.products.length > 0) {
            this.showSearchProduct = true;
          } else {
            this.showInitialMessage = true;
          }
        } else {
          await this.$store.dispatch("searchProductByTitle", inputValue);
          this.showPreLoader = false;
          if (this.products.length > 0) {
            this.showSearchProduct = true;
          } else {
            this.showInitialMessage = true;
          }
        }
      }
    },
    chooseProduct(productId) {
      this.currentProductDetail = this.products.find(
        (product) => product.id === productId
      );
      this.showSearchProduct = false;
      this.showProductDetail = true;
    },
    backToCatalog() {
      this.showProductDetail = false;
      this.showSearchProduct = true;
    },
    async searchProductsByFilter() {
      this.showInitialMessage = false;
      this.showProductDetail = false;
      this.showSearchProduct = false;
      this.showPreLoader = true;

      if (this.$refs.searchInput.value.trim() !== "") {
        this.productCategory.length = 0;
        this.laminateType.length = 0;
        this.plinthType.length = 0;
        this.searchProduct();
      } else if (
        this.$refs.searchInput.value.trim() === "" &&
        this.productCategory.length === 0
      ) {
        await this.$store.dispatch("noValueInSearchInput");
        await this.$store.dispatch("showAllProducts");
        this.showPreLoader = false;
        this.showInitialMessage = true;
      } else {
        let sortProductsByCategory = [];
        if (this.productCategory.length > 0) {
          this.productCategory.forEach(
            (category) =>
              (sortProductsByCategory = sortProductsByCategory.concat(
                this.catalog.filter((product) => {
                  return product.title.toLowerCase().includes(category);
                })
              ))
          );
        }
        if (this.laminateType.length === 0 && this.plinthType.length === 0) {
          this.$store.dispatch("setProductsByCategory", sortProductsByCategory);
          if (sortProductsByCategory.length === 0) {
            this.showInitialMessage = true;
          }
          this.showPreLoader = false;
          this.showSearchProduct = true;
        } else {
          let sortProductsByLaminateType = [];
          if (this.laminateType.length > 0) {
            this.laminateType.forEach(
              (type) =>
                (sortProductsByLaminateType = sortProductsByLaminateType.concat(
                  sortProductsByCategory.filter((product) => {
                    return product.title.toLowerCase().includes(type);
                  })
                ))
            );
          }
          let sortProductsByPlinthType = [];
          if (this.plinthType.length > 0) {
            this.plinthType.forEach(
              (type) =>
                (sortProductsByPlinthType = sortProductsByPlinthType.concat(
                  sortProductsByCategory.filter((product) => {
                    return product.title.toLowerCase().includes(type);
                  })
                ))
            );
          }
          let sortProductsBySubstrate = [];
          if (this.productCategory.includes("подложка")) {
            sortProductsBySubstrate = this.catalog.filter((product) => {
              return product.title.toLowerCase().includes("подложка");
            });
          }
          let sortProducts = sortProductsByLaminateType.concat(
            sortProductsByPlinthType,
            sortProductsBySubstrate
          );
          await this.$store.dispatch("searchProductsByFilter", sortProducts);
          this.showPreLoader = false;
          if (this.products.length > 0) {
            this.showSearchProduct = true;
          } else {
            this.showInitialMessage = true;
          }
        }
      }
    },
    cancelChoiceByFilter() {
      this.$refs.searchInput.value = "";
      this.productCategory.length = 0;
      this.laminateType.length = 0;
      this.plinthType.length = 0;
      this.showSearchProduct = false;
      this.showProductDetail = false;
      this.showInitialMessage = true;
      this.$store.dispatch("cancelChoiceSearchMessage");
    },
  },
  computed: {
    ...mapState(["catalog", "products", "searchMessage"]),
    showlaminateType() {
      return this.productCategory.includes("ламинат ");
    },
    showPlinthType() {
      return this.productCategory.includes("плинтус");
    },
  },
  watch: {
    productCategory() {
      if (this.productCategory.length === 0) {
        this.laminateType.length = 0;
        this.plinthType.length = 0;
      }
      if (!this.productCategory.includes("ламинат ")) {
        this.laminateType.length = 0;
      }
      if (!this.productCategory.includes("плинтус")) {
        this.plinthType.length = 0;
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("showAllProducts");
    this.showPreLoader = false;
    this.showSearchProduct = true;
  },
};
</script>

<style lang="scss" scoped>
$color-main-green: #78b833;
$color-main-brown: #593f25;
$color-light-green: #d1e3ca;

.search {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 20px;

  .search-aside {
    width: 22%;
    margin-right: 2%;
    background-color: $color-light-green;
    border-radius: 20px;

    .search-aside_container {
      margin-top: 5%;
      margin-left: 10%;
      overflow: auto;

      .product-type {
        font-size: 1.5rem;
        margin: 1.5rem 0;
        color: $color-main-brown;

        p {
          font-size: 1.8rem;
          font-weight: 900;
          margin: 10px 0;
        }

        span {
          display: block;
          font-style: italic;
          padding-right: 10px;
        }

        .product-type_label {
          padding-left: 10px;
        }
      }

      .search-input {
        display: block;
        width: 90%;
        height: 50px;
        margin: 10px 0;
        padding: 0 10px;
        border: 1px solid $color-light-green;
        border-radius: 10px;
        font-size: 1.6rem;
        font-family: "Montserrat";

        &::placeholder {
          font-size: 1.2rem;
        }
      }

      .search-buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        margin: 10px 0 30px;

        .buttons-input {
          display: block;
          width: 110px;
          height: 30px;
          margin-left: 5px;
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
    }
  }

  .search-main {
    display: block;
    width: 100%;
    height: 100%;
    background-color: white;

    .grid-container {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: auto;
      grid-gap: 20px;
    }

    .search-main_temporary {
      margin-top: 20vh;
      font-size: 1.8rem;
      text-align: center;
      color: $color-main-green;
    }
  }
}

.footer-imit {
  height: 10vh;
}
</style>
