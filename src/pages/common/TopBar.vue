<template>
  <div class="global-top-bar-main">
    <div class="global-top-bar">
      <div class="global-top-bar-center">
        <template v-if="toHome">
          <a class="home" href="/index" >
            <img src="../../images/icon_home.png" >
          </a>
        </template>
        <template v-else-if="hasClose">
          <a class="back" href="javascript:;" @click="clickClose">
            <img src="../../images/icon_close.png">
          </a>
        </template>
        <template v-else-if="backUrl">
          <router-link class="back" :to="{path: '/' + backUrl}">
            <img src="../../images/icon_back.png">
          </router-link>
        </template>
        <template v-else-if="hasBack">
          <a class="back" href="javascript:;" @click="clickPageBack">
            <img src="../../images/icon_back.png">
          </a>
        </template>
        <div class="title-img" v-if="titleImg"><img src="../../images/icon_logo.png" ></div>
        <div class="title" v-else>{{title}}</div>
      </div>
    </div>
    <div class="global-top-bar-block"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    title: {
      type: String,
      default: ''
    },
    // back url
    backUrl: {
      type: String,
      default: ''
    },
    hasBack: {
      type: Boolean,
      default: true
    },
    hasClose: {
      type: Boolean,
      default: false
    },
    clickClose: {
      type: Function,
      default: () => {}
    },
    toHome: {
      type: Boolean,
      default: false
    },
    titleImg: {
      type: Boolean,
      default: false
    },
    
  },
  data() {
    return {
      showIcon: false,
    }
  },
  mounted() {},
  methods: {
    clickPageBack() {
      this.$router.go(-1);
    },
  }
}
</script>


