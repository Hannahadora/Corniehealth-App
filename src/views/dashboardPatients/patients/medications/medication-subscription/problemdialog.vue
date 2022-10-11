<template>
  <cornie-dialog v-model="show" right class="w-5/12 h-full">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">Allergy</h2>
          </div>
          <delete-icon
            class="text-danger fill-current cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <div class="flex flex-col p-3 mb-7">
          <div class="w-full">
            <cornie-input
              class="w-full"
              label="Allergy"
              placeholder="--Enter--"
              v-model="allergy"
            />
           <div class="mt-6">
            <cornie-btn
              :loading="loading"
              @click="addAllergy"
              class="text-white bg-danger px-6 rounded-xl "
            >
              Add
            </cornie-btn>
           </div>
          </div>
          <div class="h-full">
            <div>
              <div v-for="(input, index) in allergys" :key="index" class="flex items-center justify-between">
              <span>{{ index + 1 }}. {{ input }}</span>
              <span class="mx-2 cursor-pointer"
                ><delete-icon @click="removeItem(index, allergys)"
              /></span>
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>

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
          Update
        </cornie-btn>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import search from "@/plugins/search";
import CornieDialog from "@/components/CornieDialog.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieCard from "@/components/cornie-card";
import DeleteIcon from "@/components/icons/cancel.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import DatePicker from "@/components/datepicker.vue";
import { string } from "yup";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import SearchIcon from "@/components/icons/search.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieBtn from "@/components/CornieBtn.vue";

import Problem from "@/types/IImpression";
import { ICondition } from "@/types/ICondition";
import IAllergy from "@/types/IAllergy";

import { mapDisplay } from "@/plugins/definitions";

type Sorter = (a: any, b: any) => number;

function defaultFilter(item: any, query: string) {
  return search.searchObject(item, query);
}

@Options({
  name: "ProblemDialog",
  components: {
    CornieDialog,
    ArrowLeftIcon,
    CornieIconBtn,
    DatePicker,
    ...CornieCard,
    CornieSelect,
    CornieInput,
    DeleteIcon,
    SearchIcon,
    CornieRadio,
    CornieBtn,
  },
})
export default class ProblemDialog extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: Function, default: defaultFilter })
  filter!: (item: any, query: string) => boolean;

  orderBy: Sorter = () => 1;
  loading = false;
  isVisible = "";

  query = "";
  allergy = "";
  allergys: any = [];

  required = string().required();

  addAllergy() {
    if (this.allergy) {
      this.allergys.push(this.allergy);
      this.$nextTick(() => {
        this.allergy = "";
      });
    }
  }

  removeItem(index: number, items: any) {
    items.splice(index, 1);
  }

  apply() {
    this.$emit("getProblem", this.allergys);
    this.show = false;
  }

  async created() {}
}
</script>
