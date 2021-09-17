<template>
  <div
    class="
      flex-col
      justify-center
      bg-white
      shadow-md
      p-3
      mt-2
      mb-2
      rounded
      w-full
      overflow-auto
    "
  >
    <div class="w-full p-2">
      <span
        class="
          flex flex-col
          w-full
          justify-center
          border-b-2
          font-bold
          mb-5
          text-xl text-primary
          py-2
        "
      >
        Care Team
      </span>
      <registration-chart class="w-full" :height="100" />
      <span class="w-full bg-danger">
        <span class="flex justify-end w-full m4-5">
          <cornie-btn
            @click="registerNew = true"
            class="text-primary m-5"
            style="border: 1px solid #080056;"
          >
            Create New
          </cornie-btn>
          <cornie-btn
            @click="addToExisting = true"
            class="bg-danger text-white m-5"
          >
            Add to existing
          </cornie-btn>
        </span>
      </span>
    </div>
    <div class="p-2">
      <cornie-table
        v-model="items"
        :columns="headers"
        @filter="filterAdvanced = true"
      >
        <template #name="{ item }">
          <div class="flex items-center">
            <avatar class="w-5 h-5" :src="item.photo" />
            <span class="text-xs ml-2 font-semibold">{{ item.name }}</span>
          </div>
        </template>
        <template #actions="{  }">
          <table-action
            
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs pr-4">View</span>
          </table-action>
          <table-action
          >
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs pr-4">Edit</span>
          </table-action>
          <table-action
            
          >
            <share-icon class="text-red-500 fill-current" />
            <span class="ml-3 text-xs pr-4">Share</span>
          </table-action>
        </template>
      </cornie-table>

      <modal :visible="addToExisting">
      <template #title>
        <div class="w-full">
          <div class="container p-6 content-con" style="min-width: 450px">
            <p class="text-primary text-2xl font-semibold pb-3">Add to existing care team</p>
            <span style="color:#667499" class="text-secondary text-base">Search a care team	</span>

            <div class="w-full py-6">
              <cornie-input :placehode="'Search'" style="width: 100%;border-radius:50%" placeholder="Enter">
                <template v-slot:prepend>
                  <search-icon />
                </template>
              </cornie-input>
            </div>
            <div class="w-full flex flex justify-end">
                <corniebtn class="bg-white p-2 cancel-btn rounded-full px-8 mx-4 cursor-pointer" style="border: 1px solid #080056;">
                    <span class="font-semibold" @click="addToExisting = false">Cancel</span>
                </corniebtn>

                <corniebtn class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold">Add</span>
                </corniebtn>
            </div>
          </div>
        </div>
      </template>
    </modal>
      
      <side-modal :visible="registerNew" @closesidemodal="() => registerNew = false" :header="'New Care Team'">
        <CareTeamForm />
      </side-modal>
    </div>
    
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieCard from "@/components/cornie-card";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import Avatar from "@/components/avatar.vue";
import EditIcon from "@/components/icons/edit.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import SettingsIcon from "@/components/icons/settings.vue";
import TableAction from "@/components/table-action.vue";
import SideModal from "@/views/dashboard/schedules/components/side-modal.vue";
import CareTeamForm from './components/careteam-form.vue';
import Modal from "@/components/modal.vue";
import CornieInput from '@/components/cornieinput.vue'
import SearchIcon from "@/components/icons/search.vue"
import ShareIcon from "@/components/icons/share.vue"

@Options({
  name: "EHRCareTeam",
  components: {
    ...CornieCard,
    TableAction,
    SettingsIcon,
    EditIcon,
    NewviewIcon,
    CancelIcon,
    Avatar,
    CornieCardTitle,
    CornieCardText,
    CornieBtn,
    CornieTable,
    SideModal,
    CareTeamForm,
    Modal,
    CornieInput,
    SearchIcon,
    ShareIcon,
  },
})

export default class EHRCareTeam extends Vue {
  registerNew = false;
  addToExisting = false;

  headers = [
    {
      title: "header1",
      key: "header1",
      show: true,
    },
    {
      title: "header2",
      key: "header2",
      show: true,
    },
    {
      title: "header3",
      key: "header3",
      show: true,
    },
    {
      title: "header4",
      key: "header4",
      show: true,
    },
    {
      title: "header5",
      key: "header5",
      show: true,
    },
    {
      title: "header6",
      key: "header6",
      show: true,
    },
  ];

  get items() {
    return [
        {
        header1: `XXX`,
        header2: 'YYY',
        header3: 'YYY',
        header4: 'YYY',
        header5: 'YYY',
        header6: 'YYY',
        id: 'll',
        },
        {
        header1: `XXX`,
        header2: 'YYY',
        header3: 'YYY',
        header4: 'YYY',
        header5: 'YYY',
        header6: 'YYY',
        id: 'll',
        },
    ];
  }

}
</script>
