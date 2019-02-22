<template>
  <div class="Login">
    <el-card class="xfn-login-card">
      <div slot="header">管理员登录</div>
      <div>
        <el-form label-width="100px">

          <el-form-item label="管理员名称">
            <el-input v-model="formData.aname" placeholder="请输入管理员名称"></el-input>
          </el-form-item>

          <el-form-item label="管理员密码">
              <el-input type="password" v-model="formData.apwd" placeholder="请输入管理员密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doLogin">登录按钮</el-button>
            <el-button @click="doCancel">取消</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default{
    data(){ //普通组件的模型数据是函数返回值
      return {
          formData:{ //表单中用户输入的两个数据
            aname:"admin",
            apwd:"123456"
          }
      }
    },
    methods: {
      doLogin(){//执行登录
        var url=this.$store.state.globalSettings.apiUrl+`/admin/login/${this.formData.aname}/${this.formData.apwd}`;
        // console.log(url);
        this.$axios.get(url).then((res)=>{
          if(res.data.code==200){//登陆成功
            //把用户名存入vuex存储仓库
            this.$store.commit("setAdminName",this.formData.aname);
            // console.log(this.$store.state.adminName)
            //执行视图跳转
            this.$router.push("/main");
          }else{
            this.$alert("用户名或者密码错误","登录失败",{type:"error"}).then(()=>{}).catch(()=>{})
          }
        }).catch((err=>{//登录失败
          console.log(err);
        }));
      },
      doCancel(){//清除用户数据
        this.formData.aname="";
        this.formData.apwd="";
      }
    },
  }
</script>

<style lang="scss">
  .xfn-login-card{
    width:450px;
    margin:150px auto;
    .el-card__header{
      text-align: center;
      font-size:1.2 rem;
    } 
  }
</style>

