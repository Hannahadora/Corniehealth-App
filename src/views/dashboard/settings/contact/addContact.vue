<template>
  <div class="overflow-y-auto">
    <modal :visible="visible" class="mx-14 h-3/4 w-4/12 p-0 overflow-y-auto">
      <div
        class="flex bg-primary w-full h-3/4 overflow-y-auto rounded-t-lg p-2"
      >
        <span class="block pr-2 border-r-2">
          <arrow-left-icon
            class="stroke-current text-white cursor-pointer"
            @click="show = false"
          />
        </span>
      </div>
      <div class="w-full p-3">
        <h2 class="text-primary font-bold text-xl" v-if="isUpdate">
          Update Contact
        </h2>
        <h2 class="text-primary font-bold text-xl" v-else>Add Contact</h2>
        <small class="block" v-if="isUpdate">update contact...</small>
        <small class="block" v-else>Add a new contact...</small>
        <span class="flex items-center mt-3">
          <avatar class="mr-2" v-if="img.url" :src="img.url" />
          <avatar class="mr-2" v-else :src="img.placeholder" />
          <input
            type="file"
            accept="image/*"
            name="image"
            id="file"
            @change="img.onChange"
            hidden
          />
          <label for="file" class="text-pink-600 font-bold cursor-pointer">
            Upload
          </label>
        </span>
        <form @submit.prevent="submit">
          <div class="mt-2 grid grid-cols-2 p-1 gap-y-2">
            <cornie-input label="First Name" v-model="fname" />
            <cornie-input label="Last Name" v-model="lname" />
            <cornie-input label="Purpose" :modelValue="purpose" />
            <cornie-select
              label="Gender"
              v-model="gender"
              :items="['Male', 'Female', 'Unspecified']"
            />
            <cornie-input label="Email Address" v-model="email" />
            <phone-input label="Phone Number" v-model="phone" />
            <cornie-select
              label="Country"
              v-model="country"
              :items="['Nigeria']"
            />
            <cornie-select label="State" v-model="state" :items="['ABia']" />
            <cornie-input label="City" v-model="city" />
            <cornie-input label="Address" v-model="address" />
          </div>
          <div class="flex justify-end w-full mt-4 mb-3">
            <button
              class="
                rounded-full
                mt-5
                py-2
                px-3
                border border-primary
                focus:outline-none
                hover:opacity-90
                w-1/3
                mr-2
                text-primary
                font-semibold
              "
              @click="show = false"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="
                bg-danger
                rounded-full
                text-white
                mt-5
                py-2
                px-3
                focus:outline-none
                hover:opacity-90
                w-1/3
              "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import Modal from "@/components/modal.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import Avatar from "@/components/avatar.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import IContact from "@/types/IContact";
import { cornieClient } from "@/plugins/http";

@Options({
  components: {
    ArrowLeftIcon,
    Modal,
    Avatar,
    CornieSelect,
    CornieInput,
    PhoneInput,
  },
})
export default class AddContact extends Vue {
  img = setup(() => useHandleImage());
  @Prop({ type: Boolean, default: false })
  visible!: Boolean;

  @PropSync("visible")
  show!: Boolean;

  @Prop({ type: String, required: true })
  purpose!: string;

  @Prop({ type: Object, required: false, default: null })
  contact!: IContact;

  fname = "";
  lname = "";
  gender = "";
  email = "";
  phone = "";
  country = "";
  state = "";
  city = "";
  address = "";

  @Watch("visible")
  unsetContacts(val: boolean) {
    if (val) return;
    this.fname = "";
    this.lname = "";
    this.gender = "";
    this.email = "";
    this.phone = "";
    this.country = "";
    this.state = "";
    this.city = "";
    this.address = "";
    this.img.url = "";
  }
  setContact() {
    if (!this.contact) return;
    const contact = this.contact;
    this.fname = contact.fname;
    this.lname = contact.lname;
    this.gender = contact.gender;
    this.email = contact.email;
    this.phone = contact.phone;
    this.country = contact.country;
    this.state = contact.state;
    this.city = contact.city;
    this.address = contact.address;
    this.img.url = contact.image;
  }

  @Watch("contact")
  contactChanged() {
    this.setContact();
  }

  get isUpdate() {
    return Boolean(this.contact?.id);
  }

  async submit() {
    this.createContact();
  }
  get payload() {
    return {
      fname: this.fname,
      lname: this.lname,
      purpose: this.purpose,
      gender: this.gender,
      image: this.img.url,
      country: this.country,
      state: this.state,
      city: this.city,
      phone: this.phone,
      email: this.email,
      address: this.address,
    };
  }
  async createContact() {
    try {
      const response = await cornieClient().post(
        "/api/v1/contacts",
        this.payload
      );
      console.log(response);
      alert("Contact Created");
    } catch (error) {
      console.log(error);
    }
  }

  mounted() {
    this.setContact();
  }
}
</script>
