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
            <h2 class="font-bold uppercase float-left text-lg text-primary ml-3 -mt-1">
               Added Members
            </h2>
            <cancel-icon
              class="float-right cursor-pointer"
              @click="show = false"
            />
          </div>
        </cornie-card-title>
        <cornie-card-text class="flex-grow scrollable">
            <span class="text-gray-500 text-sm">{{ groupMembers.length }} MEMBERS</span>
            <div class="border-2 border-gray-300 p-4 mt-4 overflow-y-auto overflow-x-hidden px-2 h-96">
                <div v-for="(item, index) in groupMembers" :key="index" class="mt-5 flex align-center justify-between w-full border-b-2 border-gray-300 pb-5">
                    <div class="w-full">
                        <p class="text-sm"> 
                            Dr. {{ getPractionerName(item.practitionerId) }}
                        </p>
                        <span class="text-xs text-gray-500">
                            {{ item.role.toUpperCase() }}
                        </span>
                    </div>
                    <div class="flex space-x-4 w-full justify-end">
                        <edit-icon class="cursor-pointer" @click="showMemeber(item)"/>
                        <delete-icon class="cursor-pointer" v-if="groupId" @click="deleteItemId(item.id)"/>
                        <delete-icon class="cursor-pointer" v-else @click="deleteMember(item.id)"/>
                    </div>
                </div>


            </div>

        
        </cornie-card-text>

          <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Close
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
      </cornie-card>
    </cornie-dialog>
  </div>
  <add-actor :selectedItem="selectedItem" v-model="showMemeberModal"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { Prop, PropSync, Watch } from "vue-property-decorator";


import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import AddActor from "./AddActor.vue";

import IPractitioner, {
    PractitionerLocationRole,
  } from "@/types/IPractitioner";
import IDevice from "@/types/IDevice";
import IGroupMembers from "@/types/IGroupMembers";
import IGroup from "@/types/IGroup";

import CheckBox from "@/components/corniecheckbox.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDatePicker from "@/components/CornieDatePicker.vue";
import DRangePicker from "@/components/daterangepicker.vue";
import DeleteIcon from "@/components/icons/delete-red.vue";
import EditIcon from "@/components/icons/edit.vue";

const group = namespace("group");
const device = namespace("device");
const roles = namespace("roles");
const practitioner = namespace("practitioner");

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
    AddActor,
    DeleteIcon,
    EditIcon,
  },
})
export default class ViewMembers extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  groupId!: string;

  @Prop({ type: String, default: "" })
  memberid!: string;

  @Prop({ type: String, default: "" })
  memberToDelete!: string;

  @Prop({ type: Boolean, default: false })
  isUpdate!: Boolean;

  @Prop({ type: Object, default: [] })
  groupMembers!: IGroupMembers[];

  @group.Action
  deleteGroupMembers!: (id: string) => Promise<boolean>;

  entity = "Practitioner" as string;

   @practitioner.State
  practitioners!: IPractitioner[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<boolean>;

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
  memberId = "";
  showMemeberModal = false;
  selectedItem = {};

 
 getPractionerRoleName(id: string) {
    const pt = this.roles.find((i: any) => i.id === id);
    return pt ? `${pt.name}` : "";
  }
  getPractionerName(id: string) {
    const pt = this.practitioners.find((i: any) => i.id === id);
    return pt ? `${pt.firstName} ` +' '+ pt.lastName : "";
  }

  showMemeber(value:any){
    this.selectedItem = value;
    this.showMemeberModal = true;
  }

  async deleteItemId(id: string) {
    const confirmed = await window.confirmAction({
      message:
        "Are you sure you want to delete this group? This action cannot be undone.",
      title: "Delete Group",
    });
    if (!confirmed) return;

    if (await this.deleteGroupMembers(id))
      window.notify({ msg: "Group deleted", status: "error" });
    else window.notify({ msg: "Group not deleted", status: "error" });
  }

  async deleteMember(id:string) {
    const confirm = await window.confirmAction({
      message: "Are you sure you want to remove member?",
      title: "Remove member",
    });

    if (!confirm) return;

    this.groupMembers = [
      ...this.groupMembers.filter((item: any) => item.id !== id),
    ];

    this.memberToDelete = id;
  }


  async created() {
    await this.getRoles();
    await this.fetchPractitioners();
   
  }
}
</script>
