<template>
  <div class="grid grid-cols-1 gap-y-2 text-sm" v-if="patient?.id">
    <h2 class="text-primary text-sm font-bold capitalize">{{ title }}</h2>
    <avatar :src="avatar" class="h-24 w-24" />
    <h3 class="text-primary text-sm font-semibold">{{ name }}</h3>
    <span class="text-gray-500">{{ mrn }}</span>
    <span class="text-xs">
      {{ address }}
    </span>
    <span class="text-xs">{{ phone }}</span>
    <span class="text-xs">{{ email }}</span>
  </div>
</template>
<script lang="ts">
import { IPatient } from "@/types/IPatient";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Avatar from "@/components/avatar.vue";

const patients = namespace("patients");
@Options({
  name: "PatientCard",
  components: {
    Avatar,
  },
})
export default class PatientCard extends Vue {
  @Prop({ type: String, default: "Patient Infomation" })
  title!: string;

  @Prop({ type: String })
  id!: string;

  @patients.Action
  findPatient!: (id: string) => Promise<IPatient>;

  patient = {} as IPatient;

  get name() {
    return `${this.patient?.firstname} ${this.patient?.lastname}`;
  }

  get mrn() {
    return this.patient?.mrn;
  }

  get mainContact() {
    const contacts = this.patient.contactInfo || [];
    return contacts[0];
  }

  get address() {
    return this.mainContact?.primaryAddress;
  }

  get phone() {
    const phone = this.mainContact?.phone?.number;
    return phone;
  }

  get email() {
    return this.mainContact?.email;
  }

  get avatar() {
    return this.patient?.profilePhoto;
  }

  async created() {
    if (!this.id) return;
    const patient = await this.findPatient(this.id);
    this.patient = patient || {};
  }
}
</script>
