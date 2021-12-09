<template>
  <div class="container">
    <div class="w-full">
      <div class="container-fluid" v-if="!seletedPractitioner?.id">
        <!-- <div class="container-fluid" v-if="filterOptions.byPractitioners?.length === 0"> -->
        <cornie-table
          :columns="availabilityHeaders"
          v-model="items"
          @filter="showFilterPane"
        >
          <template #actions="{}">
            <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              style="width: 200px"
            >
              <add-icon class="mr-3 mt-1" />
              <span class="ml-3 text-xs" @click="goToCreateSlot()"
                >Create slot</span
              >
            </div>
          </template>

          <template #time="{ item }">
            <p class="text-xs">{{ item }}</p>
          </template>
          <template #0="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[0]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[0]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #1="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[1]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[1]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #2="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[2]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[2]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #3="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[3]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[3]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #4="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[4]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[4]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #5="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[5]
                  ).length > 0
                "
              >
                <Actors
                  :items="
                    getPnersForSchedule(
                      item.split('-')[0].trim(),
                      item.split('-')[1].trim(),
                      availabilityDates[5]
                    )
                  "
                />
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
        </cornie-table>
      </div>

      <div class="container-fluid" v-else>
        <cornie-table
          :columns="availabilityHeaders"
          v-model="items"
          @filter="showFilterPane"
        >
          <template #topleft>
            <span><selected-practitioner :item="seletedPractitioner" /></span>
            <span class="mx-3" v-if="false"
              ><selected-location
                :item="allLocations[0]"
                :items="allLocations"
                @changed="locaionChanged"
            /></span>
            <span class="mx-3" v-if="false"
              ><selected-location
                :item="allDevices[0]"
                :items="allDevices"
                @changed="locaionChanged"
            /></span>
          </template>
          <template #actions="{}">
            <div
              class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
              style="width: 200px"
            >
              <add-icon class="mr-3 mt-1" />
              <span class="ml-3 text-xs" @click="goToCreateSlot"
                >Create slot</span
              >
            </div>
          </template>

          <template #time="{ item }">
            <p class="text-xs">{{ item }}</p>
          </template>
          <template #0="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[0]
                  ).length > 0
                "
              >
                <div
                  class="book-bg py-4"
                  :class="{
                    selected:
                      selectedSlot.id ===
                      `${getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[0]
                      )}_${item}_${availabilityDates[0]}`,
                  }"
                  @click="
                    selectSlot(
                      getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[0]
                      ),
                      item,
                      availabilityDates[0]
                    )
                  "
                ></div>
                <!-- <Actors :items="getPnersForSchedule(item.split('-')[0].trim(), item.split('-')[1].trim(), availabilityDates[0])" /> -->
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #1="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[1]
                  ).length > 0
                "
              >
                <div
                  class="book-bg py-4"
                  :class="{
                    selected:
                      selectedSlot.id ===
                      `${getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[1]
                      )}_${item}_${availabilityDates[1]}`,
                  }"
                  @click="
                    selectSlot(
                      getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[1]
                      ),
                      item,
                      availabilityDates[1]
                    )
                  "
                ></div>
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #2="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[2]
                  ).length > 0
                "
              >
                <div
                  class="book-bg py-4"
                  :class="{
                    selected:
                      selectedSlot.id ===
                      `${getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[2]
                      )}_${item}_${availabilityDates[2]}`,
                  }"
                  @click="
                    selectSlot(
                      getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[2]
                      ),
                      item,
                      availabilityDates[2]
                    )
                  "
                ></div>
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #3="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[3]
                  ).length > 0
                "
              >
                <div
                  class="book-bg py-4"
                  :class="{
                    selected:
                      selectedSlot.id ===
                      `${getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[3]
                      )}_${item}_${availabilityDates[3]}`,
                  }"
                  @click="
                    selectSlot(
                      getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[3]
                      ),
                      item,
                      availabilityDates[3]
                    )
                  "
                ></div>
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #4="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[4]
                  ).length > 0
                "
              >
                <div
                  class="book-bg py-4"
                  :class="{
                    selected:
                      selectedSlot.id ===
                      `${getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[4]
                      )}_${item}_${availabilityDates[4]}`,
                  }"
                  @click="
                    selectSlot(
                      getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[4]
                      ),
                      item,
                      availabilityDates[4]
                    )
                  "
                ></div>
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
          <template #5="{ item }">
            <div
              class="container cursor-pointer"
              @click="viewSchedule(item.id)"
            >
              <span
                v-if="
                  getPnersForSchedule(
                    item.split('-')[0].trim(),
                    item.split('-')[1].trim(),
                    availabilityDates[5]
                  ).length > 0
                "
              >
                <div
                  class="book-bg py-4"
                  :class="{
                    selected:
                      selectedSlot.id ===
                      `${getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[5]
                      )}_${item}_${availabilityDates[5]}`,
                  }"
                  @click="
                    selectSlot(
                      getScheduleIdForSlot(
                        item.split('-')[0].trim(),
                        item.split('-')[1].trim(),
                        availabilityDates[5]
                      ),
                      item,
                      availabilityDates[5]
                    )
                  "
                ></div>
              </span>
              <span class="16" v-else> -- </span>
            </div>
          </template>
        </cornie-table>
      </div>

      <side-modal
        :visible="showFilter"
        @closesidemodal="() => (showFilter = false)"
      >
        <advanced-filter @applyfilter="applyFilter" />
      </side-modal>
    </div>
  </div>
