<script setup lang="ts">
import Table from 'ant-design-vue/lib/table/Table'
import Tag from 'ant-design-vue/lib/tag/index'
import Divider from 'ant-design-vue/lib/divider/index'
import Empty from 'ant-design-vue/lib/empty/index'
import 'ant-design-vue/lib/empty/style/index.css'
import 'ant-design-vue/lib/table/style/index.css'
import 'ant-design-vue/lib/pagination/style/index.css'
import 'ant-design-vue/lib/button/style/index.css'
import 'ant-design-vue/lib/empty/style/index.css'
import 'ant-design-vue/lib/input/style/index.css'
import 'ant-design-vue/lib/spin/style/index.css'
import 'ant-design-vue/lib/dropdown/style/index.css'
import 'ant-design-vue/lib/tag/style/index.css'
import 'ant-design-vue/lib/divider/style/index.css'
import { MenuType, useCounterStore } from '../../store'
import { listOrders } from '../../services/orders'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const columns = [
  {
    title: 'Tracking Number',
    dataIndex: 'TrackingNumber',
    key: 'TrackingNumber',
    width: 300
  },
  {
    title: 'Consignee Address',
    dataIndex: 'ConsigneeAddress',
    key: 'ConsigneeAddress'
  },
  {
    title: 'Consignee Name',
    dataIndex: 'ConsigneeName',
    key: 'ConsigneeName'
  },
  {
    title: 'Consignee City',
    key: 'ConsigneeCity',
    dataIndex: 'ConsigneeCity'
  },
  {
    title: 'Consignee Province',
    key: 'ConsigneeProvince',
    dataIndex: 'ConsigneeProvince'
  },
  {
    title: 'Consignee Postal Code',
    key: 'ConsigneePostalCode',
    dataIndex: 'ConsigneePostalCode'
  },
  {
    title: 'Consignee Country',
    key: 'ConsigneeCountry',
    dataIndex: 'ConsigneeCountry'
  },
  {
    title: 'Payment Type',
    key: 'PaymentType',
    dataIndex: 'PaymentType'
  },
  {
    title: 'Weight',
    key: 'Weight',
    dataIndex: 'Weight'
  },
  {
    title: 'Height',
    key: 'Height',
    dataIndex: 'Height'
  },
  {
    title: 'Width',
    key: 'Width',
    dataIndex: 'Width'
  },
  {
    title: 'Length',
    key: 'Length',
    dataIndex: 'Length'
  }
]

const loading = ref<boolean>(true)
const store = useCounterStore()
const { orders } = storeToRefs(store)
const { setOrders, setMenu } = store

const getListApi = async () => {
  const listAllOrders = await listOrders()
  setOrders(listAllOrders.data)
  loading.value = false
}

getListApi()
</script>

<template>
  <Table
  empty
    :scroll="{ x: 2000, y: 500 }"
    :columns="columns"
    class="w-full"
    :pagination="{ pageSize: 8 }"
    :data-source="orders"
    bordered
    :loading="loading"
  >
    <template #emptyText><Empty description="Orders Empty" /></template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Weight'">
        {{ record.Weight + " Kg" }}
      </template>
      <template v-if="column.key === 'Width'">
        {{ record.Weight + " Cm" }}
      </template>
      <template v-if="column.key === 'Height'">
        {{ record.Height + " Cm" }}
      </template>
      <template v-if="column.key === 'Length'">
        {{ record.Length + " Cm" }}
      </template>

      <template v-if="column.key === 'PaymentType'">
        <span v-if="record.PaymentType === 'prepaid'">Pre Paid</span>
        <span v-else-if="record.PaymentType === 'cod'">Cash On Delivery</span>
      </template>
    </template>
  </Table>
</template>
