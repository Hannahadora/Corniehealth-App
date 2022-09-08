<template>
  <clinical-dialog
    v-model="show"
    :title="'Unshare Bill'"
    class="md:w-1/4 h-full w-full"
  >
    <div class="flex flex-col space-y-7">
      <div class="text-black bg-blue-100">
        The person you shared this bill with would not be able to view the bill
        or assist with payment once you have unshared.
      </div>
      <div>
        <p class="font-bold">Shared With:</p>
        <di></di>
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="flex justify-end space-x-3 px-6 py-2 bg-white">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn @click="save" class="text-white bg-danger px-6 rounded-xl">
          Save
        </cornie-btn>
      </div>
    </div>
  </clinical-dialog>
</template>
<script lang="ts">
  import CornieRadio from "@/components/cornieradio.vue";
  import ClipBoardIcon from "@/components/icons/clipboard.vue";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
      ClipBoardIcon,
      CornieRadio,
    },
  })
  export default class shareBill extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    email = "";
    save() {}
  }
</script>
