<template>
  <div class="place-order-main">
    <div class="place-order-layout" v-show="!isShowAddressModal">
      <topbar title="معلومات الشحن"></topbar>
      
      <!-- 图片预加载 TODO  -->
      <div style="display:none;">
        <img v-for="item in skus" :src="item.colorUrl">
      </div>
      
      <!-- 价格不满足包邮 -->
      <div class="order-transport mb10">
        <div class="price-word bold">شحن مجاني </div>
        <div class="price-word"> لتحصل على </div>
        <div class="price-shipping">
          <span v-if="shipping !== 0">{{accDiv(freeShippingGap, 100)}} sar</span>
          <span v-if="shipping === 0">0 sar</span>
        </div>
        <div class="price-word">أشتري بأكثر من</div>
        <img src="../../images/icon_transport.png" />
      </div>

      <!-- sku信息 -->
      <div class="order-sku mb10">
        <div class="order-sku-left">
          <div class="title">{{confirmData.title}}</div>
          <div class="order-sku-amount-size">
            <div class="amount-btn">
              <div class="amount-decrease" :class="{'gray': params.quantity <= 1}" @click="clickDecrease">-</div>
              <div class="amount-number">{{params.quantity}}</div>
              <div class="amount-increase" :class="{'gray': params.quantity >= 20}" @click="clickIncrease">+</div>
            </div>
            <div class="size-btn" @click="clickSize">
              <div class="size-info">{{confirmData.colorName}},حر</div>
              <img src="../../images/icon_down.png" />
            </div>
          </div>
        </div>
        <div class="order-sku-right">
          <img :src="confirmData.picture" />
        </div>
      </div>

      <!-- 价格 -->
      <div class="order-price mb10">
        <div class="total-price">
          <div class="content">
            <span v-if="confirmData.currentPrice">SAR {{returnFloat(accDiv(confirmData.currentPrice * params.quantity, 100))}}</span>
          </div>
          <div class="tab">:إجمالي المنتج</div>
        </div>
        <div class="price-shipping">
          <div class="content">
            <span v-if="shipping">SAR {{returnFloat(accDiv(shipping, 100))}}</span>
            <span v-else>SAR 0</span>
          </div>
          <div class="tab">:الشحن</div>
        </div>
        <!-- 商品总价加邮费邮件 -->
        <div class="total">
          <div class="content price">
            <span v-if="confirmData.currentPrice">SAR {{returnFloat(accDiv((confirmData.currentPrice * params.quantity + shipping), 100))}}</span>
          </div>
          <div class="tab">:الاجمالي</div>
        </div>
      </div>

      <div class="order-presonal-info order-table-layout mb10">
        <ul class="order-table">
          <li>
            <!-- 姓名 -->
            <div class="content">
              <input 
                type="text" 
                placeholder="فهد عبدالعزيز الشمر" 
                v-model.trim="params.customerName" 
                @blur="checkCustomerName" />
              <div class="error-message">{{errorObj.customerName}}</div>
            </div>
          </li>
          <li class="line"></li>
          <li>
            <!-- 联系方式 -->
            <div class="content">
              <input 
                type="text" 
                placeholder="فهد عبدالعزيز الشمر" 
                v-model.trim="params.mobile"
                @blur="checkMobile" />
            </div>
            <div class="name">966+</div>
            <div class="error-message">{{errorObj.mobile}}</div>
          </li>
          <li class="line"></li>
          <li>
            <!-- 邮箱 -->
            <div class="content">
              <input 
                type="text" 
                placeholder="البريد الاكتروني *" 
                v-model.trim="params.email"
                @blur="checkEmail" />
              <div v-if="errorObj.email !== ''" class="line"></div>
              <div class="error-message" style="bottom: 0;">{{errorObj.email}}</div>
            </div>
          </li>
        </ul>
      </div>
      
      <div class="order-address order-table-layout mb10">
        <ul class="order-table">
          <!-- 省份 -->
          <li @click="clickAddressModal('state')">
            <img src="../../images/icon_left.png" class="icon-left"/>
            <div class="content">
              <input 
                type="text" 
                placeholder="الدولة/المقاطعة*"
                v-model.trim="params.state"
                disabled />
            </div>
            <div class="error-message">{{errorObj.state}}</div>
          </li>
          <li class="line"></li>
          <!-- 市区 -->
          <li @click="clickAddressModal('city')">
            <img src="../../images/icon_left.png" class="icon-left" />
            <div class="content">
              <input 
                type="text" 
                placeholder="المدينه*"
                v-model.trim="params.city"
                disabled />
            </div>
            <div class="error-message">{{errorObj.city}}</div>
          </li>
          <li class="line"></li>
          <!-- 详细地址 -->
          <li>
            <div class="content">
              <input 
                type="text" 
                placeholder=" لشارع، اسم الشركة، رقم المبنى أو رقم الفلا، الطابق..."
                v-model="params.detailAddress"
                @blur="checkDetailAddress" />
            </div>
            <div class="error-message">{{errorObj.detailAddress}}</div>
          </li>
          <li class="line"></li>
          <!-- 备注，非必填 -->
          <li>
            <div class="content">
              <input 
                type="text" 
                placeholder="ملحوظة"
                v-model="params.note"
                maxlength="200" />
            </div>
          </li>
        </ul>
      </div>

      <div class="order-payment mb10">
        <div class="title">طريقة الدفع او السداد</div>
        <img src="../../images/icon_cod.png" />
      </div>

      <div class="order-wechat">
        <div class="order-wechat-content">
          <div class="wechat-info">يمكنك إرجاع البضائع في غضون 7 أيام ،تسليم البضائع مجانًا والدفع عند التسليم.</div>
          <div class="wechat-info2">WhatsApp: +8615605810625</div>
        </div>
      </div>

      <div class="fixed-bottom">
        <div class="btn" @click="placeOrder">إرسال</div>
      </div>
    </div>

    <!-- 临时存放 - 后面抽离 - 颜色弹层 -->
    <div class="order-color-modal a-fadeinT" v-show="isShowModal" >
      <div class="order-sku">
        <img src="../../images/icon_close.png" class="icon-close" @click="clickHideModal" />
        <div class="order-sku-left">
          <div class="title mb20">{{confirmData.title}}</div>
          <div class="pirce-layout">
            <div class="price" v-if="confirmData.currentPrice">SAR {{returnFloat(accDiv(confirmData.currentPrice * params.quantity, 100))}}</div>
            <div class="original-price" v-if="confirmData.originalPrice">SAR {{returnFloat(accDiv(confirmData.originalPrice * params.quantity, 100))}}</div>
          </div>
        </div>
        <div class="order-sku-right">
          <img :src="confirmData.picture" />
        </div>
      </div>

      <div class="detail-content">
        <div class="tab-line"></div>
        <div class="tab-title">
          <div class="t1">رمادي</div>
          <div class="t2">:اللون</div>
        </div>
        <div class="sku-color">
          <div 
            class="color-border"
            :class="{'color-active': index === colorActiveIndex}"
            v-for="(item, index) in skus"
            @click="clickColor(index)">
            <img :src="item.colorUrl">
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

        <div class="color-modal-amount">
          <div class="amount-btn">
            <div class="amount-decrease" :class="{'gray': params.quantity <= 1}" @click="clickDecrease">-</div>
            <div class="amount-number">{{params.quantity}}</div>
            <div class="amount-increase" :class="{'gray': params.quantity >= 20}" @click="clickIncrease">+</div>
          </div>
          <div class="title">كمية</div>
        </div>
      </div>
      <div class="fixed-bottom" style="position: absolute;">
        <div class="btn" @click="clickHideModal">موافق</div>
      </div>
    </div>
    <div class="bg-mask" :class="{'show': isShowModal}" @click="clickHideModal"></div>
    
    <!-- 地址弹层 -->
    <AddressModal 
      :show="isShowAddressModal" 
      :clickClose="clickAddressModalClose"
      :modelState="modelState"
      @onstate="updateState" 
      @oncity="updateCity"></AddressModal>
  </div>

 
