<!-- 联系我们 -->
<template>
  <div class="contact-main copy-main">
    <topbar title="اتصل بنا"></topbar>
    <div class="copy-content" :style="{'height': copyContentHeight}">
      <p class="mb30">اتصل بنا
  هل لديك أسئلة او تحتاج الى الحصول على مزيد من المعلومات حول منتج او طلب ؟
  في كلتا الحالتين انت في المكان الصحيح ! نحن هنا من أجلك ز
  للحصول على المساعدة يمكنك التواصل معنا عن طريق الواتس اب او عن طريق البريد الالكتروني </p>
      <p>WhatsApp: +8615605810625</p>
      <p>Email: service@fridayin.com</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyContentHeight: '100vh'
    }
  },
  beforeRouteEnter(to, from, next) {
    window.dataLayer.push({
      event: 'Pageview',
      pagePath: '/contactus'
    })
    document.body.scrollTop = document.documentElement.scrollTop = 0
    next()
  },
  mounted() {
    this.copyContentHeight = document.body.clientHeight - ((document.getElementsByClassName('copy-content')[0].offsetTop - document.getElementsByClassName('title')[0].offsetHeight) * 2 + document.querySelector('.global-top-bar .title').offsetHeight) + 'px'
  },
  methods: {}
}
</script>
