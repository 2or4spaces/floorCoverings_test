import { createStore } from "vuex";

export default createStore({
  state: {
    catalog: [],
    products: [],
    searchMessage: "Заполните поле выше",
  },
  mutations: {
    showAllProducts(state, allCatalog) {
      state.products = allCatalog;
      state.catalog = allCatalog;
    },
    setProductByID(state, desiredProduct) {
      state.products = desiredProduct;
      state.searchMessage = "Товар показан справа";
    },
    setProductByTitle(state, desiredProduct) {
      state.products = desiredProduct;
    },
    noResultMessageByID(state, productID) {
      state.products.length = 0;
      state.searchMessage = `Товара с артикулом "${productID}" не существует`;
    },
    noResultMessageByTitle(state, productTitle) {
      state.products.length = 0;
      state.searchMessage = `Товара с названием "${productTitle}" не существует`;
    },
    cancelChoiceSearchMessage(state) {
      state.searchMessage = "Фильтр сброшен";
    },
    noResultSearchMessage(state) {
      state.searchMessage = "Товары отсутствуют";
    },
    showResultSearchMessage(state) {
      state.searchMessage = "Товар(ы) показаны справа";
    },
    setProductsByCategory(state, sortProductsByCategory) {
      state.products = sortProductsByCategory;
    },
    setProductByFilter(state, sortProducts) {
      state.products = sortProducts;
    },
    noValueInSearchInput(state) {
      state.products.length = 0;
    },
  },
  actions: {
    async showAllProducts(store) {
      await fetch(`https://moscow.fargospc.ru/test/json/`)
        .then(
          (response) => response.json(),
          (error) => new Error(error)
        )
        .then((allCatalog) => store.commit("showAllProducts", allCatalog))
        .catch((error) => {
          console.warn(error.name, error.message);
        });
    },
    async searchProductByID(store, productID) {
      await fetch(`https://moscow.fargospc.ru/test/json/`)
        .then(
          (response) => response.json(),
          (error) => new Error(error)
        )
        .then((allCatalog) => {
          let desiredProduct = allCatalog.filter(
            (product) => product.id === productID
          );
          if (desiredProduct[0]) {
            store.commit("setProductByID", desiredProduct);
          } else {
            console.warn(`Товара с ID "${productID}" не существует`);
            store.commit("noResultMessageByID", productID);
          }
        })
        .catch((error) => {
          console.warn(error.name, error.message);
        });
    },
    async searchProductByTitle(store, productTitle) {
      await fetch(`https://moscow.fargospc.ru/test/json/`)
        .then(
          (response) => response.json(),
          (error) => new Error(error)
        )
        .then((allCatalog) => {
          let desiredProduct = allCatalog.filter((product) =>
            product.title.toLowerCase().includes(productTitle.toLowerCase())
          );
          if (desiredProduct[0]) {
            store.commit("setProductByTitle", desiredProduct);
            store.commit("showResultSearchMessage");
          } else {
            console.warn(`Товара с названием "${productTitle}" не существует`);
            store.commit("noResultMessageByTitle", productTitle);
          }
        })
        .catch((error) => {
          console.warn(error.name, error.message);
        });
    },
    setProductsByCategory(store, sortProductsByCategory) {
      if (sortProductsByCategory.length === 0) {
        store.commit("noResultSearchMessage");
      } else {
        store.commit("showResultSearchMessage");
      }
      store.commit("setProductsByCategory", sortProductsByCategory);
    },
    searchProductsByFilter(store, sortProducts) {
      store.commit("setProductByFilter", sortProducts);
      if (sortProducts.length === 0) {
        store.commit("noResultSearchMessage");
      } else {
        store.commit("showResultSearchMessage");
      }
    },
    cancelChoiceSearchMessage(store) {
      store.commit("cancelChoiceSearchMessage");
    },
    noValueInSearchInput(store) {
      store.commit("noValueInSearchInput");
      store.commit("noResultSearchMessage");
    },
  },
  strict: process.env.NODE_ENV !== "production",
});
