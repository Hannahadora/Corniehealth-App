<template>
  <div class="h-screen flex justify-center">
    <div class="w-full h-screen mx-5 pb-5">
      <span
        class="flex border-b-2 w-full font-semibold text-lg text-primary py-2 mx-auto"
      >
        Add a Practitioner
      </span>
      <span class="w-full h-full block">
        <div class="w-full h-screen block">
          <accordion-component title="Bio" :opened="true">
            <template v-slot:default>
              <div class="w-full">
                <span class="flex items-center mt-5 mb-5">
                  <cornie-avatar-field v-model="img.url" />
                </span>
              </div>
              <div class="w-full flex flex-wrap items-center py-5">
                <div class="mr-4 -mb-2">
                  <cornie-radio
                    :label="'Applied Health'"
                    :value="'Applied Health'"
                    v-model="type"
                    name="practiceRegister"
                  />
                </div>
                <div class="mr-4 -mb-2">
                  <cornie-radio
                    :label="'Nurse'"
                    :value="'Nurse'"
                    v-model="type"
                    name="practiceRegister"
                  />
                </div>
                <div class="mr-4 -mb-2">
                  <cornie-radio
                    :label="'General Practitioner'"
                    :value="'General Practitioner'"
                    v-model="type"
                    name="practiceRegister"
                  />
                </div>
                <div class="-mb-2">
                  <cornie-radio
                    :label="'Specialist'"
                    :value="'Specialist'"
                    v-model="type"
                    name="practiceRegister"
                  />
                </div>
              </div>
              <div class="py-5">
                <cornie-checkbox
                  label="Make available for online booking."
                  v-model="makeAvailable"
                />
              </div>
              <div class="w-full grid grid-cols-3 gap-4">
                <!-- <cornie-input
                  :modelValue="identifier"
                  label="Identifier"
                  :placeholder="'--Automatically Generated--'"
                  disabled
                />
                <div class="w-full">
                  <span class="text-sm font-semibold mb-4">Status</span>
                  <div class="w-full flex flex-wrap items-center py-5">
                    <div class="-mb-2">
                      <cornie-radio
                        v-model="activeState"
                        :label="'Active'"
                        :value="'active'"
                        name="practiceRegister"
                      />
                    </div>
                    <div class="ml-4 -mb-2">
                      <cornie-radio
                        :label="'Inactive'"
                        v-model="activeState"
                        :value="'inactive'"
                        name="practiceRegister"
                      />
                    </div>
                    <div class="ml-4 -mb-2">
                      <cornie-radio
                        :label="'Invited'"
                        v-model="activeState"
                        :value="'Invited'"
                        name="practiceRegister"
                      />
                    </div>
                  </div>
                </div> -->
                <!-- <cornie-input
                  v-model="type"
                  label="Type"
                  placeholder="Not editable"
                  :disabled="true"
                  :required="true"
                /> -->
                <cornie-input
                  :rules="required"
                  v-model="name"
                  :required="true"
                  label="Name (First and Last)"
                  placeholder="--Enter--"
                />

                <auto-complete
                  class="w-full"
                  v-model="nationality"
                  :label="'Nationality'"
                  :items="nationState.countries"
                  placeholder="Enter"
                  :rules="requiredString"
                  :readonly="readonly"
                />
                <cornie-select
                  :rules="required"
                  :items="['male', 'female', 'other']"
                  v-model="gender"
                  label="Gender"
                  :required="true"
                  placeholder="--Select--"
                  class="w-full"
                />
                <date-picker
                  label="Date of Birth"
                  :rules="dobValidator"
                  v-model="dateOfBirth"
                  :required="true"
                  placeholder="--Select--"
                />
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>
          <accordion-component title="Contact" :opened="false">
            <template v-slot:default>
              <div
                class="w-full grid grid-cols-3 gap-4 mt-5 border-b border-gray-400 border-dashed pb-3"
              >
                <phone-input
                  v-model="phone"
                  v-model:code="dialCode"
                  :rules="required"
                  :required="true"
                  label="Phone Number"
                  placeholder="--Enter--"
                />
                <cornie-input
                  :rules="emailRule"
                  v-model="email"
                  :required="true"
                  placeholder="--Enter--"
                  label="Email"
                />
                <auto-complete
                  class="w-full"
                  v-model="country"
                  label="Country"
                  placeholder="Enter"
                  :rules="requiredString"
                  :readonly="readonly"
                  :items="nationState.countries"
                />
                <auto-complete
                  class="w-full"
                  v-model="state"
                  label="State or Origin"
                  :items="nationState.states"
                  placeholder="Enter"
                  :rules="requiredString"
                  :readonly="readonly"
                />
                <cornie-input
                  class="w-full"
                  v-model="city"
                  label="City"
                  :required="true"
                  placeholder="Enter"
                  :rules="requiredString"
                  :readonly="readonly"
                />
                <cornie-input
                  class="w-full"
                  v-model="postCode"
                  label="Zip or Post Code"
                  placeholder="Enter"
                  :required="true"
                  :rules="requiredString"
                  :readonly="readonly"
                />
                <cornie-input
                  :rules="required"
                  v-model="aptNumber"
                  label="Apartment or House Number"
                  placeholder="--Enter--"
                  :required="true"
                />
                <cornie-input
                  :rules="required"
                  v-model="address"
                  label="Address"
                  placeholder="--Enter--"
                  :required="true"
                />
              </div>
              <button
                class="flex mt-5 items-center"
                @click="addEmergencyContact = !addEmergencyContact"
              >
                <h5 class="text-sm font-bold mr-0.5">Add Emergency Contact</h5>
                <div class="text-xs text-gray-400 mr-3">(optional)</div>
                <plus-icon class="fill-current text-red-500" />
              </button>
              <div v-if="addEmergencyContact">
                <div class="py-3">
                  <cornie-checkbox
                    label="Use same address above."
                    v-model="useSameAddress"
                  />
                </div>
              </div>
              <div
                class="w-full grid grid-cols-3 gap-4 mt-3"
                v-if="addEmergencyContact"
              >
                <cornie-input
                  :rules="required"
                  v-model="emergency.name"
                  :required="true"
                  placeholder="--Enter--"
                  label="Name"
                />
                <fhir-input
                  reference="http://hl7.org/fhir/ValueSet/v3-FamilyMember"
                  class="w-full"
                  label="Relationship"
                  v-model="emergency.relationship"
                  placeholder="Select"
                  :rules="required"
                  :required="true"
                />
                <cornie-input
                  :rules="emailRule"
                  v-model="emergency.email"
                  :required="true"
                  placeholder="--Enter--"
                  label="Email"
                  :disabled="disabled"
                />
                <phone-input
                  v-model="emergency.phone"
                  v-model:code="emergency.dialCode"
                  :rules="required"
                  :required="true"
                  label="Phone Number"
                  placeholder="--Enter--"
                  :disabled="disabled"
                />

                <cornie-input
                  class="w-full"
                  v-model="emergency.country"
                  label="Country"
                  placeholder="Enter"
                  :rules="required"
                  :readonly="readonly"
                  :disabled="disabled"
                  v-if="disabled"
                />
                <auto-complete
                  v-else
                  class="w-full"
                  v-model="emergency.country"
                  label="Country"
                  placeholder="Enter"
                  :rules="required"
                  :readonly="readonly"
                  :items="nationState.countries"
                  :disabled="disabled"
                />
                <cornie-input
                  class="w-full"
                  v-model="emergency.state"
                  label="State"
                  placeholder="Enter"
                  :rules="required"
                  :readonly="readonly"
                  :disabled="disabled"
                  v-if="disabled"
                />
                <auto-complete
                  v-else
                  class="w-full"
                  v-model="emergency.state"
                  label="State"
                  :items="nationState.states"
                  placeholder="Enter"
                  :rules="required"
                  :readonly="readonly"
                  :disabled="disabled"
                />
                <cornie-input
                  class="w-full"
                  v-model="emergency.city"
                  label="City"
                  :required="true"
                  placeholder="Enter"
                  :rules="required"
                  :readonly="readonly"
                  :disabled="disabled"
                />
                <cornie-input
                  class="w-full"
                  v-model="emergency.postCode"
                  label="Zip or Post Code"
                  placeholder="Enter"
                  :required="true"
                  :rules="required"
                  :readonly="readonly"
                  :disabled="disabled"
                />
                <cornie-input
                  :rules="required"
                  v-model="emergency.aptNumber"
                  label="Apartment or House Number"
                  placeholder="--Enter--"
                  :required="true"
                  :disabled="disabled"
                />
                <cornie-input
                  :rules="required"
                  v-model="emergency.address"
                  label="Address"
                  placeholder="--Enter--"
                  :required="true"
                  :disabled="disabled"
                />
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>
          <accordion-component title="Work" :opened="false">
            <template v-slot:default>
              <div class="w-full grid grid-cols-3 gap-4 mt-5">
                <cornie-select
                  :rules="required"
                  v-model="employmentType"
                  label="Employment Type"
                  :items="[
                    'Full-time',
                    'Part-time',
                    'Contract',
                    'Probation',
                    'Internship',
                  ]"
                  placeholder="--Select--"
                  :required="true"
                />

                <div v-if="specialties.length > 0">
                  <span class="text-sm mb-4 font-semibold">Specialty</span>
                  <div
                    class="p-2 border-1 h-11 border-gray-300 rounded-lg flex space-x-1"
                  >
                    <div class="flex space-x-2 w-full items-center truncate">
                      <div class="flex-1 truncate text-xs">
                        {{specialties.map((x:any) => getSpecialityName(x) || x?.name).join(', ')}}
                        <!-- <div class="flex">
                          <span
                            class="text-xs"
                            v-for="(item, index) in specialties"
                            :key="index"
                          >
                            {{ getSpecialityName(item) || item?.name }} ,
                          </span>
                        </div> -->
                      </div>
                      <div class="flex-none justify-end">
                        <add-icon @click="showSpecialModal" />
                      </div>
                    </div>
                  </div>
                </div>
                <cornie-input
                  v-else
                  :rules="required"
                  v-model="specialties"
                  label="Specialty"
                  :required="true"
                  placeholder="Add Specialty"
                  :appendleft="true"
                  :disabled="true"
                >
                  <template v-slot:append>
                    <add-icon @click="showSpecialModal" />
                  </template>
                </cornie-input>

                <fhir-input
                  reference="http://hl7.org/fhir/ValueSet/performer-role"
                  class="w-full"
                  label="Job Designation"
                  v-model="jobDesignation"
                  placeholder="Select"
                />

                <!-- <cornie-input
                  :rules="required"
                  v-model="jobDesignation"
                  placeholder="--Enter--"
                  class="grow w-full"
                  
                /> -->

                <cornie-select
                  :items="dropdown.CommunicationLanguage"
                  v-model="communicationLanguage"
                  label="Communication"
                  placeholder="--Select--"
                  class="w-full"
                  :required="true"
                />

                <!-- <cornie-select
                  :rules="required"
                  v-model="consultationChannel"
                  label="Visit Type"
                  :items="dropdown.ConsultationChannel"
                  placeholder="--Select--"
                  :required="true"
                /> -->
                <div class="flex flex-col space-y-0.5">
                  <div class="text-sm font-semibold mb-1">Visit Type</div>

                  <Multiselect
                    label="Visit Type"
                    v-model="consultationChannel"
                    mode="tags"
                    :hide-selected="true"
                    :options="visitType"
                    placeholder="--Select--"
                    class="w-full"
                  >
                    <template
                      v-slot:tag="{ option, handleTagRemove, disabled }"
                    >
                      <div class="multiselect-tag is-user">
                        {{ option.label }}
                        <span
                          v-if="!disabled"
                          class="multiselect-tag-remove"
                          @mousedown.prevent="handleTagRemove(option, $event)"
                        >
                          <span class="multiselect-tag-remove-icon"></span>
                        </span>
                      </div>
                    </template>
                    <template v-slot:option="{ option }">
                      <span class="w-full text-sm">{{ option.label }}</span>
                    </template>
                  </Multiselect>
                </div>

                <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-3"
                    >Consultation Rate
                    <span class="text-red-500">*</span>
                  </span>
                  <div class="flex space-x-2 w-full">
                    <cornie-input
                      :rules="required"
                      v-model="consultationRatevalue"
                      placeholder="--Enter--"
                      class="grow w-full"
                    />
                    <cornie-select
                      :items="['Hour']"
                      placeholder="/ Hour"
                      class="w-32 mt-0.5 flex-none"
                      v-model="consultationRateunit"
                      :setPrimary="true"
                    />
                  </div>
                </div>
                <div class="w-full -mt-1">
                  <span class="text-sm font-semibold mb-4"
                    >Years in Practice
                    <span class="text-red-500">*</span>
                  </span>
                  <div class="flex space-x-2">
                    <cornie-input
                      :rules="required"
                      v-model="practiceDurationvalue"
                      placeholder="--Enter--"
                      class="grow"
                    />
                    <cornie-select
                      :items="['Year', 'Month']"
                      placeholder="years"
                      class="w-32 mt-0.5 flex-none"
                      v-model="practiceDurationunit"
                      :setPrimary="true"
                    />
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>
          <accordion-component title="Locations & privileges" :opened="false">
            <template v-slot:default>
              <div class="w-full mt-5">
                <div class="font-bold text-sm mb-5 flex space-x-4">
                  <span
                    class="-mt-1 text-danger font-bold cursor-pointer"
                    @click="addAccessRole = true"
                  >
                    Add Location(s) & privileges</span
                  >
                  <plus-icon class="fill-current text-danger font-bold w-3" />
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div
                    class="flex space-x-4 mt-5 border-r-2 border-gray-100 pr-5"
                    v-for="(access, index) in locationRoles"
                    :key="index"
                  >
                    <div class="flex w-full">
                      <div
                        class="w-10 h-10 rounded-full flex justify-center items-center bg-blue-600 text-white text-lg text-center font-bold mr-2"
                      >
                        {{
                          `${getLocationName(access?.locationId)
                            .substr(0, 1)
                            ?.toUpperCase()}${getRoleName(access?.roleId)
                            ?.substr(0, 1)
                            ?.toUpperCase()}` ||
                          `${getLocationName(access?.locationId)
                            .substr(0, 1)
                            ?.toUpperCase()}${getRoleName(access?.roleId)
                            ?.substr(0, 1)
                            ?.toUpperCase()}`
                        }}
                      </div>
                      <div class="flex-1">
                        <div class="flex flex-col">
                          <div class="flex items-center w-full space-x-3">
                            <div class="flex-1">
                              <div class="flex w-full">
                                <div class="flex flex-col">
                                  <div class="text-sm">
                                    {{ getLocationName(access?.locationId) }}
                                  </div>
                                  <div
                                    class="text-xxs float-left text-gray-400 mb-1"
                                  >
                                    {{ getRoleName(access.roleId) }}
                                  </div>
                                </div>
                                <div
                                  class="flex items-start text-black text-sm"
                                >
                                  <div
                                    class="text-black ml-1"
                                    v-if="access?.default"
                                  >
                                    •
                                  </div>
                                  <div class="text-blue-600 ml-1 text-xxs">
                                    {{ access?.default ? "Default" : "" }}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="flex-none">
                              <div class="flex justify-center items-center">
                                <button class="border-0 mr-3" type="button">
                                  <edit-icon
                                    class="fill-current text-primary"
                                    @click="
                                      showEditAccess(
                                        access.id,
                                        access.roleId,
                                        access.locationId
                                      )
                                    "
                                  />
                                </button>
                                <button
                                  class="border-0"
                                  type="button"
                                  @click="deleteItem(access.locationId, index)"
                                >
                                  <delete-red />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <span
                              class="text-danger text-xs font-semibold cursor-pointer"
                              @click="
                                $router.push(
                                  '/dashboard/provider/settings/roles-privileges'
                                )
                              "
                              >View privileges</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- End -->
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>
          <accordion-component title="Education" :opened="false">
            <template v-slot:default>
              <div
                class="border-gray-100 border-dashed pb-4"
                :class="educations.length ? 'border-b-2' : ''"
              >
                <div class="w-full grid grid-cols-3 gap-4 mt-3">
                  <cornie-input
                    label="Issuer"
                    v-model="qualificationIssuer"
                    :required="true"
                  />
                  <cornie-select
                    :items="dropdown.Qualification"
                    v-model="qualificationCode"
                    label="Qualification"
                    placeholder="--Select--"
                    class="w-full"
                    :required="true"
                  />
                  <date-picker
                    class="w-full mb-5"
                    label="Year of Graduation"
                    v-model="graduationYear"
                    :rules="dobRule"
                    :required="true"
                  />
                </div>
                <span
                  class="text-sm text-danger font-semibold"
                  @click="addEducation"
                >
                  Add <span class="text-lg"> + </span>
                </span>
              </div>
              <div
                class="grid grid-cols-4 mt-5 gap-4 w-full"
                v-if="educations.length"
              >
                <div
                  class="border-gray-200"
                  v-for="(item, index) in educations"
                  :key="index"
                  :class="index !== educations.length - 1 ? 'border-r-2' : ''"
                >
                  <div class="flex w-full items-center">
                    <div class="flex-1">
                      <p class="text-black font-semibold">
                        {{ item.issuer }}
                      </p>
                      <div class="text-gray-600 text-sm flex items-center">
                        <div>{{ item.qualification }}</div>
                        <div class="font-bold text-xs leading-none mx-1">•</div>
                        <div>{{ item.graduationYear }}</div>
                      </div>
                    </div>
                    <div class="flex-none">
                      <button
                        class="border-0"
                        type="button"
                        @click="removeEducation(index)"
                      >
                        <delete-red />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>
          <accordion-component title="Board License" :opened="false">
            <template v-slot:default>
              <div
                class="border-gray-100 border-dashed pb-4"
                :class="licenses.length ? 'border-b-2' : ''"
              >
                <div class="w-full grid grid-cols-3 gap-4 mt-3">
                  <cornie-input
                    v-model="licenseIssuer"
                    label="Issuer"
                    class="w-full"
                    placeholder="--Enter--"
                    :required="true"
                  />

                  <cornie-input
                    v-model="licenseNumber"
                    label="License Number"
                    placeholder="--Enter--"
                    :required="true"
                  />
                  <period-picker
                    label="Period"
                    class="-mt-1.5 w-full"
                    v-model="licensePeriod"
                    placeholder="--Select--"
                    :required="true"
                  />
                </div>
                <span
                  class="text-sm text-danger font-semibold"
                  @click="addLicense"
                >
                  Add <span class="text-lg"> + </span>
                </span>
              </div>
              <div
                class="grid grid-cols-4 mt-5 gap-4 w-full"
                v-if="licenses.length"
              >
                <div
                  class="border-gray-200"
                  v-for="(item, index) in licenses"
                  :key="index"
                  :class="index !== licenses.length - 1 ? 'border-r-2' : ''"
                >
                  <div class="flex w-full">
                    <div class="flex-1">
                      <p class="text-black font-semibold">
                        {{ item.issuer
                        }}<span class="text-gray-400 font-light text-sm"
                          >({{ item.licenseNumber }})</span
                        >
                      </p>
                      <div class="text-gray-600 text-sm flex items-center">
                        <div>
                          {{
                            new Date(item.period.start)
                              .toLocaleDateString()
                              .toString()
                              .split("/")[2]
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="flex-none">
                      <button
                        class="border-0"
                        type="button"
                        @click="removeLicense(index)"
                      >
                        <delete-red />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:misc>
              <info-icon class="fill-current text-primary" />
            </template>
          </accordion-component>

          <span class="flex w-full mt-5 pb-3 justify-end">
            <button
              class="rounded font-semibold py-1 px-12 text-primary border border-primary mr-3"
              @click="$router.push('practitioners')"
            >
              Cancel
            </button>
            <cornie-btn
              class="rounded font-semibold py-1 px-6 text-white border bg-danger"
              :loading="loading"
              type="submit"
              @click="submit"
            >
              Save
            </cornie-btn>
          </span>
        </div>
      </span>
    </div>
  </div>
  <speciality-modal
    :id="id"
    v-model="showSpecial"
    @save-sepcailty="saveSepcailty"
    @send-speicality="sendspeicality"
    @add-another-services="saveservices"
  />
  <location-role
    v-model="addAccessRole"
    :id="id"
    :locationId="locationId"
    :roleId="roleId"
    :locationRoleId="locationRoleId"
    :setRoles="locationRoles"
    :deletedRole="deletedRole"
    @add-access-roles="addAccessRoles"
  />

  <!-- <access-role
    v-model="addAccessRole"
    :deletedRole="deletedRole"
    @close-access-diag="addAccessRole = false"
    @add-access-roles="addAccessRoles"
    @role-deleted="deletedRole = {}"
    :locationId="locationId"
    :roleId="roleId"
    :id="id"
    :locationRoleId="locationRoleId"
    :setRoles="locationRoles"
  /> -->
</template>
<script lang="ts">
  import AutoComplete from "@/components/autocomplete.vue";
  import Avatar from "@/components/avatar.vue";
  import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import CornieCheckbox from "@/components/custom-checkbox.vue";
  import DatePicker from "@/components/datepicker.vue";
  import PeriodPicker from "@/components/daterangepicker.vue";
  import FhirInput from "@/components/fhir-input.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import {
    default as AddBlueIcon,
    default as AddIcon,
  } from "@/components/icons/addblue.vue";
  import DeleteRed from "@/components/icons/delete-red.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import InfoIcon from "@/components/icons/info.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import OperationHours from "@/components/new-operation-hours.vue";
  import PhoneInput from "@/components/phone-input.vue";
  import { useCountryStates } from "@/composables/useCountryStates";
  import { useHandleImage } from "@/composables/useHandleImage";
  import { cornieClient } from "@/plugins/http";
  import { createDate } from "@/plugins/utils";
  import ILocation from "@/types/ILocation";
  import Period from "@/types/IPeriod";
  import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
  import ISpecial from "@/types/ISpecial";
  import Multiselect from "@vueform/multiselect";
  import { Options, setup, Vue } from "vue-class-component";
  import { Prop, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { date, string } from "yup";
  import AccessRole from "./AccessRoles.vue";
  import locationRole from "./LocationRoles.vue";
  import SpecialityModal from "./specialModal.vue";

  const dropdown = namespace("dropdown");
  const practitioner = namespace("practitioner");
  const roles = namespace("roles");
  const special = namespace("special");
  const location = namespace("location");

  @Options({
    name: "AddPractitioner",
    components: {
      CornieCheckbox,
      AccessRole,
      PlusIcon,
      CornieInput,
      CornieSelect,
      AccordionComponent,
      SpecialityModal,
      locationRole,
      InfoIcon,
      PhoneInput,
      AddIcon,
      PeriodPicker,
      OperationHours,
      DatePicker,
      Avatar,
      AutoComplete,
      CornieAvatarField,
      AddBlueIcon,
      DeleteRed,
      EditIcon,
      CornieRadio,
      Multiselect,

      FhirInput,
    },
  })
  export default class AddPractitioner extends Vue {
    @Prop({ type: String, default: "" })
    id!: string;

    img = setup(() => useHandleImage());

    @roles.State
    roles!: { id: string; name: string }[];

    @roles.Action
    getRoles!: () => Promise<void>;

    @practitioner.Action
    getPractitionerById!: (id: string) => Promise<IPractitioner>;

    @practitioner.Mutation
    updatePractitioners!: (practitioners: IPractitioner[]) => void;

    @location.State
    locations!: ILocation[];

    @location.Action
    fetchLocations!: () => Promise<void>;

    @practitioner.State
    practitioners!: IPractitioner[];

    @practitioner.Action
    deletePractitioner!: (id: string) => Promise<boolean>;

    @practitioner.Action
    fetchPractitioners!: () => Promise<void>;

    @practitioner.Action
    deleteLocationrole!: ({ id, roleId }: any) => Promise<boolean>;

    @special.State
    specials!: ISpecial[];

    @special.Action
    fetchSpecials!: () => Promise<void>;

    loading = false;

    educations = [] as any;
    licenses = [] as any;
    disabled = false;

    dobRule = date().max(
      new Date(),
      `Date must be on or before ${new Date().toLocaleDateString("en-NG")}`
    );

    addEducation() {
      if (
        !this.graduationYear ||
        !this.qualificationIssuer ||
        !this.qualificationCode
      )
        return;

      this.educations = [
        {
          graduationYear: this.graduationYear,
          issuer: this.qualificationIssuer,
          qualification: this.qualificationCode,
        },
        ...this.educations,
      ];

      this.qualificationIssuer = this.qualificationCode = "";
      // this.graduationYear =
      //   "";
    }
    removeEducation(i: number) {
      this.educations.splice(i, 1);
    }

    addLicense() {
      if (!this.licensePeriod || !this.licenseIssuer || !this.licenseNumber)
        return;

      this.licenses = [
        {
          licenseNumber: this.licenseNumber,
          issuer: this.licenseIssuer,
          period: this.licensePeriod,
        },
        ...this.licenses,
      ];

      this.licenseIssuer = this.licenseNumber = "";
    }

    removeLicense(i: number) {
      this.licenses.splice(i, 1);
    }

    dobValidator = date().max(
      createDate(0, 0, -18),
      "Practitioner must be at least 18yrs."
    );

    get readonly() {
      return this.$route.path.includes("view");
    }
    nationState = setup(() => useCountryStates());

    consultationRatevalue = 0;
    consultationRateunit = "Hour";
    practiceDurationvalue = 0;
    practiceDurationunit = "Year";
    newspecialties = [] as any;

    qualificationCode = "";
    addEmergencyContact = false;
    useSameAddress = false;
    name = "";
    email = "";
    activeState = "active";
    gender = "";
    phone = "";
    address = "";
    locationRoleId = "";
    dateOfBirth = "";
    jobDesignation = "";
    employmentType = "";
    department = "department";
    accessRole = "";
    singleLocation = "";
    nationality = "Nigeria";
    country = "";
    state = "";
    postCode = "";
    city = "";
    specialty = "";
    years = 0;
    issuer = "";
    graduation = "";
    showSpecial = false;
    visitType = [
      {
        label: "In-person",
        value: "in-person",
      },
      {
        label: "Virtual",
        value: "virtual",
      },
      {
        label: "At home",
        value: "at home",
      },
    ];
    qualificationIdentifier = "1122";
    qualificationIssuer = "";
    licenseNumber = "";
    type = "General Practitioner";
    makeAvailable = "";
    practitionerId = "";
    communicationLanguage = "";
    availabilityExceptions = "availabilityExceptions";
    consultationChannel: any = [];
    defaultLocation = "";
    hoursOfOperation: HoursOfOperation[] = [];
    organizationId = "";
    dialCode = "+234";
    dropdown = {} as IIndexableObject;
    period = {} as Period;
    required = string().required();
    emailRule = string().email().required();
    location = [];
    // locations = [];
    generatedIdentifier = "";
    addAccessRole = false;
    accessRoles = [] as any;
    locationRoles = [] as any[];
    locationId = "";
    roleId = "";
    setRoles = [] as any[];
    deletedRole = {} as object;
    services = [] as any;
    emergency = {
      name: "",
      relationship: "",
      email: "",
      phone: "",
      dialCode: "+234",
      country: "",
      state: "",
      city: "",
      postCode: "",
      aptNumber: "",
      address: "",
    };

    aptNumber = "";

    specialties = [] as any;
    practiceDuration = {
      value: 0,
      unit: "Year",
    };
    consultationRate = {
      value: 0,
      unit: "Hour",
    };
    graduationYear = "";
    licenseIssuer = "";
    newservices = [] as any;
    licensePeriod = "" as any;

    @dropdown.Action
    getDropdowns!: (a: string) => Promise<IIndexableObject>;

    get identifier() {
      return this.generatedIdentifier || "System generated";
    }

    @Watch("id")
    idChanged() {
      this.setPractitioner();
    }

    @Watch("useSameAddress")
    populateEmergencyAddress() {
      if (this.useSameAddress) {
        this.disabled = true;
        this.emergency.address = this.address;
        this.emergency.phone = this.phone;
        this.emergency.email = this.email;
        this.emergency.country = this.country;
        this.emergency.state = this.state;
        this.emergency.city = this.city;
        this.emergency.postCode = this.postCode;
        this.emergency.aptNumber = this.aptNumber;
      } else {
        this.emergency.address = "";
        this.emergency.phone = "";
        this.emergency.email = "";
        this.emergency.country = "";
        this.emergency.state = "";
        this.emergency.city = "";
        this.emergency.postCode = "";
        this.emergency.aptNumber = "";
        this.disabled = false;
      }
    }

    async addAccessRoles(payload: any) {
      this.accessRoles = [...payload];
      this.locationRoles = [...payload];
    }

    editRole(locationId: string, roleId: string) {
      this.locationId = locationId;
      this.roleId = roleId;
      this.addAccessRole = true;
    }

    showEditAccess(value: string, valuerole: string, valuelocation: string) {
      this.locationRoleId = value;
      this.roleId = valuerole;
      this.locationId = valuelocation;
      this.addAccessRole = true;
    }

    async deleteRole(roleId: string, locationId: string) {
      this.accessRoles = [
        ...this.accessRoles.filter(
          (item: any) =>
            item.roleId !== roleId && item.locationId !== locationId
        ),
      ];

      this.deletedRole = {
        roleId,
        locationId,
      };
    }
    saveservices(value: any) {
      this.services = value;
      this.newservices = value;
    }

    sendspeicality(value: any) {
      this.specialties = value;
      this.newspecialties = value;
    }

    showSpecialModal() {
      this.showSpecial = true;
    }
    async setPractitioner() {
      const practitioner = await this.getPractitionerById(this.id);
      if (!practitioner) return;
      this.practitionerId = practitioner.id;
      this.name = `${practitioner.firstName} ${practitioner.lastName}`;
      this.email = practitioner.email;
      this.generatedIdentifier = practitioner.identifier;
      this.activeState = practitioner.activeState;
      this.gender = practitioner.gender;
      this.phone = practitioner.phone?.number;
      this.dialCode = (practitioner.phone as any).dialCode;
      this.type = practitioner.type;
      this.address = practitioner.address;
      this.dateOfBirth = practitioner.dateOfBirth;
      this.img.url = practitioner.image;
      this.jobDesignation = practitioner.jobDesignation;
      this.department = practitioner.department;
      this.accessRole = practitioner.accessRole || "";
      this.qualificationIdentifier = practitioner.qualificationIdentifier;
      this.qualificationIssuer = practitioner.qualificationIssuer;
      this.licenseNumber = practitioner.licenseNumber;
      this.communicationLanguage = practitioner.communicationLanguage;
      this.availabilityExceptions = practitioner.availabilityExceptions;
      this.consultationChannel = practitioner.consultationChannel;
      this.organizationId = practitioner.organizationId;
      this.state = practitioner.state;
      this.hoursOfOperation = practitioner.hoursOfOperation;
      this.qualificationCode = practitioner.qualificationCode || "";
      this.period = practitioner.period || {};
      //@ts-ignore
      this.locationRoles = practitioner.locationRoles;
      this.services = practitioner.services;
      this.nationality = practitioner.nationality;
      this.country = practitioner.country;
      this.city = practitioner.city;
      this.postCode = practitioner.postCode;
      this.aptNumber = practitioner.aptNumber;
      this.specialties = practitioner.specialties;
      this.practiceDuration.value = practitioner?.practiceDuration?.value;
      this.practiceDuration.unit = practitioner?.practiceDuration?.unit;
      this.consultationRate.value = practitioner?.consultationRate?.value;
      this.consultationRate.unit = practitioner?.consultationRate?.unit;
      this.consultationRatevalue = practitioner?.consultationRate?.value;
      this.consultationRateunit = practitioner?.consultationRate?.unit;
      this.practiceDurationvalue = practitioner?.practiceDuration?.value;
      this.practiceDurationunit = practitioner?.practiceDuration?.unit;
      this.graduationYear = practitioner?.graduationYear;
      this.licenseIssuer = practitioner?.licenseIssuer;
      this.licensePeriod = practitioner?.licensePeriod;
    }
    serializeDate(date: string) {
      if (!date) return "";
      return new Date(date).toISOString();
    }
    get payload() {
      const [firstName, lastName] = this.name.split(" ");
      return {
        firstName,
        lastName,
        email: this.email,
        activeState: this.activeState,
        gender: this.gender,
        phone: {
          number: this.phone,
          dialCode: this.dialCode,
        },
        type: this.type,
        address: this.address,
        dateOfBirth: this.serializeDate(this.dateOfBirth),
        image: this.img.url ? this.img.url : undefined,
        jobDesignation: this.jobDesignation,
        department: this.department,
        accessRole: this.accessRole,
        qualificationIdentifier: this.qualificationIdentifier,
        qualificationIssuer: this.qualificationIssuer,
        licenseNumber: this.licenseNumber,
        communicationLanguage: this.communicationLanguage,
        qualificationCode: this.qualificationCode,
        availabilityExceptions: this.availabilityExceptions,
        // consultationChannel: this.consultationChannel,
        visitType: this.consultationChannel,
        organizationId: this.organizationId,
        hoursOfOperation: this.hoursOfOperation,
        period: this.period,
        // locations: this.locations,
        // defaultLocation: this.defaultLocation,
        locationRoles: this.accessRoles,
        services: this.services,
        nationality: this.nationality,
        country: this.country,
        state: this.state,
        city: this.city,
        postCode: this.postCode,
        aptNumber: this.aptNumber,
        specialties: this.specialties,
        practiceDuartion: {},
        practiceDuration: this.practiceDuration,
        consultationRate: this.consultationRate,
        hourlyRate: this.consultationRate.value,
        graduationYear: this.graduationYear,
        licenseIssuer: this.licenseIssuer,
        licensePeriod: this.licensePeriod,
        education: this.educations,
        boardLicenses: this.licenses,
        location: this.locations,
        employmentType: this.employmentType,
      };
    }
    get payloadEdit() {
      const [firstName, lastName] = this.name.split(" ");
      const special = this.specialties.map((data: any) => {
        this.newspecialties = [data.id];
        return {
          ...data,
        };
      });
      return {
        firstName,
        lastName,
        email: this.email,
        activeState: this.activeState,
        gender: this.gender,
        locations: this.accessRoles,
        phone: {
          number: this.phone,
          dialCode: this.dialCode,
        },
        type: this.type,
        address: this.address,
        dateOfBirth: this.serializeDate(this.dateOfBirth),
        image: this.img.url,
        jobDesignation: this.jobDesignation,
        department: this.department,
        accessRole: this.accessRole,
        qualificationIdentifier: this.qualificationIdentifier,
        qualificationIssuer: this.qualificationIssuer,
        licenseNumber: this.licenseNumber,
        communicationLanguage: this.communicationLanguage,
        qualificationCode: this.qualificationCode,
        availabilityExceptions: this.availabilityExceptions,
        consultationChannel: this.consultationChannel,
        organizationId: this.organizationId,
        hoursOfOperation: this.hoursOfOperation,
        period: this.period,
        services: this.newservices,
        nationality: this.nationality,
        country: this.country,
        state: this.state,
        city: this.city,
        postCode: this.postCode,
        aptNumber: this.aptNumber,
        specialties: this.newspecialties,
        practiceDuration: {
          value: this.practiceDurationvalue,
          unit: this.practiceDurationunit,
        },
        consultationRate: {
          value: this.consultationRatevalue,
          unit: this.consultationRateunit,
        },
        graduationYear: this.graduationYear,
        licenseIssuer: this.licenseIssuer,
        licensePeriod: this.licensePeriod,
        availableForOnlineBooking: this.makeAvailable === "on" ? true : false,
        hourlyRate: this.consultationRate.value,
      };
    }

    async saveSepcailty() {
      await this.fetchSpecials();
      await this.fetchPractitioners();
    }
    getLocationName(id: string) {
      const pt = this.locations.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }
    getRoleName(id: string) {
      const pt = this.roles.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }
    async fetchLocation() {
      const AllLocation = cornieClient().get(
        "/api/v1/location/myOrg/getMyOrgLocations"
      );
      const response = await Promise.all([AllLocation]);
      this.location = response[0].data;
    }

    async fetchDesignation() {
      const AllDesignation = cornieClient().get(
        "/api/v1/orgHierarchy/designation"
      );
      const response = await Promise.all([AllDesignation]);
      console.log("designations", response);
      // this.location = response[0].data;
    }

    async submit() {
      this.loading = true;
      if (this.id) await this.updatePractitioner();
      else await this.createPractitioner();
      this.loading = false;
    }

    async createPractitioner() {
      try {
        const response = await cornieClient().post(
          "/api/v1/practitioner",
          this.payload
        );
        if (response.success) {
          window.notify({ msg: "Practitioner created", status: "success" });
          this.updatePractitioners([response.data]);
          this.$router.back();
        }
      } catch (error) {
        window.notify({ msg: "Practitioner not created", status: "error" });
      }
    }

    async updatePractitioner() {
      this.payload.consultationRate.value = this.consultationRatevalue;
      this.payload.consultationRate.unit = this.consultationRateunit;
      this.payload.practiceDuration.value = this.practiceDurationvalue;
      this.payload.practiceDuration.unit = this.practiceDurationunit;

      const url = `/api/v1/practitioner/${this.id}`;
      const payload = { ...this.payloadEdit, id: this.id };
      try {
        const response = await cornieClient().put(url, payload);
        if (response.success) {
          window.notify({ msg: "Practitioner updated", status: "success" });
          this.updatePractitioners([response.data]);
          this.$router.back();
        }
      } catch (error) {
        window.notify({ msg: "Practitioner not updated", status: "error" });
      }
    }
    async deleteItem(roleId: string, itemId: number) {
      console.log(this.id, roleId, "role");
      const id = this.id;
      const confirmed = await window.confirmAction({
        message:
          "Are you sure you want to delete this location role? This action cannot be undone.",
        title: "Delete location role",
      });
      if (!confirmed) return;
      console.log("locaiton roles", this.locationRoles);
      if (!id) {
        this.locationRoles.splice(itemId, 1);
        return;
      }
      if (await this.deleteLocationrole({ id, roleId }))
        window.notify({ msg: "Location role deleted", status: "success" });
      else window.notify({ msg: "Location role not deleted", status: "error" });
    }
    async done() {
      await this.fetchPractitioners();
    }

    getSpecialityName(id: string) {
      const pt = this.specials.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }

    async setDropdown() {
      const data = await this.getDropdowns("practitioner");
      this.dropdown = data;

      console.log("dropdowns", data);
    }
    async created() {
      this.fetchSpecials();
      this.setPractitioner();
      this.setDropdown();
      await this.fetchPractitioners();
      await this.fetchLocation();
      await this.fetchDesignation();
      if (!this.roles.length) await this.getRoles();
    }
  }
</script>
<style>
  .multiselect-option.is-selected.is-pointed {
    background: var(--ms-option-bg-selected-pointed, #fe4d3c);
    color: var(--ms-option-color-selected-pointed, #fff);
  }
  .multiselect-option.is-selected {
    background: var(--ms-option-bg-selected, #fe4d3c);
    color: var(--ms-option-color-selected, #fff);
  }

  .multiselect {
    position: relative;
    margin: 0 auto;
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
    border-radius: var(--ms-radius, 4px);
    background: var(--ms-bg, #fff);
    font-size: var(--ms-font-size, 1rem);
    min-height: calc(
      var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) *
        var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2
    );
  }

  .multiselect-tags {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-wrap: wrap;
    margin: var(--ms-tag-my, 0.25rem) 0 0;
    padding-left: var(--ms-py, 0.5rem);
    align-items: center;
  }

  .multiselect-tag.is-user {
    padding: 5px 12px;
    border-radius: 22px;
    background: #080056;
    margin: 3px 3px 8px;
    position: relative;
    left: -10px;
  }

  /* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

  .multiselect-placeholder {
    font-size: 0.8em;
    font-weight: 400;
    font-style: italic;
    color: #667499;
  }

  .multiselect-caret {
    transform: rotate(0deg);
    transition: transform 0.3s;
    -webkit-mask-image: url("../../../../assets/img/Chevron.png");
    mask-image: url("../../../../assets/img/Chevron.png");
    background-color: #080056;
    margin: 0 var(--ms-px, 0.875rem) 0 0;
    position: relative;
    z-index: 10;
    flex-shrink: 0;
    flex-grow: 0;
    pointer-events: none;
  }

  .multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;
  }

  .multiselect-tag-remove {
    display: flex;
    align-items: center;
    /* border: 1px solid #fff;
    background: #fff; */
    border-radius: 50%;
    color: #fff;
    justify-content: center;
    padding: 0.77px;
    margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
  }
</style>
