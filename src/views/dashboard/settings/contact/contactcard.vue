<template>
  <div
    class="text-black flex flex-row rounded-lg items-stretch cursor-pointer overflow-x-hidden justify-between shadow-card"
  >
    <span class="flex items-center py-4 px-2">
      <img class="h-11 w-11 rounded-full mr-1" :src="contact.image" />
      <div>
        <div class="font-semibold capitalize text-jet_black text-sm">
          {{ contact.fname }} {{ contact.lname }}
        </div>
        <div class="text-black italic text-xs font-medium">
          {{ contact.email }}
        </div>
        <div class="text-blue-yonder italic text-xxs font-medium">
          {{ contact.state }}, {{ contact.country }}
        </div>
      </div>
    </span>
    <div
      class="justify-center items-center flex rounded-r-lg bg-gray-300 opacity-0 hover:opacity-100 flex-grow px-5"
    >
      <edit-icon class="mr-6 text-primary" @click="editContact" />
      <delete-icon @click="removeContact" class="text-danger fill-current" />
    </div>
    <add-contact
      v-if="editingContact"
      v-model:visible="editingContact"
      :purpose="contact.purpose"
      :contact="contact"
      key="category"
    />
  </div>
</template>
<script>
import DeleteIcon from "@/components/icons/delete.vue";
import EditIcon from "@/components/icons/edit.vue";
import AddContact from "./addContact.vue";
import { cornieClient } from "@/plugins/http";
import { mapActions } from "vuex";

export default {
  name: "ContactCard",
  components: {
    DeleteIcon,
    EditIcon,
    AddContact,
  },
  props: {
    contact: Object,
  },
  data() {
    return {
      editingContact: false,
    };
  },
  methods: {
    ...mapActions("contact", ["deleteContact"]),
    editContact() {
      this.editingContact = true;
    },
    async removeContact() {
      const confirm = await window.confirmAction({
        message: `Are you sure you want to delete ${this.contact.fname}'s contact`,
      });
      if (!confirm) return;

      const res = await this.deleteContact(this.contact.id);
      if (res) notify({ msg: "Contact deleted", status: "success" });
    },
  },
};
</script>
