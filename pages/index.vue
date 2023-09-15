<script setup>
import { onMounted, ref } from "vue";
import { useGlobalStore } from "../store/user";
const globalStore = useGlobalStore();

const email = ref("");
const password = ref("");
const emailError = ref(null);
const passwordError = ref(null);
const userNotFound = ref(false);
let users = [];

onMounted(async () => {
  const res = await fetch("/data/users.json");
  users = await res.json();
  console.log(users);
});

function emailBlur(value) {
  if (value.trim() === "") {
    emailError.value = "Email is required.";
  } else if (!value.includes("@")) {
    emailError.value = "Please enter a valid email.";
  } else {
    emailError.value = null;
  }
}

function passwordBlur(value) {
  if (value.trim() === "") {
    passwordError.value = "Password is required.";
  } else {
    passwordError.value = null;
  }
}

function emailFocus() {
  emailError.value = null;
}

function passwordFocus() {
  passwordError.value = null;
}

function Login() {
  const foundUser = users.find(
    (user) => user.email === email.value && user.password === password.value
  );

  if (foundUser) {
    localStorage.setItem("validUser", email.value);
    console.log("user logged in");
    globalStore.setEmail(email.value);
    globalStore.setUserName(foundUser.username);
    globalStore.setCodeName(foundUser.code_name);
    globalStore.setFirstName(foundUser.first_name);
    globalStore.setLastName(foundUser.last_name);
    globalStore.setAvatar(foundUser.avatar);
  } else {
    console.log("email not found");
    userNotFound.value = true;
  }
}

const isButtonDisabled = computed(() => {
  return (
    !email.value || !password.value || passwordError.value || emailError.value
  );
});
</script>
<template>
  <div
    class="h-screen backgroundImg text-white flex flex-col place-items-center"
  >
    <div class="content-container flex flex-col place-items-center m-auto">
      <div
        class="flex rounded-xl flex-col bg-white text-black p-6 items-center justify-between m-auto w-80 h-80"
      >
        <label class="flex flex-col h-24 gap-2">
          E-mail:
          <input
            class="border p-2 w-56 border-gray-600"
            v-model="email"
            v-on:blur="(e) => emailBlur(e.target.value)"
            v-on:focus="emailFocus"
            type="email"
            required
          />
          <span class="text-xs text-red-600" v-if="emailError">{{
            emailError
          }}</span>
        </label>
        <label class="flex flex-col h-24 gap-2">
          Password:
          <input
            class="border p-2 w-56 border-gray-600"
            v-on:blur="(e) => passwordBlur(e.target.value)"
            v-on:focus="passwordFocus"
            v-model="password"
            type="password"
            required
          />
          <span class="text-xs text-red-600" v-if="passwordError">{{
            passwordError
          }}</span>
        </label>
        <NuxtLink to="/dashboard"
          ><button
            @click="Login"
            :disabled="isButtonDisabled"
            :class="{
              'bg-slate-400': !passwordError && !emailError,
              'opacity-60': isButtonDisabled,
            }"
            class="rounded h-12 w-56 bg-slate-400"
          >
            LOGIN
          </button></NuxtLink
        >
      </div>
    </div>
    <div v-if="userNotFound">
      <div></div>
    </div>
  </div>
</template>
