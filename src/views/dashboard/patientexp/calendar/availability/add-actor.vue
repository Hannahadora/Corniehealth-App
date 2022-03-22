<template>
  <cornie-dialog v-model="show" right  class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
         <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full flex items-center justify-between">
         
          <h2 class="font-bold text-xl text-primary float-right ml-3 -mt-0.5">
            Actors
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

       <cornie-card-text class="flex-grow scrollable">
        <span class="text-sm my-3 mb-5">
          All actors available from {{ range +' - '+ range2}} for appointment bookings.
        </span>
        <div class="w-full mt-5">
          <div class="w-full pb-2" style="border-bottom: 1px dashed #c2c7d6">
              <search-section placeholder="Search Actor" class="rounded-full w-full"/>
          </div>
          <div class="container flex flex-col mt-4">

            <available-actors v-for="(input, index) in actors" :key="index" :date="date" :singletime="singletime" :actor="input" :range="range" :range2="range2" :id="input.id"/>

          </div>
        </div>
       </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="bg-danger py-1 px-10 rounded text-white"
          >
            Close
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>

    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { Prop,PropSync } from "vue-property-decorator";
import DeleteIcon from "@/components/icons/delete.vue";
import { namespace } from "vuex-class";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import Avatar from "@/components/avatar.vue";
import SearchSection from "@/components/autocomplete.vue"
import CalendarIcon from "@/components/icons/bcalendar.vue"
import EditIcon from "@/components/icons/edit.vue";
import CopyIcon from "@/components/icons/copy.vue";
import ShareIcon from "@/components/icons/share.vue"
import CornieMenu from "@/components/CornieMenu.vue";
import DotsHorizontalIcon from "@/components/icons/DotsHorizontalIcon.vue";
import DotsVerticalIcon from "@/components/icons/DotsVerticalIcon.vue";
import AvailableActors from "./avaliable-actor.vue";
import AvaliableActor from "./avaliable-actor.vue";

const schedules = namespace("schedules");

@Options({
  components: {
     ...CornieCard,
    IconInput,
    SearchIcon,
    DeleteIcon,
    Avatar,
    SearchSection,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    AvailableActors,
    CancelIcon,
    CalendarIcon,
    EditIcon,
    CopyIcon,
    ShareIcon,
    CornieMenu,
    DotsHorizontalIcon,
    DotsVerticalIcon

  },
})
export default class AddActors extends Vue {
  search = "";
  data: any;

   @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @schedules.Action
  removePractitioner!: (reqData: any) => Promise<boolean>;

  @schedules.Action
  addPractitioner!: (reqData: any) => Promise<boolean>;

  @Prop()
  schedule!: any;

  @Prop({ type: Array, default: [] })
  actors!: any;

  @Prop({ type: String, default: "" })
  range!: string;

  @Prop({ type: String, default: "" })
  range2!: string;

  @Prop({ type: String, default: 0 })
  singletime!: number;

  @Prop({ type: String, default: "" })
  date!: string;

  actorSelected(actor: any) {
    this.$emit("actoradded", { id: actor.code, firstName: actor.display });
  }

  get persons() {
    if (
      !this.schedule ||
      !this.schedule.practitioners ||
      this.schedule.practitioners.length === 0
    )
      return [];
    return this.schedule.practitioners;
  }

   showAvailable(practitioner:any,value:string){
    console.log(practitioner,value,"HELLO First")
    this.$emit('one-id',practitioner,value);
    this.show = false;

  }
  async done(){
    this.show = false;
  }

  async addActor(actor: any) {
    try {
      const removed = await this.addPractitioner({
        id: this.schedule.id,
        body: [actor.code],
      });
      if (removed) {
        window.notify({ msg: "Actor added successfully", status: "success" });
        this.$emit("actoradded", {
          id: actor.code,
          firstName: actor.display,
          scheduleId: this.schedule.id,
          image: actor.image,
        });
      } else {
        window.notify({ msg: "Actor could not be added", status: "error" });
      }
    } catch (error) {}
  }

  async removeActor(actor: any) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to remove this actor?",
    });
    if (!confirmed) return;
    try {
      const removed = await this.removePractitioner({
        id: this.schedule.id,
        body: [actor.id],
      });
      if (removed) {
        window.notify({ msg: "Actor removed successfully", status: "success" });
      } else {
        window.notify({ msg: "Actor could not be removed", status: "error" });
      }
    } catch (error) {}
  }
}
</script>
