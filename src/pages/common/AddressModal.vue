<template>
  <div class="address-main a-fadeinT" v-if="show" >
    <topbar title="اختر العنوان" :hasClose="true" :clickClose="clickClose"></topbar>
    <div class="title mb20">
      <span v-if="isShowCity" class="current-state" @click="clickChooseState">{{currentState}}</span>
      <span v-if="isShowCity" class="choose-city">اختر المدينة</span>
      <span v-else>{{title}}</span>
    </div>
    <div class="address-content">
      <ul>
        <li 
          v-if="isShowState"
          v-for="(state, index) in stateMap"
          :class="{'active': currentStateIndex === index}"
          @click="clickSate(state, index)">
          {{state}}
        </li>

        <li
          v-if="isShowCity"
          v-for="(city, index) in cityMap[currentState]"
          :class="{'active': currentCityIndex === index}"
          @click="clickCity(city, index)"
        >
          {{city}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    clickClose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      title: 'اختر الولاية / المقاطعة', // 选择省
      isShowState: true, // 显示省
      isShowCity: false, // 显示市

      currentState: '', // 已选的省
      currentCity: '', // 已选的市
      currentStateIndex: -1, // 当前省的索引
      currentCityIndex: -1, //当前市的索引
      // 省
      stateMap: [
        'الباحة',
        'الجوف',
        'الحدود الشمالية',
        'الرياض',
        'الشرقية',
        'القصيم',
        'المدينة المنورة',
        'تبوك',
        'جازان',
        'حائل',
        'عسير',
        'مكة المكرمة',
        'نجران'
      ],
      cityMap: {
        'الباحة': [
          'الباحة',
          'العقيق',
          'اللأطاولة',
          'المظيلف',
          'المندق',
          'بلجرشي',
          'قلوة',
          'مخواه',
        ],
        'الجوف': [
          'الحديثة',
          'القريات', 
          'حالة عمار', 
          'دومة الجندل',
          'سكاكا',
          'طبرجل',
        ],
        'الحدود الشمالية': [
          'رفحاء',
          'طريف', 
          'عرعر', 
        ],
        'الرياض': [
          'الأرطاوية',
          'الأفلاج',
          'الحريق',
          'الخرج',
          'الدرعية',
          'الدلم',
          'الدوادمي',
          'الرياض',
          'الزلفي',
          'السليل',
          'الشفاء',
          'العيينة',
          'الغاط',
          'القصب',
          'القويعية',
          'المجمعة',
          'المزاحمية',
          'أم الجماجم',
          'تمير',
          'ثادق',
          'جلاجل',
          'حريملاء',
          'حوطة بني تميم',
          'حوطة سدير',
          'رماح',
          'روضة سدير',
          'ساجر',
          'شقراء',
          'صلبوخ',
          'ضرما',
          'عفيف',
          'مرات',
          'وادي الدواسر',
        ],
        'الشرقية': [
          'الجبيل',
          'الحوية',
          'الخبر',
          'الخفجي',
          'الدمام',
          'السفانية',
          'الصرّار',
          'الظهران',
          'العثمانية',
          'العضيلية',
          'القارة',
          'القطيف',
          'القيصومة',
          'المبرز',
          'الهفوف',
          'بطحاء',
          'بقيق',
          'تاروت',
          'حرض',
          'حفر الباطن',
          'رأس الخير',
          'رأس تنورة',
          'سلوى',
          'سيهات',
          'صفوى',
          'عنك',
          'عين دار',
          'عيون',
          'قرية العليا',
          'مليجة',
        ],
        'القصيم': [
          'البدائع',
          'البكيرية',
          'التنومه',
          'الدليمية',
          'الرس',
          'بريدة',
          'رياض الخبراء',
          'ضرية',
          'عقلة الصقور',
          'عنيزة',
          'عين ابن فهيد',
          'مذنب',
        ],
        'المدينة المنورة': [
          'الحناكية',
          'العلا',
          'المدينة',
          'بدر',
          'خيبر',
          'مهد الدهب',
          'ينبع',
        ],
        'تبوك': [
          'البدع',
          'الوجه',
          'أملج',
          'تبوك',
          'تيماء',
          'حقل',
          'ضبا',
        ],
        'جازان': [
          'أبو عريش',
          'أحد المسارحة',
          'الدرب',
          'العارضة',
          'الكربوس',
          'بيش',
          'جيزان',
          'صامطة',
          'صبيا',
          'ضمد',
          'فرسان',
        ],
        'حائل': [
          'حائل',
        ],
        'عسير': [
          'ابها',
          'أحد رفيدة',
          'التنومه',
          'الحرجة',
          'المجاردة',
          'النماص',
          'الواديين',
          'بارق',
          'بللسمر',
          'بيشة',
          'تثليث',
          'خميس مشيط',
          'رجال ألمع',
          'سبت العلايا',
          'سراة عبيدة',
          'ظهران الجنوب',
          'محايل عسير',
        ],
        'مكة المكرمة': [
          'البرك',
          'التنعيم',
          'الجموم',
          'الخرمة',
          'الطائف',
          'القنفذة',
          'الليث',
          'النوارية',
          'الهدا',
          'بحره',
          'تربة',
          'ثول',
          'جدة',
          'جعرانة',
          'خليص',
          'ذهبان',
          'رابغ',
          'رنية',
          'عسفان',
          'عمق',
          'مستورة',
          'مكه',
          'نمران',
        ],
        'نجران': [
          'شرورة',
          'نجران',
        ]
      },
    }
  },
  mounted() {},
  watch: {},
  methods: {
    clickSate(state, index) {
      this.isShowState = false
      this.isShowCity = true

      if (this.currentState !== state) {
        this.currentState = state
        this.currentStateIndex = index
        this.currentCity = ''
        this.currentCityIndex = -1

        this.$emit('onstate', state)
        this.$emit('oncity', '')
      }
    },
    clickCity(city, index) {
      this.currentCity = city
      this.currentCityIndex = index
      // this.$emit('update:show', false)
      this.clickClose()
      this.$emit('oncity', city)
    },
    clickChooseState() {
      this.isShowState = true
      this.isShowCity = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less/tool.less";
.address-main {
  width: 100%;
  height: 100vh;
  background-color: #FFFFFF;
  overflow-y: scroll;

  .title {
    position: fixed;
    top: 91/@rem;
    left: 0;
    width: 100%;
    z-index: 2;

    background-color: #FFFFFF;
    padding: 30/@rem 47/@rem;
    line-height: 36/@rem;
    font-size: 28/@rem;
    font-weight: bold;
    color: #F26E6E;
    text-align: right;
    border-bottom: 20/@rem solid #FAFAFA;

    .choose-city {
      margin-right: 50/@rem;
    }
    .current-state {
      color: #232323;
    }
  }

  .address-content {
    background-color: #FFFFFF;
    padding: 0 32/@rem;
    margin-top: 116/@rem;
    padding-bottom: 20/@rem;
    ul {
      li {
        position: relative;
        border-bottom: 1px solid #EBEBEB;
        color: #232323;
        padding: 25/@rem 45/@rem;
        line-height: 36/@rem;
        text-align: right;

        &.active {
          &::before {
            .wh(44, 44);
            background: url('~images/icon_on.png') no-repeat;
            background-size: 100% auto;
            content: "";
            position: absolute;
            top: 20/@rem;
            left: 0;
          }
        }
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
