<template>
  <cornie-dialog :modelValue="show" center class="w-1/2 h-auto">
    <div class="xl:w-full w-11/12 mx-auto p-10 xl:mt-0 mt-8 info-container">
      <div
        class="w-full flex xl:flex-row flex-col xl:items-center items-right justify-between"
      >
        <span class="font-bold text-primary whitespace-nowrap xl:mb-0 mb-6"
          >Dr. {{ practitioner && practitioner.name }} Availability</span
        >

        <div class="xl:ml-10">
          <input v-model="date" class="px-3 py-2 ap-card1" type="date" />
        </div>
      </div>

      <div class="my-6 w-full">
        <cornie-select
          v-model="locationSelected"
          placeholder="Select a particular location"
          :readonly="false"
          :items="practitionerLocations.map((el) => el.name)"
          required
          @changed="handleChange"
        ></cornie-select>
      </div>

      <div
        v-if="date"
        class="xl:flex block items-center justify-between mt-8 xl:overflow-x-hidden overflow-x-scroll"
      >
        <div
          class="text-center ap-card px-12 py-2 xl:w-auto w-full"
          :class="{ 'ap-card-active': selectedDate === date }"
          @click="handleDate(date)"
        >
          <span class="font-bold text-lg">{{ formatDate(date) }}</span
          ><br />
          <span class="text-grey-blue mt-2"
            >{{ availableTime.length }}
            {{ availableTime.length < 2 ? "slot" : "slots" }} available</span
          >
        </div>
      </div>

      <div v-if="locationSelected">
        <div
          class="grid xl:grid-cols-6 grid-cols-3 gap-6 items-center justify-between mt-8"
        >
          <div
            v-for="(time, index) in availableTime"
            :key="index"
            class="time-card xl:px-8 px-6 py-2"
            :class="{
              'time-card-active': selectedTime === time,
              'bg-red-500 text-white': checkPastTime(time),
            }"
            @click="handleTime(time)"
          >
            <span class="">{{ time }}</span>
          </div>
        </div>
        <div v-if="availableTime.length === 0" class="my-8">
          <p class="text-center">
            No available Time<br />
            Please select another day
          </p>
        </div>
      </div>

      <div
        class="flex xl:flex-row flex-col items-center xl:justify-end justify-center mt-8"
      >
        <cornie-btn
          class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full bg-white px-6 py-1 text-primary border-primary border-2 rounded-xl"
          @click="$emit('close')"
        >
          Close
        </cornie-btn>
        <cornie-btn
          class="xl:w-auto w-full bg-red-500 px-6 py-1 text-white rounded-xl"
          :disabled="!selectedTime.length || !selectedDate.length"
          @click="proceedToBook"
          :loading="loading"
        >
          Book Appointment
        </cornie-btn>
      </div>
    </div>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import { CornieUser } from "@/types/user";

import moment from "moment";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieDialog from "@/components/CornieDialog.vue";

const account = namespace("user");

@Options({
  components: {
    CornieDialog,
    CornieSelect,
    CornieBtn,
  },
})
export default class DoctorsPage extends Vue {
  selectedDate: string = "";
  selectedTime: string = "";
  availableDays: Array<any> = [];
  availableTime: Array<any> = [];
  locationSelected = "";
  locationId = "";
  date = moment().format("YYYY-MM-DD");
  availableHour: any = {};
  show: Boolean = false;
  loading: Boolean = false;

  @account.Getter
  cornieUser!: CornieUser;

  @Prop({ type: String, default: "" })
  id!: "";

  @Prop({ type: Array, default: [] })
  practitionerLocations!: any[];

  @Prop({ type: Object, default: {} })
  practitioner!: any;

  @Prop({ type: Boolean, default: false })
  rescheduling!: boolean;

  @Watch("date")
  onInput() {
    this.selectedDate = this.date;
    if (this.locationSelected) {
      this.findLocationId();
      this.fetchAvailability();
    }
  }

  get userId() {
    return this.cornieUser?.id;
  }

  findLocationId() {
    const xlocation: any = this.practitionerLocations.find(
      (el: any) => el.name === this.locationSelected
    );
    this.locationId = xlocation.id;
  }

  handleDate(date: any) {
    this.selectedDate = date;
  }

  handleTime(val: any) {
    this.selectedTime = val;
  }

