<template>
  <div class="p-3" v-if="tablecard" :style="{'height': height,'overflow-y': overflow}">
    <slot />
  </div>
  <div class="p-3" v-else>
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "CornieCard",
  components: {
  },
})
export default class CornieCard extends Vue {
  @Prop({ type: Boolean, default: false })
  tablecard!: boolean;

  @Prop({ type: String, default: "8em" })
  height!: string;

  @Prop({ type: String, default: "auto" })
  overflow!: string;

}
</script>