<template>
  <div class="container-fluid mb-9">
    <div class="container-fluid w-full flex items-center justify-between">
      <div class="border-b-2 w-11/12"></div>
      <div
        class="bg-primary border text-white w-1/11 p-1 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer"
        style="height: 24px; width: 24px"
        @click="closeSection"
      >
        ×
      </div>
    </div>

    <div class="container-fluid">
      <div class="w-full flex mt-4 mb-4">
        <p>
          Are you sure you want to deactivate?<br />
          This action will permanently delete your Cornie Health account and set
          your healthcare back significantly.<br />
          Once you initiate the deactivation process, you won't be able to
          restore your data nor reactivate your account.
        </p>
      </div>

      <div class="w-full flex border-dashed-b-2 pb-4">
        <div class="w-8/12">
          <h2 class="font-semibold text-lg mt-12 mb-6">
            Here are some options to consider:
          </h2>

          <div>
            <div class="mb-6">
              <cornie-radio
                :label="'Manage who can access your health records'"
                :value="'Manage who can access your health records'"
                v-model="options"
                name="accessOptions"
              />
            </div>
            <div class="mb-6">
              <cornie-radio
                :label="'Manage provider permissions within your health records'"
                :value="'Manage provider permissions within your health records'"
                v-model="options"
                name="accessOptions"
              />
            </div>
            <div class="mb-6">
              <cornie-radio
                :label="'I understand the implications, deactivate my account'"
                :value="'I understand the implications, deactivate my account'"
                v-model="options"
                name="accessOptions"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full mt-6 mb-2 flex justify-end">
        <Button :loading="false" class="focus:outline-none mr-8">
          <span
            @click="closeSection"
            class="text-primary curved border border-primary cursor-pointer focus:outline-none font-bold py-3 px-8 rounded-lg"
          >
            Cancel
          </span>
        </Button>

        <Button
          :loading="false"
          class="focus:outline-none"
          @click="deactivateAccount"
        >
          <span
            style="background: #fe4d3c"
            class="text-white-500 curved border cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-lg"
          >
            Save
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ToggleCheck from "@/components/ToogleCheck.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieRadio from "@/components/cornieradio.vue";
import { cornieClient } from "@/plugins/http";

@Options({
  components: {
    ToggleCheck,
    CornieInput,
    CornieRadio,
  },
})
export default class TwoFA extends Vue {
  options = "I understand the implications, deactivate my account";
  loading = false;
  closeSection() {
    this.$emit("closesection");
  }

  async deactivateAccount() {
    try {
      this.loading = true;
      const res = await cornieClient().get("/api/v1/patient-portal/security/deactivate-account");
      this.loading = false;
      if (!res.status) {
        notify({
          msg: "There was an error deactivating your account",
          status: "error",
        });
      } else {
        notify({
          msg: "Account Deactivated",
          status: "success",
        });
      }
    } catch (error) {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.border-dashed-b-2 {
  border-bottom: 1px dashed #c5c4d4;
}
</style>
