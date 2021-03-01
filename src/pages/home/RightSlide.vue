<template>
  <div class="right-slide-main a-fadeinR" v-if="isShow">
    <div class="more-list">
      <div class="head">
        <img class="icon-more fr" src="../../images/icon_more_show.png" @click="iconMoreClick"/>
      </div>
      <div class="line"></div>
      <ul class="more-content">
        <!-- 联系我们 -->
        <li>
          <router-link to="/contactus">
            <div class="name">اتصل بنا</div>
            <img src="../../images/icon_more_list_1.png" />
          </router-link>
        </li>
        <!-- 关于我们 -->
        <li>
          <router-link to="/aboutus">
            <div class="name">معلومات عنا</div>
            <img src="../../images/icon_more_list_2.png" />
          </router-link>
        </li>
        <!-- 隐私政策 -->
        <li>
          <router-link to="/privacypolicy">
            <div class="name">خصوصية</div>
            <img src="../../images/icon_more_list_3.png" />
          </router-link>
        </li>
        <!-- 退货、换货 -->
        <li>
          <router-link to="/returngoods">
            <div class="name">الدفع / التسليم / العودة</div>
            <img src="../../images/icon_more_list_4.png" />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    iconMoreClick() {
      this.$emit('update:isShow', false)
    }
  }
}
</script>


<style lang="less" scoped>
@import '~less/tool.less';
.right-slide-main {
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -155/@rem;
  z-index: 15;
  height: 100vh;

  .more-list {
    width: 530/@rem;
    height: 100vh;
    background-color: #FFF;
    .head {
      position: relative;
      height: 88/@rem;
      .icon-more {
        .wh(44, 44);
        margin-top: 22/@rem;
        margin-right: 35/@rem;
      }
    }
    .line {
      width: 530/@rem;
      height: 20/@rem;
      background: #F7F7F7;
    }
    .more-content {
      padding: 0 35/@rem;
      li {
        .wh(458, 100);
        a {
          .wh(458, 100);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          border-bottom: 1px solid #E6E6E6;
          img {
            .wh(34, 34);
            margin-left: 28/@rem;
          }
        }
      }
      
    }
  }
}

// .right-slide-enter,
// .right-slide-leave-active {
//   // transform: translate(-146/@rem);
//   transform: translate(100%);
// }
// .right-slide-leave-active,
// .right-slide-enter-active {
//   transition: all .3s;
// }
</style>


