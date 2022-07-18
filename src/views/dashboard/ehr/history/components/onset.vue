<template>
  <div class="block w-full mt-4">
    <span
      class="flex capitalize mb-1 text-black text-sm font-semibold items-center"
    >
      {{ label }}
      <info-icon class="fill-current ml-2 text-primary" />
    </span>
    <div class="grid grid-cols-4 gap-4 mt-4 w-1/2">
      <cornie-radio :name="name" v-model="type" value="age" label="Age"  @click="setType(type)"/>
       <cornie-radio :name="name" v-model="type" label="Range" value="range" @click="setType(type)"/>
      <cornie-radio :name="name" v-model="type" value="string" label="Year" @click="setType(type)"/>
    </div>
     <div class="grid grid-cols-2 gap-4 mt-4" v-if="type == 'age'">
       <div class="w-full -mt-1">
          <span class="text-sm font-semibold mb-3">Age</span>
          <div class="flex space-x-2 w-full">
              <cornie-input
              placeholder="0"
              class="grow w-full"
              :setfull="true"
              v-model="measurable.age"
              />
              <cornie-select
                :items="['days', 'months', 'years']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="measurable.ageUnit"
              />
          </div>
       </div>
    </div>
     <div class="grid grid-cols-3 gap-3 mt-4 w-full" v-if="type == 'range'">
       <div class="w-full -mt-1">
          <span class="text-sm font-semibold mb-3">Range (min)</span>
          <div class="flex space-x-2 w-full">
              <cornie-input
              placeholder="0"
              class="grow w-full"
              :setfull="true"
              v-model="measurable.min"
              />
              <cornie-select
                 :items="['days', 'months', 'years']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="measurable.minUnit"
              />
          </div>
       </div>
       <div class="w-full -mt-1">
          <span class="text-sm font-semibold mb-3">Range (max)</span>
          <div class="flex space-x-2 w-full">
              <cornie-input
              placeholder="0"
              class="grow w-full"
              :setfull="true"
              v-model="measurable.max"
              />
              <cornie-select
                 :items="['days', 'months', 'years']"
                placeholder="Days"
                class="w-32 mt-0.5 flex-none"
                :setPrimary="true"
                v-model="measurable.maxUnit"
              />
          </div>
       </div>
    </div>
    <div class="grid grid-cols-2 gap-3 mt-1" v-if="type == 'string'">
      <cornie-input label="Year" v-model="measurable.string" />
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTooltip from "@/components/CornieTooltip.vue";
import InfoIcon from "@/components/icons/info.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { ITimeable } from "@/types/ITimeable";
import CornieSelect from "@/components/cornieselect.vue";
import IMeasurable from "@/types/IMeasurable";

const measurable = {
  age: "",
  ageUnit: "years",
  day: "" ,
  unit: "",
  min: "",
  max: "",
  string: "",
  minUnit: "years",
 maxUnit: "years",
};

@Options({
  name: "onSetPicker",
  components: {
    CornieRadio,
    CornieInput,
    CornieTooltip,
    InfoIcon,
    CornieSelect,
  },
})
export default class onSetPicker extends Vue {
  @Prop({ type: Object, default: measurable })
  modelValue!: IMeasurable;

  @PropSync("modelValue", { default: measurable })
  measurable!: IMeasurable;

  @Prop({ type: String })
  label!: string;



  type = "age";

setType(type:string) {
   if(type) return this.measurable = {};

  }

//    newmeasurable = {
//       age: "",
//       ageUnit: "years",
//       ageValue: "",
//       day: "",
//       unit: "years",
//       min: "",
//       max: "",
//       string: "",
//       minUnit: "years",
//       maxUnit: "years",
//     };

  // mounted() {
  //   this.setType();
  // }

  // @Watch("timeable", { deep: true })
  // timeChanged() {
  //   this.setType();
  // }

   created() {
    if (!this.measurable) this.measurable = measurable as any;
  }

  get name() {
    const id = Math.random().toString(36).substring(2, 9);
    return `measurable-${id}`;
  }
}
</script>
