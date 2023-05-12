<script setup lang="ts">
import Swal from 'sweetalert2'
import LockOutlinedIcon from '@ant-design/icons-vue/LockOutlined'
import UserOutlinedIcon from '@ant-design/icons-vue/UserOutlined'
import loginIllustration from '../assets/images/login-illustration.svg'
import headerLogo from '../assets/images/header-logo.svg'
import AntForm from 'ant-design-vue/lib/form/Form'
import InputPassword from 'ant-design-vue/lib/input/Password'
import Input from 'ant-design-vue/lib/input/Input'
import Spin from 'ant-design-vue/lib/spin'
import 'ant-design-vue/lib/spin/style/index.css'
import 'ant-design-vue/lib/form/style/index.css'
import 'ant-design-vue/lib/grid/style/index.css'
import 'ant-design-vue/lib/input/style/index.css'

import { defineComponent, ref, reactive } from 'vue'
import { MenuType, useCounterStore } from '@/store'
import { storeToRefs } from 'pinia'
import { createOrder, listOrders } from '@/services/orders'
import { login } from '@/services/auth'
import router from '@/router'

interface LoginFormType {
  username: string
  password: string
}

const loginForm = reactive<LoginFormType>({
  username: '',
  password: ''
})

const checkForm = () => {
  if (loginForm.username.length > 0) {
    activeUsername.value = true
  } else {
    activeUsername.value = false
  }
}

const store = useCounterStore()
const { setToken } = store

const postLoginApi = async () => {
  loading.value = true;
  const res = await login(loginForm);
  if (res.session) {
    loading.value = false;
    setToken(res.session)
    window.localStorage.setItem('access_token', res.session)
    router.push('/')
  }
}

let activeUsername = ref<boolean>(false)
let loading = ref<boolean>(false)
const onFinish = (values: any) => {
  if (loginForm.username.length < 1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Username can't be empty",
    });
    return;
  } else if (loginForm.password.length < 1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password can't be empty",
    });
    return;
  }
  postLoginApi();
}
</script>

<template>
  <main class="flex items-center justify-center w-full h-screen">
    <section>
      <!-- <div class="px-5 py-2 mb-14 mx-auto bg-white-00 w-fit">
            <img class="mx-auto" :src="headerLogo" alt="luwjistik-logo" title="luwjistik-logo" />
        </div> -->
      <div
        class="rounded-[16px] w-[90%] md:w-[464px] bg-white-00 h-fill py-[24px] grid grid-cols-1"
      >
        <h1 class="text-lg font-medium text-primary-60 flex justify-center col-span-1 mb-[24px]">
          Welcome to Luwjsitik
        </h1>
        <div id="line_divider" class="h-[1px] bg-primary-00 mb-[24px] w-[65%] mx-auto"></div>
        <div id="login_body" class="grid grid-cols-1 content-center">
          <img
            title="login_illustration"
            :src="loginIllustration"
            class="mx-auto mb-[30px]"
            alt="login_illustration"
          />
          <div class="mx-[48px]" id="body_form">
            <div v-if="loading" class="mx-auto flex justify-center w-full">
              <Spin class="mx-auto" />
            </div>
            <p class="text-primary-90 my-[6px] text-base font-medium text-left">Let's login</p>
            <p class="text-black-40 mt-[6px] mb-[12px] text-sm font-light text-left">
              Input your username & password below.
            </p>
            <AntForm
              :model="loginForm"
              name="basic"
              class="w-full items-center"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              @finish="onFinish"
            >
              <div class="flex items-center bg-primary-00 p-[4px] mb-[12px] rounded-[8px] h-[48px]">
                <UserOutlinedIcon class="mx-[16px] text-primary-90 text-[18px]" />
                <div class="">
                  <p v-if="activeUsername" class="text-[10px] text-primary-20 font-medium">
                    Username
                  </p>
                  <Input
                    type="text"
                    name="username"
                    @change="checkForm"
                    placeholder="Username"
                    v-model:value="loginForm.username"
                    style="background-color: #e6e9f0; border: 0; padding: 0; box-shadow: none"
                    :rules="[{ required: true, message: 'Please input username!' }]"
                  />
                </div>
              </div>
              <div class="flex items-center bg-primary-00 p-[4px] mb-[12px] rounded-[8px] h-[48px]">
                <!-- <img class="mx-[16px]" :src="personIconInput" alt="person_icon_input" title="person_icon_input" /> -->
                <LockOutlinedIcon class="mx-[16px] text-primary-90 text-[18px]" />
                <div class="w-full">
                  <!-- <p v-if="activeInput === InputEnum.Password" class="text-[10px] text-primary-20 font-medium">Password</p> -->
                  <!-- <Input v-model:value="formState.consigneeCountry" /> -->
                  <InputPassword
                    class="passwordInputWrapper"
                    style="background-color: #e6e9f0; border: 0; outline: none; box-shadow: none"
                    name="password"
                    v-model:value="loginForm.password"
                    :rules="[{ required: true, message: 'Please input password!' }]"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button
                html-type="submit"
                className="bg-primary-60 hover:shadow-light text-base w-full h-[48px] rounded-[8px] text-white-00 font-rubik font-medium mt-[24px] lg:w-full"
              >
                Login
              </button>
            </AntForm>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.passwordInputWrapper .ant-input {
  background-color: #e6e9f0;
}
</style>
