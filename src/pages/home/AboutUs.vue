<!-- 关于我们 -->
<template>
  <div class="contact-main copy-main">
    <topbar title="معلومات عنا"></topbar>
    <div class="copy-content" :style="{'height': copyContentHeight}">
      <p>FridayIn قصة العلامة التجارية</p>
      <p class="mb30">فرايدي إن هو فريق توريد ملابس ركز بشكل كبير على منطقة الشرق الأوسط لسنوات عديدة 
  فرايدي  إن لديها فريق من المصممين المبدعين ، مع خبرة غنية في سوق الشرق الأوسط ، وموارد كثيرة في سلسلة التوريد عالية الجودة 
  اليوم ، عندما نختار التنوع ، لم يعد بإمكاننا الرضا عن نموذج توريد واحد ، نأمل ان نتقدم الى الامام ، ونلبي احتياجات عملائنا ، وفهم متطلباتهم واحتياجاتهم ، ونستخدم مواردنا المتنوعة عالية الجودة لتصبح فرايدي إن أفضل ماركة أزياء شابة . ولذلك أنشأنا فرايدي إن وهو متجر على الانترنت متخصص في بيع منتجات عالية الجودة والعديد من خيارات الوضة للنساء في الشرق الأوسط.</p>
      <p class="mb30">يطلق على فرايدي إن هذا الاسم ، لأن احد ميزات علامتنا التجارية هي ان كل يوم جمعة هو يوم الخصومات والعروض لدينا . العلامة التجارية التي نريد إنشاءها قريبة من الحياة، قريبة من تطلعات الجميع ، نأمل ان تكون تجربة التسوق التي نقدمها تجربة سهلة وممتعة وبأسعار تنافسية وجودة عالية </p>
      <p>Happy Friday Happy In</p>
      <p>نتمنى للجميع ارتداء ملابس مريحة وعصرية وأنيقة</p>
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
  mounted() {
    this.copyContentHeight = document.body.clientHeight - ((document.getElementsByClassName('copy-content')[0].offsetTop - document.getElementsByClassName('title')[0].offsetHeight) * 2 + document.querySelector('.global-top-bar .title').offsetHeight) + 'px'
  },
  methods: {}
}
</script>


