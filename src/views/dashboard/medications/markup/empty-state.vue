<template>
  <div class="flex items-center flex-col justify-center h-full gap-8">
    <img src="@/assets/img/markup.svg" />
    <div class="text-center">
      <h1 class="font-bold text-xl">No Markup & Discounts on Record</h1>
      <!-- <h1 class="text-gray-400 text-sm font-normal">
        Markups & Discounts added will be displayed here
      </h1> -->
    </div>

    <button
      class="bg-danger text-base font-semibold rounded-md text-white py-2 px-14"
      @click="dialog = true"
    >
      Setup
    </button>

    <setup-markup v-model="dialog" :locationId="locationId" @markup-saved="SerchMarkups"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import SetupMarkup from "./setup-markup.vue";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import  IMarkup  from "@/types/IMarkup";

const markup = namespace("markup");
const user = namespace("user");
const org = namespace("organization");

@Options({
  name: "EmptyState",
  components: {
    CornieDialog,
    SetupMarkup,
  },
})
export default class EmptyState extends Vue {
  dialog = false;

  @Prop({ type: String, default: "" })
  locationId!: String;

  @user.Getter
  authCurrentLocation!: any;

  @markup.State
  markups!: IMarkup[];

  @markup.Action
  fetchMarkups!: () => Promise<void>;

  @markup.Action
  fetchLocationMarkups!: (locationId: string) => Promise<void>;


  @user.Getter
  cornieUser!: any;

  @org.State
  organizationInfo!: any;

  @org.Action
  fetchOrgInfo!: () => Promise<void>;

   get isRoot() {
    return Boolean(this.organizationInfo?.rootUserId === this.cornieUser?.id);
  }

   async SerchMarkups() {
    if (this.isRoot) {
      await this.fetchMarkups();
    } else {
      if (!this.locationId) return [];
      await this.fetchLocationMarkups(this.authCurrentLocation);
    }
  }

  async created() {
    if (!this.organizationInfo) await this.fetchOrgInfo();
    await this.fetchMarkups()

    await this.fetchLocationMarkups(this.authCurrentLocation);

    await this.SerchMarkups();
  }
}
</script>
