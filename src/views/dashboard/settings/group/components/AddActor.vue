<template>
  <cornie-dialog
    v-model="show"
    center
    class="w-96 h-5/6 animated fadeIn z-50 absolute overflow-y-hidden"
  >
    <cornie-card height="100%" class="flex flex-col animated fadeInUp">
      <cornie-card-title class="w-full p-3">
        <cornie-icon-btn @click="show = false">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            {{ isUpdate ? "Edit User" : `Add ${title}` }}
          </h2>
        </div>
      </cornie-card-title>
      <cornie-card-text
        class="flex-grow scrollable flex flex-col overflow-y-hidden"
      >
        <div class="text-xs text-gray-400 mb-3">
          Select preffered {{ title.toLowerCase() }}
        </div>
        <div
          class="p-2 border border-gray-400 rounded-sm flex flex-col overflow-y-auto flex-1"
        >
          <icon-input
            class="border border-gray-600 rounded-full focus:outline-none"
            :placeholder="`Search ${title.toLowerCase()}`"
            v-model="search"
          >
            <template v-slot:append>
              <close-icon
                class="w-3 fill-current text-gray-400"
                @click="search = ''"
              />
            </template>
            <template v-slot:prepend>
              <search-icon />
            </template>
          </icon-input>
          <div class="mt-1 overflow-y-auto max-h-full">
            <template v-if="actors.length">
              <div
                class="flex flex-row items-center mb-5"
                v-for="actor in filteredActors"
                :key="actor.id"
              >
                <input
                  type="checkbox"
                  class="w-1 h-4 mr-5"
                  :value="actor.id"
                  v-model="selectedActors"
                />
                <div class="flex flex-col">
                  <p class="font-bold text-xs">
                    {{ `${actor.lastName} ${actor.firstName}` }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ actor.jobDesignation }}
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="w-full border-b border-gray-300 border-dashed my-3"></div>
        <div class="flex justify-end w-full mt-4 mb-3">
          <button
            class="rounded-md mt-5 py-1 px-4 border border-primary focus:outline-none font-bold hover:opacity-90 w-1/3 mr-2 text-primary font-semibold"
            @click="show = false"
          >
            Cancel
          </button>
          <cornie-btn
            type="button"
            class="bg-danger rounded-md text-white mt-5 py-1 px-4 font-bold focus:outline-none hover:opacity-90 w-1/3"
            @click="updateSelectedActors"
          >
            Apply
          </cornie-btn>
        </div>
      </cornie-card-text>
    </cornie-card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieInput from "@/components/cornieinput.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import IPractitioner from "@/types/IPractitioner";
import IDevice from "@/types/IDevice";
import CheckBox from "@/components/corniecheckbox.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

import { namespace } from "vuex-class";

const practitioner = namespace("practitioner");
const device = namespace("device");

@Options({
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    CornieDialog,
    CornieInput,
    CheckBox,
    IconInput,
    SearchIcon,
    CloseIcon,
  },
})
export default class AddActor extends Vue {
  @Prop({ type: Boolean, default: false })
  visible!: Boolean;

  @Prop({ type: String, default: "" })
  memberToDelete!: string;

  @Prop({ type: Boolean, default: false })
  isUpdate!: Boolean;

  @Prop({ type: String, default: false })
  entity!: string;

  @practitioner.State
  practitioners!: IPractitioner[];

  @device.State
  devices!: IDevice[];

  @practitioner.Action
  fetchPractitioners!: () => Promise<boolean>;

  @device.Action
  fetchDevices!: () => Promise<boolean>;

  search = "" as string;
  required = true as boolean;
  actors = [] as any;
  show = false as boolean;
  loading = false as boolean;
  title = "" as string;
  selectedActors = [] as any;
  pageLoaded = false as boolean;

  @Watch("memberToDelete")
  updateSelectedMember() {
    if (this.memberToDelete === "") return;

    this.selectedActors = [
      ...this.selectedActors.filter(
        (item: any) => item !== this.memberToDelete
      ),
    ];

    this.$emit("memberDeleted");
  }

  @Watch("entity")
  updateActors(val: string) {
    if (val === "Practitioner") {
      this.title = "Practitioner";
      this.actors = <IPractitioner[]>[...this.practitioners];
    }

    if (val === "Device") {
      this.title = "Device";
      this.actors = <IDevice[]>[...this.devices];
    }

    if (val === "Patient") {
      this.title = "Patient";
      this.actors = [];
    }

    if (val === "Practitioner Role") {
      this.title = "Practitioner Role";
      this.actors = [];
    }

    if (val === "Medication") {
      this.title = "Medication";
      this.actors = [];
    }

    if (this.pageLoaded) {
      this.show = true;
    }

    this.pageLoaded = true;
  }

  get filteredActors() {
    return this.actors.filter(
      (item: any) =>
        item.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  async updateSelectedActors() {
    let actorsList: any = [];

    if (this.actors.length) {
      this.actors.forEach((actor: any) => {
        this.selectedActors.forEach((item: any) => {
          if (actor.id === item) actorsList = [actor, ...actorsList];
        });
      });
    }

    this.show = false;
    this.$emit("update-actors-list", actorsList);
  }

  async created() {
    if (!this.$route.params.id) this.pageLoaded = true;
    if (!this.practitioners.length) await this.fetchPractitioners();
  }
}
</script>
