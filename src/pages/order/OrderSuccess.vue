<template>
  <div class="successful-main">
    <topbar title="تم تقديم الطلب بنجاح" :hasBack="false"></topbar>
    <div class="successful-content">
      <img src="../../images/order_success_bg.png" />
      <div class="title">{{successData.itemTitle}}</div>
      <div class="price">
        <div class="current-price" v-if="successData.actualPrice">SAR {{returnFloat(accDiv(successData.actualPrice, 100))}}</div>
        <!-- <div class="number">X {{successData.quantity}}</div> -->
      </div>
    </div>

    <div class="successful-line"></div>
    <!-- table -->
    <div class="successful-table-layout">
      <!-- 订单号、下单时间、订单状态、姓名、联系方式、收货地址 -->
      <ul class="successful-table">
        <li>
          <div class="content">{{successData.orderId}}</div>
          <div class="tab">رقم الأمر</div>
        </li>
        <li>
          <div class="content">{{successData.orderDate}}</div>
          <div class="tab">وقت الطلب</div>
        </li>
        <li>
          <div class="content">لم تشحن /جاري التعبئة</div>
          <div class="tab">حالة الطلب</div>
        </li>
        <li>
          <div class="content">{{successData.customerName}}</div>
          <div class="tab">الاسم الكامل</div>
        </li>
        <li>
          <div class="content">{{successData.mobile}}</div>
          <div class="tab">رقم الهاتف</div>
        </li>
        <li>
          <div class="content">{{successData.deliveryAddress}}</div>
          <div class="tab">عنوان التسليم</div>
        </li>
      </ul>
    </div>

    <!-- bottom - btn -->
    <div class="fixed-bottom">
      <router-link to="/index">
        <div class="btn">موافق والعودة إلى الصفحة الرئيسية</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderSuccess',
  data () {
    return {
      successData: {}
    }
  },
  computed: {},
  created () {
    this.orderSuccess()
  },
  mounted () {},
  methods: {
    orderSuccess() {
      const order_id = this.$route.query.id || null

      if (!order_id) {
        this.$Toast('الشبكة مشغولة. الرجاء معاودة المحاولة في	 وقت لاحق	.')
        // setTimeout(() => {
        //   this.$router.push('/index')
        // }, 3000)
      }

      this.request('OrderSuccess', {
        order_id,
      }).then((res) => {
        const { code, data, errorMessage } = res

        if (code === 0 && data) {
          this.successData = data
        } else {
          this.$Toast(errorMessage || 'الشبكة مشغولة. الرجاء معاودة المحاولة في	 وقت لاحق	.')
        }
      })
    }
  },
  beforeDestroy () {}
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.successful-main {
  min-height: 100vh;
  background-color: #fff;
  .successful-content {
    background-color: #fff;
    padding-bottom: 38/@rem;
    img {
      .wh(750, 376)
    }
    .title {
      margin: 25/@rem 125/@rem 20/@rem;
      margin-bottom: 25/@rem;
      font-size: 26/@rem;
      line-height: 26/@rem;
      color: #666666;
      text-align: center;
      .line2();
    }

    .price {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #464646;
      .current-price {
        font-size: 30/@rem;
        font-weight: bold;
        color: #FF2B2B;
        margin-right: 13/@rem;
      }
    }
  }
  .successful-line {
    background-color: #F6F6F6;
    width: 100%;
    height: 12/@rem;
  }

  .successful-table-layout {
    width: 100%;
    background-color: #ffffff;
    padding: 30/@rem;
  
    .successful-table {
      background-color: #F8F8F8;
      padding: 15/@rem 26/@rem;
      li {
        position: relative;
        padding: 15/@rem 0;
        line-height: 30/@rem;
        .clearfix();
        .content {
          float: left;
          width: 400/@rem;
          color: #666666;
          font-size: 22/@rem;
          
        }
        .tab {
          float: right;
          text-align: right;
          width: 140/@rem;
          color: #232323;
        }
      }
    }
  }
}
</style>
