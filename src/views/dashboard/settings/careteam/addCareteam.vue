<template>
<div>
<span class="flex border-b-2 w-full font-semibold text-xl text-primary py-2 mx-auto">
    Create a Care Team
</span>
  <div class="w-full h-screen">
    <form class="mt-5 w-full" @submit.prevent="submit">
      <div class="w-full grid grid-cols-2 gap-5">
        <cornie-input label="Organization Name"   placeholder="--Automatically Generated--"/>
        <cornie-select
          :rules="required"
          :items="['Select']"
          label="Status"
          aria-selected="--Select--"
        >
        </cornie-select>
        <cornie-select
          :rules="required"
          :items="['category']"
          label="Category"
          aria-selected="--Select--"
        >
        </cornie-select>
        <cornie-input label="Name"   placeholder="--Enter--" :rules="required"/>
        <div>
        <cornie-input label="Subject" class="rounded-full"   placeholder="--Enter--" :rules="required"/>
        <filter-icon class="cursor-pointer"/>
        </div>
        <cornie-input label="Period"   placeholder="--Enter--" :rules="required"/>
       <!-- <div>
        <domain-input label="Domain Name" placeholder="--Enter--" :rules="required" v-model="domainName" v-on:input="checkDomain"/>
        <span class="text-xs font-bold">{{ result }}</span>
        </div>-->
        <span class="flex border-b-2 w-full text-sm text-dark py-2 mx-auto font-semibold col-span-full mb-2 mt-4">
           Participant
        </span>
        <!--  <div class="grid grid-cols-7 gap-3 col-span-full">
              <p class="text-xs text-dark font-semibold">John Gerald O.</p>
              <p class="text-xs text-dark font-semibold">Med. Lab. Scientist</p>
              <p class="text-xs text-dark font-semibold">Reddingtion Hospital</p>
              <p class="text-xs text-dark font-semibold">+234-90-234-55667</p>
              <p class="text-xs text-dark font-semibold">jgeraldo@reddingtion.org</p>
              <d-edit class="ml-20"/>
              <c-delete/>
          </div>-->
           <div class="grid grid-cols-7 gap-3 col-span-full" v-for="(input, index) in participants" :key="`phoneInput-${index}`" v-if="participants.length > 0">
                <p class="text-xs text-dark font-semibold">{{ input.member}}</p>
                <p class="text-xs text-dark font-semibold">{{ input.role}}</p>
                <p class="text-xs text-dark font-semibold">{{ input.org}}</p>
                <p class="text-xs text-dark font-semibold">{{input.phone}}</p>
                <p class="text-xs text-dark font-semibold">{{input.email}}</p>
                <d-edit class="ml-20"  @click="editField(index,participants)"/>
                <c-delete @click="removeField(index, participants)" class="cursor-pointer"/>
            </div>

            <cornie-select
              :rules="required"
              :items="['category']"
              label="Member"
              v-model="all.member"
              aria-selected="--Select--"
            >
            </cornie-select>
            <cornie-select
              :rules="required"
              :items="['category']"
              label="Role"
              v-model="all.role"
              aria-selected="--Select--"
            >
            </cornie-select>
            <cornie-input label="On behalf of" v-model="all.behalf"  placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Period" v-model="all.period"   placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Reason Code" v-model="all.code"  placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Reason Reference"  v-model="all.ref" placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Managing Organization" v-model="all.org"  placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Phone"  v-model="all.phone" placeholder="--Enter--" :rules="required"/>
            <cornie-input label="Email"  v-model="all.email" placeholder="--Enter--" :rules="required"/>
            <Textarea     label="Notes"  v-model="all.notes" placeholder="--Enter--" :rules="required"/>
            <span></span>
          <span><c-add class="float-right cursor-pointer mb-2 mt-8 mr-5"  @click="addField" /></span>
      </div>
    <span class="flex justify-end w-full border-t-2 h-full">
    <button
     @click="$router.push('domains')"
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
import DomainInput from "@/components/domain-input.vue";
import IDomain from "@/types/IDomain";
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

const domain = namespace("domain");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    DomainInput,
    OrgSelect,
    ColumnFilter,
    Textarea,
    DEdit,
    CDelete,
    CAdd,
    AddIcon
  },
})
export default class AddDomain extends Vue {
  @Prop({ type: String, default: "" })
  id!: string;

  
  @domain.Action
  getDomainById!: (id: string) => IDomain;

  loading = false;

  orgName = "";
  domainName = "";
  roleForDomain = "";
  result = "";
  member = "";
  role = "";
  behalf = "";
  period = "";
  code = "";
  ref = "";
  org = "";
  phone = "";
  email = "";
  notes = "";
 
  all = { member: "" , role:"", behalf:"",period:"", code:"", ref:"", org:"", phone:"", email:"",notes:""}

  //participants =  [{ member: "John Gerald O." , role:"Med. Lab. Scientist",  behalf:this.all.behalf,period:this.all.period, code:this.all.code, ref:this.all.ref, org:"Reddingtion Hospital", phone:"+234-90-234-55667", email:"jgeraldo@reddingtion.org",notes:this.all.notes}];
  participants: any[] =  [];
  
  required = string().required();


@Watch("id")
  idChanged() {
    this.setDomain();
  }
 async setDomain() {
    const domain = await this.getDomainById(this.id);
    if (!domain) return;
    this.orgName = domain.orgName;
    this.domainName = domain.domainName;
    this.roleForDomain = domain.roleForDomain;
 }
  allaction() {
    return this.id ? "Update" : "Create New";
    }
   get payload() {
    return {
      orgName: this.orgName,
      domainName: this.domainName,
      roleForDomain: this.roleForDomain,
    }
   }

   async editField(index:number, fieldType:object) {
     this.all = this.participants[index]
    }
   async addField(event:object) {
      this.participants.push(this.all);
    }
   async removeField(index:number, fieldType:object) {
       this.participants.splice(index, 1);
    }
   get checkdomainName() {
    return {
      domainName: this.domainName,
    }
   }
   async submit() {
    this.loading = true;
    if (this.id) await this.updateDomain();
    else await this.createDomain();
    this.loading = false;
  }

  async createDomain() {

    try {
      const response = await cornieClient().post(
        "/api/v1/domain",
        this.payload
      );
      if (response.success) {
         //alert("Domain added");
          window.notify({ msg: "Domain added", status: "success" });
      }
    } catch (error) {
       //alert("Domain not added");
      window.notify({ msg: "Domain not added", status: "error" });
    }
  }
  async checkDomain() {
   
       this.result = "..checking domain";
    try {
      const response = await cornieClient().post(
        "/api/v1/domain/checkDomain",
        this.checkdomainName
      );
      if (response.success == true) {
        this.result = response.message;
        console.log(response);
      }else{
        this.result = response.message;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateDomain() {
    const url = `/api/v1/domain/${this.id}`;
    const payload = { ...this.payload };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
       // alert("Domain name updated");
        window.notify({ msg: "Domain name updated", status: "success" });
      }
    } catch (error) {
      //alert("Domain name not updated");
       window.notify({ msg: "Domain name not updated", status: "error" });
    }
  }
  async fetchRoles() {
      const Roles = cornieClient().get(
        "/api/v1/roles/myOrg/getMyOrgRoles"
      );
      const response = await Promise.all([Roles]);
        this.roleForDomain = response[0].data;
    }
  async created() {
    this.setDomain();
    try {
      await this.fetchRoles();
    } catch (error) {
      console.log(error);
    }
  }
 
  //  fetching of the dropdown data

}
</script>
<style>
.outline-primary{
    border: 2px solid #0A4269;
}
</style>