</template>

<script lang="ts">
import utilservice from "../helper/util";
import dateHelper from "../helper/date-helper";
import AddIcon from "@/components/icons/add.vue";
import Actors from "./actors.vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import slotService from "../../visits/helper/slot-service";
import AdvancedFilter from "./advanced-filter.vue";
import SideModal from "../components/side-modal.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { namespace } from "vuex-class";
import { Practitioner } from "@/types/IPatient";
import SelectedPractitioner from "./selected-practitioner.vue";
import SelectedLocation, { IItem } from "./selected-location.vue";
import ILocation from "@/types/ILocation";
import IDevice from "@/types/IDevice";
import ISchedule from "@/types/ISchedule";

const practitionersStore = namespace("practitioner");
const locationsStore = namespace("location");
const devicesStore = namespace("devices");
const visitsStore = namespace("visits");

@Options({
  components: {
    AddIcon,
    Actors,
    CornieTable,
    SideModal,
    AdvancedFilter,
    CornieSelect,
    SelectedPractitioner,
    SelectedLocation,
  },
})
export default class Availability extends Vue {
  @Prop({ type: Object })
  items!: any;
  @Prop({ type: Object })
  schedules!: any;

  @practitionersStore.Action
  fetchPractitioners!: () => Promise<void>;

  @practitionersStore.State
  practitioners!: Practitioner[];

  @locationsStore.Action
  fetchLocations!: () => Promise<void>;

  @locationsStore.State
  locations!: ILocation[];

  @visitsStore.Action
  schedulesByPractitioner!: (id: string) => Promise<ISchedule[]>;

  @locationsStore.Action
  fetchDevices!: () => Promise<void>;

  @devicesStore.State
  devices!: IDevice[];

  showFilter = false;
  filterOptions: any = {};
  selectedSlots: string[] = [];
  selectedSlot: any = {};

  filteredSlots: any = [];

  get seletedPractitioner() {
    if (!this.filterOptions || !this.filterOptions.byPractitioners) return {};
    const practitioner = this.practitioners.find(
      (practitioner) =>
        practitioner.id === this.filterOptions?.byPractitioners[0]
    );
    if (!practitioner) return {};
    return practitioner;
  }

  get availabilityDates() {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      // let sunday = new Date();
      let sunday = new Date(
        new Date().setDate(
          new Date().getDate() - ((new Date().getDay() + 6) % 6)
        )
      );
      arr.push(new Date(sunday.setDate(sunday.getDate() + i)).toDateString());
    }

