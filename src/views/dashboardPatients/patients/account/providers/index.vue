<template>

  <div class="w-full">
      <cornie-card-text>
        <div class="md:grid md:grid-cols-2  my-3 w-full">
          <div
            class="py-3 px-6"
            v-for="(optionalItem, index) in optionalItems"
            :key="index"
          >
            <cornie-card
            v-if="optionalItem.number > 1 && optionalItem.name == 'Other Providers'"
              height="150px"
              @click="$router.push({ name: 'Other Providers' })"
              class="cursor-pointer hover:bg-gray-50"
            >
              <cornie-card-text class="h-full">
                <div class="flex h-full items-center">
                  <component :is="optionalItem.icon" class="mx-4" />
                  <div>
                    <p class="font-extrabold text-lg text-primary">
                      {{ optionalItem.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ optionalItem.number }} Added
                    </p>
                  </div>
                </div>
              </cornie-card-text>
            </cornie-card>
            <cornie-card

            v-else
              height="150px"
              @click="optionalItem.click"
              class="cursor-pointer hover:bg-gray-50"
            >
              <cornie-card-text class="h-full">
                <div class="flex h-full items-center">
                  <component :is="optionalItem.icon" class="mx-4" />
                  <div>
                    <p class="font-extrabold text-lg text-primary">
                      {{ optionalItem.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ optionalItem.number }} Added
                    </p>
                  </div>
                </div>
              </cornie-card-text>
            </cornie-card>
          </div>
        </div>
      </cornie-card-text>
  </div>
 <doctor-modal v-model="showPrimaryDoctor"/>
  <provider-modal v-model="showOtherProvider"/>
 
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class"; 

import ICollectionCenters from "@/types/ICollectionCenters";
import {IPatientProvider} from "@/types/IPatientProvider";
import  {IPatientPractitioners}  from "@/types/IPatientPractitioners";

import cornieRadio from "@/components/cornieradio.vue";
import NewTab from "@/components/newtab.vue";
import CornieCard from "@/components/cornie-card/index";
import CornieBtn from "@/components/CornieBtn.vue";

import DoctorIcon from "./icons/doctor.vue";
import ProviderIcon from "./icons/other.vue";

import DoctorModal from "./DoctorModal.vue";
import ProviderModal from "./ProviderModal.vue";
import ExistingState from "./existingState.vue";

const patientprovider = namespace("patientprovider");

@Options({
  name: "Providers",
  components: {
    ...CornieCard,
   cornieRadio,
   CornieBtn,
   NewTab,
   DoctorIcon,
   ProviderIcon,
   DoctorModal,
   ProviderModal,
   ExistingState
  },
})
export default class Providers extends Vue {

    loading = false;
    showPrimaryDoctor = false;
    showOtherProvider = false;
    showExisitingState = false;

    @patientprovider.State
  patientproviders!: IPatientProvider[];

  @patientprovider.Action
  fetchPatientProvider!: () => Promise<void>;

  @patientprovider.State
  primarydoctors!: any;

  @patientprovider.Action
  fetchPrimaryDoctors!: () => Promise<void>;


    submit(){

    }
   get optionalItems() {
      return [
        {
          name: "Primary Doctor",
          icon: "doctor-icon",
          click: () => (this.showPrimaryDoctor = true),
          number: this.primarydoctors !== {} ? 1 : 0,
        },
        {
          name: "Other Providers",
          icon: "provider-icon",
          click: () => (this.showOtherProvider = true),
          number: this.patientproviders.length
        },
      ];
    }

  async created() {
     await this.fetchPrimaryDoctors();
     await this.fetchPatientProvider();
  }
}
</script>
<style scoped>
.w-34 {
    width: 45%;
}
</style>
