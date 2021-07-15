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
      {{ allaction }} Domain
    </span>
  <div class="w-full h-56">
    <form class="mt-5 w-full" @submit.prevent="submit">
      <div class="w-full grid grid-cols-2 gap-5">
        <cornie-input label="Organization Name"   placeholder="--Enter--" :rules="required" v-model="orgName"/>
        <div>
        <domain-input label="Domain Name" placeholder="--Enter--" :rules="required" v-model="domainName" v-on:input="checkDomain"/>
        <span class="text-xs font-bold">{{ result }}</span>
        </div>
        <OrgSelect
        :rules="required"
          label="IAM Role"
          v-model="roleForDomain"
        >
         <option>
           super admin
          </option>
         <!--<option v-for="(role, i) in roleForDomain" :key="i" :value="role">
            {{ role }}
          </option>-->
        </OrgSelect>
      </div>
   <span class="flex justify-end w-full border-t-2 mt-10">
    <button
     @click="$router.push('domains')"
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
import DomainInput from "@/components/domain-input.vue";
import IDomain from "@/types/IDomain";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";
import OrgSelect from "@/components/orgSelect.vue";

const domain = namespace("domain");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    DomainInput,
    OrgSelect
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
         alert("Domain Added");
        console.log(response.data);
      }else{
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
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
    const payload = { ...this.payload, id: this.id };
    try {
      const response = await cornieClient().put(url, payload);
      if (response.success) {
        console.log(response.data);
         alert("Domain Name Updated");
      }else{
         alert(response.message);
      }
    } catch (error) {
      console.log(error);
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
    // const data = await this.getDropdowns("domain");
   // this.dropdowns = data;
  }
  //  fetching of the dropdown data

}
</script>
<style>
.outline-primary{
    border: 2px solid #0A4269;
}
</style>