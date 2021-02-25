<template>
  <div id="app">
    <!-- router content -->
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less">
@import "~less/base";
@import "~less/mint";
@import "~less/animate";

img[lazy=loading],
img[lazy=error] {
  background: url("./images/lazy.png") no-repeat center center;
  background-size: 50% auto;
}
</style>
