<template>
  <div class="goods-main" v-if="data.length">
    <div class="goods-list">
      <a href="javascript:;" 
        class="goods-link fl" 
        v-for="item in data"
        @click="clickGoods(item.id)"
        >
        <div class="goods-img">
          <img v-lazy="item.picUrl"/>
          <div class="img-active"></div>
        </div>
        <div class="goods-desc">
          <p class="title">{{item.title}}</p>
          <div class="price">
            <div class="original-price" v-if="item.originalPrice">SAR&nbsp;{{returnFloat(accDiv(item.originalPrice, 100))}}</div>
            <div class="current-price red">SAR&nbsp;{{returnFloat(accDiv(item.currentPrice, 100))}}</div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeGoods',
  props: {
    // 数据
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    clickGoods(id) {
      setTimeout(() => {
        this.$router.push('/detail?id=' + id + '&source=' + (this.$route.query.source || ''))
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
@import "~less/tool.less";
.goods-main {
  padding: 0 30/@rem;
  .goods-list {
    .clearfix();
    .goods-link {
      display: block;
      width: 334/@rem;
      margin-right: 22/@rem;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
    .goods-img {
      position: relative;
      background: #FFFFFF;
      img {
        .wh(334, 455);
      }
      .img-active {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background: rgba(0, 0, 0, 0.3);
        transition: all .4s;
      }
    }

    .goods-link:active {
      .img-active {
        opacity: 1;
      }
    }

    .goods-desc {
      padding: 20/@rem 0;
      .title {
        margin-bottom: 20/@rem;
        line-height: 24/@rem;
        text-align: center;
        font-size: 24/@rem;
        color: #666666;
        .line2();
      }
      .price {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 30/@rem;
        .original-price {
          font-size: 24/@rem;
          text-decoration: line-through;
          color: #CACACA;
        }
        .current-price {
          font-size: 26/@rem;
          font-weight: bold;
          margin-left: 10/@rem;
        }
      }
    }
  }
}
</style>
