<template>
  <main class="p-6">
    <h3 class="text-primary text-xl font-bold border-b border-gray-300">
      Organization Information
    </h3>
    <section>
      <div class="image-upload flex mt-10 items-center">
        <avatar class="mr-2" :src="displayImg" />
        <br />
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          @change="onFileChanged"
          hidden
        />
        <label for="file" class="text-pink-600 font-bold cursor-pointer">
          Upload Image</label
        >
      </div>
      <form @submit.prevent="submitForm">
        <div class="main-box mt-10">
          <div class="w-full h-full">
            <div>
              <label
                for="OrganizationName"
                class="font-bold text-base uppercase mb-4"
              >
                Organization Name
              </label>
              <br />
              <orgInput
                id="OrganizationName"
                placeholder="Enter"
                v-model="OrganizationName"
              />
            </div>

            <div>
              <label for="Alias" class="font-bold text-base uppercase mb-4">
                Alias
              </label>
              <br />
              <orgInput id="Alias" placeholder="Enter" v-model="alias" />
            </div>

            <div>
              <label
                for="OrganizationType"
                class="font-bold text-base uppercase mb-4"
              >
                Organization Type
              </label>
              <br />
              <orgSelect
                name="select"
                id="OrganizationType"
                v-model="OrganizationType"
              >
                <option
                  v-for="(orgType, i) in orgTypes"
                  :key="i"
                  :value="orgType.code"
                >
                  {{ orgType.display }}
                </option>
              </orgSelect>
            </div>

            <div>
              <label
                for="ReferenceOrganization"
                class="font-bold text-base uppercase mb-4"
              >
                Reference organization
              </label>
              <br />
              <orgInput
                id="ReferenceOrganization"
                placeholder="Enter"
                v-model="ReferenceOrganization"
              />
            </div>

            <div>
              <label
                for="RegistrationNumber"
                class="font-bold text-base uppercase mb-4"
              >
                Registration Number
              </label>
              <br />
              <orgInput
                id="RegistrationNumber"
                type="Number"
                placeholder="Enter "
                v-model="RegistrationNumber"
              />
            </div>

            <div>
              <label
                for="PhoneNumber"
                class="font-bold text-base uppercase mb-4"
              >
                Phone Number
              </label>
              <br />
              <div id="PhoneNumber" class="flex">
                <select
                  class="
                    border border-gray-300
                    my-4
                    px-3
                    py-2
                    rounded-l-md
                    placeholder-gray-400
                    focus:outline-none
                    focus:shadow-outline-blue
                    focus:border-blue-300
                    transition
                    duration-150
                    ease-in-out
                    sm:text-sm
                    sm:leading-5
                  "
                >
                  <option value="1">Nig</option>
                  <option value="1">Nig</option>
                  <option value="1">Nig</option>
                </select>
                <input
                  placeholder="(+234) --"
                  class="
                    rounded-r-md
                    appearance-none
                    w-full
                    my-4
                    px-3
                    py-2
                    border border-gray-300
                    placeholder-gray-400
                    focus:outline-none
                    focus:shadow-outline-blue
                    focus:border-blue-300
                    transition
                    duration-150
                    ease-in-out
                    sm:text-sm
                    sm:leading-5
                  "
                  type="number"
                  v-model="PhoneNumber"
                />
              </div>
            </div>
          </div>

          <div class="w-full h-full">
            <div>
              <label
                for="DomainName"
                class="font-bold text-base uppercase mb-4"
              >
                Domain Name
              </label>
              <br />
              <div id="DomainName" class="flex">
                <input
                  class="
                    appearance-none
                    w-1/2
                    border border-gray-300
                    bg-gray-500
                    my-4
                    px-3
                    py-2
                    rounded-l-md
                    placeholder-white
                    focus:outline-none
                    focus:shadow-outline-blue
                    focus:border-blue-300
                    transition
                    duration-150
                    ease-in-out
                    sm:text-sm
                    sm:leading-5
                  "
                  disabled
                  placeholder="https://corniehealth.com/"
                />
                <input
                  placeholder="Domain--"
                  class="
                    rounded-r-md
                    appearance-none
                    w-1/2
                    my-4
                    px-3
                    py-2
                    border border-gray-300
                    placeholder-gray-400
                    focus:outline-none
                    focus:shadow-outline-blue
                    focus:border-blue-300
                    transition
                    duration-150
                    ease-in-out
                    sm:text-sm
                    sm:leading-5
                  "
                  v-model="DomainName"
                />
              </div>
            </div>

            <div>
              <label
                for="OrganizationIdentifier"
                class="font-bold text-base uppercase mb-4"
              >
                Organization Identifier
              </label>
              <br />
              <orgInput
                id="OrganizationIdentifier"
                placeholder="Enter "
                v-model="OrganizationIdentifier"
              />
            </div>

            <div>
              <label
                for="ProviderProfile"
                class="font-bold text-base uppercase mb-4"
              >
                Provider Profile
              </label>
              <br />
              <orgSelect
                name="select"
                id="ProviderProfile"
                v-model="ProviderProfile"
              >
                <option
                  v-for="(prov, i) in provProfiles"
                  :key="i"
                  :value="prov"
                >
                  {{ prov }}
                </option>
              </orgSelect>
            </div>

            <div>
              <label
                for="IncorporationType"
                class="font-bold text-base uppercase mb-4"
              >
                Incorporation Type
              </label>
              <br />
              <orgSelect
                name="select"
                id="IncorporationType"
                v-model="IncorporationType"
              >
                <option
                  v-for="(incType, i) in incTypes"
                  :key="i"
                  :value="incType"
                >
                  {{ incType }}
                </option>
              </orgSelect>
            </div>

            <div>
              <label
                for="EmailAddress"
                class="font-bold text-base uppercase mb-4"
              >
                Email Address
              </label>
              <br />
              <orgInput
                id="Email Address"
                type="email"
                placeholder="Enter"
                v-model="EmailAddress"
              />
            </div>

            <div>
              <label for="Website" class="font-bold text-base uppercase mb-4">
                Website
              </label>
              <br />
              <orgInput id="Website" placeholder="Enter" v-model="Website" />
            </div>
          </div>
        </div>

        <div class="my-8 flex justify-end">
          <span>
            <button
              class="
                border border-blue-800
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
            <button
              type="submit"
              class="
                px-6
                py-2
                text-white
                appearance-none
                border-none
                bg-pink-600
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
            </button>
          </span>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { cornieClient } from "@/plugins/http";
