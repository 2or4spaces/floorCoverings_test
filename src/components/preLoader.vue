<template>
  <div class="circle">
    <p>Подождите, пожалуйста, идет загрузка товаров</p>
    <span class="ring wheel">
      <span class="left"><span class="anim"></span></span>
      <span class="right"><span class="anim"></span></span>
    </span>
  </div>
</template>

<script>
export default {
  name: "preLoader",
};
</script>

<style lang="scss" scoped>
$color-main-green: #78b833;
$color-light-green: #d1e3ca;

.circle {
  margin-top: 20vh;
  font-size: 1.8rem;
  text-align: center;
  color: $color-main-green;

  .ring {
    position: relative;
    display: inline-block;
    height: 46px;
    width: 46px;
    margin: 1em;
    border-radius: 50%;
    background: none repeat scroll 0 0 $color-light-green;
    overflow: hidden;

    &:after {
      content: "";
      position: absolute;
      top: 9px;
      left: 9px;
      display: block;
      height: 28px;
      width: 28px;
      background: none repeat scroll 0 0 white;
      border-radius: 50%;
    }

    > span {
      position: absolute;
      height: 100%;
      width: 50%;
      overflow: hidden;
    }

    .left {
      left: 0;

      .anim {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }

    .right {
      left: 50%;

      .anim {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        left: -100%;
        transform-origin: 100% 50% 0;
        animation-name: ui-spinner-rotate-right;
        animation-delay: 0;
        animation-delay: 1s;
      }
    }

    .anim {
      position: absolute;
      left: 100%;
      top: 0;
      height: 100%;
      width: 100%;
      border-radius: 999px;
      background: none repeat scroll 0 0 $color-main-green;
      opacity: 0.8;
      animation: ui-spinner-rotate-left 4s infinite;
      transform-origin: 0 50% 0;
      animation-delay: -1s;
      animation-duration: 4s;
      animation-timing-function: linear;
    }
  }
}

@keyframes ui-spinner-rotate-right {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes ui-spinner-rotate-left {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
