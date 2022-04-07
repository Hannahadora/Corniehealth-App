<template>
 <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">

      <cornie-card-title class="w-full">
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
           Advanced Filter
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

    <cornie-card-text class="flex-grow scrollable">
      <div class="w-full px-2">
        <div
          class="container-fluid"
          v-for="(option, index) in filterOptions"
          :key="index">
          <div class="w-full">
            <p
              @click="() => (option.show = !option.show)"
              class="text-base text-gray-800 my-3 font-semibold flex justify-between cursor-pointer"
            >
              <span>Filter by Practitioners</span>
              <span><ChevronDown /></span>
            </p>
          </div>

          <div class="w-full border p-2">
            <div class="container-fluid">
              <div class="w-full cursor-pointer">
                <span class="flex items-center w-full">
                  <icon-input
                    :width="'w-full'"
                    class="border border-gray-600 rounded-full focus:outline-none"
                    type="search"
                    v-model="search"
                  >
                    <template v-slot:prepend>
                      <search-icon />
                    </template>
                  </icon-input>
                </span>
              </div>
              <div class="w-full mt-2 px-2 scroll-box">
                <div
                  class="w-12/12"
                  v-for="(person, index) in actors"
                  :key="index"
                  @click="selectActor(person)"
                >
                  <label for="" class="flex items-center mb-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      :checked="
                        selectedPractitioners.findIndex(
                          (i) => i.id === person.id
                        ) >= 0
                      "
                    />
                    <span class="mx-3 flex flex-col">
                      <span>{{ person.firstName }} {{ person.lastName }}</span>
                      <span class="text-xs text-gray-500">{{
                        person.jobDesignation
                      }}</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </cornie-card-text>

     <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn class="border-primary border-2 px-4 mr-3 rounded text-primary" @click="show = false">
            Cancel
          </cornie-btn>
        <cornie-btn
        type="submit"
        class="text-white bg-danger px-4 rounded"
        @click="applyFilter"
      >
        Apply
      </cornie-btn>
        </cornie-card-text>
     </cornie-card>

  </cornie-card>
 </cornie-dialog>

</template>

<script lang="ts">
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { Options, Vue } from "vue-class-component";
import ChevronDown from "@/components/icons/chevrondownprimary.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import CornieCard from "@/components/cornie-card";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";

const practitionersStore = namespace("practitioner");

@Options({
  components: {
    CornieDialog,
    ChevronDown,
    IconInput,
    CancelIcon,
    SearchIcon,
    ArrowLeftIcon,
    CornieRadio,
    ...CornieCard,
    CornieBtn,
    CornieIconBtn,
  },
})

export default class AdvancedFilter extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @practitionersStore.State
  practitioners!: IPractitioner[];

  @practitionersStore.Action
  fetchPractitioners!: () => Promise<void>;

  search = "";
  filterOptions: any = [
    {
      name: "Filter by practitioner",
      items: this.actors,
      show: false,
    },
  ];
  selectedPractitioners: IPractitioner[] = [];

  get actors(): IPractitioner[] {
    return this.practitioners?.map((practitioner) => {
      return {
        ...practitioner,
      };
    });
  }

  selectActor(actor: IPractitioner) {
    if (
      this.selectedPractitioners.findIndex(
        (practitioner) => practitioner.id === actor.id
      ) < 0
    ) {
      this.selectedPractitioners.push(actor);
    } else {
      this.selectedPractitioners = this.selectedPractitioners.filter(
        (practitioner) => practitioner.id !== actor.id
      );
    }
  }

  applyFilter() {
    this.$emit("applyfilter", {
      byPractitioners: this.selectedPractitioners.map(
        (practitioner) => practitioner.id
      ),
    });
  }

  async created() {
    if (this.practitioners?.length === 0) await this.fetchPractitioners();
  }
}
</script>

<style scoped>
.scroll-box {
  max-height: 396px;
  overflow-y: auto;
}
</style>
