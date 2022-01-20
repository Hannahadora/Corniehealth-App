<template>
  <card class="w-full h-full flat m-2 body-content">
    <card-title class="m-5 mb-0 border-b-2">
      <h1 class="text-primary text-xl font-extrabold">New Designation</h1>
    </card-title>
    <v-form class="m-5 mt-0" @submit="submit">
      <card-text>
        <p class="text-danger mb-6">
          Which of these best describes the designation?
        </p>
        <div class="flex space-x-4 border-b-2 pb-6 mb-6 items-center">
          <cornie-radio
            label="Supervisory"
            value="Sup"
            v-model="supervisoryType"
            class="mr-2"
          />
          <cornie-radio
            class="ml-3"
            label="Non-Supervisory"
            value="NonSup"
            v-model="supervisoryType"
          />
        </div>
        <h1 class="text-primary text-xl font-extrabold mb-3">
          Designation Details
        </h1>
        <div class="grid grid-cols-3 gap-4 border-b-2 pb-3">
          <cornie-input
            label="title"
            v-model="title"
            :rules="required"
            placeholder="--Enter--"
            class="w-full"
          />
          <cornie-input
            label="cost centre"
            v-model="costCentre"
            :rules="required"
            placeholder="--Enter--"
             class="w-full"
          />
          <cornie-select
            label="function"
            placeholder="--Select--"
            :rules="required"
            v-model="assignedFunction"
            :items="allFunctions"
             class="w-full"
          />
          <cornie-select
            label="reporting to"
            placeholder="--Select--"
            v-model="reportingTo"
            :items="allDesignations"
             class="w-full"
          />
          <cornie-select
            label="job level"
             class="w-full"
            placeholder="--Select--"
            :rules="required"
            v-model="jobLevel"
            :items="allLevels"
          />
          <cornie-select
            label="dotted reporting"
             class="w-full"
            placeholder="--Select--"
            v-model="dottedReporting"
            :items="[]"
          />
        </div>
        <card class="bg-gray-100 flat">
          <card-title>
            <span>
              The feature is available for Cloudenly Subscribers only
            </span>
          </card-title>
          <card-text>
            <h1 class="text-primary text-xl font-extrabold">
              Annual Salary Band
            </h1>
          </card-text>
          <card-text>
            <div class="flex space-x-4 w-full">
              <cornie-input
                label="lower salary band"
               
                :rules="numberRequired"
                placeholder="--Enter--"
                v-model="lowerSalaryBand"
              >
                <template v-slot:prepend>
                  <span class="text-sm">(N)</span>
                </template>
              </cornie-input>
              <cornie-input
                label="upper salary band"
                :rules="numberRequired"
                placeholder="--Enter--"
                v-model="upperSalaryBand"
              >
                <template #prepend>
                  <span class="text-sm">(N)</span>
                </template>
              </cornie-input>
            </div>
          </card-text>
        </card>
        <div class="flex justify-items-end py-6 border-t-2">
          <span class="flex-grow"></span>
           <cornie-btn class="text-primary mr-3 border-2 text-sm font-semibold py-1 border-primary px-1 rounded-full">
              Cancel
            </cornie-btn>
          <cornie-btn
            class="bg-danger rounded-full text-white font-semibold text-sm py-1 px-0 focus:outline-none hover:opacity-90"
            type="submit"
            :loading="loading"
          >
            Create Designation
          </cornie-btn>
        </div>
      </card-text>
    </v-form>
  </card>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import Card from "@/components/cornie-card/CornieCard.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import IconInput from "@/components/IconInput.vue";
import { string as yupString, number as yupNumber } from "yup";
import { namespace } from "vuex-class";
import { LevelCollection } from "@/types/ILevel";
import IFunction from "@/types/IFunction";
import { CornieUser } from "@/types/user";
import { IDesignation } from "@/types/IDesignation";
import CornieBtn from "@/components/CornieBtn.vue";
import { Prop, Watch } from "vue-property-decorator";
import { quantumClient } from "@/plugins/http";

const level = namespace("OrgLevels");
const orgFunctions = namespace("OrgFunctions");
const user = namespace("user");
const designation = namespace("designation");

@Options({
  name: "New Designation",
  components: {
    Card,
    CardText,
    CornieBtn,
    CardTitle,
    CornieRadio,
    CornieInput,
    CornieSelect,
    IconInput,
  },
})
export default class NewDesignation extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  supervisoryType = "NonSup";
  costCentre = "";
  assignedFunction = "";
  reportingTo = "";
  jobLevel = "";
  dottedReporting = "";
  lowerSalaryBand = 0;
  upperSalaryBand = 0;
  title = "";

  loading = false;

  @level.State
  levels!: LevelCollection[];

  @level.Action
  fetchLevels!: () => Promise<void>;

  @orgFunctions.State
  functions!: IFunction[];

  @user.Getter
  cornieUser!: CornieUser;

  @orgFunctions.Action
  fetchFunctions!: () => Promise<void>;

  @designation.Mutation
  setDesignations!: (data: IDesignation[]) => void;

  @designation.State
  designations!: IDesignation[];

  @designation.Action
  fetchDesignations!: () => Promise<void>;

  @designation.Action
  getDesignationById!: (id: string) => Promise<IDesignation>;

  required = yupString().required();
  numberRequired = yupNumber();

  get allLevels() {
    return this.levels.map((l) => ({ code: l.id!!, display: l.name }));
  }

  get allFunctions() {
    return this.functions.map((f) => ({ code: f.id!!, display: f.name }));
  }

  get allDesignations() {
    return this.designations.map((designation) => ({
      code: designation.id,
      display: designation.name,
    }));
  }

  get payload() {
    const payload = {
      orgId: this.cornieUser.organizationId,
      name: this.title,
      createdBy: this.cornieUser.id,
      isSupervisory: this.supervisoryType == "Sup",
      functionId: this.assignedFunction,
      levelId: this.jobLevel,
      costCentre: this.costCentre,
    } as IDesignation;
    if (this.id) payload.id = this.id;
    if (this.reportingTo) payload.reportingTo = this.reportingTo;
    return payload;
  }

  async submit() {
    this.loading = true;
    if (this.id) await this.update();
    else await this.create();
    this.loading = false;
    this.$router.back();
  }

  async create() {
    try {
      const { data } = await quantumClient().post(
        "/org/designations",
        this.payload
      );
      const { designation } = data;
      this.setDesignations([designation]);
      window.notify({ msg: "Designation created", status: "success" });
    } catch (error) {
      window.notify({ msg: "Designation not created", status: "error" });
    }
  }

  async update() {
    try {
      const { data } = await quantumClient().patch(
        "/org/designations",
        this.payload
      );
      const { designation } = data;
      this.setDesignations([designation]);
      window.notify({ msg: "Designation updated", status: "success" });
    } catch (error) {
      window.notify({ msg: "Designation not updated", status: "error" });
    }
  }

  setDesignation(designation: IDesignation) {
    this.title = designation.name;
    this.supervisoryType = designation.isSupervisory ? "Sup" : "NonSup";
    this.assignedFunction = designation.functionId;
    this.jobLevel = designation.levelId;
    this.costCentre = designation.costCentre;
  }

  async mounted() {
    if (this.id) {
      const designation = await this.getDesignationById(this.id);
      if (designation?.id) this.setDesignation(designation);
    }
  }

  async created() {
    if (!this.levels?.length) this.fetchLevels();
    if (!this.functions?.length) this.fetchFunctions();
    if (!this.designations?.length) this.fetchDesignations();
  }
}
</script>

<style>
.body-content {
  height: 90vh;
  overflow-y: auto;
}
</style>
