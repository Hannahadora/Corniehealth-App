<template>
  <div class="container-fluid">
    <div class="w-full">
      <div class="w-full">
        <label
          for=""
          class="block capitalize mb-1 text-black text-sm font-semibold"
          >{{ label }}</label
        >
        <button
          class="select-btn flex justify-between w-11/12"
          @click="toggleModal"
          style="padding: 0.6rem"
        >
          <span>{{ localValue ? localValue.name : "Select" }}</span>
          <span><add-icon /></span>
        </button>
      </div>
      <overlay :show="showModal">
        <modal :visible="showModal">
          <div class="w-full p-2" style="min-width: 450px">
            <div class="w-full">
              <p
                class="flex justify-between w-full justify-center font-bold mb-2 text-xl text-primary py-2"
              >
                <span>{{ label }}</span>
                <span class="cursor-pointer" @click="() => (showModal = false)"
                  ><close-icon
                /></span>
              </p>
            </div>

            <div class="w-full" style="border-bottom: 1px dashed #c5c4d4">
              <div class="w-full">
                <label
                  class="flex capitalize mb-1 text-black text-lg font-semibold"
                  >Select</label
                >
                <div class="w-full flex flex-wrap py-2">
                  <cornie-select
                    v-model="type"
                    :items="options"
                    style="width: 100%"
                  />
                </div>
              </div>
            </div>

            <div class="w-full my-2">
              <search-input v-model="query" :autocomplete="'off'" />
            </div>

            <div class="w-full" style="overflow-y: scroll; max-height: 250px">
              <div class="w-full" v-if="items?.length > 0">
                <div
                  :class="{ item: location?.id === localValue?.id }"
                  class="w-full flex items-center my-2 cursor-pointer p-2"
                  @click="selectItem(location)"
                  v-for="(location, index) in items"
                  :key="index"
                >
                  <div class="w-1/12">
                    <loc-icon />
                  </div>
                  <div class="w-11/12">
                    <p class="flex flex-col items-start justify-start">
                      <span style="color: #14171f">{{ location.name }}</span>
                      <span class="subtext">{{ location.address }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="w-full px-4" v-else>
                <p class="flex flex-col items-start justify-start">
                  <span class="subtext italic">No records found</span>
                </p>
              </div>
              <div class="w-full" v-if="type === 'Practitioner'">
                <actors-practitioners @selected="itemSelected" />
              </div>
              <div class="w-full" v-if="type === 'Appointment'">
                <appointment-list @selected="itemSelected" />
              </div>
            </div>

            <div class="w-full flex justify-end my-6">
              <corniebtn
                class="p-2 rounded-full px-8 mx-4 cursor-pointer flex items-center"
                style="border: 1px solid #080056"
              >
                <span
                  class="font-semibold text-primary-500"
                  @click="toggleModal"
                  >Cancel</span
                >
              </corniebtn>

              <CornieBtn
                @click="apply"
                class="bg-danger p-2 rounded-full px-8 mx-2 cursor-pointer"
              >
                <span class="text-white font-semibold">Add</span>
              </CornieBtn>
            </div>
          </div>
        </modal>
      </overlay>
    </div>
  </div>
</template>

<script lang="ts">
import ILocation from "@/types/ILocation";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";
import LocIcon from "@/views/dashboard/ehr/hospitalization/components/loc-icon.vue";
import Modal from "@/components/modal.vue";
import SearchInput from "@/components/search-input.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import Overlay from "@/views/dashboard/settings/rolesprivileges/components/overlay.vue";
import AddIcon from "@/views/dashboard/ehr/hospitalization/components/add-icon.vue";
import { Prop, Watch } from "vue-property-decorator";
import IPractitioner from "@/types/IPractitioner";
import CornieSelect from "@/components/cornieselect.vue";
import ActorsPractitioners from "./actor-practitioners.vue";
import AppointmentList from "./appointments-list.vue";

const location = namespace("location");
const user = namespace("user");
const practitioner = namespace("practitioner");

interface IReferenceItem {
  id: string;
  name: string;
  address: string;
}

@Options({
  components: {
    LocIcon,
    Modal,
    SearchInput,
    CloseIcon,
    Overlay,
    AddIcon,
    CornieSelect,
    ActorsPractitioners,
    AppointmentList,
  },
})
export default class SelectRference extends Vue {
  @location.State
  locations!: ILocation[];
  @location.Action
  fetchLocations!: () => Promise<void>;

  @user.Getter
  authPractitioner!: IPractitioner;

  @practitioner.State
  practitioners!: IPractitioner[];
  @practitioner.State
  fetchPractitioners!: () => Promise<void>;

  @Prop()
  value!: string;

  @Prop()
  label!: string;

  @Prop({ type: String, default: "" })
  selectedType!: string;

  @Prop({ type: Array, default: [] })
  options!: string[];

  localValue: any = {};
  referenceType = "location";
  showModal = false;
  query = "";
  type = "Practitioner";

  get items() {
    let list: IReferenceItem[];
    if (this.referenceType === "location") {
      list = this.locations?.map((location) => {
        return {
          id: location.id,
          name: location.name,
          address: location.address,
        };
      });
    } else {
      list = [];
    }

    if (this.query)
      return list.filter((item) => {
        return item?.name?.toLowerCase()?.includes(this.query?.toLowerCase());
      });
    return list;
  }

  itemSelected(data: any) {
    this.$emit("selected", data);
    this.localValue = data;
    this.showModal = false;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  selectItem(data: any) {
    this.localValue = data;
  }

  apply() {
    this.$emit("inpu", this.localValue);
    this.showModal = false;
  }

  @Watch("value")
  updateValue() {
    if (this.value) {
      this.localValue = this.value ? this.value : "";
    }
  }

  async created() {
    this.type = this.selectedType;
    this.localValue = this.value ? this.value : "";
    await this.fetchLocations();
    await this.fetchPractitioners();
    console.log(this.practitioners, "Practitioners");
  }
}
</script>

<style scoped>
* {
  font-family: Inter;
}

.subtext {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 140% */

  /* Greys/Blue Yonder */

  color: #667499;
}

.item {
  background: #f0f4fe;
  border-radius: 124px;
}

.select-btn {
  background: #ffffff;
  /* Greys/Etherium */

  border: 1px solid #c2c7d6;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
