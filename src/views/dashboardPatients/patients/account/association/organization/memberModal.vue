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
            <div class="flex w-full justify-start">
            <cornie-avatar-field v-model="img.url" />
            </div>
            <div class="w-full mt-4 grid grid-cols-3 gap-4">
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
                class="w-full"
                label="Blood Group"
                placeholder="Select One"
                :items="bloodGroupOptions"
                v-model="bloodGroup"
                :readonly="viewOnly"
            />
            <cornie-select
                label="Genotype"
                class="w-full"
                placeholder="Enter"
                v-model="genotype"
                :items="genotypeOptions"
                :readonly="viewOnly"
            />

            <cornie-select
                class="w-full"
                label="Gender"
                :rules="requiredRule"
                placeholder="Select One"
                :items="genderOptions"
                v-model="gender"
                :readonly="viewOnly"
            />

            <cornie-select
                class="w-full"
                placeholder="Select One"
                :items="['Single', 'Divorced', 'Widowed', 'Married']"
                v-model="maritalStatus"
                :rules="requiredRule"
                :readonly="viewOnly"
            >
                <template #labelicon>
                <cornie-tooltip>
                    <template #tooltip>
                    <span>Marital status</span>
                    </template>
                    <question-icon class="fill-current text-primary leading-none" />
                </cornie-tooltip>
                </template>
                <template #label> Marital status </template>
            </cornie-select>

            <div class="col-span-3">
                <div class="w-full flex space-x-9 flex-wrap items-center py-5">
                <div class="mb-1 font-bold">Do you have any child</div>
                <div class="mr-4 -mb-2">
                    <cornie-radio
                    :label="'Yes'"
                    :value="'yes'"
                    v-model="hasChild"
                    name="hasChild"
                    />
                </div>
                <div class="mr-4 -mb-2">
                    <cornie-radio
                    :label="'No'"
                    :value="'no'"
                    v-model="hasChild"
                    name="hasChild"
                    />
                </div>
                </div>
            </div>

            <cornie-input
                label="Number of Children"
                class="w-full"
                placeholder="Enter"
                v-model="numberOfChildren"
                :readonly="viewOnly"
            >
            </cornie-input>

            <cornie-select
                class="w-full"
                label="Multiple Birth?"
                placeholder="Select One"
                :items="multipleBirthOptions"
                v-model="multipleBirth"
                :readonly="viewOnly"
            />
            <cornie-input
                v-if="multipleBirth == 'yes'"
                class="w-full"
                placeholder="Enter"
                v-model.number="multipleBirthInteger"
                type="number"
                :rules="multipleBirthRule"
                :readonly="viewOnly"
                label="Number of Multiple Births"
            >
                <template #labelicon>
                <cornie-tooltip>
                    <template #tooltip>
                    <span>Number of multiple births</span>
                    </template>
                    <info-icon class="fill-current text-primary" />
                </cornie-tooltip>
                </template>
            </cornie-input>
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

  import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import DatePicker from "@/components/datepicker.vue";



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
    DatePicker
  },
})
export default class MemberModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

   img = setup(() => useHandleImage());
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
