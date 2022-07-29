<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
             New Variant
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
           <div class="w-full">
                <div class="w-full mt-3 mb-5">
                    <div class="container">
                    <span class="flex items-center">
                        <avatar class="mr-2" v-if="img.url" :src="img.url" />
                        <avatar class="mr-2 h-20 w-20" v-else :src="img.placeholder" />
                        <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="file"
                        @change="img.onChange"
                        hidden
                        />
                        <label for="file" class="add-xteristic font-bold cursor-pointer">
                        Upload
                        </label>
                    </span>
                    </div>
                </div>

                <div class="w-full my-4">
                    <cornie-select
                    :label="'Form'"
                    v-model="data.form"
                    style="width: 100%"
                    :placeholder="'Select'"
                    />
                </div>

                <div class="w-full my-4">
                    <cornie-select
                    :label="'Pack'"
                    v-model="data.pack"
                    style="width: 100%"
                    :items="['Option 1']"
                    :placeholder="'Select'"
                    />
                </div>

                <div class="w-full my-4">
                    <cornie-input
                    :label="'Pack Quantity'"
                    v-model="data.packQuantity"
                    style="width: 100%"
                    :placeholder="'Enter'"
                    />
                </div>

                <div class="w-full my-4">
                    <cornie-select
                    :label="'Strength'"
                    v-model="data.strength"
                    style="width: 100%"
                    :items="['Option 1']"
                    :placeholder="'Select'"
                    />
                </div>

                <button class="w-full my-4" @click="add">
                    <a class="flex add-xteristic"><span class="mr-2"><add-icon /></span>
                        <span>Add New Characteristics</span></a>
                </button>
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
import { getDropdown } from "@/plugins/definitions";
import { Codeable } from "@/types/misc";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { useHandleImage } from "@/composables/useHandleImage";

import ISpecial from "@/types/ISpecial";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";

import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import FhirInput from "@/components/fhir-input.vue";
import SelectOption from "@/components/custom-checkbox.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import LocationIcon from "./locationicon.vue";
import Avatar from "@/components/avatar.vue";
import AddIcon from "@/components/icons/add-orange.vue";

const special = namespace("special");
const dropdown = namespace("dropdown");

@Options({
  name: "variantModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    FhirInput,
    CornieDialog,
    SearchIcon,
    IconInput,
    CornieBtn,
    CancelIcon,
    SelectOption,
    CornieSelect,
    CloseIcon,
    AccordionComponent,
    LocationIcon,
    Avatar,
    AddIcon
  },
})
export default class variantModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  img = setup(() => useHandleImage());

  data = {
    id: Math.random() * 1999 + Math.random() * 2999,
    image: "",
    form: "",
    pack: "",
    packQuantity: "",
    strength: "",
  } as any;

  add() {
    const { form, pack, packQuantity, strength } = this.data;
    if (
      form === "" ||
      packQuantity === "" ||
      pack === "" ||
      strength === "" ||
      this.img.url === ""
    )
      return;

    this.data.image = this.img.url;

    this.$emit("added", this.data);

    this.img.url = "";

    this.reset();
  }


  reset() {
    this.data = {
      id: Math.random() * 1999 + Math.random() * 2999,
      image: "",
      form: "",
      pack: "",
      packQuantity: "",
      strength: "",
    } as any;
  }

  async created() {
 
  }
}
</script>

<style>
.add-xteristic {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #fe4d3c;
}
</style>
