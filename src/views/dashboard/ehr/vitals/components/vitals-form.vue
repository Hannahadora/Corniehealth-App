<template>
  <clinical-dialog v-model="show" :title="newaction + ' ' + 'Vitals'" class="">
    <v-form class="flex-grow flex flex-col" @submit="save">
      <accordion-component
        class="text-primary"
        title="Body Temperature"
        :opened="true"
      >
        <div class="w-full grid grid-cols-2 gap-6 my-5">
          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Body Temperature"
              placeholder="0"
              v-model="vitalData.bodyTemperature.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="temperatureUnits"
              placeholder="°C"
              class="w-24 mt-3 flex-none"
              :setPrimary="true"
              v-model="vitalData.bodyTemperature.unit"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component
        class="text-primary"
        title="RR, HR, OS, BGL"
        :opened="true"
      >
        <div class="w-full grid grid-cols-2 gap-6 my-5">
          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Respiratory Rate"
              placeholder="0"
              v-model="vitalData.respiration.respiratoryRate.value"
              class="grow w-full"
              :setfull="true"
            />
            <div class="w-24">
              <cornie-input
                placeholder="/min"
                class="w-full mt-5 flex-none"
                disabled
                v-model="vitalData.respiration.respiratoryRate.unit"
              />
            </div>
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Heart Rate"
              placeholder="0"
              v-model="vitalData.respiration.heartRate.value"
              class="grow w-full"
              :setfull="true"
            />
            <div class="w-24">
              <cornie-input
                placeholder="/min"
                class="w-full mt-5 flex-none"
                disabled
                v-model="vitalData.respiration.heartRate.unit"
              />
            </div>
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Oxygen Saturation"
              placeholder="0"
              v-model="vitalData.respiration.oxygenSaturation.value"
              class="grow w-full"
              :setfull="true"
            />
            <div class="w-24">
              <cornie-input
                placeholder="%"
                class="w-full mt-5 flex-none"
                disabled
                v-model="vitalData.respiration.oxygenSaturation.unit"
              />
            </div>
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Blood Glucose Level"
              placeholder="0"
              v-model="vitalData.respiration.bloodGlucoseLevel.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['mm/dL', 'mmol/L']"
              placeholder="mm/dL"
              class="w-24 mt-3 flex-none"
              :setPrimary="true"
              v-model="vitalData.respiration.bloodGlucoseLevel.unit"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component
        class="text-primary"
        title="Height & Head Circumference"
        :opened="true"
      >
        <div class="w-full grid grid-cols-2 gap-6 my-5">
          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Body Height"
              placeholder="0"
              v-model="vitalData.circumferences.bodyHeight.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['cm', 'in', 'ft']"
              placeholder="cm"
              class="w-24 mt-3 flex-none"
              :setPrimary="true"
              v-model="vitalData.circumferences.bodyHeight.unit"
            />
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Head Circumference"
              placeholder="0"
              v-model="vitalData.circumferences.headCircumferences.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['cm', 'in', 'ft']"
              placeholder="cm"
              class="w-24 mt-3 flex-none"
              :setPrimary="true"
              v-model="vitalData.circumferences.headCircumferences.unit"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component class="text-lg" title="Body Weight" :opened="true">
        <div class="w-full grid grid-cols-2 gap-6 my-5">
          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Body Weight"
              placeholder="0"
              v-model="vitalData.bodyWeight.bodyWeight.value"
              class="grow w-full"
              :setfull="true"
            />
            <div class="w-24">
              <cornie-input
                placeholder="kg"
                class="w-full mt-5 flex-none"
                disabled
                v-model="vitalData.bodyWeight.bodyWeight.unit"
              />
            </div>
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Body Mass Index (BMI)"
              placeholder="0"
              :disabled="true"
              v-model="bmi"
              class="grow w-full"
              :setfull="true"
            />
            <div class="w-24">
              <cornie-input
                placeholder="kg/m²"
                class="w-full mt-5 flex-none"
                disabled
                v-model="vitalData.bodyWeight.bodyMassIndex.unit"
              />
            </div>
          </div>
        </div>
      </accordion-component>

      <accordion-component
        class="text-primary"
        title="Blood Pressure"
        :opened="true"
      >
        <div class="w-full grid grid-cols-5 gap-4 my-5">
          <div class="">
            <cornie-select
              :items="['Standing Left', 'Standing Right']"
              class="w-full mt-3 flex-none"
              placeholder="--Select--"
              :setPrimary="true"
              v-model="newBp.position"
            />
          </div>
          <div class="flex space-x-2 w-full col-span-2">
            <cornie-input
              label="Systolic Blood Pressure"
              placeholder="0"
              v-model="newBp.systolicBloodPressure.value"
              class="grow w-full"
              :setfull="true"
            />
            <div class="w-32">
              <cornie-input
                placeholder="mmHg"
                class="w-full mt-5 flex-none"
                disabled
                v-model="newBp.systolicBloodPressure.unit"
              />
            </div>
          </div>

          <div class="flex space-x-2 w-full col-span-2">
            <cornie-input
              label="Diastolic Blood Pressure"
              placeholder="0"
              v-model="newBp.diastolicBloodPressure.value"
              class="grow w-full"
              :setfull="true"
            />
            <div class="w-32">
              <cornie-input
                placeholder="mmHg"
                class="w-full mt-5 flex-none"
                disabled
                v-model="newBp.diastolicBloodPressure.unit"
              />
            </div>
          </div>
        </div>

        <div class="w-full mb-4">
          <div class="w-full flex justify-end">
            <corniebtn
              @click="addBloodPressure"
              class="p-2 rounded-full px-8 mx-4 cursor-pointer"
              style="border: 1px solid #080056"
            >
              <span class="font-semibold text-primary-500 flex items-center">
                <span class="mx-2"><check-icon /></span>
                <span class="mr-2">Add</span>
              </span>
            </corniebtn>
          </div>
        </div>

        <div class="w-full flex items-center py-5">
          <div
            class="w-4/12"
            v-for="(record, index) in collectedPressures"
            :key="index"
          >
            <div class="w-11/12" style="border-right: 1px dashed #878e99">
              <div class="w-full flex items-center">
                <div class="w-8/12 flex flex-col">
                  <span class="font-semibold">{{ record.position }}</span>
                  <span class="text-gray-400"
                    >{{ record?.systolicBloodPressure?.value }}
                    {{ record?.systolicBloodPressure?.unit }}/{{
                      record?.diastolicBloodPressure?.value
                    }}
                    {{ record?.diastolicBloodPressure?.unit }}</span
                  >
                  <span class="text-gray-400">
                    <span class="mr-4">{{ record.date }}</span>
                    <span>{{ record.time }}</span>
                  </span>
                </div>
                <div class="w-4/12 flex items-center justify-center">
                  <span class="mx-2 cursor-pointer"><edit-icon /></span>
                  <span class="mx-2 cursor-pointer"
                    ><delete-icon @click="removePresure(index)"
                  /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </accordion-component>
    </v-form>

    <template #optionactions v-if="!viewState">
      <div class="flex items-center justify-end">
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
      </div>
    </template>
  </clinical-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import SplitInput from "./split-input.vue";
