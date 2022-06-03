<template>
  <div class="w-full">
    <div>
      <div
        class="w-full p-4 flex items-center justify-start border-b-2 font-bold text-xl text-primary"
      >
        Procedure
      </div>
      <div class="flex justify-end w-full mb-8">
        <button
          @click="newProcedure"
          class="bg-danger rounded-lg text-white mt-5 py-4 px-8 mb-5 font-semibold focus:outline-none hover:opacity-90"
        >
          New Procedure
        </button>
      </div>
      <cornie-table :columns="headers" v-model="items">
        <template #code="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.code.display }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.code.code }}
            </span>
          </div>
        </template>
        <template #recorder="{ item }">
          <div class="flex flex-col text-sm">
            <span class="">
              {{ item.recorder.name }}
            </span>
            <span class="text-xs text-gray-400">
              {{ item.recorder.department }}
            </span>
          </div>
        </template>
        <template #billing="{ item: { billing } }">
          <span
            :class="{
              // 'bg-success text-success': status == 'active',
              // ' bg-danger text-danger': status == 'inactive',
              ' bg-warning text-warning': billing == 'pending',
              // ' bg-blue-yonder text-blue-yonder': status == 'relapse',
              // ' bg-blue-800 text-blue-800': status == 'remission',
              // ' bg-gray-800 text-gray-800': status == 'resolved',
            }"
            class="px-1 text-center rounded-md p-1 bg-opacity-20"
          >
            {{ billing }}
          </span>
        </template>
        <template #status="{ item: { status } }">
          <span
            :class="{
              'bg-success text-success': status == 'active',
              ' bg-danger text-danger': status == 'inactive',
              ' bg-warning text-warning': status == 'recurrence',
              ' bg-blue-yonder text-blue-yonder': status == 'relapse',
              ' bg-blue-800 text-blue-800': status == 'preparation',
              ' bg-gray-800 text-gray-800': status == 'resolved',
            }"
            class="px-1 text-center rounded-md p-1 bg-opacity-20"
          >
            {{ status }}
          </span>
        </template>
        <template #actions="{ item }">
          <div
            @click="viewCondition(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <new-view-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </div>

          <div
            @click="recordAbatement(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <edit-icon class="text-yellow-800 fill-current" />
            <span class="ml-3 text-xs"> Edit </span>
          </div>
          <div
            @click="updateStatus(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <update-icon class="text-purple-500 fill-current" />
            <span class="ml-3 text-xs"> Update Status </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> End encounter </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> Pause encounter </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> Admit Patient </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> Clinical Impression </span>
          </div>

          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> Medication Request </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs">Diagnostics Request </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs">Referral Request </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> Manage Bill </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs"> Progress Notes </span>
          </div>
          <div
            @click="addNote(item)"
            class="flex items-center hover:bg-gray-100 p-3 cursor-pointer"
          >
            <plus-icon class="text-green-700 fill-current" />
            <span class="ml-3 text-xs">Class History </span>
          </div>
        </template>
      </cornie-table>
    </div>
  </div>
</template>
<script lang="ts">
  import CornieTable from "@/components/cornie-table/CornieTable.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import HistoryIcon from "@/components/icons/history.vue";
  import UpdateIcon from "@/components/icons/newupdate.vue";
  import NewViewIcon from "@/components/icons/newview.vue";
  import PlusIcon from "@/components/icons/plus.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { namespace } from "vuex-class";

  const encounter = namespace("encounter");

  @Options({
    name: "EncounterExistingState",
    components: {
      CornieTable,
      // AddNotes,
      // ViewCondition,
      // RecordAbatement,
      // AddCondition,
      // StatusUpdate,
      // AddOccurence,
      EditIcon,
      NewViewIcon,
      UpdateIcon,
      PlusIcon,
      HistoryIcon,
    },
    emits: ["new_encounter", "view_encounter"],
  })
  export default class EncounterExistingState extends Vue {
    @Prop()
    procedures!: any[];

    @encounter.Action
    getEncounters!: (id: any) => Promise<void>;

    @encounter.State
    encounters!: any[];

    headers = [
      {
        title: "Procedure id",
        key: "identifier",
        show: true,
        noOrder: true,
      },
      {
        title: "date recorded",
        key: "date",
        show: true,
      },
      {
        title: "based on",
        key: "basedOn",
        show: true,
      },
      {
        title: "code",
        key: "diagnosis",
        show: true,
      },
      {
        title: "performer",
        key: "attP",
        show: true,
      },
      {
        title: "status",
        key: "status",
        show: true,
      },
    ];

    get items() {
      console.log("vcvcvc", this.procedures);
      const items =
        this.procedures.length > 0
          ? this.procedures.map((p) => {
              return {
                identifier: p.id || "",
                date: this.printRecorded(p.createdAt),
                code: p.code || "",
                status: p.status,
                performer: p.practioners.length,
                basedOn: "care-plan",
              };
            })
          : [];

      return items;
    }

    printRecorded(dateR: any) {
      const dateString = dateR;
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }

    newProcedure() {
      this.$emit("procedure");
    }

    viewCondition(e: any) {
      this.$emit("view_encounter", e);
    }
  }
</script>
