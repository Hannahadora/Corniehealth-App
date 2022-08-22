<template>
  <clinical-dialog
    v-model="show"
    :title="'Card'"
    class="md:w-1/4 h-full w-full"
  >
    <div class="flex flex-col">
      <div class="flex w-full items-center justify-center h-40 border">
        <cornie-btn
          @click="proceed"
          class="text-white bg-primary px-6 rounded-xl"
        >
          Proceed
        </cornie-btn>
      </div>
      <span class="w-full my-10 border"></span>
      <div>
        <p class="font-bold">Select default Provider</p>
      </div>
      <div></div>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="flex justify-end space-x-1 px-6 py-2 bg-white">
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
  import { cornieClient } from "@/plugins/http";
  import IPractitioner from "@/types/IPractitioner";
  import { CornieUser } from "@/types/user";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const account = namespace("user");

  @Options({
    components: {
      ClinicalDialog,
    },
  })
  export default class NewCardPayment extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @account.Getter
    cornieUser!: CornieUser;

    @account.Getter
    corniePatient!: any;

    @account.Mutation
    updatePractitioner!: (practitioners: IPractitioner[]) => void;

    @account.Getter
    authPractitioner!: IPractitioner;

    get userId() {
      return this.cornieUser?.id;
    }

    get payload() {
      return {
        accountType: this.corniePatient?.accountType,
        type: "dc",
        ownerId: this.corniePatient?.id,
        card: {
          email: this.corniePatient?.email,
        },
      };
    }

    async proceed() {
      const response = await cornieClient().post(
        `/api/v1/patient-portal/payment`,
        this.payload
      );
      console.log("response:", response.data);
      const { url } = response.data;
      console.log(url);

      window.location.href = url;
      // this.allPatientAccount = response.data;
    }

    async save() {}
    async mounted() {
      await this.updatePractitioner(this.authPractitioner as any);
    }
  }
</script>
