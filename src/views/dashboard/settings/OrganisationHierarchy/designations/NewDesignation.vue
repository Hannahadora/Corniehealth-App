<template>
  <card class="w-full h-full flat m-2 body-content">
    <card-title class="m-5 mb-0 border-b-2">
      <h1 class="text-primary text-xl font-extrabold">New Designation</h1>
    </card-title>
    <v-form class="m-5 mt-0">
      <card-text>
        <p class="text-danger mb-6">
          Which of these best describes the designation?
        </p>
        <div class="flex border-b-2 pb-6 mb-6">
          <cornie-radio
            label="Supervisory"
            value="Sup"
            v-model="supervisoryType"
          />
          <cornie-radio
            class="ml-3"
            label="Non-Supervisory"
            value="NonSup"
            v-model="supervisoryType"
          />
        </div>
        <h1 class="text-primary text-xl font-extrabold mb-3">
          Designation Details
        </h1>
        <div class="flex items-start border-b-2 pb-3">
          <div class="w-4/12 mx-6">
            <cornie-input
              label="title"
              class="my-6"
              v-model="title"
              :rules="required"
              placeholder="--Enter--"
            />
            <cornie-input
              label="cost centre"
              class="my-6"
              v-model="costCentre"
              :rules="required"
              placeholder="--Enter--"
            />
          </div>
          <div class="w-4/12 mx-6">
            <cornie-select
              label="function"
              class="my-6"
              placeholder="--Select--"
              :rules="required"
              v-model="assignedFunction"
              :items="[]"
            />
            <cornie-select
              label="reporting to"
              class="my-6"
              placeholder="--Select--"
              :rules="required"
              v-model="reportingTo"
              :items="[]"
            />
          </div>
          <div class="w-4/12 mx-6">
            <cornie-select
              label="job level"
              class="my-6"
              placeholder="--Select--"
              :rules="required"
              v-model="jobLevel"
              :items="[]"
            />
            <cornie-select
              label="dotted reporting"
              class="my-6"
              placeholder="--Select--"
              :rules="required"
              v-model="dottedReporting"
              :items="[]"
            />
          </div>
        </div>
        <card class="bg-gray-100 flat my-6">
          <card-title>
            <span>
              The feature is available for Cloudenly Subscribers only
            </span>
          </card-title>
          <card-text>
            <h1 class="text-primary text-xl font-extrabold">
              Annual Salary Band
            </h1>
          </card-text>
          <card-text>
            <div class="flex">
              <cornie-input
                label="lower salary band"
                class="mx-6"
                :rules="numberRequired"
                placeholder="--Enter--"
                v-model="lowerSalaryBand"
              >
                <template v-slot:prepend>
                  <span class="text-sm">(N)</span>
                </template>
              </cornie-input>
              <cornie-input
                label="upper salary band"
                :rules="numberRequired"
                placeholder="--Enter--"
                v-model="upperSalaryBand"
              >
                <template #prepend>
                  <span class="text-sm">(N)</span>
                </template>
              </cornie-input>
            </div>
          </card-text>
        </card>
        <div class="flex justify-items-end py-6 border-t-2">
              <span class="flex-grow"></span>
              <button
                @click="showNewFunctionDialog = false"
                class="
                  outline-primary
                  rounded-full
                  text-black
                  mr-2
                  py-2
                  px-6
                  focus:outline-none
                  outline
                  hover:bg-primary
                  hover:text-white
                "
              >
                Cancel
              </button>
              <button
                class="
                  bg-danger
                  rounded-full
                  text-white
                  py-2
                  px-6
                  focus:outline-none
                  hover:opacity-90
                "
                @click="
                  isEmpty = false;
                  showNewFunctionDialog = false;
                "
              >
                Create Function
              </button>
            </div>
      </card-text>
    </v-form>
  </card>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Card from "@/components/cornie-card/CornieCard.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieRadio from "@/components/CornieRadio.vue";
import CornieInput from "@/components/CornieInput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import IconInput from "@/components/IconInput.vue";
import { string as yupString, number as yupNumber } from "yup";

@Options({
  name: "New Designation",
  components: {
    Card,
    CardText,
    CardTitle,
    CornieRadio,
    CornieInput,
    CornieSelect,
    IconInput,
  },
})
export default class NewDesignation extends Vue {
  supervisoryType = false;
  costCentre = "";
  assignedFunction = "";
  reportingTo = "";
  joblevel = "";
  dottedReporting = "";
  lowerSalaryBand: number | null = null;
  upperSalaryBand: number | null = null;

  required = yupString().required();
  numberRequired = yupNumber().required();
}
</script>

<style>
.body-content {
  height: 90vh;
  overflow-y: auto;
}
</style>