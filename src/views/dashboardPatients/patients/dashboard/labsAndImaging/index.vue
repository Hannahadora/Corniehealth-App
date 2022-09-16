<template>
  <div
    class="flex justify-center bg-white mb-auto pb-72 h-full shadow-lg p-3 mt-2 rounded-lg w-full"
  >
    <div class="w-full">
      <span
        class="flex flex-col w-full justify-center border-b-2 font-bold mb-10 text-xl text-primary py-2"
      >
        Labs & Imaging
      </span>
      <span class="w-full">
        <tabs :items="tabLinks" v-model="currentTab">
          <doctor-order />
          <self-order @newLabOrder="showNewLabOrder" />
        </tabs>
      </span>
    </div>
    <new-order v-model="showNewOrder" />
  </div>
</template>

<script lang="ts">
  import ChevronLeftIcon from "@/components/icons/chevronleftorange.vue";
  import ChevronRightIcon from "@/components/icons/chevronrightorange.vue";
  import Tabs from "@/components/tabs.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";

  import DoctorOrder from "./components/doctor-order.vue";
  import newOrder from "./components/new-order.vue";
  import selfOrder from "./components/self-order.vue";
  @Options({
    name: "AccountSettings",
    components: {
      Tabs,
      ChevronRightIcon,
      ChevronLeftIcon,
      DoctorOrder,
      selfOrder,
      newOrder,
    },
  })
  export default class AccountSettings extends Vue {
    @Prop({ type: String, default: "" })
    id!: string;

    tabLinks = ["Doctor Order", "Self Order"];
    currentTab = 0;
    showNewOrder = false;

    showNewLabOrder() {
      this.showNewOrder = !this.showNewOrder;
    }
    async created() {}
  }
</script>

<style></style>
