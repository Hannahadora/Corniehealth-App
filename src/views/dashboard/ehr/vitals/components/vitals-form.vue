<template>
  <cornie-dialog v-model="show" right class="w-2/3 h-full">
    <cornie-card
      height="100%"
      class="flex flex-col h-full bg-white px-6 overflow-y-scroll"
    >
      <cornie-card-title class="">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ newaction }} Vitals
          </h2>
          <cancel-red-bg
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>
      <cornie-card-text class="flex-grow scrollable">
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
                  class="w-20 mt-3 flex-none"
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
                <cornie-select
                  :items="temperatureUnits"
                  placeholder="/min"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="vitalData.respiration.respiratoryRate.unit"
                />
              </div>

              <div class="flex space-x-2 w-full">
                <cornie-input
                  label="Heart Rate"
                  placeholder="0"
                  v-model="vitalData.respiration.heartRate.value"
                  class="grow w-full"
                  :setfull="true"
                />
                <cornie-select
                  :items="temperatureUnits"
                  placeholder="/min"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="vitalData.respiration.heartRate.unit"
                />
              </div>

              <div class="flex space-x-2 w-full">
                <cornie-input
                  label="Oxygen Saturation"
                  placeholder="0"
                  v-model="vitalData.respiration.oxygenSaturation.value"
                  class="grow w-full"
                  :setfull="true"
                />
                <cornie-select
                  :items="temperatureUnits"
                  placeholder="%"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="vitalData.respiration.oxygenSaturation.unit"
                />
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
                  :items="['mm/dL', 'mmo/L']"
                  placeholder="mm/dL"
                  class="w-20 mt-3 flex-none"
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
                  class="w-20 mt-3 flex-none"
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
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="vitalData.circumferences.headCircumferences.unit"
                />
              </div>
            </div>
          </accordion-component>

          <accordion-component
            class="text-lg"
            title="Body Weight"
            :opened="true"
          >
            <div class="w-full grid grid-cols-2 gap-6 my-5">
              <div class="flex space-x-2 w-full">
                <cornie-input
                  label="Body Weight"
                  placeholder="0"
                  v-model="vitalData.bodyWeight.bodyWeight.value"
                  class="grow w-full"
                  :setfull="true"
                />
                <cornie-select
                  :items="['Kg', 'Ib']"
                  placeholder="kg"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="vitalData.bodyWeight.bodyWeight.unit"
                />
              </div>

              <div class="flex space-x-2 w-full">
                <cornie-input
                  label="Body Mass Index (BMI)"
                  placeholder="0"
                  v-model="vitalData.bodyWeight.bodyMassIndex.value"
                  class="grow w-full"
                  :setfull="true"
                />
                <cornie-select
                  :items="['cm', 'in', 'ft']"
                  placeholder="kg/m³"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="vitalData.bodyWeight.bodyMassIndex.unit"
                />
              </div>
            </div>
          </accordion-component>

          <accordion-component
            class="text-primary"
            title="Blood Pressure"
            :opened="true"
          >
            <div class="w-full grid grid-cols-5 gap-6 my-5">
              <div class="">
                <cornie-select
                  :items="['Standing Left', 'Standing Right']"
                  class="w-full mt-3 flex-none"
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
                <cornie-select
                  :items="['mmHg']"
                  placeholder="mmHg"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="newBp.systolicBloodPressure.unit"
                />
              </div>

              <div class="flex space-x-2 w-full col-span-2">
                <cornie-input
                  label="Diastolic Blood Pressure"
                  placeholder="0"
                  v-model="newBp.diastolicBloodPressure.value"
                  class="grow w-full"
                  :setfull="true"
                />
                <cornie-select
                  :items="['mmHg']"
                  placeholder="mmHg"
                  class="w-20 mt-3 flex-none"
                  :setPrimary="true"
                  v-model="newBp.diastolicBloodPressure.unit"
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
                  <span
                    class="font-semibold text-primary-500 flex items-center"
                  >
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
      </cornie-card-text>

      <div class="flex items-center justify-between mt-24">
        <div class="text-red-500 py-1 px-2 text-sm">Cancel</div>
        <div class="flex items-center mb-6">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-3 py-1 mr-3 rounded-lg text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            @click="save"
            :loading="loading"
            type="submit"
            class="text-white bg-danger px-3 py-1 rounded-lg"
          >
            Save
          </cornie-btn>
        </div>
      </div>
    </cornie-card>
  </cornie-dialog>
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
import IEncounter from "@/types/IEncounter";
import { Item } from "@/types/IUpdateModel";
import UnitsSelect from "./units-select.vue";
import AccordionComponent from "@/components/form-accordion.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import CancelRedBg from "@/components/icons/cancel-red-bg.vue";
import { cornieClient } from "@/plugins/http";

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
    CornieDialog,
    ...CornieCard,
    ArrowLeft,
    CancelRedBg,
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

  @Prop({ type: Object, default: <any>{} })
  vital!: IVital;

  @userStore.Getter
  authPractitioner!: IPractitioner;

  @Watch("id")
  idChanged() {
    this.setVitals();
  }

  collectedPressures: IBloodPressure[] = [];

  bloodPressure: IBloodPressure = {
    position: "",
    systolicBloodPressure: {
      unit: "",
      value: 0,
    },
    diastolicBloodPressure: {
      unit: "",
      value: 0,
    },
  };

  newBp: any = {
    position: "",
    systolicBloodPressure: {
      unit: "",
      value: 0,
    },
    diastolicBloodPressure: {
      unit: "",
      value: 0,
    },
    date: "",
    time: "",
  };

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
    status: "preliminary",
    bodyTemperature: {
      unit: "",
      value: 0,
    },
    respiration: {
      respiratoryRate: {
        unit: "",
        value: 0,
      },
      heartRate: {
        unit: "",
        value: 0,
      },
      oxygenSaturation: {
        unit: "",
        value: 0,
      },
      bloodGlucoseLevel: {
        unit: "",
        value: 0,
      },
    },
    bloodPressure: [] as IBloodPressure[],
    circumferences: {
      bodyHeight: {
        unit: "",
        value: 0,
      },
      headCircumferences: {
        unit: "",
        value: 0,
      },
    },

    bodyWeight: {
      bodyWeight: {
        unit: "",
        value: 0,
      },
      bodyMassIndex: {
        unit: "",
        value: 0,
      },
    },
    date: new Date().toISOString(),
    type: "Type",
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

  resetBloodPressure() {
    this.bloodPressure = {
      position: "",
      systolicBloodPressure: {
        unit: "",
        value: 0,
      },
      diastolicBloodPressure: {
        unit: "",
        value: 0,
      },
    };
  }

  resetVitalData() {
    this.vitalData = {
      bodyTemperature: {
        unit: "",
        value: 0,
      },
      respiration: {
        respiratoryRate: {
          unit: "",
          value: 0,
        },
        heartRate: {
          unit: "",
          value: 0,
        },
        oxygenSaturation: {
          unit: "",
          value: 0,
        },
        bloodGlucoseLevel: {
          unit: "",
          value: 0,
        },
      },
      bloodPressure: [] as IBloodPressure[],
      circumferences: {
        bodyHeight: {
          unit: "",
          value: 0,
        },
        headCircumferences: {
          unit: "",
          value: 0,
        },
      },

      bodyWeight: {
        bodyWeight: {
          unit: "",
          value: 0,
        },
        bodyMassIndex: {
          unit: "",
          value: 0,
        },
      },

      date: new Date().toISOString(),
      type: "Type",
      status: "preliminary",
      encounterId: "c5903ec6-20ac-47ee-b652-a562e5df7379",
      patientId: this.$route?.params?.id,
      // patientId: "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757",
      practitionerId: this.practitionerId,
    } as IVital;
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
  }

  get patientId() {
    const id = this.$route?.params?.id as string;
    return id;
  }

  async save() {
    this.loading = true;
    if (this.id) await this.updateVitals();
    else await this.createVitals();
    this.loading = false;
  }

  async createVitals() {
    //   await this.createEncounter(this.data);
    try {
      this.loading = true;
      this.vitalData.practitionerId = this.practitionerId;
      this.vitalData.patientId = this.patientId;
      this.vitalData.bloodPressure = this.collectedPressures;

      await this.createVital(this.vitalData);
      this.getVitals(this.patientId);
      this.loading = false;
      this.$emit("closesidemodal");
      this.resetVitalData();
    } catch (error) {
      this.loading = false;
    }
  }

  setVitals() {
    if (this.id !== "") {
      const xVital = this.vital;
      if (xVital) {
        (this.vitalData.bodyTemperature = xVital?.bodyTemperature),
          (this.vitalData.respiration = xVital?.respiration),
          (this.vitalData.circumferences = xVital?.circumferences),
          (this.vitalData.bodyWeight = xVital?.bodyWeight),
          (this.vitalData.bloodPressure = xVital?.bloodPressure),
          (this.collectedPressures = xVital?.bloodPressure);
      }
    } else {
      this.resetVitalData();
    }
  }

  done() {
    this.$emit("vitals-added");
    this.show = false;
    this.resetVitalData();
  }

  async updateVitals() {
    const url = `/api/v1/vitals/signs/${this.id}`;
    const payload = {
      ...this.vitalData,
      patientId: this.patientId,
      bloodPressure: this.collectedPressures,
      practitionerId: this.practitionerId,
    };
    try {
      const response = await cornieClient().put(url, payload);
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
