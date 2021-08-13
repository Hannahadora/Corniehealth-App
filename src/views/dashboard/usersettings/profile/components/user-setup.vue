<template>
    <div class="container-fluid topest" style="height: 100vh; overflow-y:scroll">
        <div class="w-full">
            <div class="container-fluid">
                    <div class="w-full border-b-2 curved flex py-2">
                        <div class="container-fluid flex font-semibold text-xl py-2">
                            <h2>Set Up Profile</h2>
                        </div>
                    </div>

                    <div class="w-full my-6 border">
                        <div class="container-fluid">
                            <Accordion title="Basic Info" v-model="show" class="" :first="true">
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
                                            <CornieInput label="Identifier" v-model="data.id"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="active state"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="Type"  placeholder="--Enter--" />
                                        </div>
                                    </div>

                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput  label="name (first and last)"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <DatePicker label="Gender" style="width:max-width:100%"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="Type"  placeholder="--Enter--" />
                                        </div>
                                    </div>

                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput  label="Identifier"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="active state"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <PhoneInput label="Type"  placeholder="--Enter--" />
                                        </div>
                                    </div>

                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput  label="Department"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="access role"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                        </div>
                                    </div>
                                </div>
                            </Accordion>

                            <Accordion title="Qualification" v-model="show" class="my-6">
                                <div class="w-full px-4">
                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput  label="identifier"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="Code"   placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <DatePicker label="Period"   placeholder="--Enter--" />
                                        </div>
                                    </div>

                                    <div class="container-fluid py-3 flex justify-around">
                                        <div class="w-4/12">
                                            <CornieInput label="Issuer"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="Communication" placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="LICENSE NUMBER" placeholder="--Enter--" />
                                        </div>
                                    </div>
                                </div>
                            </Accordion>

                            <Accordion title="Available Time"  class="mt-6">
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
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
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
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
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
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
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
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
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
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
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
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
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
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                                <div class="w-6/12">
                                                    <label for="">
                                                        <input type="time" class="w-full border rounded p-2" id="appt" name="appt" required>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="container flex my-3">
                                        <div class="w-4/12">
                                            <CornieInput label="availability exceptions"  placeholder="--Enter--" />
                                        </div>
                                        <div class="w-4/12">
                                            <CornieInput label="consulation channel"  placeholder="--Enter--" />
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        </div>
                    </div>

            </div>
            <div class="w-full mb-12">
                <div class="container-fluid my-8 flex justify-end items-center">
                    <corniebtn :loading="false">
                        <router-link :to="{ name: 'Patient Experience Management' }" class="cursor-pointer focus:outline-none text-gray-500 border mr-6 font-bold py-3 px-8 rounded-full">
                            Cancel
                        </router-link>
                    </corniebtn>
                    <Button :loading="false">
                        <a  style="background: #FE4D3C" class="bg-red-500 hover:bg-blue-700 cursor-pointer focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                            Save 
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, setup, Vue } from "vue-class-component";
import { useHandleImage } from "@/composables/useHandleImage";
import Accordion from '@/components/accordion-component.vue';
import Button from '@/components/globals/corniebtn.vue';
import CornieInput from '@/components/cornieinput.vue';
import DatePicker from '@/components/datepicker.vue';
import Avatar from '@/components/avatar.vue'

@Options({
    components: {
        Accordion,
        Button,
        DatePicker,
        Avatar,
        CornieInput,
    }
})

export default class USerSetup extends Vue {
    show = true;
    data: any = { }
    img = setup(() => useHandleImage());
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.topest::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.topest {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
