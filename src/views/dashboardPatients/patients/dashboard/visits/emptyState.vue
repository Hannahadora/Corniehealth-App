<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/visits.svg" />
    <h1 class="text-center text-lg mt-5 font-bold">
      You have not had any visits yet.
    </h1>
    <p class="text-gray-400 text-center">
      To schedule a visit explore and  instantly book  with your preferred provider.<br/>
Want to book for a family member? Go to Profiles.

    </p>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";



@Options({
  components: {
  },
})
export default class visitemptyState extends Vue {
  showOrgModal = false;
}
</script>
