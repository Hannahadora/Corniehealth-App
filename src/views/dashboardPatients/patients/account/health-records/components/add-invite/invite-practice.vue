<template>
  <clinical-dialog
    v-model="show"
    title="Invite a Practice"
    class="md:w-1/4 h-full w-full"
  >
    <div class="flex flex-col space-y-5">
      <cornie-input
        class="w-full"
        v-model="email"
        label="Email address"
        :rules="emailRule"
        placeholder="Enter"
      />

      <div>
        <cornie-checkbox
          v-model="selectedHealthRecord"
          :label="'Select Health Record to apply'"
          :items="healthRecords"
          v-if="healthRecords.length > 0"
        />
        <div v-else class="font-bold border-t border-b py-2">
          No Health Record to apply
        </div>
      </div>
      <div>
        <cornie-radio
          v-model="createNew"
          value="true"
          label="Create a new Health Record for this practice"
        />
      </div>
    </div>
    <div class="absolute bottom-0 w-full">
      <div class="flex justify-end space-x-1 px-6 py-2 bg-white">
        <cornie-btn
          @click="show = false"
          class="border-primary border-2 px-1 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="send"
          :loading="loading"
          class="text-white bg-danger px-6 rounded-xl"
        >
          Send Invite
        </cornie-btn>
      </div>
    </div>
  </clinical-dialog>
</template>
<script lang="ts">
  import CornieInput from "@/components/cornieinput.vue";
  import CornieCheckbox from "@/components/custom-checkbox.vue";

  import CornieSelect from "@/components/cornieselect.vue";
  import { cornieClient } from "@/plugins/http";
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { string } from "yup";

  @Options({
    components: {
      ClinicalDialog,
      CornieInput,
      CornieCheckbox,
      CornieSelect,
    },
  })
  export default class addPractice extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    emailRule = string().email();

    email = "";
    createNew = false;
    selectedHealthRecord = "";
    allHealthRecords = [];
    loading = false;

    get healthRecords() {
      const items =
        this.allHealthRecords.length > 0
          ? this.allHealthRecords.map((r: any) => ({
              display: r?.organization?.name,
              code: r.id,
            }))
          : [];
      console.log("itessm", items);
      return items;
    }

    async fetchHealthRecords() {
      const response = await cornieClient().get(
        `/api/v1/patient-portal/health-record`
      );
      console.log("dataaa", response.data);
      this.allHealthRecords = response.data;
    }

    async mounted(): Promise<void> {
      await this.fetchHealthRecords();
    }
    async send() {
      if (!this.email) return;
      this.loading = true;
      try {
        const response = await cornieClient().post(
          `/api/v1/patient-portal/provider-permission/invite-practice`,
          {
            recordId: this.selectedHealthRecord || undefined,
            email: this.email,
          }
        );
        console.log("Added practice", response.data);
        window.notify({ msg: "Successful", status: "success" });
        this.loading = false;
        this.show = false;
      } catch (error) {
        this.loading = false;
        console.log("error adding practice", error);
        // window.notify({ msg: "Error adding practice", status: "error" });
        window.notify({ msg: "Error inviting practice", status: "error" });
      }
    }
  }
</script>
