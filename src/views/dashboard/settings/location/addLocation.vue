<template>
  <div class="w-full h-screen">
    <form class="mt-5 w-full" @submit.prevent="submit">
      <div class="w-full grid grid-cols-2 gap-5">
        <cornie-input label="Location Name" />
        <cornie-input label="Location Identifier" />
        <cornie-input label="Location Status" />
        <cornie-input label="Operational status" />
        <cornie-input label="Description" />
        <cornie-input label="Alias" />
        <cornie-input label="Mode" />
        <cornie-input label="Type" />
        <phone-input label="Phone Number" />
        <cornie-input label="Email Address" />
        <cornie-input label="Address" />
        <cornie-input label="Country" />
        <cornie-input label="Physical Type" />
      </div>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        Position
      </span>
      <div class="w-full grid grid-cols-2 gap-5 mt-3">
        <cornie-input label="Longitude" />
        <cornie-input label="Latitude" />
        <cornie-input label="Altitude" />
        <cornie-input label="Managing Organization" />
        <cornie-input label="Part Of" />
      </div>
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mt-4
          mx-auto
        "
      >
        Hours Of Operation
      </span>
      <div class="mt-3 w-full">
        <span class="w-1/3 flex justify-between">
          <label class="flex items-center">
            <input type="radio" name="days" value="AllDay" class="mr-1" />
            All Day
          </label>
          <label class="flex items-center">
            <input type="radio" name="days" value="DaysOfWeek" class="mr-1" />
            Days of the week
          </label>
        </span>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";

@Options({
  components: {
    CornieInput,
    CornieSelect,
    PhoneInput,
  },
})
export default class AddLocation extends Vue {}
</script>
