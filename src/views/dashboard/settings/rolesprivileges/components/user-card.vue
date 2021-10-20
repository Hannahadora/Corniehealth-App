<template>
  <div class="container my-4 py-4 px-2 border flex items-center card_width">
        <div class="w-3/12">
            <div class="container flex justify-center">
                <img src="https://via.placeholder.com/100" alt="Photo" class="rounded-full" style="width: 44px; height: 44px">
            </div>
        </div>
        <div class="w-9/12 flex flex-col">
            <span class="text-sm font-semibold">Miriam Adekunle</span>
            <span class="italic text-xs">Audiologist</span>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import Modal from '@/components/confirm.vue'

@Options({
  components: {
    // Modal
  },
})
export default class UserCard extends Vue {


}
</script>
<style>
    .card_width {
        min-width: 189.5px !important;
        max-width: 200px !important;
    }
</style>
