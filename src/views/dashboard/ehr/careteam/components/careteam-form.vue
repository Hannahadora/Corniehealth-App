<template>
  <div class="container-fluid flex flex-col justify-center px-4">
    <div class="w-full">
      <cornie-select
        :label="'Status'"
        v-model="newTeam.status"
        :items="['active', 'inactive']"
        style="width: 100%"
      />
    </div>
    <div class="w-full">
      <cornie-select
        :label="'Category'"
        v-model="newTeam.category"
        :items="dropdowns.category"
        style="width: 100%"
      />
    </div>
    <div class="w-full mx-auto">
      <cornie-input
        :label="'Name'"
        v-model="newTeam.name"
        style="width: 100%"
      />
    </div>

    <div class="w-full">
      <div class="container-fluid py-5">
        <p class="font-bold">
          <label for="" class="flex uppercase mb-1 text-xs font-bold"
            >Subject <span class="ml-2"><info-icon /></span
          ></label>
        </p>

        <div class="w-full flex mt-3">
          <div class="mr-6">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-5 w-5"
                :value="'patient'"
                v-model="newTeam.subject"
                name="break"
              />
              <span class="ml-2">Patient</span>
            </label>
          </div>
          <div class="mr-6">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-5 w-5"
                :value="'group'"
                v-model="newTeam.subject"
                name="break"
              />
              <span class="ml-2">Group</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="w-12/12 py-4">
        <div class="w-12/12 target">
          <date-time-picker :label="'Start date & Time'" :width="'w-full'">
            <template #date>
              <span class="pl-1">{{
                new Date(newTeam.startDate ?? Date.now()).toLocaleDateString()
              }}</span>
            </template>
            <template #time>
              <span>{{ newTeam.endTime }}</span>
            </template>
            <template #input>
              <v-date-picker
                name="eeee"
                v-model="newTeam.period.start"
                style="z-index: 9000; width: 100%"
              ></v-date-picker>
              <label class="block uppercase my-1 text-xs font-bold">
                Time
              </label>
              <input
                v-model="newTeam.endTime"
                type="time"
                class="w-full border rounded-md p-2"
              />
            </template>
          </date-time-picker>
        </div>
      </div>
      <div class="w-12/12 pt-3 pb-4">
        <div class="w-12/12 target">
          <date-time-picker :label="'End date & Time'" :width="'w-full'">
            <template #date>
              <span>{{
                new Date(newTeam.endDate ?? Date.now()).toLocaleDateString()
              }}</span>
            </template>
            <template #time>
              <span>{{ newTeam.endTime }}</span>
            </template>
            <template #input>
              <v-date-picker
                name="eeee"
                v-model="newTeam.period.end"
                style="z-index: 9000; width: 100%"
              ></v-date-picker>
              <label class="block uppercase my-1 text-xs font-bold">
                Time
              </label>
              <input
                v-model="newTeam.endTime"
                type="time"
                class="w-full border rounded-md p-2"
              />
            </template>
          </date-time-picker>
        </div>
      </div>

      <div class="w-full my-3">
        <ParticipantsDetails>
          <template #details>
            <div class="w-full py-2">
              <cornie-select
                :label="'Role'"
                :items="dropdowns.role"
                style="width: 100% !important"
                v-model="participant.role"
              />
            </div>

            <div class="w-full flex items-center">
              <div class="w-4/12">
                <cornie-select
                  :label="'Member'"
                  :items="['Practitioner', 'Patient']"
                  v-model="memberType"
                />
              </div>
              <div class="w-8/12">
                <search-dropdown
                  :results="participants"
                  @selected="memberSelected"
                  v-model="participantId"
                />
              </div>
            </div>

            <div class="w-full">
              <cornie-input
                :label="'On Behlaf Of'"
                style="width: 100%"
                v-model="participant.onBehalfOf"
              />
            </div>

            <div class="w-full py-3">
              <cornie-select
                :label="'Reason Code'"
                v-model="participant.reasonCode"
                :items="dropdowns.reasonCode"
                style="width: 100% !important"
              />
            </div>
          </template>
        </ParticipantsDetails>
      </div>

      <div class="w-full my-5">
        <telecom>
          <template #details>
            <div class="w-full py-2">
              <p class="font-bold">
                <label for="" class="flex uppercase mb-1 text-xs font-bold"
                  >System <span class="ml-2"></span
                ></label>
              </p>
              <div class="w-full flex justify-around">
                <span
                  class="flex flex-col items-center"
                  @click="selectCommunication('phone')"
                >
                  <span
                    class="icon-box"
                    :class="{
                      'selected-bg': communication?.system === 'phone',
                    }"
                    ><Phone
                  /></span>
                  <span>Phone</span>
                </span>
                <span
                  class="flex flex-col items-center"
                  @click="selectCommunication('fax')"
                >
                  <span
                    class="icon-box"
                    :class="{ 'selected-bg': communication?.system === 'fax' }"
                    ><Fax
                  /></span>
                  <span>Fax</span>
                </span>
                <span
                  class="flex flex-col items-center"
                  @click="selectCommunication('email')"
                >
                  <span
                    class="icon-box"
                    :class="{
                      'selected-bg': communication?.system === 'email',
                    }"
                    ><Envelop
                  /></span>
                  <span>Email</span>
                </span>
                <span
                  class="flex flex-col items-center"
                  @click="selectCommunication('pager')"
                >
                  <span
                    class="icon-box"
                    :class="{
                      'selected-bg': communication?.system === 'pager',
                    }"
                    ><Pager
                  /></span>
                  <span>Pager</span>
                </span>
                <span
                  class="flex flex-col items-center"
                  @click="selectCommunication('uri')"
                >
                  <span
                    class="icon-box"
                    :class="{ 'selected-bg': communication?.system === 'uri' }"
                    ><uri
                  /></span>
                  <span>Uri</span>
                </span>
                <span
                  class="flex flex-col items-center"
                  @click="selectCommunication('sms')"
                >
                  <span
                    class="icon-box"
                    :class="{ 'selected-bg': communication?.system === 'sms' }"
                    ><Sms
                  /></span>
                  <span>Sms</span>
                </span>
                <span class="flex flex-col items-center">
                  <span class="icon-box"><three-dot /></span>
                  <span>More</span>
                </span>
              </div>
            </div>

            <div class="w-full py-3">
              <cornie-input
                :label="'Value'"
                v-model="communication.value"
                style="width: 100%"
              />
            </div>

            <div class="w-full">
              <cornie-input
                :label="'On Behlaf Of'"
                v-model="communication.onBehalfOf"
                style="width: 100%"
              />
            </div>

            <div class="w-full py-3">
              <cornie-select
                :label="'Reason Code'"
                :items="dropdowns.reasonCode"
                style="width: 100% !important"
              />
            </div>

            <div class="w-full">
              <div class="container-fluid pb-5">
                <p class="font-bold">
                  <label for="" class="flex uppercase mb-1 text-xs font-bold"
                    >Use <span class="ml-2"><info-icon /></span
                  ></label>
                </p>

                <div class="w-full flex mt-3">
                  <div class="mr-6">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio h-5 w-5"
                        :value="'home'"
                        v-model="communication.use"
                        name="break"
                      />
                      <span class="ml-2">Home</span>
                    </label>
                  </div>
                  <div class="mr-6">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio h-5 w-5"
                        :value="'work'"
                        v-model="communication.use"
                        name="break"
                      />
                      <span class="ml-2">Work</span>
                    </label>
                  </div>
                  <div class="mr-6">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio h-5 w-5"
                        :value="'temp'"
                        v-model="communication.use"
                        name="break"
                      />
                      <span class="ml-2">Temp</span>
                    </label>
                  </div>
                  <div class="mr-6">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio h-5 w-5"
                        :value="'old'"
                        v-model="communication.use"
                        name="break"
                      />
                      <span class="ml-2">Old</span>
                    </label>
                  </div>
                  <div class="mr-6">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        class="form-radio h-5 w-5"
                        :class="{
                          'selected-bg': communication?.system === 'phone',
                        }"
                        :value="'mobile'"
                        v-model="communication.use"
                        name="break"
                      />
                      <span class="ml-2">Mobile</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="w-12/12 pt-3 pb-4">
              <div class="w-12/12 target">
                <date-time-picker
                  :label="'Start date & Time'"
                  :width="'w-full'"
                >
                  <template #date>
                    <span>{{
                      new Date(
                        communication.startDate ?? Date.now()
                      ).toLocaleDateString()
                    }}</span>
                  </template>
                  <template #time>
                    <span>{{ communication.startTime }}</span>
                  </template>
                  <template #input>
                    <v-date-picker
                      name="eeee"
                      v-model="communication.startDate"
                      style="z-index: 9000; width: 100%"
                    ></v-date-picker>
                    <label class="block uppercase my-1 text-xs font-bold">
                      Time
                    </label>
                    <input
                      v-model="communication.startTime"
                      type="time"
                      class="w-full border rounded-md p-2"
                    />
                  </template>
                </date-time-picker>
              </div>
            </div>

            <div class="w-12/12 pt-3 pb-4">
              <div class="w-12/12 target">
                <date-time-picker :label="'End date & Time'" :width="'w-full'">
                  <template #date>
                    <span>{{
                      new Date(
                        communication.endDate ?? Date.now()
                      ).toLocaleDateString()
                    }}</span>
                  </template>
                  <template #time>
                    <span>{{ communication.endTime }}</span>
                  </template>
                  <template #input>
                    <v-date-picker
                      name="eeee"
                      v-model="communication.endDate"
                      style="z-index: 9000; width: 100%"
                    ></v-date-picker>
                    <label class="block uppercase my-1 text-xs font-bold">
                      Time
                    </label>
                    <input
                      v-model="communication.endTime"
                      type="time"
                      class="w-full border rounded-md p-2"
                    />
                  </template>
                </date-time-picker>
              </div>
            </div>

            <div class="w-full">
              <p class="font-bold">
                <label for="" class="flex uppercase mb-1 text-xs font-bold"
                  >Note <span class="ml-2"></span
                ></label>
              </p>
              <textarea
                name=""
                id=""
                rows="5"
                class="w-full text-area"
                v-model="communication.note"
              ></textarea>
            </div>
          </template>
        </telecom>
      </div>

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
          :loading="loading"
          class="bg-red-500 p-2 rounded-full px-8 mx-4"
        >
          <span class="text-white font-semibold" @click="createTeam">{{
            careTeam?.id ? "Update" : "Save"
          }}</span>
        </CornieBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieSelect from "@/components/cornieselect.vue";
