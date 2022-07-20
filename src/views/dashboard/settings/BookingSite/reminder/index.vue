<template>
  <div class="h-full w-full">
    <accordion-
      class="pb-10 capitalize"
      title="Reminder"
      :opened="true"
    >
    <v-form>

      <div class="bg-gray-100 rounded-md w-full p-5 mt-8">
        <span class="text-black text-xs float-left w-full -mt-2"
          >Specify notification reminder timelines prior to appointment
          time.</span
        >
        <span
          class="text-black text-xs float-right flex cursor-pointer -mt-4"
          @click="AddReminder"
          v-if="reminders.length < 3 && setValue !=3"
        >
          <add-blue-icon class="mr-2" /> Add Reminder</span
        >
      </div>
      <div class="grid grid-cols-3 gap-6 mt-8 mb-5">
          <accordion-component
            v-if="firstShow == true"
            class="pb-10 capitalize"
            :editabetitle="first.heading"
            :opened="true"
          >
            <div class="mt-7 -ml-5">
              <toogle-check-vue  v-model="first.active"/>
            </div>
  
            <div class="flex space-x-4 w-full mt-8">
              <cornie-radio
                label="Hour"
                value="hour"
                v-model="first.type"
                checked
                :name="'first'"
              />
              <cornie-radio
                label="Day"
                value="day"
                v-model="first.type"
                 :name="'first'"
              />
              <cornie-radio
                label="Week"
                value="week"
                v-model="first.type"
                :name="'first'"
              />
            </div>
  
            <div class="my-8 flex space-x-6">
              <cornie-select
                  v-if="first.type == 'day'"
                    placeholder="10"
                    class="w-14"
                     :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="first.value"
                    type="number"
              />
               <cornie-select
                   v-if="first.type == 'week'"
                    placeholder="10"
                    class="w-14"
                     :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="first.value"
                    type="number"
              />
              <cornie-select
                   v-if="first.type == 'hour'"
                    placeholder="10"
                    class="w-14"
                    :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="first.value"
                    type="number"
              />
              <label for="" class="mt-2">{{ first.type }} Before</label>
            </div>
  
            <delete-icon
              @click="RemoveReminder('first')"
              class="float-right cursor-pointer"
            />
          </accordion-component>

           <accordion-component
            v-if="secondShow == true"
            class="pb-10 capitalize"
            :editabetitle="second.heading"
            :opened="true"
           >
            <div class="mt-7 -ml-5">
              <toogle-check-vue  v-model="second.active"/>
            </div>
  
            <div class="flex space-x-4 w-full mt-8">
              <cornie-radio
                label="Hour"
                value="hour"
                v-model="second.type"
                checked
                :name="'second'"
              />
              <cornie-radio
                label="Day"
                value="day"
                v-model="second.type"
                 :name="'second'"
              />
              <cornie-radio
                label="Week"
                value="week"
                v-model="second.type"
                :name="'second'"
              />
            </div>
  
            <div class="my-8 flex space-x-6">
              <cornie-select
                  v-if="second.type == 'day'"
                    placeholder="10"
                    class="w-14"
                     :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="second.value"
                    type="number"
              />
               <cornie-select
                   v-if="second.type == 'week'"
                    placeholder="10"
                    class="w-14"
                     :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="second.value"
                    type="number"
              />
              <cornie-select
                   v-if="second.type == 'hour'"
                    placeholder="10"
                    class="w-14"
                    :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="second.value"
                    type="number"
              />
              <label for="" class="mt-2">{{ second.type }} Before</label>
            </div>
  
            <delete-icon
              @click="RemoveReminder('second')"
              class="float-right cursor-pointer"
            />
           </accordion-component>

           <accordion-component
           v-if="thirdShow == true"
            class="pb-10 capitalize"
            :editabetitle="third.heading"
            :opened="true"
          >
            <div class="mt-7 -ml-5">
              <toogle-check-vue  v-model="third.active"/>
            </div>
  
            <div class="flex space-x-4 w-full mt-8">
              <cornie-radio
                label="Hour"
                value="hour"
                v-model="third.type"
                checked
                :name="'third'"
              />
              <cornie-radio
                label="Day"
                value="day"
                v-model="third.type"
                 :name="'third'"
              />
              <cornie-radio
                label="Week"
                value="week"
                v-model="third.type"
                :name="'third'"
              />
            </div>
  
            <div class="my-8 flex space-x-6">
              <cornie-select
                  v-if="third.type == 'day'"
                    placeholder="10"
                    class="w-14"
                     :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="third.value"
                    type="number"
              />
               <cornie-select
                   v-if="third.type == 'week'"
                    placeholder="10"
                    class="w-14"
                     :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="third.value"
                    type="number"
              />
              <cornie-select
                   v-if="third.type == 'hour'"
                    placeholder="10"
                    class="w-14"
                    :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="third.value"
                    type="number"
              />
              <label for="" class="mt-2">{{ third.type }} Before</label>
            </div>
  
            <delete-icon
              @click="RemoveReminder('third')"
              class="float-right cursor-pointer"
            />
          </accordion-component>
      </div>
        <cornie-card>
            <cornie-card-text class="flex justify-end pb-12">
              <cornie-btn
              
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
    </v-form>

    </accordion->
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import PhoneInput from "@/components/phone-input.vue";
import ILocation, { HoursOfOperation } from "@/types/ILocation";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CopyformIcon from "@/components/icons/formcopy.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import { Prop, Watch } from "vue-property-decorator";
import { getCoordinates } from "@/plugins/utils";
import { getCountries, getStates } from "@/plugins/nation-states";
import AutoComplete from "@/components/autocomplete.vue";
import AddBlueIcon from "@/components/icons/addblue.vue";
import CalendarIcon from "@/components/icons/calendar.vue";
import DateTimePicker from "@/components/datetime-picker.vue";
import CornieRadio from "@/components/cornieradio.vue";
import moment from "moment";

