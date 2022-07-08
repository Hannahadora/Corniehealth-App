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
          v-if="reminders.length < 3"
        >
          <add-blue-icon class="mr-2" /> + Add Reminder</span
        >
      </div>
      <div class="grid grid-cols-3 gap-6 mt-8 mb-5">
        <div v-for="(reminder, index) in reminders" :key="index">
          <accordion-component
            class="pb-10 capitalize"
            :editabetitle="reminder.heading"
            :opened="true"
          >
            <div class="mt-7 -ml-5">
              <toogle-check-vue  v-model="reminder.switchshow"/>
            </div>
  
            <div class="flex space-x-4 w-full mt-8">
              <cornie-radio
                label="Hour"
                value="Hours"
                v-model="type"
                checked
                :name="index"
              />
              <cornie-radio
                label="Day"
                value="Days"
                v-model="type"
                 :name="index"
              />
              <cornie-radio
                label="Week"
                value="Weeks"
                v-model="type"
                :name="index"
              />
            </div>
  
            <div class="my-8 flex space-x-6">
              <cornie-select
                  v-if="type == 'Days'"
                    placeholder="10"
                    class="w-14"
                     :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="reminder.days"
                    type="number"
              />
               <cornie-select
                   v-if="type == 'Weeks'"
                    placeholder="10"
                    class="w-14"
                     :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="reminder.weeks"
                    type="number"
              />
              <cornie-select
                   v-if="type == 'Hours'"
                    placeholder="10"
                    class="w-14"
                    :items="[1,2,3,4,5,6,7,8,9,10]"
                    v-model="reminder.time"
                    type="number"
              />
              <label for="" class="mt-2">{{ type }} Before</label>
            </div>
  
            <delete-icon
              class="float-right cursor-pointer"
            />
          </accordion-component>
        </div>
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
export default class AddLocation extends Vue {
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

  reminders = [
    {
      days: "",
      weeks: "",
      time: "",
      switchshow: true,
      pref: "30",
      heading: '1st Reminder'
    }
  ] as any;

  type = "Days";

  required = string().required();
  requiredEmail = string().required().email();

  @Watch("id")
  idChanged() {
    this.setReminder();
  }
  async setReminder() {
    const reminder = await this.getLocationById(this.id);
    if (!reminder) return;
  
  }

  setReminderType(type:string){
      this.type = type
  }


  // handleChange(val: string) {
   
  //   if (val === "time") {
  //     this.pref = "Hours";
  //   } else {
  //     this.pref = val;
  //   }

  //    val = this.istReminder.pref;
  // }

  AddReminder() {
    this.reminders.push(this.Reminder);
  }

  becomeNumber(val: string) {
    return Number(val);
  }
  get payload() {
    return {
      first: this.reminders[0],
      second: this.reminders[1],
      third:  this.reminders[2],

    };
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateReminder();
    else await this.createdReminder();
    this.loading = false;
  }

  async createdReminder() {
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
    this.setReminder();

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
