<template>
  <div class="w-full border-b border-gray-400 mb-5 flex justify-between pb-1">
    <h1 class="font-bold">
      <slot></slot>
    </h1>

    <slot name="icon"></slot>
  </div>
  <div>
    <cornie-avatar-field v-model="properties.img.url" />
    <div class="flex justify-between items-baseline mt-5 mb-10">
      <h1 class="font-bold">General Practitioner</h1>
      <cornie-checkbox
        v-model="properties.available"
        :disabled="true"
        :label="'Make Available For Online Booking'"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";

@Options({
  name: "ScreenHeader",
  components: {
    CornieAvatarField,
    CornieCheckbox,
  },
})
export default class ScreenHeader extends Vue {
  @Prop({ default: {} })
  properties!: any;
}
</script>
