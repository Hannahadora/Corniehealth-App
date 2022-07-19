<template>
  <div>
    <cornie-dialog v-model="show" right class="w-4/12 h-full">
      <cornie-card height="100%" class="flex flex-col">
        <cornie-card-title class="w-full">
          <span class="pr-2 flex items-center cursor, Templates-pointer border-r-2">
            <cornie-icon-btn @click="show = false">
              <arrow-left-icon />
            </cornie-icon-btn>
          </span>
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
                {{ isUpdate ? "Edit Actors" : `Add Members` }}
            </h2>
            <cancel-icon
              class="float-right cursor-pointer"
              @click="show = false"
            />
          </div>
        </cornie-card-title>
        <cornie-card-text class="flex-grow scrollable">
          <div class="text-xs text-black mb-3">
            Add members to this group
          </div>
          <div class="p-2 flex flex-col overflow-y-auto flex-1">
            <cornie-select
              :items="['Practitioner']"
              v-model="entity"
              label="Entity"
              placeholder="--Select--"
              class="mb-0"
            ></cornie-select>
            <div
              class="w-full border-b border-dashed border-gray-400 mb-5"
            ></div>
            <div class="text-xs text-gray-400">
              {{ selectedActors.length }} Selected
            </div>
            <icon-input
              class="border border-gray-600 rounded-full  py-2  focus:outline-none"
              :placeholder="`Search ${entity.toLowerCase()}`"
              v-model="search"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
            <div class="mt-4 overflow-y-auto overflow-x-hidden px-2 h-96">
              <template v-if="actors.length && entity === 'Practitioner'">
                <div
                  class="w-full  mb-5"
                  v-for="actor in filteredActors"
                  :key="actor.id"
                >
                  <div class="flex space-x-10 w-full justify-between">
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
                      :value="actor.id"
                      @click="changed(actor.id)"
                    ></cornie-radio>
                  </div>
                  <div>
                     <div class="w-full mt-5" v-if="singleId == actor.id">
                       <div class="mb-5">
                          <div class="font-semibold mb-1.5 leading-none text-sm">
                            Role <span class="text-red-500">*</span>
                          </div>
                          <cornie-select
                            :items="practitionerRoles"
                            v-model="role"
                            placeholder="--Select--"
                            class="mb-0"
                            required
                          ></cornie-select>
                        </div>
                        <div class="mb-5">
                          <div class="font-semibold -mb-1 leading-none text-sm">
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
                </div>
              </template>
              <template v-else>
                <div
                  class="w-full  mb-5"
                  v-for="actor in filteredActors"
                  :key="actor.id"
                >
                    <div class="flex space-x-10 w-full justify-between">
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
                          :value="actor.id"
                          @update:modelValue="selectEntity"
                           @click="changed(actor.id)"
                        ></cornie-radio>
                    </div>
                      <div>
                     <div class="w-full mt-5" v-if="singleId == actor.id">
                       <div class="mb-5">
                          <div class="font-semibold mb-1.5 leading-none text-sm">
                            Role <span class="text-red-500">*</span>
                          </div>
                          <cornie-select
                            :items="practitionerRoles"
                            v-model="role"
                            placeholder="--Select--"
                            class="mb-0"
                            required
                          ></cornie-select>
                        </div>
                        <div class="mb-5">
                          <div class="font-semibold -mb-1 leading-none text-sm">
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
                </div>
              </template>
            </div>
          </div>

        
        </cornie-card-text>

          <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
           @click="save"
            class="text-white bg-danger px-6 rounded-xl"
           >
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
      </cornie-card>
    </cornie-dialog>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import IPractitioner, {
    PractitionerLocationRole,
  } from "@/types/IPractitioner";
import IDevice from "@/types/IDevice";
import CheckBox from "@/components/corniecheckbox.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import DRangePicker from "@/components/daterangepicker.vue";
import { namespace } from "vuex-class";
import { watch } from "@vue/runtime-core";

