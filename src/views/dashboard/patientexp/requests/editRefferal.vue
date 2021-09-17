<template>
  <div class="w-full">
    <form  @submit.prevent="submit">
        <div class="mt-5 pb-76 mb-44 bg-white w-full h-full shadow-md p-4 rounded" >
            <ul class="nav nav-tabs nav-tabs-bottom widget_categories">
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(1)"  :class="{'active' :  selected === 1  }" :aria-selected="selected === 1">Request Info</a></li>    
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(2)"  :class="{'active' :  selected === 2  }" :aria-selected="selected === 2">Participants</a></li>
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(3)"  :class="{'active' :  selected === 3  }" :aria-selected="selected === 3">Activity</a></li>
                <li class="nav-item cursor-pointer"><a class="nav-link" @click="select(4)"  :class="{'active' :  selected === 4  }" :aria-selected="selected === 4">Other Info</a></li>
            </ul>    
            <div class="tab-content">
                <div class="tab-pane" v-if="selected == 1" :class="{'active' :  selected === 1  }" id="Request">      
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabstatus"><save-icon/> <span class="text-sm">Save</span></div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer"  v-else @click="tabstatus = true"><edit-icon/> <span class="text-sm">Edit</span></div>
                    </div> 
                <div>
                    <div class="w-full mb-5">
                        <p class="text-sm relative top-14 w-full text-black uppercase font-bold">Preffered Consultation Medium</p>
                        <div class="w-full flex space-x-4 mb-3">
                            <cornie-radio label="In-Person"  class="text-xs" name="request" id="pickup" @update:modelValue="changeChecked"/>
                            <cornie-radio label="Virtual"  name="request" id="patientadress" checked @update:modelValue="changeChecked"/>
                            <cornie-radio label="Home Care"  name="request" id="homeaddress" @update:modelValue="changeChecked"/>
                        </div>
                    </div>
                    <div class="w-full">
                        <p class="text-sm relative w-full text-black uppercase font-bold">specimen collection</p>
                        <div class="w-full flex space-x-4  mb-3">
                            <cornie-radio label="Walk-In"  class="text-xs" name="request" id="pickup" @update:modelValue="changeChecked"/>
                            <cornie-radio label="At-Home"  name="request" id="patientadress" checked @update:modelValue="changeChecked"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mt-5">
                        <div>
                            <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="status"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">status</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
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
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
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
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-input
                            v-if="tabstatus"
                            label="priority"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">priority</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="precondition code"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">precondition code</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="reason reference"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">reason reference</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="reason code"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">reason code</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="intent"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">intent</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="replaces"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">replaces</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="do not perform"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">do not perform</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="activity definition"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">activity definition</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="based on"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">based on</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-input
                            v-if="tabstatus"
                            label="encounter"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">encounter</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-input
                            v-if="tabstatus"
                            label="precondition"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">precondition</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-input
                            v-if="tabstatus"
                            label="supporting info"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">supporting info</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
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
                    Payment Info
                    </span>
                    <div class="grid grid-cols-3 gap-4 mt-5">
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="wallet"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">wallet</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="card on file"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">card on file</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="cash"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">cash</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="payer"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">payer</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="policy number"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">policy number</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-input
                            v-if="tabstatus"
                            label="policy expiry"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">policy expiry</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-input
                            v-if="tabstatus"
                            label="total outstanding"
                            placeholder="--Enter--"
                            />
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">total outstanding</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                    </div>
                </div>
                </div>
                <div class="tab-pane" v-if="selected == 2" :class="{'active' :  selected === 1  }" id="Participants">
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabparticipants"><save-icon/> <span class="text-sm">Save</span></div>
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
                            <cornie-input
                                v-if="tabparticipants"
                                label="patient name"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">patient name</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <cornie-input
                                v-if="tabparticipants"
                                label="MRN Number"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">MRN Number</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <cornie-select
                                v-if="tabparticipants"
                                class="mt-0"
                                :items="dropdowns.serviceCategory"
                                v-model="serviceCategory"
                                label="gender"
                                placeholder="--Select--"
                                >
                                </cornie-select>
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">gender</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="Age"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">Age</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="Address"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">Address</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="Email"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">Email</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="Mobile"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">Mobile</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
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
                            <cornie-input
                                v-if="tabparticipants"
                                label="practitioner name"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">practitioner name</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="practitioner id"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">practitioner id</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="facility name"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">facility name</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="address"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">address</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="email"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">email</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="mobile"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">mobile</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
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
                            <cornie-input
                                v-if="tabparticipants"
                                label="performer type"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">performer type</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <cornie-select
                                v-if="tabparticipants"
                                class="mt-0"
                                :items="dropdowns.serviceCategory"
                                v-model="serviceCategory"
                                label="performer"
                                placeholder="--Select--"
                                >
                                </cornie-select>
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">performer</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="corniehealth id"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">corniehealth id</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>

                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="location code"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">location code</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="address"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">address</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="email"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">email</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                            <cornie-input
                                v-if="tabparticipants"
                                label="mobile"
                                placeholder="--Enter--"
                                />
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">mobile</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="tab-pane" v-if="selected == 3" :class="{'active' :  selected === 3  }" id="Activity">
                    <div class="mt-10">
                        <cornie-table :columns="rawHeaders" v-model="items">
                            <template #actions="{ item }">
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="$router.push(`/dashboard/experience/edit-request/${item.id}`)">
                                <newview-icon  class="text-yellow-500 fill-current"/>
                                <span class="ml-3 text-xs">View</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                                <update-icon />
                                <span class="ml-3 text-xs">Update</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                                <plus-icon class="text-primary fill-current"/>
                                <span class="ml-3 text-xs">Add Appointment</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
                                <plus-icon class="text-green-500 fill-current"/>
                                <span class="ml-3 text-xs">Add Task</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="makeNotes(item.id)">
                                <note-icon class="text-purple-700 fill-current"/>
                                <span class="ml-3 text-xs">Make Notes</span>
                                </div>
                                <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer" @click="deleteItem(item.id)">
                                <message-icon class="text-blue-700 fill-current"/>
                                <span class="ml-3 text-xs">Message</span>
                                </div>
                            </template>
                            <template #Participants="{ item }">
                                <div class="flex items-center">
                                <span class="text-xs">{{item.Participants}}</span>
                                <eye-icon class="cursor-pointer ml-3 " @click="displayParticipants(item.id)"/>
                                </div>
                            </template>
                        </cornie-table>
                    </div>
                </div>
                <div class="tab-pane" v-if="selected == 4" :class="{'active' :  selected === 4  }" id="Other info">
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabbg"><save-icon/> <span class="text-sm">Save</span></div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer"  v-else @click="tabbg = true"><edit-icon/> <span class="text-sm">Edit</span></div>
                    </div> 
                    <div class="w-full">
                    <div class="w-full grid grid-cols-3 gap-4 mt-5">
                         <div>
                            <cornie-select
                            v-if="tabbg"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="comments"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">comments</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                            v-if="tabbg"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="link form"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">link form</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                         <div>
                            <cornie-select
                            v-if="tabbg"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="history"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">history</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                         <div>
                            <cornie-select
                            v-if="tabbg"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="patient instruction"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">patient instruction</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                    </div>
                </div>
                </div>
               
                <div class="tab-pane pb-20" v-if="selected == 5" :class="{'active' :  selected === 5  }" id="Health Conditions">
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabhealth"><save-icon/> <span class="text-sm">Save</span></div>
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
                </div>
                <div class="tab-pane" v-if="selected == 6" :class="{'active' :  selected === 6  }" id="Other Info">
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabother"><save-icon/> <span class="text-sm">Save</span></div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer"  v-else @click="tabother = true"><edit-icon/> <span class="text-sm">Edit</span></div>
                    </div> 
                    <div class="w-full">
                    <div class="w-full grid grid-cols-3 gap-4 mt-5">
                        <div>
                            <cornie-select
                            v-if="tabother"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="affix label?"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">affix label?</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                            v-if="tabother"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="Substitution permitted?"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">Substitution permitted?</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                        <cornie-select
                            v-if="tabother"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="non-safety cap request?"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">non-safety cap request?</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                            v-if="tabother"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="serviceCategory"
                            label="priority shipping?"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">priority shipping?</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                            </span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
       <div class="-mt-44 mb-20">
            <span class="flex justify-end w-full">
                <button
                    @click="$router.push('/dashboard/provider/experience/appointments')"
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
import IAppointment, {ParticipantDetail}  from "@/types/IAppointment";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { first } from "@/plugins/utils";
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
//import CloseIcon from "@/components/icons/CloseIcon.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import NoteIcon from "@/components/icons/notes.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";





