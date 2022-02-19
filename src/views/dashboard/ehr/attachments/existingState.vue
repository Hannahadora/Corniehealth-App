<template>
  <div class="w-full pb-80">
    <div>
      <span class="flex justify-end w-full mb-8">
        <button
          class="bg-danger rounded-full text-white mt-5 py-2 pr-12 pl-12 px-3 mb-5 font-semibold focus:outline-none hover:opacity-90"
          @click="showAttachment('false')"
        >
          New Attachments
        </button>
      </span>
      <cornie-table :columns="rawHeaders" v-model="sortAttachment">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="$router.push(`/dashboard/experience/add-task/${item.id}`)"
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="
              $router.push('/dashboard/provider/experience/add-appointment')
            "
          >
            <plus-icon class="text-green-400 fill-current" />
            <span class="ml-3 text-xs">Add Occurrence</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showAttachment(item.id)"
          >
            <edit-icon class="text-purple-600 fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </div>
        </template>
      </cornie-table>
    </div>

    <attachment-modal
      v-if="attachmentId == 'false'"
      :columns="practitioner"
      @allergy-added="attachmentAdded"
      @update:preferred="showAttachment"
      v-model="showAttachmentModal"
    />

    <attachment-modal
      v-else
      :id="currentAttachment"
      :columns="practitioner"
      @update:preferred="showAttachment"
      v-model="showAttachmentModal"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import PrintIcon from "@/components/icons/print.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import search from "@/plugins/search";

import { Prop } from "vue-property-decorator";
import IAttachment from "@/types/IAttachment";
import DeleteIcon from "@/components/icons/delete.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import ShareIcon from "@/components/icons/share.vue";
import CheckinIcon from "@/components/icons/checkin.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import AttachmentModal from "./add-attachment.vue";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

const attachments = namespace("attachments");

@Options({
  components: {
    CancelIcon,
    SortIcon,
    CheckinIcon,
    AttachmentModal,
    NewviewIcon,
    UpdateIcon,
    TimelineIcon,
    ShareIcon,
    ThreeDotIcon,
    DangerIcon,
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
    EditIcon,
    CornieTable,
    CardText,
    CornieDialog,
  },
})
export default class AttachmentExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNotes = false;
  showAttachmentModal = false;
  attachmentId = "";
  tasknotes = [];
  timeFormat = "";
  formattedTime = "";

  @Prop({ type: Array, default: [] })
  attachments!: IAttachment[];

  // @allergy.State
  // allergys!: IAllergy[];

  // @allergy.State
  // practitioners!: any[];

  // @allergy.Action
  // deleteAllergy!: (id: string) => Promise<boolean>;

  // @allergy.Action
  // getPractitioners!: () => Promise<void>;

  @attachments.Action
  fetchAttachment!: (patientId: string) => Promise<void>;

  preferredHeaders = [];
  rawHeaders = [
    // {
    //   title: "identifier",
    //   key: "id",
    //   show: true,
    // },
    { title: "Date", key: "createdAt", show: true },
    {
      title: "TIME",
      key: "time",
      show: true,
    },
    {
      title: "TITLE",
      key: "title",
      show: true,
    },
    {
      title: "FORMAT",
      key: "format",
      show: true,
    },
    {
      title: "SIZE",
      key: "size",
      show: true,
    },
  ];

  get headers() {
    const preferred =
      this.preferredHeaders.length > 0
        ? this.preferredHeaders
        : this.rawHeaders;
    const headers = preferred.filter((header) => header.show);
    return headers;
  }
  currentAttachment: any = null;
  get items() {
    const attachments = this.attachments.map((attachment) => {
      this.timeFormat = (attachment as any).createdAt.split("T");
      this.formattedTime = new Date(this.timeFormat).toLocaleTimeString(
        "en-US"
      );
      (attachment as any).createdAt = new Date(
        (attachment as any).createdAt
      ).toLocaleDateString("en-US");
      return {
        ...attachment,
        // date: attachment.id,
        title: attachment.title,
        format: attachment.format,
        size: attachment.fileSize,
        time: this.formattedTime,
      };
    });
    if (!this.query) return attachments;
    return search.searchObjectArray(attachments, this.query);
  }
  // getPractitionerName(id: string) {
  //   const pt = this.practitioners.find((i: any) => i.id === id);
  //   return pt ? `${pt.firstName} ${pt.lastName}` : "";
  // }
  async showAttachment(value: string) {
    this.showAttachmentModal = true;
    //this.stopEvent = true;
    this.currentAttachment = value;
  }
  get activePatientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  attachmentAdded() {
    this.attachments;
    this.fetchAttachment(this.activePatientId);
  }
  // async deleteItem(id: string) {
  //   const confirmed = await window.confirmAction({
  //     message: "You are about to delete this allergy",
  //     title: "Delete allergy",
  //   });
  //   if (!confirmed) return;

  //   if (await this.deleteAllergy(id))
  //     window.notify({ msg: "Allergy cancelled", status: "success" });
  //   else window.notify({ msg: "Allergy not cancelled", status: "error" });
  // }

  get sortAttachment() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  async created() {
    // this.getPractitioners();
    this.sortAttachment;
    alert("fetch");
    await this.fetchAttachment(this.activePatientId);
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
.status-accepted {
  background: #f3fcf8;
  color: #35ba83;
}
.status-inactive {
  background: #fff1f0;
  color: #fe4d3c;
}
.status-warning {
  background: #fefaf0;
  color: #f7b538;
}
</style>
