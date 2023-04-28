<template>
  <div class="cart" @click.prevent="chooseProduct">
    <div class="cart-image">
      <img :src="productSrc" alt="product photo" class="cart-photo" />
    </div>
    <div class="cart-info">
      <p class="cart-info_title">
        {{ productTitle }}
      </p>
      <p class="cart-info_id">
        Артикул №<span>{{ productId }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "productCard",
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
  emits: ["chooseProduct"],
  methods: {
    chooseProduct() {
      this.$emit("chooseProduct", this.productId);
    },
  },
};
</script>

<style lang="scss" scoped>
$color-main-brown: #593f25;

.cart {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid $color-main-brown;
  border-radius: 20px;
  background-color: white;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px $color-main-brown;
    transform: scale(1.05);
  }

  .cart-image {
    width: 50%;
    height: 50%;

    .cart-photo {
      display: block;
      width: 100%;
      object-fit: contain;
      margin: 10% 0;
    }
  }

  .cart-info {
    margin: 2% 10%;
    color: $color-main-brown;

    .cart-info_title {
      font-size: 1.5rem;
      font-weight: 900;
      margin: 5% 0;
    }

    .cart-info_id {
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
  }
}
</style>
