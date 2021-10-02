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
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabstatus" @click="updateOtherrequest"><save-icon/> <span class="text-sm">Save</span></div>
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
                             <cornie-select
                              v-if="tabstatus"
                                class="required"
                                :rules="required"
                                :items="['Routine','Urgent','ASAP','STAT']"
                                v-model="otherrequestModel.basicInfo.priority"
                                label="priority"
                                placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">priority</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.basicInfo.priority }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                             v-if="tabstatus"
                            :items="dropdowns.serviceType"
                            v-model="otherrequestModel.request.preconditionCode"
                            label="precondition code"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">precondition code</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.request.preconditionCode }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                             v-if="tabstatus"
                  class="required"
                  :rules="required"
                  :items="dropdowns.serviceType"
                  v-model="otherrequestModel.request.requestReference"
                  label="request reference"
                  placeholder="--Select--"
                >
                </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">reason reference</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.request.requestReference }}</div>
                            </span>
                        </div>
                        <div>
                         <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="otherrequestModel.request.reasonCode"
                            label="reason code"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">reason code</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.request.reasonCode }}</div>
                            </span>
                        </div>
                        <div>
                             <cornie-select
                              v-if="tabstatus"
                            label="intent"
                            class="required"
                            :rules="required"
                            :items="['proposal','plan','order','original-order','reflex-order','filler-order','instance-order','option']"
                            v-model="otherrequestModel.basicInfo.intent"
                            placeholder="--Select--"
                        >
                        </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">intent</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.basicInfo.intent }}</div>
                            </span>
                        </div>
                        <div>
                             <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model=" otherrequestModel.basicInfo.replaces"
                            label="replaces"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">replaces</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.basicInfo.replaces }}</div>
                            </span>
                        </div>
                        <div>
            
                             <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="otherrequestModel.basicInfo.doNotPerform"
                            label="do not perform"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">do not perform</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.basicInfo.doNotPerform }}</div>
                            </span>
                        </div>
                        <div>
                          <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="otherrequestModel.basicInfo.activityDefinition"
                           label="activity definition"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">activity definition</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.basicInfo.activityDefinition }}</div>
                            </span>
                        </div>
                        <div>
                             <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="otherrequestModel.basicInfo.basedOn"
                           label="based on"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">based on</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.basicInfo.basedOn }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="otherrequestModel.requestInfo.encounter"
                           label="encounter"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">encounter</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.requestInfo.encounter }}</div>
                            </span>
                        </div>
                        <div>
                             <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="otherrequestModel.request.preCondition"
                           label="precondition"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">precondition</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.request.preCondition }}</div>
                            </span>
                        </div>
                        <div>
                             <cornie-select
                            v-if="tabstatus"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="otherrequestModel.request.supportingInfo"
                           label="supporting info"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">supporting info</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.request.supportingInfo }}</div>
                            </span>
                        </div>
                    </div>
                </div>
                </div>
                <div class="tab-pane" v-if="selected == 2" :class="{'active' :  selected === 1  }" id="Participants">
                    <div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabparticipants" @click="updateOtherrequest"><save-icon/> <span class="text-sm">Save</span></div>
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
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">patient name</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPatientData.name }}</div>
                                </span>
                            </div>
                            <div>
                                <span >
                                    <label class="block uppercase mb-1 text-xs font-bold">MRN Number</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPatientData.mrn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">gender</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPatientData.gender }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">Age</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPatientData.dob }}</div>
                                </span>
                            </div>
                            <div>
                                <span >
                                    <label class="block uppercase mb-1 text-xs font-bold">Address</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">Email</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
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
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">practitioner name</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPractionerData.name }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">practitioner id</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPractionerData.id }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">facility name</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ basedOn }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">address</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPractionerData.address }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
                                    <label class="block uppercase mb-1 text-xs font-bold">email</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ selectedPractionerData.email }}</div>
                                </span>
                            </div>
                            <div>
                                <span>
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
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.performer.performerType }}</div>
                                </span>
                            </div>
                            <div>
                                <cornie-select
                                v-if="tabparticipants"
                                class="mt-0"
                                :items="allPerformer"
                                v-model="serviceCategory"
                                label="performer"
                                placeholder="--Select--"
                                >
                                </cornie-select>
                                <span  v-else>
                                    <label class="block uppercase mb-1 text-xs font-bold">performer</label>
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.performer.performer }}</div>
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
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.userId }}</div>
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
                                    <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.performer.locationCode }}</div>
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
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer" v-if="tabbg" @click="updateOtherrequest"><save-icon/> <span class="text-sm">Save</span></div>
                        <div class="text-danger font-semibold mb-10 mt-5 flex space-x-2 float-right cursor-pointer"  v-else @click="tabbg = true"><edit-icon/> <span class="text-sm">Edit</span></div>
                    </div> 
                    <div class="w-full">
                    <div class="w-full grid grid-cols-3 gap-4 mt-5">
                         <div>
                            <cornie-select
                            v-if="tabbg"
                            class="mt-0"
                            :items="dropdowns.serviceCategory"
                            v-model="otherrequestModel.request.note"
                            label="comments"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">comments</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{ otherrequestModel.request.note }}</div>
                            </span>
                        </div>
                        <div>
                            <cornie-select
                            v-if="tabbg"
                            class="mt-0"
                            :items="allForms"
                            v-model="otherrequestModel.forms.linkForms"
                            label="link form"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">link form</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{  otherrequestModel.forms.linkForms }}</div>
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
                            v-model="otherrequestModel.request.patientInstructions"
                            label="patient instruction"
                            placeholder="--Select--"
                            >
                            </cornie-select>
                            <span  v-else>
                                <label class="block uppercase mb-1 text-xs font-bold">patient instruction</label>
                                <div class="bg-gray-100 text-sm text-gray-500 py-3 px-2 mt-3 rounded-md">{{  otherrequestModel.request.patientInstructions }}</div>
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
import { first, getTableKeyValue } from "@/plugins/utils";
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
import IOtherrequest from "@/types/IOtherrequest";
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


