<template>
  <div class="home-main">
    <div class="home-index">
      <!-- topbar -->
      <div class="top-bar-main">
        <div class="top-bar">
          <div class="global-center bgc">
            <img class="icon-logo fl" src="../../images/icon_logo.png"/>
            <img class="icon-more fr" src="../../images/icon_more.png" @click="iconMoreClick"/>
          </div>
        </div>
        <div class="top-bar-mat"></div>
      </div>
      <!-- banner -->
      <a href="javascript:;" class="g-banner">
        <img src="../../images/h5_banner.jpg">
      </a>

      <!-- goods -->
      <div class="goods-layout" v-for="item in goodsData">
        <div class="goods-title">{{item.region}}</div>
        <Goods :data="item.data"></Goods>
        <div class="goods-line"></div>
      </div>
    </div>

    <RightSlide :isShow.sync="isShow"></RightSlide>
    <div class="bg-mask" :style="{'display': isShow ? 'block' : 'none'}" @click="clickHideRightSlide"></div>
  </div>
</template>

<script>
import Goods from './Goods'
import RightSlide from './RightSlide'

export default {
  name: 'homeIndex',
  data() {
    return {
      banners: [],
      params: {
        page: 1
      },
      goodsData: [], // 商品列表
      isShow: false, // 展示rightslide
    }
  },
  components: {
    Goods,
    RightSlide,
  },
  computed: {},
  created() {},
  watch: {},
  mounted() {
    this.getHomeData() //获取页面数据
  },
  methods: {
    // 获取页面除推荐列表外的数据
    getHomeData() {
      this.goodsData = []
      this.request('ListItems', {}).then((res) => {
        if (res.code === 0 && res.data) {
          const { regions, errorMessage } = res.data
          this.goodsData = regions
        } else {
          this.$Toast(errorMessage || 'الشبكة مشغولة. الرجاء معاودة المحاولة في	 وقت لاحق	.')
        }
      })
    },
    // 点击更多图标
    iconMoreClick() {
      this.isShow = true
      document.documentElement.style.overflow = 'hidden'
    },
    clickHideRightSlide() {
      this.isShow = false
      document.documentElement.style.overflow = 'auto'
    }
  }
}
</script>

<style lang="less">
@import '~less/tool.less';

.home-index {
  margin-bottom: 100/@rem;
  .top-bar-main {
    .top-bar {
      position: fixed;
      z-index: 5;
      left: 0;
      top: 0;
      width: 100%;
      height: 88/@rem;
      text-align: center;
     
      .bgc {
        height: 88/@rem;
        background-color: #fff;
        padding: 0 35/@rem;
      }

      .icon-logo {
        .wh(164, 44);
        margin-top: 22/@rem;
      }
      .icon-more {
        .wh(44, 44);
        margin-top: 22/@rem;
      }
    }
    .top-bar-mat {
      width: 100%;
      height: 88/@rem;
    }
  }

  .goods-layout {
    .goods-title {
      padding: 24/@rem 0;
      margin: 0 28/@rem;
      line-height: 38/@rem;
      font-size: 32/@rem;
      font-weight: bold;
      text-align: right;
    }
    .goods-line {
      width: 100%;
      height: 12/@rem;
      background-color: #FFFFFF;
    }
  }

  .loading {
    .height(80);
    text-align: center;
  }
}
.g-banner {
  width: 100%;
  img {
    width: 750/@rem;
    height: 422/@rem;;
  }
}
</style>


