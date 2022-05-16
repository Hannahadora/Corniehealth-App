<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
          New Care Partner
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
         <v-form ref="form">
             <p class="mb-4">
                    Select or manually input care partner details for invite
            </p>
            <div class="border-dashed border-gray-300 border-b-2 pb-5 mb-5">
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
            </div>
            <div class="mt-5 mb-5">
                <span class="text-sm text-danger font-bold cursor-pointer" @click="showAdded"> 
                    {{ addedCarePartners.length }} Added
                </span>
            </div>
            <div class="mt-5">
                 <cornie-select
                    label="organisation type"
                    class="required w-full"
                    placeholder="--Select--"
                    :rules="required"
                    :required="true"
                    v-model="type"
                    :items="orgTypes"
                />
                <cornie-input
                    label="organisation name"
                    class="required w-full"
                    :required="true"
                    placeholder="--Enter--"
                    :rules="required"
                    v-model="name"
                />
                 <cornie-input
                    label="Description"
                    class="w-full mt-4"
                    placeholder="--Enter--"
                    v-model="description"
                />
                  <cornie-select
                    label="Specialty"
                    class="w-full mt-4"
                    placeholder="--Select--"
                    v-model="speciality"
                    :items="allSpecials"
                />
                <cornie-input
                label="address"
                class="my-6"
                placeholder="--Enter--"
                v-model="address"
                />
                <cornie-input
                label="Email Address"
                class="my-6"
                :required="true"
                placeholder="--Enter--"
                :rules="emailRule"
                v-model="email"
                />
                <phone-input
                label="phone"
                class="my-6"
                placeholder="--Enter--"
                :rules="requiredRule"
                v-model="phoneNumber"
                v-model:code="dialCode"
                />
            </div>
            <span class="text-danger font-bold text-sm mt-3 cursor-pointer"  @click="addCarePartner"> <span class="text-xl">+</span> Add</span>

        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="sendInvite"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Invite
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>


  </cornie-dialog>
  <added-modal v-model="showAddedDiag"
   @close-added-diag="closeAdded"
    @edit-added-partner="editAddedPartner"
    @delete-added-partner="deleteAddedPartner"
    :addedCarePartners="addedCarePartners"/>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { string } from "yup";
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { mapDisplay } from "@/plugins/definitions";
import { string as yupString } from "yup";


import ICarePartner from "@/types/ICarePartner";
import IPhone from "@/types/IPhone";
import IEmail from "@/types/IEmail";
import ISpecial from "@/types/ISpecial";


import AccordionComponent from "@/components/form-accordion.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import TextArea from "@/components/textarea.vue";
import CornieInput from "@/components/cornieinput.vue";
import DRangePicker from "@/components/daterangecalendar.vue";
import DatePicker from "@/components/datepicker.vue";
import PhoneInput from "@/components/phone-input.vue";
import CornieRadio from "@/components/cornieradio.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import Multiselect from "@vueform/multiselect";
import FhirInput from "@/components/fhir-input.vue";
import AutoComplete from "@/components/autocomplete.vue";
import InfoBlueBg from "@/components/icons/info-blue-bg.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import SearchInput from "@/components/search-input.vue";


import AddedModal from "./AddCarePartners.vue";


const dropdown = namespace("dropdown");
const carePartners = namespace("CarePartnersStore");
const special = namespace("special");

@Options({
  name: "carePartnerModal",
  components: {
    ...CornieCard,
    AccordionComponent,
    CornieIconBtn,
    ArrowLeftIcon,
    InfoBlueBg,
    DRangePicker,
    PhoneInput,
    SearchInput,
    FhirInput,
    CancelIcon,
    AutoComplete,
    CornieDialog,
    CornieRadio,
    Avatar,
    AddedModal,
    CornieMenu,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    DatePicker,
    Multiselect,
    IconInput,
     CornieInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
    DeleteorangeIcon
  },
})
export default class carePartnerModal extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;


    @Prop({ type: String, default: "" })
    partnerid!: string;

  @Prop({ type: Boolean, default: false })
  isUpdate!: Boolean;

  @Prop({ type: Object, default: {} })
  partnerToEdit!: ICarePartner;

  

    @special.State
    specials!: ISpecial[];

    @special.Action
    fetchSpecials!: () => Promise<void>;
    


  @carePartners.State
  carePartners!: ICarePartner[];

  @carePartners.Action
  fetchPartners!: () => Promise<boolean>;

  @carePartners.Action
  create!: (partner: ICarePartner) => Promise<boolean>;

  @carePartners.Action
  search!: (payload: { q: string }) => Promise<ICarePartner[]>;
  orgTypes = [];
  searchString = "" as string;
  index = "" as any;
  name = "" as string | undefined;
  type = "" as string | undefined;
  email = "" as string;
  dialCode = "+234" as string | undefined;
  phoneNumber = "" as string;
   id = "" as string | undefined;
  address = "" as string | undefined;
  required = true as boolean;
  loading = false as boolean;
  showAddedDiag = false as boolean;
  addedCarePartners = [] as ICarePartner[];
  searchItems = [] as ICarePartner[];

  description = "";
  speciality = "";
  showAddedInvite = false;

  emailRule = string().email().required();
  requiredRule = string().required();

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

get allSpecials() {
    return this.specials.map((i: any) => {
      return {
        code: i.id,
        display: i.name,
      };
    });
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

      window.notify({
        msg: "Care Partner Invited Successfully",
        status: "success",
      });

      this.loading = false;
      this.$emit("addPartner");
      this.show = false;
      this.addedCarePartners = [] as ICarePartner[];
      this.reset();
    } catch (err) {
      window.notify({
        msg: "An Error While Sending Care Partner Invitation",
        status: "error",
      });
      this.loading = false;
      this.reset();
    }
  }

  async fetchDropDown() {
    const orgType = cornieClient().get(
      "/api/v1/organization/getOrganisationType"
    );

    const response = await Promise.all([orgType]);
    this.orgTypes = response[0].data;
  }

  async created() {
    await this.fetchDropDown();
     await  this.fetchSpecials();
    if (!this.carePartners.length) await this.fetchPartners();
  }



}
</script>