const otherrequest = namespace("otherrequest");
const dropdown = namespace("dropdown");

const emptyOtherrequest: IOtherrequest = {
  basicInfo: {},
  requestInfo: {},
  subject: {},
  performer: {},
  forms: {},
  request: {
        range: [20,50]
  },
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


  @Prop({ type: Object, required: false, default: { ...emptyOtherrequest} })
  otherrequest!: IOtherrequest;

  otherrequestModel = {...emptyOtherrequest} as IOtherrequest;

  @otherrequest.Action
  getOtherrequestById!: (id: string) => IOtherrequest;

requestModel = {...emptyOtherrequest} as IOtherrequest;

  @otherrequest.Action
  getRequestById!: (id: string) => IOtherrequest;
  @otherrequest.State
  otherrequests!: any[];

//   @Watch("request")
//   requestUpdated(request: IRequest) {
//     this.requestModel = JSON.parse(JSON.stringify({ ...request }));
//   }


  @otherrequest.Mutation
  updatedOtherrequests!: any;
@otherrequest.State
  patients!: any[];

  @otherrequest.State
  practitioners!: any[];

  @otherrequest.Action
  getPatients!: () => Promise<void>;

  @otherrequest.Action
  getPractitioners!: () => Promise<void>;

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
  selectedPatient : any = { };
selectedPractitioner: any = { };
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auust', 'September', 'October', 'November', 'December' ]

  
  Practitioners = [];
  Devices = [];
  Patients: any[] = [];
  roles = [];
practiceform=[];
  

 

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
    this.setRequest();
  }
  
   query = "";

  getKeyValue = getTableKeyValue;
  preferredHeaders = [];
  rawHeaders = [
    { title: "request code", key: "code", show: true },
    {
      title: "Order Detail",
      key: "order",
      show: true,
    },
    {
      title: "Quantity",
      key: "quantity",
      show: true,
    },
    {
      title: "Ratio",
      key: "ratio",
      show: true,
    },
    {
      title: "Range",
      key: "range",
      show: true,
    },
    {
      title: "Specimen",
      key: "specimen",
      show: true,
    },
    {
      title: "Body Site",
      key: "body",
      show: true,
    },
     {
      title: "Required Date",
      key: "required",
      show: false,
    },
     {
      title: "Period",
      key: "period",
      show: false,
    },
     {
      title: "Timing",
      key: "timing",
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
    const requests = this.otherrequests.map((request:any) => {
       (request as any).createdAt = new Date(
         (request as any).createdAt 
       ).toLocaleDateString("en-US");
        (request as any).request.occurenceDate = new Date(
         (request as any).request.occurenceDate 
       ).toLocaleDateString("en-US");

        (request as any).request.occurencePeriod.start = new Date(
         (request as any).request.occurencePeriod.start 
       ).toLocaleDateString("en-US");
        (request as any).request.occurencePeriod.end = new Date(
         (request as any).request.occurencePeriod.end 
       ).toLocaleDateString("en-US");
        return {
        ...request,
        code:request.request.requestCode,
        order: request.request.orderDetail,
        strength: "xxxxxx",
        quantity: request.request.quantity,
        ratio: request.request.ratio,
        range: request.request.range,
        specimen: request.request.specimen,
        body: request.request.bodySite,
        required: request.request.occurenceDate,
        period: request.request.occurencePeriod.start +'-'+ request.request.occurencePeriod.end,
        timing:request.request.occurenceTiming,
        action: request.id,
        //  keydisplay: "XXXXXXX",
        //  Participants: singleParticipantlength 
        };
    });
    if (!this.query) return requests;
    return search.searchObjectArray(requests, this.query);
  }
 select(i:number) {
      this.selected = i;
    }
 
   async setRequest() {
    const otherrequest = await this.getOtherrequestById(this.id)
    if (!otherrequest) return
    this.otherrequestModel =  ({...otherrequest}) ;
  }
  get payload() {
     const model = JSON.parse(JSON.stringify({ ...this.otherrequestModel }));
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

 

  get allaction() {
    return this.id ? "Edit" : "New";
  }
 
get PatientName() {
    const id = this.otherrequestModel.subject.subject;
    const pt = this.patients.find((i: any) => i.id === id);
    this.selectedPatient = pt ? pt : { };

    return pt;
  }
     get PractitionerName(){
     const id = this.otherrequestModel.performer.performer; 
    const pt = this.practitioners.find((i: any) => i.id === id);
        this.selectedPractitioner = pt ? pt : { };
         return pt;
  }
  get selectedPatientData() {
    const data = this.selectedPatient;
    return {
      gender: data.gender,
      name:data.firstname +' '+ data.lastname,
      dob: Math.floor(( Date.now() - new Date(data.dateOfBirth).getTime()) / 3.15576e+10),
      mrn: data.mrn,
    }
  }
  get selectedPractionerData() {
    const data = this.selectedPractitioner;
    return {
      name:data.firstName +' '+ data.lastName,
      id:data.id,
      address:data.address,
      email:data.email,
      mobile: "xxxxxx"
      
    }
  }
 get allPerformer() {
     if (!this.practitioners || this.practitioners.length === 0) return [ ];
     return this.practitioners.map((i: any) => {
         return {
             code: i.id,
             display: i.firstName +' '+ i.lastName,
         }
     })
 }
 get allForms(){
    if (!this.practiceform || this.practiceform.length === 0) return [ ];
     return this.practiceform.map((i: any) => {
         return {
             code: i.id,
             display: i.formTitle,
         }
     })
 }
  async submit() {
    this.loading = true;
   await this.updateOtherrequest();
    this.loading = false;
  }

  async updateOtherrequest() {
     const id = this.id;
    const url = `/api/v1/other-requests/${id}`;
    const payload = this.payload ;
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
          this.updatedOtherrequests([response.data]);
        window.notify({ msg: "Other Request Updated", status: "success" });
        this.$router.push("/dashboard/provider/experience/requests");
      }
    } catch (error) {
      window.notify({ msg: error, status: "error" });
    }
  }
  async fetchPatients() {
    const AllPateints = cornieClient().get("/api/v1/patient");
    const response = await Promise.all([AllPateints]);
    this.patients = response[0].data;
  }
   async fetchPractitioner() {
    const AllPractitioner = cornieClient().get("/api/v1/practitioner");
    const response = await Promise.all([AllPractitioner]);
    this.practitioners = response[0].data;
  }
  async fetchPracticeForms() {
    const AllForms = cornieClient().get("/api/v1/practice-form");
    const response = await Promise.all([AllForms]);
    this.practiceform = response[0].data;
  }

  async created() {
    this.setRequest();
    this.fetchPatients();
    this.fetchPracticeForms();
    this.fetchPractitioner();
    this.getPractitioners();
    this.getPatients();
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
