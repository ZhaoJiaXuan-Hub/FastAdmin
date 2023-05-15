<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="12" :lg="6" :md="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="card-header">
            <span>总销售额</span>
            <el-tag size="small">日</el-tag>
          </div>
          <div class="analysis-chart-card-num">
            ￥ 12,4523
            <div class="analysis-chart-card-content" style="padding-top: 18px;">
              <span class="ele-action">
                <span>周同比12%</span>
                <i class="el-icon-caret-top ele-text-danger" />
              </span>
              <span class="ele-action">
                <span>日同比11%</span>
                <i class="el-icon-caret-bottom ele-text-success" />
              </span>
            </div>
            <el-divider />
            <div class="analysis-chart-card-text">总销售额 ¥12,42543</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :md="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="card-header">
            <span>访问量</span>
            <el-tag size="small" type="danger">日</el-tag>
          </div>
          <div class="analysis-chart-card-num">
            885667
            <div id="container" class="analysis-chart-card-content" />
            <el-divider />
            <div class="analysis-chart-card-text">总访问量 12,42543</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :md="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="card-header">
            <span>支付笔数</span>
            <el-tag size="small" type="warning">月</el-tag>
          </div>
          <div class="analysis-chart-card-num">
            452344
            <div id="container2" class="analysis-chart-card-content" />
            <el-divider />
            <div class="analysis-chart-card-text">转化率 60%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :md="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="card-header">
            <span>运营活动效果</span>
            <el-tag size="small" type="success">周</el-tag>
          </div>
          <div class="analysis-chart-card-num">
            78%
            <div id="container3" class="analysis-chart-card-content" />
            <el-divider />
            <div class="analysis-chart-card-text">
              <span class="ele-action">
                <span>周同比12%</span>
                <i class="el-icon-caret-top ele-text-danger" />
              </span>
              <span class="ele-action">
                <span>日同比11%</span>
                <i class="el-icon-caret-bottom ele-text-success" />
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :lg="18" :md="18">
        <el-card class="diy-box-card" shadow="never">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="销售量" name="sales">
              <div id="sales-view" />
            </el-tab-pane>
            <el-tab-pane id="access-view" label="访问量" name="access">配置管理</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6" :md="6">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="card-header">
            <span>支付渠道</span>
          </div>
          <div id="sales-channel-view" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { TinyArea, TinyColumn, Progress, Column, Pie, Bar } from '@antv/g2plot'

export default {
  name: 'Dashboard',
  mounted() {
    const data = [
      264,
      417,
      438,
      887,
      309,
      997,
      550,
      575
    ]
    const tinyArea = new TinyArea('container', {
      height: 45,
      autoFit: true,
      data,
      smooth: true
    })
    const tinyColumn = new TinyColumn('container2', {
      height: 45,
      autoFit: true,
      data,
      tooltip: {
        customContent: function(x, data) {
          return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`
        }
      }
    })
    const progress = new Progress('container3', {
      height: 45,
      autoFit: true,
      percent: 0.7,
      color: ['#5B8FF9', '#E8EDF3']
    })
    progress.render()
    tinyArea.render()
    tinyColumn.render()

    const data_two = [
      {
        month: '1月',
        sales: 1345
      },
      {
        month: '2月',
        sales: 3412
      },
      {
        month: '3月',
        sales: 1452
      },
      {
        month: '4月',
        sales: 5425
      },
      {
        month: '5月',
        sales: 2353
      },
      {
        month: '6月',
        sales: 2416
      },
      {
        month: '7月',
        sales: 865
      },
      {
        month: '8月',
        sales: 999
      },
      {
        month: '9月',
        sales: 1564
      },
      {
        month: '10月',
        sales: 4454
      },
      {
        month: '11月',
        sales: 3533
      },
      {
        month: '12月',
        sales: 4063
      }
    ]

    const ColumnPlot = new Column('sales-view', {
      data: data_two,
      height: 300,
      xField: 'month',
      yField: 'sales',
      smooth: true,
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: true
        }
      },
      meta: {
        type: {
          alias: '月份'
        },
        sales: {
          alias: '销售额'
        }
      }
    })
    ColumnPlot.render()
    const data_three = [
      { type: '支付宝', value: 27436 },
      { type: '微信', value: 25345 },
      { type: '银联', value: 14558 },
      { type: '其他', value: 13451 }
    ]
    const piePlot = new Pie('sales-channel-view', {
      data: data_three,
      angleField: 'value',
      height: 300,
      colorField: 'type',
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 12
        }
      },
      legend: {
        position: 'bottom'
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '18px'
          },
          content: '支付\n渠道'
        }
      }
    })
    piePlot.render()
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      activeName: 'sales'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 15px;
}
</style>
