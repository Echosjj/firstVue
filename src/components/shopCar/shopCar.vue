<template>
  <div class="shopcar">
    <div class="content">
      <div class="left">
        <div class="carlogo" :class="{'highlight': totalCount > 0}">
          <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
        </div>
        <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
      </div>
      <div class="price" :class="{'highlight': totalPrice > 0}"> ￥{{totalPrice}} 元</div>
      <div class="desc"> 另需配送费￥{{deliveryPrice}}</div>
      <div class="right" @click.stop.prevent="pay">
        <div class="minPriceDesc" :class="isEnglish">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball_container">
      <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-for="(ball, index) in balls" :key="index" v-show="ball.show" >
          <span class="inner inner_hook" ></span>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="shopCar_list" v-show="listShow">
        <div class="list_header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list_content" ref="listContent">
          <ul>
            <li class="food" v-for="(food, index) in selectFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>{{food.price*food.count}}</span>
              </div>
              <div class="carContronl_wrapper">
                <v-carControl :foodItem="food"></v-carControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="maskMove">
      <div class="mask" v-show="listShow" @click.stop.prevent="hideList"></div>
    </transition>
    <div class="payMethods_wrapper" v-show="payMethodsShow">
      <div class="payMethods_contener">
        <div class="head">
          <h2 class="title">请选择支付方式</h2>
        </div>
        <div class="payMethods_list">
          <ul>
            <li class="payMethods">
              <input type="radio"/>
              <i class="ico"></i>
              <span class="info">微信支付</span>
            </li>
            <li class="payMethods">
              <input type="radio"/>
              <i class="ico">
                <img src="" alt=""/>
              </i>
              <span class="info">支付宝</span>
            </li>
            <li class="payMethods">
              <input type="radio"/>
              <i class="ico">
                <img src="" alt=""/>
              </i>
              <span class="info">网上银行</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="back">
        <div class="backBtn" @click="back">返回上一页</div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import carControl from '../carControl/carControl.vue'
  export default {
    name: 'shopCar',
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 20,
            count: 2
          }]
        }
      }


    },
    components: {
      'v-carControl': carControl
    },
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true,
        payMethodsShow: false
      }
    },
    created () {
      // 获取组件按钮的点击属性，用在drop方法里
      this.$root.eventHub.$on('cart.add', this.drop)
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((item) => {
          total += item.price * item.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((item) => {
          count += this.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let differPrice = this.minPrice - this.totalPrice
          return `还差${differPrice}元起送`
        } else if (this.totalPrice >= this.minPrice) {
          return '去结算'
        }
      },
      isEnough () { // 切换结算样式
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () { // 判断是否展开详情页
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      drop (ele) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = ele
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter (ele) {
        let len = this.balls.length
        while (len--) {
          let ball = this.balls[len]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            ele.style.dispaly = ''
            ele.style.webkitTransform = `translate3d(0,${y}px, 0 )`
            ele.style.transform = `translate3d(0, ${y}px, 0)`
            let inner = ele.getElementsByClassName('inner_hook')[0]
            inner.style.webkitTransform = `translate3d(${x}, 0, 0)`
            inner.style.tansform = `translate3d(${x}, 0, 0)`
          }
        }
      },
      enter (ele) {
        ele.offsetHeight // 触发浏览器重绘 offsetHeight和offsetWidth都可以
        this.$nextTick(() => {
          ele.style.webkitTransform = `translate3d(0,0,0)`
          ele.style.transform = `translate3d(0,0,0)`
          let inner = ele.getElementsByClassName('inner_hook')[0]
          inner.style.webkitTransform = `translate3d(0,0,0)`
          inner.style.transform = 'translated3d(0,0,0)'
        })
      },
      afterEnter (ele) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          ele.style.dispaly = 'none'
        }
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      hideList () {
        this.fold = true
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      pay () {
        if (this.totalPrice === 0) {
          return
        }
        this.payMethodsShow = true
      },
      back () {
        this.payMethodsShow = false
      }
    }
  }

</script>
<style>



</style>
