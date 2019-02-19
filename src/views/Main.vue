<template>
  <div class="Main">
    <el-container>
      <!-- 左侧导航栏 -->
        <el-aside width="200px">
          <el-menu :unique-opened="true" :router="true" :default-openeds="defaultOpeneds" :default-active="defaultActive">
            <!-- 菜单项1 -->
            <el-menu-item index="/settings">
              <i class="el-icon-setting"></i>
              <span slot="title">全局设置</span>
            </el-menu-item>
            <!-- 菜单项2 -->
            <el-submenu index="table">
              <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">桌台管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/table/list">所有桌台</el-menu-item>
                <el-menu-item index="/table/add">添加桌台</el-menu-item>
                <el-menu-item index="/table/delete">删除桌台</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 菜单项3 -->
            <el-menu-item index="/category/list">
              <i class="el-icon-message"></i>
              <span slot="title">菜品类别</span>
            </el-menu-item>
            <!-- 菜单项4 -->
            <el-submenu index="dish">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">菜品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/dish/list">所有菜品</el-menu-item>
                  <el-menu-item index="/dish/add">添加菜品</el-menu-item>
                  <el-menu-item index="/dish/delete">删除菜品</el-menu-item>
                  <el-menu-item index="/dish/update">修改菜品</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <!-- 菜单项5 -->
            <el-menu-item index="/order/list">
              <i class="el-icon-date"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
            <!-- 菜单项6 -->
            <el-menu-item index="/security">
              <i class="el-icon-bell"></i>
              <span slot="title">安全管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <!-- 顶部导航栏 -->
          <el-header height="60px">
              <main-header></main-header>
          </el-header>
          <!-- 主体部分 -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>


<script>
  import MainHeader from "../components/MainHeader"
  export default{
    data(){ //数据属性
      return {

      }
    },
    computed: { //计算属性 = 数据属性 + 操作方法
      defaultOpeneds(){
        if(this.$route.path.indexOf("/table")==0){
          //用户当前在浏览/table/xxx菜单项
          return ['table'];
        }else if(this.$route.path.indexOf("/dish")==0){
          return ['dish'];
        }else{
          return [];
        }
      },
      defaultActive(){
        // 用户当前访问哪一页，就把对应的菜单项置为"当前激活项"
        return this.$route.path;
      }
    },

    // 生命周期：create mount  update  destroy
    beforeCreate() {
      // 组件创建之前，先检查是否已经登录管理员
      if(!this.$store.state.adminName){
        this.$router.push("/login");//未登录则跳转至登录页面
      }
    },
    components:{ //当前组件内部使用过的子组件列表
      MainHeader
    }

  }
</script>

<style>
  
</style>
