<template>
  <cornie-dialog v-model="show" right class="w-3/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
                Post Claim
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
            <span class="text-xs font-semibold text-green-600 mb-4">View Bill</span>
             <cornie-input
                    label="Pay Link"
                    class="w-full"
                    placeholder="Enter"
                    :disabled="true"
            >
                <template #append-inner>
                    <copy-icon />
                    
                </template>
             </cornie-input>
             <cornie-input
                    label="Patient’s Email"
                    class="w-full"
                    placeholder="Enter"
                    :disabled="true"
            />
             <cornie-input
                    label="Payment Amount (NGN)"
                    class="w-full"
                    placeholder="Autoloaded"
                    :disabled="true"
            />
               <text-area :label="'Note'"  placeholder="Type here" class="w-full"/>
       
        </v-form>
      </cornie-card-text>
      
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2  mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
             @click="show = false"
            class="text-white bg-danger px-2 rounded-xl"
           >
            Submit
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  <new-practitioner v-model="showPractitionerModal"   @practitioner-added="specialadded" :specilatyId="specilatyId"/>

  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import { namespace } from "vuex-class";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import ISpecial from "@/types/ISpecial";
import SelectOption from "@/components/custom-checkbox.vue";
import search from "@/plugins/search";
import TextArea from "@/components/textarea.vue";
import CopyIcon from "@/components/icons/copy.vue";
import CornieInput from "@/components/cornieinput.vue";

const practitioner = namespace("practitioner");
const special = namespace("special");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "managePractitioner",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CornieInput,
    CancelIcon,
    CornieDialog,
    Avatar,
    CopyIcon,
    SelectOption,
    SearchIcon,
    TextArea,
    DeleteIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class managePractitioner extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  specilatyId!: string;


  loading = false;
  showPractitionerModal = false;
  aPractitioner = [];
  localSrc = require("../../../../../assets/img/placeholder.png");
  query = "";
 orderBy: Sorter = () => 1;


 @practitioner.State
  practitioners!: IPractitioner[];


  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

 get filteredItems() {
    return this.practitioners
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

  async created() {
    await this.fetchPractitioners();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.dflex {
  display: -webkit-box;
}
.multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}
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
  -webkit-mask-image: url("../../../../../assets/img/Chevron.png");
  mask-image: url("../../../../../assets/img/Chevron.png");
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
