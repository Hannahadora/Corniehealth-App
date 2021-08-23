<template>
  <div>
    <span
      class="
        flex
        border-b-2
        w-full
        font-semibold
        text-xl text-primary
        py-2
        mx-auto
      "
    >
      Create a Care Team
    </span>
    <div class="w-full h-screen">
      <form class="mt-5 w-full" @submit.prevent="submit">
        <div class="w-full grid grid-cols-2 gap-5">
          <cornie-input
            label="Organization Name"
            v-model="identifier"
            placeholder="--Automatically Generated--"
            class="bg-gray-200"
            disabled
          />
          <cornie-select
            :rules="required"
            :items="['Active', 'Inactive']"
            v-model="status"
            label="Status"
            aria-selected="--Select--"
          >
          </cornie-select>
          <cornie-select
            :rules="required"
            :items="dropdowns.category"
            v-model="category"
            label="Category"
            aria-selected="--Select--"
          >
          </cornie-select>
          <cornie-input
            label="Name"
            v-model="name"
            placeholder="--Enter--"
            :rules="required"
          />
          <div>
            <cornie-input
              label="Subject"
              v-model="subject"
              placeholder="--Enter--"
              :rules="required"
            />
          </div>
          <date-picker
            label="Period"
            v-model="participant.period.start"
            v-model:end="participant.period.end"
            placeholder="--Enter--"
            :rules="required"
          />
          <!--  <cornie-input label="Period" v-model="period.start" v-model:end="period.end"  placeholder="--Enter--" :rules="required"/>-->
          <span
            class="
              flex
              border-b-2
              w-full
              text-sm text-dark
              py-2
              mx-auto
              font-semibold
              col-span-full
              mb-2
              mt-4
            "
          >
            Participant
          </span>
          <div class="col-span-full mb-5">
            <div>
              <div class="grid grid-cols-7 gap-2 col-span-full mb-4" v-for="(input, index) in participants" :key="`-${index}`">
                <p class="text-xs text-dark font-semibold">{{ input.name }}</p>
                <p class="text-xs text-dark font-semibold">{{ input.role }}</p>
                <p class="text-xs text-dark font-semibold">
                  {{ input.managingOrganization }}
                </p>
                <p class="text-xs text-dark font-semibold">
                  {{ input.phone.dialCode + input.phone.number }}
                </p>
                <p class="text-xs text-dark font-semibold">{{ input.email }}</p>
                <d-edit
                  class="ml-20 cursor-pointer"
                  @click="
                    editParticipant(input.careTeamId, index, participants)
                  "
                />
                <c-delete
                  @click="removeParticipant(index, participants)"
                  class="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <cornie-input
            label="Name"
            v-model="participant.name"
            placeholder="--Enter--"
            :rules="required"
          />
          <cornie-select
            :rules="required"
            :items="dropdowns.role"
            label="Role"
            v-model="participant.role"
            aria-selected="--Select--"
          >
          </cornie-select>
          <cornie-input
            label="On behalf of"
            v-model="participant.onBehalfOf"
            placeholder="--Enter--"
            :rules="required"
          />
          <date-picker
            label="Period"
            v-model="participant.period.start"
            v-model:end="participant.period.end"
            placeholder="--Enter--"
            :rules="required"
          />

          <!--   <cornie-input label="Period" v-model="participant.period.start" v-model:end = "participant.period.end"   placeholder="--Enter--" :rules="required"/>-->
          <cornie-select
            :rules="required"
            :items="dropdowns.reasonCode"
            label="Reason Code"
            v-model="participant.reasonCode"
            aria-selected="--Select--"
          >
          </cornie-select>
          <cornie-input
            label="Reason Reference"
            v-model="participant.reasonReference"
            placeholder="--Enter--"
            :rules="required"
          />
          <cornie-input
            label="Managing Organization"
            v-model="participant.managingOrganization"
            placeholder="--Enter--"
            :rules="required"
          />
          <phone-input
            :rules="requiredRule"
            label="Phone"
            v-model="participant.phone.number"
            v-model:code="participant.phone.dialCode"
          />

          <!-- <cornie-input label="Phone"  v-model="participants.phone" placeholder="--Enter--" :rules="required"/>-->
          <cornie-input
            label="Email"
            v-model="participant.email"
            placeholder="--Enter--"
            :rules="required"
          />
          <Textarea
            label="Notes"
            v-model="participant.notes"
            placeholder="--Enter--"
            :rules="required"
          />
          <span></span>
          <span
            ><c-add
              class="float-right cursor-pointer mb-2 mt-8 mr-5"
              @click="checkParticipant"
          /></span>
        </div>
        <span class="flex justify-end w-full border-t-2 h-full">
          <button
            @click="$router.push('care-teams')"
            type="button"
            class="
              outline-primary
              rounded-full
              text-black
              mt-5
              mr-3
              py-2
              pr-8
              pl-8
              px-3
              focus:outline-none
              hover:bg-primary
              hover:text-white
            "
          >
            Revert Changes
          </button>

          <cornie-btn
            :loading="loading"
            type="submit"
            class="
              bg-danger
              rounded-full
              text-white
              mt-5
              pr-10
              pl-10
              focus:outline-none
              hover:opacity-90
            "
          >
            Save
          </cornie-btn>
        </span>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from "@/components/CornieInput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import PhoneInput from "@/components/phone-input.vue";
