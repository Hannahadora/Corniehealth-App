<template>
  <div class="h-screen flex justify-center">
    <div class="w-full mx-5">
      <span
        class="flex border-b-2 w-full font-bold text-xl text-primary py-2 mx-auto"
      >
        Account Owner
      </span>
      <admin-card class="my-4" />

      <contacts class="mt-2" />
    </div>
  </div>

  <add-contact
    v-if="editingContact"
    v-model:visible="editingContact"
    :purpose="contact.purpose"
    :contact="contact"
    key="category"
  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion.vue";
import AccordionItem from "@/components/accordion-component.vue";
import Addicon from "@/components/icons/add.vue";
import AdminCard from "./admincard.vue";
import Contacts from "./contacts.vue";
import { namespace } from "vuex-class";
import AddContact from "./addContact.vue";

const contact = namespace("contact");

@Options({
  components: {
    Accordion,
    AccordionItem,
    Addicon,
    AdminCard,
    Contacts,
    AddContact,
  },
})
export default class ContactInfo extends Vue {
  @contact.Action
  fetchContacts!: () => Promise<void>;

  async created() {
    await this.fetchContacts();
  }
}
</script>
<style scoped>
.settings {
  display: grid;
  grid-template-columns: 30% 70%;
}
</style>
