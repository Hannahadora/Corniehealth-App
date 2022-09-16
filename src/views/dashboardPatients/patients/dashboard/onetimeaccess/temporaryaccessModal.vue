<template>
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <cornie-icon-btn @click="show = false" class="">
                  <arrow-left-icon />
          </cornie-icon-btn>
          <div class="w-full border-l-2 border-gray-100">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
                Temporary Access Link
            </h2>
    
          </div>
        </cornie-card-title>
  
        <cornie-card-text class="flex-grow scrollable">
          <v-form ref="form">
            <div class="mt-4">
                <div class="grid grid-cols-2 gap-4 w-full mb-7">
                   <date-time-picker
                      v-model:date="startDate"
                       v-model:time="startTime"
                       label="Start Date/Time"
                       class="w-full"
                   />
                   <date-time-picker
                       v-model:date="endDate"
                       v-model:time="endTime"
                       label="End Date/Time"
                       class="w-full"
                   />
   
                </div>
                <div class="mb-7">
                      <span class="text-sm font-semibold mb-1">Records</span>
                      <Multiselect
                        v-model="recordIds"
                        mode="multiple"
                        :close-on-select="true"
                        :options="allPatientRecords"
                        :searchable = true
                        :clear-on-select="false"
                        label-prop="display"
                        value-prop="code"
                        trackBy="display"
                        label="display"
                        placeholder="--Select--"
                        class="w-full"
                      >

                        <template v-slot:tag="{ option, handleTagRemove, disabled }">
                          <div class="multiselect-tag is-user">
                            {{ option.display }}
                            <span
                              v-if="!disabled"
                              class="multiselect-tag-remove"
                              @mousedown.prevent="handleTagRemove(option, $event)"
                            >
                              <span class="multiselect-tag-remove-icon"></span>
                            </span>
                          </div>
                        </template>
                        <template v-slot:option="{ option }">
                            {{ option.display }}
                        </template> 
                        <!-- <template v-slot:option="{ option }">
                              <select-option  :value="option.name" :label="option.name" />
                        </template>  -->
                      </Multiselect>
                </div>
                <!-- <div class="w-full mb-7">
                   <span class="text-sm flex space-x-2 items-center w-full text-semibold text-danger"><add-icon/> <span>Generate Link</span> </span>
                </div>
                <div class="border-2 border-gray-200 bg-blue-50 py-2 rounded px-4 mb-7">
                   <span class="text-sm text-gray-500">
                       www.corniehealth.com/patientportal/emmanuelukaegbu/<br>temporaryaccess/activated
                       -17022022/12;00hrs/expires-180220221/8:00hrs.
                   </span>
                </div> -->
               
                <div class="mb-7 w-full">
                   <cornie-input
                       :label="'Add invitees'"
                       :placeholder="'Enter email address to invite'"
                       class="w-full"
                       v-model="inviteemail"
                       :rules="emailRule"
                   />
                </div>
                <div class="border-b-2 border-gray-200 border-dashed pb-5 mb-7">
                   <span class="text-sm text-semibold text-danger flex space-x-2 items-center w-full cursor-pointer" @click="addInvites"><add-icon/> <span>Add</span> </span>
                </div>
                <div class="flex justify-between w-full" v-for="(invite, index) in invitees" :key="index">
                   <div>
                       <!-- <span class="font-semibold text-sm mb-0">
                           Sam John
                       </span> -->
                       <p class="text-xs text-gray-400">{{ invite }}</p>
                   </div>
                   <delete-icon class="text-danger fill-current" @click="removeInvite(index)"/>
                </div>
            </div>
          </v-form>
        </cornie-card-text>
        
        <cornie-card>
          <cornie-card-text class="flex justify-end overflow-auto">
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
              Send
            </cornie-btn>
        
          </cornie-card-text>
        </cornie-card>
      </cornie-card>
  
    </cornie-dialog>
  </template>
  
  <script lang="ts">
  import { Options, Vue, setup } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { cornieClient } from "@/plugins/http";
  import { namespace } from "vuex-class";
  import { date, string } from "yup";

  import CornieCard from "@/components/cornie-card";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/autocomplete.vue";
  import ChevronDown from "@/components/icons/chevrondown.vue";
  import CornieBtn from "@/components/CornieBtn.vue";
  import AddIcon from "@/components/icons/add-orange.vue";
  import DateTimePicker from "@/components/date-time-picker.vue";
  import DeleteIcon from "@/components/icons/delete.vue";
  import Multiselect from "@vueform/multiselect";

  import IOnetimeaccess from "@/types/IOnetimeaccess";
  
  const onetimeaccess = namespace("onetimeaccess");
 
  @Options({
    name: "TempoaryaccessModal",
    components: {
      ...CornieCard,
      CornieIconBtn,
      ArrowLeftIcon,
      DeleteIcon,
      CornieDialog,
      CornieInput,
      CornieSelect,
      CornieBtn,
      ChevronDown,
      DateTimePicker,
      AddIcon,
      Multiselect
    },
  })
  export default class TempoaryaccessModal extends Vue {
   @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;
  
    @Prop({ type: String, default: "" })
    id!: string;

    @onetimeaccess.State
    patienthealthrecords!: IOnetimeaccess[];
  
    @onetimeaccess.Action
    fetchPatientrecords!: () => Promise<void>;

    loading = false;

    status =  "active";
    startDate = "";
    startTime = "";
    endDate = "";
    endTime =  "";
    invitees = [] as String[];
    inviteemail = "";
    patientId = "";
    recordIds = [] as String[];
    identifier = "";
    accessCount = 0;
    emailRule = string().email().required();


    addInvites(){
      this.invitees.push(this.inviteemail);
      this.inviteemail = "";
    }
    removeInvite(index: number) {
      this.invitees.splice(index, 1);
    }
   
    get payload(){
       return {
        startDate: this.startDate,
        startTime: this.startTime,
        endDate: this.endDate,
        endTime: this.endTime,
        invitees: this.invitees,
        recordIds: this.recordIds,

       }
    }
  
     async submit() {
      this.loading = true;
      await this.createdAccess();
      this.loading = false;
    }

    async createdAccess(){
      try {
      const response = await cornieClient().post(
        '/api/v1/patient-portal/one-time-access',
        this.payload
      );
      if(response.success){
          this.done();
        window.notify({ msg: "Onetime access activated successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Onetime access not activated", status: "error" });
    }
    }
  
    done(){
      this.show = false;
      this.$emit('accesssaved');
        this.status = "active";
        this.startDate = "";
        this.startTime = "";
        this.endDate = "";
        this.endTime = "";
        this.invitees = [];
        this.patientId = "";
    }

    get allPatientRecords() {
    if (!this.patienthealthrecords || this.patienthealthrecords.length === 0) return [];
    return this.patienthealthrecords.map((i: any) => {
      return {
        code: i.id,
        display: i.mode,
      };
    });
  }

  


  
    async created() {
      await this.fetchPatientrecords();
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

.multiselect-placeholder {
  font-size: 0.8em;
  font-weight: 400;
  font-style: italic;
  color: #667499;
}

.multiselect-caret {
  transform: rotate(0deg);
  transition: transform 0.3s;
  -webkit-mask-image: url("../../../../../assets/img/Chevron.png");
  mask-image: url("../../../../../assets/img/Chevron.png");
  background-color: #080056;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
}

.multiselect-tag-remove {
  display: flex;
  align-items: center;
  /* border: 1px solid #fff;
    background: #fff; */
  border-radius: 50%;
  color: #fff;
  justify-content: center;
  padding: 0.77px;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
}
.multiselect-options {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    max-height: var(--ms-max-height,19rem) !important;
}
.multiselect-dropdown {
    max-height: 19rem !important;
    
}
  </style>
  