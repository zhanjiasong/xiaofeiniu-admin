<template>
  <div class="Main">
    <el-container>
      <!-- 左侧导航栏 -->
        <el-aside width="200px">Aside</el-aside>
        <el-container>
          <!-- 顶部导航栏 -->
          <el-header height="60px">Header</el-header>
          <!-- 主体部分 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>


<script>
  export default{
    // 生命周期：create mount  update  destroy
    beforeCreate() {
      // 组件创建之前，先检查是否已经登录管理员
      if(!this.$store.state.adminName){
        this.$router.push("/login");//未登录则跳转至登录页面
      }
    },

  }
</script>
