<script setup>
import { useGlobalStore } from "../store/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    useRouter().push("/dashboard");
  } else {
    userNotFound.value = true;
    console.log("email not found", userNotFound.value);
  }
}

const isButtonDisabled = computed(() => {
  return (
    !email.value || !password.value || passwordError.value || emailError.value
  );
});
</script>
<template>
  <!-- <div
    class="h-screen backgroundImg text-white flex flex-col place-items-center"
  >
    <div class="content-container flex flex-col place-items-center m-auto">
      <form
        @submit.prevent="Login"
        class="flex rounded-xl flex-col bg-white text-black p-6 items-center justify-between m-auto w-80 h-96"
      >
        <div class="p-6">
          <p v-if="!userNotFound">LOGIN</p>
          <p class="text-xs text-red-600" v-if="userNotFound">
            Please enter a correct email and password
          </p>
        </div>

        <label class="flex flex-col h-1/3 gap-2">
          E-mail:
          <input
            class="border p-2 w-56 focus:outline-gray-600 border-gray-600"
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
        <label class="flex flex-col h-1/3 gap-2">
          Password:
          <input
            class="border p-2 w-56 border-gray-600 focus:outline-gray-600"
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
        <button
          type="submit"
          :disabled="isButtonDisabled"
          :class="{
            'bg-black': !passwordError && !emailError,
            'opacity-60': isButtonDisabled,
          }"
          class="hover:scale-105 rounded h-12 w-56 bg-black text-white"
        >
          LOGIN
        </button>
      </form>
    </div>
   <div
      v-if="userNotFound"
      class="fixed inset-0 flex modal bg-black bg-opacity-50 items-center justify-center"
    >
      <div class="modal bg-white p-12 rounded-xl text-black">
        <p>Email not found.</p>
        <button
          @click="userNotFound = false"
          class="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Close
        </button>
      </div>
    </div> 
  </div> -->
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <form
      @submit.prevent="Login"
      class="flex items-center justify-center py-12"
    >
      <div
        class="mx-auto border border-gray-500 rounded-xl grid w-[350px] p-4 md:p-8 md:w-[400px] gap-6"
      >
        <div class="grid gap-2">
          <h1 class="text-3xl font-bold mb-2">Login</h1>
          <p class="text-gray-300 text-sm mb-2">
            Enter your email below to login to your account
          </p>
        </div>
        <div class="grid gap-6">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              class="bg-black border-gray-500"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
            </div>
            <Input
              id="password"
              class="bg-black border-gray-500"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <Button type="submit" class="w-full bg-white text-black">
            Login
          </Button>
        </div>
      </div>
    </form>
    <div class="hidden bg-muted lg:block">
      <img
        src="../assets/img/astronaut2.jpg"
        alt="Image"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</template>
