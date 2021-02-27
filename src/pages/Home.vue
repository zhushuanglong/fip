<template>
  <div>
    <HomeIndex></HomeIndex>
    <!-- bottom bar -->
    <div class="global-bottom-bar">
      <ul class="global-center">
        <li>
          <router-link to="/index" >
            <img src="../images/icon_home.png" />
            <p>الصفحة الرئيسية</p>
          </router-link>
        </li>
        <li>
          <a href="javascript:;">
            <img src="../images/icon_contact.png" />
            <p>اتصل</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HomeIndex from './home/Index'
export default {
  name: 'home',
  components: {
    HomeIndex
  },
  beforeRouteLeave: function(to, from , next){
    document.documentElement.style.overflow = 'auto'
    next()
  }
}
</script>

<style lang="less">
@import '~less/tool.less';
.goods-info {
  padding: 20/@rem 20/@rem 40/@rem;
  .text {
    .line1();
    text-align: center;
    font-size: 28/@rem;
    height: 50/@rem;
    line-height: 50/@rem;
  }
  .price {
    text-align: center;
    display: block;
    height: 40/@rem;
    line-height: 40/@rem;
    font-size: 28/@rem;
    color: @orange;
    padding-right: 10/@rem;
  }
}
</style>
