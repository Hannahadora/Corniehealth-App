<template>
  <div
    class="w-full bg-white p-4 overflow-y-scroll topest"
    style="height: 100vh; overflow-y: scroll"
  >
    <!-- <div class="container-fluid bg-gray-500" style="heigth: 100vh">
            <EmptyState />
        </div> -->
    <div class="container-fluid flex" v-if="true">
      <div class="" style="width: 25%">
        <div class="container">
          <!-- <div class="overflow-hidden bg-white rounded max-w-xs leading-normal">
                        <a href="#" class="block group hover:bg-blue p-4">
                            <p class="font-normal text-lg mb-1 text-black">Practitioner Profile</p>
                        </a>
                        <a href="#" class="block group hover:bg-blue p-4">
                            <p class="font-normal text-lg mb-1 text-black">Domains</p>
                        </a>
                        <a href="#" class="block group hover:bg-blue p-4">
                            <p class="font-normal text-lg mb-1 text-black">User Security</p>
                        </a>
                        <a href="#" class="block group hover:bg-blue p-4">
                            <p class="font-normal text-lg mb-1 text-black">Signature</p>
                        </a>
                    </div> -->
          <UserNav />
        </div>
      </div>
      <div class="border-l-2 px-2" style="width: 75%">
        <router-view></router-view>
        <!-- <div class="container-fluid">
                    <div class="w-full border-b-2 curved flex py-2">
                        <div class="container-fluid flex font-semibold text-xl py-2">
                            <h2>Set Up Profile</h2>
                        </div>
                    </div>

                    <div class="w-full my-6 border">
                        <div class="container-fluid">
                            <Accordion title="Basic Info" v-model="showDetails" class="" :opened="true">
                                <div class="w-full px-4">
                                    <div class="container">
                                        <span class="flex items-center mt-3 mb-3">
                                            <avatar class="mr-2" v-if="img.url" :src="img.url" />
                                            <avatar class="mr-2" v-else :src="img.placeholder" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                name="image"
                                                id="file"
                                                @change="img.onChange"
                                                hidden
                                            />
                                            <label for="file" class="text-pink-600 font-bold cursor-pointer">
                                                Upload
                                            </label>
                                        </span>
                                    </div>
                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput v-model="shift.name" label="Identifier"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="active state" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="Type" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                    </div>

                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput v-model="shift.name" label="name (first and last)"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <DatePicker label="Gender" style="width:max-width:100%" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="Type" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                    </div>

                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput v-model="shift.name" label="Identifier"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="active state" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <PhoneInput label="Type" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                    </div>

                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput v-model="shift.name" label="Department"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="access role" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                        </div>
                                    </div>
                                </div>
                            </Accordion>

                            <Accordion title="Qualification" v-model="showTiming" class="my-6">
                                <div class="w-full px-4">
                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput v-model="shift.name" label="identifier"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="Code" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <DatePicker label="Period" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                    </div>

                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput v-model="shift.name" label="Issuer"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="Communication" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="LICENSE NUMBER" v-model="shift.description"  placeholder="--Enter--" />
                                        </div>
                                    </div>
                                </div>
                            </Accordion>

                            <Accordion title="Available Time" v-model="showBreaks" class="mt-6">
                                <div class="w-full px-4">
                                    <div class="container my-3">
                                        <label class="inline-flex items-center">
                                            <input type="checkbox" class="form-radio h-6 w-6"  name="schedule">
                                            <span class="ml-2">All days</span>
                                        </label>
                                    </div>

                                    <div class="container flex">
                                        <div class="w-2/12">
                                        </div>
                                        <div class="w-2/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <span class="font-bold uppercase text-sm">Start</span>
                                                </div>
                                                <div class="w-6/12">
                                                    <span class="font-bold uppercase text-sm">Stop</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-2/12">
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-radio h-6 w-6"  name="schedule">
                                                <span class="ml-2">Monday</span>
                                            </label>
                                        </div>
                                        <div class="w-2/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-2/12">
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-radio h-6 w-6"  name="schedule">
                                                <span class="ml-2">Tuesday</span>
                                            </label>
                                        </div>
                                        <div class="w-2/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-2/12">
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-radio h-6 w-6"  name="schedule">
                                                <span class="ml-2">Wednesday</span>
                                            </label>
                                        </div>
                                        <div class="w-2/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-2/12">
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-radio h-6 w-6"  name="schedule">
                                                <span class="ml-2">Thursday</span>
                                            </label>
                                        </div>
                                        <div class="w-2/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-2/12">
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-radio h-6 w-6"  name="schedule">
                                                <span class="ml-2">Friday</span>
                                            </label>
                                        </div>
                                        <div class="w-2/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-2/12">
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-radio h-6 w-6"  name="schedule">
                                                <span class="ml-2">Saturday</span>
                                            </label>
                                        </div>
                                        <div class="w-2/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-2/12">
                                            <label class="inline-flex items-center">
                                                <input type="checkbox" class="form-radio h-6 w-6"  name="schedule">
                                                <span class="ml-2">Sunday</span>
                                            </label>
                                        </div>
                                        <div class="w-2/12">
                                            <div class="container flex">
                                                <div class="w-6/12 mr-3">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" v-model="shift.timeTo" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-4/12">
                                            <CornieInput v-model="shift.name" label="availability exceptions"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput v-model="shift.name" label="consulation channel"  placeholder="--Enter--" />
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        </div>
                    </div>

                </div> -->
        <!-- <div class="w-full mb-12">
                    <div class="container-fluid my-8 flex justify-end items-center">
                        <corniebtn :loading="false">
                            <router-link :to="{ name: 'Patient Experience Management' }" class="cursor-pointer focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full">
                                Cancel
                            </router-link>
                        </corniebtn>
                        <Button :loading="loading">
                            <a @click="saveShift"  style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                                Save 
                            </a>
                        </Button>
                    </div>
                </div> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserNav from "./components/user-nav.vue";

@Options({
  components: {
    UserNav,
  },
})
export default class PSecurity extends Vue {}
</script>
<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.topest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.topest {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
