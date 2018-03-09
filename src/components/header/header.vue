<template>
  <div>
    <div class="header-wrapper">
      <div class="header-content">
        <div class="header-content_left">
          <img :src="seller.avatar" width="64" height="64"/>
        </div>
        <div class="header-content_right">
          <div class="brand_desc">
            <div class="brand-name">{{seller.name}}</div>
            <div class="brand-delivery">{{seller.description}}/{{seller.deliveryTime}}分送达</div>
            <div  class="brand-discount">
              <div ref="box" class="list-box">
                <div v-for="item in seller.supports" :class="{animate: isShow}">
                  <span class="icon" :class="icon[item.type]"></span>
                  <span>{{item.description}}</span>
                  {{item.description}}
                </div>
              </div>
            </div>
          </div>
          <div class="brand-discount-amt">5</div>
        </div>
      </div>
      <div class="header-caution">{{seller.bulletin}}</div>
    </div>
    <div class="seller-desc" :style="{display: bool}">

    </div>
  </div>
</template>
<script>
  export default{
    name: 'header',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        isShow: false,
        icon: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    created () {
      setInterval(this.showAction, 1000)
    },
    methods: {
      showAction () {
        var that = this
        setTimeout(function () {
          that.seller.supports.push(that.seller.supports[0])
          that.seller.supports.shift()
          that.isShow = !that.isShow
        }, 1000)
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/css/mixin.less";
  @images:  '../../assets/imgs';
  .header-wrapper{
    width: 100%;
    height: 135px;
    background-color: #f7f7f7;
    .header-content{
      box-sizing: border-box;
      padding: 24px 12px 18px 24px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .header-content_left{
        width: 64px;
        height: 64px;
        margin-right: 18px;
      }
      .header-content_right{
        flex: 1;
        height: 64px;
        position: relative;
        .brand_desc{
          width: 180px;
          .brand-name{
           .bg-img('@{images}/brand');
            background-position: left;
            background-repeat: no-repeat;
            background-size: 30px 18px;
            text-indent: 33px;
            line-height: 18px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 6px;
            margin-bottom: 6px;
          }
          .brand-delivery{
            font-size: 12px;
            height: 14px;
            line-height: 14px;
            margin-bottom: 6px;
          }
          .brand-discount{
            height: 14px;
            font-size: 12px;
            line-height: 14px;
            overflow-y: hidden;
            position: relative;
            .list-box{
              height: 14px;
              position: absolute;
              top:0;
              left:0;
              div{
                height: 14px;
                overflow: hidden;
                span {
                  height: 14px;
                  display: inline-block;
                  float: left;
                }
                .icon{
                  width: 14px;
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                  &.decrease{
                    .bg-img('@{images}/decrease_1');
                  }
                  &.discount{
                    .bg-img('@{images}/discount_1');
                  }
                  &.invoice{
                    .bg-img('@{images}/invoice_1');
                  }
                  &.special{
                    .bg-img('@{images}/special_1');
                  }
                  &.guarantee{
                     .bg-img('@{images}/guarantee_1');
                   }
                }

              }
              .animation{
                transition: all 1s;
              }
            }

          }
        }
        .brand-discount-amt{
          width: 30px;
          height: 12px;
          line-height: 12px;
          font-size: 12px;
          text-align: center;
          border-radius: 14px;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
    .header-caution{
      width: 100%;
      height: 28px;
      background-color: #f1f1f1;
      font-size: 14px;
      line-height: 28px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      box-sizing: border-box;
      padding-left: 24px;
      padding-right: 12px;
    }
  }
  .seller-desc{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background-color: rgba(7,17,27,0.8);
  }

</style>
