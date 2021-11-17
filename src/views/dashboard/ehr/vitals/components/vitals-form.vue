<template>
  <div class="container-fluid p-4">
      <div class="w-full">

        <basic-info :title="'Basic Info'" :show="true">
            <template #form>
                <div class="w-full flex items-center py-3 mt-3">
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <input-desc-rounded :label="'Temperature'">
                                <input  v-model="vitalData.temperature.value" type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                                <template #unit>
                                    <units-select class="-mt-1" v-model="vitalData.temperature.unit" :items="temperatureUnits" style="width: 48px; border:none;font-size:14px"/>
                                </template>
                            </input-desc-rounded>
                        </div>
                    </div>
                    <div class="w-6/12">
                        <input-desc-rounded :label="'Pulse Rate'"  :info="'bpm'">
                            <input v-model="vitalData.pulse" type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                        </input-desc-rounded>
                    </div>
                </div>

                <div class="w-full flex items-center ">
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <input-desc-rounded :label="'Respiratory Rate'" :info="'rpm'">
                                <input  v-model="vitalData.respiratoryRate" type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                            </input-desc-rounded>
                        </div>
                    </div>
                    <div class="w-6/12">
                        <input-desc-rounded :label="'Oxygen Saturation'" :info="'%'">
                            <input v-model="vitalData.oxygenSaturation" type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                        </input-desc-rounded>
                    </div>
                </div>

                <div class="w-full flex items-center py-3">
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <input-desc-rounded :label="'Height'">
                                <input v-model="vitalData.height.value" type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                                <template #unit>
                                    <units-select class="-mt-1" v-model="vitalData.height.unit" :items="[ 'cm', 'in', 'ft']" style="width: 48px; border:none;font-size:14px"/>
                                </template>
                            </input-desc-rounded>
                        </div>
                    </div>
                    <div class="w-6/12">
                        <input-desc-rounded :label="'Weight'"  v-model="vitalData.height.value">
                            <input  v-model="vitalData.weight.value" type="text" class="p-2 border w-100 w-full" style="border-radius: 8px">
                            <template #unit>
                                <units-select class="-mt-1" v-model="vitalData.weight.unit" :items="[ 'Kg', 'Ib']" style="width: 48px; border:none;font-size:14px"/>
                            </template>
                        </input-desc-rounded>
                    </div>
                </div>
            </template>
        </basic-info>

        <basic-info :title="'Blood Pressure'">
            <template #form>
                <div class="w-full flex items-center py-3 mt-3">
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <split-input :label="'Blood Pressure (Systolic)'"  >
                                <template #list>
                                    <cornie-select v-model="bloodPressure.position" :items="['Staning_Left', 'Standing_Right']" style="width: 100%;border-radius: 8px 0 0 8px" />
                                </template>
                                <template #input>
                                    <input-with-desc :info="'mmHg'">
                                        <input v-model="bloodPressure.measurement.value" type="text" class="p-2 border w-100 w-full" style="border-radius: 0 8px 8px 0">
                                    </input-with-desc>
                                </template>
                            </split-input>
                        </div>
                    </div>
                    <div class="w-6/12">
                        <input-desc-rounded :label="'Blood Pressure(Diastolic)'" :info="'mmHg'">
                            <input v-model="diastolic" type="text" class="p-2 border w-100 w-full" style="border-radius: 0 8px 8px 0">
                        </input-desc-rounded>
                    </div>
                </div>

                <div class="w-full mb-4">
                    <div class="w-full flex justify-end">
                        <corniebtn @click="addBloodPressure" class="p-2 rounded-full px-8 mx-4 cursor-pointer" style="border: 1px solid #080056;">
                            <span class="font-semibold text-primary-500 flex items-center">
                                <span class="mx-2"><check-icon /></span> 
                                <span class="mr-2">Add</span>
                            </span>
                        </corniebtn>
                    </div>
                </div>

                <div class="w-full flex items-center py-5">
                    <div class="w-4/12" v-for="(record, index) in collectedPressures" :key="index">
                        <div class="w-11/12" style="border-right: 1px dashed #878E99;">
                            <div class="w-full flex items-center">
                                <div class="w-8/12 flex flex-col">
                                    <span class="font-semibold">{{ record.position }}</span>
                                    <span class="text-gray-400">{{ record.pressure }}</span>
                                    <span class="text-gray-400">
                                        <span class="mr-4">{{ record.date }}</span>
                                        <span>{{ record.time }}</span>
                                    </span>
                                </div>
                                <div class="w-4/12  flex items-center justify-center">
                                    <span class="mx-2 cursor-pointer"><edit-icon /></span>
                                    <span class="mx-2 cursor-pointer"><delete-icon @click="removePresure(index)"/></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </template>
        </basic-info>

        <basic-info :title="'Habits'">
            <template #form>
                <div class="w-full flex items-center py-3 mt-3">
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <split-input :label="'Habits'"  >
                                <template #list>
                                    <cornie-select v-model="habit.key" :items="['Excercise Frequently', 'another Option']" class="mt-1" style="width: 100%;border-radius: 8px 0 0 8px" />
                                </template>
                                <template #input>
                                    <cornie-select v-model="habit.value" :items="['Off & On', 'another Option']" class="-mb-1" style="width: 100%;border-radius: 0 8px 8px 0" />
                                </template>
                            </split-input>
                        </div>
                    </div>
                    <div class="w-6/12">
                        <input-desc-rounded :label="'Comment'" :info="''">
                            <input v-model="vitalData.comments" type="text" class="p-2 border w-100 w-full" style="border-radius: 0 8px 8px 0">
                        </input-desc-rounded>
                    </div>
                </div>

                <div class="w-full mb-4">
                    <div class="w-full flex justify-end">
                        <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer" style="border: 1px solid #080056;">
                            <span class="font-semibold text-primary-500 flex items-center">
                                <span class="mx-2"><check-icon /></span> 
                                <span class="mr-2" @click="addHabit">Add</span>
                            </span>
                        </corniebtn>
                    </div>
                </div>

                <div class="w-full flex items-center py-5">
                    <div class="w-4/12" v-for="(record, index) in vitalData.habits" :key="index">
                        <div class="w-11/12" style="border-right: 1px dashed #878E99;">
                            <div class="w-full flex items-center">
                                <div class="w-8/12 flex flex-col">
                                    <span class="font-semibold">{{ record.key }}</span>
                                    <span class="text-gray-400">{{ record.value }}</span>
                                </div>
                                <div class="w-4/12  flex items-center justify-center">
                                    <span class="mx-2 cursor-pointer"><edit-icon /></span>
                                    <span class="mx-2 cursor-pointer" @click="removeHabit(index)"><delete-icon /></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </template>
        </basic-info>

        <basic-info :title="'Physical Examination'">
            <template #form>
                <div class="w-full flex items-center py-3 mt-3">
                    <div class="w-6/12">
                        <div class="w-11/12">
                            <split-input :label="'Physical Examination'"  >
                                <template #list>
                                    <cornie-select v-model="physical.key" :items="['Heent', 'Skin']" class="mt-1" style="width: 100%;border-radius: 8px 0 0 8px" />
                                </template>
                                <template #input>
                                    <cornie-select v-model="physical.value" :items="['Abnormal', 'Skin Lesion']" class="-mb-1" style="width: 100%;border-radius: 0 8px 8px 0" />
                                </template>
                            </split-input>
                        </div>
                    </div>
                    <div class="w-6/12">
                        <input-desc-rounded :label="'Comment'" :info="''">
                            <input type="text" class="p-2 border w-100 w-full" style="border-radius: 0 8px 8px 0">
                        </input-desc-rounded>
                    </div>
                </div>

                <div class="w-full mb-4">
                    <div class="w-full flex justify-end">
                        <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer" style="border: 1px solid #080056;">
                            <span class="font-semibold text-primary-500 flex items-center">
                                <span class="mx-2"><check-icon /></span> 
                                <span class="mr-2" @click="addPhysical">Add</span>
                            </span>
                        </corniebtn>
                    </div>
                </div>

                <div class="w-full flex items-center py-5">
                    <div class="w-4/12" v-for="(record, index) in vitalData.physicals" :key="index">
                        <div class="w-11/12" style="border-right: 1px dashed #878E99;">
                            <div class="w-full flex items-center">
                                <div class="w-8/12 flex flex-col">
                                    <span class="font-semibold">{{ record.key }}</span>
                                    <span class="text-gray-400">{{ record.value }}</span>
                                </div>
                                <div class="w-4/12  flex items-center justify-center">
                                    <span class="mx-2"><edit-icon /></span>
                                    <span class="mx-2"><delete-icon @click="removePhysical" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </basic-info>

        <div class="w-full mt-12"  v-if="!selectedVital?.id">
            <div class="w-full pb-8 flex flex justify-end">
                <corniebtn class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center" style="border: 1px solid #080056;">
                    <span class="font-semibold text-primary-500" @click="() => $emit('closesidemodal')">Cancel</span>
                </corniebtn>

                <CornieBtn :loading="loading" class="bg-red-500 p-2 rounded-full px-8 mx-4">
                    <span class="text-white font-semibold" @click="onSubmit">Save</span>
                </CornieBtn>
            </div>
          </div>
      </div>

  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue"