import CornieInput from "@/components/cornieinput.vue";
import InfoIcon from "@/components/icons/info.vue";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import ParticipantsDetails from "./participants.vue";
import SearchDropdown from "./search-dropdown.vue";
import Phone from "./icons/phone.vue";
import Fax from "./icons/fax.vue";
import Uri from "./icons/uri.vue";
import Pager from "./icons/pager.vue";
import Envelop from "./icons/envelop.vue";
import Sms from "./icons/sms.vue";
import Telecom from "./telecom.vue";
import ThreeDot from "@/components/icons/threedot.vue";
import { namespace } from "vuex-class";
import IPractitioner from "@/types/IPractitioner";
import { IPatient } from "@/types/IPatient";
import teamHelper from "../helper/careteam-helper";
import CornieBtn from "@/components/CornieBtn.vue";
import { IItem } from "@/views/dashboard/schedules/components/selected-location.vue";
import { Prop, Watch } from "vue-property-decorator";
import ICareteam from "@/types/ICareteam";
import careteamHelper from "../helper/careteam-helper";

const patientStore = namespace("patients");
const practitionersStore = namespace("practitioner");
const dropdown = namespace("dropdown");

@Options({
  name: "NeaTeamForm",
  components: {
    CornieSelect,
    CornieInput,
    InfoIcon,
    DateTimePicker,
    ParticipantsDetails,
    SearchDropdown,
    Phone,
    Pager,
    Fax,
    Envelop,
    Sms,
    Uri,
    ThreeDot,
    Telecom,
    CornieBtn,
  },
})
export default class NewTeam extends Vue {
  @practitionersStore.State
  practitioners!: IPractitioner[];

