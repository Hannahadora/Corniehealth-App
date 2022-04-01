<template>
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
                  ).length > 0"
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
                    )"
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

</template>