<template>
  <div class="w-full">
    <accordion>
      <accordion-item v-for="(contacts, key) in titles" :key="key">
        <template v-slot:title> {{ key }} </template>
        <template v-slot:misc>
          <add-icon class="cursor-pointer" @click="addNew(key)" />
        </template>
        <div class="w-full p-2 flex flex-wrap">
          <contact-card
            :contact="contact"
            v-for="contact in contacts"
            :key="contact.id"
            class="m-1"
          />
        </div>
      </accordion-item>
    </accordion>
    <add-contact v-model:visible="addContact" :purpose="purpose" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion.vue";
import AccordionItem from "@/components/accordion-component.vue";
import AddIcon from "@/components/icons/add.vue";
import ContactCard from "@/views/dashboard/settings/contact/contactcard.vue";
import AddContact from "./addContact.vue";
import { cornieClient } from "@/plugins/http";
import IContact from "@/types/IContact";

@Options({
  components: {
    Accordion,
    AddContact,
    AccordionItem,
    AddIcon,
    ContactCard,
  },
})
export default class Contacts extends Vue {
  addContact = false;

  contacts = [] as IContact[];
  purpose = "";
  getChildren(purpose: string) {
    return this.contacts.filter((contact) => contact.purpose == purpose);
  }
  get titles() {
    return {
      Billings: this.getChildren("Billings"),
      Administrative: this.getChildren("Administrative"),
      "Human Resource": this.getChildren("Human Resource"),
      Patient: this.getChildren("Patient"),
      Payer: this.getChildren("Payer"),
      Press: this.getChildren("Press"),
    };
  }

  addNew(purpose: string) {
    this.purpose = purpose;
    this.addContact = true;
  }
  async fetchContacts() {
    try {
      const response = await cornieClient().get(
        "/api/v1/contacts/myOrg/contacts"
      );
      this.contacts = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  created() {
    this.fetchContacts();
  }
}
</script>
