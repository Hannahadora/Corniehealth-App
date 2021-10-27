<template>
  <div class="w-full flex justify-between mb-3" v-if="show">
    <img :src="organization?.image" />
    <div class="grid grid-cols-1 text-xs gap-y-2 text-right">
      <span>{{ organization?.name || "" }}</span>
      <span class="capitalize">{{ organization?.address || "" }}</span>
      <span>{{ organization?.phone || "" }}</span>
      <span class="capitalize">{{ organization?.email || "" }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { IOrganization } from "@/types/IOrganization";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

const organization = namespace("organization");

@Options({
  name: "OrgCard",
})
export default class OrgCard extends Vue {
  @Prop({ type: Object, required: true })
  organization!: IOrganization;

  @organization.Action
  getCurrentOrg!: () => Promise<IOrganization>;

  currentOrg = {} as IOrganization;

  get show() {
    return this.organization?.id != this.currentOrg?.id;
  }

  get identifier() {
    return this.organization?.identifier || this.organization?.id || "";
  }

  async created() {
    const currentOrg = await this.getCurrentOrg();
    this.currentOrg = currentOrg || {};
  }
}
</script>
