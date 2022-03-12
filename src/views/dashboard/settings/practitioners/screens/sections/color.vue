<template>
  <div class="container-fluid">
    <div v-if="items.length > 0">
        <div  v-for="(slot, index) in items" :key="index">
              <div class="bg-red-100 border-t-2 border-red-600 py-4 w-full" v-if="!Boolean(slot)">
              </div>
              <div class="bg-yellow-100 border-t-2 border-yellow-600 py-4 w-full" v-if="slot.capacity == slot.booked">
              </div>
              <div class="bg-green-100 border-t-2 border-green-600 py-4 w-full"  v-if="slot.capacity > slot.booked">
                  <info-section  :text="'Book Appointment'" class="cursor-pointer"
                  @click="$router.push(`/dashboard/experience/add-appointment?practitioner=${slot.practitionerId}&slot=${slot.id}`)"/>
              </div>
        </div>
    </div>
      <div  v-else>
            <div class="bg-red-100 border-t-2 border-red-600 py-4 w-full">
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
