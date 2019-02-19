<template>
    <div class="settings">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="'/main'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全局设置</el-breadcrumb-item>
      </el-breadcrumb>
      <br>
      <el-card shadow="never">
        <el-form label-width="110px">

          <el-form-item label="应用名称: ">
            <el-input v-model="formData.appName"></el-input>
          </el-form-item>

          <el-form-item label="应用API网址：">
            <el-input v-model="formData.apiUrl"></el-input>
          </el-form-item>

          <el-form-item label="后台管理端网址：">
            <el-input v-model="formData.adminUrl"></el-input>
          </el-form-item>

          <el-form-item label="客户端App网址：">
            <el-input v-model="formData.appUrl"></el-input>
          </el-form-item>

          <el-form-item label="ICP备案号：">
            <el-input v-model="formData.icp"></el-input>
          </el-form-item>

          <el-form-item label="版权声明：">
            <el-input v-model="formData.copyright"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doSubmit">保存修改</el-button>
            <el-button @click="doCancel">取消修改</el-button>
          </el-form-item>

        </el-form>  
      </el-card>
    </div>
  </template>


  <script>
    export default{
      data(){
        return {
          formData:{
            appName:"",
            apiUrl:"",
            adminUrl:"",
            icp:"",
            copyright:"",
            appUrl:""
          }
        }
      },
      mounted() {
        //将$store存储中的全局配置数据赋值给中间变量-formData,方便表单元素执行双向数据绑定
        //引用赋值，两个变量指向同一个对象
        // this.formData=this.$store.state.globalSettings;
        //对象赋值,创建两个一样的对象
        this.formData.appName=this.$store.state.globalSettings.appName;
        this.formData.apiUrl=this.$store.state.globalSettings.apiUrl;
        this.formData.adminUrl=this.$store.state.globalSettings.adminUrl;
        this.formData.icp=this.$store.state.globalSettings.icp;
        this.formData.copyright=this.$store.state.globalSettings.copyright;
        this.formData.appUrl=this.$store.state.globalSettings.appUrl;
      },
      methods: {
        doCancel(){
          this.formData.appName=this.$store.state.globalSettings.appName;
          this.formData.apiUrl=this.$store.state.globalSettings.apiUrl;
          this.formData.adminUrl=this.$store.state.globalSettings.adminUrl;
          this.formData.icp=this.$store.state.globalSettings.icp;
          this.formData.copyright=this.$store.state.globalSettings.copyright;
          this.formData.appUrl=this.$store.state.globalSettings.appUrl;
        },
        doSubmit(){
          var url=this.$store.state.globalSettings.apiUrl+"/admin/settings";
          this.$axios.put(url,this.formData).then((res)=>{
            if(res.data.code==200){
              this.$message({
                message: '修改成功',
                type: 'success',
                duration:1000
              });
              //TODO:修改$store中的全局设置
              this.$store.commit("setGlobalSettings",this.formData)
              //跳转至桌台列表
              this.$router.push("/table/list");
            }else{
              this.$message.error('修改失败');
            }
          }).catch((err)=>{
            console.log(err);
          })
        }
      },
    }
  </script>