import ICareteam, { Participants } from "@/types/ICareteam";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";
import ColumnFilter from "@/components/columnfilter.vue";
import DEdit from "@/components/icons/dedit.vue";
import CDelete from "@/components/icons/cdelete.vue";
import CAdd from "@/components/icons/cadd.vue";
import AddIcon from "@/components/icons/add.vue";
import DatePicker from "@/components/daterangepicker.vue";

const careteam = namespace("careteam");
const dropdown = namespace("dropdown");

const emptyParticipant: Participants = {
  name: "",
  role: "",
  onBehalfOf: "",
  period: { start: "2011/12/15", end: "2017/12/19" },
  reasonCode: "",
  reasonReference: "",
  managingOrganization: "",
  phone: { number: "", dialCode: "" },
  email: "",
  notes: "",
};

@Options({
  components: {
    CornieInput,
    CornieSelect,
    OrgSelect,
    ColumnFilter,
    Textarea,
    DEdit,
    CDelete,
    CAdd,
    AddIcon,
    PhoneInput,
    DatePicker,
  },
})
export default class AddCareteam extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  @careteam.Action
  getCareteamById!: (id: string) => ICareteam;

  loading = false;

  identifier = "";
  status = "";
  category = "";
  name = "";
  subject = "";
  participant = { ...emptyParticipant };
  participants: Participants[] = [];
  period = { start: "2011/09/12", end: "2011/12/19" };
  required = string().required();

  dropdowns = {} as IIndexableObject;
  @dropdown.Action
  getDropdowns!: (a: string) => Promise<IIndexableObject>;

  @Watch("id")
  idChanged() {
    this.setCareteam();
  }
  async setCareteam() {
    const careteam = await this.getCareteamById(this.id);
    if (!careteam) return;
    this.identifier = careteam.identifier;
    this.status = careteam.status;
    this.category = careteam.category;
    this.name = careteam.name;
    this.subject = careteam.subject;
    this.period = careteam.period;
    this.participants = careteam.participants;
  }
  get payload() {
    return {
      identifier: this.identifier,
      status: this.status,
      category: this.category,
      name: this.name,
      subject: this.subject,
      period: this.period,
      participants: this.participants,
    };
  }

  async checkParticipant() {
    this.loading = true;
    if (this.id) await this.updateParticipant();
    else await this.addParticipant();
    this.loading = false;
  }
  async editParticipant(id: string, index: number, fieldType: object) {
    this.participant = this.participants[index];
  }
  async updateParticipant() {
    const url = `/api/v1/participants/${this.id}`;
    const payload = { ...this.participant };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Participant updated", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Participant not updated", status: "error" });
    }
  }
  async addParticipant() {
    if (!this.id) {
      this.participants.push({ ...this.participant });
      this.reset();
      window.notify({ msg: "Participant added", status: "success" });
      return;
    }
    //  this.participant.careTeamId = this.id;
    try {
      const response = await cornieClient().post(
        "/api/v1/participants",
        this.participant
      );
      if (response.success) {
        this.participants.push(response.data);
        window.notify({ msg: "Participant added", status: "success" });
        this.reset();
      }
    } catch (error) {
      window.notify({ msg: "Participant  not added", status: "error" });
    }
  }

  async reset() {
    this.participant = { ...emptyParticipant };
  }
  async removeParticipant(id: string, index: number, fieldType: object) {
    this.participants.splice(index, 1);
    window.notify({ msg: "Participant deleted", status: "success" });
    //  try {
    // const response = await cornieClient().delete(`/api/v1/participants/${id}`);
    // if (response.success) {
    //     this.participants.splice(index, 1);
    //     window.notify({ msg: "Participant deleted", status: "success" });
    // }
    // } catch (error) {
    //   window.notify({ msg: "Participant not deleted", status: "error" });
    // }
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.updateCareteam();
    else await this.createCareteam();
    this.loading = false;
  }

  async createCareteam() {
    this.payload.period.start = new Date(
      this.payload.period.start
    ).toISOString();
    this.payload.period.end = new Date(this.payload.period.end).toISOString();
    this.participant.period.start = new Date(
      this.participant.period.start
    ).toISOString();
    this.participant.period.end = new Date(
      this.participant.period.end
    ).toISOString();
    try {
      const response = await cornieClient().post(
        "/api/v1/care-teams",
        this.payload
      );
      if (response.success) {
        window.notify({ msg: "Care team added", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Care team  not added", status: "error" });
    }
  }

  async updateCareteam() {
    const url = `/api/v1/care-teams/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        window.notify({ msg: "Care team updated", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Care team not updated", status: "error" });
    }
  }
  async fetchOrgInfo() {
    try {
      const response = await cornieClient().get(
        "/api/v1/organization/myOrg/get"
      );
      this.identifier = response.data.identifier;
      this.participant.managingOrganization = response.data.name;
    } catch (error) {
      alert("Could not fetch organization");
    }
  }

  async created() {
    this.setCareteam();
    this.fetchOrgInfo();
    const data = await this.getDropdowns("careTeam");
    this.dropdowns = data;
  }
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
