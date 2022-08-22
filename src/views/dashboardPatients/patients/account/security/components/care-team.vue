<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-4 py-4 rounded-lg"
    >
      <cornie-card-title class="flex items-center">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Care Team
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <p class="my-6 font-bold text-lg">{{ practice.name }}</p>

      <div class="flex items-start justify-between">
        <p>Address</p>
        <div>
          {{ practice.address }}
        </div>
      </div>

      <p class="my-6 font-bold text-lg">Team Members</p>
      
      <div>
        <table class="w-full">
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Designation</th>
          </tr>
          <tr v-for="(practitioner, i) in practice.practititioners" :key="i">
            <td>{{ practitioner.name }}</td>
            <td>{{ practitioner.specialty }}</td>
            <td>{{ practitioner.designation }}</td>
          </tr>
        </table>
      </div>


      <div class="absolute right-6 bottom-6">
        <div class="flex justify-end">
        <cornie-btn
          @click="show = false"
          class="text-base border-primary border-2 mr-3 rounded-xl text-primary"
        >
          Close
        </cornie-btn>
      </div>
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
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";

const user = namespace("user");

type Sorter = (a: any, b: any) => number;
function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "CareTeam",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CancelIcon,
    CornieDialog,
    CornieInput,
    CornieBtn,
    CancelRedBg,
    CornieSelect,
    ArrowLeft,
    IconBtn,
  },
})
export default class CareTeam extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  practice = <any>{}

  @user.Getter
  loading = false;

  async submit() {
    try {
      this.loading = true;
      const res = await cornieClient().get(
        `/api/v1/patient-portal/provider-permission/accept/${this.id}`
      );
      this.loading = false;
      if (!res.status) {
        notify({
          msg: "There was an error with leaving family account",
          status: "error",
        });
      } else {
        notify({
          msg: "Successful",
          status: "success",
        });
      }
    } catch (error) {
      this.loading = false;
    }
  }

  async created() {}
}
</script>
