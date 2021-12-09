<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title  class="w-full">
          <div class="w-full">
            <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">Associate Account</h2>
            <cancel-icon class="float-right cursor-pointer" @click="show = false"/>
          </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
              <div class="w-full">
          <div class="container  content-con">
            <div class="w-full py-3">
                <cornie-select
                label="Location"
                class="mb-4 w-full"
                :items="['Apapa Center']"
                placeholder="--Select Location--"
                />
                <div>
                    <span class="text-sm font-semibold mb-1">Pay Categories</span>
                    <Multiselect
                    v-model="value"
                    mode="tags"
                    :closeOnSelect="true"
                    :searchable="true"
                    :createTag="true"
                    :options="[
                        { value: 'Invoice',  },
                        { value: 'Credit Notes', },
                        { value: 'Quotes', },
                        ]"
                    label="value"
                    placeholder="--Select--"
                    class="w-full"

                >
                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                    <div class="multiselect-tag is-user">
                        {{option.value }}
                        <span
                        v-if="!disabled"
                        class="multiselect-tag-remove"
                        @mousedown.prevent="handleTagRemove(option, $event)"
                        >
                        <span class="multiselect-tag-remove-icon"></span>
                        </span>
                    </div>
                    </template>


                    </Multiselect>
                </div>
                <div>
                    <span class="text-sm font-semibold mb-1">Account</span>
                    <Multiselect
                    v-model="value2"
                    mode="tags"
                    :closeOnSelect="true"
                    :hideSelectedTag ="false"
                    :searchable="true"
                    :createTag="true"
                    :options="[
                        { value: 'GTB | 3456789009',answerOption:false,index:0},
                        { value: 'UBA | 0987654345',answerOption:false,index:1},
                        { value: 'GTB | 3456789010',answerOption:false,index:2},
                        { value: 'GTB | 3456789011',answerOption:false,index:3},
                        ]"

                    placeholder="--Select--"
                    class="w-full"

                >
                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                    <div class="multiselect-tag is-user">
                        {{option.value }}
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
                        <select-option v-model="option.answerOption"/> <span class="w-full text-sm">{{option.value }}</span>   <span  class="text-xs text-success flex justify-end float-right w-full" v-if="defaultText">Default</span> <span v-else class="text-xs text-danger flex justify-end float-right w-full" @click="defaultText = true" >Set a default</span>
                    </template>
                    </Multiselect>
                </div>
            </div>
            <div>
                <p class="text-sm text-danger font-semibold cursor-pointer">
                   <span class="text-danger text-lg">+</span> Add Locatioon
                </p>
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
              Cancel
            </cornie-btn>
            <cornie-btn  :loading="loading"
                  @click="apply" class="text-white bg-danger px-3 rounded-xl">
            Save
            </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from '@/components/cornieradio.vue'
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from '@/components/icons/info.vue'
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/autocomplete.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import CorniePhoneInput from "@/components/phone-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import MultiSelectsearch from "@/components/custom-multiselect.vue";
import { cornieClient } from "@/plugins/http";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import FailIcon from "@/components/icons/fail.vue";
import BluecheckIcon from "@/components/icons/bluecheck.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { string } from "yup";
import { flatten } from "@/plugins/utils";
import Multiselect from '@vueform/multiselect'


@Options({
  name: "nubanmodal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    Multiselect,
    ArrowLeftIcon,
    FailIcon,
    BluecheckIcon,
    CancelIcon,
    SelectOption,
    InfoIcon,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieInput,
    CornieSelect,
    CorniePhoneInput,
    CornieRadio,
    CornieBtn,
MultiSelectsearch

  },
})
export default class Medication extends Vue {
@PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Boolean, default: false })
  displayNubanTable!: boolean;


   @Prop({ type: String, default: "" })
  updatedBy!: string;

@Prop({ type: String, default: "" })
  currentStatus!: string;

  @Prop({ type: String, default: "" })
  dateUpdated!: string;

status = "";
  loading = false;
  expand = false;
  isVisible = "";
  value=null;
  value2=null;
  accountoption=false;

 error= false;
 defaultText= false;

  required = string().required();


 async updateStatus() {
   const id = this.id;
    const url = `/api/v1/requests/${id}`;
    const body = {
       status: this.status,
    }
    try {
      const response = await cornieClient().put(url, body);
      if (response.success){
          window.notify({ msg: "Status Updated", status: "success" });
        this.done();
      }

    } catch (error) {
      ;
        window.notify({ msg: "Status Not Updated", status: "error" });
      this.loading = false;
    }
  }



 done() {
    this.$emit("medicationAdded");
    this.show = false;
  }
  async apply() {
   // this.loading = true;
     //await this.updateStatus()
     this.displayNubanTable = true;
        this.show = false;
  //  this.loading = false;
  }

  async created() {

  }
}
</script>

<style>

.bg-gray {
    background-color: #F6F8F9;
}
.icon-wrap {
   content:counter(step);
  counter-increment: step;
    background: #fff;
    border-radius: 50%;
        top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
   left: -54em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap2 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: -7.5em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap3 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: -1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 52em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
.icon-wrap4 {
    background: #fff;
    border-radius: 50%;
    top: -0.3em;
    z-index: 1;
    color: #fff;
    border: 2px solid #FE4D3C;
    display: block;
    height: 1.4em;
    margin: 0 auto -0.6em;
    left: 42em;
    right: 0;
    position: absolute;
    width: 1.4em;
}
 .icon-check-mark{
    top: 1.3em;
    z-index: 1;
    left: 5em;
    right: 0;
    position: absolute;
}
.icon-check-mark2{
       top: 1.3em;
    z-index: 1;
    left: 23em;
    right: 0;
    position: absolute;
}
.icon-check-mark3{
      top: 1.3em;
    z-index: 1;
    left: 45.5em;
    right: 0;
    position: absolute;
}
.bg-danger-100{
    background-color: #FE4D3C;
}
</style>