import CornieInput from "@/components/cornieinput.vue"
import SplitInput from "./split-input.vue"
import InputWithDesc from "./input-with-desc.vue"
import SelectWithDesc from "./select-with-desc.vue"
import InputDescRounded from "./input-desc-rounded.vue"
import BloodPressure from "./blood-pressure.vue"
import EditIcon from "@/components/icons/edit.vue"
import DeleteIcon from "@/components/icons/deleteorange.vue"
import CornieBtn from "@/components/CornieBtn.vue"
import DatePicker from "@/components/datepicker.vue"
import ShareIcon from "./share.vue"
import SaveIcon from "@/components/icons/save.vue"
import PrintIcon from "./print.vue"
import Share from "@/components/icons/share.vue";
import Print from "@/components/icons/print.vue";
import BasicInfo from "./basic-info.vue"
import CheckIcon from "@/components/icons/add.vue"
import { namespace } from "vuex-class";
import IVital, { IBloodPressure, IHabit } from "@/types/IVital";
import IPractitioner from "@/types/IPractitioner";
import { Prop, Watch } from "vue-property-decorator";
import IEncounter from "@/types/IEncounter";
import { Item } from "@/types/IUpdateModel";
import UnitsSelect from "./units-select.vue"

const vitalsStore = namespace("vitals");
const userStore = namespace("user");