const practitioner = namespace("practitioner");
const device = namespace("device");
const roles = namespace("roles");

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
    CornieSelect,
    CornieRadio,
    CornieDatePicker,
    DRangePicker,
  },
})
export default class AddActor extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  groupId!: string;

  @Prop({ type: String, default: "" })
  memberToDelete!: string;

  @Prop({ type: Boolean, default: false })
  isUpdate!: Boolean;


  @Prop({ type: Object, default: {} })
  selectedItem!: any;

  entity = "Practitioner" as string;

  @practitioner.State
  practitioners!: IPractitioner[];

  @device.State
  devices!: IDevice[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<boolean>;

  @device.Action
  fetchDevices!: () => Promise<boolean>;

    @roles.State
    roles!: { id: string; name: string }[];

    @roles.Action
    getRoles!: () => Promise<void>;

  search = "" as string;
  required = true as boolean;
  actors = [] as any;
  loading = false as boolean;
  title = "" as string;
  selectedActors = [] as any;
  pageLoaded = false as boolean;
  selectedEntity = "";
  period = "";
  status = "Active";
  singleId = "";
  role = "";
  selectedMember = [] as any;

  @Watch("memberToDelete")
  updateSelectedMember() {
    if (this.memberToDelete === "") return;

    this.selectedActors = [
      ...this.selectedActors.filter(
        (item: any) => item !== this.memberToDelete
      ),
    ];

    this.$emit("memberDeleted");
  }

 
  @Watch("selectedItem")
  idChanged() {
     this.selectedEntity = this.selectedItem.practitionerId;
     this.role = this.selectedItem.role;
     this.period = this.selectedItem.period;
  }

  @Watch("selectedEntity")
  @Watch("period")
  @Watch("status")
  async selectEntity() {
    if (this.entity === "Practitioner") {
      let practitioner = this.actors.find(
        (item: any) => item.id === this.selectedEntity
      );

      let item = {
        id: practitioner?.id,
        name: `${practitioner?.firstName} ${practitioner?.lastName}`,
        job: practitioner?.jobDesignation,
        type: this.entity,
        image: practitioner?.image,
        period: this.period,
        role: this.getPractionerRoleName(this.role),
      };

      this.selectedActors = [item];
     if(this.role){
       this.selectedMember.push({
        groupId: this.groupId,
        practitionerId: item.id,
        period: item.period,
        role: item.role,
      })
     }
    }

    if (this.entity === "Device") {
      let device = this.actors.find(
        (item: any) => item.id === this.selectedEntity
      );

      let item = {
        id: device?.id,
        name: `${device?.deviceName.name}`,
        job: "",
        type: this.entity,
        image: "",
        period: this.period,
        role: this.getPractionerRoleName(this.role),
      };

      this.selectedActors = [item];
    }
  }

  @Watch("entity")
  showDiag() {
    if (this.entity === "Practitioner") {
      this.actors = <IPractitioner[]>[...this.practitioners];
    }

    if (this.entity === "Device") {
      this.actors = <IDevice[]>[...this.devices];
    }
  }

    changed(id:string) {
      this.singleId = id;
    }
    
  getPractionerRoleName(id: string) {
    const pt = this.roles.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }

    get practitionerRoles() {
      return this.roles.map((role) => ({ code: role.id, display: role.name }));
    }

  get filteredActors() {
    if (this.entity === "Practitioner") {
      return this.actors.filter(
        (item: any) =>
          item.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
          item.lastName.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      return this.actors.filter((item: any) =>
        item.deviceName.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }

  async updateSelectedActors() {
    this.$emit("update-actors-list", this.selectedActors);
    this.show = false;
    this.selectedEntity = "";
    this.status = "Active";
    this.period = "";
  }

    get payload() {
    return  this.selectedMember;
  }

  async save(){
    this.loading = true;
    if (this.groupId) await this.submit();
    else await this.updateSelectedActors();
    this.loading = false;
  }
   async submit() {
    this.loading = true;
    if (this.selectedItem.id) await this.updateGroup();
    else await this.createGroup();
    this.loading = false;
  }
  async createGroup() {
    try {
      const response = await cornieClient().post("/api/v1/group/members", this.payload);
      if (response.success) {
        window.notify({ msg: "Group members created", status: "success" });
        this.show = false;
        this.$emit('add-group')
      }
    } catch (error: any) {
      window.notify({ msg: "Group members not created", status: "error" });
    }
  }

  async updateGroup() {
    const url = `/api/v1/groupMembers/${this.selectedItem.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Group members updated", status: "success" });
        this.show = false;
      }
    } catch (error) {
      window.notify({ msg: "Group members not updated", status: "error" });
    }
  }

  async created() {
    await this.getRoles();
    if (!this.practitioners.length) await this.fetchPractitioners();
    if (!this.devices.length) await this.fetchDevices();
    this.actors = <IPractitioner[]>[...this.practitioners];
  }
}
</script>
