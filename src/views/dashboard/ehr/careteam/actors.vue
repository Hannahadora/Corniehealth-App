<template>
  <div>
    <button
      class="mt-5 font-bold text-sm text-red-500 flex items-center"
      type="button"
      @click="show = true"
    >
      <div class="mr-4 uppercase">add Participant(s)</div>
      <plus-icon class="fill-current text-primary" />
    </button>
    <cornie-dialog
      v-model="show"
      right
      class="w-4/12 h-full animated fadeIn z-50 absolute overflow-y-hidden"
    >
      <cornie-card height="100%" class="flex flex-col animated fadeInUp">
        <cornie-card-title class="w-full">
           <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
              {{ isUpdate ? "Edit Actors" : `Add Actors` }}
            </h2>
             <cancel-icon
                class="float-right cursor-pointer"
                @click="show = false"
              />
          </div>
        </cornie-card-title>
        <cornie-card-text
          class="flex-grow scrollable flex flex-col overflow-y-hidden"
        >
          <span class="text-sm text-black mb-3">
            Add Participant(s) to this care team
          </span>
          <div class="p-2 flex flex-col overflow-y-auto flex-1">
            <cornie-select
              :items="['Practitioner', 'Device']"
              v-model="entity"
              label="Select"
              placeholder="--Select--"
              class="mb-5"
            ></cornie-select>
            <div
              class="w-full border-b border-dashed border-gray-400 mb-5"
            ></div>
            <div class="text-xs text-gray-400">
              {{ selectedActors.length }} Selected
            </div>
            <icon-input
              class="border border-gray-400 py-2 rounded-full focus:outline-none"
              :placeholder="`Search ${entity.toLowerCase()}`"
              v-model="search"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
            <div class="mt-4 overflow-y-auto overflow-x-hidden px-2 max-h-full">
              <template v-if="entity == 'Practitioner'">
                <div
                  class="w-full"
                  v-for="actor in filteredActors"
                  :key="actor.id"
                >
                  <div class=" flex flex-row items-center justify-between mb-5">
                      <div class="flex flex-row items-center">
                        <div class="h-8 w-8 rounded-full overflow-hidden mr-1">
                          <img
                            :src="actor.image || '@/assets/img/avatar.svg'"
                            class="h-full w-full"
                          />
                        </div>
                        <div class="flex flex-col">
                          <p class="font-bold text-xs">
                            {{ `${actor.lastName} ${actor.firstName}` }}
                          </p>
                          <p class="text-xs text-gray-400">
                            {{ actor.jobDesignation }}
                          </p>
                        </div>
                      </div>
                      <cornie-radio
                        v-model="selectedEntity"
                        name="entity"
                        @input="changed(actor.id)"
                        @click="addParticipant(actor)"
                        :value="actor.id"
                      ></cornie-radio>
                  </div>
                  <div class="mt-4" v-if="singleId == actor.id">
                        <cornie-select
                          :rules="required"
                          :items="dropdowns.role"
                          label="Role"
                          v-model="role"
                          placeholder="Select"
                        >
                        </cornie-select>
                        <cornie-input
                          v-model="onBehalfOf"
                          placeholder="--Enter--"
                          :rules="required"
                        >
                          <template #label>On behalf of</template>
                          <template #labelicon>
                            <info-blue-bg class="w-4" />
                          </template>
                        </cornie-input>
                        <div class="mb-5 mt-5">
                          <div class="font-semibold leading-none text-sm">
                            Period <span class="text-red-500">*</span>
                          </div>
                          <d-range-picker
                            placeholder="--Select--"
                            v-model="period"
                            class="w-full"
                          ></d-range-picker>
                        </div>
                  </div>
                </div>
              </template>
              <template v-if="entity == 'Device'">
                <div class="w-full"   v-for="actor in filteredActors" :key="actor.id">
                  <div class="w-full flex flex-row items-center justify-between mb-3">
                    <div class="flex flex-row items-center">
                      <div
                        class="h-8 w-8 rounded-full overflow-hidden mr-1 flex items-center justify-center bg-blue-500 text-white-cotton-ball font-bold"
                      >
                        {{ actor.deviceName.name.substr(0, 2).toUpperCase() }}
                      </div>
                      <div class="flex flex-col">
                        <p class="font-bold text-xs">
                          {{
                            `${actor.deviceName.name} (${actor.deviceName.modelNumber})`
                          }}
                        </p>
                        <p class="text-xs text-gray-400">
                          {{ actor.version.component }}
                        </p>
                      </div>
                    </div>
                    <cornie-radio
                        v-model="selectedEntity"
                          name="entity"
                          @input="changed(actor.id)"
                          @click="addParticipant(actor)"
                          :value="actor.id"
                    ></cornie-radio>
                  </div>
                 <div class="mt-4" v-if="singleId == actor.id">
                        <cornie-select
                          :rules="required"
                          :items="dropdowns.role"
                          label="Role"
                          v-model="role"
                          placeholder="Select"
                        >
                        </cornie-select>
                        <cornie-input
                          v-model="onBehalfOf"
                          placeholder="--Enter--"
                          :rules="required"
                        >
                          <template #label>On behalf of</template>
                          <template #labelicon>
                            <info-blue-bg class="w-4" />
                          </template>
                        </cornie-input>
                        <div class="mb-5 mt-5">
                          <div class="font-semibold leading-none text-sm">
                            Period <span class="text-red-500">*</span>
                          </div>
                          <d-range-picker
                            placeholder="--Select--"
                            v-model="period"
                            class="w-full"
                          ></d-range-picker>
                        </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        
        </cornie-card-text>
         <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  px-3 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="updateSelectedActors"
            class="text-white bg-danger px-5 rounded-lg"
           >
            Add
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
      </cornie-card>
    </cornie-dialog>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import { Prop, PropSync, Watch } from "vue-property-decorator";


