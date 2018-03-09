<template>
  <div class="star" :class="starType">
    <span class="star-item" :class="itemClass"  v-for="itemClass in itemClasses" :key="itemClass.index"></span>
  </div>
</template>
<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default{
    name: 'star',
    props: [{
      size: {
        type: Number
      }
    }, {
      score: Number
    }],
    computed: {
      starType () {
        return 'star_' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasSemi = score % 1 !== 0
        let intger = Math.floor(score)
        for (let i = 0; i < intger; i++) { // 放入整颗星星
          result.push(CLS_ON)
        }
        if (hasSemi) { // 放入半颗
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) { // 放入灰色
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }

</script>
<style lang="less">
  .bg-img(){
    background-image: url('./star24_on@3x.png');
    @media(-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
      background-image: url('./star36_on@3x.png');
    }
  }
  ._common{
    background-repeat: no-repeat;
    display: inline-block;
  }
  .star{
    font-size: 0;
    &.star_48{
        .star_item{
          ._common;
          width: 20px;
          height: 20px;
          margin-right: 22px;
          background-size: 20px 20px;
          &:last-child{
            margin-right: 0;
          }
          &.on{
            .bg-img;
          }
          &.off{
            .bg-img;
          }
          &.half{
            .bg-img;
          }

        }
    }
    &.star_36{
      .star_item{
        ._common;
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-img;
        }
        &.off{
          .bg-img;
        }
        &.half{
          .bg-img;
        }
      }
    }
    &.star_24{
      .star_item{
        ._common;
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-img;
        }
        &.off{
          .bg-img;
        }
        &.half{
          .bg-img;
        }
      }
    }
  }

</style>
