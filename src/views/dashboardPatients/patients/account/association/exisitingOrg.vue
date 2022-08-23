<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Existing Organisation
          </h2>
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form class="container" ref="form">
          <div class="w-full pb-2 mb-7 border-gray-300">
            <span class="text-dark text-sm font-medium">
              Search existing organization to join
            </span>
            <v-form class="grid grid-cols-1 gap-y-4" ref="form">
              <org-select v-model="organization" />
              <cornie-input
                label="Name"
                disabled
                readonly
                placeholder="--"
                :rules="requiredRule"
                :modelValue="organization.organizationName ?? ''"
              />

              <cornie-select
                :items="['Member', 'Employee']"
                label="Relationship"
                :rules="requiredRule"
                v-model="relationship"
              />
            </v-form>
          </div>
        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Join
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Ref } from "vue-property-decorator";
import search from "@/plugins/search";
import { string } from "yup";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import AccordionComponent from "@/components/dialog-accordion.vue";
import PhoneInput from "@/components/phone-input.vue";
import Avatar from "@/components/avatar.vue";
import CornieRadio from "@/components/cornieradio.vue";
import OrgSelect from "./organization/components/org-select.vue";
import { IPatientOrganization } from "./organization/types";
import { FormRef } from "@/types";

@Options({
  name: "ExisitingOrg",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    PhoneInput,
    CornieDialog,
    SearchIcon,
    AccordionComponent,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    Avatar,
    CornieRadio,
    OrgSelect,
  },
})
export default class ExistingOrg extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Ref("form")
  form!: FormRef;

  @Prop({ type: String, default: "" })
  id!: string;

  loading = false;

  organization = {} as IPatientOrganization;
  relationship = "";

  requiredRule = string().required();

  isValid() {
    return Boolean(this.organization?.id) && Boolean(this.relationship);
  }

  get payload() {
    return {
      organizationId: this.organization?.id,
      relationship: this.relationship,
    };
  }
  async submit() {
    if (!this.isValid()) return;

    this.loading = true;
    try {
      await cornieClient().post(
        "/api/v1/patient-portal/employer/join",
        this.payload
      );
      this.show = false;
      window.notify({ msg: "Joined organization", status: "success" });
    } catch (error) {
      window.notify({ msg: "Unable to join organization", status: "error" });
    }
    this.loading = false;
  }
}
</script>

<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
</style>
