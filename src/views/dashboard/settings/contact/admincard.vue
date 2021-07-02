<template>
  <div class="w-full flex p-3 border rounded-lg align-center justify-between">
    <div class="flex w-3/4 border-r-2 justify-between pr-12">
      <avatar
        class="h-14 w-14 my-auto"
        src="https://avatars.githubusercontent.com/u/66243665?v=4"
      />
      <span class="flex flex-col">
        <span class="text-blue-500 text-sm font-semibold uppercase block"
          >Name</span
        >
        <span class="text-sm">Roland Ezekiel</span>

        <span class="text-blue-500 text-sm font-semibold uppercase block mt-2">
          Email
        </span>
        <span class="text-sm">Roland@gmail.com</span>
      </span>
      <span class="flex flex-col">
        <span class="text-blue-500 text-sm font-semibold uppercase block"
          >Phone</span
        >
        <span class="text-sm">(234) 809 090 8897</span>

        <span class="text-blue-500 text-sm font-semibold uppercase block mt-2">
          Address
        </span>
        <span class="text-sm">12 Crescent Road, Ikeja, Lagos, Nigeria</span>
      </span>
    </div>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        py-2
        px-3
        my-auto
        focus:outline-none
        hover:opacity-90
      "
    >
      Edit My Contacts
    </button>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Avatar from "@/components/avatar.vue";

@Options({
  components: {
    Avatar,
  },
})
export default class AdminCard extends Vue {}
</script>
