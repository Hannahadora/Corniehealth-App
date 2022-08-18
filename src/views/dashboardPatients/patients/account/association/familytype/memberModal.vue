<template>
  <cornie-dialog v-model="show" right class="w-6/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Add Member
          </h2>
          <!-- <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          /> -->
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
       <div class="flex flex-col py-2 px-4 border-2 border-gray-200 rounded shadow-sm">
        <div class="w-full mt-4 grid grid-cols-2 gap-4">
                <cornie-input
                    class="w-full"
                    label="First Name"
                    placeholder="Enter"
                    :rules="requiredRule"
                    v-model="firstName"
                    :readonly="viewOnly"
                />
                <cornie-input
                    class="w-full"
                    label="Middle Name"
                    placeholder="Enter"
                    v-model="middleName"
                    :readonly="viewOnly"
                />
                <cornie-input
                    class="w-full"
                    label="Last Name"
                    placeholder="Enter"
                    v-model="lastName"
                    :rules="requiredRule"
                    :readonly="viewOnly"
                />
                <date-picker
                    class="w-full"
                    label="Date of Birth"
                    placeholder="Enter"
                    :rules="dobRule"
                    v-model="dateOfBirth"
                    :readonly="viewOnly"
                />
                <cornie-select
                    label="Relationship"
                    class="w-full"
                    placeholder="Enter"
                    v-model="associationRelationship"
                    :items="['Spouse','Child','Parent','Relative','Other','Employee','Member']"
                    :readonly="viewOnly"
                />

                <cornie-input
                    :rules="emailRule"
                    v-model="email"
                    :required="true"
                    placeholder="Enter"
                    label="Email"
                />
                <phone-input
                    v-model="phone.number"
                    v-model:code="phone.dialCode"
                    :rules="requiredRule"
                    :required="true"
                    label="Phone Number"
                    placeholder="--Enter--"
                />
                <cornie-select
                    label="Member Role"
                    class="w-full"
                    placeholder="Enter"
                    v-model="memberRole"
                    :items="['Admin','User']"
                    :readonly="viewOnly"
                />

            </div>
          
        </div>
     
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
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import search from "@/plugins/search";
import { namespace } from "vuex-class";
import { createDate } from "@/plugins/utils";
import { string, date, number } from "yup";


import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import { useHandleImage } from "@/composables/useHandleImage";
import User, { CornieUser } from "@/types/user";

import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import CornieRadio from "@/components/cornieradio.vue";
import DatePicker from "@/components/datepicker.vue";
import InfoIcon from "@/components/icons/info-blue-bg.vue"
import PhoneInput from "@/components/phone-input.vue";

const account = namespace("user");

@Options({
  name: "MemberModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    IconInput,
    CornieInput,
    CornieSelect,
    CornieBtn,
    CornieRadio,
    CornieAvatarField,
    DatePicker,
    InfoIcon,
    PhoneInput
  },
})
export default class MemberModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @account.Getter
  cornieUser!: CornieUser;

  loading = false;

    img = "";
    requiredRule = string().required();
    firstName = "";
    middleName = "";
    lastName = "";
    bloodGroup = "";
    dateOfBirth = "";
    genotype = "";
    gender = "";
    maritalStatus = "";
    hasChild = "";
    numberOfChildren = "";
    multipleBirth = "";
    multipleBirthInteger = 0;
    multipleBirthRule = number().min(0).max(10);
    belongsToPractice = true;
    organizationId = "";
    associationRelationship = "";
    associationType = "Family";
    emailRule = string().email().required();
    email = "";
    memberRole = "";

    dobRule = date().max(
      new Date(),
      `Date must be on or before ${new Date().toLocaleDateString("en-NG")}`
    );
    bloodGroupOptions = [
      "A+",
      "A-",
      "B+",
      "B-",
      "O+",
      "O-",
      "AB+",
      "AB-",
      "NOT SURE",
    ];

     phone = {
     dialCode: "+234",
      number: "",
    };

    genotypeOptions = ["AA", "AS", "AC", "SS", "SC", "NOT SURE"];
    genderOptions = [
      { code: "male", display: "Male" },
      { code: "female", display: "Female" },
      { code: "other", display: "Other" },
    ];
    multipleBirthOptions = [
      { code: "yes", display: "Yes" },
      { code: "no", display: "No" },
    ];
    get viewOnly() {
      return this.$route.path.includes("view");
    }

    get payload() {
        return {
        firstname: this.firstName,
        middleName: this.middleName,
        lastname: this.lastName,
        dateOfBirth: this.dateOfBirth,
        email: this.email,
        phone: this.phone,
        multipleBirthInteger: this.multipleBirthInteger,
        associationRelationship: this.associationRelationship,
        associationType: this.associationType,
        patientOrganizationId: this.cornieUser.organizationId,
        memberRole: this.memberRole,

        };
    }

    async submit() {
        this.loading = true;
        if (this.id) await this.updatePatientAssociation();
        else await this.createPatientAssociation();
        this.loading = false;
    }


 async createPatientAssociation() {
    // const { valid } = await (this.$refs.form as any).validate();
    // if (!valid) return;
    console.log(this.payload)
    try {
      const { data } = await cornieClient().post("/api/v1/patient-portal/association/create-patient-with-association",this.payload);
      window.notify({ msg: "Member Added" , status: "success" });
      this.done();
      //this.reset();
    } catch (error:any) {
      window.notify({ msg: "Member Not Added", status: "error" });
    }
  }

  async updatePatientAssociation() {
    const { valid } = await (this.$refs.form as any).validate();
    if (!valid) return;

    const id = this.id;
    const url = `/api/v1/allergy/${id}`;
    const payload = this.payload;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Allergy Updated",
          status: "success",
        });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: "Allergy Not Updated", status: "error" });
    }
  }

   done() {
    this.$emit("allergy-added");
    this.show = false;
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