</template>

<script>
import AddressModal from '../common/AddressModal'
export default {
  data () {
    return {
      confirmData: {}, // 返回的数据
      skus: [], // skus
      colorActiveIndex: 0, // 颜色选择器
      isShowModal: false, // 显示sku弹层
      isShowAddressModal: false, // 显示地址弹层
      freeShippingGap: 0, // 相差的价格 要付邮费
      shipping: 0, // 邮费
      timerDecrease: null, // 减少定时器
      timerIncrease: null, // 增加定时器
      // debounceGetConfirmOrder: false, // 接口请求拦截器

      modelState: '', // 点击进入
      currentStateIndex: -1, // 当前选中的省
      currentCityIndex: -1, // 当前选中的市
      
      // 提交参数
      params: {
        itemId: '', // 商品ID
        color: '', // 颜色
        quantity: 1, // 数量

        customerName: '', // 姓名
        email: '', // 邮箱
        mobile: '', // 手机
        state: '', // 省份
        city: '', // 市
        detailAddress: '', // 详细地址
        note: '', // 备注
      },
      // 错误提示
      errorObj: {
        customerName: '',
        mobile: '',
        email: '',
        state: '',
        city: '',
        detailAddress: '',
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    window.dataLayer.push({
      event: 'Pageview',
      pagePath: '/placeorder'
    })
    document.body.scrollTop = document.documentElement.scrollTop = 0
    next()
  },
  beforeRouteLeave(to, from , next) {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    next()
  },
  components: {
    AddressModal
  },
  computed: {},
  created () {
    if (this.$route.query.source) {
      this.params.advertisingAgency = this.$route.query.source
    }
    this.getConfirmOrder()
    // 获取本地缓存数据
    try {
      let rememberData = localStorage.getItem('friday_in_place_order') || ''
      if (rememberData) {
        this.params =  Object.assign({}, this.params, JSON.parse(rememberData))
      }  
    } catch (error) {}
  },
  mounted () {},
  methods: {
    // 订单信息
    // 加减方法 - 需要去拿 shipping 和 freeShippingGap
    getConfirmOrder() {
      const id = this.$route.query.id
      const color = this.$route.query.color
      
      this.request('ConfirmOrder', {
        item_id: id,
        color,
        quantity: this.params.quantity, // 数量
      }).then(res => {

        const { code, data } = res
        
        if (code === 0 && data ) {
          const { color, skus, itemId, shipping, freeShippingGap } = data
          const len = skus.length

          // 邮费
          this.freeShippingGap = freeShippingGap || 0
          this.shipping = shipping

          this.params.itemId = itemId
          this.params.color = color
          this.skus = skus

          for (let i = 0; i < len; i++) {
            if (color === skus[i].colorName) {
              this.confirmData = skus[i]
              break
            }
          }
        } else {
          this.$Toast(res.errorMessage || 'الشبكة مشغولة. الرجاء معاودة المحاولة في	 وقت لاحق	.')
        }

      })
    },

    // 下单请求
    placeOrder() {
      let rememberData = {
        customerName: this.params.customerName,
        mobile: this.params.mobile,
        email: this.params.email,
        state: this.params.state,
        city: this.params.city,
        detailAddress: this.params.detailAddress,
        note: this.params.note || '',
        currentStateIndex: this.currentStateIndex,
        currentCityIndex: this.currentCityIndex,
      }
      
      // 校验是否填写完整
      if (!this.handleValidateAll()) return
      
      this.request('PlaceOrder', this.params).then((res) => {
        const { code, data, errorMessage } = res

        if (code === 0 && data) {
          // 记录本地操作数据
          localStorage.setItem('friday_in_place_order', JSON.stringify(rememberData))
          this.$router.push({
            path: '/ordersuccess?id=' + data.orderId + '&source=' + (this.$route.query.source || '')
          })
        } else {
          this.$Toast(errorMessage || 'الشبكة مشغولة. الرجاء معاودة المحاولة في	 وقت لاحق	.')
        }
      })
    },

    // 减法
    clickDecrease() {
      if (this.params.quantity <= 1) return

      this.params.quantity--
      if (this.timerDecrease !== null) {
        clearTimeout(this.timerDecrease)          
      }

      this.timerDecrease = setTimeout(() => {
        this.getConfirmOrder()
      }, 1000)
    },

    // 加法
    clickIncrease() {
      if (this.params.quantity >= 20) return

      this.params.quantity++
      if (this.timerIncrease !== null) {
        clearTimeout(this.timerIncrease)          
      }

      this.timerIncrease = setTimeout(() => {
        this.getConfirmOrder(true)
      }, 1000)
    },

    // 显示省、市 地址弹层
    clickAddressModal(state = '') {
      this.isShowAddressModal = true
      this.modelState = state  // state省 city市
    },

    // 关闭地址弹层
    clickAddressModalClose() {
      this.isShowAddressModal = false
      this.modelState = '' // 重置弹层状态
    },

    updateState(state, index) {
      this.params.state = state || ''
      this.currentStateIndex = index
      this.checkState()
    },

    updateCity(city, index) {
      this.params.city = city || ''
       this.currentCityIndex = index
      this.checkCity()
    },

    // 隐藏sku弹层
    clickHideModal() {
      this.isShowModal = false
    },
    
    // 点击选择size和颜色
    clickSize() {
      this.isShowModal = true
    },

    // 校验 - 辅助函数
    // params {String} name 校验的name
    // params {String} custom 自定义的文案
    // params {String} patt 正则
    handleValidate(name, custom, patt) {
      let reg =  null

      if (patt) {
        reg = new RegExp(patt)
      }
      
      if (this.params[name] === '' || (patt && !reg.test(this.params[name]))) {
        this.errorObj[name] = custom // 自定义提示信息
      } else {
        this.errorObj[name] = ''
      }
    },
    // 校验 - 所有的
    handleValidateAll() {
      this.checkCustomerName()
      this.checkMobile()
      this.checkEmail()
      this.checkState()
      this.checkCity()
      this.checkDetailAddress()

      let arr  = ['customerName', 'mobile', 'email', 'state', 'city', 'detailAddress']
      let arrError = []
      for (let i = 0; i < arr.length; i++) {
        let name = arr[i]
        if (this.errorObj[name] !== '') {
          arrError.push(name)
        }
      }
      
      // 如果有错误
      if (arrError.length) return false

      return true
    },
    // 校验 - 姓名
    checkCustomerName() {
      this.handleValidate('customerName', 'الرجاء إدخال الاسم الصحيح')
    },
    // 校验 - 手机
    checkMobile() {
      this.handleValidate(
        'mobile', 
        'يجب أن يتكون رقم الهاتف من 9 أرقام 	ويبدأ بـ 	5', 
        '^[5][0-9]{8}$'
      )
    },
    // 校验 - 邮箱
    checkEmail() {
      this.handleValidate(
        'email', 
        'الرجاء إدخال البريد الإلكتروني الصحيح', 
        '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
      )
    },

    // 校验 - 省
    checkState() {
      this.handleValidate('state', 'الرجاء تحديد المنطقة الصحيحة')
    },
    // 校验 - 市
    checkCity() {
      this.handleValidate('city', 'الرجاء تحديد المنطقة الصحيحة')
    },
    // 校验 - 详细地址
    checkDetailAddress() {
      this.handleValidate('detailAddress', 'الرجاء إدخال الاسم الصحيح')
    },
    // 点击颜色选择器
    clickColor(index) {
      this.colorActiveIndex = index
      this.confirmData = this.skus[index]
      this.params.color = this.skus[index].color
    },
  },
  beforeDestroy () {}
}
</script>

<style lang="less" scoped>
@import '~less/tool.less';
.place-order-main {
  // padding-bottom: 120/@rem;
  .order-transport {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 75/@rem;
    background-color: #FFF;
    font-size: 26/@rem;

    transition: all .4s;
    
    .price-shipping {
      margin: 0 10/@rem;
      color:#FF2B2B;
    }
    img {
      .wh(32, 32);
      margin-left: 18/@rem;
    }
    .bold {
      font-weight: bold;
      margin-right: 10/@rem;
    }
  }

  .order-price {
    width: 100%;
    height: 206/@rem;
    padding: 0 30/@rem;
    padding-top: 20/@rem;
    background-color: #FFF;
    
    & > div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .content {
      // width: 550/@rem;
      text-align: right;
      &.price {
        color: #FF2B2B;
        font-weight: bold;
      }
    }
    .tab {
      margin-left: 40/@rem;
      width: 110/@rem;
      text-align: right;
    }
    .total-price {
      height: 40/@rem;
    }
    .price-shipping {
      height: 40/@rem;
      margin-bottom: 20/@rem;
    }
    .total {
      border-top: 1px solid #EBEBEB;
      height: 80/@rem;
    }
  }

  .order-sku {
    background-color: #FFF;
    width: 100%;
    // height: 252/@rem;

    display: flex;
    justify-content: flex-end;
    padding: 20/@rem 30/@rem;
    .order-sku-left {
      position: relative;
      width: 550/@rem;
      text-align: right;
      .title {
        line-height: 26/@rem;
        font-size: 26/@rem;
        color: #666666;
        margin-bottom: 50/@rem;
        .line2();
      }
      .price {
        font-size: 32/@rem;
        font-weight: bold;
        color: #FF2B2B;
      }
      .order-sku-amount-size {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 48/@rem;
        display: flex;
        justify-content: flex-end;

        .amount-btn {
          width: 186/@rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          border-radius: 40/@rem;
          border: 1px solid #BDBDBD;
          cursor: pointer;
         
          
          .amount-increase {
            .whl(48, 44);
            font-size: 32/@rem;
          }
          .amount-number {
            .whl(90, 48);
            border-left: 1px solid #BDBDBD;
            border-right: 1px solid #BDBDBD;
          }
          .amount-decrease {
            .whl(48, 44);
            font-size: 32/@rem;
          }
          .gray {
            color: #9E9E9E;
          }
        }

        .size-btn {
          // .wh(175, 48);
          height: 48/@rem;
          background: #F6F6F6;
          border-radius: 8/@rem;
          display: flex;
          margin-left: 180/@rem;
          cursor: pointer;
          .size-info {
            padding-left: 20/@rem;
            height: 48/@rem;
            line-height: 48/@rem;
            color: #464646;
          }
          img {
            margin: 2/@rem;
            .wh(44, 44);
          }
        }
      }
    }
    .order-sku-right {
      margin-left: 30/@rem;
      img {
        .wh(117, 155);
      }
    }
  }
 
  .order-table-layout {
    width: 100%;
    background-color: #FFFFFF;
    padding: 0 30/@rem;
    .order-table {
      li {
        position: relative;
        width: 100%;
        display: flex;
        padding-right: 10/@rem;
        
        .name {
          height: 36/@rem;
          line-height: 36/@rem;
          margin: 40/@rem 0 0 20/@rem;
          padding-left: 20/@rem;
          border-left: 1px solid #EBEBEB;
        }
        .content {
          position: relative;
          width: 100%;
          input {
            width: 100%;
            height: 36/@rem;
            line-height: 36/@rem;
            padding: 40/@rem 0 20/@rem;
            box-sizing: content-box;
            text-align: right;
          }
          input:disabled {
            background-color: #fff;
            opacity: 1;
          }
          .line {
            border-top: 1px solid #EBEBEB;
            height: 35/@rem;
          }
        }
        .error-message {
          position: absolute;
          z-index: 2;
          right: 0;
          bottom: -34/@rem;
          text-align: right;
          color:#FF7979
        }

        .icon-left {
          .wh(44, 44);
          position: absolute;
          z-index: 2;
          left: 10/@rem;
          top: 36/@rem;
        }
      }
      // li:last-child {
      //   border: none;
      // }
      li.line {
        border-bottom: 1px solid #EBEBEB;
      }
    }
  }

  .order-payment {
    width: 100%;
    height: 158/@rem;
    background-color: #FFFFFF;
    padding: 30/@rem;
    text-align: right;
    .title {
      margin-bottom: 16/@rem;
    }
    img {
      .wh(211, 58);
    }

  }

  .order-wechat {
    width: 100%;
    background-color: #FFFFFF;
    padding: 30/@rem;
    margin-bottom: 120/@rem;
    .order-wechat-content {
      .wh(690, 126);
      padding: 30/@rem;
      background-color: #F8F8F8;
      color: #b5b5b5;
      text-align: right;
      & > div {
        line-height: 36/@rem;
      }
    }
  }
}

.order-color-modal {
  position: fixed;
  z-index: 15;
  bottom: 0;
  width: 100%;
  padding-bottom: 110/@rem;

  // left: 50%;
  // transform: translate(-50%);
  max-width: 750/@rem;
  background-color: #FFFFFF;

  .order-sku {
    position: relative;
    // border-bottom: 1px solid #EBEBEB;
    .original-price {
      color: #666666;
      font-size: 26/@rem;
      text-decoration: line-through;
    }
    .pirce-layout {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .order-sku-left .price {
      font-size: 36/@rem;
    }
    .order-sku-left .title {
      margin-top: 38/@rem;
    }
    .icon-close {
      position: absolute;
      z-index: 5;
      left: 20/@rem;
      top: 10/@rem;
      .wh(44, 44);
      cursor: pointer;
    }

    .order-sku-right {
      img {
        .wh(160, 212);
      }
    }
  }

  .detail-content {
    width: 100%;
    // height: 540/@rem;
    background-color: #FFFFFF;
    padding: 25/@rem 30/@rem;
    padding-top: 0;
    text-align: right;
    .title {
      font-size: 28/@rem;
      line-height: 36/@rem;
      color: #424242;
      .line2();
    }

    .tab-line {
      width: 100%;
      border-top: 1px solid #EBEBEB;
      margin-bottom: 35/@rem;
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

    .color-modal-amount {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 40/@rem;
      margin-bottom: 10/@rem;

      .amount-btn {
        width: 186/@rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 40/@rem;
        border: 1px solid #BDBDBD;
        cursor: pointer;
        
        .amount-increase {
          .whl(48, 44);
          font-size: 32/@rem;
        }
        .amount-number {
          .whl(90, 48);
          border-left: 1px solid #BDBDBD;
          border-right: 1px solid #BDBDBD;
        }
        .amount-decrease {
          .whl(48, 44);
          font-size: 32/@rem;
        }
        .gray {
          color: #9E9E9E;
        }
      }

      .title {
        margin-left: 17/@rem;
      }
    }
    
  }
}
</style>