import IPractitioner from "@/types/IPractitioner";
import IDevice from "@/types/IDevice";

import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import CheckBox from "@/components/corniecheckbox.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import PlusIcon from "@/components/icons/plus.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import DRangePicker from "@/components/daterangepicker.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";


const practitioner = namespace("practitioner");
const device = namespace("device");
const dropdown = namespace("dropdown");

@Options({
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CheckBox,
    IconInput,
    SearchIcon,
    CloseIcon,
    CancelIcon,
    PlusIcon,
    CornieSelect,
    CornieRadio,
    CornieDatePicker,
    DRangePicker,
  },
})
export default class AddActor extends Vue {
  @Prop({ type: Boolean, default: false })
  visible!: Boolean;

  @Prop({ type: String, default: "" })
  memberToDelete!: string;

  @Prop({ type: Boolean, default: false })
  isUpdate!: Boolean;

  entity = "Practitioner" as string;

  @practitioner.State
  practitioners!: IPractitioner[];

  @device.State
  devices!: IDevice[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<boolean>;

  @device.Action
  fetchDevices!: () => Promise<boolean>;

  dropdowns = {} as IIndexableObject;

  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  search = "" as string;
  required = true as boolean;
  actors = [] as any;
  show = false as boolean;
  loading = false as boolean;
  title = "" as string;
  selectedActors = [] as any;
  pageLoaded = false as boolean;
  selectedEntity = "";
  period = "";
  status = "Active";
  role = "" as string;
  onBehalfOf = "";
  singleId = "";

  // @Watch("memberToDelete")
  // updateSelectedMember() {
  //   if (this.memberToDelete === "") return;

  //   this.selectedActors = [
  //     ...this.selectedActors.filter(
  //       (item: any) => item !== this.memberToDelete
  //     ),
  //   ];

  //   this.$emit("memberDeleted");
  // }

  // @Watch("selectedEntity")
  // @Watch("period")
  // @Watch("status")
  // async selectEntity() {
  //   if (this.entity === "Practitioner") {
  //     let practitioner = this.actors.find(
  //       (item: any) => item.id === this.selectedEntity
  //     );

  //     let item = {
  //       id: practitioner?.id,
  //       name: `${practitioner?.firstName} ${practitioner?.lastName}`,
  //       job: practitioner?.jobDesignation,
  //       type: this.entity,
  //       image: practitioner?.image,
  //       period: this.period,
  //       status: this.status,
  //     };

  //     this.selectedActors = [item];
  //   }

  //   if (this.entity === "Device") {
  //     let device = this.actors.find(
  //       (item: any) => item.id === this.selectedEntity
  //     );

  //     let item = {
  //       id: device?.id,
  //       name: `${device?.deviceName.name}`,
  //       job: "",
  //       type: this.entity,
  //       image: "",
  //       period: this.period,
  //       status: this.status,
  //     };

  //     this.selectedActors = [item];
  //   }
  // }
   id = "";
   name = "";
   job = "";
   type = "";
   image = "";

  addParticipant(item: any){
    this.id = item?.id;
    this.name = item.firstName + ' '+ item.lastName ? item?.deviceName?.name :  item.firstName + ' '+ item.lastName;
    this.job =  item.jobDesignation;
    this.type = this.entity;
    this.image = item.image;
    
  }

  // @Watch("entity")
  // showDiag() {
  //   if (this.entity === "Practitioner") {
  //     this.actors = <IPractitioner[]>[...this.practitioners];
  //   }

  //   if (this.entity === "Device") {
  //     this.actors = <IDevice[]>[...this.devices];
  //   }
  // }

  get filteredActors() {
    if (this.entity === "Practitioner") {
      return this.actors.filter(
        (item: any) =>
          item.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
          item.lastName.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      return this.devices.filter((item: any) =>
        item?.deviceName?.name?.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }

  async updateSelectedActors() {
      this.selectedActors.push({
       id: this?.id,
        name: this.name,
        job: this.job,
        type: this.entity,
        image: this.image,
        role: this.role,
        onBehalfOf: this.onBehalfOf,
        period: this.period,
    });

    this.$emit("update-actors-list", this.selectedActors);
     this.show = false;
    // this.selectedEntity = "";
    // this.status = "Active";
    // this.period = "";
  }
  changed(index:string) {
      this.singleId = index;
  }
  async created() {
    if (!this.practitioners.length) await this.fetchPractitioners();
    if (!this.devices.length) await this.fetchDevices();
    this.actors = <IPractitioner[]>[...this.practitioners];

    const data = await this.getDropdowns("careTeam");
    this.dropdowns = data;
  }
}
</script>