import Avatar from "@/components/avatar.vue";
import OrgInput from "@/components/orgInput.vue";
import OrgSelect from "@/components/orgSelect.vue";

export default {
  name: "OrganizationInformation",
  components: {
    Avatar,
    OrgInput,
    OrgSelect,
  },
  data() {
    return {
      displayImg: require("@/assets/img/placeholder.png"),
      OrganizationName: "",
      alias: "",
      OrganizationType: "",
      ReferenceOrganization: "",
      RegistrationNumber: "",
      PhoneNumber: "",
      DomainName: "",
      OrganizationIdentifier: "",
      ProviderProfile: "",
      IncorporationType: "",
      EmailAddress: " ",
      Website: "",

      orgTypes: [],
      provProfiles: [],
      incTypes: [],
    };
  },
  computed: {
    payload() {
      return {
        name: this.OrganizationName,
        image: this.displayImg,
        alias: this.alias,
        organizationType: this.OrganizationType,
        registrationNumber: this.RegistrationNumber,
        domainName: this.DomainName,
        identifier: this.OrganizationIdentifier,
        providerProfile: this.ProviderProfile,
        incorporationType: this.IncorporationType,
        website: this.Website,
      };
    },
  },
  async created() {
    try {
      await this.fetchDropDown();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    onFileChanged(event) {
      const imageFile = event.target.files[0];
      this.uploadImage(imageFile);
    },
    async uploadImage(img) {
      const form = new FormData();
      form.set("file", img);
      try {
        const response = await fetch(
          "http://18.135.196.19:5001/document-management/upload/corniehealth",
          {
            method: "POST",
            body: form,
          }
        );
        if (!response.ok) return alert("File upload failed");
        const data = await response.json();
        this.displayImg = data.fileUrl;
      } catch (error) {
        console.log("Upload failed");
        alert("File not uploaded");
      }
    },
    async submitForm() {
      try {
        await cornieClient().post("/api/v1/organization", this.payload);
        alert("Organization updated Sucessfully");
      } catch (error) {
        console.log(error);
      }
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
  },
};
</script>

<style scoped>
.main-box {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem;
}

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
