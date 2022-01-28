<template>
  <cornie-dialog
    v-model="show"
    center
    class="w-96 h-5/6 animated fadeIn z-50 absolute overflow-y-hidden"
  >
    <cornie-card height="100%" class="flex flex-col animated fadeInUp">
      <cornie-card-title class="w-full p-3">
        <cornie-icon-btn @click="$emit('close-add-care-partner')">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ isUpdate ? "Edit Care Partner" : `New Care Partner` }}
          </h2>
        </div>
      </cornie-card-title>
      <cornie-card-text
        class="flex-grow scrollable flex flex-col overflow-y-hidden"
      >
        <div class="text-xs text-black">
          Select or manually input care partner details for an invite
        </div>
        <div class="p-2 flex flex-col overflow-y-auto flex-1">
          <v-form @submit="submit" class="mt-1 overflow-y-auto max-h-full px-3">
            <search-input
              class="rounded-full focus:outline-none mb-3"
              :placeholder="`Search care partner`"
              v-model="search"
              :results="['One', 'Two', 'Three']"
            >
            </search-input>
            <div
              class="w-full border-b border-gray-300 dashed mb-3 border-dashed"
            ></div>
            <cornie-input
              label="Organisation name"
              class="mb-3"
              required
              placeholder="--Enter--"
              v-model="name"
            />
            <cornie-input
              label="Organisation type"
              class="mb-3"
              required
              placeholder="--Enter--"
              v-model="type"
            />
            <cornie-input
              label="address"
              class="mb-3"
              placeholder="--Enter--"
              v-model="address"
            />
            <cornie-input
              label="email address"
              class="mb-3"
              required
              placeholder="--Enter--"
              v-model="email"
            />
            <phone-input
              label="phone number"
              class="mb-3"
              placeholder="--"
              required
              v-model="phoneNumber"
              v-model:code="dialCode"
            />
            <div class="w-full flex justify-end mt-2">
              <button
                class="border-0 font-bold text-red-500 text-sm"
                type="button"
              >
                Add
              </button>
            </div>
            <div class="flex justify-end w-full mt-5">
              <button
                type="button"
                class="outline-primary rounded-md text-black mr-3 py-2 pr-8 pl-8 px-3 focus:outline-none hover:bg-primary hover:text-white border-primary border-2"
                @click="$emit('close-add-care-partner')"
              >
                Close
              </button>
              <cornie-btn
                :loading="loading"
                type="submit"
                class="bg-danger rounded-md text-white pr-10 pl-10 focus:outline-none hover:opacity-90"
              >
                Invite
              </cornie-btn>
            </div>
          </v-form>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CheckBox from "@/components/corniecheckbox.vue";
import IconInput from "@/components/IconInput.vue";
import SearchInput from "@/components/search-input.vue";
import PhoneInput from "@/components/phone-input.vue";
import SearchIcon from "@/components/icons/search.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import ICarePartner from "@/types/ICarePartner";

import { namespace } from "vuex-class";

const carePartners = namespace("CarePartnersStore");
const dropdown = namespace("dropdown");

@Options({
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CheckBox,
    IconInput,
    SearchIcon,
    SearchInput,
    PhoneInput,
    CloseIcon,
  },
})
export default class AddCarePartner extends Vue {
  @Prop({ type: Boolean, default: false })
  visible!: boolean;

  @PropSync("visible")
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  isUpdate!: Boolean;

  @carePartners.State
  carePartners!: ICarePartner[];

  @carePartners.Action
  fetchPartners!: () => Promise<boolean>;

  search = "" as string;
  name = "" as string;
  type = "" as string;
  email = "" as string;
  dialCode = "+234" as string;
  phoneNumber = "" as string;
  address = "" as string;
  required = true as boolean;
  loading = false as boolean;
  //   show = false as boolean;

  @Watch("visible")
  handleShow() {
    this.show = this.visible;
  }

  //   async close() {
  //       this.show = false
  //       this.visible = false
  //   }
  async submit() {}

  async created() {
    if (!this.carePartners.length) await this.fetchPartners();
  }
}
</script>
