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

    globalStore.setEmail(email.value);
    globalStore.setUserName(foundUser.username);
    globalStore.setCodeName(foundUser.code_name);
    globalStore.setFirstName(foundUser.first_name);
    globalStore.setLastName(foundUser.last_name);
    globalStore.setAvatar(foundUser.avatar);
    useRouter().push("/dashboard");
  } else {
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
          <p class="text-gray-300 text-sm mb-2" v-if="!userNotFound">
            Enter your email below to login to your account
          </p>
          <p class="text-sm text-red-400 mb-2" v-if="userNotFound">
            Please enter a valid email and password
          </p>
        </div>
        <div class="grid gap-6">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              v-model="email"
              v-on:blur="(e) => emailBlur(e.target.value)"
              v-on:focus="emailFocus"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              class="bg-black border-gray-500"
            />
            <span class="text-xs text-red-400" v-if="emailError">{{
              emailError
            }}</span>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">Password</Label>
            </div>
            <Input
              v-on:blur="(e) => passwordBlur(e.target.value)"
              v-on:focus="passwordFocus"
              v-model="password"
              id="password"
              class="bg-black border-gray-500"
              type="password"
              placeholder="password"
              required
            />
            <span class="text-xs text-red-400" v-if="passwordError">{{
              passwordError
            }}</span>
          </div>
          <Button
            type="submit"
            :disabled="isButtonDisabled"
            :class="{
              'bg-white': !passwordError && !emailError,
              'opacity-80': isButtonDisabled,
            }"
            class="w-full bg-white text-black hover:bg-white hover:text-black"
          >
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
<style scoped>
/* Ensure the input field retains its dark background */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: white !important;
  background-color: black !important;
}

/* Adjust the autofill text color */
input:-internal-autofill-selected {
  background-color: black !important;
  color: white !important;
}
</style>
