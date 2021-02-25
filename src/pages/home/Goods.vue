<template>
  <div class="goods-main" v-if="data.length">
    <div class="goods-list">
      <router-link 
        v-for="item in data" 
        :to="{path: '/detail', query: {id: item.id, source: ($route.query.source || '')}}" 
        class="goods-link fl" 
        >
        <div class="goods-img">
          <img v-lazy="item.picUrl"/>  
        </div>
        <div class="goods-desc">
          <p class="title">{{item.title}}</p>
          <div class="price">
            <div class="original-price" v-if="item.originalPrice">SAR&nbsp;{{returnFloat(accDiv(item.originalPrice, 100))}}</div>
            <div class="current-price red">SAR&nbsp;{{returnFloat(accDiv(item.currentPrice, 100))}}</div>
          </div>
        </div>
      </router-link>
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
      background: #FFFFFF;
      img {
        .wh(334, 455);
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