import InputWithDesc from "./input-with-desc.vue";
import SelectWithDesc from "./select-with-desc.vue";
import InputDescRounded from "./input-desc-rounded.vue";
import BloodPressure from "./blood-pressure.vue";
import EditIcon from "@/components/icons/edit.vue";
import DeleteIcon from "@/components/icons/deleteorange.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import DatePicker from "@/components/datepicker.vue";
import BasicInfo from "./basic-info.vue";
import CheckIcon from "@/components/icons/add.vue";
import { namespace } from "vuex-class";
import IVital, { IBloodPressure, IHabit } from "@/types/IVital";
import IPractitioner from "@/types/IPractitioner";
import IEncounter from "@/types/IEncounter";
import { Item } from "@/types/IUpdateModel";
import UnitsSelect from "./units-select.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import { cornieClient } from "@/plugins/http";
import ClinicalDialog from "../../conditions/clinical-dialog.vue";
import { boolean } from "yup/lib/locale";

const vitalsStore = namespace("vitals");
const userStore = namespace("user");

interface Pressures {
  position: string;
  pressure: string;
  date: string;
  time: string;
}

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
    UnitsSelect,
    BasicInfo,
    InputDescRounded,
    SelectWithDesc,
    CheckIcon,
    AccordionComponent,
    ClinicalDialog,
  },
})
export default class VitalsForm extends Vue {
  @vitalsStore.Action
  createVital!: (vital: IVital) => Promise<void>;

