<script lang="ts" setup>
import {
    Delete,
    Edit,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { reactive } from 'vue'

const formInline = reactive({
    user: '',
    region: '',
    date: '',
})

const radiusGroup = ref([
  {
    name: 'Large Radius',
    type: 'base',
  },
])

const getValue = (type: string) => {
  const getCssVarValue = (prefix, type) =>
    getComputedStyle(document.documentElement).getPropertyValue(
      `--el-${prefix}-${type}`
    )
  return getCssVarValue('border-radius', type)
}
const onSubmit = () => {
    console.log('submit!')
}
const currentPage4 = ref(1)
const pageSize4 = ref(10)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        sasa: 'sss'
    },
]
</script>

<template>
    <el-card>
        <p v-for="o in 1" :key="o" class="text item">{{ 'List item ' + o }}</p>
        <div class="aaa">
        <el-card class="xxx">
            <div class="card-header">
        <span>Card name</span>
      </div>
        </el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

            <el-form-item label="">

                <el-input v-model="formInline.user" placeholder="输入文件名" clearable />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="名称" />
            <el-table-column prop="name" label="文件类型" width="200" />
            <el-table-column prop="address" label="文件大小" width="200" />
            <el-table-column prop="sasa" label="操作" width="500">
                <el-row>
                    <el-button type="primary" :icon="Edit" circle />
                    <el-button type="danger" :icon="Delete" circle />
                </el-row>
            </el-table-column>
        </el-table>
        <el-pagination class="el-p" v-model:current-page="currentPage4" v-model:page-size="pageSize4"
            :page-sizes="[10, 20, 30, 40]" :size="size" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
</template>

<style scoped>
.el-p {
    margin-top: 20px;
    dispaly: flex;
    justify-content: flex-end;
}
.aaa{
    display: flex
}
.xxx{
    margin-right:50px; 
    height: 30px;
    width: 500px;
    /* border: seagreen solid 20px; */
}
.card-header{
    /* border: black solid 5px; */
    margin-top: -15px;
}
</style>