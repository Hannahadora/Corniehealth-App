<template>
  <div
    class="
      shadow-xl
      text-black
      flex flex-row
      rounded-lg
      items-stretch
      cursor-pointer
      overflow-x-hidden
      justify-between
      border
    "
  >
    <span class="flex items-center p-2">
      <img class="h-10 w-10 rounded-full mr-1" :src="contact.image" />
      <div class="text-black">
        <div class="font-semibold capitalize">
          {{ contact.fname }} {{ contact.lname }}
        </div>
        <div class="text-black italic text-sm font-semibold">
          {{ contact.email }}
        </div>
        <div class="text-blue-900 italic text-xs font-semibold">
          {{ contact.state }}, {{ contact.country }}
        </div>
      </div>
    </span>
    <div
      class="
        justify-center
        items-center
        flex
        rounded-r-lg
        bg-gray-300
        opacity-0
        hover:opacity-100
        flex-grow
        px-3
      "
    >
      <edit-icon class="mr-3" @click="editContact" />
      <delete-icon @click="removeContact" class="text-danger fill-current" />
    </div>
    <add-contact
      v-model:visible="editingContact"
      :purpose="contact.purpose"
      :contact="contact"
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
