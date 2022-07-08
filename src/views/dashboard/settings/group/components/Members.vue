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
            <span class="text-gray-500 text-sm">7 MEMBERS</span>
            <div class="border-2 border-gray-300 p-4 mt-4 overflow-y-auto overflow-x-hidden px-2 h-96">
                <div class="flex align-center justify-between w-full border-b-2 border-gray-300 pb-5">
                    <div class="w-full">
                        <p class="text-sm"> 
                            Dr.Ajayi Charles
                        </p>
                        <span class="text-xs text-gray-500">
                            ADMIN
                        </span>
                    </div>
                    <div class="flex space-x-4 w-full justify-end">
                        <edit-icon/>
                        <delete-icon/>
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
  <add-actor :memberid="memberId"/>
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

  entity = "Practitioner" as string;



  @group.State
  groupMembers!: IDevice[];

  @group.Action
  fetchGroupMembers!: () => Promise<boolean>;


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

 

    get payload() {
    return {
      members: this.selectedActors.map((item: any) => {
        return {
          userId: item.id,
          period: item.period,
          status: item.status,
        };
      }),
    };
  }



  async created() {
    await this.fetchGroupMembers();
   
  }
}
</script>
