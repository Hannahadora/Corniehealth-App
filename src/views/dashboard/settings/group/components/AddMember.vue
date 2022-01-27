<template>
  <update-status-dialog title="Add  a Member" v-model="show">
    <form class="mt-5 w-full" @submit.prevent="submit">
      <div class="col-span-12 mb-4">
        <div class="mb-5">
          <cornie-input
            label="NAME"
            class="mb-3"
            placeholder="--Input--"
            v-model="name"
          />
          <cornie-select
            :rules="required"
            :items="['Active', 'Inactive']"
            v-model="type"
            label="TYPE"
            placeholder="--Select--"
          >
          </cornie-select>
        </div>
      </div>
      <span class="flex justify-end w-full">
        <button
          @click="$emit('close-member-diag')"
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
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";

@Options({
  components: {
    UpdateStatusDialog,
    CornieSelect,
    CornieInput,
  },
})
export default class AddMemberDiag extends Vue {
  loading = false as boolean;
  type = "" as string;
  name = "" as string;
  required = true as boolean;

  @Prop({ type: Boolean, default: false })
  show!: boolean;

  async submit() {}
}
</script>
