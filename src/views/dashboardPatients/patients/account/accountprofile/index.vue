<template>
  <div class="flex flex-col pt-10">
    <div class="flex w-full justify-start">
      <cornie-avatar-field v-model="img.url" />
    </div>
    <div class="w-full mt-4 grid grid-cols-3 gap-5">
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

      <cornie-input
        :rules="emailRule"
        v-model="email"
        placeholder="--Enter--"
        label="Email"
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
    <div class="flex justify-end m-5" v-if="!viewOnly">
      <cornie-btn
        loading-color="white"
        type="button"
        @click="saveBasic"
        class="bg-primary text-white px-6 py-1 rounded-md"
      >
        Save
      </cornie-btn>
    </div>
  </div>
</template>
<script lang="ts">
  import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import DatePicker from "@/components/datepicker.vue";
  import { namespace } from "vuex-class";

  import { useHandleImage } from "@/composables/useHandleImage";

  import { Options, setup, Vue } from "vue-class-component";

  import { cornieClient } from "@/plugins/http";
  import IPractitioner from "@/types/IPractitioner";
  import { CornieUser } from "@/types/user";
  import { date, number, string } from "yup";
  const account = namespace("user");
  const routerStore = namespace("routerStore");

  @Options({
    name: "Account Profile",
    components: {
      CornieRadio,
      CornieInput,
      CornieAvatarField,
      CornieSelect,
      DatePicker,
    },
  })
  export default class AccountProfile extends Vue {
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
    emailRule = string().email().required();
    email = "";

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

    @account.Getter
    cornieUser!: CornieUser;

    @account.Mutation
    updatePractitioner!: (practitioners: IPractitioner[]) => void;

    @account.Getter
    authPractitioner!: IPractitioner;

    userDetails = "";
    async fetchUserDetails() {
      const details = cornieClient().get(
        `/api/v1/patient/get-patient/${this.userId}`
      );
      const response = await Promise.all([details]);
      this.userDetails = response[0].data;
    }
    get userId() {
      return this.cornieUser?.id;
    }
    async mounted() {
      await this.updatePractitioner(this.authPractitioner as any);

      await this.fetchUserDetails();

      console.log("details", this.userDetails);
    }

    saveBasic() {}
  }
</script>
