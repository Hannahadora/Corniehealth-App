<template>
  <main class="p-6">
    <h3 class="text-primary text-xl font-bold border-b border-gray-300">
      Organization Information
    </h3>
    <section class="pb-4">
      <div class="image-upload flex mt-10 items-center">
        <avatar class="mr-2" v-if="img.url" :src="img.url" />
        <avatar class="mr-2" v-else :src="img.placeholder" />
        <br />
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          @change="img.onChange"
          hidden
        />
        <label for="file" class="text-pink-600 font-bold cursor-pointer">
          Upload Image
        </label>
      </div>

      <v-form @submit="submitForm">
        <div class="grid grid-cols-2 gap-x-5 gap-y-4 mt-10">
          <cornie-input
            label="Organization Name"
            class="w-full"
            v-model="OrganizationName"
            :rules="requiredRule"
          />
          <domain-input
            label="Domain Name"
            placeholder="--Enter--"
            :rules="requiredRule"
            v-model="DomainName"
          />
          <cornie-input label="Alias" class="w-full" v-model="alias" />
          <cornie-input
            label="Organization Identifier"
            disabled
            :modelValue="OrganizationIdentifier"
            class="w-full"
          />
          <cornie-select
            :items="orgTypes"
            label="Organization Type"
            class="w-full"
            v-model="OrganizationType"
            :rules="requiredRule"
          />
          <cornie-select
            :items="provProfiles"
            label="Provider Profile"
            class="w-full"
            v-model="ProviderProfile"
            :rules="requiredRule"
          />
          <cornie-input
            v-model="ReferenceOrganization"
            label="Reference Organization"
            class="w-full"
          />
          <cornie-select
            :items="['Ongoing', 'Completed']"
            label="Incorporation Status"
            class="w-full"
            v-model="IncorporationStatus"
            :rules="requiredRule"
          />
          <cornie-input
            v-model="RegistrationNumber"
            class="w-full"
            label="Registration Number"
            :rules="requiredRule"
          />
          <cornie-select
            :items="incTypes"
            class="w-full"
            label="Incorporation Type"
            :rules="requiredRule"
            v-model="IncorporationType"
          />
          <phone-input
            class="w-full mt-1"
            label="Phone Number"
            v-model:code="DialCode"
            v-model="PhoneNumber"
            :rules="requiredRule"
          />
          <cornie-input
            class="w-full"
            label="Email Address"
            v-model="EmailAddress"
            :rules="emailRule"
          />
          <cornie-input
            class="w-full"
            :rules="urlRule"
            label="Website"
            v-model="Website"
          />
        </div>

        <div class="my-8 flex justify-end">
          <span>
            <button
              @click="revertChanges"
              class="
                border border-primary
                mr-8
                rounded-3xl
                px-6
                py-2
                placeholder-gray-400
                focus:outline-none
                focus:shadow-outline-blue
                focus:border-blue-300
                transition
                duration-150
                ease-in-out
                sm:text-sm
                sm:leading-5
                cursor-pointer
              "
            >
              Revert Changes
            </button>
          </span>
          <span>
            <cornie-btn
              type="submit"
              :loading="loading"
              class="
                px-6
                py-2
                text-white
                appearance-none
                border-none
                bg-danger
                rounded-3xl
                placeholder-gray-400
                focus:outline-none
                focus:shadow-outline-blue
                focus:border-blue-300
                transition
                duration-150
                ease-in-out
                sm:text-sm
                sm:leading-5
                cursor-pointer
              "
            >
              Save Changes
            </cornie-btn>
          </span>
        </div>
      </v-form>
    </section>
  </main>
</template>

<script>
import { cornieClient } from "@/plugins/http";
import Avatar from "@/components/avatar.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import PhoneInput from "@/components/phone-input.vue";
import { reactive } from "@vue/reactivity";
import { string } from "yup";
import AvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import { mapActions, mapState } from "vuex";
import DomainInput from "@/components/domain-input.vue";

export default {
  name: "OrganizationInformation",
  components: {
    Avatar,
    CornieInput,
    CornieSelect,
    DomainInput,
    PhoneInput,
    AvatarField,
  },
  setup() {
    const { url, placeholder, onChange } = useHandleImage();
    return { img: reactive({ url, placeholder, onChange }) };
  },
  data() {
    return {
      OrganizationName: "",
      alias: "",
      OrganizationType: "",
      ReferenceOrganization: "",
      RegistrationNumber: "",
      DialCode: "+234",
      PhoneNumber: "",
      DomainName: "",
      OrganizationIdentifier: "System Generated",
      ProviderProfile: "",
      IncorporationType: "",
      EmailAddress: " ",
      Website: "",
      IncorporationStatus: "",

      orgTypes: [],
      provProfiles: [],
      incTypes: [],
      loading: false,
      OrgInfo: {},
      urlRule: string().url(),
      emailRule: string().email().required(),
      requiredRule: string().required(),
      image: "",
    };
  },
  computed: {
    ...mapState("organization", {
      organizationInfo: (state) => state.organizationInfo,
    }),
    payload() {
      return {
        name: this.OrganizationName,
        image: this.img.url,
        alias: this.alias,
        organisationType: this.OrganizationType,
        registrationNumber: this.RegistrationNumber,
        domainName: this.DomainName,
        providerProfile: this.ProviderProfile,
        incorporationType: this.IncorporationType,
        website: this.Website,
        incorporationStatus: this.IncorporationStatus,
        email: this.EmailAddress,
        reference: this.ReferenceOrganization,
      };
    },
  },
  async created() {
    try {
      const dropdown = this.fetchDropDown();
      const orgInfo = this.fetchOrgInfo();
      await Promise.all([dropdown, orgInfo]);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("organization", ["fetchOrgInfo"]),
    async submitForm() {
      this.loading = true;
      try {
        await cornieClient().post("/api/v1/organization", this.payload);
        window.notify({
          msg: "Organization updated Sucessfully",
          status: "success",
        });
      } catch (error) {
        window.notify({ msg: "Organization not updated", status: "error" });
      }
      this.loading = false;
    },
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
    },
    revertChanges() {
      this.setOrgInfo(this.orgInfo);
    },
    async fetchOrgInfo() {
      try {
        const response = await cornieClient().get(
          "/api/v1/organization/myOrg/get"
        );
        this.orgInfo = response.data || {};
        this.setOrgInfo(response.data);
      } catch (error) {
        window.notify({ msg: "Could not fetch organization", status: "error" });
      }
    },
    setOrgInfo(data) {
      this.OrganizationName = data.name || "";
      this.img.url = data.image || "";
      this.alias = data.alias || "";
      this.OrganizationType = data.organisationType || "";
      this.RegistrationNumber = data.registrationNumber || "";
      this.DomainName = data.domainName || "";
      this.OrganizationIdentifier = data.identifier || "";
      this.ProviderProfile = data.providerProfile || "";
      this.IncorporationType = data.incorporationType || "";
      this.Website = data.website || "";
      this.IncorporationStatus = data.incorporationStatus || "";
      this.ReferenceOrganization = data.reference || "";
    },
  },
};
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