    return arr;
  }

  get filteredItems() {
    if (!this.items) return [];
    return this.items.map((timeSlot: string) => {
      return;
    });
  }

  get allLocations() {
    if (!this.locations) return [];
    return this.locations.map((location) => {
      return { code: location.id, display: location.name };
    });
  }

  get allDevices() {
    if (!this.devices) return [];
    return this.devices.map((device) => {
      return { code: device.id, display: location.hostname };
    });
  }

  get availabilityHeaders() {
    if (!this.availabilityDates) return [];
    let arr = this.availabilityDates.map((i: any, index: number) => {
      return {
        title: i,
        key: index.toString(),
        show: true,
        // show: index > 4 ? false : true
      };
    });
    arr.unshift({ title: "Time", key: "time", show: true });
    return arr;
  }

  locaionChanged(newLocation: ILocation) {
    this.locations.unshift(newLocation);
  }

  constructDate(date: string, time: string) {
    return dateHelper.constructDateFromDateAndTime(date, time);
  }

  getPnersForSchedule(startTime: string, endTime: string, date: Date | string) {
    return slotService.getAvailablePractitioners(
      this.schedules,
      startTime,
      endTime,
      date
    );
  }

  getActorsForSchedule(startDate: string | Date, endDate: string | Date) {
    return dateHelper.getPractitionersForSlot(
      this.schedules,
      startDate,
      endDate
    );
  }

  getScheduleIdForSlot(
    startTime: string,
    endTime: string,
    date: Date | string
  ) {
    return slotService.getScheduleIdForSlot(
      this.schedules,
      startTime,
      endTime,
      date
    );
  }

  selectSlot(scheduleId: string, slotTime: any, date: string) {
    this.selectedSlot = {
      startTime: slotService.constructDate(date, slotTime.split(" - ")[0]),
      endTime: slotService.constructDate(date, slotTime.split(" - ")[1]),
      scheduleId,
      id: `${scheduleId}_${slotTime}_${date}`,
    };
    // if (scheduleId) {
    //   const index = this.selectedSlots.findIndex(id => id === `${scheduleId}_${slot}`)
    //   if (index < 0) {
    //     this.selectedSlots.push(`${scheduleId}_${slot}`);
    //   } else {
    //     this.selectedSlots.splice(index, 1)
    //   }
    // }
    console.log(this.selectedSlot, "SL");
  }

  get availableSlots() {
    if (this.filteredSlots?.length === 0) return [];
    return this.filteredSlots;
  }

  isSlotTime(slotTime: string, date: string | Date) {
    return slotService.isSlotTime(this.availableSlots, slotTime, date);
  }

  async applyFilter(filterOpions: any) {
    console.log(filterOpions, "FILTER OPTIONS");
    this.showFilter = false;
    this.showFilter = false;
    this.filterOptions = filterOpions;
    const loadedSchedules: any = await this.schedulesByPractitioner(
      filterOpions.byPractitioners[0]
    );

    const response: any = await slotService.getPractitionersSlots(
      filterOpions.byPractitioners[0]
    );
    console.log(response, "RESPONSE");

    this.filteredSlots = response?.data;
  }

  viewSchedule(id: string) {}

  goToCreateSlot() {
    this.$router.push({
      name: "Edit Slot",
      query: {
        scheduleId: this.selectedSlot.scheduleId,
        startTime: this.selectedSlot.startTime,
        endTime: this.selectedSlot.endTime,
      },
    });
  }

  showFilterPane() {
    this.showFilter = true;
  }

  async created() {
    if (!this.practitioners) await this.fetchPractitioners();
    if (!this.locations) await this.fetchLocations();
    if (!this.devices) await this.fetchDevices();
  }
}
</script>

<style scoped>
.book-bg {
  background-color: #fff0f1 !important;
}

.selected {
  background-color: lightgreen !important;
}
</style>
