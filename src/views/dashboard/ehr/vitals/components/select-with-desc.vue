<template>
  <div class="container-fluid">
    <div class="w-full">
      <div class="w-12/12 py-1">
        <span class="font-semibold">{{ label }}</span>
      </div>
      <div class="w-full">
        <div class="w-12/12 relative" :class="{ '-mt-2': !label }">
          <cornie-select
            type="text"
            class="p-2 border w-100 w-full"
            style="border-radius: 8px"
          />
          <!-- <slot name="input" /> -->
          <span class="text-gray-400 absolute right-2 top-2">{{ info }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue";
import { Prop } from "vue-property-decorator";

@Options({
  components: {
    CornieSelect,
  },
})
export default class DescInput extends Vue {
  @Prop({ type: String, default: "" })
  label!: string;

  @Prop({ type: String, default: "" })
  info!: string;
}
</script>
