<template>
  <div class="w-full">

    <div class="flex items-center">
      <div class="cursor-pointer mr-9">
        <div
          class="grid place-items-center cursor-pointer"
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
            <div>
              <img class="nav-img" src="../../../../../assets/img/person.png" alt="" :class="{ 'active-nav-img': checked == true }">
            </div>
            <p
              class="font-semibold text-center ml-2 text-gray-400"
              :class="{ 'text-red-500': checked == true }"
            >
              Patient
            </p>
          </div>
        </div>
      </div>
      <div class="cursor-pointer mr-9">
        <div
          class="grid place-items-center cursor-pointer"
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
            <div>
              <img class="nav-img" src="../../../../../assets/img/hospital.png" alt="" :class="{ 'active-nav-img': checked2 == true }">
            </div>
            <p
              class="font-semibold text-center ml-2 text-gray-400"
              :class="{ 'text-red-500': checked2 == true }"
            >
              Provider
            </p>
          </div>
        </div>
      </div>
      <div
        class="grid place-items-center cursor-pointer"
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
          <div>
              <img class="nav-img" src="../../../../../assets/img/business.png" alt="" :class="{ 'active-nav-img': checked3 == true }">
            </div>
          <p
            class="font-semibold text-center ml-2 text-gray-400"
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
.c-c2c7d6 {
  color: #C2C7D6
}
.nav-img {
  filter: grayscale(100%);
}
.active-nav-img {
  filter: none;
}
</style>
