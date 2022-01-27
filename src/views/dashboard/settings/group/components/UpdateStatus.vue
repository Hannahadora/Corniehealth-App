<template>
  <update-status-dialog title="CHANGE STATUS" v-model="show">
    <form class="mt-5 w-full" @submit.prevent="updateDeviceStatus">
      <div class="col-span-12 mb-4">
        <cornie-select
          :items="['Active', 'Inactive']"
          label="STATUS"
          v-model="status"
        >
        </cornie-select>
      </div>
      <span class="flex justify-end w-full">
        <button
          @click="$emit('close-status-diag')"
          type="button"
          class="outline-primary rounded-md text-black mt-5 mr-3 py-2 pr-8 pl-8 px-3 focus:outline-none hover:bg-primary hover:text-white"
        >
          Cancel
        </button>

        <cornie-btn
          :loading="loading"
          type="submit"
          class="bg-danger rounded-md text-white mt-5 pr-10 pl-10 focus:outline-none hover:opacity-90"
        >
          Update
        </cornie-btn>
      </span>
    </form>
  </update-status-dialog>
</template>

<script lang="ts">
import UpdateStatusDialog from "@/components/update-status-dialog.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  components: {
    UpdateStatusDialog,
    CornieSelect,
  },
})
export default class UpdateStatusDiag extends Vue {
  loading = false as boolean;
  status = "" as string;

  @Prop({ type: Boolean, default: false })
  show!: boolean;

  async updateDeviceStatus() {}
}
</script>
