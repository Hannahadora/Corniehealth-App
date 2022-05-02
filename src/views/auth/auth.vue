<template>
  <div class="w-full m-0 pt-11 pb-20 lg:px-32 md:px-12 px-6" style="background: #080056">
    <div>
      <img src="../../assets/logo(1).png" alt="" />
    </div>
    <div class="gap-x-10 md:grid block items-center grid-cols-12 md:-mt-3 mt-5">
      <div
        class="col-span-6 h-full w-full md:flex hidden flex-col justify-center items-center"
      >
        <div class="">
          <div v-if="areaPath === 'signup'">
            <div v-if="currentStep == 2">
              <img
                src="../../assets/smiling_lady2.svg"
                v-if="!currentStep !== 3 && type === 'Provider'"
                class="w-full provider-img"
              />
              <img
                src="../../assets/smiling_lady.png"
                v-if="!currentStep !== 3 && type === 'Payer'"
                class="w-full payer-img"
              />
              <img
                src="../../assets/happy-famile-x.png"
                v-if="!currentStep !== 3 && type === 'Patient'"
                class="w-full patient-img"
              />
            </div>
            <div v-if="currentStep == 3 || currentStep == 4">
              <img src="../../assets/auth/image1.png" class="w-full" />
            </div>
          </div>
          <div v-else>
            <img src="../../assets/img/login-smilinglady.png" class="w-full" />
          </div>
        </div>

        <div class="w-full flex flex-col items-center justify-center mt-2">
          <div v-if="currentStep == 2 && areaPath === 'signup'">
            <div class="flex items-center justify-center">
              <heartpulse />
              <span class="text-white text-base font-bold text-center w-full">
                Connected. Patient-Centric. Supportive.
              </span>
            </div>
            <div
              v-if="type === 'Provider'"
              class="text-white text-3xl font-bold text-center w-full mt-5"
            >
              Connected, Simple Practice Management Software.
            </div>
            <div
              v-if="type === 'Patient'"
              class="text-white text-3xl font-bold text-center w-full mt-5"
            >
              Secure Connection To All Your Healthcare Needs.
            </div>
            <div
              v-if="type === 'Payer'"
              class="text-white text-3xl font-bold text-center w-full"
            >
              Connected and Simple HMO Management Software.
            </div>
          </div>
          <div
            v-if="
              currentStep == 3 || (currentStep == 4 && areaPath === 'signup')
            "
            class="text-center"
          >
            <div class="text-white text-3xl font-bold text-center w-full mt-5">
              Connected, simple practice management software.
            </div>
          </div>
          <div
            v-if="areaPath === '2fa'"
            class="w-11/12 text-center flex flex-col items-center justify-center"
          >
            <span class="text-white text-3xl font-bold text-center w-full">
              You’ve successfully created an account
            </span>
            <span class="text-center text-base text-white mt-4">
              This helps us verify your identity. You can enable or disable this
              in your profile account settings.
            </span>
          </div>
        </div>
      </div>

      <div class="md:col-span-6 w-full">
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

.h-inherit {
  height: inherit;
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

.patient-img {
  height: 623px;
}

.provider-img {
  height: 650px;
  width: 439px;
}

.payer-img {
  width: 427px;
  height: 619px;
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
