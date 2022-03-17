<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-screen">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="$emit('close-access-diag')">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Location & Days
            </h2>
          </div>
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto">
        <div class="mb-5 w-full h-full pb-32">
          <div class="grid grid-cols-12">
            <div class="col-span-12">
              <cornie-select
                :rules="required"
                :items="practitionerRoles"
                v-model="role"
                label="Role"
                placeholder="--Select--"
                class="w-full"
              />
            </div>
            <div class="col-span-12">
              <cornie-select
                :rules="required"
                :items="allLocation"
                v-model="location"
                label="Location"
                placeholder="--Select--"
                class="w-full"
              />
            </div>

            <!-- <div class="col-span-12">
              <span class="text-primary text-sm font-semibold mb-5"> Available Days </span>
              <div class="grid grid-cols-7 gap-4 w-full mt-4">
                <div :class="{'active' : isActiveMon}" @click="setActive('mon')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Mon
                </div>
                <div :class="{'active' : isActiveTue}" @click="setActive('tue')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Tue
                </div>
                <div :class="{'active' : isActiveWed}" @click="setActive('wed')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Wed
                </div>
                <div :class="{'active' : isActiveThu}" @click="setActive('thu')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Thu
                </div>
                <div :class="{'active' : isActiveFir}" @click="setActive('fri')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Fri
                </div>
                <div :class="{'active' : isActiveSat}" @click="setActive('sat')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                 Sat
                </div>
                 <div :class="{'active' : isActiveSun}" @click="setActive('sun')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Sun
                </div>

              </div>
            </div> -->
            <div
              class="col-span-12 flex justify-start mt-5 border-b-2 border-dashed border-gray-200 pb-4"
            >
              <span
                class="text-danger font-semibold text-sm cursor-pointer"
                @click="add"
              >
                <span class="text-lg">+</span> Add
              </span>
            </div>
            <div class="col-span-12 pt-4">
              <div class="text-sm font-bold mb-5 uppercase">
                Change default location
              </div>
              <template v-if="accessRoles.length">
                <div v-if="roleId && id && locationId">
                  <div
                    class="flex justify-between mb-4"
                    v-for="(access, index) in accessRoles"
                    :key="index"
                  >
                    <div class="flex justify-center items-center">
                      <cornie-radio
                        v-model="defaultVal"
                        name="default"
                        :value="`${access.roleId}?${access.locationId}`"
                        @update:modelValue="setDefault"
                      ></cornie-radio>
                      <div class="flex flex-col">
                        <div class="mb-0 font-bold text-sm">
                          {{ access.location.name }}
                          <!-- <span class="ml-5 text-gray-400 text-xs font-light">
                            {{ isActiveMon ? data?.mon : '' }} {{isActiveTue ? data?.tue : ''}}  {{isActiveWed ? data?.wed : ''}}
                              {{isActiveThu ? data?.thu : ''}}  {{isActiveFir ? data?.fri : ''}}  {{isActiveSat ? data?.sat : ''}}
                              {{isActiveSun ? data?.sun : ''}}
                          </span> -->
                        </div>
                        <div class="text-xs text-gray-400">
                          {{ getRoleName(access.roleId) }}
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-center items-center">
                      <button class="border-0 mr-5">
                        <edit-icon class="fill-current text-primary" />
                      </button>
                      <button
                        class="border-0"
                        @click="
                          deleteRoleAccess(access.roleId, access.locationId)
                        "
                      >
                        <delete-red />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="flex justify-between mb-4"
                  v-for="(access, index) in accessRoles"
                  :key="index"
                >
                  <div class="flex justify-center items-center">
                    <cornie-radio
                      v-model="defaultVal"
                      name="default"
                      :value="`${access.roleId}?${access.locationId}`"
                      @update:modelValue="setDefault"
                    ></cornie-radio>
                    <div class="flex flex-col">
                      <div class="mb-0 font-bold text-sm">
                        {{ access.location }}
                        <span class="ml-5 text-gray-400 text-xs font-light">
                          {{ isActiveMon ? data?.mon : "" }}
                          {{ isActiveTue ? data?.tue : "" }}
                          {{ isActiveWed ? data?.wed : "" }}
                          {{ isActiveThu ? data?.thu : "" }}
                          {{ isActiveFir ? data?.fri : "" }}
                          {{ isActiveSat ? data?.sat : "" }}
                          {{ isActiveSun ? data?.sun : "" }}
                        </span>
                      </div>
                      <div class="text-xs text-gray-400">{{ access.role }}</div>
                    </div>
                  </div>
                  <div class="flex justify-center items-center">
                    <button class="border-0 mr-5">
                      <edit-icon class="fill-current text-primary" />
                    </button>
                    <button
                      class="border-0"
                      @click="
                        deleteRoleAccess(access.roleId, access.locationId)
                      "
                    >
                      <delete-red />
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="$emit('close-access-diag')"
          class="border-primary border-2 px-5 mr-4 rounded-md text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          @click="submit"
          class="text-white bg-danger px-4 rounded-md"
        >
          Save
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import Textarea from "@/components/textarea.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import MainCornieSelect from "@/components/cornieselect.vue";
import UpdateIcon from "@/components/icons/blueupdate.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CheckIcon from "@/components/icons/authcheck.vue";
import { cornieClient } from "@/plugins/http";
import DEdit from "@/components/icons/aedit.vue";
import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
import CDelete from "@/components/icons/adelete.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import DeleteRed from "@/components/icons/delete-red.vue";
import EditIcon from "@/components/icons/edit.vue";
import SearchIcon from "@/components/icons/search.vue";
import { namespace } from "vuex-class";
import { string } from "yup";
import IPractitioner, { PractitionerLocationRole } from "@/types/IPractitioner";

const dropdown = namespace("dropdown");
const roles = namespace("roles");
const practitioner = namespace("practitioner");

@Options({
  name: "LocationDays",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CDelete,
    UpdateIcon,
    DeleteorangeIcon,
    CheckIcon,
    BluecheckIcon,
    DEdit,
    CancelIcon,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    Textarea,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
    MainCornieSelect,
    DeleteRed,
    EditIcon,
  },
})
export default class LocationDays extends Vue {
  @Prop({ type: Boolean, default: false })
  show!: boolean;

  required = string().required();

  isActiveMon = false;
  isActiveTue = false;
  isActiveWed = false;
  isActiveThu = false;
  isActiveFir = false;
  isActiveSat = false;
  isActiveSun = false;

  data = {} as any;

  setActive(item: string) {
    if (item == "mon") {
      this.isActiveMon = !this.isActiveMon;
      this.data.mon = "mon .";
    } else if (item == "tue") {
      this.data.tue = "tue .";
      this.isActiveTue = !this.isActiveTue;
    } else if (item == "wed") {
      this.data.wed = "wed .";
      this.isActiveWed = !this.isActiveWed;
    } else if (item == "thu") {
      this.data.thu = "thu .";
      this.isActiveThu = !this.isActiveThu;
    } else if (item == "fri") {
      this.data.fri = "fri .";
      this.isActiveFir = !this.isActiveFir;
    } else if (item == "sat") {
      this.data.sat = "sat .";
      this.isActiveSat = !this.isActiveSat;
    } else {
      this.data.sun = "sun .";
      this.isActiveSun = !this.isActiveSun;
    }
  }
}
</script>
<style scoped>
.active {
  background: #080056;
  border: 1px solid #080056;
  color: #fff;
}
</style>
