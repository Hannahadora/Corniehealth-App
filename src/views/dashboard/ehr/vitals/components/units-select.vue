<template>
  <div class="flex flex-col items-center w-11/12 mb-5">
    <div class="w-full flex flex-col items-center">
      <div class="w-full">
        <div class="flex flex-col items-center relative" :id="id">
          <div class="w-full" @click="toggle">
            <label
              v-if="label || $slots.label"
              class="flex uppercase mb-1 text-black text-xs font-bold"
              :for="`${id}-inputfield`"
            >
              <slot name="label" v-if="$slots.label" />
              <template v-else>
                {{ label }}
              </template>
              <span class="text-danger ml-1" v-if="required"> * </span>
              <span class="ml-1 mb-1" v-if="$slots.labelicon"
                ><slot name="labelicon"
              /></span>
            </label>
            <field
              v-slot="{ errorMessage, meta, handleChange }"
              :rules="rules"
              v-model="modelValueSync"
              :name="inputName"
            >
              <div
                v-bind="$attrs"
                :class="{
                  'border-red-500': Boolean(errorMessage),
                  'border-green-400': meta.valid && meta.touched,
                }"
                class="p-1 bg-white flex border border-gray-200 rounded-lg"
              >
                <span v-if="Boolean($slots.selected)">
                  <slot name="selected" :item="selectedItem" />
                </span>
                <input
                  v-else
                  placeholder="Select"
                  disabled
                  :value="displayVal"
                  class="p-1 pl-1 bg-transparent appearance-none outline-none w-full text-gray-800"
                  @change="handleChange"
                />

                <div
                  class="text-gray-300 py-1 flex items-center border-gray-200"
                >
                  <chevron-down-icon />
                </div>
              </div>
              <span v-if="errorMessage" class="text-xs text-red-500 block">
                {{ errorMessage }}
              </span>
            </field>
          </div>
          <div
            :class="{ hidden: !showDatalist }"
            class="absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto mt-2 svelte-5uyqqj"
          >
            <div class="flex flex-col w-full p-2">
              <div
                v-for="(item, i) in items"
                :key="i"
                @click="selected(item)"
                class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
              >
                <template v-if="Boolean($slots.item)">
                  <slot name="item" v-bind:item="item" />
                </template>
                <div
                  v-else
                  class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative"
                >
                  {{ item.display || item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { clickOutside } from "@/plugins/utils";
import { nextTick } from "vue";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import ChevronDownIcon from "@/components/icons/chevrondownprimary.vue";
import { Field } from "vee-validate";

@Options({
  components: {
    ChevronDownIcon,
    Field,
  },
})
export default class CornieSelect extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any[];

  @Prop({ type: Object })
  rules!: any;

  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  @Prop({ type: Boolean, default: false })
  readonly!: boolean;

  @Prop({ type: String })
  label!: string;

  @Prop({ type: String, default: "" })
  labelicon!: string;

  showDatalist = false;
  id = "";

  get displayVal() {
    if (!this.modelValue || this.items.length < 1) return;

    const selected = this.selectedItem;
    return selected?.display || selected || "";
  }

  get selectedItem() {
    const selected = this.items.find(
      (item) => item.code == this.modelValue || item == this.modelValue
    );
    return selected;
  }

  toggle() {
    if (this.readonly) return;
    this.showDatalist = !this.showDatalist;
  }

  selected(item: any) {
    nextTick(() => {
      this.showDatalist = false;
      this.modelValueSync = item.code || item;
    });
  }
  get inputName() {
    const id = Math.random().toString(36).substring(2, 9);
    return `select-${id}`;
  }

  @Watch("items")
  update() {
    this.$emit("change");
  }

  //    @Watch("modelValue")
  // updateSubject(){
  //      this.$emit("changesubject")
  //   }
  //    @Watch("modelValue")
  //   updateRequester(){
  //      this.$emit("changerequest")
  //   }
  //   updatePerformer(){
  //      this.$emit("changeperformer")
  //   }

  mounted() {
    clickOutside(this.id, () => {
      this.showDatalist = false;
    });
  }

  created() {
    const slug = String(Math.random());
    this.id = `click-box-${slug}`;
  }
}
</script>
<style scoped>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
::placeholder {
  font-size: 0.8em;
  font-weight: 300;
  color: #667499;
}
</style>
