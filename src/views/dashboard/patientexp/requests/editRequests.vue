<template>
  <div class="w-full">
    <form  @submit.prevent="submit">
        <div class="mt-5 pb-76 mb-44 bg-white w-full h-full shadow-md p-4 rounded" >
            <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(1)"  :class="{'active' :  selected === 1  }" :aria-selected="selected === 1">Requests Info</a></li>    
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Participants</a></li>
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(3)"  :class="{'active' :  selected === 3  }" :aria-selected="selected === 3">Medication</a></li>
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(4)"  :class="{'active' :  selected === 4  }" :aria-selected="selected === 4">Other Info</a></li>
            </ul>    
            <div class="tab-content">
                <div class="tab-pane" v-if="selected == 1" :class="{'active' :  selected === 1  }" id="Requests Info">      
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabstatus" @click="updateRequest"><save-icon/> <span class="text-sm">Save</span></div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer"  v-else @click="tabstatus = true"><edit-icon/> <span class="text-sm">Edit</span></div>
                    </div> 
                <div>
                    <div class="w-full flex space-x-4 mb-3">
                        <cornie-radio label="Pick-Up"  class="text-xs" name="request" id="pickup" @update:modelValue="changeChecked"/>
                        <cornie-radio label="Ship to Patient Address"  name="request" id="patientadress" checked @update:modelValue="changeChecked"/>
                        <cornie-radio label="Ship to Home Address"  name="request" id="homeaddress" @update:modelValue="changeChecked"/>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mt-5">
                        <div>
                            <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="['Try another treatment first','Prescription requires clarification','Drug level too high','Drug level too high','Admission to hospital','Lab interference issues','Patient not available','Parent is pregnant/breast feeding','Allergy','Drug interacts with another drug','Duplicate therapy','Suspected intolerance','Patient scheduled for surgery','Waiting for old drug to wash out']"
                            v-model="requestModel.requestInfo.statusReason"
                            label="status"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">status</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{requestModel.requestInfo.statusReason}}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-input
                            v-if="tabstatus"
                            label="requisition id"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">requisition id</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-input
                            v-if="tabstatus"
                            label="authored on"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">authored on</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-input
                            v-if="tabstatus"
                            label="encounter"
                            v-model="requestModel.requestDetails.encounter"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">encounter</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{  requestModel.requestDetails.encounter }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="priority"
                             v-model="requestModel.requestInfo.priority"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">priority</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.requestInfo.priority }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="reason ref"
                             v-model="requestModel.requestDetails.reasonReference"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">reason ref</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.requestDetails.reasonReference }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="reason code"
                            v-model="requestModel.requestDetails.reasonCode"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">reason code</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.requestDetails.reasonCode }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="intent"
                            v-model="requestModel.requestInfo.intent"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">intent</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{  requestModel.requestInfo.intent }}</div>
                            </span>
                        </div>
                        <div>
                            <div v-if="tabstatus">
                            <cornie-select
                                :items="allPerformer"
                                v-model="requestModel.medicationAdministration.performer"
                                label="performer"
                                placeholder="--Select--"
                            >
                            </cornie-select>
                            </div>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">performer</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ performername  }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="based on"
                            v-model="requestModel.requestDetails.basedOn"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">based on</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.requestDetails.basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="do not perform"
                            v-model="requestModel.requestInfo.doNotPerform"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">do not perform</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.requestInfo.doNotPerform }}</div>
                            </span>
                        </div>
                    </div>
                </div>
                </div>
                <div class="tab-pane" v-if="selected == 2" :class="{'active' :  selected === 2  }" id="Participants">
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabparticipants" @click="updateRequest"><save-icon/> <span class="text-sm">Save</span></div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer"  v-else @click="tabparticipants = true"><edit-icon/> <span class="text-sm">Edit</span></div>
                    </div> 
                    <div>
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                            Patient Info
                        </span>
                        <div class="w-full flex space-x-4 mb-3">
                            <cornie-radio label="Out-Patient"  class="text-xs" name="participant" id="outpatient"/>
                            <cornie-radio label="In-Patient"  name="participant" id="inpatient" checked/>
                        </div>
                        <div class="grid grid-cols-3 gap-4 mt-5">
                            <div>
                                <span >
                                    <label class="block uppercase mb-1 text-xs font-bold">patient name</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ patientName }}</div>
                                </span>
                            </div>
                            <div>
                                <span >
                                    <label class="block uppercase mb-1 text-xs font-bold">MRN Number</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPatientData.mrn }}</div>
                                </span>
                            </div>
                            <div>
                                <span >
                                    <label class="block uppercase mb-1 text-xs font-bold">gender</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPatientData.gender }}</div>
                                </span>
                            </div>
                            <div>
                            <!-- <cornie-input
                                v-if="tabparticipants"
                                label="Age"
                                placeholder="--Enter--"
                                /> -->
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">Age</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPatientData.dob }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">Address</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">Email</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">Mobile</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                        Requester
                        </span>
                        <div class="grid grid-cols-3 gap-4 mt-5">
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">practitioner name</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ performername }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">practitioner id</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.medicationAdministration.performer }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">facility name</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">address</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">email</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">mobile</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                        </div>
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                        Performer
                        </span>
                        <div class="grid grid-cols-3 gap-4 mt-5"> 
                            <div>
                                 <cornie-select
                                v-if="tabparticipants"
                                class="mt-0"
                                :items="allPerformer"
                                v-model="requestModel.medicationAdministration.performerType"
                                label="performer"
                                placeholder="--Select--"
                                >
                                </cornie-select>
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">performer type</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.medicationAdministration.performerType }}</div>
                                </span>
                            </div>
                            <div>
                                <cornie-select
                                v-if="tabparticipants"
                                class="mt-0"
                                :items="allPerformer"
                                v-model="requestModel.medicationAdministration.performer"
                                label="performer"
                                placeholder="--Select--"
                                >
                                </cornie-select>
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">performer</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ performername }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">corniehealth id</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.userId }}</div>
                                </span>
                            </div>

                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">address</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">email</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">mobile</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                        </div>
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                        Dispenser
                        </span>
                        <div class="grid grid-cols-3 gap-4 mt-5"> 
                            <div>
                                 <div  v-if="tabparticipants">
                                <cornie-select
                                class="mt-0"
                                :items="allPerformer"
                                v-model="requestModel.performer.dispenserType"
                                label="dispenser"
                                placeholder="--Select--"
                                >
                                </cornie-select>
                                </div>
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">dispenser type</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.performer.dispenserType }}</div>
                                </span>
                            </div>
                            <div>
                                <div  v-if="tabparticipants">
                                <cornie-select
                                class="mt-0"
                                :items="allPerformer"
                                v-model="requestModel.performer.dispenser"
                                label="dispenser"
                                placeholder="--Select--"
                                >
                                </cornie-select>
                                </div>
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">dispenser</label>
                                    <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ dispenserName }}</div>
                                </span>
                            </div>
                        </div>
                    </div>
                    

                </div>
                 <div class="tab-pane" v-if="selected == 3" :class="{'active' :  selected === 3  }" id="Medication">
                    <div class="mt-10">
                        <cornie-table :columns="rawHeaders" v-model="items">
                            <template #actions="{ item }">
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-request/${item.id}`)">
                                <newview-icon  class="text-yellow-500 fill-current"/>
                                <span class="ml-3 text-xs">View</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer">
                                <update-icon />
                                <span class="ml-3 text-xs">Update</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer">
                                <plus-icon class="text-primary fill-current"/>
                                <span class="ml-3 text-xs">Add Appointment</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer">
                                <plus-icon class="text-green-500 fill-current"/>
                                <span class="ml-3 text-xs">Add Task</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer" @click="makeNotes(item.id)">
                                <note-icon class="text-purple-700 fill-current"/>
                                <span class="ml-3 text-xs">Make Notes</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-50 p-3 cursor-pointer" @click="deleteItem(item.id)">
                                <message-icon class="text-blue-700 fill-current"/>
                                <span class="ml-3 text-xs">Message</span>
                                </div>
                            </template>
                        </cornie-table>
                    </div>
                </div>      
                <div class="tab-pane pb-20" v-if="selected == 4" :class="{'active' :  selected === 4  }" id="Other Info">
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabhealth" @click="updateRequest"><save-icon/> <span class="text-sm">Save</span></div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer"  v-else @click="tabhealth = true"><edit-icon/> <span class="text-sm">Edit</span></div>
                    </div>
                    <div>
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                        Known Medication Allergies
                        </span> 
                        <div class="w-full">
                        <div class="w-full grid grid-cols-3 gap-4 mt-5">
                            <div class="border-r-2">
                                <div class="mb-8 p-2">
                                    <span   v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                    <p class="text-sm text-black">Aspirin</p>
                                </div>
                                <div class="p-2">
                                    <span v-if="tabhealth">
                                        <deleteorange-icon class="float-right" />
                                        </span>
                                    <p class="text-sm text-black">Codeine</p>
                                </div>
                            </div>
                            <div class="border-r-2">
                                <div class="mb-8 p-2">
                                    <span   v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                    <p class="text-sm text-black">Penicillin</p>
                                </div>
                                <div class="p-2">
                                    <span   v-if="tabhealth">
                                        <deleteorange-icon class="float-right" />
                                        </span>
                                    <p class="text-sm text-black">Aspirin</p>
                                </div>
                            </div>
                            <div>
                                <div class="mb-8 p-2">
                                    <span   v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                    <p class="text-sm text-black">Codeine</p>
                                </div>
                                <div class="p-2">
                                    <span v-if="tabhealth">
                                        <deleteorange-icon class="float-right" />
                                        </span>
                                    <p class="text-sm text-black">Penicillin</p>
                                </div>
                            </div>     
                        </div>
                        <div class="float-right flex space-x-4 mt-3 text-sm text-primary font-semibold"><plus-icon class="mt-1 mr-2 text-primary fill-current"/> Add Another</div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <span
                            class="
                                flex
                                border-b-2
                                border-dark-100
                                w-full
                                text-lg text-dark
                                py-2
                                mx-auto
                                font-semibold
                                col-span-full
                                mb-4
                                mt-5
                            "
                            >
                        Other Known Health Conditions
                        </span> 
                    <div class="w-full">
                        <div class="w-full grid grid-cols-3 gap-4 mt-5">
                            <div class="border-r-2">
                                <div class="mb-8 p-2">
                                    <span   v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                    <p class="text-sm text-black">Depression</p>
                                </div>
                            <div class="p-2">
                                <span v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                <p class="text-sm text-black">Asthma</p>
                            </div>
                            </div>
                            <div class="border-r-2">
                                <div class="mb-8 p-2">
                                    <span   v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                    <p class="text-sm text-black">Depression</p>
                                </div>
                            <div class="p-2">
                                <span   v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                <p class="text-sm text-black">Diabetes</p>
                            </div>
                            </div>
                            <div>
                                <div class="mb-8 p-2">
                                    <span   v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                    <p class="text-sm text-black">Seizures</p>
                                </div>
                            <div class="p-2">
                                <span v-if="tabhealth">
                                    <deleteorange-icon class="float-right" />
                                    </span>
                                <p class="text-sm text-black">Diabetes</p>
                            </div>
                            </div>     
                        </div>
                        <div class="float-right flex space-x-4 mt-3 text-sm text-primary font-semibold"><plus-icon class="mt-1 mr-2 text-primary fill-current"/> Add Another</div>
                        </div>
                    </div>
                    <div class="w-full mt-20 grid grid-cols-3 gap-4">
                        <div>
                            <cornie-select
                            v-if="tabhealth"
                            class="mt-0"
                            :items="['Test']"
                            v-model="requestModel.fufillment.affixLabel"
                            label="affix label?"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">affix label?</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.fufillment.affixLabel }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                            v-if="tabhealth"
                            class="mt-0"
                            :items="['Test']"
                            v-model="requestModel.fufillment.nonSafetyCapRequest"
                            label="Substitution permitted?"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">Substitution permitted?</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.fufillment.nonSafetyCapRequest }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-select
                            v-if="tabhealth"
                            class="mt-0"
                            :items="['Test']"
                            v-model="requestModel.fufillment.nonSafetyCapRequest"
                            label="non-safety cap request?"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">non-safety cap request?</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.fufillment.nonSafetyCapRequest }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                            v-if="tabhealth"
                            class="mt-0"
                            :items="['Test']"
                            v-model="requestModel.fufillment.priorityShipping"
                            label="priority shipping?"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">priority shipping?</label>
                                <div class="bg-gray-50 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ requestModel.fufillment.priorityShipping }}</div>
                            </span>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
       <div class="-mt-44 mb-20">
            <span class="flex justify-end w-full">
                <button
                    @click="$router.push('/dashboard/provider/experience/requests')"
                    type="button"
                    class="
                    outline-primary
                    rounded-full
                    text-black
                    mt-5
                    mr-3
                    py-2
                    pr-14
                    pl-14
                    px-3
                    focus:outline-none
                    hover:bg-primary
                    hover:text-white
                    "
                >
                    Close
                </button>
            </span>
       </div>     
    </form>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AccordionComponent from "@/components/accordion-extended-component.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import Availability from "@/components/availability.vue";
import IRequest from "@/types/IRequest";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import search from "@/plugins/search";
import { Prop, Watch } from "vue-property-decorator";
import PractitionersFilter from "@/components/practitioner.vue";
import PatientsFilter from "@/components/patient.vue";
import DevicesFilter from "@/components/device.vue";
import RolesFilter from "@/components/roles.vue";
import DEdit from "@/components/icons/aedit.vue";
import CDelete from "@/components/icons/adelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import EditIcon from "@/components/icons/orangeedit.vue";
import SaveIcon from "@/components/icons/save.vue";
import SingleDatePicker from "@/components/datepicker.vue";
import DatePicker from "@/components/daterangepicker.vue";
import Period from "@/types/IPeriod";
import Avatar from "@/components/avatar.vue";
import Table from "@scelloo/cloudenly-ui/src/components/table";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import { first, getTableKeyValue } from "@/plugins/utils";
//import CloseIcon from "@/components/icons/CloseIcon.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";

const request = namespace("request");
const emptyRequest: IRequest = {
  requestInfo: {},
  requestDetails: {},
  subject: {},
  performer: {},
  medicationAdministration: {},
  fufillment: {},
  history: {},
  Medications: Array(),


};
@Options({
  components: {
    CornieInput,
    CornieSelect,
    SaveIcon,
    EditIcon,
    CornieTable,
    PractitionersFilter,
    SingleDatePicker,
    Availability,
    Textarea,
    CornieRadio,
    CornieDialog,
    CardText,
    DeleteorangeIcon,
    DEdit,
    CDelete,
    Avatar,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
    AccordionComponent,
    PatientsFilter,
    DevicesFilter,
    RolesFilter,
    CancelIcon,
    SortIcon,
    CheckinIcon,
    NewviewIcon,
    UpdateIcon,
    NoteIcon,
    ThreeDotIcon,
    PlusIcon,
    SearchIcon,
    MessageIcon,
    PrintIcon,
    TableRefreshIcon,
    FilterIcon,
    IconInput,
    ColumnFilter,
    TableOptions,
    DeleteIcon,
    EyeIcon,
  },
})
export default class AddAppointment extends Vue {
 @Prop({ type: String, default: "" })
  id!: string;

//   @Prop({ type: Object, required: false, default: { ...emptyRequest} })
//   request!: IRequest;

  requestModel = {...emptyRequest} as IRequest;

  @request.Action
  getRequestById!: (id: string) => IRequest;
  @request.State
  requests!: any[];

//   @Watch("request")
//   requestUpdated(request: IRequest) {
//     this.requestModel = JSON.parse(JSON.stringify({ ...request }));
//   }


  @request.Mutation
  updatedRequests!: any;
@request.State
  patients!: any[];

  @request.State
  practitioners!: any[];

  @request.Action
  getPatients!: () => Promise<void>;

  @request.Action
  getPractitioners!: () => Promise<void>;

  loading = false;
  expand = false;
  isVisible = "";
  startdate = "";
   selected = 1;
  enddate = "";
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  openedM = false;
    query = "";
  showMedicationModal = false;
 tabstatus = false;
 tabsubject = false;
 tabparticipants = false;
 tabbg = false;
 tabmed = false;
 tabhealth= false;
 tabother = false;

  performername = "";
  patientName = "";
dispenserName ="";
  selectedPatient : any = { };
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auust', 'September', 'October', 'November', 'December' ]

mrn="";
gender="";
age=0;
address="";
email="";
mobile="";
  patient=[];
  practitioner=[];

dispenser="";
subject="";
requester="";
performer="";

basedOn = "xxxxxx";

  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];

  required = string().required();
 

  get isUpdate() {
    return Boolean(this.id);
  }

  @Watch("id")
  idChanged() {
    this.setRequest();
  }
  
  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "medication code", key: "code", show: true },
    {
      title: "Medication Name",
      key: "name",
      show: true,
    },
    {
      title: "strength",
      key: "strength",
      show: true,
    },
    {
      title: "Quantity",
      key: "quantity",
      show: true,
    },
    {
      title: "dosage (daily)",
      key: "dosage",
      show: true,
    },
    {
      title: "duration",
      key: "duration",
      show: true,
    },
    {
      title: "course of therapy",
      key: "course",
      show: true,
    },
     {
      title: "substitution?",
      key: "substitution",
      show: false,
    },
     {
      title: "reason code",
      key: "reasoncode",
      show: false,
    },
     {
      title: "refill?",
      key: "refill",
      show: false,
    },
     {
      title: "dispense interval",
      key: "interval",
      show: false,
    },
     {
      title: "validity period",
      key: "period",
      show: false,
    },
     {
      title: "no of refill",
      key: "refillno",
      show: false,
    },
     {
      title: "quantity",
      key: "qunatity",
      show: false,
    },
     {
      title: "supply duration",
      key: "duration",
      show: false,
    },
   
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return [...first(4, headers), { title: "", value: "action", image: true }];
  }


  get items() {
    const requests = this.requests[0].Medications.map((request:any) => {
       (request as any).createdAt = new Date(
         (request as any).createdAt 
       ).toLocaleDateString("en-US");
        (request as any).medicationDetails.duration.start = new Date(
         (request as any).medicationDetails.duration.start 
       ).toLocaleDateString("en-US");
        (request as any).medicationDetails.duration.end = new Date(
         (request as any).medicationDetails.duration.end 
       ).toLocaleDateString("en-US");
        return {
        ...request,
        code:request.medicationDetails.medicationCode,
        name: request.medicationDetails.medicationReference,
        strength: "xxxxxx",
        quantity: request.medicationDetails.quantity,
        course: request.medicationDetails.courseOfTherapyType,
        reasoncode: request.substitutionAllowed.code,
        interval: request.refillInfo.dispenseInterval,
        period: request.medicationDetails.createdAt,
        refillno: request.refillInfo.quantity,
        duration:request.medicationDetails.duration.start +'-'+ request.medicationDetails.duration.end,
        dosage:request.medicationDetails.dosageInstruction,



        //  action: request.id,
        //  keydisplay: "XXXXXXX",
        //  Participants: singleParticipantlength 
        };
    });
    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }

  get PatientName() {
    const id = this.requestModel.subject.subject;
    const pt = this.patients.find((i: any) => i.id === id);
    this.patientName = `${pt.firstname}  ${pt.lastname}`;
    this.selectedPatient = pt ? pt : { };

    return pt ? `${pt.firstname} ${pt.lastname}` : '';
  }
  get selectedPatientData() {
    const data = this.selectedPatient;
    return {
      gender: data.gender,
      dob: Math.floor(( Date.now() - new Date(data.dateOfBirth).getTime()) / 3.15576e+10),
      mrn: data.mrn,
    }
  }

    get PractitionerName(){
     const id = this.requestModel.medicationAdministration.performer; 
    const pt = this.practitioners.find((i: any) => i.id === id);
        this.performername = `${pt.firstName} ${pt.lastName}`;
        return pt ? `${pt.firstName} ${pt.lastName}` : '';
    }
    get NewDispenserName(){
     const id = this.requestModel.performer.dispenser; 
    const pt = this.practitioners.find((i: any) => i.id === id);
        this.dispenserName = `${pt.firstName} ${pt.lastName}`;
        return pt ? `${pt.firstName} ${pt.lastName}` : '';
    }


  async setRequest() {
    const request = await this.getRequestById(this.id)
    if (!request) return
    this.requestModel =  ({...request}) ;
    this.requestModel.Medications = request.Medications;
  }
  get payload() {
     const model = JSON.parse(JSON.stringify({ ...this.requestModel }));
   // const medication = model.medications.medicationDetails as any;
    // if (medication.duration)
    //   medication.duration = new Date(
    //     medication.duration
    //   ).toISOString();
    //   if (medication.dispenseInterval)
    //   medication.dispenseInterval = new Date(
    //     medication.dispenseInterval
    //   ).toISOString();
    return model;

  }
    select(i:number) {
      this.selected = i;
    }
  get allaction() {
    return this.id ? "Edit" : "New";
  }
 get allPerformer() {
     if (!this.practitioner || this.practitioner.length === 0) return [ ];
     return this.practitioner.map((i: any) => {
         return {
             code: i.id,
             display: i.firstName +' '+ i.lastName,
         }
     })
 }
 get allRequester() {
     if (!this.patient || this.patient.length === 0) return [ ];
     return this.patient.map((i: any) => {
         return {
             code: i.id,
             display: i.firstname +' '+ i.lastname,
         }
     })
 }
  async showMedication(value:any){
    this.requestModel.Medications = value;
    this.showMedicationModal = true;
  }

  async submit() {
    this.loading = true;
   await this.updateRequest();
    this.loading = false;
  }

  async updateRequest() {
     const id = this.id;
    const url = `/api/v1/requests/${id}`;
    const payload = this.payload ;
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
          this.updatedRequests([response.data]);
        window.notify({ msg: "Request Updated", status: "success" });
        this.$router.push("/dashboard/provider/experience/requests");
      }
    } catch (error) {
      window.notify({ msg: "Request not Updated", status: "error" });
    }
  }
  async fetchPateints() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patient = response[0].data;
  }
 async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioner = response[0].data;
  }

  async created() {
      this.fetchPateints();
     this.setRequest();
    this.fetchPractitioner();
    this.getPractitioners();
    this.getPatients();
  }
}
</script>
<style>
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
  font-style: italic;
}
.outline-primary {
  border: 2px solid #080056;
}
.required label::after {
  content: "*";
  color: #fe4d3c;
  margin-left: 5px;
}
</style>