import ToogleCheckVue from "@/components/ToogleCheck.vue";

const countries = getCountries();

const dropdown = namespace("dropdown");
const location = namespace("location");

@Options({
  components: {
    CornieInput,
    AutoComplete,
    AddBlueIcon,
    CornieSelect,
    PhoneInput,
    AccordionComponent,
    DeleteIcon,
    CopyformIcon,
    CalendarIcon,
    DateTimePicker,
    CornieRadio,
    ToogleCheckVue,
  },
})
export default class ReminderIndex extends Vue {
  dateoptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  get Reminder() {
    return {
      days: 0,
      weeks: 0,
      time: 0,
      switchshow: true,
      pref: "30",
      heading: '1st Reminder'
    };
  }
time = "";
  get secondReminder() {
    return {
      days: "",
      weeks: "",
      time: "",
      switchshow: true,
      pref: "30",
    };
  }

  get thirdReminder() {
    return {
      days: false,
      weeks: true,
      time: false,
      switchshow: false,
      pref: "",
    };
  }
  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Object, default: {} })
  appointmentReminders!: any;

  @location.Action
  getLocationById!: (id: string) => Promise<ILocation>;

  loading = false;

  data: any = {
    date: "",
    dateTime: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  };

  setValue = 1;

  reminders = [] as any;

  type = "Days";

  required = string().required();
  requiredEmail = string().required().email();

  setReminderType(type:string){
      this.type = type
  }

  firstShow = true;
  secondShow = false;
  thirdShow = false;


  first = {
    value: '0',
    active: true,
    type: "hour",
    heading: "1st Reminder"
  } as any
  second = {
   value: '0',
    active: true,
    type: "hour",
    heading: "2nd Reminder"
  } as any
  third = {
    value: '0',
    active: true,
    type: "hour",
    heading: "3rd Reminder"
  } as any

  
  @Watch("id")
  idChanged() {
    this.setReminder();
  }
  async setReminder() {
    if (!this.id) return;

    this.firstShow = true;
    this.secondShow = true;
    this.thirdShow = true;
    
    this.first = this.appointmentReminders.first;
    this.second = this.appointmentReminders.second;
    this.third = this.appointmentReminders.third;
    
  
  }


  AddReminder() {
    if(this.setValue != 3){
      this.setValue = this.setValue + 1;
    }
    if(this.setValue == 1){
      this.firstShow = true;
      this.first = this.first;
    }else if(this.setValue == 2){
      this.secondShow = true;
      this.second = this.second;
    } else if (this.setValue == 3){
      this.thirdShow = true;
      this.third = this.third;
    }
    this.reminders.push({value: this.setValue + 1});
  }

  RemoveReminder(value:string) {
    if(this.setValue != 3){
      this.setValue = this.setValue - 1;
    }
    if(value == 'first'){
      this.firstShow = false;
      this.first = undefined
    }else if(value == 'second'){
      this.secondShow = false;
      this.second = undefined
    } else if (value == 'third'){
      this.thirdShow = false;
      this.third = undefined
    }
    //this.reminders.push({value: this.setValue + 1});
  }

  becomeNumber(val: string) {
    return Number(val);
  }
  get payload() {
    return {
      first: this.first,
      second: this.second,
      third:  this.third,

    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateReminder();
    else await this.createdReminder();
    this.loading = false;
  }

  async createdReminder() {
    // this.payload.first.value = this.payload.first.type == 'hour' ?  moment().add(this.payload.first.value, 'hours').format('HH:mm') : this.payload.first.value;
    // this.payload.second.value = this.payload.second.type == 'hour' ? moment().add(this.payload.second.value, 'hours').format('HH:mm') : this.payload.second.value;
    // this.payload.third.value = this.payload.third.type == 'hour' ? moment().add(this.payload.third.value, 'hours').format('HH:mm') : this.payload.third.value;
    try {
      const response = await cornieClient().post(
        "/api/v1/appointment-reminders",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Appointment reminders Created", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Appointment reminders not Created", status: "error" });
    }
  }

  async updateReminder() {
    const url = `/api/v1/appointment-reminders/${this.id}`;
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      window.notify({ msg: "Appointment reminders Updated", status: "success" });
    } catch (error) {
      window.notify({ msg: "Appointment reminders not Updated", status: "error" });
    }
  }
 
  async created() {
    await this.setReminder();
  }
}
</script>

<style>
input[type="time"]::-webkit-calendar-picker-indicator {
  background: none;
  display: none;
}
:focus-visible {
  outline: none !important;
}
.reminder-card {
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(46, 41, 78, 0.02),
    0px 4px 8px rgba(46, 41, 78, 0.08);
  border-radius: 4px;
}
</style>
