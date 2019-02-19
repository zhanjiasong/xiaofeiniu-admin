<template>
    <div class="xfn-category-list">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="'/main'">首页</el-breadcrumb-item>
          <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
          <el-breadcrumb-item>桌台列表</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-button type="primary" size="mini" @click="addCategory">+ 添加新的菜品类别</el-button>
        <br>
        <br>
        <el-table :data="categoryList" stripe border>
          <el-table-column label="编号" prop="cid"></el-table-column>
          <el-table-column label="名称" prop="cname"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <el-button size="mini" @click="deleteCategory(row,$index)" type="success" sizi="mini" plain>删除</el-button>
              <el-button size="mini" type="danger" @click="updateCategory(row,$index)" plain>修改</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </template>

  <script>
    export default{
      data(){
        return{
          categoryList:[]
        }
      },
      mounted() {
        var url=this.$store.state.globalSettings.apiUrl+"/admin/category";
        this.$axios.get(url).then((res)=>{
          this.categoryList=res.data;
        }).catch((err)=>{
          console.log(err)
        })
      },
      methods: {
        addCategory(){
          this.$prompt("请添加菜品","提示",{
            confirmButtonText: 'OK',
            cancelButtonText: 'CANCEL',
            type:"info"
          }).then(({value})=>{
            //获得用户输入，调用API添加到数据库
            // console.log({value})
            var url=this.$store.state.globalSettings.apiUrl+"/admin/category";
            this.$axios.post(url,{cname:value}).then((res)=>{
              if(res.data.code==200){//添加成功
                this.$message.success('添加成功');
                //数据模型中添加新类别
                this.categoryList.push({cid:res.data.cid,cname:value});
              }else{
                this.$message.error('添加失败'+res.data.msg);
              }
            }).catch((err)=>{console.log(err)})
          }).catch(()=>{})
        },
        deleteCategory(c,i){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(()=>{
            var url=this.$store.state.globalSettings.apiUrl+`/admin/category/${c.cid}`;
            this.$axios.delete(url).then((res)=>{
              if(res.data.code==200){//数据库删除成功
                this.categoryList.splice(i,1);//模型数据中删除
                this.$message.success('删除成功');
              }else{
                this.$message.error('删除失败'+res.data.msg);
              }
            }).catch((err)=>{
              console.log(err)
            })
          }).catch(()=>{})
          
        },
        updateCategory(c,i){
          this.$prompt("请输入要修改的类别名","提示",{
            inputValue:c.cname
          }).then(({value})=>{

          }).catch(()=>{})
        }
      },
    }
  </script>