<template>
  <auto-complete :items="items" v-model="modelValueSync" :required="required" />
</template>
<script lang="ts">
import { getDropdown } from "@/plugins/definitions";
import { Codeable } from "@/types/misc";
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import AutoComplete from "./autocomplete.vue";

@Options({
  name: "FHIRInput",
  components: {
    AutoComplete,
  },
})
export default class FHIRInput extends Vue {
  @Prop({ type: String, default: "" })
  modelValue!: string;

  @PropSync("modelValue")
  modelValueSync!: string;

  @Prop({ type: String, required: true })
  reference!: string;

  @Prop({ type: Boolean, default: false })
  snomed!: boolean;

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  items: Codeable[] = [];

  async setRefs() {
    const ref = this.reference.trim();
    const defs = await getDropdown(ref);
    if (defs && Array.isArray(defs)) {
      this.items = defs;
    } else {
      window.notify({
        status: "error",
        msg: `Cannot get definitions for ${this.reference}`,
      });
    }
  }

  created() {
    this.setRefs();
  }
}
</script>
