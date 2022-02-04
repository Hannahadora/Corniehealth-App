<template>
  <added-care-partner
    :visible="showAddedDiag"
    @close-added-diag="closeAdded"
    @edit-added-partner="editAddedPartner"
    @delete-added-partner="deleteAddedPartner"
    :addedCarePartners="addedCarePartners"
  />
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
          <div class="mt-1 overflow-y-auto max-h-full px-3">
            <search-input
              class="rounded-full focus:outline-none mb-3"
              :placeholder="`Search care partner`"
              v-model="searchString"
              :results="partners"
              @selected="populateForm"
            >
              <template v-slot:item="{ item }">
                <button class="flex flex-col justify-start">
                  <div class="text-md">{{ item.name }}</div>
                  <div class="text-sm text-gray-400">{{ item.address }}</div>
                </button>
              </template>
            </search-input>
            <div
              class="w-full border-b-2 border-gray-300 mb-3 border-dashed"
            ></div>
            <div class="flex justify-end mb-3">
              <button
                class="border-0 font-bold text-red-500 text-xs"
                @click="showAdded"
                type="button"
              >
                {{ addedCarePartners.length }} Added
              </button>
            </div>
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
                @click="addCarePartner"
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
                type="button"
                class="bg-danger rounded-md text-white pr-10 pl-10 focus:outline-none hover:opacity-90"
                @click="sendInvite"
              >
                Invite
              </cornie-btn>
            </div>
          </div>
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
import AddedCarePartner from "./AddedCarePartners.vue";

import { namespace } from "vuex-class";
import IPhone from "@/types/IPhone";
import IEmail from "@/types/IEmail";

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
    AddedCarePartner,
  },
  emits: ["close-add-care-partner", "open-add-care-partner"],
})
export default class AddCarePartner extends Vue {
  @Prop({ type: Boolean, default: false })
  visible!: boolean;

  @PropSync("visible")
  show!: boolean;

  @Prop({ type: Boolean, default: false })
  isUpdate!: Boolean;

  @Prop({ type: Object, default: {} })
  partnerToEdit!: ICarePartner;

  @carePartners.State
  carePartners!: ICarePartner[];

  @carePartners.Action
  fetchPartners!: () => Promise<boolean>;

  @carePartners.Action
  create!: (partner: ICarePartner) => Promise<boolean>;

  @carePartners.Action
  search!: (payload: { q: string }) => Promise<ICarePartner[]>;

  searchString = "" as string;
  index = "" as any;
  id = "" as string | undefined;
  name = "" as string | undefined;
  type = "" as string | undefined;
  email = "" as string;
  dialCode = "+234" as string | undefined;
  phoneNumber = "" as string;
  address = "" as string | undefined;
  required = true as boolean;
  loading = false as boolean;
  showAddedDiag = false as boolean;
  addedCarePartners = [] as ICarePartner[];
  searchItems = [] as ICarePartner[];

  get partners() {
    if (this.searchItems.length) {
      return this.searchItems.map((item) => {
        return {
          id: item.id,
          name: item.name,
          address: item.address,
          type: item.organisationType,
          email: item.email,
          phone: item.phone,
        };
      });
    } else return [] as ICarePartner[];
  }

  @Watch("partnerToEdit")
  handlePopulateForm() {
    if (this.partnerToEdit) this.populateForm(this.partnerToEdit);
  }

  @Watch("visible")
  handleShow() {
    this.show = this.visible;
  }

  @Watch("searchString")
  async handleSearch() {
    if (this.searchString.length)
      this.searchItems = await this.search({ q: this.searchString });
    else this.searchItems = [];
  }

  async showAdded() {
    this.reset();
    this.$emit("close-add-care-partner");

    setTimeout(() => {
      this.showAddedDiag = true;
    }, 300);
  }

  async closeAdded() {
    this.showAddedDiag = false;

    setTimeout(() => {
      this.$emit("open-add-care-partner");
    }, 300);
  }

  async populateForm(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.phoneNumber = item.phone.number || item.phone;
    this.dialCode = item.phone.dialCode;
    this.type = item.type || item.organisationType;
    this.address = item.address;
    this.email = item.email.address || item.email;
  }

  async editAddedPartner(p: { index: any; partner: any }) {
    const { index, partner } = p;

    this.index = partner.id ? "" : index;

    this.id = partner.id;
    this.name = partner.name;
    this.phoneNumber = partner.phoneNumber;
    this.type = partner.type;
    this.address = partner.address;
    this.email = partner.email;

    this.closeAdded();
  }

  async deleteAddedPartner(p: { index: number }) {
    const { index } = p;

    this.addedCarePartners.splice(index, 1);
  }

  async addCarePartner() {
    if (!this.name && !this.type && !this.email) return;

    if (this.index !== "") {
      let updatedPartner: any = {
        id: this.id,
        name: this.name,
        phoneNumber: this.phoneNumber,
        type: this.type,
        address: this.address,
        email: this.email,
      };

      this.addedCarePartners.splice(this.index, 1, updatedPartner);

      this.reset();
      return;
    }

    if (this.id && this.addedCarePartners.length) {
      const present: boolean = this.addedCarePartners.some(
        (item) => item.id === this.id
      );

      if (present) {
        const index = this.addedCarePartners.findIndex(
          (item) => item.id === this.id
        );

        let updatedPartner: any = {
          id: this.id,
          name: this.name,
          phoneNumber: this.phoneNumber,
          type: this.type,
          address: this.address,
          email: this.email,
        };

        this.addedCarePartners.splice(index, 1, updatedPartner);

        this.reset();
      } else {
        this.createNewPartner();
      }

      return;
    }

    this.createNewPartner();
  }

  async createNewPartner() {
    let partner: any = {
      id: this.id,
      name: this.name,
      phoneNumber: this.phoneNumber,
      type: this.type,
      address: this.address,
      email: this.email,
    };

    this.addedCarePartners = [partner, ...this.addedCarePartners];

    this.reset();
  }

  async reset() {
    this.id =
      this.index =
      this.name =
      this.phoneNumber =
      this.type =
      this.address =
      this.email =
        "";
  }

  async update(partner: any) {
    return await this.create({
      id: partner.id,
      name: partner.name,
      organisationType: partner.type,
      email: partner.email,
      phone: { number: partner.phoneNumber, dialCode: this.dialCode } as IPhone,
      address: partner.address,
    } as ICarePartner);
  }

  async save(partner: any) {
    await this.create({
      name: partner.name,
      organisationType: partner.type,
      email: partner.email,
      phone: { number: partner.phoneNumber, dialCode: this.dialCode } as IPhone,
      address: partner.address,
    } as ICarePartner);
  }

  async sendInvite() {
    if (!this.addedCarePartners.length) return;

    try {
      this.loading = true;

      for (let partner of this.addedCarePartners) {
        if (partner.id) await this.update(partner);
        else await this.save(partner);
      }

      window.notify({ msg: "Care Partner added", status: "success" });

      this.loading = false;
      this.$emit("close-add-care-partner");
      this.addedCarePartners = [] as ICarePartner[];
      this.reset();
    } catch (err) {
      window.notify({ msg: "Care Partner not added", status: "error" });
      this.loading = false;
      this.reset();
    }
  }

  async created() {
    if (!this.carePartners.length) await this.fetchPartners();
  }
}
</script>