const appointment = namespace("appointment");
const dropdown = namespace("dropdown");

const emptyParticipant: ParticipantDetail = {
  period: {} as Period,
  required: "",
  consultationMedium: "",
  
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


  @appointment.Action
  getAppointmentById!: (id: string) => IAppointment;

@appointment.State
  appointments!: IAppointment[];

  loading = false;
  expand = false;
  selected = 1;
  isVisible = "";
  startdate = "";
  enddate = "";
  rule = true;
  opened = true;
  openedR = true;
  openedS = true;
  checked= false;
 tabstatus = false;
 tabsubject = false;
 tabparticipants = false;
 tabbg = false;
 tabmed = false;
 tabhealth= false;
 tabother = false;


actor = "";
  type = "";

  serviceCategory = "";
  locationId = null;
  deviceId = null;
  serviceType = "";
  specialty = "";
  appointmentType = "";
  reasonCode = "";
  reasonRef = "";
  priority = "";
  description = "";
  supportingInfo ="";
  slot = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  basedOn = "xxxxxx";
  duration = "";
  comments = "";
  patientInstruction = "";
  period = {} as Period;
  participantDetail = {...emptyParticipant}
  
  Practitioners = [];
  Devices = [];
  Patients: any[] = [];
  roles = [];

  newPractitioners =[];
  newDevices = [];
  newPatients =[];
  newRoles = [];

  roleFilter = false;
  deviceFilter = false;
  practitionerFilter = false;
  patientFilter = false;
  availableFilter = false;
  participantitem = "";

  practitioner = [];
  device  = [];
  patient = [];
  role = [];
 
  availability: any[] = [];
  availabilities = Array();
 

 

  options = [
    { text: "Active", value: true },
    { text: "Inactive", value: false },
  ];
  required = string().required();
  dropdowns = {} as IIndexableObject;
  dropdowns2 = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Watch("id")
  idChanged() {
    this.setAppointment();
  }
   query = "";

  preferredHeaders = [];
  rawHeaders = [
    { title: "Identifier", key: "keydisplay", show: true },
    {
      title: "Patient",
      key: "patients",
      show: false,
    },
    {
      title: "Appointment Type",
      key: "appointmentType",
      orderBy: (a: IAppointment, b: IAppointment) => a.appointmentType < b.appointmentType ? -1 : 1,
      show: true,
    },
    {
      title: "Participants",
      key: "Participants",
      show: true,
    },
    {
      title: "Slot",
      key: "slot",
      show: false,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
    {
      title: "Code",
      key: "reasonCode",
      show: false,
    },
    {
      title: "Reason Reference",
      key: "reasonRef",
      show: false,
    },
    {
      title: "Period",
      key: "period",
      show: true,
    },
    {
      title: "Priority",
      key: "priority",
      show: false,
    },
    {
      title: "Description",
      key: "description",
      show: false,
    },
    {
      title: "Consultation Medium",
      kwy: "consultationMedium",
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
    const appointments = this.appointments.map((appointment) => {
      const singleParticipantlength = appointment.Practitioners.length + appointment.Devices.length + appointment.Patients.length
        console.log(singleParticipantlength);
       (appointment as any).period = new Date(
         (appointment as any).period 
       ).toLocaleDateString("en-US");
        return {
        ...appointment,
         action: appointment.id,
         keydisplay: "XXXXXXX",
         Participants: singleParticipantlength 
        };
    });
    if (!this.query) return appointments;
    return search.searchObjectArray(appointments, this.query);
  }

  async setAppointment() {
    const appointment = await this.getAppointmentById(this.id);
    if (!appointment) return;
    this.serviceCategory = appointment.serviceCategory;
    this.locationId = appointment.locationId;
    this.deviceId = appointment.deviceId;
    this.serviceType = appointment.serviceType;
    this.specialty = appointment.specialty;
    this.supportingInfo = appointment.supportingInfo;
    this.appointmentType = appointment.appointmentType;
    this.reasonCode = appointment.reasonCode;
    this.reasonRef = appointment.reasonRef;
    this.priority = appointment.priority;
    this.description = appointment.description;
    this.slot = appointment.slot;
    this.basedOn = appointment.basedOn;
    this.duration = appointment.duration;
    this.comments = appointment.comments;
    this.patientInstruction = appointment.patientInstruction;
    this.period = appointment.period;
    this.Practitioners = appointment.Practitioners;
    this.Devices = appointment.Devices;
    this.Patients = appointment.Patients;
    this.participantDetail = appointment.participantDetail;

  }
  get payload() {
    const payload =  {
      serviceCategory: this.serviceCategory,
      locationId: this.locationId,
      deviceId: this.deviceId,
      serviceType: this.serviceType,
      specialty: this.specialty,
      appointmentType: this.appointmentType,
      reasonCode: this.reasonCode,
      supportingInfo: this.supportingInfo,
      reasonRef: this.reasonRef,
      priority: this.priority,
      description: this.description,
      slot: this.slot,
      basedOn: this.basedOn,
      duration: this.duration,
      comments: this.comments,
      patientInstruction: this.patientInstruction,
      participantDetail: this.participantDetail,
      period: this.period,
    } as any
    if(this.Devices.length > 0){
      payload.Devices = this.Devices;
    }
    if(this.Patients.length > 0){
      payload.Patients = this.Patients;
    }
    if(this.Practitioners.length > 0){
      payload.Practitioners = this.Practitioners;
    }
    return payload
  }
  get allaction() {
    return this.id ? "Edit" : "New";
  }
 
  get selectedItem() {
    return this.participantitem;
  }
   select(i:number) {
      this.selected = i;
    }
  async addPractitioner(value: any,id:any) {
    //this.practitioner.push({ ...this.practitioners });
    this.newPractitioners = value;
    this.Practitioners = id;
    this.practitionerFilter = false;
  }
  removePractitioner(index: number) {
    this.newPractitioners.splice(index, 1);
  }
  removeRole(index: number){
    this.newRoles.splice(index, 1);
  }
   removeDevice(index: number){
    this.newDevices.splice(index, 1);
  }
  showAvailable() {
    this.availableFilter = true;
  }
  async addPatients(value: any,id:any) {
    this.newPatients = value;
    this.Patients = id;
    this.patientFilter = false;
  }
  async addDevices(value:any, id:any){
     this.newDevices = value;
     this.Devices = id;
    this.deviceFilter = false;
  }
  async addRoles(value: any,id:any){
   // this.role.push(value);
    this.newRoles = value;
    this.roles = id;
    this.roleFilter = false;
  }
   get setValue() {
    if (this.type == "Practitioner") {
      this.practitionerFilter = true;
    } else if (this.type == "Patient") {
      this.patientFilter = true;
    }else if(this.type == 'Device'){
       this.deviceFilter = true;
    }else if(this.type == 'Practitioner Role'){
        this.roleFilter = true;
    }
    return this.type;
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateAppointment();
    else await this.createAppointment();
    this.loading = false;
  }
  async createAppointment() {
    //const period = this.period;
   this.payload.period.start = new Date(this.period.start).toISOString();
   // this.payload.period.end = new Date(this.period.end).toISOString();
    this.actor = this.type
    try {
      const response = await cornieClient().post("/api/v1/appointment", this.payload);
      if (response.success) {
          window.notify({ msg: "Appointment created", status: "success" });
          this.$router.push("/dashboard/provider/experience/appointments");
      }
    } catch (error) {
      console.log(error);
      window.notify({ msg: "Appointment not created", status: "error" });
     // this.$router.push("/dashboard/provider/experience/appointments");
    }
  }
    changeChecked(valueitem:string){
        this.checked = true
        console.log("value");
         console.log(valueitem);
    }
  async updateAppointment() {
    const url = `/api/v1/appointment/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Appointment updated", status: "success" });
        this.$router.push("/dashboard/provider/experience/appointments");
      }
    } catch (error) {
      window.notify({ msg: "Appointment not updated", status: "error" });
    }
  }
  async fetchPractitioners() {
    const AllPractitioners = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioners]);
    this.practitioner = response[0].data;
  }
  async fetchDevices() {
    const AllDevices = cornieClient().get("/api/v1/devices");
    const response = await Promise.all([AllDevices]);
    this.device = response[0].data;
  }
  async fetchRoles() {
    const AllRoles = cornieClient().get("/api/v1/roles");
    const response = await Promise.all([AllRoles]);
    this.role = response[0].data;
  }
   async fetchPatients() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patient = response[0].data;
  }
  async created() {
    this.setAppointment();
    this.fetchPractitioners();
    this.fetchDevices();
    this.fetchRoles();
    this.fetchPatients();
    const data = await this.getDropdowns("availability");
    const data2 = await this.getDropdowns("practitioner");
    this.dropdowns = data;
    this.dropdowns2 = data2;
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
