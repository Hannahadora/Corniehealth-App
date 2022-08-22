<template>
  <div class="flex flex-col pt-10">
    <div class="flex w-full justify-start">
      <cornie-avatar-field v-model="img.url" />
    </div>
    <div class="w-full mt-4 grid md:grid-cols-3 grid-cols-1 gap-5">
      <div class="col-span-1">
        <cornie-input
          label="First Name"
          placeholder="Enter"
          :rules="requiredRule"
          v-model="firstName"
          :readonly="viewOnly"
        />
      </div>
      <div class="col-span-1">
        <cornie-input
          label="Middle Name"
          placeholder="Enter"
          v-model="middleName"
          :readonly="viewOnly"
        />
      </div>
      <div class="col-span-1">
        <cornie-input
          label="Last Name"
          placeholder="Enter"
          v-model="lastName"
          :rules="requiredRule"
          :readonly="viewOnly"
        />
      </div>
      <div class="col-span-1">
        <cornie-input
          :rules="emailRule"
          v-model="email"
          placeholder="--Enter--"
          label="Email"
          :readonly="true"
          :disabled="true"
        />
      </div>
      <div class="col-span-1">
        <date-picker
          label="Date of Birth"
          placeholder="Enter"
          :rules="dobRule"
          v-model="dateOfBirth"
          :readonly="viewOnly"
        />
      </div>
      <div class="col-span-1">
        <cornie-select
          label="Blood Group"
          placeholder="Select One"
          :items="bloodGroupOptions"
          v-model="bloodGroup"
          :readonly="viewOnly"
        />
      </div>
      <div class="col-span-1">
        <cornie-select
          label="Genotype"
          placeholder="Enter"
          v-model="genotype"
          :items="genotypeOptions"
          :readonly="viewOnly"
        />
      </div>
      <div class="col-span-1">
        <cornie-select
          label="Gender"
          :rules="requiredRule"
          placeholder="Select One"
          :items="genderOptions"
          v-model="gender"
          :readonly="viewOnly"
        />
      </div>
      <div class="col-span-1">
        <cornie-select
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
      </div>

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
        placeholder="Enter"
        v-model="numberOfChildren"
        :readonly="viewOnly"
      >
      </cornie-input>

      <cornie-select
        label="Multiple Birth?"
        placeholder="Select One"
        :items="multipleBirthOptions"
        v-model="multipleBirth"
        :readonly="viewOnly"
      />
      <cornie-input
        v-if="multipleBirth == 'yes'"
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
        @click="saveProfile"
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

    @account.Getter
    corniePatient!: any;

    @account.Mutation
    updatePractitioner!: (practitioners: IPractitioner[]) => void;

    @account.Getter
    authPractitioner!: IPractitioner;

    userDetails = "";
    get userId() {
      return this.cornieUser?.id;
    }
    setDetails(details: CornieUser) {
      this.firstName = details?.firstName;
      this.lastName = details?.lastName;
      this.middleName = details?.middleName as any;
      this.email = details?.email;
      this.img.url = details?.image as any;
    }
    setPatientDetails(details: any) {
      this.bloodGroup = details?.bloodGroup;
      this.genotype = details?.genotype || "";
      this.gender = details?.gender || "";
      this.maritalStatus = details?.maritalStatus || "";
      this.multipleBirthInteger = details?.multipleBirthInteger || 0;
      this.dateOfBirth = details?.dateOfBirth || "";
      this.numberOfChildren = details?.numberOfChildren || "";
      this.hasChild =
        details?.numberOfChildren && details?.numberOfChildren > 0
          ? "yes"
          : "no";
      this.multipleBirth = details?.multipleBirth == true ? "yes" : "no";
    }

    get getUpdatePayload() {
      return {
        // id: this.cornieUser?.id,
        // mrn: this.corniePatient.mrn,
        firstname: this.firstName,
        middlename: this.middleName,
        lastname: this.lastName,
        email: this.email,
        profilePhoto: this.img.url || undefined,
        dateOfBirth: this.dateOfBirth || undefined,
        gender: this.gender || undefined,
        maritalStatus: this.maritalStatus || undefined,
        multipleBirths: this.multipleBirth == "yes" ? true : false,
        multipleBirthInteger: this.multipleBirthInteger || undefined,
        bloodGroup: this.bloodGroup || undefined,
        genotype: this.genotype || undefined,
        numberOfChildren: this.numberOfChildren || undefined,
      };
    }
    mounted() {
      this.updatePractitioner(this.authPractitioner as any);
      this.setDetails(this.cornieUser);
      this.setPatientDetails(this.corniePatient);
      console.log("user", this.cornieUser);
      console.log("patient", this.corniePatient);
    }
    async created() {
      await this.updatePractitioner(this.authPractitioner as any);
      // await this.fetchUserDetails();
    }

    async saveProfile() {
      console.log("Saving profile...", this.getUpdatePayload);
      if (!this.getUpdatePayload.dateOfBirth) {
        window.notify({
          msg: "Date of Birth is required",
          status: "error",
        });
        return;
      }
      try {
        const details = cornieClient().patch(
          `/api/v1/patient-portal/account`,
          this.getUpdatePayload
        );
        const response = await Promise.all([details]);
        const r = response[0].data;
        console.log("result", r);
        window.notify({
          msg: "Profile updated successfully",
          status: "success",
        });
        this.updatePractitioner(this.authPractitioner as any);
        this.setDetails(this.cornieUser);
        this.setPatientDetails(this.corniePatient);
      } catch (error) {
        window.notify({
          msg: "Error updating account profile",
          status: "error",
        });
      }
    }
  }
</script>
