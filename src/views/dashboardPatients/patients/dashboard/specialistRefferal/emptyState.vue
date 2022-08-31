<template>
  <div class="w-full flex flex-col justify-center items-center h-96">
    <img src="@/assets/specialist.svg" />
    <h1 class="text-center text-lg mt-5 font-bold">
      Enjoy your good health
    </h1>
    <p class="text-gray-400 text-center">
      Your primary care doctor will refer you to a specialist, <br/> if the need arises.
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
export default class orgmptyState extends Vue {
  showOrgModal = false;
}
</script>
