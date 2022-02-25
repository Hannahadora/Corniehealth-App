<template>
  <main class="p-6">
    <h3 class="text-primary text-xl font-bold border-b border-gray-300">
      Practice Information
    </h3>
    <section class="pb-4">
      <div class="image-upload flex mt-10 items-center">
        <avatar-field v-model="image" />
      </div>

      <v-form @submit="submitForm">
        <div class="grid grid-cols-12 gap-x-5 gap-y-4 mt-10">
          <div class="col-span-4">
            <cornie-input
              required
              label="Practice Name"
              class="w-full"
              v-model="OrganizationName"
              :rules="requiredRule"
              placeholder="--Enter--"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="Practice Identifier"
              required
              :modelValue="OrganizationIdentifier"
              class="w-full"
              placeholder="--System generated--"
              disabled
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              label="Alias"
              placeholder="--Enter--"
              class="w-full"
              v-model="alias"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              v-if="hasDomain"
              label="Domain Name"
              placeholder="--Enter--"
              :modelValue="`https://${DomainName}.corniehealth.com`"
              disabled
            />
            <domain-input v-else label="Domain Name" v-model="DomainName" />
          </div>
          <div class="col-span-4">
            <cornie-select
              required
              :items="orgTypes"
              label="Practice Type"
              class="w-full"
              v-model="OrganizationType"
              :rules="requiredRule"
            />
          </div>
          <div class="col-span-4">
            <cornie-select
              required
              :items="provProfiles"
              label="Provider Profile"
              class="w-full"
              v-model="ProviderProfile"
              :rules="requiredRule"
            />
          </div>
          <div class="col-span-4 -mt-3.5">
            <cornie-input
              v-model="ReferenceOrganization"
              label="Reference Practice"
              class="w-full mt-0"
            >
              <template #labelicon>
                <cornie-tooltip>
                  <template #tooltip>
                    <span>Reference practice</span>
                  </template>
                  <question-icon
                    class="fill-current text-primary leading-none mt-2"
                  />
                </cornie-tooltip>
              </template>
            </cornie-input>
          </div>
          <div class="col-span-4">
            <cornie-select
              required
              :items="incTypes"
              class="w-full"
              label="Incorporation Type"
              :rules="requiredRule"
              v-model="IncorporationType"
            />
          </div>
          <div
            class="col-span-4"
            v-show="IncorporationType !== 'Not Registered'"
          >
            <cornie-input
              v-model="RegistrationNumber"
              class="w-full"
              label="Incorporation Number"
              :rules="requiredRule"
              placeholder="--Enter--"
            >
              <template #prepend>
                <span class="font-bold text-sm text-gray-400">RC</span>
              </template>
            </cornie-input>
          </div>

          <div class="col-span-4">
            <cornie-input
              required
              class="w-full"
              label="Email Address"
              v-model="EmailAddress"
              :rules="emailRule"
              placeholder="--Enter--"
            />
          </div>
           <div class="col-span-4">
            <cornie-input
              required
              class="w-full"
              label="Address"
              v-model="address"
              placeholder="--Enter--"
            />
          </div>
          <div class="col-span-4">
            <cornie-input
              class="w-full"
              :rules="urlRule"
              label="Website"
              v-model="Website"
              placeholder="--Enter--"
            />
          </div>
          <div class="col-span-4">
            <phone-input
              required
              class="w-full"
              label="Phone Number"
              v-model:code="DialCode"
              v-model="PhoneNumber"
              placeholder="--Enter--"
              :rules="requiredRule"
            />
          </div>
        </div>

        <div class="my-8 flex items-center gap-x-4 justify-end">
          <cornie-btn class="border border-primary">
            Cancel Changes
          </cornie-btn>
          <cornie-btn :loading="loading" class="bg-danger text-white px-2">
            Save Changes
          </cornie-btn>
        </div>
      </v-form>
    </section>
  </main>
</template>

