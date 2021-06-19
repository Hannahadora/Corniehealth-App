<template>
  <div class="min-h-screen bg-white flex">
    <div
      class="
        flex-1 flex flex-col
        justify-center
        py-12
        px-4
        sm:px-6
        lg:flex-none
        lg:px-20
        xl:px-24
      "
    >
      <div class="mx-auto w-full max-w-sm">
        <div>
          <h2 class="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
            Welcome Back
          </h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <form @submit.prevent="submit">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Email address
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input
                    id="email"
                    type="email"
                    required
                    class="
                      appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      border border-gray-300
                      rounded-md
                      placeholder-gray-400
                      focus:outline-none
                      focus:shadow-outline-blue
                      focus:border-blue-300
                      transition
                      duration-150
                      ease-in-out
                      sm:text-sm
                      sm:leading-5
                    "
                    v-model="email"
                  />
                </div>
              </div>

              <div class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <password-input
                    id="password"
                    required
                    class="
                      appearance-none
                      block
                      w-full
                      px-3
                      py-2
                      border border-gray-300
                      rounded-md
                      placeholder-gray-400
                      focus:outline-none
                      focus:shadow-outline-blue
                      focus:border-blue-300
                      transition
                      duration-150
                      ease-in-out
                      sm:text-sm
                      sm:leading-5
                    "
                    v-model="password"
                  />
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember_me"
                    type="checkbox"
                    class="
                      form-checkbox
                      h-4
                      w-4
                      text-indigo-600
                      transition
                      duration-150
                      ease-in-out
                    "
                  />
                  <label
                    for="remember_me"
                    class="ml-2 block text-sm leading-5 text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div class="text-sm leading-5">
                  <a
                    href="#"
                    class="
                      font-medium
                      text-indigo-600
                      hover:text-indigo-500
                      focus:outline-none
                      focus:underline
                      transition
                      ease-in-out
                      duration-150
                    "
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div class="mt-6">
                <span class="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    class="
                      w-full
                      flex
                      justify-center
                      py-2
                      px-4
                      border border-transparent
                      text-sm
                      font-medium
                      rounded-md
                      text-white
                      bg-indigo-600
                      hover:bg-indigo-500
                      focus:outline-none
                      focus:border-indigo-700
                      focus:shadow-outline-indigo
                      active:bg-indigo-700
                      transition
                      duration-150
                      ease-in-out
                    "
                  >
                    Sign in
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { quantumClient } from "@/plugins/http";
import PasswordInput from "@/components/PasswordInput.vue";

export default {
  name: "Login",
  components: {
    PasswordInput,
  },
  data() {
    return {
      email: "",
      password: "",
      domain: "",
      url: "http://18.132.188.41:7000/auth/login",
    };
  },
  computed: {
    payload() {
      return {
        email: this.email,
        authPassword: this.password,
      };
    },
  },
  methods: {
    async submit() {
      try {
        const data = await quantumClient().post("/auth/login", this.payload);
        const token = data.token;
        store.commit("setAuthToken", token);
        this.$router.replace("/dashboard");
      } catch (error) {
        console.log("login failed ", error);
      }
    },
  },
};
</script>
