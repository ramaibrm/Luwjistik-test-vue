<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { MenuProps } from 'ant-design-vue'

import Menu from 'ant-design-vue/lib/menu/src/Menu'
import AntButton from 'ant-design-vue/lib/button/index'
import MenuItem from 'ant-design-vue/lib/menu/src/MenuItem'
import MenuUnfoldOutlined from '@ant-design/icons-vue/MenuUnfoldOutlined'
import LogoutOutlined from '@ant-design/icons-vue/LogoutOutlined'
import MenuFoldOutlined from '@ant-design/icons-vue/MenuFoldOutlined'
import TableOutlined from '@ant-design/icons-vue/TableOutlined'
import 'ant-design-vue/lib/menu/style/index.css'
import 'ant-design-vue/lib/button/style/index.css'

import { MenuType, useCounterStore } from '@/store'
import { storeToRefs } from 'pinia'
import { createOrder, listOrders } from '@/services/orders'
import router from '@/router'

const selectedKeys = ref<string[]>(['2'])
const openKeys = ref<string[]>(['sub1'])
const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e)
}

let collapsed = ref<boolean>(true)
let preOpenKeys = ref<string[]>(['sub1'])

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value
  openKeys.value = collapsed.value ? [] : preOpenKeys.value
}

const store = useCounterStore()
const { setToken } = store

const onClickLogout = () => {
  setToken('');
  window.localStorage.removeItem('access_token')
  router.push('/login')
}

</script>

<template>
  <Menu
    :inline-collapsed="collapsed"
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    class="h-screen md:w-[200px] flex flex-col fixed"
    @click="handleClick"
  >
    <div class="flex justify-center w-full">
      <AntButton type="text" class="w-full" @click="toggleCollapsed">
        <MenuUnfoldOutlined class="text-primary-60" v-if="collapsed" />
        <MenuFoldOutlined class="text-primary-60" v-else />
      </AntButton>
    </div>
    <MenuItem key="2">
      <template #icon>
        <TableOutlined class="text-primary-60" />
      </template>
      <span v-if="!collapsed" :class="`text-primary-60`">Dashboard</span>
    </MenuItem>
    <div class="flex-grow relative" @click="onClickLogout">
        <div class="absolute bottom-5 w-full mx-auto">
          <MenuItem key="3">
            <template #icon>
              <LogoutOutlined v-if="collapsed" class="text-red-00 w-full" />
              <LogoutOutlined v-else class="text-red-00" />
            </template>
            <span v-if="!collapsed" :class="`text-red-00`">Logout</span>
          </MenuItem>
        </div>
      </div>
  </Menu>
  <!-- <TheWelcome /> -->
</template>
