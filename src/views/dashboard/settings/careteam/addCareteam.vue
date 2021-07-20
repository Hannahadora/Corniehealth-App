<template>
<div>
<span class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto">
    Create a Care Team
</span>
  <div class="w-full h-screen">
    <form class="mt-5 w-full" @submit.prevent="submit">
      <div class="w-full grid grid-cols-2 gap-5">
        <cornie-input label="Organization Name" v-model="identifier"  placeholder="--Automatically Generated--"/>
        <cornie-select
          :rules="required"
          :items="dropdowns.status"
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
        <cornie-input label="Name" v-model="name"   placeholder="--Enter--" :rules="required"/>
        <div>
        <cornie-input label="Subject" v-model="subject"   placeholder="--Enter--" :rules="required"/>
        </div>
        <cornie-input label="Period" v-model="period"  placeholder="--Enter--" :rules="required"/>
        <span class="flex border-b-2 w-full text-sm text-dark py-2 mx-auto font-semibold col-span-full mb-2 mt-4">
           Participant
        </span>
          <div v-if="addParticipants.length > 0">
           <div class="grid grid-cols-7 gap-3 col-span-full" v-for="(input, index) in addParticipants" :key="`phoneInput-${index}`">
                <p class="text-xs text-dark font-semibold">{{ input.member}}</p>
                <p class="text-xs text-dark font-semibold">{{ input.role}}</p>
                <p class="text-xs text-dark font-semibold">{{ input.org}}</p>
                <p class="text-xs text-dark font-semibold">{{input.phone}}</p>
                <p class="text-xs text-dark font-semibold">{{input.email}}</p>
                <d-edit class="ml-20"  @click="editField(index,addParticipants)"/>
                <c-delete @click="removeField(index, addParticipants)" class="cursor-pointer"/>
            </div>
          </div>

            <cornie-select
              :rules="required"
              :items="dropdowns.name"
              label="Name"
              v-model="participants.name"
              aria-selected="--Select--"
            >
            </cornie-select>
            <cornie-select
              :rules="required"
              :items="dropdowns.role"
              label="Role"
              v-model="participants.role"
              aria-selected="--Select--"
            >
            </cornie-select>
            <cornie-input label="On behalf of" v-model="participants.onBehalfOf"  placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Period" v-model="participants.period"   placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Reason Code" v-model="participants.reasonCode"  placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Reason Reference"  v-model="participants.reasonReference" placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Managing Organization" v-model="participants.managingOrganization"  placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Phone"  v-model="participants.phone" placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Email"  v-model="participants.email" placeholder="--Enter--" :rules="required"/>
            <Textarea     label="Notes"  v-model="participants.notes" placeholder="--Enter--" :rules="required"/>
            <span></span>
          <span><c-add class="float-right cursor-pointer mb-2 mt-8 mr-5"  @click="addField" /></span>
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
        Cancel
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
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import Textarea from "@/components/textarea.vue";
import ICareteam, { Participants }  from "@/types/ICareteam";
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

const careteam = namespace("careteam");
const dropdown = namespace("dropdown");

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
    AddIcon
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
  participants: Participants[] = [];
  period = {start:"", end:""};
  //participants = { name: "" , role:"", onBehalfOf:"", period: {start:"", end:""}, reasonCode:"", reasonReference:"", managingOrganization:"",phone: {number:"", dialCode:""}, email:"",notes:"",careTeamId:""}
// :items="['category']"
  //participants =  [{ member: "John Gerald O." , role:"Med. Lab. Scientist",  behalf:this.all.behalf,period:this.all.period, code:this.all.code, ref:this.all.ref, org:"Reddingtion Hospital", phone:"+234-90-234-55667", email:"jgeraldo@reddingtion.org",notes:this.all.notes}];
  addParticipants: any[] =  [];
  
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
  allaction() {
    return this.id ? "Update" : "Create New";
    }
   get payload() {
    return {
    identifier:  this.identifier,
    status: this.status,
    category:  this.category ,
    name:  this.name ,
    subject:  this.subject ,
    period:  this.period ,
    participants:  this.participants ,
    }
   }

   async editField(index:number, fieldType:object) {
     this.participants = this.addParticipants[index]
    }
   async addField(event:object) {
      this.addParticipants.push(this.participants);
    }
   async removeField(index:number, fieldType:object) {
       this.addParticipants.splice(index, 1);
    }
   
   async submit() {
    this.loading = true;
    if (this.id) await this.updateCareteam();
    else await this.createCareteam();
    this.loading = false;
  }

  async createCareteam() {

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

  async created() {
    this.setCareteam();
     const data = await this.getDropdowns("careteam");
    this.dropdowns = data;
  }

}
</script>
<style>
.outline-primary{
    border: 2px solid #0A4269;
}
</style>