<template>
  <div class="w-full h-screen overflow-y-scroll m-0 pt-11 pb-20 xl:px-32 lg:px-6 md:px-20 px-6" style="background: #080056">
    <div>
      <img src="../../assets/logo(1).png" alt="" />
    </div>
    <div class="gap-x-10 lg:grid block items-center grid-cols-12 lg:-mt-3 mt-9">
      <div
        class="col-span-6 h-full w-full lg:flex hidden flex-col justify-center items-center"
      >
        <div class="img-frame">
          <div v-if="areaPath === 'signup'">
            <div v-if="currentStep == 2">
              <img
                src="../../assets/img/provider-su-lady.png"
                v-if="!currentStep !== 3 && type === 'Provider'"
                class="w-full provider-img"
              />
              <img
                src="../../assets/img/payer-su-lady.png"
                v-if="!currentStep !== 3 && type === 'Payer'"
                class="w-full payer-img"
              />
              <img
                src="../../assets/img/patient-su-family.png"
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
              <p class="text-white text-base font-bold text-center ml-2">
                Connected. Patient-Centric. Supportive.
              </p>
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
import Heartpulse from "@/components/icons/heartpulse.vue";
export default {
  components: {Heartpulse},
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

.img-frame {
  max-height: 750px;
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
  /* height: 623px; */
}

.provider-img {
  /* height: 650px; */
  /* width: 439px; */
}

.payer-img {
  /* width: 427px; */
  /* height: 619px; */
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
