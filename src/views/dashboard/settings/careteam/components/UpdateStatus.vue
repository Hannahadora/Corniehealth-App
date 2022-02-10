<template>
  <update-status-dialog title="Change Status" v-model="show" class="w-auto">
    <div class="col-span-12 mb-4">
      <cornie-select
        :rules="required"
        :items="['active', 'inactive']"
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
        @click="submit"
        type="submit"
        class="bg-danger rounded-md text-white mt-5 pr-10 pl-10 focus:outline-none hover:opacity-90"
      >
        Update
      </cornie-btn>
    </span>
  </update-status-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import CornieSelect from "@/components/cornieselect.vue";
import UpdateStatusDialog from "@/components/update-status-dialog.vue";

@Options({
  components: {
    CornieSelect,
    UpdateStatusDialog,
  },
})
export default class UpdateStatus extends Vue {
  loading = false as Boolean;
  required = false as Boolean;
  status = "" as String;

  @Prop({ type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "", require: true })
  teamStatus!: string;

  async submit() {
    this.loading = true;
    this.$emit("update-status", this.status);
  }

  created() {
    this.status = this.teamStatus;
  }
}
</script>
