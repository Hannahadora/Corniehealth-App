<template>
  <div class="container-fluid">
      <div  v-for="(input, index) in items" :key="index">
            <div class="bg-red-100 border-t-2 border-red-600 py-4 w-full" v-if="!input">
                <info-section  :text="'Book Appointment'"/>
            </div>
            <div class="bg-yellow-100 border-t-2 border-yellow-600 py-4 w-full" v-if="input.capacity == input.booked">
                <info-section  :text="'Book Appointment'"/>
            </div>
            <div class="bg-green-100 border-t-2 border-green-600 py-4 w-full" v-else>
                <info-section  :text="'Book Appointment'" class="cursor-pointer"
@click="$router.push(`/dashboard/experience/add-appointment?practitioner=${input.practitionerId}&slot=${input.id}`)"/>
            </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import InfoSection from "@/components/tooltip.vue";

@Options({
  components: {
      InfoSection
  },
})
export default class Colors extends Vue {
  @Prop({ type: Array, default: [] })
  items!: any;

bookedValue = 0;

  get actors() {
    const item = this.items.map((item:any) => {
        const total = item.capacity - item.booked;
        this.bookedValue = total;
      return {
        ...item,
      };
    });
    return item
  }
}
</script>
