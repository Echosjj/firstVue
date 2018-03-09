<template>
  <div>
    <v-header :seller="seller"></v-header>
    <ul class="tab" style="padding: 0 0;margin: 0 0;">
      <li class="tab_item">
        <router-link to="/Goods">商品</router-link>
      </li>
      <li class="tab_item">
        <router-link to="/Ratings">评论</router-link>
      </li>
      <li class="tab_item">
        <router-link to="/Seller">商家</router-link>
      </li>
    </ul>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import {urlToObj} from './assets/js/common'
  const ERR_OK = 0
  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    data () {
      return {
        seller: {
          id: (() => {
            let query = urlToObj()
            return query.id
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
        res = res.body
        if (res.erron === ERR_OK) {
          console.log(res.data)
          this.seller = Object.assign({}, this.seller, res.data)
          console.log(this.seller)
        }
      })
    }
  }
</script>

<style lang="less">
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position:relative;
    &:after{
      content:'';
      display:block;
      position:absolute;
      left:0;
      bottom:0;
      width:100%;
      border:1px solid rgba(7,17,27,0.1)
    }

    .tab_item{
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
        &.active{
          color: rgb(240,20,20);
        }
      }
    }
  }

</style>
