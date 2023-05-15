<template>
  <div class="app-container">
    <el-card class="box-card" shadow="never">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="用户名">
          <el-input v-model="formInline.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="正常" value="0" />
            <el-option label="封禁" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <div>
              <el-button type="primary" size="mini" icon="el-icon-plus">新建</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </div>
          </template>
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column align="center" width="50">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="用户名" width="110">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column label="昵称" width="110" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="邮箱" width="210" align="center">
            <template slot-scope="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="状态" width="110" align="center">
            <template slot-scope="scope">
              <el-tag size="small" :type="scope.row.status | statusFilter">{{ ['正常','封禁'][scope.row.status] }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="更新时间">
            <template slot-scope="scope">
              <span>{{ scope.row.updated_at }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="创建时间">
            <template slot-scope="scope">
              <span>{{ scope.row.created_at }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="210">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div class="table-pagination-box">
        <el-pagination
          background
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      formInline: {
        username: '',
        status: ''
      },
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      total: 0 // 总条数
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
        this.total = response.data.total
      })
    },
    // 处理分页条数变化事件
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
    },
    // 处理当前页码变化事件
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>
