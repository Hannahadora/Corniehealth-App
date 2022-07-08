<template>
  <div class="w-full pb-7 h-full">
    <div class="bg-white p-3 shadow-md">
      <span
        class="flex mt-5 border-b-2 w-full font-bold text-primary py-2 mx-auto text-sm"
      >
        Booking Site Control
      </span>
      <div class="mt-10 p-5">
        <span class="text-xs text-black font-semibold"
          >Enable Booking Site:</span
        >
        <div class="flex space-x-3 mt-4 w-1/2">
          <cornie-radio
            name="bookingsite"
            @click="apply"
            v-model="enabled"
            label="Yes"
            :value="true"
            :checked="true"
          />
          <cornie-radio
          @click="apply"
            name="bookingsite"
            v-model="enabled"
            :value="false"
            label="No"
          />
        </div>
      </div>
      <div class="grid grid-cols-2 field gap-3 w-full p-5" v-if="enabled">
        <domain-input
          label="URL:"
          placeholder="--Enter--"
          v-model="url"
        />
        <div class="flex space-x-4 w-full">
          <span class="flex space-x-1 text-sm font-semibold text-primary"
            ><copyform-icon /> <span>Copy</span></span
          >
          <span class="flex space-x-1 text-sm font-semibold text-primary"
            ><share-icon class="fill-current text-primary" /> <span>Share</span>
          </span>
        </div>
      </div>
      <div class="grid grid-cols-3 field gap-3 mt-4 2-full"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieRadio from "@/components/cornieradio.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import DomainInput from "@/components/newdomaininput.vue";
import { Prop, Watch } from "vue-property-decorator";
import { LevelCollection, Tag } from "@/types/ILevel";
import { cornieClient } from "@/plugins/http";
import DeleteIcon from "@/components/icons/delete.vue";
import CopyformIcon from "@/components/icons/formcopy.vue";
import EditIcon from "@/components/icons/edit.vue";
import ShareIcon from "@/components/icons/newshare.vue";
import AddLevel from "./add-level.vue";
import { namespace } from "vuex-class";
import { IOrganization } from "@/types/IOrganization";
import IBookingsite from "@/types/IBookingsite";

const organization = namespace("organization");
const bookingsite = namespace("bookingsite");
const level = namespace("OrgLevels");

@Options({
  name: "bookingsite",
  components: {
    CornieTable,
    CornieRadio,
    CornieInput,
    DeleteIcon,
    EditIcon,
    AddLevel,
    DomainInput,
    ShareIcon,
    CopyformIcon,
  },
})
export default class ExistingState extends Vue {
  @Prop({ type: Array, default: [], required: true })
  levels!: LevelCollection[];

  @Prop({ type: String, default: "" })
  id!: string;

  @organization.State
  organizationInfo!: IOrganization;

  @organization.Action
  fetchOrgInfo!: () => Promise<void>;

  @bookingsite.State
  bookingsites!: IBookingsite;

  @bookingsite.Action
  getBookingsiteById!: (id: string) => IBookingsite;

  @bookingsite.Action
  fetchBookingsite!: () => Promise<void>;

  levelForEdit = {} as LevelCollection;
  editingLevel = false;
  type = "";
  enabled = false;
  loading = false;
  orgValue = "TheGCBGLobal";
  url = "";
  get payload() {
    return {
      id: this.id,
      enabled: this.enabled,
    };
  }

  @Watch("id")
  idChanged() {
    this.setSite();
  }

  async setSite() {
    const site = await this.getBookingsiteById(this.payload.id);
    if (!site) return;
    this.enabled = site.enabled;
  }

  async apply() {
    this.loading = true;
    await this.createBookingSite();
    this.loading = false;
  }

  async createBookingSite() {
    try {
      const response = await cornieClient().post(
        "/api/v1/booking-site",
        this.payload
      );
      if (response.success) {
        window.notify({
          msg: "Booking Site Enabled",
          status: "success",
        });
      }
    } catch (error) {
      window.notify({
        msg: "Booking Site not Enabled",
        status: "error",
      });
    }
  }

  async created() {
    this.url = this.organizationInfo.domainName;
    this.setSite()
    await this.fetchOrgInfo();
    await this.fetchBookingsite();
  }
}
</script>

<style scoped>
.booking-font {
  font-size: 20px;
}

.field {
  align-items: end;
}

.input-color {
  background-color: red !important;
}
</style>
