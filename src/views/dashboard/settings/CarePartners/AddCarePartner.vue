<template>
  <main class="p-6">
    <span
      class="
        flex
        border-b-2
        w-full
        font-semibold
        text-xl text-primary
        py-2
        mx-auto
      "
    >
      Add a Care Partner
    </span>
    <form @submit.prevent="submit">
      <div class="w-full grid grid-cols-2 gap-5 mt-4">
        <cornie-input
          label="organisation identifier"
          placeholder="--Automatically Generated--"
          v-model="identifier"
        />
        <cornie-select
          label="organisation type"
          placeholder="--Select--"
          :rules="required"
          v-model="organisationType"
          :items="organisationTypeOptions"
        />
        <cornie-input
          label="organisation name"
          placeholder="--Enter--"
          :rules="required"
          v-model="name"
        />
        <cornie-input 
          label="alias" 
          placeholder="--Enter--" 
          v-model="alias" 
        />
        <domain-input
          label="domain name"
          placeholder="--Domain--"
          v-model="domainName"
        />
        <cornie-select
          label="Provider Profile"
          placeholder="--Select--"
          v-model="providerProfile"
          :rules="required"
          :items="providerProfileOptions"
        />
        <cornie-select
          :items="['Ongoing', 'Completed']"
          label="Incorporation Status"
          :rules="required"
          v-model="incorporationStatus"
        />
        <cornie-select
          label="Incorporation type"
          placeholder="--Select--"
          :rules="required"
          v-model="incorporationType"
          :items="incorporationTypeOptions"
        />
        <cornie-input
          label="registration number"
          placeholder="--Enter--"
          v-model="registrationNumber"
        />
        <phone-input
          label="phone" 
          placeholder="--Enter--" 
          :rules="required"
          v-model="phoneNumber" 
          v-model:code="dialCode"
        />
        <cornie-input
          label="address"
          placeholder="--Enter--"
          v-model="address"
        />
        <cornie-input
          label="email"
          placeholder="--Enter--"
          :rules="required"
          v-model="email"
        />
        <cornie-input label="web" placeholder="--Enter--" v-model="website" />
        <cornie-input
          label="reference organisation"
          placeholder="--Enter--"
          v-model="referenceOrganisation"
        />
      </div>
      <span class="flex justify-end w-full border-t-2 mt-5">
        <button
          @click="$router.back()"
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
          Revert Changes
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
          Add
        </cornie-btn>
      </span>
    </form>
  </main>
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
import { Prop } from "vue-property-decorator";

const CarePartnersStore = namespace("CarePartnersStore");
const dropdown = namespace("dropdown");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    DomainInput,
    PhoneInput,
  },
})
export default class AddCarePartners extends Vue implements ICarePartner {
  
  identifier = "";
  organisationType = "";
  name = "";
  alias = "";
  domainName = "";
  providerProfile = "";
  incorporationStatus = "";
  incorporationType = "";
  registrationNumber = "";
  phoneNumber = "";
  dialCode = "";
  address = "";
  email = "";
  website = "";
  referenceOrganisation = "";
  organisationTypeOptions: string[] = [];
  providerProfileOptions: string[] = [];
  incorporationTypeOptions: string[] = [];

  @CarePartnersStore.State
  carePartners!: ICarePartner[];

  get phone(): {dialCode: string, number: string} {
    return {
      dialCode: this.dialCode,
      number: this.phoneNumber
    }
  }

  loading = false;

  required = yupString().required();

  @CarePartnersStore.Action
  create!: (partner: ICarePartner) => Promise<boolean>;


  @dropdown.Action
  getDropdowns!: (name: string) => Promise<string[]>;

  async submit() {
    this.loading = true;
    const created = await this.create(this);
    this.loading = false;
    if (created) this.$router.back();
    else alert("Failed to create care partner. Please retry");
  }

  async fetchDropDown() {
    const orgType = cornieClient().get(
      "/api/v1/organization/getOrganisationType"
    );
    const providerProfile = cornieClient().get(
      "/api/v1/organization/getProviderProfile"
    );
    const incType = cornieClient().get(
      "/api/v1/organization/getIncorporationType"
    );
    const response = await Promise.all([orgType, providerProfile, incType]);
    this.organisationTypeOptions = response[0].data;
    this.providerProfileOptions = response[1].data;
    this.incorporationTypeOptions = response[2].data;
  }

  async mounted() {
    this.fetchDropDown();

  }
}
</script>