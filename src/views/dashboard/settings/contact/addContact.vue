<template>
  <div class="overflow-y-auto">
    <modal
      :visible="visible"
      class="mx-14 h-3/4 w-4/12 overflow-y-auto py-4 px-2"
    >
      <!-- <div
        class="flex bg-primary w-full h-3/4 overflow-y-auto rounded-t-lg p-2"
      >
        <span class="block pr-2 border-r-2">

        </span>
      </div> -->
      <div class="w-full p-3">
        <div class="flex items-center gap-2 mb-12">
          <arrow-left-icon
            class="stroke-current text-primary cursor-pointer"
            @click="show = false"
          />
          <div class="border h-5" />
          <h2 class="text-primary font-bold text-2xl">
            {{ isUpdate ? "Edit My Contact" : "Add Contact" }}
          </h2>
        </div>

        <span class="flex items-center mt-3 mb-12">
          <cornie-avatar-field v-model="image" />
        </span>
        <v-form @submit="submit">
          <div class="mt-2 grid grid-cols-2 p-1 gap-y-2 gap-3">
            <cornie-input
              :rules="requiredRule"
              label="First Name"
              v-model="fname"
            />
            <cornie-input
              :rules="requiredRule"
              label="Last Name"
              v-model="lname"
            />
            <cornie-input
              :rules="requiredRule"
              label="Purpose"
              :modelValue="purpose"
            />
            <cornie-select
              label="Gender"
              v-model="gender"
              :rules="requiredRule"
              :items="['Male', 'Female', 'Unspecified']"
            />
            <cornie-input
              :rules="requiredRule"
              label="Email Address"
              v-model="email"
            />
            <phone-input
              v-model:code="code"
              :rules="requiredRule"
              label="Phone Number"
              v-model="phone"
              class="w-full"
            />
            <cornie-select
              :rules="requiredRule"
              label="Country"
              v-model="nationState.country"
              :items="nationState.countries"
            />
            <cornie-select
              :rules="requiredRule"
              label="State"
              v-model="state"
              :items="nationState.states"
            />
            <cornie-input :rules="requiredRule" label="City" v-model="city" />
            <cornie-input
              :rules="requiredRule"
              label="Address"
              v-model="address"
            />
          </div>
          <div class="flex justify-end w-full mt-4 mb-3">
            <button
              class="rounded-full mt-5 py-1 px-4 border border-primary focus:outline-none font-bold hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
              @click="show = false"
            >
              Cancel
            </button>
            <cornie-btn
              :loading="loading"
              type="submit"
              class="bg-danger rounded-full text-white mt-5 py-1 px-4 font-bold focus:outline-none hover:opacity-90 w-1/3"
            >
              Save
            </cornie-btn>
          </div>
        </v-form>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import Modal from "@/components/modal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import IContact from "@/types/IContact";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { getStates } from "@/plugins/nation-states";
import { string } from "yup";
import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import { useCountryStates } from "@/composables/useCountryStates";

const contact = namespace("contact");

@Options({
  name: "AddContactInfo",
  components: {
    ArrowLeftIcon,
    Modal,
    CornieSelect,
    CornieInput,
    PhoneInput,
    CornieAvatarField,
  },
})
export default class AddContact extends Vue {
  @Prop({ type: Boolean, default: false })
  visible!: Boolean;

  @PropSync("visible")
  show!: Boolean;

  @Prop({ type: String, required: true })
  purpose!: string;

  @Prop({ type: Object, required: false, default: null })
  contact!: IContact;

  code = "+234";

  @contact.Mutation
  updateContacts!: (contacts: IContact[]) => void;

  loading = false;

  requiredRule = string().required();

  nationState = setup(() => useCountryStates());

  fname = "";
  lname = "";
  gender = "";
  email = "";
  phone = "";
  state = "";
  city = "";
  address = "";
  image = "";

  @Watch("image")
  imageChanged(val: string) {}

  @Watch("visible")
  unsetContacts(val: boolean) {
    if (val) return this.setContact();
    this.fname = "";
    this.lname = "";
    this.gender = "";
    this.email = "";
    this.phone = "";
    this.nationState.country = "";
    this.state = "";
    this.city = "";
    this.address = "";
    this.image = "";
  }

  setContact() {
    if (!this.contact) return;
    const contact = this.contact;
    this.fname = contact.fname;
    this.lname = contact.lname;
    this.gender = contact.gender;
    this.email = contact.email;
    this.phone = contact.phone;
    this.nationState.country = contact.country;
    this.state = contact.state;
    this.city = contact.city;
    this.address = contact.address;
    this.image = contact.image;
  }

  get isUpdate() {
    return Boolean(this.contact?.id);
  }

  get id() {
    return this.contact?.id;
  }

  async submit() {
    this.loading = true;
    this.isUpdate ? await this.update() : await this.create();
    this.loading = false;
  }

  async create() {
    try {
      const response = await cornieClient().post(
        "/api/v1/contacts",
        this.payload
      );
      if (response.success) this.updateContacts([response.data]);
      notify({ msg: "Contact Created", status: "success" });
    } catch (error) {
      notify({ msg: "Contact not Created", status: "error" });
    }
  }

  async update() {
    try {
      const response = await cornieClient().put(
        `/api/v1/contacts/${this.id}`,
        this.payload
      );
      if (response.success) this.updateContacts([response.data]);
      notify({ msg: "Contact Updated", status: "success" });
    } catch (error) {
      notify({ msg: "Contact not updated", status: "error" });
    }
  }
  get payload() {
    return {
      fname: this.fname,
      lname: this.lname,
      purpose: this.purpose,
      gender: this.gender,
      image: this.image,
      country: this.nationState.country,
      state: this.state,
      city: this.city,
      phone: this.phone,
      email: this.email,
      address: this.address,
    };
  }

  mounted() {
    this.setContact();
  }
}
</script>
