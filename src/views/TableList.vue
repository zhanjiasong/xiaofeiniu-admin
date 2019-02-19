<template>
    <div class="xfn-table-list">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="'/main'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>桌台管理</el-breadcrumb-item>
        <el-breadcrumb-item>桌台列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <el-col v-for="n in 48" :xs="12" :sm="8" :md="6" :lg="4" :xl="2">餐桌</el-col>
      </el-row>
    </div>
  </template>