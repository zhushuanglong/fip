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
          <a href="javascript:;" @click="clickContact">
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
  beforeRouteLeave(to, from , next) {
    document.documentElement.style.overflow = 'auto'
    next()
  },
  methods: {
    clickContact() {
      if (window.navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        // window.location.href = 'https://wa.me/8615605810625'
        setTimeout(() => {
          window.location.href = 'https://itunes.apple.com/us/app/whatsapp-messenger/id310633997?mt=8'
        }, 2000)
      } else if (window.navigator.userAgent.match(/android/i)) {
        // window.location.href = 'https://wa.me/8615605810625'
        setTimeout(() => {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.whatsapp'
        }, 2000)
      }
      window.location.href = 'https://wa.me/8615605810625'
    }
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
