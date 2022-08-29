<template>
	<!-- <cornie-modal :modelValue="show" center class="w-full h-full"> -->
	<div class="c-indigo xl:w-full w-11/12 mx-auto p-10 xl:mt-0 mt-8 info-container">
		<div class="w-full flex xl:flex-row flex-col xl:items-center items-right justify-between">
			<span class="sub-titles-1 whitespace-nowrap xl:mb-0 mb-6"
			>Dr. {{ practitioner && practitioner.name }} Availability</span
			>

			<div class="xl:ml-10">
				<input v-model="date" class="px-3 py-2 ap-card1" type="date" />
			</div>
		</div>

		<div class="my-6 w-full">
			<!-- <cornie-select
				v-model="locationSelected"
				placeholder="Select a particular location"
				:readonly="false"
				:items="practitionerLocations.map((el) => el.name)"
				required
				@changed="handleChange"
			></cornie-select> -->
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
				<span class="sub-titles-2">{{ formatDate(date) }}</span
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
			<button
				type="button"
				class="xl:mr-2 xl:mb-0 mb-6 xl:w-auto w-full"
				:primary="true"
				small
				@click="$emit('close')"
			>
				Close
			</button>
			<button
				class="xl:w-auto w-full"
				type="button"
				:secondary="true"
				small
				:disabled="!selectedTime.length || !selectedDate.length"
				@click="proceedToBook"
			>
				Book Appointment
			</button>
		</div>
	</div>
	<!-- </cornie-modal> -->
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import moment from "moment"
import CornieSelect from "@/components/cornieselect.vue"
import CornieDialog from "@/components/CornieDialog.vue"

// const appointment = namespace("appointment")
// const practitioners = namespace("practitioners")
// const misc = namespace("misc")

@Options({
  components: {
    CornieDialog,
    CornieSelect,
  },
})
export default class DoctorsPage extends Vue {
  selectedDate: string = ""
  selectedTime: string = ""
  availableDays: Array<any> = []
  availableTime: Array<any> = []
  availablePractitioners = []
  practitioner: any = {}
  locationSelected = ""
  locationId = ""
  date = moment().format("YYYY-MM-DD")
  availableHour: any = {}

  // @practitioners.Getter
  //   selectedPractitioner!: []

  @Prop({ type: String, default: "" })
    id!: "";

  // @appointment.Mutation
  //   SET_SELECTEDDATE!: (data: any) => void

  // @misc.Getter
  //   practitionerLocations!: []

  // @misc.Mutation
  //   SET_MODALSTATE!: (data: any) => void

  // @appointment.Mutation
  //   SET_SELECTEDTIME!: (data: any) => void

  // @practitioners.Getter
  //   getRelatedPractitioners!: []

  @Watch("date")
  onInput() {
    this.selectedDate = this.date
    if (this.locationSelected) {
      // this.findLocationId()
      this.fetchAvailability()
    }
  }

  // findLocationId() {
  //   const xlocation: any = this.practitionerLocations.find(
  //     (el: any) => el.name === this.locationSelected
  //   )
  //   this.locationId = xlocation.id
  // }

  handleDate(date: any) {
    this.selectedDate = date
    // this.SET_SELECTEDDATE(date)
  }

  handleTime(val: any) {
    this.selectedTime = val
    // this.SET_SELECTEDTIME(val)
  }

  getAvailableTime() {
    this.availableTime = []
    Object.entries(this.availableHour).forEach(([key, value]) => {
      if (value === "available") {
        if (!this.checkPastTime(key)) {
          const formattedKey = Number(key).toFixed(2)
          this.availableTime.push(formattedKey)
        }
      }
    })
  }

  formatDate(date: any) {
    return new Date(date).toDateString()
  }

  proceedToBook() {
    this.$nextTick(() => {
      this.$router.push(
        `/patients/appointment/doctor/${this.practitioner.id}/book/step1?locationId=${this.locationId}`
      )
    })
  }

  checkPastTime(time: any) {
    const today = new Date().toDateString()
    const thisHour = new Date().getHours()
    const dateSelected = new Date(this.selectedDate).toDateString()
    const potential = today === dateSelected
    const pastTime = thisHour >= time
    return potential && pastTime
  }

  async fetchAvailability() {
    // if (this.date) {
    //   try {
    //     const res: any = await this.$store.dispatch(
    //       "practitioners/fetchAvailability",
    //       {
    //         locationId: this.locationId,
    //         id: this.id,
    //         // actor: "practitioner",
    //         date: new Date(this.date).toISOString(),
    //       }
    //     )
    //     if (res.data.success) {
    //       this.availableHour = res.data.data
    //       this.getAvailableTime()
    //     }
    //   } catch (error: any) {}
    // }
  }

  async handleChange(value: any) {
    this.locationSelected = value
    // this.findLocationId()
    await this.fetchAvailability()
  }

  async created() {
    // await this.$store.dispatch("practitioners/getAPractitionerProfile", this.id)
    // this.practitioner = this.selectedPractitioner
    this.selectedDate = this.date
    // this.SET_SELECTEDDATE(this.selectedDate)
  }
}
</script>
