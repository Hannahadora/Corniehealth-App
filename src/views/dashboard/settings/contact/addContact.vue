<template>
  <cornie-dialog
    v-model="visible"
    right
    class="w-5/12 h-full animated fadeIn z-50 absolute overflow-y-none"
  >
    <cornie-card height="100%" class="flex flex-col animated fadeInUp">
      <cornie-card-title class="w-full p-3">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ isUpdate ? "Edit Contact" : "Add Contact" }}
          </h2>
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col h-full w-full overflow-auto max-h-full">
          <span class="flex items-center mt-2 mb-4">
            <cornie-avatar-field v-model="image" />
          </span>
          <v-form @submit="submit">
            <div class="mt-2 grid grid-cols-12 p-1 gap-y-2 gap-2">
              <div class="col-span-6">
                <cornie-input
                  :rules="requiredRule"
                  label="First Name"
                  v-model="fname"
                />
              </div>
              <div class="col-span-6">
                <cornie-input
                  :rules="requiredRule"
                  label="Last Name"
                  v-model="lname"
                />
              </div>
              <div class="col-span-6">
                <cornie-input
                  :rules="requiredRule"
                  label="Purpose"
                  :modelValue="purpose"
                />
              </div>
              <div class="col-span-6">
                <cornie-select
                  label="Gender"
                  v-model="gender"
                  :rules="requiredRule"
                  :items="['Male', 'Female', 'Unspecified']"
                />
              </div>
              <div class="col-span-6">
                <cornie-input
                  :rules="requiredRule"
                  label="Email Address"
                  v-model="email"
                />
              </div>
              <div class="col-span-6">
                <phone-input
                  v-model:code="code"
                  :rules="requiredRule"
                  label="Phone Number"
                  v-model="phone"
                  class="w-full"
                />
              </div>
              <div class="col-span-6">
                <cornie-select
                  :rules="requiredRule"
                  label="Country"
                  v-model="nationState.country"
                  :items="nationState.countries"
                />
              </div>
              <div class="col-span-6">
                <cornie-select
                  :rules="requiredRule"
                  label="State"
                  v-model="state"
                  :items="nationState.states"
                />
              </div>
              <div class="col-span-6">
                <cornie-input
                  :rules="requiredRule"
                  label="City"
                  v-model="city"
                />
              </div>
              <div class="col-span-6">
                <cornie-input
                  :rules="requiredRule"
                  label="Address"
                  v-model="address"
                />
              </div>
            </div>
            <div class="flex justify-end w-full mt-4 mb-3">
              <button
                class="rounded-xl mt-5 py-0.5 px-6 border border-primary focus:outline-none hover:opacity-90 mr-2 text-primary font-semibold"
                @click="show = false"
              >
                Cancel
              </button>
              <cornie-btn
                :loading="loading"
                type="submit"
                class="bg-danger rounded-xl text-white mt-5 mr-2 py-0.5 px-3 font-bold focus:outline-none hover:opacity-90"
              >
                Save
              </cornie-btn>
            </div>
          </v-form>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
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
    ...CornieCard,
    ArrowLeftIcon,
    CornieDialog,
    CornieSelect,
    CornieInput,
    PhoneInput,
    CornieAvatarField,
    CornieIconBtn,
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
    this.show = false;
  }

  async create() {
    try {
      const response = await cornieClient().post(
        "/api/v1/contacts",
        this.payload
      );
      if (response.success) {
        this.updateContacts([response.data]);
        notify({ msg: "Contact Created", status: "success" });
        this.show = false;
      }
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
      if (response.success) {
        this.updateContacts([response.data]);
        notify({ msg: "Contact Updated", status: "success" });
        this.show = false;
      }
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
