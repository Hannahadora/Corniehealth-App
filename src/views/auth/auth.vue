<template>
  <div class="w-full h-full p-4 flex">
    <div
      class="bg-primary dauth w-4/12 h-full rounded-3xl flex flex-col gap-8 justify-center items-center"
    >
      <img src="@/assets/img/logo.svg" class="absolute top-14 left-14" />

      <img
        src="@/assets/img/pateint.svg"
        v-if="type == 'Patient'"
        class="w-56 h-56"
      />
      <span v-else>
        <img src="@/assets/img/lock.svg" v-if="step?.id" class="w-56 h-56" />
        <img
          :src="require(`@/assets/auth/signup.png`)"
          class="w-56 h-56"
          v-else
        />
      </span>

      <span
        class="flex space-x-2 justify-start w-full ml-24"
        v-if="type == 'Patient'"
      >
        <img src="@/assets/img/goodhealth.svg" class="w-12 h-12" />
        <span class="text-xs text-white font-bold mt-4">Patient SignUp</span>
      </span>
      <div class="w-full flex items-center justify-center">
        <span
          class="text-white text-xl font-bold text-left w-8/12 mx-auto"
          v-if="type == 'Patient'"
        >
          Secure connection to all your healthcare needs.
        </span>
        <span
          class="text-white text-xl font-bold text-left w-8/12 mx-auto"
          v-else
        >
          Connected, simple practice management software.
        </span>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center w-8/12">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    step: {
      type: Object,
      default: {},
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar-thumb {
  background-color: #080056;
  height: 0.5rem;
  display: none;
  outline: 1px solid slategrey;
}
::-webkit-scrollbar-track {
  box-shadow: none;
  width: 0.75rem;
}

.dauth {
  min-width: auto;
  min-height: auto;
  overflow: auto;
  background-image: none;
  background-repeat: no-repeat;
  background-size: 50%;
}

.auth-content {
  grid-template-columns: 25% 65%;
  column-gap: 15%;
}
@media (min-width: 640px) {
  .dauth {
    background-image: none;
    background-size: 105%;
  }
}
@media (min-width: 768px) {
  .dauth {
    background-image: url("../../assets/img/unsplash.png");
    background-size: 105%;
  }
}
@media (min-width: 1024px) {
  .dauth {
    background-image: url("../../assets/img/unsplash.png");
    background-size: 105%;
  }
}
@media (min-width: 1280px) {
  .dauth {
    background-image: url("../../assets/img/unsplash.png");
    background-size: 105%;
  }
}
@media (min-width: 1536px) {
  .dauth {
    background-image: url("../../assets/img/unsplash.png");
    background-size: 105%;
  }
}
</style>
