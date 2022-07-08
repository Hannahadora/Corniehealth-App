<template>
<div class="h-screen">
  <!-- <div
      class="w-full h-2/3 mt-12 flex flex-col justify-center items-center"
      v-if="empty"
    >
      <img src="@/assets/rafiki.svg" class="mb-2" />
      <h4 class="text-black text-center">There are no ratings on record.</h4>
  </div> -->
  <div class="w-full pb-80">
    <div class="w-full mt-5">
      <cornie-table :columns="rawHeaders" v-model="sortRating" :check="false" :showPagination="true"
        @pagechanged="fetchRatings"
        :pageInfo="pageInfo">
        <template #actions="{ item }">
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showViewModal"
          >
            <eye-icon class="text-green-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="showReplyModal"
          >
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs">Reply</span>
          </div>
          <div
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
            @click="deleteItem(item.id)"
          >
            <delete-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">Delete</span>
          </div>
          <div class="flex items-center hover:bg-gray-100 p-3 cursor-pointer">
            <close-icon class="text-black fill-current" />
            <span class="ml-3 text-xs">Blacklist</span>
          </div>
        </template>
        <template #emotion>
          <cry-icon />
        </template>
      </cornie-table>

    </div>
  </div>
</div>
  <reply-modal v-model="showReply" />
  <view-modal v-model="showView" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import search from "@/plugins/search";
import { first, getTableKeyValue } from "@/plugins/utils";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

import IPageInfo from "@/types/IPageInfo";
import IRating from "@/types/IRating";

import CornieTable from "@/components/cornie-table/CornieTable.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import ThreeDotIcon from "@/components/icons/threedot.vue";
import SortIcon from "@/components/icons/sort.vue";
import SearchIcon from "@/components/icons/search.vue";
import TableRefreshIcon from "@/components/icons/tablerefresh.vue";
import FilterIcon from "@/components/icons/filter.vue";
import IconInput from "@/components/IconInput.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import TableOptions from "@/components/table-options.vue";
import CloseIcon from "@/components/icons/danger.vue";
import Select from "@/components/formselect.vue";
import SelectSurvey from "@/components/surveyselect.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import EyeIcon from "@/components/icons/yelloweye.vue";
import EditIcon from "@/components/icons/edit.vue";
import CancelIcon from "@/components/icons/cancel.vue";
import CryIcon from "@/components/icons/cry.vue";
import TimelineIcon from "@/components/icons/timeline.vue";
import DangerIcon from "@/components/icons/danger.vue";
import NoteIcon from "@/components/icons/notes.vue";
import UpdateIcon from "@/components/icons/newupdate.vue";
import PlusIcon from "@/components/icons/plus.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import MessageIcon from "@/components/icons/message.vue";
import ChevronDownIcon from "@/components/icons/chevrondown.vue";

import ReplyModal from "./allrating/reply.vue";
import ViewModal from "./allrating/view.vue";

const rating = namespace("rating");
const userStore = namespace("user");

@Options({
  components: {
    CancelIcon,
    ReplyModal,
    ViewModal,
    SortIcon,
    CloseIcon,
    CryIcon,
    NewviewIcon,
    UpdateIcon,
    ChevronDownIcon,
    TimelineIcon,
    SelectSurvey,
    NoteIcon,
    ThreeDotIcon,
    DangerIcon,
    Select,
    PlusIcon,
    SearchIcon,
    //  CloseIcon,
    MessageIcon,
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
export default class ratingExistingState extends Vue {
  showColumnFilter = false;
  showModal = false;
  loading = false;
  query = "";
  selected = 1;
  showNewExchangeRateModal = false;
  showDefaultCurrencyModal = false;
  currencyId = "";
  orgInfo = [] as any;
  showReply = false;
  showView = false;


  @rating.State
  ratings!: IRating[];

  @rating.Action
  deleteRating!: (id: string) => Promise<boolean>;

  @rating.Action
  fetchRatings!: () => Promise<void>;

  @rating.State
  pageInfo!: IPageInfo;

  getKeyValue = getTableKeyValue;

  preferredHeaders = [];
  rawHeaders = [
    {
      title: "name",
      key: "serial",
      show: true,
    },
    { title: "rating", key: "rating", show: true },
    {
      title: "description",
      key: "desciption",
      show: true,
    },
    { title: "emotion", key: "emotion", show: true },
    { title: "Comments", key: "comment", show: true },
    // Displaying Icon in the header - <table-setting-icon/>
  ];

  showReplyModal() {
    this.showReply = true;
  }
  showViewModal() {
    this.showView = true;
  }
  get header() {
    return [...this.rawHeaders, { title: "", value: "action", image: true }];
  }

  get items() {
    const ratings = this.ratings.map((rating) => {
      return {
        ...rating,
        action: rating.id,
        serial: "Ikhide Bright",
        rating: "3.1",
        comment: "Great Job!",
        desciption:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nibh a......",
      };
    });
    if (!this.query) {
      return ratings;
    } else {
      return search.searchObjectArray(ratings, this.query);
    }
  }
  get sortRating() {
    return this.items.slice().sort(function (a, b) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }

  async deleteItem(id: string) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to delete this rating?",
      title: "Delete Rating",
    });
    if (!confirmed) return;

    if (await this.deleteRating(id))
      window.notify({ msg: "Rating deleted", status: "success" });
    else window.notify({ msg: "Rating not deleted", status: "error" });
  }

  async showRateModal(value: string) {
    this.showNewExchangeRateModal = true;
    this.currencyId = value;
  }
  select(i: number) {
    this.selected = i;
  }
 
  get empty() {
    return this.ratings.length < 1;
  }

  async created() {
    this.fetchRatings();
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
