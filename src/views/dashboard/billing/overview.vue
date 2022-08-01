<template>
  <div class="flex flex-col w-full space-y-10">
    <div class="rounded-xl bg-white p-10">
      <div class="flex">
        <div class="flex-1 capitalize text-2xl font-bold">collection trend</div>
        <div class="flex w-1/4">
          <!-- <div class="rounded-xl px-4 py-2 bg-blue-100">JUN 01 -JUN 07</div> -->
          <!-- <date-picker mode="range" class="w-full" v-model="startDate" /> -->
          <period-picker
            label="Period"
            class="-mt-1.5 w-full"
            v-model="period"
            placeholder="--Select--"
            :required="true"
          />
        </div>
      </div>
      <span class="flex items-center justify-end space-x-3 py-7 font-bold">
        <Filter class="cursor-pointer" />
        <div @click="showFilterDialog = true" class="cursor-pointer">
          Filter
        </div>
      </span>
      <div class="pt-10">
        <chart :range="period" />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-10">
      <div class="rounded-xl bg-white p-10">
        <div class="flex">
          <div class="flex-1 capitalize text-2xl font-bold">collections</div>
          <div class="flex w-3/6">
            <period-picker
              class="-mt-1.5 w-full"
              v-model="collectablesPeriod"
              placeholder="--Select--"
              :required="true"
            />
          </div>
        </div>
        <div class="pt-10">
          <Collectables :range="collectablesPeriod" />
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
          <div class="flex w-3/6">
            <period-picker
              class="-mt-1.5 w-full"
              v-model="receivablesPeriod"
              placeholder="--Select--"
              :required="true"
            />
          </div>
        </div>
        <div class="pt-10">
          <receivables :range="receivablesPeriod" />
        </div>
        <div class="flex justify-end items-center mt-5">
          <span class="mx-2 font-semibold cursor-pointer" style="color: #fe4d3c"
            >View All
          </span>
          <ArrowRight />
        </div>
      </div>
      <!-- <div class="rounded-xl bg-white p-10">
        <div class="flex">
          <div class="flex-1 capitalize text-2xl font-bold">
            Unbilled Transactions
          </div>
          <div class="flex-none">
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
      </div>-->
      <div class="rounded-xl col-span-2 bg-white p-10">
        <div class="flex">
          <div class="flex-1 capitalize text-2xl font-bold">
            Transaction Volumes
          </div>
          <div class="flex w-1/4">
            <period-picker
              class="-mt-1.5 w-full"
              v-model="volumesPeriod"
              placeholder="--Select--"
              :required="true"
            />
          </div>
        </div>
        <div class="pt-10">
          <Volume :range="volumesPeriod" />
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
        <div class="flex w-1/4">
          <period-picker
            label="Period"
            class="-mt-1.5 w-full"
            v-model="billPeriod"
            placeholder="--Select--"
            :required="true"
          />
        </div>
      </div>
      <div class="pt-10">
        <billing-chart :range="billPeriod" />
      </div>
    </div>
    <ChartFilterDialog v-model="showFilterDialog" />
  </div>
</template>
<script lang="ts">
  import DatePicker from "@/components/datepicker.vue";
  import PeriodPicker from "@/components/daterangepicker.vue";
  import Filter from "@/components/icons/filter.vue";
  import { Options, Vue } from "vue-class-component";
  import ArrowRight from "../settings/BookingSite/components/arrow-right.vue";
  import billingChart from "./components/billing-trend-chart.vue";
  import ChartFilterDialog from "./components/chart-filter-dialog.vue";
  import chart from "./components/chart.vue";
  import Collectables from "./components/collectables.vue";
  import receivables from "./components/receivables.vue";
  import Volume from "./components/volume.vue";

  @Options({
    components: {
      chart,
      Collectables,
      DatePicker,
      ArrowRight,
      Filter,
      ChartFilterDialog,
      PeriodPicker,
      billingChart,
      receivables,
      Volume,
    },
  })
  export default class BillingOverview extends Vue {
    startDate = "";
    endDate = "";
    showFilterDialog = false;
    period = "";
    billPeriod = "";
    collectablesPeriod = "";
    receivablesPeriod = "";
    volumesPeriod = "";
  }
</script>
