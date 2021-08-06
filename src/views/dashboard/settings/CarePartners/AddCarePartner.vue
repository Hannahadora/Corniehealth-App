<template>
  <card>
    <card-title>
      <span class="flex font-semibold text-xl text-primary py-2 font-extrabold">
        New Care Partner
      </span>
      <span class="flex-grow" />
      <icon-btn @click="close">
        <close stroke="#211F45" />
      </icon-btn>
    </card-title>
    <card-text class="flex mx-3 border-b-2 pb-6">
      <cornie-menu>
        <template #activator="{ on }">
          <icon-input
            class="border border-gray-600 rounded-full focus:outline-none"
            type="search"
            placeholder="Search Care Partners"
            v-model="searchString"
            v-on="on"
          >
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
        </template>
        <card>
          <card-text
            v-for="(item, index) in searchItems"
            :key="index"
            @click="selectedCarePartner = item"
            class="cursor-pointer hover:bg-gray-50 flex flex-col"
          >
            <span> {{ item.name }} </span>
            <span class="text-sm text-gray-600 italic">
              {{ item.address }}
            </span>
          </card-text>
        </card>
      </cornie-menu>
    </card-text>
    <card-text>
      <v-form @submit="submit">
        <div class="w-full flex">
          <div class="w-1/2 mx-4">
            <cornie-input
              label="organisation name"
              class="my-6"
              required
              placeholder="--Enter--"
              :rules="required"
              v-model="name"
            />
            <cornie-input
              label="address"
              class="my-6"
              placeholder="--Enter--"
              v-model="address"
            />
            <phone-input
              label="phone"
              class="my-6"
              placeholder="--Enter--"
              :rules="required"
              v-model="phoneNumber"
              v-model:code="dialCode"
            />
          </div>
          <div class="w-1/2 mx-4">
            <cornie-select
              label="organisation type"
              class="my-6"
              required
              placeholder="--Select--"
              :rules="required"
              v-model="organisationType"
              :items="organisationTypeOptions"
            />
            <cornie-input
              label="email"
              class="my-6"
              required
              placeholder="--Enter--"
              :rules="required"
              v-model="email"
            />
          </div>
        </div>
        <span class="flex justify-end w-full mt-5">
          <button
            @click="close"
            type="button"
            class="
              outline-primary
              rounded-full
              text-black
              mt-5
              mr-3
              py-2
              pr-8
              pl-8
              px-3
              focus:outline-none
              hover:bg-primary
              hover:text-white
            "
          >
            Cancel
          </button>
          <cornie-btn
            :loading="loading"
            type="submit"
            class="
              bg-danger
              rounded-full
              text-white
              mt-5
              pr-10
              pl-10
              focus:outline-none
              hover:opacity-90
            "
          >
            Invite
          </cornie-btn>
        </span>
      </v-form>
    </card-text>
  </card>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import DomainInput from "@/components/domain-input.vue";
import { string as yupString } from "yup";
import ICarePartner from "@/types/ICarePartner";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import Card from "@/components/card.vue";
import CardText from "@/components/card-text.vue";
import CardTitle from "@/components/card-title.vue";
import IconBtn from "@/components/iconbtn.vue";
import Close from "@/components/icons/close.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieMenu from "@/components/CornieMenu.vue";
import { Watch } from "vue-property-decorator";
import IPhone from "@/types/IPhone";
import IEmail from "@/types/IEmail";

const CarePartnersStore = namespace("CarePartnersStore");
const dropdown = namespace("dropdown");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    DomainInput,
    PhoneInput,
    Card,
    CardText,
    CardTitle,
    Close,
    IconBtn,
    IconInput,
    SearchIcon,
    CornieMenu,
  },
  emits: ["close"],
})
export default class AddCarePartners extends Vue implements ICarePartner {
  organisationType = "";
  name = "";
  phoneNumber = "";
  dialCode = "";
  address = "";
  email = "";
  organisationTypeOptions: string[] = [];
  id = "";
  searchString = "";
  searchItems: ICarePartner[] = [];

  @CarePartnersStore.State
  carePartners!: ICarePartner[];

  @CarePartnersStore.Action
  search!: (payload: { q: string }) => Promise<ICarePartner[]>;

  get phone(): IPhone {
    return {
      dialCode: this.dialCode,
      number: this.phoneNumber,
    };
  }

  set phone(phone: IPhone) {
    this.dialCode = phone.dialCode || "+234";
    this.phoneNumber = phone.number;
  }

  set selectedCarePartner(partner: ICarePartner) {
    this.name = partner.name;
    this.organisationType = partner.organisationType;
    this.phone = partner.phone as IPhone;
    this.address = partner.address as string;
    this.email = (partner.email as unknown as IEmail).address;
    this.id = partner.id as string;
    this.searchString = partner.name;
  }

  loading = false;

  required = yupString().required();

  @CarePartnersStore.Action
  create!: (partner: ICarePartner) => Promise<boolean>;

  @dropdown.Action
  getDropdowns!: (name: string) => Promise<string[]>;

  close() {
    this.$emit("close");
  }

  async submit() {
    this.loading = true;
    if (this.id)
      var created = await this.create({
        id: this.id,
        name: this.name,
        organisationType: this.organisationType,
        email: this.email,
        phone: this.phone,
        address: this.address,
      });
    else var created = await this.create({
      name: this.name,
      organisationType: this.organisationType,
      email: this.email,
      phone: this.phone,
      address: this.address,
    });
    this.loading = false;
    if (!created)
      notify({ msg: "Failed to add care partner", status: "error" });
    else notify({ msg: "Care Partner added", status: "success" });
    this.close();
  }

  async fetchDropDown() {
    const response = await cornieClient().get(
      "/api/v1/organization/getOrganisationType"
    );

    this.organisationTypeOptions = response.data;
  }

  @Watch("searchString")
  async onSearchStringChanged() {
    if (this.searchString.length > 0)
      this.searchItems = await this.search({ q: this.searchString });
    else this.searchItems = [];
  }

  mounted() {
    this.fetchDropDown();
  }
}
</script>