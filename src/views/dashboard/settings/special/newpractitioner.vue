<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           New Practitioner
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
             <div class="border-b-2 w-full border-dashed pb-2 mb-7 border-gray-300">
                <div class="">
                 <span class="mb-2 w-full rounded-full" @click="showDatalist = !showDatalist">
                    <icon-input
                    autocomplete="off"
                    class="border border-gray-600 rounded-full focus:outline-none"
                    type="search"
                    placeholder="Search"
                    v-model="query"
                    >
                    <template v-slot:prepend>
                        <search-icon />
                    </template>
                    </icon-input>
                 </span>
                  <div :class="[!showDatalist ? 'hidden' : 'o', filteredItems.length === 0 ? 'h-20' : 'h-auto']" 
                 class="absolute shadow bg-white border-gray-400 border top-100 z-40 left-0 m-3 rounded  overflow-auto mt-2 svelte-5uyqqj" style="width:96%">
                        <div class="flex flex-col w-full p-2">
                            <div v-for="(item, i) in filteredItems"
                                :key="i"
                                @click="selected(item)"
                                class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball">
                                <div  class="w-full text-sm items-center p-2 pl-2 border-transparent border-l-2 relative">
                                    {{ item?.firstName +' '+ item?.lastName   || item }}
                                    <p class="text-xs text-gray-500">[{{ item?.department }}]</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="filteredItems.length === 0">
                             <span class="py-2 px-5 text-sm text-gray-600 text-center flex justify-center">No result found!</span>
                        </div>
                  </div>
                </div>
            </div>
            <div>
                <span class="text-sm font-semibold mb-1">Account</span>
                <Multiselect
                  v-model="aPractitioner"
                  mode="tags"
                  :hide-selected="false"
                  id="field-id"
                  :options="allPractitioners"
                  value-prop="code"
                  trackBy="code"
                  label="code"
                  placeholder="--Select--"
                  class="w-full"
                >
                  <template v-slot:tag="{ option, handleTagRemove, disabled }">
                    <div class="multiselect-tag is-user">
                      {{ option.display }}
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
                    <select-option :value="option.display" :label="option.display"/>
                  </template>
                </Multiselect>
              </div>
          
       
        </v-form>
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
            @click="apply"
            class="text-white bg-danger px-6 rounded-xl"
           >
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>

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
import SelectOption from "@/components/custom-checkbox.vue";
import search from "@/plugins/search";
import ISpecial from "@/types/ISpecial";



const special = namespace("special");
const practitioner = namespace("practitioner");

type Sorter = (a: any, b: any) => number;


function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "newPractitioner",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CancelIcon,
    CornieDialog,
    Avatar,
    SearchIcon,
    DeleteIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon,
    SelectOption
  },
})
export default class newPractitioner extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  specilatyId!: string;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;


  loading = false;
  showPractitionerModal = false;
  showDatalist = false;
  aPractitioner = [];

 @practitioner.State
  practitioners!: IPractitioner[];
  query = "";

 @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;

  @practitioner.Action
  deletePractitioner!: (id: string) => Promise<boolean>;

  @practitioner.Action
  fetchPractitioners!: () => Promise<void>;

  orderBy: Sorter = () => 1;


  get allPractitioners() {
    return this.practitioners.map((i: any) => {
      return {
        code: i.id,
        display: i.firstName +' '+ i.lastName,
      };
    });
  }

  
  get filteredItems() {
    return this.practitioners
      .filter((item: any) => this.filter(item, this.query))
      .sort(this.orderBy);
  }

 get payload() {
    return {
        practitioners: this.aPractitioner,
    };
  }

 async apply() {
    this.loading = true;
     await this.save();
    this.loading = false;
  }
  
    async save() {
      try {
      const response = await cornieClient().post(
        `/api/v1/specialty/practitioner/${this.specilatyId}`,
        this.payload
      );
      if(response.success){
          this.done();
        window.notify({ msg: "Practitioner saved successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Practitioner not saved", status: "error" });
    }
  }
  
 async specialadded(){
     await this.fetchSpecials();
  }
 
  done() {
    this.$emit("practitioner-added");
    this.show = false;
  }


  created() {
    this.fetchPractitioners();
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
