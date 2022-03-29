<template>
  <div class="w-full">

    <div class="grid grid-cols-3 gap-4">
      <div class="cursor-pointer">
        <div
          class="h-10 grid place-items-center w-28 cursor-pointer"
          @mouseleave="isVisible = false"
          @keydown.enter="isVisible = !isVisible"
          @click="checkType('1')"
        >
          <input
            type="radio"
            class="hidden"
            id="patient"
            value="patient"
            v-model="accountType"
          />
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="justify-center"
              :class="{ hidden: checked == true }"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14.0003 14.0003C17.6837 14.0003 20.667 11.017 20.667 7.33366C20.667 3.65033 17.6837 0.666992 14.0003 0.666992C10.317 0.666992 7.33366 3.65033 7.33366 7.33366C7.33366 11.017 10.317 14.0003 14.0003 14.0003ZM14.0003 17.3337C9.55032 17.3337 0.666992 19.567 0.666992 24.0003V27.3337H27.3337V24.0003C27.3337 19.567 18.4503 17.3337 14.0003 17.3337Z"
                fill="#080056"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="justify-center"
              v-if="checked"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14.0003 14.0003C17.6837 14.0003 20.667 11.017 20.667 7.33366C20.667 3.65033 17.6837 0.666992 14.0003 0.666992C10.317 0.666992 7.33366 3.65033 7.33366 7.33366C7.33366 11.017 10.317 14.0003 14.0003 14.0003ZM14.0003 17.3337C9.55032 17.3337 0.666992 19.567 0.666992 24.0003V27.3337H27.3337V24.0003C27.3337 19.567 18.4503 17.3337 14.0003 17.3337Z"
                fill="red"
              />
            </svg>
            <p
              class="font-semibold text-center ml-4 mt-2 text-primary"
              :class="{ 'text-red-500': checked == true }"
            >
              Patient
            </p>
          </div>
        </div>
      </div>
      <div class="cursor-pointer">
        <div
          class="h-10 grid place-items-center w-28 cursor-pointer"
          @mouseleave="isVisible2 = false"
          @keydown.enter="isVisible2 = !isVisible2"
          @click="checkType('2')"
        >
          <input
            type="radio"
            class="hidden"
            id="provider"
            value="provider"
            v-model="accountType"
          />
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="justify-center"
              :class="{ hidden: checked2 == true }"
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
            >
              <path
                d="M27.1667 0H3.83333C2 0 0.516667 1.5 0.516667 3.33333L0.5 26.6667C0.5 28.5 2 30 3.83333 30H27.1667C29 30 30.5 28.5 30.5 26.6667V3.33333C30.5 1.5 29 0 27.1667 0ZM25.5 18.3333H18.8333V25H12.1667V18.3333H5.5V11.6667H12.1667V5H18.8333V11.6667H25.5V18.3333Z"
                fill="#080056"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="justify-center"
              v-if="checked2"
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
            >
              <path
                d="M27.1667 0H3.83333C2 0 0.516667 1.5 0.516667 3.33333L0.5 26.6667C0.5 28.5 2 30 3.83333 30H27.1667C29 30 30.5 28.5 30.5 26.6667V3.33333C30.5 1.5 29 0 27.1667 0ZM25.5 18.3333H18.8333V25H12.1667V18.3333H5.5V11.6667H12.1667V5H18.8333V11.6667H25.5V18.3333Z"
                fill="red"
              />
            </svg>
            <p
              class="font-semibold text-center ml-4 mt-2 text-primary"
              :class="{ 'text-red-500': checked2 == true }"
            >
              Provider
            </p>
          </div>
        </div>
      </div>
      <div
        class="h-10 grid place-items-center w-28 cursor-pointer"
        @click="checkType('3')"
      >
        <input
          type="radio"
          class="hidden"
          id="payer"
          value="payer"
          v-model="accountType"
        />
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="justify-center"
            :class="{ hidden: checked3 == true }"
            width="34"
            height="30"
            viewBox="0 0 34 30"
            fill="none"
          >
            <path
              d="M16.9997 6.66667V0H0.333008V30H33.6663V6.66667H16.9997ZM6.99967 26.6667H3.66634V23.3333H6.99967V26.6667ZM6.99967 20H3.66634V16.6667H6.99967V20ZM6.99967 13.3333H3.66634V10H6.99967V13.3333ZM6.99967 6.66667H3.66634V3.33333H6.99967V6.66667ZM13.6663 26.6667H10.333V23.3333H13.6663V26.6667ZM13.6663 20H10.333V16.6667H13.6663V20ZM13.6663 13.3333H10.333V10H13.6663V13.3333ZM13.6663 6.66667H10.333V3.33333H13.6663V6.66667ZM30.333 26.6667H16.9997V23.3333H20.333V20H16.9997V16.6667H20.333V13.3333H16.9997V10H30.333V26.6667ZM26.9997 13.3333H23.6663V16.6667H26.9997V13.3333ZM26.9997 20H23.6663V23.3333H26.9997V20Z"
              fill="#080056"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="justify-center"
            v-if="checked3"
            width="34"
            height="30"
            viewBox="0 0 34 30"
            fill="none"
          >
            <path
              d="M16.9997 6.66667V0H0.333008V30H33.6663V6.66667H16.9997ZM6.99967 26.6667H3.66634V23.3333H6.99967V26.6667ZM6.99967 20H3.66634V16.6667H6.99967V20ZM6.99967 13.3333H3.66634V10H6.99967V13.3333ZM6.99967 6.66667H3.66634V3.33333H6.99967V6.66667ZM13.6663 26.6667H10.333V23.3333H13.6663V26.6667ZM13.6663 20H10.333V16.6667H13.6663V20ZM13.6663 13.3333H10.333V10H13.6663V13.3333ZM13.6663 6.66667H10.333V3.33333H13.6663V6.66667ZM30.333 26.6667H16.9997V23.3333H20.333V20H16.9997V16.6667H20.333V13.3333H16.9997V10H30.333V26.6667ZM26.9997 13.3333H23.6663V16.6667H26.9997V13.3333ZM26.9997 20H23.6663V23.3333H26.9997V20Z"
              fill="red"
            />
          </svg>
          <p
            class="font-semibold text-center ml-4 mt-2 text-primary"
            :class="{ 'text-red-500': checked3 == true }"
          >
            Payer
          </p>
        </div>
      </div>
    </div>
    <!-- <cornie-btn
      class="font-semibold rounded mt-3 w-full p-2"
      :class="[
        checked == true || checked2 == true || checked3 == true
          ? 'bg-danger-100 text-white'
          : 'text-gray-400 bg-gray-200',
      ]"
      :disabled="checked != true && checked2 != true && checked3 != true"
      @click="$emit('next')"
    >
      Continue
    </cornie-btn> -->
  </div>
</template>

<script>
export default {
  name: "step One",
  props: ["checked", "checked2", "checked3", "isVisible"],

  methods: {
    checkType(value) {
      this.$emit("selected", value);
      this.$emit('next')
    },
  },
};
</script>

<style scoped>
.bg-danger-100 {
  background-color: #fe4d3c;
}
input[type="radio"]:checked {
  background-color: #fe4d3c;
}
</style>
