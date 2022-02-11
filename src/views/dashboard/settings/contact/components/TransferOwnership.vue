<template>
  <div
    class="flex items-center p-1.5 cursor-pointer hover:bg-gray-50 rounded-full border-primary border"
    @click="show = true"
  >
    <TransferIcon class="text-primary mr-4" />
    <span class="text-sm text-primary">Transfer Ownership</span>
  </div>
  <update-status-dialog title="Transfer Ownership" v-model="show">
    <form class="mt-5 w-full" @submit.prevent="submit">
      <div class="col-span-12 mb-4">
        <div class="mb-5">
          <cornie-select
            :items="practitionerList"
            v-model="practitioner"
            label="Practitioner"
            placeholder="--Select--"
            @selected="handlePractionerChange"
          >
            <template #item="{ item }">
              {{ item.name }}
            </template>
            <template #selected="{ item }">{{
              item ? item.name : "--Select--"
            }}</template>
          </cornie-select>
          <cornie-select
            :items="roleList"
            v-model="role"
            label="Role"
            placeholder="--Select--"
            @selected="handleRoleChange"
          >
            <template #item="{ item }">
              {{ item.name }}
            </template>
            <template #selected="{ item }">{{
              item ? item.name : "--Select--"
            }}</template>
          </cornie-select>
        </div>
      </div>
      <span class="flex justify-end w-full">
        <button
          @click="show = false"
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
          Transfer
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
import TransferIcon from "@/components/icons/transfer.vue";

import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import { cornieClient } from "@/plugins/http";

const role = namespace("roles");

@Options({
  components: {
    UpdateStatusDialog,
    CornieSelect,
    CornieInput,
    TransferIcon,
  },
})
export default class TransferOwnership extends Vue {
  loading = false as boolean;
  role = "" as string;
  practitioner = "" as string;
  required = true as boolean;

  show = false as boolean;

  @role.State
  practitioners!: IPractitioner[];

  @role.State
  roles!: [];

  @role.Action
  fetchPractitioners!: () => Promise<boolean>;

  @role.Action
  getRoles!: () => Promise<boolean>;

  get practitionerList() {
    return this.practitioners.map((item) => {
      return {
        code: item.id,
        name: `${item.firstName} ${item.lastName}`,
      };
    });
  }

  get roleList() {
    return this.roles.map((item: any) => {
      return {
        code: item.id,
        name: `${item.name}`,
      };
    });
  }

  async handlePractionerChange(val: any) {
    this.practitioner = val.code;
  }

  async handleRoleChange(val: any) {
    this.role = val.code;
  }

  async created() {
    if (!this.practitioners.length) await this.fetchPractitioners();
    if (!this.roles.length) await this.getRoles();

    console.log(this.roles);
    console.log(this.practitioners);
  }

  async submit() {
    if (!this.role && !this.practitioner) return;
    let payload = {
      role: this.role,
      practitioner: this.practitioner,
    };
    this.show = false;
    const confirmed = await window.confirmAction({
      title: "Transfer Ownership",
      message:
        "This action transfers the account ownership and all associated privileges to the selected user. Are you sure you wish to proceed?",
    });

    if (confirmed) {
      this.show = true;
      this.loading = true;
      try {
        const res = await cornieClient().post("api/v1/transfer-admin", payload);
        if (res.data)
          window.notify({
            status: "success",
            title: "Ownership transferred!",
          } as INotify);

        this.show = false;
        this.$emit("ownership-transferred");
        this.loading = false;
      } catch (err) {
        window.notify({
          status: "error",
          title: "Ownership not transferred!",
        } as INotify);
        this.loading = false;
      }
    } else {
      this.show = true;
    }
  }
}
</script>
