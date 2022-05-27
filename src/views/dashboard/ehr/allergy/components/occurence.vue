<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <span class="pr-2 flex items-center cursor-pointer border-r-2">
          <cornie-icon-btn @click="show = false">
            <arrow-left-icon />
          </cornie-icon-btn>
        </span>
        <div class="w-full">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Add Occurence
          </h2>
          <cancel-icon
            class="float-right cursor-pointer"
            @click="show = false"
          />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
          <div>
            <div class="mt-5" v-for="(item,index) in occurences" :key="index">
                    <date-time-picker :disable="true" :label="'DateTime'" v-model:date="item.time" :time="separateTime(item.time)"/>
              </div>
               <div class="mt-5" v-for="(item,index) in nowoccurences" :key="index">
                    <date-time-picker :label="'DateTime'" v-model:date="nowoccurences[index].time" v-model:time="setOccurencetime"/>
                </div>
          </div>
          <div class="flex justify-end w-full mt-5">
                <span class="text-danger text-sm cursor-pointer" @click="addOccur"> <span class="text-xl">+</span> Add Occurence</span>
          </div>
      
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            @click="show = false"
            class="border-primary border-2 px-6 mr-3 rounded-xl text-primary"
          >
            Cancel
          </cornie-btn>
          <cornie-btn
            :loading="loading"
            @click="submit"
            class="text-white bg-danger px-6 rounded-xl"
          >
            Save
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";

import IAllergy, { OnSet, Reaction } from "@/types/IAllergy";

import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import DateTimePicker from "@/components/date-time-picker.vue";

const user = namespace("user");
const allergy = namespace("allergy");

@Options({
  name: "occurenceModal",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
   DateTimePicker,
  },
})
export default class occurenceModal extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @allergy.Action
  getAllergyById!: (id: string) => IAllergy;


  loading = false;
  query = "";

  occurences = [] as any;
  nowoccurences = [] as any;
  setOccurence = "";
  setOccurencetime = "";

    @Watch("id")
  idChanged() {
    this.setAllergy();
  }

  async setAllergy() {
    const allergy = await this.getAllergyById(this.id);
    if (!allergy) return;
    this.occurences = allergy.occurences;
    // this.setOccurence = this.parseDate(allergy.occurences);
   //  this.setOccurencetime = this.parseTime(allergy.occurences);
  }

  safeBuildDateTime(dateString: string, time: string) {
    try {
      return this.buildDateTime(dateString, time);
    } catch (error) {
      return;
    }
  }
  buildDateTime(dateString: string, time: string) {
    const date = new Date(dateString);
    const [hour, minute] = time.split(":");
    date.setMinutes(Number(minute));
    date.setHours(Number(hour));
    return date.toISOString();
  }

  // parseDate(datTime: any){
  //    const pt = datTime.find((i: any) => i.time);
  //   return pt ? this.separateDate(pt.time) : "";
  // }
  // parseTime(datTime: any){
  //    const pt = datTime.find((i: any) => i.time);
  //   return pt ? this.separateTime(pt.time) : "";
  // }

  separateDate(date:string){
    // const newdate = new Date(date).toLocaleDateString()
    // this.setOccurence = newdate;
    return date ? new Date(date).toLocaleDateString() : "";
  }

separateTime(date:string){
  const [newtime, ..._]  = new Date(date).toTimeString().split(" ")
  console.log(newtime, 'NREE');
   //  this.setOccurencetime = newtime;
    return date ? newtime :''
  }
  

  addOccur(){
    this.nowoccurences.push({time: new Date() })
    // if(this.occurences.length === 0){
    //   this.nowoccurences.push({time: new Date() })
    // }else{
    //   this.nowoccurences.push({time: new Date(this.setOccurence).toISOString()})
    // }
  }

   async submit() {
    this.loading = true;
      await this.addOccurence();
    this.loading = false;
  }


  async addOccurence() {
    try {
      const response = await cornieClient().patch(
        `/api/v1/allergy/add-occurence/${this.id}`,
      this.nowoccurences
      );
      if (response.success) {
        window.notify({ msg: "Occurence Saved", status: "success" });
        this.done();
      }
    } catch (error: any) {
      window.notify({ msg: error.response.data.message, status: "error" });
    }
  }

   done() {
    this.$emit("allergy-added");
    this.show = false;
  }
  

  

  async created() {
    this.setAllergy();
  }
}
</script>

<style></style>