<script lang="ts">
import { cornieClient } from "@/plugins/http";
import Avatar from "@/components/avatar.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import { string } from "yup";
import AvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import ProviderInput from "@/components/provider-input.vue";
import SnomedInput from "@/components/snomed-input.vue";
import { IOrganization } from "@/types/IOrganization";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import CornieTooltip from "@/components/tooltip.vue";
import QuestionIcon from "@/components/icons/question.vue";
import DomainInput from "@/components/newdomaininput.vue";

const organization = namespace("organization");
@Options({
  name: "PracticeInformation",
  components: {
    Avatar,
    CornieInput,
    DomainInput,
    CornieSelect,
    ProviderInput,
    PhoneInput,
    AvatarField,
    SnomedInput,
    CornieTooltip,
    QuestionIcon,
  },
})
export default class PracticeInfo extends Vue {
  OrganizationName = "";
  alias = "";
  OrganizationType = "";
  ReferenceOrganization = "";
  RegistrationNumber = "";
  DialCode = "+234";
  PhoneNumber = "";
  DomainName = "";
  OrganizationIdentifier = "";
  ProviderProfile = "";
  IncorporationType = "";
  EmailAddress = " ";
  Website = "";
  address ="";
  // IncorporationStatus = "";

  orgTypes = [];
  provProfiles = [];
  incTypes = [];
  loading = false;
  defaultOrgInfo?: IOrganization;
  urlRule = string().url();
  emailRule = string().email().required();
  requiredRule = string().required();
  image = "";

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Mutation("setData")
  setOrganization!: (data: any) => void;

  @organization.Action
  fetchOrgInfo!: () => Promise<IOrganization>;

  get hasDomain() {
    return Boolean(this.organizationInfo?.domainName);
  }

  get payload() {
    return {
      name: this.OrganizationName,
      image: this.image,
      alias: this.alias,
      organisationType: this.OrganizationType,
      registrationNumber: this.RegistrationNumber,
      domainName: this.DomainName,
      providerProfile: this.ProviderProfile,
      incorporationType: this.IncorporationType,
      website: this.Website,
      phone: {
        number: this.PhoneNumber,
        DialCode: this.DialCode,
      },
      email: this.EmailAddress,
      reference: this.ReferenceOrganization,
      address: this.address
    };
  }

  async created() {
    try {
      const dropdown = this.fetchDropDown();
      const orgInfo = this.fetchOrgInfo();
      await Promise.all([dropdown, orgInfo]);
      this.defaultOrgInfo = this.organizationInfo;
      this.setOrgInfo(this.organizationInfo);
    } catch (error) {}
  }

  async submitForm() {
    this.loading = true;
    try {
      const organization = await cornieClient().post(
        "/api/v1/organization",
        this.payload
      );
      this.setOrganization(organization);
      window.notify({
        msg: "Practice information updated sucessfully",
        status: "success",
      });
    } catch (error) {
      window.notify({
        msg: "Practice information not updated",
        status: "error",
      });
    }
    this.loading = false;
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
    this.orgTypes = response[0].data;
    this.provProfiles = response[1].data;
    this.incTypes = response[2].data;
  }
  revertChanges() {
    if (this.defaultOrgInfo) this.setOrgInfo(this.defaultOrgInfo);
  }

  setOrgInfo(data: IOrganization) {
    this.OrganizationName = data.name || "";
    this.image = data.image || "";
    this.alias = data.alias || "";
    this.OrganizationType = data.organisationType || "";
    this.RegistrationNumber = data.registrationNumber || "";
    this.DomainName = data.domainName;
    this.OrganizationIdentifier = data.identifier || "";
    this.ProviderProfile = data.providerProfile || "";
    this.IncorporationType = data.incorporationType || "";
    this.Website = data.website || "";
    (this.PhoneNumber = data.phone.number),
      (this.DialCode = data.phone.dialCode);
    // this.IncorporationStatus = data.incorporationStatus || "";
    this.ReferenceOrganization = data.reference || "";
    this.address = data.address || "";
  }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
