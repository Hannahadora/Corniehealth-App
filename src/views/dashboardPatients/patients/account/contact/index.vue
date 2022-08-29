<template>
  <div class="flex flex-col pt-10">
    <div class="w-full flex space-x-9 flex-wrap items-center py-5">
      <div class="mr-4 -mb-2">
        <cornie-radio
          :label="'Work'"
          :value="'work'"
          v-model="contactType"
          name="contactType"
        />
      </div>
      <div class="mr-4 -mb-2">
        <cornie-radio
          :label="'Home'"
          :value="'home'"
          v-model="contactType"
          name="contactType"
        />
      </div>
    </div>
    <div class="w-full mt-4 grid grid-cols-3 gap-5">
      <auto-complete
        class="w-full"
        v-model="nationality"
        label="Nationality"
        :items="nationState.countries"
        placeholder="Enter"
        :readonly="viewOnly"
      />
      <auto-complete
        class="w-full"
        v-model="state"
        label="State"
        :items="nationState.states"
        placeholder="Enter"
        :rules="requiredRule"
        :readonly="viewOnly"
      />
      <cornie-input
        class="w-full"
        label="City"
        placeholder="Enter"
        :rules="requiredRule"
        v-model="city"
        :readonly="viewOnly"
      />

      <cornie-input
        class="w-full"
        label="Post code"
        placeholder="Enter"
        v-model="postcode"
        :readonly="viewOnly"
      />

      <cornie-input
        class="w-full"
        label="Address"
        placeholder="Enter"
        v-model="address"
        :rules="requiredRule"
        :readonly="viewOnly"
      />

      <cornie-input
        class="w-full"
        label="Apartment"
        placeholder="Enter"
        v-model="apartment"
        :rules="requiredRule"
        :readonly="viewOnly"
      />

      <phone-input
        v-model="phone.number"
        v-model:code="phone.dialCode"
        :rules="requiredRule"
        :required="true"
        label="Phone Number"
        placeholder="--Enter--"
        :disabled="viewOnly"
      />
    </div>
    <div class="flex justify-end m-5" v-if="!viewOnly">
      <cornie-btn
        loading-color="white"
        type="button"
        @click="saveContact"
        class="bg-primary text-white px-6 py-1 rounded-md"
      >
        Save
      </cornie-btn>
    </div>
  </div>
</template>
<script lang="ts">
  import AutoComplete from "@/components/autocomplete.vue";
  import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import DatePicker from "@/components/datepicker.vue";
  import PhoneInput from "@/components/phone-input.vue";

  import { useCountryStates } from "@/composables/useCountryStates";
  import { useHandleImage } from "@/composables/useHandleImage";

  import { cornieClient } from "@/plugins/http";
  import { Options, setup, Vue } from "vue-class-component";

  import IPractitioner from "@/types/IPractitioner";
  import { CornieUser } from "@/types/user";
  import { namespace } from "vuex-class";
  import { string } from "yup";

  const account = namespace("user");

  @Options({
    name: "Account Profile",
    components: {
      CornieRadio,
      CornieInput,
      CornieAvatarField,
      CornieSelect,
      DatePicker,
      AutoComplete,
      PhoneInput,
    },
  })
  export default class AccountProfile extends Vue {
    img = setup(() => useHandleImage());
    requiredRule = string().required();
    contactType = "";
    nationality = "";
    state = "";
    city = "";
    postcode = "";
    address = "";
    apartment = "";
    email = "";
    nationState = setup(() => useCountryStates());
    emailRule = string().email().required();
    phone = {
      dialCode: "+234",
      number: "",
    };
    @account.Getter
    cornieUser!: CornieUser;

    @account.Mutation
    updatePractitioner!: (practitioners: IPractitioner[]) => void;

    @account.Getter
    authPractitioner!: IPractitioner;
    get userId() {
      return this.cornieUser?.id;
    }
    get viewOnly() {
      return this.$route.path.includes("view");
    }
    userContact: any = {};
    async fetchUserContact() {
      const details = cornieClient().get(
        `/api/v1/patient/getContact/${this.userId}`
      );
      const response = await Promise.all([details]);
      this.userContact = response[0].data;
      this.contactType = this.userContact.type;
      this.address = this.userContact.primaryAddress;
      this.postcode = this.userContact.postcode;
      this.city = this.userContact.city;
      this.nationality = this.userContact.country;
      this.state = this.userContact.state;
      this.phone = this.userContact.phone;
    }
    get payload() {
      return {
        type: this.contactType,
        patientId: this.cornieUser?.id,
        primaryAddress: this.address,
        secondaryAddress: undefined,
        postalCode: this.postcode || undefined,
        city: this.city,
        country: this.nationality,
        state: this.state,
        phone: {
          number: this.phone.number,
          dialCode: this.phone.dialCode,
        },
      };
    }
    validate() {
      return (
        !!this.contactType &&
        !!this.address &&
        !!this.city &&
        !!this.nationality &&
        !!this.state &&
        !!this.phone.number
      );
    }
    setDetails() {}
    async saveContact() {
      // console.log("payload,", this.payload, this.validate());
      if (!this.validate()) return;
      try {
        const details = cornieClient().put(
          `/api/v1/patient-portal/contact/${this.userId}`,
          this.payload
        );
        const response = await Promise.all([details]);
        const r = response[0].data;
        window.notify({
          msg: "Contact information updated successfully",
          status: "success",
        });
        await this.fetchUserContact();
      } catch (error) {
        window.notify({
          msg: "Error updating contact information",
          status: "error",
        });
      }
    }
    async mounted() {
      await this.updatePractitioner(this.authPractitioner as any);
      await this.fetchUserContact();
      console.log("contact", this.userContact);
      // this.setDetails(this.cornieUser);
    }
  }
</script>
