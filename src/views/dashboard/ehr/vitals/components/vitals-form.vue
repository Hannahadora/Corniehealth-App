<template>
  <div class="container-fluid p-4">
    <div class="w-full">
      <accordion-component
        class="text-primary"
        title="Body Temperature"
        :opened="true"
      >
        <div class="w-full grid grid-cols-2 gap-6">
          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Body Temperature"
              placeholder="0"
              :modelValue="vitalData.temperature.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="temperatureUnits"
              placeholder="°C"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.temperature.unit"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component
        class="text-primary"
        title="RR, HR, OS, BGL"
        :opened="true"
      >
        <div class="w-full grid grid-cols-2 gap-6">
          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Respiratory Rate"
              placeholder="0"
              :modelValue="vitalData.respiratoryRate"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="temperatureUnits"
              placeholder="/min"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.respiratoryUnit"
            />
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Heart Rate"
              placeholder="0"
              :modelValue="vitalData.pulse"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="temperatureUnits"
              placeholder="/min"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.respiratoryUnit"
            />
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Oxygen Saturation"
              placeholder="0"
              :modelValue="vitalData.oxygenSaturation"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="temperatureUnits"
              placeholder="%"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.oxygenSaturationRate"
            />
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Blood Glucose Level"
              placeholder="0"
              :modelValue="vitalData.bloodGlucoseLevel"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['mm/dL', 'mmo/L']"
              placeholder="mm/dL"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.bloodGlucoseLevelUnit"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component
        class="text-primary"
        title="Height & Head Circumference"
        :opened="true"
      >
        <div class="w-full grid grid-cols-2 gap-6">
          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Body Height"
              placeholder="0"
              :modelValue="vitalData.height.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['cm', 'in', 'ft']"
              placeholder="cm"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.height.unit"
            />
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Head Circumference"
              placeholder="0"
              :modelValue="vitalData.headCircumference.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['cm', 'in', 'ft']"
              placeholder="cm"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.headCircumference.unit"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component class="text-lg" title="Body Weight" :opened="true">
        <div class="w-full grid grid-cols-2 gap-6">
          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Body Weight"
              placeholder="0"
              :modelValue="vitalData.weight.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['Kg', 'Ib']"
              placeholder="kg"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.weight.unit"
            />
          </div>

          <div class="flex space-x-2 w-full">
            <cornie-input
              label="Body Mass Index (BMI)"
              placeholder="0"
              :modelValue="vitalData.bmi.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['cm', 'in', 'ft']"
              placeholder="kg/m³"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="vitalData.bmi.unit"
            />
          </div>
        </div>
      </accordion-component>

      <accordion-component
        class="text-primary"
        title="Blood Pressure"
        :opened="true"
      >
        <div class="w-full grid grid-cols-5 gap-6">
          <div class="">
            <cornie-select
              :items="['Standing Left', 'Standing Right']"
              class="w-full mt-3 flex-none"
              :setPrimary="true"
              :modelValue="bloodPressure.measurement.unit"
            />
          </div>
          <div class="flex space-x-2 w-full col-span-2">
            <cornie-input
              label="Systolic Blood Pressure"
              placeholder="0"
              :modelValue="bloodPressure.measurement.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['mmHg']"
              placeholder="mmHg"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="bloodPressure.measurement.unit"
            />
          </div>

          <div class="flex space-x-2 w-full col-span-2">
            <cornie-input
              label="Diastolic Blood Pressure"
              placeholder="0"
              :modelValue="bloodPressure.measurement.value"
              class="grow w-full"
              :setfull="true"
            />
            <cornie-select
              :items="['mmHg']"
              placeholder="mmHg"
              class="w-20 mt-3 flex-none"
              :setPrimary="true"
              :modelValue="bloodPressure.measurement.unit"
            />
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
                  <span class="text-gray-400">{{ record.pressure }}</span>
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

      <div class="w-full mt-12" v-if="!selectedVital?.id">
        <div class="w-full pb-8 flex flex justify-end">
          <corniebtn
            class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center"
            style="border: 1px solid #080056"
          >
            <span class="font-semibold text-primary-500" @click="onCancel"
              >Cancel</span
            >
          </corniebtn>

          <CornieBtn
            :loading="loading"
            class="bg-red-500 p-2 rounded-full px-8 mx-4"
          >
            <span class="text-white font-semibold" @click="onSubmit">Save</span>
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
import SelectWithDesc from "./select-with-desc.vue";
import InputDescRounded from "./input-desc-rounded.vue";
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
import BasicInfo from "./basic-info.vue";
import CheckIcon from "@/components/icons/add.vue";
import { namespace } from "vuex-class";
import IVital, { IBloodPressure, IHabit } from "@/types/IVital";
import IPractitioner from "@/types/IPractitioner";
import { Prop, Watch } from "vue-property-decorator";
import IEncounter from "@/types/IEncounter";
import { Item } from "@/types/IUpdateModel";
import UnitsSelect from "./units-select.vue";
import AccordionComponent from "@/components/form-accordion.vue";

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
    SaveIcon,
    ShareIcon,
    PrintIcon,
    UnitsSelect,
    Share,
    Print,
    BasicInfo,
    InputDescRounded,
    SelectWithDesc,
    CheckIcon,
    AccordionComponent,
  },
})
export default class VitalsForm extends Vue {
  @vitalsStore.Action
  createVital!: (vital: IVital) => Promise<void>;

  @vitalsStore.Action
  getVitals!: (patientId: string) => Promise<void>;

  @vitalsStore.Action
  createEncounter!: (vital: IEncounter) => Promise<void>;

  @Prop()
  selectedVital!: IVital;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  collectedPressures: Pressures[] = [];

