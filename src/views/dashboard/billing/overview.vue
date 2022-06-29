<template>
  <div class="flex flex-col w-full space-y-10">
    <div class="rounded-xl bg-white p-10">
      <div class="flex">
        <div class="flex-1 capitalize text-2xl font-bold">collection trend</div>
        <div class="flex-none">
          <!-- <div class="rounded-xl px-4 py-2 bg-blue-100">JUN 01 -JUN 07</div> -->
          <date-picker mode="range" class="w-full" v-model="startDate" />
        </div>
      </div>
      <div
        @click="showFilterDialog = true"
        class="flex items-center justify-end space-x-3 py-7 cursor-pointer font-bold"
      >
        <Filter />
        <div>Filter</div>
      </div>
      <div class="pt-10">
        <chart />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-10">
      <div class="rounded-xl bg-white p-10">
        <div class="flex">
          <div class="flex-1 capitalize text-2xl font-bold">collections</div>
          <div class="flex-none">
            <!-- <div class="rounded-xl px-4 py-2 bg-blue-100">JUN 01 -JUN 07</div> -->
            <date-picker mode="range" class="w-full" v-model="startDate" />
          </div>
        </div>
        <div class="pt-10">
          <Collectables />
        </div>
        <div class="flex justify-end items-center mt-5">
          <span class="mx-2 font-semibold cursor-pointer" style="color: #fe4d3c"
            >View All
          </span>
          <ArrowRight />
        </div>
      </div>
      <div class="rounded-xl bg-white p-10">
        <div class="flex">
          <div class="flex-1 capitalize text-2xl font-bold">
            Account Receivables
          </div>
          <div class="flex-none">
            <!-- <div class="rounded-xl px-4 py-2 bg-blue-100">JUN 01 -JUN 07</div> -->
            <date-picker mode="range" class="w-full" v-model="startDate" />
          </div>
        </div>
        <div class="pt-10">
          <Collectables />
        </div>
        <div class="flex justify-end items-center mt-5">
          <span class="mx-2 font-semibold cursor-pointer" style="color: #fe4d3c"
            >View All
          </span>
          <ArrowRight />
        </div>
      </div>
      <div class="rounded-xl bg-white p-10">
        <div class="flex">
          <div class="flex-1 capitalize text-2xl font-bold">
            Unbilled Transactions
          </div>
          <div class="flex-none">
            <!-- <div class="rounded-xl px-4 py-2 bg-blue-100">JUN 01 -JUN 07</div> -->
            <date-picker mode="range" class="w-full" v-model="startDate" />
          </div>
        </div>
        <div class="pt-10">
          <Collectables />
        </div>
        <div class="flex justify-end items-center mt-5">
          <span class="mx-2 font-semibold cursor-pointer" style="color: #fe4d3c"
            >View All
          </span>
          <ArrowRight />
        </div>
      </div>
      <div class="rounded-xl bg-white p-10">
        <div class="flex">
          <div class="flex-1 capitalize text-2xl font-bold">
            Transaction Volumes
          </div>
          <div class="flex-none">
            <!-- <div class="rounded-xl px-4 py-2 bg-blue-100">JUN 01 -JUN 07</div> -->
            <date-picker mode="range" class="w-full" v-model="startDate" />
          </div>
        </div>
        <div class="pt-10">
          <Collectables />
        </div>
        <div class="flex justify-end items-center mt-5">
          <span class="mx-2 font-semibold cursor-pointer" style="color: #fe4d3c"
            >View All
          </span>
          <ArrowRight />
        </div>
      </div>
    </div>
    <div class="rounded-xl bg-white p-10">
      <div class="flex">
        <div class="flex-1 capitalize text-2xl font-bold">Billing trend</div>
        <div class="flex-none">
          <!-- <div class="rounded-xl px-4 py-2 bg-blue-100">JUN 01 -JUN 07</div> -->
          <date-picker mode="range" class="w-full" v-model="startDate" />
        </div>
      </div>
      <div class="pt-10">
        <chart />
      </div>
    </div>
    <ChartFilterDialog v-model="showFilterDialog" />
  </div>
</template>
<script lang="ts">
  import DatePicker from "@/components/datepicker.vue";
  import Filter from "@/components/icons/filter.vue";
  import { Options, Vue } from "vue-class-component";
  import ArrowRight from "../settings/BookingSite/components/arrow-right.vue";
  import ChartFilterDialog from "./components/chart-filter-dialog.vue";
  import chart from "./components/chart.vue";
  import Collectables from "./components/collectables.vue";

  @Options({
    components: {
      chart,
      Collectables,
      DatePicker,
      ArrowRight,
      Filter,
      ChartFilterDialog,
    },
  })
  export default class BillingOverview extends Vue {
    startDate = "";
    endDate = "";
    showFilterDialog = false;
  }
</script>
