<template>
  <el-table :data="tableData" style="width: 100%" max-height=650 @selection-change="handleSelectionChange">
    <el-table-column fixed prop="date" label="反馈时间" sortable width="150" />
    <el-table-column prop="title" label="反馈主题" width="300" />
    <el-table-column prop="state" label="答复状态" width="1200" />
    <el-table-column fixed="right" label="查看详情" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent>
        <el-icon><i-ep-CaretRight /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ElTable } from 'element-plus'

const now = new Date()


interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData = ref([
  {
    date: '2016-05-01',
    title: '书院器材遗失',
    state: '未应答',
  },
  {
    date: '2016-05-02',
    title: '研讨间座位添加',
    state: '已应答',
  },
  {
    date: '2016-05-03',
    title: '前台添加书架',
    state: '已应答',
  },
])

const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  })
}
</script>
