<script setup lang="ts">
import Menu from '../components/Menu.vue'
import Table from '../components/Dashboard/Table.vue'
import Form from '../components/Dashboard/Form.vue'

import { MenuType, useCounterStore } from '../store'
import { listOrders } from '../services/orders'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useCounterStore()
const { menu } = storeToRefs(store)
const { setMenu } = store

const handleOnClickAdd = () => {
  setMenu(MenuType.Add);
}
</script>

<template>
  <main class="h-screen flex">
    <div class="h-screen md:w-[200px] flex-grow w-[80px]">
      <Menu />
    </div>
    <div class="my-auto w-fit flex items-center flex-grow">
      <div class="flex-row xl:w-[1200px] lg:w-[800px] md:w-[600px] w-[246px] py-3">
        <div class="overflow-auto">
          <h1 className="text-lg font-hard text-left text-white-00">Dashboard</h1>
          <p className="text-base text-left text-white-00">Orders</p>
        </div>
        <div class="col-span-1 h-fit p-5 bg-white-00 mt-[16px] rounded-[4px] w-full">
          <div class="lg:flex lg:justify-between mb-[16px]">
            <p v-if="menu === 'table'" className="text-base text-left text-black-60">Orders List</p>
            <p v-else className="text-base text-left text-black-60">Create Order</p>
            <div class="">
              <button @click="handleOnClickAdd" v-if="menu === 'table'"
                className="bg-primary-90 hover:shadow-light h-[36px] rounded-[8px] text-white-00 font-rubik font-medium w-[120px]">
                <span class="text-sm">Add Order</span>
              </button>
            </div>
          </div>
          <Table v-if="menu === 'table'" />
          <Form v-else />
        </div>
      </div>
    </div>
  </main>
</template>
