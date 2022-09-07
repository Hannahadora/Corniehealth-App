<template>
  <clinical-dialog
    v-model="show"
    :title="'Validate Claim'"
    class="md:w-1/4 h-full w-full"
  >
    <div class="flex flex-col space-y-7">
      <div class="flex md:space-x-4">
        <div class="md:flex-1">Total for Bill ID #5776</div>
        <div class="md:flex-none">
          N62,501
          <span class="ml-2">
            <a>View Details</a>
          </span>
        </div>
      </div>
      <div class="text-black bg-blue-100">
        Your healthcare provider has submitted a claim of N62,501 to your health
        insurance company. To enable your healthcare provider get paid, you are
        required to validate this claim. View Bill
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
  import ClipBoardIcon from "@/components/icons/clipboard.vue";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
      ClipBoardIcon,
    },
  })
  export default class shareBill extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    email = "";
    save() {}
  }
</script>
