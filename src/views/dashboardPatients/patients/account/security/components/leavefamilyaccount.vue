<template>
  <cornie-dialog v-model="show" center class="w-1/4 h-auto">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-4 py-4 rounded-lg"
    >
      <cornie-card-title class="w-full">
        <div class="w-full flex items-center justify-between">
          <h2 class="font-bold float-left text-lg text-primary">
            Leave Family Account
          </h2>

          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <p class="my-4">Confirm you want to leave this family account.</p>

      <div class="flex justify-end">
        <cornie-btn
          @click="show = false"
          class="text-base border-primary border-2 mr-3 rounded-xl text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          @click="submit"
          :loading="loading"
          class="text-base text-white bg-danger font-semibold rounded-xl"
        >
          Confirm
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "LeaveFamilyAccountModal",
  components: {
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    CornieInput,
    CornieRadio,
    CornieBtn,
    CancelRedBg,
    CornieSelect,
  },
})
export default class LeaveFamilyAccountModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @user.Getter
  authCurrentLocation!: any;

  practice = {
    email: "",
    healthRecord: "",
  };
  loading = false;

  // get locationId() {
  //   return this.authCurrentLocation;
  // }

  // get locationId() {
  //   return "21b84341-2051-4cad-b6b6-feae04f81215";
  // }

    async submit() {
  //   try {
  //     this.loading = true;
  //     const res = await cornieClient().get(
  //       "/api/v1/patient-portal/provider-permission/"
  //     );
  //     this.loading = false;
  //     if (!res.status) {
  //       notify({
  //         msg: "There was an error with leaving family account",
  //         status: "error",
  //       });
  //     } else {
  //        notify({
  //         msg: "Successful",
  //         status: "success",
  //       })
  //     }
  //   } catch (error) {
  //     this.loading = false;
  //   }
  }

  async created() {}
}
</script>
