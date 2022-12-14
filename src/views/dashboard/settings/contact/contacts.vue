<template>
  <div class="w-full">
    <accordion>
      <accordion-item
        :title="key"
        :first="i == 0"
        v-for="(contacts, key, i) in titles"
        :key="key"
      >
        <div class="w-full border p-5 pb-2 flex flex-col">
          <button
            class="bg-danger text-sm font-bold rounded-full text-white py-2 px-10 my-auto focus:outline-none hover:opacity-90 ml-auto"
            @click="addNew(key)"
          >
            Add Contact
          </button>
          <div class="w-full flex">
            <contact-card
              :contact="contact"
              v-for="contact in contacts"
              :key="contact.id"
              class="m-1"
            />
          </div>
        </div>
      </accordion-item>
    </accordion>
    <add-contact
      v-model:visible="addContact"
      key="contacts"
      :purpose="purpose"
      v-if="addContact"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion.vue";
import AccordionItem from "@/components/accordion-component.vue";
import AddIcon from "@/components/icons/add.vue";
import ContactCard from "@/views/dashboard/settings/contact/contactcard.vue";
import AddContact from "./addContact.vue";
import IContact from "@/types/IContact";
import { namespace } from "vuex-class";

const contact = namespace("contact");

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

  @contact.State
  contacts!: IContact[];

  @contact.Action
  fetchContacts!: () => Promise<void>;

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

  created() {
    this.fetchContacts();
  }
}
</script>
