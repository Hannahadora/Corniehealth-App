<template>
  <clinical-dialog class="w-9/12" v-model="show" title="[Identifier]" noarrow>
    <div class="w-full flex flex-col pl-3">
      <div class="w-full grid grid-cols-2 pb-6 border-b-2 border-dashed">
        <div class="grid grid-cols-1 gap-y-2 text-sm">
          <h2 class="text-primary text-sm font-bold">Patient Information</h2>
          <avatar :src="avatar" class="h-24 w-24" />
          <h3 class="text-primary text-sm font-semibold">Nkechi Claire Obi</h3>
          <span class="text-gray-500">MRN-CH23022021-0010</span>
          <span class="text-xs">
            87 Montagomery Close, Friend’s Colony Estate, Lekki
          </span>
          <span class="text-xs">08032545678</span>
          <span class="text-xs">Nkechi@gmail.com</span>
        </div>
        <div class="grid grid-cols-1 gap-y-1 text-sm">
          <h2 class="text-primary text-sm font-bold">Recorder and asserter</h2>
          <div class="grid grid-cols-1 gap-y-1">
            <span class="text-danger text-xs">Recorded By</span>
            <span> Dr. Obi Nduka </span>
            <span class="text-gray-500 text-xs">Pathology</span>
            <span class="text-gray-500 text-xs">21/09/2021</span>
          </div>
          <div class="grid grid-cols-1 gap-y-1">
            <span class="text-danger text-xs">Asserted By</span>
            <span> Dr. Obi Nduka </span>
            <span class="text-gray-500 text-xs">Pathology</span>
            <span class="text-gray-500 text-xs">21/09/2021</span>
          </div>
        </div>
      </div>
      <div class="w-full grid grid-cols-2 mt-6 gap-x-4">
        <div class="grid grid-cols-1 gap-y-2">
          <span class="flex items-center text-danger font-semibold text-base">
            <condition-icon class="mr-2" />
            Condition Information
          </span>
          <div class="mt-2 grid grid-cols-3 gap-y-4">
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Clinical Status </span>
              <span class="mt-1 text-xs text-black"> Active</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Verification Status </span>
              <span class="mt-1 text-xs text-black"> Provisional </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Category </span>
              <span class="mt-1 text-xs text-black"> Encounter-diagnosis </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Severity </span>
              <span class="mt-1 text-xs text-black"> Mild</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Code </span>
              <span class="mt-1 text-xs text-black"> Typhlolithiasis </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm text-gray-500"> Body Site </span>
              <span class="mt-1 text-xs text-black"> Kupffer cell </span>
            </div>
          </div>
          <div class="mt-3 flex flex-col">
            <span class="flex items-center font-bold">
              <note-icon class="mr-3" />
              Note
            </span>
            <p class="text-sm pt-3">
              At this stage of the condition, the patient is expected to avoid
              foods with high cholesterol.
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-y-3">
          <div>
            <span class="font-bold flex items-center text-lg">
              <onset-icon class="mr-3" />
              Onset
            </span>
            <div class="mt-3 grid grid-cols-2">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Date/Time</span>
                <span class="text-sm">21/10/2021</span>
                <span class="text-sm text-gray-500 mb-3">15:00</span>
              </div>

              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">String</span>
                <span class="text-sm">XXXX</span>
              </div>
            </div>
          </div>

          <div>
            <span class="font-bold flex items-center text-lg">
              <onset-icon class="mr-3" />
              Abatement
            </span>
            <div class="mt-3 grid grid-cols-2">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Age</span>
                <span class="text-sm">1 Year</span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">String</span>
                <span class="text-sm">XXXX</span>
              </div>
            </div>
          </div>

          <div>
            <span class="font-bold flex items-center text-lg">
              <stage-icon class="mr-3" />
              Stage
            </span>
            <div class="mt-3 grid grid-cols-2 gap-y-2">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Summary</span>
                <span class="text-sm">XXXXXXXXX</span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Type</span>
                <span class="text-sm">XXXX</span>
              </div>
            </div>
            <div class="flex flex-col mt-4">
              <span class="text-sm text-gray-500 mb-2">Assessment</span>
              <div class="flex items-center text-xs">
                <span class="text-sm font-semibold mr-2"> Spherophakia </span>
                ∘ XXXXX
              </div>
            </div>
          </div>

          <div>
            <span class="font-bold flex items-center text-lg">
              <note-icon class="mr-3" />
              Evidence
            </span>
            <div class="mt-3 grid grid-cols-2">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Code</span>
                <span class="text-sm">XXXXXXXXX</span>
              </div>
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 mb-3">Details</span>
                <span class="text-sm">XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #actions>
      <cornie-btn
        class="border-primary border px-6 mr-3 rounded-xl text-primary"
      >
        Edit
      </cornie-btn>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import ClinicalDialog from "./clinical-dialog.vue";
import Avatar from "@/components/avatar.vue";
import ConditionIcon from "@/components/icons/condition-icon.vue";
import NoteIcon from "@/components/icons/note.vue";
import OnsetIcon from "@/components/icons/onset.vue";
import StageIcon from "@/components/icons/stage.vue";

@Options({
  name: "ViewCondition",
  components: {
    ClinicalDialog,
    ConditionIcon,
    StageIcon,
    OnsetIcon,
    Avatar,
    NoteIcon,
  },
})
export default class ViewCondition extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  avatar = require("@/assets/img/avatar.png");
}
</script>
