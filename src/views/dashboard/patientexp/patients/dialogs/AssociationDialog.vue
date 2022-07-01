<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title>
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <span
          class="text-primary font-extrabold text-lg border-l-2 border-gray-100 pl-2"
        >
          Add Association
        </span>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
        <p class="text-sm mb-5">Add an association to this patient.</p>
        <v-form ref="form" class="grid grid-cols-1">
          <cornie-select
            label="Account Type"
            class="w-full"
            placeholder="Select One"
            :items="['Family Account', 'Personal Account', 'Corporate Account']"
            v-model="accountType"
          />
          <div class="flex flex-col">
            <span class="font-semibold">Name</span>
            <cornie-search
              label="Name"
              class="w-full rounded-full mb-3"
              placeholder="--Enter--"
              v-model="name"
            >
            </cornie-search>
          </div>
          <cornie-select
            label="Relationship"
            class="w-full"
            placeholder="Enter"
            :items="relationshipOptions"
            v-model="relationship"
          />
          <div class="flex justify-end w-full">
            <button
              class="px-5 py-2 rounded-xl border border-primary text-primary font-bold"
              @click="add"
              type="button"
            >
              Add
            </button>
          </div>
          <template v-if="allAssociation.length">
            <div class="border-b border-gray-400 my-4 w-full"></div>

            <div
              v-for="association in allAssociation"
              :key="association.id"
              class="mt-3 flex justify-between items-center"
            >
              <div>
                <h1 class="font-semibold text-sm">{{ association.name }}</h1>
                <h1 class="text-xs text-gray-400">
                  {{ association.associationType }}\{{
                    association.relationship
                  }}
                </h1>
              </div>
              <button @click="delAssoc(association.id)" type="button">
                <delete-icon />
              </button>
            </div>
          </template>
        </v-form>
      </cornie-card-text>
      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="save"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync } from "vue-property-decorator";

  import { IPatient } from "@/types/IPatient";

  import AutoComplete from "@/components/autocomplete.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieDatePicker from "@/components/CornieDatePicker.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import PeriodPicker from "@/components/daterangepicker.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import DeleteIcon from "@/components/icons/delete-red.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import CorniePhoneInput from "@/components/phone-input.vue";
  import CornieSearch from "@/components/search-input.vue";

  @Options({
    name: "association-dialog",
    components: {
      ...CornieCard,
      CornieIconBtn,
      AutoComplete,
      ArrowLeftIcon,
      CornieDialog,
      CornieInput,
      CornieSelect,
      PeriodPicker,
      CorniePhoneInput,
      CornieDatePicker,
      CornieBtn,
      SearchIcon,
      CornieSearch,
      DeleteIcon,
    },
    emits: ["add-associations"],
  })
  export default class EmergencyDontactDialog extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: Array, default: [] })
    associations!: [];

    @Prop({ type: Object })
    patient!: IPatient;

    relationshipOptions = ["Parent", "Employee"];
    accountType = "";
    name = "";
    relationship = "";
    loading = false;

    addedAssociations = [] as any;

    reset() {
      this.accountType = "";
      this.name = "";
      this.relationship = "";
    }
    async add() {
      this.addedAssociations = [
        {
          id: `${Math.random() * 1999}${Math.random() * 2999}`,
          associatedPersonId: this?.patient?.id || "",
          associationType: this.accountType,
          name: this.name,
          relationship: this.relationship,
        },
        ...this.addedAssociations,
      ];

      this.reset();
    }

    async delAssoc(id: string) {
      this.addedAssociations = this.addedAssociations.filter(
        (item: any) => item.id !== id
      );
    }

    async save() {
      this.$emit("add-associations", this.addedAssociations);

      this.show = false;
      this.addedAssociations = [];
    }

    setAssociations() {
      this.addedAssociations = this.associations;
    }

    get allAssociation() {
      return this.addedAssociations;
    }

    created() {
      this.setAssociations();
    }
  }
</script>

<style></style>
