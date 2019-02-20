<template>
    <div class="xfn-table-info">
      <el-card shadow="hover">
        <div class="xfn-table" :style="{background:getTableColor(data.status)}">{{data.tid}}号桌:{{data.status | tableStatus}}</div>
        <el-button type="sucess" plain size="mini" @click="showTableDetail">详情</el-button>
        <el-button type="danger" plain size="mini">修改</el-button>
      </el-card>
      <!-- 桌台详情对话框 -->
      <el-dialog :title="data.tid+'桌台详情'" :visible="dialogTableDetailVisible" :before-close="closeDialogTableDetail">
        <!-- 对话框主体 -->
        <el-tabs type="card" @tab-click="makeQRCode">
            <el-tab-pane label="桌台状态" name="first">桌台状态</el-tab-pane>
            <el-tab-pane label="桌台二维码" name="second">
              <img :src="qrcodeData">
            </el-tab-pane>
        </el-tabs>
        <!-- 对话框尾部 -->
        <div slot="footer">
          <el-button type="primary" @click="dialogTableDetailVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  export default{
    data(){
      return {
        dialogTableDetailVisible:false,
        qrcodeData:"" //Base64编码的字符串
      }
    },
    props:['data'],
    methods: {
      getTableColor(status){
        if(status==1){
          return "#67c23a"
        }else if(status==2){
          return "#e6a23c"
        }else if(status==3){
          return "#f56c6c"
        }else{
          return "#909399"
        }
      },
      showTableDetail(){
        this.dialogTableDetailVisible=true;
      },
      closeDialogTableDetail(){
        this.dialogTableDetailVisible=false;
      },
      makeQRCode(){
        //创建二维码--注意此方法不能在当前组件的miunted中调用，因为绘图必需的canvas在el-dialog中，对话框在组件加载时并不在dom树
        var qrcode=require("qrcode");
        //每个桌子对应的Url应该形如：http://127.0.0.1:3000/#/3  3为当前桌号
        var tableUrl=this.$store.state.globalSettings.apiUrl+"/#/"+this.data.tid;
        // 把绘制得到的图片二进制数据转换为Base64编码字符串
        qrcode.toDataURL(tableUrl,{
          width:300,
          errorCorrectionLevel:"H"
        },(err,url)=>{
          this.qrcodeData=url;
        })
      }
    },
  }
</script>
<style lang="scss">
  .xfn-table-info{
    padding: 3px;
    text-align: center;
    .xfn-table{
      width: 90%;
      height: 120px;
      line-height:120px;
      border:1px solid #aaa;
      box-shadow:3px -4px 5px #666;
      margin:5px auto;
      border-radius:50%;
    }
  }
</style>