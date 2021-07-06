<template>
  <main class="w-1/2 flex flex-col justify-center items-center">
    <location-icon />
    <h3 class="text-center text-black mt-5"></h3>
    <h4 class="text-black text-center">Add New Location</h4>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        mt-5
        py-2
        px-3
        focus:outline-none
        hover:opacity-90
      "
    >
      <p>
        <router-link to="/dashboard/settings/location/add-location"
          >Add New Location</router-link
        >
      </p>
    </button>
  </main>
</template>

<script>
import LocationIcon from "@/components/icons/locationIcon.vue";
export default {
  name: "locationEmptyState",
  components: {
    LocationIcon,
  },
};
</script>