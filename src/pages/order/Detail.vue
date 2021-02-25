<template>
  <div class="detail-main">
    <topbar :titleImg="true" :toHome="true" :hasBack="false"></topbar>
    <div class="detail-swipe">
      <swiper 
        class="swiper"
        ref="mySwiper"
        :options="swiperOption" 
        >
        <swiper-slide
          v-for="(goodsImage, index) in imgList"
          :key="goodsImage"
          >
          <img :src="goodsImage" @click="clickShowBigImage(index)"/>
        </swiper-slide>
      </swiper>
      <div class="swiper-pagination" id="swiperPagination" style="display: none;"></div>
      <div class="detail-swipe-pagination">{{swiperImgIndex + 1}} / {{imgList.length}}</div>
    </div>

    <!-- 核心内容 -->
    <div class="detail-content mb20">
      <div class="title mb30">{{currentSku.title}}</div>
      <div class="price mb30">
        <div class="original-price" v-if="currentSku.originalPrice">SAR&nbsp;{{returnFloat(accDiv(currentSku.originalPrice, 100))}}</div>
        <div class="current-price red"  v-if="currentSku.currentPrice">SAR&nbsp;{{returnFloat(accDiv(currentSku.currentPrice, 100))}}</div>
      </div>
      <div class="tab-title">
        <div class="t1">رمادي</div>
        <div class="t2">:اللون</div>
      </div>
      <div class="sku-color">
        <div class="color-border" v-for="(item, index) in data.skus" :class="{'color-active': index === colorActiveIndex}" @click="clickColor(index)">
          <img :src="item.colorUrl" />
        </div>
      </div>
      <div class="tab-title">
        <div class="t1">الحجم</div>
        <div class="t2">:مجانا</div>
      </div>
      <div class="info-table">
        <ul class="table-ul table-header">
          <li>الطول</li>
          <li>خط الورك</li>
          <li>محيط الخصر</li>
          <li>بحجم</li>
        </ul>
        <ul class="table-ul table-body">
          <li>90 سم</li>
          <li>88 سم</li>
          <li>62-93 سم</li>
          <li>مجانا</li>
        </ul>
      </div>
    </div>

    <!-- 备注提示 -->
    <ul class="detail-note mb20">
      <li>
        <div class="title">ضمان عالي الجودة</div>
        <img src="../../images/icon_detail_1.png">
      </li>
      <li>
        <div class="title">يمكنك إرجاع خلال 7 أيام </div>
        <img src="../../images/icon_detail_2.png">
      </li>
      <li>
        <div class="title">التوصيل السريع</div>
        <img src="../../images/icon_detail_3.png">
      </li>
      <li>
        <div class="title">الدفع عند الاستلام</div>
        <img src="../../images/icon_detail_4.png">
      </li>
    </ul>

    <!-- 尺码信息 -->
    <div class="detail-size mb20">
      <div class="title mb30">ملاحظة رسمية</div>
      <ul class="size-table mb30">
        <li>
          <div class="content"> 2-5 يوم عمل</div>
          <div class="tab">وقت التسليم:</div>
        </li>
        <li>
          <div class="content">في غضون ساعة</div>
          <div class="tab">وقت معالجة الطلب:</div>
        </li>
        <li>
          <div class="content">وقت المعالجة + وقت الشحن =</div>
          <div class="tab"> وقت الاستلام</div>
        </li>
        <li>
          <div class="content"> السعودية ، الإمارات العربية المتحدة</div>
          <div class="tab">الخدمات:</div>
        </li>
        <li>
          <div class="content">بما في ذلك ضريبة القيمة المضافة</div>
          <div class="tab">الوصف الضريبي:</div>
        </li>
        <li>
          <div class="content">الدفع عند الإستلام السعودي حاليا يدعم فقط الدفع عن طريق</div>
          <div class="tab">ملاحظة:</div>
        </li>
      </ul>
      <div class="size-contact">
        <div class="email">service@fridayin.com: البريد الإلكتروني الرسمي</div>
        <div class="phone">+ 86 15605810625 الرسمي</div>
        <div class="address">إذا كانت لديك أي أسئلة ، فلا تتردد في الاتصال بنا ، شكرًا لتعاونك.</div>
      </div>
    </div>

    <!-- 详细信息 -->
    <div class="detail-info mb20" style="display: none;">
      <div class="title">تفاصيل المنتج</div>
      <div v-html="data.detail"></div>
    </div>

    <!-- 吸底操作栏 -->
    <div class="detail-bottom">
      <div class="detail-operation">
        <div class="contact">
          <div class="title">اتصل الآن</div>
          <img src="../../images/icon_detail_contact.png" >
        </div>
        <router-link :to="{path: '/placeorder', query: {id: data.id, color: currentColor,source: ($route.query.source || '')}}" class="btn">اشتري الآن</router-link>
      </div>
    </div>

    <!-- 放大图层效果 -->
    <!-- <swiper 
      class="swiper"
      :options="swiperOption2" 
      >
      <swiper-slide
        v-for="(goodsImage, index) in imgList"
        :key="goodsImage"
        >
        <img v-lazy="goodsImage" @click="hideBigImage(index)"/>
      </swiper-slide>
    </swiper> -->
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// import 'swiper/swiper.less'

