<template>
  <div
    class="w-full flex p-3 shadow-card rounded-lg align-center justify-between"
  >
    <div class="flex w-3/5 border-r-2 items-center pr-12">
      <avatar class="h-20 w-20 mr-7" :src="image" />

      <span class="flex flex-col mr-10">
        <span class="text-blue-yonder text-xs font-bold uppercase block"
          >Name</span
        >
        <span class="text-sm capitalize text-blue-yonder-2"
          >{{ contact.fname }} {{ contact.lname }}</span
        >

        <span class="text-blue-yonder text-xs font-bold uppercase block mt-2">
          Email
        </span>
        <span class="text-sm text-blue-yonder-2">{{ contact.email }}</span>
      </span>

      <span class="flex flex-col">
        <span class="text-blue-yonder text-xs font-bold uppercase block"
          >Phone</span
        >
        <span class="text-sm text-blue-yonder-2">{{
          contact.phone || "Nill"
        }}</span>

        <span class="text-blue-yonder text-xs font-bold uppercase block mt-2">
          Address
        </span>
        <span class="text-sm text-blue-yonder-2"
          >{{ contact.state || "Nill" }}, {{ contact.country || "Nill" }}</span
        >
      </span>
    </div>

    <div class="flex justify-between items-center w-2/5 ml-8">
      <!-- Tranfer Ownership Comp -->
      <!-- <transfer-ownership /> -->
      <button
        class="bg-primary text-sm ml-6 font-bold rounded-full text-white py-2 px-8 my-auto focus:outline-none hover:opacity-90"
        @click="editingContact = true"
      >
        Edit My Contact
      </button>
    </div>

    <add-contact
      v-if="contact.id && editingContact"
      v-model:visible="editingContact"
      :purpose="contact.purpose"
      :contact="contact"
      key="admin"
    />
  </div>
</template>
<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import Avatar from "@/components/avatar.vue";
import { namespace } from "vuex-class";
import IContact from "@/types/IContact";
import AddContact from "./addContact.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import TransferOwnership from "./components/TransferOwnership.vue";

const contact = namespace("contact");

@Options({
  name: "AdminCard",
  components: {
    Avatar,
    AddContact,
    TransferOwnership,
  },
})
export default class AdminCard extends Vue {
  @contact.State
  contacts!: IContact[];

  editingContact = false;

  get contact() {
    const contact =
      this.contacts.find(
        (contact) => contact.purpose.toLowerCase() == "root"
      ) || ({} as IContact);
    return contact;
  }

  img = setup(() => useHandleImage());

  get image() {
    return this.contact.image || this.img.placeholder;
  }
}
</script>