  getAvailableTime() {
    this.availableTime = [];
    Object.entries(this.availableHour).forEach(([key, value]) => {
      if (value === "available") {
        if (!this.checkPastTime(key)) {
          const formattedKey = Number(key).toFixed(2);
          this.availableTime.push(formattedKey);
        }
      }
    });
  }

  formatDate(date: any) {
    return new Date(date).toDateString();
  }

  doubleDigit(s: any) {
    return s.length < 2 ? "0" + s : s;
  }

  get startTime() {
    const t = this.selectedTime.split(".");
    return `${this.doubleDigit(t[0])}:${t[1]}`;
  }
  get endTime() {
    const t = this.selectedTime.split(".");
    const et = Number(t[0]) + 1;
    return `${this.doubleDigit(et)}:${t[1]}`;
  }

  async proceedToBook() {
    if (this.rescheduling) {
      this.$emit("get-new-date", this.selectedDate, this.startTime);
      this.$emit("close");
    } else {
      const data = {
        locationId: this.locationId,
        date: this.selectedDate,
        startTime: this.startTime,
        endTime: this.endTime,
        billingType: "insurance",
        practitionerId: this.id,
        patientId: this.userId,
      };
      try {
        this.loading = true;
        const res = await cornieClient().post(
          "/api/v1/patient-portal/appointment",
          {
            ...data,
          }
        );
        if (res.success) {
          this.$emit("close");
          window.notify({
            msg: "Appointment has been booked, proceed to make payment",
            status: "success",
          });
        } else {
          window.notify({
            msg: res.message,
            status: "error",
          });
        }
      } catch (error: any) {
        window.notify({
          msg: error.message,
          status: "error",
        });
      } finally {
        this.loading = false;
      }
    }
  }

  checkPastTime(time: any) {
    const today = new Date().toDateString();
    const thisHour = new Date().getHours();
    const dateSelected = new Date(this.selectedDate).toDateString();
    const potential = today === dateSelected;
    const pastTime = thisHour >= time;
    return potential && pastTime;
  }

  async fetchAvailability() {
    if (this.date) {
      try {
        this.loading = true;
        const { data } = await cornieClient().get(
          `/api/v1/booking-website/day-view/${this.locationId}/practitioner/${this.id}?date=${this.date}`
        );
        this.availableHour = data;
        this.getAvailableTime();
      } catch (error) {
        window.notify({
          msg: "There was an error fetching availability hours",
          status: "error",
        });
      } finally {
        this.loading = false;
      }
    }
  }

  async handleChange(value: any) {
    this.locationSelected = value;
    this.findLocationId();
    await this.fetchAvailability();
  }

  async created() {
    this.selectedDate = this.date;
  }
}
</script>

<style scoped>
img {
  filter: brightness(8.5);
}

.text-grey-blue {
  color: #667499;
}
.info-container {
  background: #ffffff;
  border: 0.2px solid #c2c7d6;
  box-sizing: border-box;
  box-shadow: 0px 15px 40px rgba(20, 23, 31, 0.08);
  border-radius: 16px;
}
.active-tab {
  border-bottom: 4px solid #fe4d3c;
  font-weight: 600;
  color: #14171f;
}

.text-grey-eth {
  color: #c2c7d6;
}

/* cards in book appointment screens */
.ap-card {
  /* background: #f0f4fe;
  border: 0.5px solid #c2c7d6; */
  /* box-shadow: 0px 15px 40px rgba(20, 31, 21, 0.04); */
  border-radius: 8px;
  cursor: pointer;
}

.ap-card1 {
  background: #f0f4fe;
  border: 0.5px solid #c2c7d6;
  box-shadow: 0px 15px 40px rgba(20, 31, 21, 0.04);
  border-radius: 8px;
  white-space: nowrap;
}
.ap-card:hover {
  background: #f0f4fe;
  border: 0.5px solid #c2c7d6;
  box-shadow: 0px 15px 40px rgba(20, 31, 21, 0.04);
  border-radius: 8px;
}
.ap-card-active {
  background: #f0f4fe;
  border: 1px solid #080056;
  box-shadow: 0px 15px 40px rgba(20, 31, 21, 0.04);
  border-radius: 8px;
}

.time-card {
  background: #ffffff;
  border: 1px solid #c2c7d6;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #667499;
}

.time-card-active {
  background: #080056;
  border: 1px solid #ffffff;
  color: #ffffff;
}
</style>