interface Pressures {
    position: string,
    pressure: string,
    date: string,
    time: string,
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

  collectedPressures: Pressures[] = [ ]

  bloodPressure: IBloodPressure = { 
    position: "",
    type: "",
    measurement: {
        unit: "mmHg",
        value: 0
    }
  }

  habit = { } as IHabit;
  physical = { } as IHabit;

  systolic = "";
  diastolic = "";
  loading = false;
  
  data: any  = {
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
      patientId: "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757"
    }
  }

  vitalData: IVital = {
    weight: {
        unit: 'Kg',
        value: 70
    },
    height: {
        unit: 'cm',
        value: 170
    },
    temperature: {
        unit: 'fahrenheit',
        value: 50
    },
    comments: '',
    habits: [ ] as IHabit[],
    physicals: [ ] as IHabit[],
    bloodPressure: [ ] as IBloodPressure[],

    date: new Date().toISOString(),
    type: "Type",
    status: "active",
    encounterId: "c5903ec6-20ac-47ee-b652-a562e5df7379",
    patientId: this.$route?.params?.id,
    // patientId: "a2ba4fa9-7829-4eb8-b8ef-e6d9226d6757",
    practitionerId: this.practitionerId,
    pulse: 78,

  } as IVital;

  temperatureUnits = [ 
      { display: '°F', code: 'fahrenheit' },
      { display: '°C', code: 'celcius' },
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
            value: 0
        }
    }
}

addHabit() {
    if (!this.habit.value || !this.habit.key) return false;
    this.vitalData.habits.push(this.habit);
    this.habit = { } as IHabit;
}

addPhysical() {    
    if (!this.physical.value || !this.physical.key) return false;
    this.vitalData.physicals.push(this.physical);
    this.physical = { } as IHabit;
}

  addBloodPressure() {
    if (!this.diastolic || !this.bloodPressure.measurement?.value) return false;
    this.collectedPressures.push({
        position: this.bloodPressure.position,
        pressure: `${this.bloodPressure?.measurement?.value}/${this.diastolic}mmHg`,
        date: new Date().toLocaleDateString(),
        time: new Date().toTimeString().substring(0, 5),
    })

    this.bloodPressure.type = "systolic";
    this.vitalData.bloodPressure.push(this.bloodPressure)
    this.vitalData.bloodPressure.push({
        position: this.bloodPressure.position,
        type: "diastolic",
        measurement: {
            unit: "mmHg",
            value: +this.diastolic
        }
    })
      
    console.log(this.vitalData, "DATA");
    

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
        this.getVitals(this.patientId)
        this.loading = false;
        this.$emit('closesidemodal')
    } catch (error) {
        this.loading = false;
        console.log(error);
        
    }
  }

  @Watch('selectedVital')
  updateVitalData() {
      if (this.selectedVital?.id) {
          this.vitalData = this.selectedVital;
          this.collectedPressures = [];

          for (let i = 1; i <= this.selectedVital.bloodPressure?.length; i = i + 2) {
              this.collectedPressures.push({
                position: this.selectedVital?.bloodPressure[i-1].position,
                pressure: `${this.selectedVital?.bloodPressure[i - 1]?.measurement?.value}/${this.selectedVital?.bloodPressure[i]?.measurement?.value}mmHg`,
                date: new Date().toLocaleDateString(),
                time: new Date().toTimeString().substring(0, 5),
            })
          }
      }
  }

}
</script>
