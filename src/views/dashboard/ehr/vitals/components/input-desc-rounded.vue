<template>
  <div class="container-fluid">

      <div class="w-full">
          <div class="w-12/12 py-1">
            <span class="font-semibold">{{ label }}</span>
          </div>
          <div class="w-full">
            <div class="w-12/12 relative" :class="{ '-mt-2': !label }">
              <slot />
                <!-- <slot name="input" /> -->
              <span class=" absolute right-2 top-2">
                <span class="italic" @click="showUnits">
                  <span v-if="info" class="">{{ info }}</span>
                  <span v-else><slot name="unit" /></span>
                  
                  
                </span>
                
                
                <div class="w-full flex flex-col" v-if="unitsVissible">
                  <!-- <a class="py-1 text-black text-sm font-weight-normal">nmjh </a>
                  <a class="py-1 text-black text-sm font-weight-normal">nmj </a>
                  <a class="py-1 text-black text-sm font-weight-normal">nmj </a>
                  <a class="py-1 text-black text-sm font-weight-normal">nmj </a> -->
                </div>
                </span>
              
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/cornieinput.vue"
import { Prop } from "vue-property-decorator";
import CornieSelect from "@/components/cornieselect.vue"

@Options({
  components: {
      CornieInput,
      CornieSelect,
  },
})
export default class DescInput extends Vue {
    @Prop({ type: String, default: ''})
    label!: string;

    @Prop({ type: String, default: ''})
    info!: string;

    d =""

    unitsVissible = false;

    showUnits() {
      this.unitsVissible = !this.unitsVissible;
    }
}
</script>
