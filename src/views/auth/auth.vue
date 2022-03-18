<template>
  <div class="w-full pt-11 pb-20 px-28" style="background: #080056">
    <div>
      <img src="../../assets/logo(1).png" alt="" />
    </div>
    <div class="gap-x-10 grid items-center grid-cols-12">
      <div class="col-span-5 h-full w-full flex flex-col space-y-8 justify-center items-center">
        <div class="">
          <div v-if="areaPath === 'signup'">
            <div v-if="currentStep == 2">
              <img
                src="../../assets/smiling_lady2.svg"
                v-if="!currentStep !== 3 && type === 'Provider'"
                class="w-full"
              />
              <img
                src="../../assets/smiling_lady.png"
                v-if="!currentStep !== 3 && type === 'Payer'"
                class="w-full"
              />
              <img
                src="../../assets/healthy_family.svg"
                v-if="!currentStep !== 3 && type === 'Patient'"
                class="w-full"
              />
            </div>
            <div v-if="currentStep == 3 || currentStep == 4">
              <img src="../../assets/auth/image1.png" class="w-full" />
            </div>
          </div>
          <div v-else>
            <img src="../../assets/smiling_lady.png" class="w-full" />
          </div>
        </div>

        <div class="w-full flex flex-col items-center justify-center">
          <div v-if="currentStep == 2 && areaPath === 'signup'">
            <div class="flex items-center">
              <heartpulse />
              <span class="text-white text-base font-bold text-center w-full">
                Connected. Patient-Centric. Supportive.
              </span>
            </div>
            <span
              v-if="type === 'Provider'"
              class="text-white text-3xl font-bold text-center w-full"
            >
              Connected, Simple Practice Management Software.
            </span>
            <span
              v-if="type === 'Patient'"
              class="text-white text-3xl font-bold text-center w-full"
            >
              Secure Connection To All Your Healthcare Needs.
            </span>
            <span
              v-if="type === 'Payer'"
              class="text-white text-3xl font-bold text-center w-full"
            >
              Connected and Simple HMO Management Software.
            </span>
          </div>
          <div
            v-if="
              currentStep == 3 || (currentStep == 4 && areaPath === 'signup')
            "
            class="text-center"
          >
            <span class="text-white text-3xl font-bold text-center w-full">
              Connected, simple practice management software.
            </span>
          </div>
          <div
            v-if="areaPath === 'signin'"
            class="w-10/12 text-center flex flex-col items-center justify-center"
          >
            <span class="text-white text-3xl font-bold text-center w-full">
              Sign In to your account
            </span>
            <span class="text-left text-base text-white mt-4">
              This helps us verify your identity. You can enable or disable this
              in your profile account settings.
            </span>
          </div>
          <div
            v-if="areaPath === '2fa'"
            class="w-11/12 text-center flex flex-col items-center justify-center"
          >
            <span class="text-white text-3xl font-bold text-center w-full">
              You’ve successfully created an account
            </span>
            <span class="text-left text-base text-white mt-4">
              This helps us verify your identity. You can enable or disable this
              in your profile account settings.
            </span>
          </div>
        </div>
      </div>

      <div class="col-span-7">
        <slot />
      </div>
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
    currentStep: {
      type: Number,
      default: 2,
    },
    areaPath: {
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
/* @media (min-width: 640px) {
  .dauth {
    background-image: none;
    background-size: 105%;
  }
} */
/* @media (min-width: 768px) {
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
} */
</style>
