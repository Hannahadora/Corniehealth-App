<template>
  <div>
    <div class="bg-white p-6">
      <span class="font-bold text-xl">Timeframe</span>

      <div class="grid grid-cols-4 gap-8">
        <div></div>

        <div>
          <input type="date" />
        </div>

        <div>
          <input type="date" />
        </div>

        <div>
          <button
            class="py-3 px-auto rounded-lg text-white font-bold text-base"
            style="background: #fe4d3c"
            type="button"
          >Fetch Records</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "TimeFrame",
  components: {},
})
export default class TimeFrame extends Vue {}
</script>

<style></style>