  @practitionersStore.Action
  fetchPractitioners!: () => Promise<void>;

  @patientStore.State
  patients!: IPatient[];

  @patientStore.Action
  fetchPatients!: () => Promise<void>;

  dropdowns = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Prop()
  careTeam!: ICareteam;

  newTeam: any = {
    period: {
      start: new Date(Date.now()),
      end: new Date(Date.now()),
    },
  };

  participant: any = {};
  communication: any = {
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    system: "phone",
  };
  memberType = "practitioner";
  loading = false;
  participantId = "";

  get participants() {
    if (this.memberType?.toLowerCase() === "practitioner")
      return this.practitioners.map((practitioner) => {
        return {
          code: practitioner.id,
          display: `${practitioner.firstName} ${practitioner.lastName}`,
        };
      });
    if (this.memberType?.toLowerCase() === "patient")
      return this.patients.map((patient) => {
        return {
          code: patient.id,
          display: `${patient.firstname} ${patient.lastname}`,
        };
      });
  }

  memberSelected(data: IItem) {
    ;
    if (!data) return;
    if (this.memberType?.toLowerCase() === "practitioner") {
      this.participant.name = data.display;
      this.participant.practitionerId = data.code;
    }
    if (this.memberType?.toLowerCase() === "patient") {
      this.participant.name = data.display;
      this.participant.patientId = data.code;
    }
  }

