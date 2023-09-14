<script setup>
import { onMounted, ref } from "vue";
import { useGlobalStore } from "../store/user";
const globalStore = useGlobalStore();
const testEmail = "changed email";
const email = ref("");
const password = ref("");
let users = [];

onMounted(async () => {
  const res = await fetch("/data/users.json");
  users = await res.json();
  console.log(users);
});

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
  }
}
</script>
<template>
  <div
    class="h-screen backgroundImg text-white flex flex-col place-items-center"
  >
    <div class="content-container flex flex-col place-items-center m-auto">
      <div
        class="flex rounded-xl flex-col bg-white text-black p-6 items-center justify-between m-auto w-80 h-80"
      >
        <label class="flex flex-col gap-2">
          E-mail:
          <input
            class="border p-2 w-56 border-gray-600"
            v-model="email"
            type="email"
          />
        </label>
        <label class="flex flex-col gap-2">
          Password:
          <input
            class="border p-2 w-56 border-gray-600"
            v-model="password"
            type="password"
          />
        </label>
        <NuxtLink to="/dashboard"
          ><button @click="Login" class="rounded h-12 w-56 bg-slate-400">
            LOGIN
          </button></NuxtLink
        >
      </div>
    </div>
  </div>
</template>