let vm = null // 局部变量挂载

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data () {
    return {
      data: {}, // 接口返回数据
      currentSku: {}, // 当前选中的sku信息
      imgList: [], // 录播图
      colorActiveIndex: 0, // 颜色选择器
      currentColor: '', // 当前选择的颜色
      swiperImgIndex: 0, // 轮播计数器
      swiperImgIndex2: 0, // 轮播计数器2
      swiperOption: {
        slidesPerView: 'auto', // 滚动显示数
        // lazy: {
        //   loadPrevNext: true, // 有bug
        // },
        spaceBetween: 3, // 图片间隔
        pagination: {
          el: '.swiper-pagination', // 征用：用于捕获坐标
        },
        on: {
          touchEnd () {
            setTimeout(() => {
              let pagination = document.getElementById('swiperPagination')
              let spanList = pagination.querySelectorAll('span')
              let spanActive= pagination.querySelectorAll('.swiper-pagination-bullet-active')[0]
              let len = spanList.length

              for (let i = 0; i < len; i++) {
                if (spanList[i] == spanActive) {
                  vm.swiperImgIndex = i
                  break
                }
              }
            }, 300)
          },
        },
      },
      // swiperOption2: {
      //   pagination: {
      //     el: '.swiper-pagination',
      //   },
      //   on: {
      //     touchEnd () {
      //       setTimeout(() => {
      //         let pagination = document.getElementById('swiperPagination2')
      //         let spanList = pagination.querySelectorAll('span')
      //         let spanActive= pagination.querySelectorAll('.swiper-pagination-bullet-active')[0]
      //         let len = spanList.length

      //         for (let i = 0; i < len; i++) {
      //           if (spanList[i] == spanActive) {
      //             vm.swiperImgIndex2 = i
      //             break
      //           }
      //         }
      //       }, 300)
      //     },
      //   },
      // }
    }
  },
  created () {
    vm = this
    this.getDetailData()
  },
  computed: {
    swiper: function () {
      return this.$refs.mySwiper.swiperInstance
    },
  },
  mounted () {},
  methods: {
    // 获取详情页基础数据
    getDetailData() {
      this.request('QueryItem', {
        id: this.$route.query.id || ''
      }).then(res => {
        const { code, data, errorMessage } = res
        if (code === 0) {
          this.data = data
          this.currentSku = data.skus[0]
          this.currentColor = data.skus[0].colorName
          // 获取轮播图数据
          this.imgList = this.currentSku.picturesUrls
        } else {
          this.$Toast(errorMessage)
        }
      }, err => {
        this.$Toast(err)
      })
    },
    
    // 点击sku color 选择器
    clickColor(index) {
      this.swiper.slideTo(0, 0, false)

      this.colorActiveIndex = index
      let skusIndex = this.data.skus[index]
      this.currentColor = skusIndex.colorName
      this.imgList = skusIndex.picturesUrls
      this.swiperImgIndex = 0
    },

    // 展示大图
    clickShowBigImage(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less/tool.less";
.detail-main {
  padding-bottom: 108/@rem;

  // 核心详情内容
  .detail-content {
    width: 100%;
    height: 540/@rem;
    background-color: #FFFFFF;
    padding: 25/@rem 30/@rem;
    text-align: right;
    .title {
      font-size: 28/@rem;
      line-height: 36/@rem;
      color: #424242;
      .line2();
    }

    .price {
      height: 40/@rem;
     
      .original-price {
        display: inline-block;
        font-size: 26/@rem;
        text-decoration: line-through;
        color: #666666;
        margin-right: 10/@rem;
      }
      .current-price {
        display: inline-block;
        font-size: 42/@rem;
        font-weight: bold;
      }
    }
    
    .tab-title {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 28/@rem;
      margin-bottom: 20/@rem;
      .t1 {
        color: #232323;
      }
      .t2 {
        color: #999999;
      }
    }

    .sku-color {
      display: flex;
      margin-bottom: 30/@rem;
      flex-direction: row-reverse; // 倒序排列
      .color-border {
        border-radius: 100%;
        border: 1px solid #E8E8E8;
        margin-left: 30/@rem;
        padding: 6/@rem;
        img {
          .wh(46, 46);
          border-radius: 100%;
        }
      }
      .color-active {
        border: 1px solid #424242;
      }
    }

    .info-table {
      width: 690/@rem;
      height: 110/@rem;
      background-color: #F7FCFD;
      .table-ul {
        height: 55/@rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #FFFFFF;

        &.table-header {
          color: #999999;
        }
        &.table-body {
          color: #666666;
        }

        li {
          width: 25%;
          text-align: center;
          border-right: 1px solid #FFFFFF;
        }
      }
    }
  }
  
  // 备注
  .detail-note {
    width: 100%;
    padding: 30/@rem;
    background-color: #FFFFFF;
    padding-bottom: 7/@rem;
    .clearfix();
    li {
      float: left;
      width: 50%;
      display: flex;
      // align-items: center;
      justify-content: flex-end;
      line-height: 32/@rem;
      margin-bottom: 23/@rem;
      .title {
        color: #464646;
        height: 25/@rem;
      }
      img {
        .wh(32, 32);
        margin-left: 12/@rem;
      }
    }
  }

  // 尺码
  .detail-size {
    width: 100%;
    background-color: #FFFFFF;
    padding: 30/@rem;
    text-align: right;

    .title {
      height: 30/@rem;
      font-size: 32/@rem;
      font-weight: bold;
      color: #232323;
    }

    .size-table {
      border: 1px solid #e6e6e6;

      li {
        position: relative;
        height: 75/@rem;
        line-height: 75/@rem;
        padding: 0 20/@rem;
        border-bottom: 1px solid #e6e6e6;
        .clearfix();
        .content {
          float: left;
          width: 490/@rem;
          padding-right: 20/@rem;
          color: #666666;
          font-size: 22/@rem;
          border-right: 1px solid #e6e6e6;
        }
        .tab {
          float: right;
          width: 155/@rem;
          color: #232323;
        }
      }
      li:last-child {
        border: none;
      }
    }

    .size-contact {
      line-height: 36/@rem;
      color: #666666;
      font-size: 26/@rem;
      padding: 25/@rem 20/@rem;
      background-color: #F6F6F6;
    }


  }

  // 详细信息
  .detail-info {
    background-color: #FFFFFF;
    padding: 25/@rem 30/@rem;
    text-align: right;
    .title {
      height: 31@rem;
      font-size: 32/@rem;
      font-weight: bold;
      color: #232323;
    }
  }
  
  // 详情底部
  .detail-bottom {
    position: fixed;
    z-index: 100;
    bottom: 0;
    width: 100%;
    background-color: #FFFFFF;
    border-top: 1px solid #DDDDDD;
    padding: 14/@rem 30/@rem;

    .detail-operation {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 80/@rem;

      .contact {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 17/@rem;
        
        img {
          .wh(44, 44);
          margin-left: 14/@rem;
        }
      }
      .btn {
        .whl(500, 80);
        text-align: center;
        font-size: 32/@rem;
        color: #FFFFFF;
        background-color: #FF2B2B;
        font-weight: bold;
      }
    }
  }

  // 轮播
  .detail-swipe {
    position: relative;
    width: 100%;
    height: 560/@rem;
    overflow: hidden;
    .swiper-slide {
      width: 510/@rem !important;
      img {
        width: 510/@rem;
        // .wh(510, 560);
      }
      // img[lazy=loading] {
      //   width: 1rem;
      //   position: absolute;
      //   left: 2.3rem;
      // }
      &:last-child {
        margin-right: 0;
      }
    }
    .detail-swipe-pagination {
      position: absolute;
      bottom: 22/@rem;
      right: 32/@rem;
      z-index: 2;

      height: 36/@rem;
      line-height: 36/@rem;
      padding: 0 12/@rem;
      border-radius: 18px;
      
      background-color: rgba(0,0,1,.3);
      border-radius: 18/@rem;
      color: #fff;
    }
  }
  
}
</style>