  @vitalsStore.Action
  getVitals!: (patientId: string) => Promise<void>;

  @vitalsStore.Action
  createEncounter!: (vital: IEncounter) => Promise<void>;

  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: Boolean, default: false })
  viewState!: boolean;

  @Prop({ type: Object, default: <any>{} })
  vital!: IVital;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @Watch("id")
  idChanged() {
    this.setVitals();
  }

  loading = false;

  collectedPressures: IBloodPressure[] = [];

  newBp: any = {
    position: "",
    systolicBloodPressure: {
      unit: "mmHg",
      value: 0,
    },
    diastolicBloodPressure: {
      unit: "mmHg",
      value: 0,
    },
    date: "",
    time: "",
  };
  vitalData: any = {
    status: "final",
    bodyTemperature: {
      unit: undefined,
      value: undefined,
    },
    respiration: {
      respiratoryRate: {
        value: undefined,
        unit: "/min",
      },
      heartRate: {
        value: undefined,
        unit: "/min",
      },
      oxygenSaturation: {
        value: undefined,
        unit: "%",
      },
      bloodGlucoseLevel: {
        unit: undefined,
        value: undefined,
      },
    },
    bloodPressure: [] as IBloodPressure[],
    circumferences: {
      bodyHeight: {
        unit: undefined,
        value: undefined,
      },
      headCircumferences: {
        unit: undefined,
        value: undefined,
      },
    },

    bodyWeight: {
      bodyWeight: {
        unit: "kg",
        value: undefined,
      },
      bodyMassIndex: {
        unit: "kg/m²",
        value: undefined,
      },
    },
  };

  temperatureUnits = [
    { display: "°F", code: "fahrenheit" },
    { display: "°C", code: "celcius" },
  ] as Item[];

  get practitionerId() {
    return this.authPractitioner?.id;
  }

  get bmi() {
    const weightValue = this.vitalData?.bodyWeight?.bodyWeight?.value;
    const heightValue = this.vitalData?.circumferences?.bodyHeight?.value;
    if (heightValue && weightValue) {
      return (weightValue / Number(this.squaredHeight)).toFixed(2) || 0;
    } else return 0.0;
  }

  get squaredHeight() {
    return (
      Number(this.convertHeightValue()) * Number(this.convertHeightValue())
    );
  }

  convertHeightValue() {
    const heightValue = this.vitalData?.circumferences?.bodyHeight?.value;
    const heightUnit = this.vitalData?.circumferences?.bodyHeight?.unit;
    if (heightValue) {
      if (heightUnit === "cm") {
        return Number(heightValue / 100);
      } else if (heightUnit === "in") {
        return Number(heightValue / 39.37);
      } else if (heightUnit === "ft") {
        return Number(heightValue / 3.281);
      } else return Number(heightValue);
    }
  }

  removePresure(index: number) {
    this.collectedPressures.splice(index, 1);
    this.vitalData.bloodPressure.splice(index + 1, 2);
  }

  get newaction() {
    return this.id ? "Update" : "Create New";
  }

  addBloodPressure() {
    this.collectedPressures.push({
      ...this.newBp,
      date: new Date().toLocaleDateString(),
      time: new Date().toTimeString().substring(0, 5),
    });
    this.newBp = {
      position: "",
      systolicBloodPressure: {
        unit: "mmHg",
        value: 0,
      },
      diastolicBloodPressure: {
        unit: "mmHg",
        value: 0,
      },
      date: "",
      time: "",
    };
  }

  get patientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  get payload() {
    const data: any = {};
    const respiration: any = {};
    const circumferences: any = {};
    const bodyWeight: any = {};
    if (
      this.vitalData?.bodyTemperature?.unit &&
      this.vitalData?.bodyTemperature?.value
    )
      data.bodyTemperature = this.vitalData.bodyTemperature;
    if (
      this.vitalData?.respiration?.respiratoryRate.value &&
      this.vitalData?.respiration?.respiratoryRate.unit
    ) {
      respiration.respiratoryRate = this.vitalData.respiration.respiratoryRate;
    }
    if (
      this.vitalData?.respiration?.heartRate.value &&
      this.vitalData?.respiration?.heartRate.unit
    ) {
      respiration.heartRate = this.vitalData.respiration.heartRate;
    }
    if (
      this.vitalData.respiration.oxygenSaturation.value &&
      this.vitalData.respiration.oxygenSaturation.unit
    ) {
      respiration.oxygenSaturation =
        this.vitalData.respiration.oxygenSaturation;
    }
    if (
      this.vitalData.respiration.bloodGlucoseLevel.value &&
      this.vitalData.respiration.bloodGlucoseLevel.unit
    ) {
      respiration.bloodGlucoseLevel =
        this.vitalData.respiration.bloodGlucoseLevel;
    }
    if (
      this.vitalData.circumferences.bodyHeight.value &&
      this.vitalData.circumferences.bodyHeight.unit
    ) {
      circumferences.bodyHeight = this.vitalData.circumferences.bodyHeight;
    }
    if (
      this.vitalData.circumferences.headCircumferences.value &&
      this.vitalData.circumferences.headCircumferences.unit
    ) {
      circumferences.headCircumferences =
        this.vitalData.circumferences.headCircumferences;
    }
    if (
      this.vitalData.bodyWeight.bodyWeight.value &&
      this.vitalData.bodyWeight.bodyWeight.unit
    ) {
      bodyWeight.bodyWeight = this.vitalData.bodyWeight.bodyWeight;
    }
    if (this.bmi) {
      bodyWeight.bodyMassIndex = this.vitalData.bodyWeight.bodyMassIndex;
    }

    data.circumferences =
      Object.keys(circumferences).length > 0 ? circumferences : undefined;
    data.respiration =
      Object.keys(respiration).length > 0 ? respiration : undefined;
    data.bodyWeight =
      Object.keys(bodyWeight).length > 0 ? bodyWeight : undefined;
    data.patientId = this.patientId;
    data.practitionerId = this.practitionerId;
    data.bloodPressure =
      this.collectedPressures.length > 0 ? this.collectedPressures : [];

    return data;
  }

  async save() {
    this.loading = true;
    if (this.id) await this.updateVitals();
    else await this.createVitals();
    this.loading = false;
  }

  async createVitals() {
    this.vitalData.bodyWeight.bodyMassIndex.value = this.bmi;
    try {
      this.loading = true;
      const res: any = await this.createVital(this.payload as any);
      if (res.success) {
        notify({ msg: "Vitals recorded successfully", status: "success" });
        this.getVitals(this.patientId);
        this.loading = false;
        this.done();
      }
    } catch (error) {
      this.loading = false;
    }
  }

  setVitals() {
    if (this.id !== "") {
      const xVital = this.vital;
      if (xVital) {
        ((this.vitalData.bodyTemperature as any) = xVital?.bodyTemperature),
          ((this.vitalData.respiration as any) = xVital?.respiration),
          ((this.vitalData.circumferences as any) = xVital?.circumferences),
          ((this.vitalData.bodyWeight as any) = xVital?.bodyWeight),
          (this.vitalData.bloodPressure = xVital?.bloodPressure),
          (this.collectedPressures = xVital?.bloodPressure);
      }
    } else {
      this.collectedPressures = [];
    }
  }

  done() {
    this.show = false;
    this.$emit("vitals-added");
    this.collectedPressures = [];
  }

  async updateVitals() {
    const url = `/api/v1/vitals/signs/${this.id}`;
    try {
      const response = await cornieClient().put(url, this.payload);
      if (response.success) {
        window.notify({
          msg: "Vitals updated",
          status: "success",
        });
        this.done();
      }
    } catch (error) {
      window.notify({
        msg: "Vitals not updated",
        status: "error",
      });
    }
  }

  async created() {
    if (this.id) {
      await this.setVitals();
    }
  }
}
</script>
