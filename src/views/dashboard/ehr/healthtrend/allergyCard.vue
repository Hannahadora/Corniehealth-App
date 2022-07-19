<template>
  <detail-card
    height="337px"
    @view:all="
      $router.push(`/dashboard/provider/clinical/${patientId}/allergy`)
    "
    title="Allergies"
    @add="showAllergy"
    :showTotal="true"
    :count="totalAllergeis"
  >
    <template #empty>
      <div class="p-2">
        <div class="p-5" v-if="allergys.length === 0">
          <noallergy-icon class="flex mt-5 justify-center w-full text-center" />
          <p class="mt-8 text-sm text-gray-500 text-center">No Allergies</p>
        </div>
      </div>
    </template>

    <div class="p-2">
      <div class="w-full grid grid-cols-1 gap-y-4">
        <div
          class="w-full flex justify-between pb-2 border-b"
          v-for="(input, index) in items"
          :key="index"
        >
          <div class="w-full flex items-center">
            <div class="text-xs flex flex-col">
              <span class="font-semibold text-primary capitalize">
                {{ input.name }}
              </span>
              <span class="">
                <span class="text-gray-600 capitalize">
                  <h5>{{ input.recordDate }}</h5></span
                >
                <span class="text-gray-600">
                  <h5>{{ input.severity }}</h5></span
                >
              </span>
            </div>
          </div>
          <div class="text-xs text-primary">
            <span class="flex items-center">
              <chevron-right-icon />
            </span>
          </div>
        </div>
      </div>
    </div>
  </detail-card>
  <allergy-modal v-model="showAllergyModal" />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import DetailCard from "./detail-card.vue";
import { namespace } from "vuex-class";
import IAllergy from "@/types/IAllergy";
import AddIcon from "@/components/icons/add.vue";
import { mapDisplay } from "@/plugins/definitions";
import { string } from "yup/lib/locale";
import AllergyModal from "@/views/dashboard/ehr/allergy/allergyModal.vue";
import NoallergyIcon from "@/components/icons/noallergy.vue";

const allergy = namespace("allergy");
@Options({
  name: "AllergyCard",
  components: {
    DetailCard,
    AddIcon,
    AllergyModal,
    NoallergyIcon,
  },
})
export default class AllergyCard extends Vue {
  medicationMapper = (code: string) => "";

  //medicationMapper2:  (code: string) => string = null;
  showAllergyModal = false;
  async showAllergy() {
    this.showAllergyModal = true;
  }
  manifestation = "";

  @Prop({ type: Array, default: () => [] })
  allergys!: any[];

  get newallergys() {
    return this.sortAllergys.slice(0, 3);
  }
  get sortAllergys() {
    return this.allergys.slice().sort(function (a: any, b: any) {
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  get patientId() {
    return this.$route.params.id as string;
  }

  get totalAllergeis() {
    return this.allergys.length;
  }
   severityMapper = (code: string) => "";
  codeMapper = (code: string) => "";

  async loadMappers() {
    this.severityMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-severity"
    );
    this.codeMapper = await mapDisplay(
      "http://hl7.org/fhir/ValueSet/condition-code"
    );
  }

  get items() {
    if (!this.medicationMapper) return [];
    const newallergys = this.newallergys.map((allergy) => ({
      name: allergy.name,
      severity: this.severityMapper(allergy.severity),
      recordDate: new Date(allergy.recordDate).toLocaleString('en-US'),
    }));
    return newallergys;
  }

  async created() {
    this.loadMappers();
  }
}
</script>
