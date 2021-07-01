<template>
  <div class="mt-2 mb-5 rounded-lg settings bg-white w-full h-full">
    <div class="w-full h-full p-3 border-r-2">
      <settings-sidebar></settings-sidebar>
    </div>
    <div class="p-3 w-full h-full">
      <div class="py-8 flex flex-col px-5">
        <div
          class="text-primary font-bold text-xl border-b-2 border-gray-100 py-4"
        >
          Contact Information (Root Admin)
        </div>
        <div class="rounded flex flex-row justify-center">
          <div
            class="
              flex flex-row
              border
              justify-evenly
              border-primary
              rounded-xl
              space-x-4
              p-7
            "
          >
            <div class="img">
              <img
                src="https://avatars.githubusercontent.com/u/66243665?v=4"
                alt="My image"
                class="rounded-full w-10 h-10"
              />
            </div>
            <div class="font-base">
              <div class="uppercase font-semibold text-primary">NAME</div>
              <div class="text-black text-sm">{{ name }}</div>
              <div class="uppercase text-primary font-semibold">EMAIL</div>
              <div class="text-black text-sm">roland.ziek007@evercare.com</div>
            </div>

            <div class="">
              <div class="font-semibold text-base uppercase text-primary">
                PHONE
              </div>
              <div class="text-black text-sm">(234)90000000</div>
              <div class="font-semibold text-primary text-base uppercase">
                ADDRESS
              </div>
              <div class="text-black text-sm">
                12 Crescent road, Ikeja, Lagos
              </div>
            </div>

            <div class="border-l px-5 items-center">
              <button
              @click="addForm = !addForm"
                class="
                  bg-pink-500
                  hover:bg-pink-700
                  text-white
                  font-bold
                  py-2
                  px-10
                  rounded-full
                  items-center
                "
              >
                Edit My Contact
              </button>
            </div>
          </div>
        </div>
        <div class="text-black py-5 font-semibold text-lg">Other Contacts</div>
        <div class="text-black">
          <accordion :count="6">
            <template v-slot:item-1>
              <accordion-item>
                <template v-slot:title> Billings </template>
                <template v-slot:content>
                  <div class="flex flex-row"></div>
                </template>
                <template v-slot:misc>
                  <add-icon  />
                </template>
              </accordion-item>
            </template>
            <template v-slot:item-2>
              <accordion-item>
                <template v-slot:title> Administrative </template>
                <template v-slot:content> Hello </template>
                <template v-slot:misc>
                  <add-icon />
                </template>
              </accordion-item> </template
            ><template v-slot:item-3>
              <accordion-item>
                <template v-slot:title> Human Resource </template>
                <template v-slot:content> Hello </template>
                <template v-slot:misc>
                  <add-icon />
                </template>
              </accordion-item> </template
            ><template v-slot:item-4>
              <accordion-item>
                <template v-slot:title> Patient </template>
                <template v-slot:content> Hello </template>
                <template v-slot:misc>
                  <add-icon />
                </template>
              </accordion-item>
            </template>
            <template v-slot:item-5>
              <accordion-item>
                <template v-slot:title> Payor </template>
                <template v-slot:content> Hello </template>
                <template v-slot:misc>
                  <add-icon />
                </template>
              </accordion-item>
            </template>
            <template v-slot:item-6>
              <accordion-item>
                <template v-slot:title> Press </template>
                <template v-slot:content> Hello </template>
                <template v-slot:misc>
                  <add-icon />
                </template>
              </accordion-item> </template
          ></accordion>
        </div>
      </div>
    </div>
    <addContact v-model:visible="AddForm" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Accordion from "@/components/accordion.vue";
import AccordionItem from "@/components/accordion-component.vue";
import SettingsSidebar from "../settings/SettingsSidebar.vue";
import Addicon from "@/components/icons/add.vue";
// import AddContact from "./addcontact.vue"
@Options({
  components: {
    Accordion,
    AccordionItem,
    SettingsSidebar,
    Addicon,
    // AddContact,
  },
})
export default class ContactInfo extends Vue {}
</script>
<style scoped>
.settings {
  display: grid;
  grid-template-columns: 30% 70%;
}
</style>
