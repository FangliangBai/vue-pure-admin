<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { TabsPaneContext } from "element-plus";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import VChart from "vue-echarts";

use([GridComponent, CanvasRenderer, LineChart]);

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Detail"
});

const { query } = useRoute();

const tableData = [
  {
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];

const activeTab = ref("spectra");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const option = ref({
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line"
    }
  ]
});
</script>

<template>
  <div>
    <el-card class="my-3" shadow="never">
      <template #header>
        <div class="font-bold">Molecule</div>
      </template>
      <el-row>
        <el-col :span="8">
          <div>
            <p>当前页面参数为：{{ query.text }}</p>
          </div>
        </el-col>
        <el-col :span="16">
          <el-table :data="tableData" fit max-height="400" stripe>
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Address" prop="address" />
          </el-table>
        </el-col>
      </el-row>

      <el-tabs v-model="activeTab" class="my-3" @tab-click="handleClick">
        <el-tab-pane label="Spectra" name="spectra">Spectra list</el-tab-pane>
        <el-tab-pane label="Similar Molecules" name="similar_molecules">
          Similar Molecules
        </el-tab-pane>
        <el-tab-pane label="Literature" name="literature">
          Related literatures
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-card class="my-3" shadow="never">
      <template #header>
        <div class="font-bold">Spectrum</div>
      </template>
      <el-row>
        <el-col :span="8">
          <v-chart :option="option" autoresize class="chart" />
        </el-col>
        <el-col :span="16">
          <el-table :data="tableData" fit max-height="400" stripe>
            <el-table-column label="Name" prop="name" />
            <el-table-column label="Address" prop="address" />
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 300px;
}
</style>