  selectCommunication(type: string) {
    this.communication.system = type;
  }

  async createTeam() {
    ;
    ;
    ;

    try {
      this.loading = true;
      if (!this.careTeam?.id) {
        alert("he");
        const data = await teamHelper.createCareTeam({
          ...this.newTeam,
          period: {
            start: new Date(this.newTeam?.period?.start).toISOString(),
            end: new Date(this.newTeam?.period?.end).toISOString(),
          },
          // communication: [
          //     {
          //         ...this.communication,
          //         startDate: new Date(this.communication?.startDate).toISOString(),
          //         endDate: new Date(this.communication?.endDate).toISOString()
          //     }
          //  ],
          participants: [this.participant],
        });

        if (data?.id)
          window.notify({ msg: "Careteam created", status: "success" });
      } else {
        const editPayload = careteamHelper.constructEditCareTeamPayload(
          this.newTeam
        );
        alert("hello");
        const data = await teamHelper.editCareTeam(
          {
            ...editPayload,
            period: {
              start: new Date(this.newTeam?.period?.start).toISOString(),
              end: new Date(this.newTeam?.period?.end).toISOString(),
            },
            // communication: [
            //     {
            //         ...this.communication,
            //         startDate: new Date(this.communication?.startDate).toISOString(),
            //         endDate: new Date(this.communication?.endDate).toISOString()
            //     }
            //  ],
            // participants: [ this.participant ],
            participantId: this.participantId,
          },
          this.careTeam.id
        );

        if (data?.id)
          window.notify({ msg: "Careteam updated", status: "success" });
      }
      this.$emit("refreshteams");
      this.$emit("closesidemodal");
      this.loading = false;
    } catch (error) {
      this.loading = false;
      ;
    }
  }

  @Watch("careTeam")
  onChange() {
    this.newTeam = {};
    this.communication = {};
    this.participant = {};
    if (this.careTeam?.id) {
      this.newTeam = this.careTeam;
      this.participant = this.careTeam.participants[0] ?? {};
      this.communication = this.careTeam.communication ?? {};
    }
  }

  async created() {
    if (!this.practitioners || this.patients?.length === 0)
      await this.fetchPractitioners();
    if (!this.patients || this.patients?.length === 0)
      await this.fetchPatients();
    const data = await this.getDropdowns("careTeam");
    this.dropdowns = data;
    ;
    ;
  }
}
</script>

<style scoped>
.icon-box {
  height: 40px;
  width: 40px;
  border: 1px solid;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected-bg {
  background: #fe4d3c;
}

.text-area {
  /* Whites/Plain */

  background: #ffffff;
  /* Greys/Etherium */

  border: 1px solid #c2c7d6;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
