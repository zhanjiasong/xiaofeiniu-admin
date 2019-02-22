<template>
    <div class="">
      <el-form label-width="100px">
        <el-form-item label="菜品图片:">
          <el-upload
           class="xfn-uploader"
           :action="uploadAction"
           :on-success="doUploadSucc"
            name='dishImg'
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl">
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  export default{
    data(){
      return {
        imageUrl:"",//要显示的预览图地址
        //可处理文件上传得到数据API 
        uploadAction:this.$store.state.globalSettings.apiUrl+"/admin/dish/image",
        formData:{
          title:"",
          imgUrl:"",      //菜品图片在服务器上的文件名称
          price:"",
          detail:"",
          categoryId:""
        }
      }
    },
    methods: {
      //文件上传成功后，客户端得到的响应消息之后的处理函数
      doUploadSucc(res,file){
        //res: 服务端返回的响应消息
        console.log(res)
        console.log(file)
        //file: 从INPUT[type=file] 中读取的第一个上传的文件对象
        //把上传二进制编码转化为DataURL字符串,自动绑定在img里的src属性
        this.imageUrl=URL.createObjectURL(file.raw);
        this.formData.imgUrl=res.fileName;
        
      }
    },
  }
</script>
<style lang="scss">
  .xfn-uploader{
    .el-upload{
      border:1px dotted #aaa;
      border-radius:3px;
      cursor: pointer;
      width:250px;
      height: 177px;
      overflow:hidden;
      &:hover{
        border-color: #409EFF;
      }
    }
    img{
      max-width: 100%;
    }
  }
</style>