<script setup lang="ts">
import MenuUnfoldOutlined from '@ant-design/icons-vue/MenuUnfoldOutlined'
import MenuFoldOutlined from '@ant-design/icons-vue/MenuFoldOutlined'
import AntForm from 'ant-design-vue/lib/form/Form'
import FormItem from 'ant-design-vue/lib/form/FormItem'
import Input from 'ant-design-vue/lib/input/Input'
import InputNumber from 'ant-design-vue/lib/input-number/index'
import Row from 'ant-design-vue/lib/row'
import Col from 'ant-design-vue/lib/col'
import Select, { SelectOption } from 'ant-design-vue/lib/select'
import 'ant-design-vue/lib/form/style/index.css'
import 'ant-design-vue/lib/grid/style/index.css'
import 'ant-design-vue/lib/input/style/index.css'
import 'ant-design-vue/lib/input-number/style/index.css'
import 'ant-design-vue/lib/input-number/style/index.css'
import 'ant-design-vue/lib/select/style/index.css'

import Swal from 'sweetalert2'
import { defineComponent, ref, reactive } from 'vue'
import { MenuType, useCounterStore } from '@/store'
import { storeToRefs } from 'pinia'
import { createOrder, listOrders } from '@/services/orders'

interface FormState {
  consigneeName: string
  consigneeAddress: string
  consigneeCity: string
  consigneeCountry: string
  consigneePostalCode: string
  consigneeProvince: string
  consigneeNumber: string
  height: number
  weight: number
  length: number
  width: number
  paymentType: string
}

const formState = reactive<FormState>({
  consigneeName: '',
  consigneeAddress: 'Singapore',
  consigneeCity: '',
  consigneeCountry: 'SG',
  consigneePostalCode: '',
  consigneeProvince: '',
  consigneeNumber: '',
  height: 1,
  weight: 1,
  length: 1,
  width: 1,
  paymentType: ''
})

const onFinish = (values: any) => {
  console.log('Success:', values)
  createOrderApi()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const store = useCounterStore()
const { setMenu, setOrders } = store

const getListApi = async () => {
  const listAllOrders = await listOrders()
  if (listAllOrders.data) {
    setOrders(listAllOrders.data)
  }
}

const createOrderApi = async () => {
  const res = await createOrder({ ...formState,
    height: Number(formState.height),
    weight: Number(formState.weight),
    length: Number(formState.length),
    width: Number(formState.width),
  })
  if (res.data) {
    Swal.fire({
      icon: 'success',
      title: 'Order created successfully.',
      showConfirmButton: false,
      timer: 1500
    })
    setMenu(MenuType.Table);
    getListApi();
  }
}

const handleOnClickBack = () => {
  setMenu(MenuType.Table)
}
</script>

<template>
  <AntForm
    :model="formState"
    name="basic"
    class="w-full"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <Row :gutter="24">
      <Col :span="12" :lg="{ span: 12 }" :xs="{ span: 24 }">
        <div class="border rounded-[8px] p-4 inputForm">
          <FormItem
            label="Consignee Name "
            name="consigneeName"
            class="inputItem"
            :rules="[{ required: true, message: 'Please input the consignee name!' }]"
          >
            <Input class="block" v-model:value="formState.consigneeName" />
          </FormItem>
          <FormItem
            label="Consignee Address"
            name="consigneeAddress"
            :rules="[{ required: true, message: 'Please input the consignee address!' }]"
          >
            <Input v-model:value="formState.consigneeAddress" />
          </FormItem>
          <FormItem
            label="Consignee City"
            name="consigneeCity"
            :rules="[{ required: true, message: 'Please input the consignee city!' }]"
          >
            <Input v-model:value="formState.consigneeCity" />
          </FormItem>
          <FormItem
            label="Consignee Country"
            name="consigneeCountry"
            :rules="[{ required: true, message: 'Please input the consignee country!' }]"
          >
            <Input v-model:value="formState.consigneeCountry" />
          </FormItem>
          <FormItem
            label="Consignee Province"
            name="consigneeProvince"
            :rules="[{ required: true, message: 'Please input the consignee province!' }]"
          >
            <Input v-model:value="formState.consigneeProvince" />
          </FormItem>

          <FormItem
            label="Consignee Postal Code"
            name="consigneePostalCode"
            :rules="[{ required: true, message: 'Please input the consignee postal code!' }]"
          >
            <Input type="number" v-model:value="formState.consigneePostalCode" />
          </FormItem>
        </div>
      </Col>
      <Col :span="12" :lg="{ span: 12 }" :xs="{ span: 24 }">
        <div class="border rounded-[8px] p-4 inputForm mb-5">
          <FormItem
            label="Consignee Number"
            name="consigneeNumber"
            :rules="[{ required: true, message: 'Please input the consignee number!' }]"
          >
            <Input style="width: 100%" v-model:value="formState.consigneeNumber" />
          </FormItem>
          <FormItem
            label="Height"
            name="height"
            :rules="[{ required: true, message: 'Please input the height!' }]"
          >
            <Input type="number" suffix="cm" style="width: 100%" v-model:value="formState.height" />
          </FormItem>
          <FormItem
            label="Width"
            name="width"
            :rules="[{ required: true, message: 'Please input the width!' }]"
          >
            <Input type="number" suffix="cm" style="width: 100%" v-model:value="formState.width" />
          </FormItem>
          <FormItem
            label="Length"
            name="length"
            :rules="[{ required: true, message: 'Please input the length!' }]"
          >
            <Input type="number" suffix="cm" style="width: 100%" v-model:value="formState.length" />
          </FormItem>
          <FormItem
            label="Weight"
            name="weight"
            :rules="[{ required: true, message: 'Please input the width!' }]"
          >
            <Input type="number" suffix="kg" style="width: 100%" v-model:value="formState.weight" />
          </FormItem>
          <FormItem
            label="Payment Type"
            name="paymentType"
            :rules="[{ required: true, message: 'Please input the paymentType!' }]"
          >
            <Select v-model:value="formState.paymentType">
              <SelectOption value="cod">Cash On Delivery</SelectOption>
              <SelectOption value="prepaid">Pre Paid</SelectOption>
            </Select>
            <!-- <Input type="number" style="width: 100%" v-model:value="formState.paymentType" /> -->
          </FormItem>
        </div>
        <div class="float-right flex justify-between">
          <div class="float-right">
            <button
              @click="handleOnClickBack"
              className="bg-red-00 hover:shadow-light h-[36px] rounded-[8px] text-white-00 font-rubik font-medium w-[120px]"
            >
              <span class="text-sm">Back</span>
            </button>
          </div>
          <FormItem class="float-right">
            <button
              html-type="submit"
              className="bg-primary-60 hover:shadow-light mx-2 h-[36px] rounded-[8px] text-white-00 font-rubik font-medium w-[120px]"
            >
              <span class="text-sm">Submit</span>
            </button>
          </FormItem>
        </div>
      </Col>
    </Row>
  </AntForm>
</template>

<style>
.ant-form-horizontal .ant-form-item-control {
  display: block;
}
.inputForm .ant-row {
  display: block;
}

.ant-form-item-label {
  max-width: 100% !important;
  display: inline-block !important;
}
</style>
