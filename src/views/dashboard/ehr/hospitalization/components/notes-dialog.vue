<template>
  <div class="container-fluid p-3">
    <div class="w-full">
      <!-- <div class="w-full mb-2 flex items-center">
                <p class="header">Add Notes</p>
            </div> -->
      <div class="w-full">
        <text-area v-model="note.text" style="width: 100%; height: 200px" />
      </div>
    </div>

    <div class="w-full mt-4">
      <div class="flex justify-end">
        <CornieBtn
          :loading="loading"
          @click="saveNote"
          class="bg-red-500 p-2 rounded-full px-8 ml-4"
        >
          <span class="text-white font-semibold">Add</span>
        </CornieBtn>
      </div>
    </div>

    <div class="w-full notes mt-5">
      <div class="w-full flex my-4" v-for="(item, index) in notes" :key="index">
        <div class="" style="width: 5%">
          <doc-icon />
        </div>
        <div class="">
          <p class="flex items-center">
            <span class="text-sm">
              {{
                `${new Date(item.createdAt)?.toString().split(" ")[2]}-${
                  new Date(item.createdAt)?.toString().split(" ")[1]
                }-${new Date(item.createdAt).toString().split(" ")[3]}`
              }}
            </span>
            <span class="flex items-center mx-1 text-lg"><dot-icon /></span>
            <span class="text-sm font-semibold"
              >{{ item.user?.firstName }} {{ item.user?.lastName }}</span
            >
          </p>
          <p class="text-sm">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieBtn from "@/components/CornieBtn.vue";
import AutoComplete from "@/components/autocomplete.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import { Item } from "@/types/IUpdateModel";
import DateTimePicker from "@/views/dashboard/schedules/components/datetime-picker.vue";
import CollapseSection from "@/views/dashboard/ehr/procedures/components/collapse-section.vue";
import helper from "../helper/helper";
import TextArea from "@/components/textarea.vue";
import DocIcon from "@/components/icons/doc.vue";
import DotIcon from "./dot-icon.vue";
import { Prop } from "vue-property-decorator";
import { IAdminNote, IHospitalisation } from "@/types/IHospitalisation";
import { namespace } from "vuex-class";

const hospitalisation = namespace("hospitalisation");

@Options({
  components: {
    CornieBtn,
    AutoComplete,
    CornieInput,
    CornieSelect,
    DateTimePicker,
    CollapseSection,
    TextArea,
    DocIcon,
    DotIcon,
  },
})
export default class NewNote extends Vue {
  @Prop({ type: Array, default: [] })
  items!: IHospitalisation[];

  @Prop({ type: String, default: "" })
  hospitalisationId!: string;

  @hospitalisation.Action
  createAdminNote!: (body: IAdminNote) => Promise<boolean>;

  note = {} as IAdminNote;
  loading = false;

  get hospitalisation() {
    if (!this.hospitalisationId || this.items?.length === 0)
      return {} as IHospitalisation;
    const result = this.items?.find(
      (hospitalisation) => hospitalisation.id === this.hospitalisationId
    ) as IHospitalisation;
    return result;
  }

  get notes() {
    return this.hospitalisation?.notes;
  }

  get codes() {
    return helper.carePlanCodes;
  }

  get reeasonReferences() {
    return helper.carePlanReasonReferences;
  }

  get detailStatus() {
    return helper.carePlanDetailStatus;
  }

  async saveNote() {
    try {
      this.note.hospitalizationId = this.hospitalisationId;
      this.loading = true;
      const response = await this.createAdminNote(this.note);
      this.loading = false;

      this.note = {} as IAdminNote;
      if (response) {
        notify({
          msg: "Note added successfully",
          status: "success",
        });
      } else {
        notify({
          msg: "Adding noted failed",
          status: "error",
        });
      }
    } catch (error) {
      ;
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.header {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  color: #080056;
}

.notes {
  font-family: Inter;
  font-style: normal;
  font-size: 12px;
  line-height: 19px;
  /* identical to box height, or 160% */

  letter-spacing: 0.02em;

  /* Greys/Blue Yonder */

  color: #667499;
}
</style>
