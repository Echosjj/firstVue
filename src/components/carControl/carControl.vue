<template>
  <div class="control">
    <transition name="move">
      <div class="decrease" v-for="foodItem.count > 0" @click.stop.prevent="decreaseCar($event)">
        <span class="inner icon-remove_circle_outline "></span>
      </div>
    </transition>
    <div class="car-count" v-food="foodItem.count > 0">{{foodItem.count}}</div>
    <div class="add icon-add_circle" @click.stop.prevent="addCar($event)"></div>
  </div>
</template>
<script>
export default{
  name: 'carControl',
  props: {
    foodItem: {
      type: Object
    }
  },
  methods: {
    decreaseCar (event) {
      if (!event._constructed) { // 阻止pc端点击后执行两次
        return
      }
      if (this.foodItem.count) {
        this.foodItem.count--
      }
    },
    addCar (event) {
      if (!event._constructed) {
        return
      }
      if (!this.foodItem.count) {
        this.$set(this.foodItem.count, 'count', 1)
      } else {
        this.foodItem.count++
      }
      this.$root.eventHub.$emit('car.add', event.target)
    }
  }
}

</script>
<style lang="less">
  .control{
    .decrease{
      display: inline-block;
      padding: 6px;
      transition: all 0.4s linear;
      .inner{
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        transition: all 0.4s linear;
      }
      &.move-enter-active{
        opacity: 1;
        -webkit-transform: translate3d(0,0,0);
        -moz-transform: translate3d(0,0,0);
        -ms-transform: translate3d(0,0,0);
        -o-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
        .inner{
          transform: rotate(0);
        }
      }
      &.move-enter,&.move-leave-to{
        opacity: 0;
        transform: translated3d(24px, 0, 0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .car-count{
      font-size: 10px;
      line-height: 24px;
      vertical-align: top;
      display: inline-block;
      padding: 6px;
      color: rgba(147, 153, 159);
    }
    .add{
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: rgba(0,160,220);
    }


  }


</style>

