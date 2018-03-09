<template>
  <span class="icon" :class="classMap[iconType]"></span>
</template>
<script>
  export default{
    name: 'iconClassMap',
    data () {
      return {
        classMap: []
      }
    },
    props: {
      iconType: {
        type: Number
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>
<style lang="less">
  .icon{
    width: 12px;
    height: 12px;
    display: inline-block;
    background-size: 12px 12px;
    vertical-align: top;
    &.decrease{
      background-image: url("./decrease_4@2x.png");
      @media(-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
        background-image: url("./decrease_4@3x.png");
      }
    }
    &.discount {
      background-image: url("./discount_4@2x.png");
      @media(-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
        background-image: url("./discount_4@3x.png");
      }
    }
    &.special{
      background-image: url("./special_4@2x.png");
      @media(-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
        background-image: url("./special_4@3x.png");
      }
    }
    &.invoice{
      background-image: url("./invoice_4@2x.png");
      @media(-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
        background-image: url("./invoice_4@3x.png");
      }
    }
    &.guarantee{
      background-image: url("./guarantee_4@2x.png");
      @media(-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
        background-image: url("./guarantee_4@3x.png");
      }
    }
  }

</style>
