<template>
  <div>
    <date-picker v-bind="$attrs" v-model="dateSync">
      <template #text>
        <span>
          <input
            type="text"
            class="outline-none focus:outline-none"
            v-model="textSync"
            placeholder="--Enter--"
          />
        </span>
      </template>
    </date-picker>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DatePicker from "@/components/copypicker.vue";
import { Prop, PropSync } from "vue-property-decorator";

@Options({
  name: "DatetextPicker",
  inheritAttrs: false,
  components: {
    DatePicker,
  },
})
export default class DatetextPicker extends Vue {
  @Prop({ type: String, default: "" })
  date!: string;

  @Prop({ type: String, default: "" })
  text!: string;

  @PropSync("date")
  dateSync!: string;

  @PropSync("text")
  textSync!: string;
}
</script>
<style scoped>
input[type="text"] {
  position: relative;
}

input[type="text"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  color: transparent;
  background: transparent;
}
</style>
