<template>
  <Clinical-dialog
    v-model="show"
    title="View Provider Profile"
    class="md:w-1/4 h-full w-full"
  >
    <div class="flex flex-col space-y-6">
      <div>
        <p class="font-bold text-lg">{{ profileDetails.name }}</p>
        <p class="text-sm font-light">Provider ID #: {{ profileDetails.id }}</p>
      </div>

      <div class="border p-3 flex flex-col space-y-2">
        <div class="flex">
          <div class="flex-1">Address</div>
          <div class="flex truncate">
            {{ profileDetails.contact.address }}
          </div>
        </div>
        <div class="flex">
          <div class="flex-1">Phone</div>
          <div class="flex-none">{{ profileDetails.contact.phone }}</div>
        </div>
        <div class="flex">
          <div class="flex-1">Email</div>
          <div class="flex-none">{{ profileDetails.contact.email }}</div>
        </div>
        <div class="flex">
          <div class="flex-1">Booking Site</div>
          <div class="flex-none">{{ profileDetails.contact.bookingSite }}</div>
        </div>
        <div class="flex">
          <div class="flex-1">Website</div>
          <div class="flex-none">{{ profileDetails.contact.website }}</div>
        </div>
      </div>
    </div>
  </Clinical-dialog>
</template>
<script lang="ts">
  import ClinicalDialog from "@/views/dashboard/ehr/conditions/clinical-dialog.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  @Options({
    components: {
      ClinicalDialog,
    },
  })
  export default class ProviderProfile extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String })
    id!: string;

    @Prop({ type: Object })
    profile!: any;

    profileDetails = {
      name: "Reddingthon Hospital",
      id: 253543,
      contact: {
        address: "No 16.Trenches avenue, Sapa Bustop",
        phone: "+234LMAO",
        email: "xyz@gmail.com",
        bookingSite: "xyz.corniehealth.com",
        website: "xyz.com",
      },
      specialities: [],
      doctors: 18,
    };

    mounted() {
      if (this.profile?.name) {
        this.profileDetails = this.profile;
      }
    }
  }
</script>
