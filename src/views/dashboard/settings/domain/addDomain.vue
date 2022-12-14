<template>
  <div>
    <div>
      <form class="mt-5 w-full" @submit.prevent="submit">
        <div class="w-full grid grid-cols-12 mb-10">
          <div class="col-span-12 mb-4">
            <cornie-input
              label="Organization Name"
              placeholder="--Enter--"
              :rules="required"
              v-model="orgName"
            />
          </div>
          <div class="col-span-12 mb-4">
            <domain-input
              label="Domain Name"
              placeholder="--Enter--"
              :rules="required"
              v-model="domainName"
              v-on:input="checkDomain"
            />
            <span class="text-xs font-bold">{{ result }}</span>
          </div>
          <div class="col-span-12 mb-4">
            <cornie-select
              :rules="required"
              :items="['Super admin']"
              label="Role"
              v-model="roleForDomain"
            >
            </cornie-select>
          </div>
        </div>
        <span class="flex justify-end w-full">
          <button
            @click="$emit('close-add-domain-diag')"
            type="button"
            class="outline-primary rounded-md text-black mt-5 mr-3 py-2 pr-8 pl-8 px-3 focus:outline-none hover:bg-primary hover:text-white"
          >
            Cancel
          </button>

          <cornie-btn
            :loading="loading"
            type="submit"
            class="bg-danger rounded-md text-white mt-5 pr-10 pl-10 focus:outline-none hover:opacity-90"
          >
            {{ id ? "Update" : "Save" }}
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
import DomainInput from "@/components/newdomaininput.vue";
import IDomain from "@/types/IDomain";
import { cornieClient } from "@/plugins/http";
import { namespace } from "vuex-class";
import { string } from "yup";
import { Prop, Watch } from "vue-property-decorator";

const domain = namespace("domain");

@Options({
  components: {
    CornieInput,
    CornieSelect,
    DomainInput,
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
    };
  }
  get checkdomainName() {
    return {
      domainName: this.domainName,
    };
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
        this.result = response.errors!.summary;
      } else {
        this.result = response.errors!.summary;
      }
    } catch (error) {}
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
    const Roles = cornieClient().get("/api/v1/roles/myOrg/getMyOrgRoles");
    const response = await Promise.all([Roles]);
    this.roleForDomain = response[0].data;
  }
  async created() {
    this.setDomain();
    try {
      await this.fetchRoles();
    } catch (error) {}
  }

  //  fetching of the dropdown data
}
</script>
<style>
.outline-primary {
  border: 2px solid #080056;
}
</style>
