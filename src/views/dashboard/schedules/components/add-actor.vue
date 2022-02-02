<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
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
          All actors available from {{ range }} for appointment bookings.
        </span>
        <div class="w-full mt-5">
          <div class="w-full pb-2" style="border-bottom: 1px dashed #c2c7d6">
              <search-section placeholder="Search Actor" class="rounded-full w-full"/>
          </div>
          <div class="container flex flex-col mt-4">
            <div
              class="w-full flex items-center my-2"
              v-for="(input, index) in actors"
              :key="index"
            >
            
                  <div class="w-full grid grid-cols-2 gap-4">
                    <div class="w-full flex space-x-4">
                      <div class="w-10 h-10">
                        <avatar
                          class="mr-2"
                          v-if="input.user?.image"
                          :src="input.user?.image"
                        />
                        <avatar class="mr-2" v-else :src="localSrc" />
                      </div>
                      <div>
                        <p class="text-xs text-dark font-semibold">
                          {{ input.user?.firstName }}
                          {{ input.user?.lastName }}
                        </p>
                        <p class="text-xs text-gray-500 font-meduim">
                          {{ input?.jobDesignation }}
                          {{ input?.department }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        class="cursor-pointer w-full text-yellow-400 text-xs font-semibold float-right flex justify-end"
                        @click="showAvailable(input,input.id)">
                        View Availability
                      </span>
                    
                    </div>
                  </div>
           
              <!-- <div class="w-2/12">
                <img
                  v-if="person?.user?.image"
                  :src="person?.user?.image"
                  class="rounded-full border"
                  alt="Image"
                />
                <img
                  v-else
                  src="https://via.placeholder.com/40x40"
                  class="rounded-full border"
                  alt="Image"
                />
              </div>
              <div class="w-10/12 ml-2">
                <span class="flex justify-between">
                  <span class="text-base text-gray-500"
                    >{{ person?.user?.firstName }} {{ person?.user?.lastName ?? "" }}</span
                  >
                  <span
                    class="text-danger font-semibold"
                    @click="removeActor(person)"
                    ><a class="text-warning"><DeleteIcon /></a
                  ></span>
                </span>
              </div> -->


            </div>
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
import SearchBox from "./search-box.vue";
import { namespace } from "vuex-class";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import InfoIcon from "@/components/icons/info.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import Avatar from "@/components/avatar.vue";
import SearchSection from "@/components/autocomplete.vue"

const schedules = namespace("schedules");

@Options({
  components: {
     ...CornieCard,
    IconInput,
    SearchIcon,
    DeleteIcon,
    Avatar,
    SearchSection,
    SearchBox,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CancelIcon

  },
})
export default class AllActors extends Vue {
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
