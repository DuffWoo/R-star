<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

// 二级分类导航
const route = useRoute()
const categoryFilter = ref({})
const getCategoryFilter = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  // console.log(res)
  categoryFilter.value = res.data.result
}
onMounted(() => getCategoryFilter())

// 基础列表数据渲染
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getSubCategory = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  // console.log(res)
  goodList.value = res.data.result.items
}
onMounted(() => getSubCategory())

// tab 切换回调
const tabChange = () => {
  console.log('TAB', reqData.value.sortField)
  reqData.value.page = 1,
  getSubCategor()
}

// 无限滚动 - 加载更多
const disabled = ref(false)
const load = async () => {
  reqData.value.page++ // 获取下一页数据
  const res = await getSubCategoryAPI(reqData.value) // 获取老数据
  const newData = res.data.result.items
  goodList.value = [...goodList.value, ...newData] // 拼接新老数据
  if (newData.length === 0) { // 加载完成 结束监听
    disabled.value = true
  }
}

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryFilter.parentId}` }">{{ categoryFilter.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilter.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
         <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :key="goods.id" :goods="goods" v-infinite-scroll="load" :infinite-scroll-disabled="disabled"/>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>