  bloodPressure: IBloodPressure = {
    position: "",
    type: "",
    measurement: {
      unit: "mmHg",
      value: 0,
    },
  };

  habit = {} as IHabit;
  physical = {} as IHabit;

  systolic = "";
  diastolic = "";
  loading = false;
  examComment = "";

  data: any = {
    identifier: "string",
    status: "string",
    type: "string",
    class: "string",
    priority: "string",
    serviceType: "string",
    appointmentId: "554c4e03-6bd3-4757-920b-a5e8eb756411",
    organizationId: "0eb0c710-665a-449c-ab27-42014d25c676",
    patientId: "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    startTime: "10:00",
    endTime: "12:00",
    preAdmissionIdentifier: "string",
    origin: "string",
    admitSource: "string",
    readmission: "string",
    dietPreference: "string",
    locationId: "9b45779c-91f3-4f73-8de8-83265412789d",
    specialCourtesy: "string",
    practitionerId: "d4249dec-f3ab-444f-867d-5710e3c6891a",
    episode: {
      name: "Test Episode",
      start: new Date().toISOString(),
      end: new Date().toISOString(),
      patientId: "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757",
    },
  };

  vitalData: IVital = {
    weight: {
      unit: "Kg",
      // value: 0
    },
    height: {
      unit: "cm",
      // value: 170
    },
    temperature: {
      unit: "fahrenheit",
      // value: 50
    },
    comments: "",
    bloodPressure: [] as IBloodPressure[],

    date: new Date().toISOString(),
    type: "Type",
    status: "active",
    encounterId: "c5903ec6-20ac-47ee-b652-a562e5df7379",
    patientId: this.$route?.params?.id,
    // patientId: "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757",
    practitionerId: this.practitionerId,
    // pulse: 78,
  } as IVital;

  temperatureUnits = [
    { display: "°F", code: "fahrenheit" },
    { display: "°C", code: "celcius" },
  ] as Item[];

  get practitionerId() {
    return this.authPractitioner?.id;
  }

  removePresure(index: number) {
    this.collectedPressures.splice(index, 1);
    this.vitalData.bloodPressure.splice(index + 1, 2);
  }

  removeHabit(index: number) {
    this.vitalData.habits.splice(index, 1);
  }

  removePhysical(index: number) {
    this.vitalData.physicals.splice(index, 1);
  }

  resetBloodPressure() {
    this.bloodPressure = {
      position: "",
      type: "",
      measurement: {
        unit: "mmHg",
        value: 0,
      },
    };
  }

  resetVitalData() {
    this.vitalData = {
      weight: {
        unit: "Kg",
        // value: 0
      },
      height: {
        unit: "cm",
        // value: 170
      },
      temperature: {
        unit: "fahrenheit",
        // value: 50
      },
      comments: "",
      habits: [] as IHabit[],
      physicals: [] as IHabit[],
      bloodPressure: [] as IBloodPressure[],

      date: new Date().toISOString(),
      type: "Type",
      status: "active",
      encounterId: "c5903ec6-20ac-47ee-b652-a562e5df7379",
      patientId: this.$route?.params?.id,
      // patientId: "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757",
      practitionerId: this.practitionerId,
      // pulse: 78,
    } as IVital;
  }

  onCancel() {
    this.$emit("closesidemodal");
    this.resetVitalData();
  }

  addHabit() {
    if (!this.habit.value || !this.habit.key) return false;
    this.vitalData.habits.push(this.habit);
    this.habit = {} as IHabit;
    this.vitalData.comments = "";
  }

  addPhysical() {
    if (!this.physical.value || !this.physical.key) return false;
    this.vitalData.physicals.push(this.physical);
    this.physical = {} as IHabit;
    this.examComment = "";
  }

  addBloodPressure() {
    if (!this.diastolic || !this.bloodPressure.measurement?.value) return false;
    this.collectedPressures.push({
      position: this.bloodPressure.position,
      pressure: `${this.bloodPressure?.measurement?.value}/${this.diastolic}mmHg`,
      date: new Date().toLocaleDateString(),
      time: new Date().toTimeString().substring(0, 5),
    });

    this.bloodPressure.type = "systolic";
    this.vitalData.bloodPressure.push(this.bloodPressure);
    this.vitalData.bloodPressure.push({
      position: this.bloodPressure.position,
      type: "diastolic",
      measurement: {
        unit: "mmHg",
        value: +this.diastolic,
      },
    });
    this.diastolic = "";
    this.bloodPressure.measurement.value = 0;
  }

  get patientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async onSubmit() {
    //   await this.createEncounter(this.data);
    try {
      this.loading = true;
      this.vitalData.practitionerId = this.practitionerId;
      this.vitalData.patientId = this.patientId;

      await this.createVital(this.vitalData);
      this.getVitals(this.patientId);
      this.loading = false;
      this.$emit("closesidemodal");
      this.resetVitalData();
    } catch (error) {
      this.loading = false;
    }
  }

  @Watch("selectedVital")
  updateVitalData() {
    if (this.selectedVital?.id) {
      this.vitalData = this.selectedVital;
      this.collectedPressures = [];

      for (
        let i = 1;
        i <= this.selectedVital.bloodPressure?.length;
        i = i + 2
      ) {
        this.collectedPressures.push({
          position: this.selectedVital?.bloodPressure[i - 1].position,
          pressure: `${
            this.selectedVital?.bloodPressure[i - 1]?.measurement?.value
          }/${this.selectedVital?.bloodPressure[i]?.measurement?.value}mmHg`,
          date: new Date().toLocaleDateString(),
          time: new Date().toTimeString().substring(0, 5),
        });
      }
    }
  }
}
</script>
