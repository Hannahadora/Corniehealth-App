<template>
  <div>
    <cornie-input
      type="number"
      class="w-full"
      placeholder="Enter"
      v-model="item.quantity"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieBtn from "@/components/CornieBtn.vue";

@Options({
  name: "QuantityInput",
  components: {
    CornieInput,
    CornieSelect,
    CornieBtn,
  },
})
export default class QuantityInput extends Vue {
  @Prop({ type: Object, default: <any>{} })
  item!: any;
}
</script>
<style>
</style>
