<template>
  <div class="container-fluid pt-4">
    <div class="w-full">
      <div class="w-full mb-5 flex items-center justify-end">
        <span class="mx-3">
          <share />
        </span>
        <span class="mx-3">
          <print />
        </span>
        <span class="mx-3 p-2 rounded-full">
          <SaveIcon />
        </span>
      </div>
      <div class="w-full my-5">
        <cornie-input :label="'Identifier'" style="width: 100%" />
      </div>
      <div class="w-full my-5">
        <date-picker :label="'Date & Time'" style="width: 100%" />
      </div>
      <div class="w-full my-5">
        <cornie-input :label="'Record Type'" style="width: 100%" />
      </div>
      <div class="w-full my-5">
        <cornie-input :label="'Performer'" style="width: 100%" />
      </div>
      <div class="w-full my-5">
        <cornie-input :label="'Encounter'" style="width: 100%" />
      </div>
      <div class="w-full my-5">
        <cornie-input :label="'Status'" style="width: 100%" />
      </div>
      <div class="w-full my-5">
        <cornie-input :label="'Data Count'" style="width: 100%" />
      </div>
    </div>

    <div class="w-full">
      <split-input :label="'Temperature'">
        <template #list>
          <cornie-select
            :items="['one', 'two']"
            style="width: 100%; border-radius: 8px 0 0 8px"
          />
        </template>
        <template #input>
          <input
            type="text"
            class="p-2 border w-100 w-full"
            style="border-radius: 0 8px 8px 0"
          />
        </template>
      </split-input>
    </div>
    <div class="w-full my-2">
      <input-with-desc :label="'Respiratory Rate'" :info="'/min'" />
    </div>

    <div class="w-full my-2">
      <input-with-desc :label="'Pulse Rate'" :info="'/min'" />
    </div>

    <div class="w-full my-2">
      <input-with-desc :label="'Oxygen Saturation'" :info="'%'" />
    </div>

    <div class="w-full">
      <split-input :label="'Height'">
        <template #list>
          <cornie-select
            :items="['one', 'two']"
            style="width: 100%; border-radius: 8px 0 0 8px"
          />
        </template>
        <template #input>
          <input
            type="text"
            class="p-2 border w-100 w-full"
            style="border-radius: 0 8px 8px 0"
          />
        </template>
      </split-input>
    </div>

    <div class="w-full">
      <split-input :label="'Weight'">
        <template #list>
          <cornie-select
            :items="['one', 'two']"
            style="width: 100%; border-radius: 8px 0 0 8px"
          />
        </template>
        <template #input>
          <input
            type="text"
            class="p-2 border w-100 w-full"
            style="border-radius: 0 8px 8px 0"
          />
        </template>
      </split-input>
    </div>

    <div class="w-full">
      <split-input :label="'Head Circumference'">
        <template #list>
          <cornie-select
            :items="['one', 'two']"
            style="width: 100%; border-radius: 8px 0 0 8px"
          />
        </template>
        <template #input>
          <input
            type="text"
            class="p-2 border w-100 w-full"
            style="border-radius: 0 8px 8px 0"
          />
        </template>
      </split-input>
    </div>

    <div class="w-full mt-3">
      <blood-pressure>
        <template #systolic-list>
          <cornie-select
            :items="['one', 'two']"
            style="width: 100%; border-radius: 8px 0 0 8px"
          />
        </template>
        <template #systolic-input>
          <input-with-desc :info="'mmHg'" />
        </template>
        <template #diastolic-list>
          <cornie-select
            :items="['one', 'two']"
            style="width: 100%; border-radius: 8px 0 0 8px"
          />
        </template>
        <template #diastolic-input>
          <input-with-desc :info="'mmHg'" />
        </template>

        <template #record>
          <div class="w-full flex items-center">
            <div class="w-9/12">
              <span class="flex flex-col">
                <span class="font-semibold">Systolic | Standing_Left</span>
                <span class="text-gray-400 text-sm">30mmHg</span>
              </span>
            </div>
            <div class="w-3/12 flex justify-end">
              <span class="mx-2"><edit-icon /></span>
              <span class="mx-2"><delete-icon /></span>
            </div>
          </div>
        </template>
      </blood-pressure>

      <div class="w-full mt-12">
        <div class="w-full pb-8 flex flex justify-end">
          <corniebtn
            class="p-2 rounded-full px-8 mx-4 cursor-pointer"
            style="border: 1px solid #080056"
          >
            <span
              class="font-semibold text-gray-500"
              @click="() => $emit('closesidemodal')"
              >Cancel</span
            >
          </corniebtn>

          <CornieBtn
            :loading="false"
            class="bg-red-500 p-2 rounded-full px-8 mx-4"
          >
            <span class="text-white font-semibold">Save</span>
          </CornieBtn>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import SplitInput from "./split-input.vue";
import InputWithDesc from "./input-with-desc.vue";
import BloodPressure from "./blood-pressure.vue";
import EditIcon from "@/components/icons/edit.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import DatePicker from "@/components/datepicker.vue";
import ShareIcon from "./share.vue";
import SaveIcon from "@/components/icons/save.vue";
import PrintIcon from "./print.vue";
import Share from "@/components/icons/share.vue";
import Print from "@/components/icons/print.vue";

@Options({
  components: {
    CornieSelect,
    SplitInput,
    InputWithDesc,
    BloodPressure,
    EditIcon,
    DeleteIcon,
    CornieBtn,
    CornieInput,
    DatePicker,
    SaveIcon,
    ShareIcon,
    PrintIcon,
    Share,
    Print,
  },
})
export default class VitalsForm extends Vue {}
</script>
