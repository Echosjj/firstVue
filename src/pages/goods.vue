<template>
  <div class="goods">
    <div class="menu_wrapper">
      <ul>
        <li class="menu-item" v-for="(item ,index) in goods" :key="index" :class="{'current': currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <v-iconClassMap v-show="item.type > 0" :iconType="item.Type"></v-iconClassMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods_wrapper">
      <ul>
        <li class="food_list" v-for="(item, index) in goods" :key="index" >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in goods" :key="index" @click="selectFood(food,index)">
              <div class="pic"></div>
              <div class="desc">
                <h1>{{food.name}}</h1>
                <div v-if="food.description" class="">{{food.description}}</div>
                <div>月售{{food.sellcount}}份 好评率{{food.rating}}%</div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old">￥{{food.oldPrice}}</span>
                </div>
              </div>
              <div class="cartControl_wrapper">
                <v-cartControl :foodItem="food"></v-cartControl>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></v-shopcar>
    <v-foodinfo :food="selectFood" ref="foodinfo"></v-foodinfo>
  </div>
</template>
<script>

</script>
