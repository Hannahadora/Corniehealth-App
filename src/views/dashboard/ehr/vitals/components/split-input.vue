<template>
  <div class="container-fluid pt-4">

      <div class="w-full">
          <div class="w-12/12 pt-1">
            <span class="flex capitalize mb-1 text-black text-sm font-semibold">{{ label }}</span>
          </div>
          <div class="w-full flex items-center">
            <div class="w-4/12 pl-0">
                <slot name="list" />
            </div>
            <div class="w-8/12 -mt-5 pl-0">
                <slot name="input" />
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue"
import CornieInput from "@/components/cornieinput.vue"
import { Prop } from "vue-property-decorator";

@Options({
  components: {
      CornieSelect,
      CornieInput,
  },
})
export default class SplitInput extends Vue {
    @Prop({ type: String, default: ''})
    label!: string;
}
</script>
