<template>
  <div class="w-full flex p-3 border rounded-lg align-center justify-between">
    <div class="flex w-3/4 border-r-2 justify-between pr-12">
      <avatar class="h-14 w-14 my-auto" :src="image" />

      <span class="flex flex-col">
        <span class="text-blue-500 text-sm font-semibold uppercase block"
          >Name</span
        >
        <span class="text-sm capitalize"
          >{{ contact.fname }} {{ contact.lname }}</span
        >

        <span class="text-blue-500 text-sm font-semibold uppercase block mt-2">
          Email
        </span>
        <span class="text-sm">{{ contact.email }}</span>
      </span>
      <span class="flex flex-col">
        <span class="text-blue-500 text-sm font-semibold uppercase block"
          >Phone</span
        >
        <span class="text-sm">{{ contact.phone }}</span>

        <span class="text-blue-500 text-sm font-semibold uppercase block mt-2">
          Address
        </span>
        <span class="text-sm">{{ contact.state }}, {{ contact.country }}</span>
      </span>
    </div>
    <button
      class="
        bg-danger
        rounded-full
        text-white
        py-2
        px-3
        my-auto
        focus:outline-none
        hover:opacity-90
      "
      @click="editingContact = true"
    >
      Edit My Info
    </button>

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

const contact = namespace("contact");

@Options({
  name: "AdminCard",
  components: {
    Avatar,
    AddContact,
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
