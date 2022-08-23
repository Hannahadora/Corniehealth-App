<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
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
          <div class="">
            <span
              class="mb-2 w-full rounded-full"
              @click="showDatalist = !showDatalist"
            >
              <icon-input
                autocomplete="off"
                class="border border-gray-400 py-2 rounded-full focus:outline-none"
                type="search"
                placeholder="Search Existing"
                v-model="query"
              >
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </icon-input>
            </span>
            <div
              :class="[
                !showDatalist ? 'hidden' : 'o',
                results.length === 0 ? 'h-20' : 'h-auto',
              ]"
              class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded overflow-auto mt-2 svelte-5uyqqj"
              style="width: 96%"
              
            >
              <div class="flex flex-col w-full p-2">
                <div
                  v-for="(item, i) in results"
                  :key="i"
                  @click="selected(item)"
                  class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
                >
                  <div
                    class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative"
                  >
                    {{ item.firstname +' '+ item.lastname }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div class="w-full mt-4 px-1">
              <div class="mb-4">
                <span class="text-sm font-semibold mb-2">Payment Accounts</span>
                <Multiselect
                  v-model="paymentAccounts"
                  mode="tags"
                  :hide-selected="false"
                  id="field-id"
                  :options="[]"
                  value-prop="code"
                  trackBy="code"
                  label="display"
                  placeholder="--Select applicable accounts--"
                  class="w-full"
                >
                  <template v-slot:option="{ option }">
                    <select-option @click="setDefault(option.code)" />
                    <span class="w-full text-sm" @click="setDefault(option.code)">{{ option.display }}</span>
                    <span
                      class="text-xs text-success flex justify-end float-right w-full"
                      v-if="option.code === defaultPaymentAccountId"
                      >Default</span
                    >
                    <span
                      v-else
                      class="text-xs text-danger flex justify-end float-right w-full"
                      @click="setDefault(option.code)"
                      >Set as default</span
                    >
                  </template>
                </Multiselect>
              </div>
                <cornie-input
                    class="w-full mb-4 -mt-8"
                    label="First Name"
                    placeholder="Enter"
                    :rules="requiredRule"
                    v-model="firstName"
                />
                <cornie-input
                    class="w-full mb-4"
                    label="Middle Name"
                    placeholder="Enter"
                    v-model="middleName"
                />
                <cornie-input
                    class="w-full mb-5"
                    label="Last Name"
                    placeholder="Enter"
                    v-model="lastName"
                    :rules="requiredRule"
                />
                <date-picker
                    class="w-full mt-5"
                    label="Date of Birth"
                    placeholder="Enter"
                    :rules="dobRule"
                    v-model="dateOfBirth"
                />
                <cornie-select
                    label="Relationship"
                    class="w-full mt-4"
                    placeholder="Enter"
                    v-model="relationship"
                    :items="['Spouse','Child','Parent','Relative','Other','Employee','Member']"
                    :required="true"
                    :rules="requiredRule"
                />

                <cornie-input
                    :rules="emailRule"
                    v-model="email"
                    :required="true"
                    placeholder="Enter"
                    label="Email"
                    class="mb-4"
                />
                <phone-input
                    v-model="phone.number"
                    v-model:code="phone.dialCode"
                    :rules="requiredRule"
                    :required="true"
                    label="Phone Number"
                    placeholder="--Enter--"
                    class="mb-4 mt-4"
                />
                <cornie-select
                    label="Member Role"
                    class="w-full mb-4 mt-4"
                    placeholder="Enter"
                    v-model="memberRole"
                    :items="['Admin','User']"
                />
                <div class="flex space-x-4 w-full mb-5">
                  <cornie-radio :label="'This account will be managed from admin profile'"/>
                   <tooltip class="ml-3" right>
                    <template #activator="{ on }">
                      <span v-on="on">
                        <info-icon />
                      </span>
                    </template>
                    <div>
                      Create and manage dependant accounts for non-adult members of your family. You can navigate from your profile to access and manage dependant accounts.
                    </div>
                  </tooltip>
                </div>
                <div class="flex space-x-4 w-full mb-5">
                  <cornie-radio :label="'This account will be managed from admin profile'"/>
                   <tooltip class="ml-3" right>
                    <template #activator="{ on }">
                      <span v-on="on">
                        <info-icon />
                      </span>
                    </template>
                    <div>
                      Create and manage dependant accounts for non-adult members of your family. You can navigate from your profile to access and manage dependant accounts.
                    </div>
                  </tooltip>
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
import { useHandleImage } from "@/composables/useHandleImage";
import User, { CornieUser } from "@/types/user";

 import { IPatient } from "@/types/IPatient";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import Tooltip from "@/components/CornieTooltip.vue";
import Multiselect from "@vueform/multiselect";
import SelectOption from "@/components/custom-checkbox.vue";


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
    PhoneInput,
    Tooltip,
    Multiselect,
    SelectOption
  },
})
export default class MemberModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  familyId!: string;



  @account.Getter
  cornieUser!: CornieUser;

  loading = false;

    requiredRule = string().required();
    firstName = "";
    middleName = "";
    lastName = "";
    dateOfBirth = "";
    emailRule = string().email().required();
    email = "";
    memberRole = "";
    showDatalist = false;
    query = "";
    searchResults = [] as any;
    relationship = "";
    paymentAccounts = [];
    accountManger = "";
    defaultPaymentAccountId = "";
    allAccounts = [];
    accounts = [];
    results = [] as any;
    patientId = ""

    dobRule = date().max(
      new Date(),
      `Date must be on or before ${new Date().toLocaleDateString("en-NG")}`
    );
  
     phone = {
     dialCode: "+234",
      number: "",
    };

    
  @Watch("query")
  async search(query: string) {
    if (!query) return (this.results = []);
    await this.searchpatients(query);
  }

   async searchpatients(query: string) {
      const AllNotes = cornieClient().get(`/api/v1/patient/search?query=${query}`);
      const response = await Promise.all([AllNotes]);
      const info = response[0].data;
        this.results = info.map((p:IPatient) => ({
        ...p,
        display: this.printPatient(p),
      }));

  }

  
  printPatient(patient: IPatient) {
    return `${patient.firstname} ${patient.lastname}`;
  }

    setDefault(index: any) {
      for (var i = 0; i < this.allAccounts.length; i++) {
        if (this.accounts[i] == index) {
          this.defaultPaymentAccountId = index;
        }
      }
    }

    get patientName(){
      return this.firstName +''+ this.middleName +''+ this.lastName;
    }

    get payload() {
        return {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        dob: this.dateOfBirth,
        relationship: this.relationship,
        role: this.memberRole,
        patientId: this.patientId || undefined

        };
    }

    selected(value:any){
      this.showDatalist = false; 

        this.firstName = value.firstname;
        this.lastName = value.lastname;
        this.email = value.email;
        this.phone = value?.contactInfo[0]?.phone;
        this.dateOfBirth = value.dateOfBirth;
        this.relationship = value.relationship;
        this.memberRole = value.role;
        this.patientId = value.id;
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
    // console.log(this.payload)
    try {
      const { data } = await cornieClient().post("/api/v1/patient-portal/family/member/",this.payload);
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
    this.$emit("family-added");
    this.show = false;
  }

}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.border-r-0 {
  border-right-width: 0px !important;
}
.border-l-0 {
  border-left-width: 0px !important;
}
  .multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}
.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #fe4d3c);
  color: var(--ms-option-color-selected-pointed, #fff);
}
.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #fe4d3c);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(
    var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
      var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
  );
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
}

.multiselect-tag.is-user {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}
.multiselect-tag {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}
</style>
