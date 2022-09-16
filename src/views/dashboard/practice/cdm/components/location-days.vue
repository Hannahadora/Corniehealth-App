<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-screen">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="show = false">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Location & Days
            </h2>
          </div>
        </div>
      </cornie-card-title>
      <cornie-card-text class="overflow-y-auto">
        <div class="mb-5 w-full h-full pb-32">
          <div class="grid grid-cols-12">
            <div class="col-span-12">
              <cornie-select
                :rules="required"
                :items="allLocation"
                v-model="location"
                label="Location"
                placeholder="--Select--"
                class="w-full"
              />
            </div>

            <div class="col-span-12">
              <span class="text-primary text-sm font-semibold mb-5">
                Available Days
              </span>
              <div class="grid grid-cols-7 gap-4 w-full mt-4">
                <div
                  :class="{ active: isActiveMon }"
                  @click="setActive('mon')"
                  class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                >
                  Mon
                </div>
                <div
                  :class="{ active: isActiveTue }"
                  @click="setActive('tue')"
                  class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                >
                  Tue
                </div>
                <div
                  :class="{ active: isActiveWed }"
                  @click="setActive('wed')"
                  class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                >
                  Wed
                </div>
                <div
                  :class="{ active: isActiveThu }"
                  @click="setActive('thu')"
                  class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                >
                  Thu
                </div>
                <div
                  :class="{ active: isActiveFir }"
                  @click="setActive('fri')"
                  class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                >
                  Fri
                </div>
                <div
                  :class="{ active: isActiveSat }"
                  @click="setActive('sat')"
                  class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                >
                  Sat
                </div>
                <div
                  :class="{ active: isActiveSun }"
                  @click="setActive('sun')"
                  class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs"
                >
                  Sun
                </div>
              </div>
            </div>
            <div
              class="col-span-12 flex justify-start mt-5 border-b-2 border-dashed border-gray-200 pb-4"
            >
              <span
                class="text-danger font-semibold text-sm cursor-pointer"
                @click="add"
              >
                <span class="text-lg">+</span> Add
              </span>
            </div>
            <div
              class="bg-white shadow-md p-1 w-full col-span-full mt-5 rounded-lg"
              v-for="(item, index) in locationDays"
              :key="index"
            >
              <div class="flex space-x-4 w-full">
                <span class="flex items-center">
                  <avatar :src="localSrc" class="mr-1" />
                </span>
                <div class="w-full">
                  <p class="font-bold text-sm">
                    {{ getLocationName(item.locationId) }}
                  </p>
                  <span class="text-gray-400 text-xs font-light">
                    {{ isActiveMon ? item?.days?.mon : "" }}
                    {{ isActiveTue ? item?.days?.tue : "" }}
                    {{ isActiveWed ? item?.days?.wed : "" }}
                    {{ isActiveThu ? item?.days?.thu : "" }}
                    {{ isActiveFir ? item?.days?.fri : "" }}
                    {{ isActiveSat ? item?.days?.sat : "" }}
                    {{ isActiveSun ? item?.days?.sun : "" }}
                  </span>
                </div>
                <div class="float-right flex justify-end w-full">
                  <div class="bg-blue-50 p-3 -m-1 rounded-r-lg">
                    <delete-red
                      class="mt-1"
                      @click="deleteLocationDays(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="$emit('close-access-diag')"
          class="border-primary border-2 px-5 mr-4 rounded-md text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          @click="submit"
          class="text-white bg-danger px-4 rounded-md"
        >
          Save
        </cornie-btn>
      </div>
    </cornie-card>
  </cornie-dialog>
</template>

<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { PropSync } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { string } from "yup";

  import { cornieClient } from "@/plugins/http";
  import IPractitioner from "@/types/IPractitioner";

  import CornieSelect from "@/components/autocomplete.vue";
  import Avatar from "@/components/avatar.vue";
  import CornieCard from "@/components/cornie-card";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieDialog from "@/components/CornieDialog.vue";
  import CornieIconBtn from "@/components/CornieIconBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import MainCornieSelect from "@/components/cornieselect.vue";
  import IconInput from "@/components/IconInput.vue";
  import CDelete from "@/components/icons/adelete.vue";
  import DEdit from "@/components/icons/aedit.vue";
  import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
  import CheckIcon from "@/components/icons/authcheck.vue";
  import BluecheckIcon from "@/components/icons/bluecheck.vue";
  import UpdateIcon from "@/components/icons/blueupdate.vue";
  import CancelIcon from "@/components/icons/CloseIcon.vue";
  import DeleteRed from "@/components/icons/delete-red.vue";
  import DeleteorangeIcon from "@/components/icons/deleteorange.vue";
  import EditIcon from "@/components/icons/edit.vue";
  import InfoIcon from "@/components/icons/info.vue";
  import SearchIcon from "@/components/icons/search.vue";
  import CorniePhoneInput from "@/components/phone-input.vue";
  import Textarea from "@/components/textarea.vue";

  const dropdown = namespace("dropdown");
  const roles = namespace("roles");
  const practitioner = namespace("practitioner");

  @Options({
    name: "LocationDays",
    components: {
      ...CornieCard,
      CornieIconBtn,
      ArrowLeftIcon,
      Avatar,
      CDelete,
      UpdateIcon,
      DeleteorangeIcon,
      CheckIcon,
      BluecheckIcon,
      DEdit,
      CancelIcon,
      InfoIcon,
      CornieDialog,
      SearchIcon,
      IconInput,
      Textarea,
      CornieInput,
      CornieSelect,
      CorniePhoneInput,
      CornieRadio,
      CornieBtn,
      MainCornieSelect,
      DeleteRed,
      EditIcon,
    },
  })
  export default class LocationDays extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    required = string().required();

    isActiveMon = false;
    isActiveTue = false;
    isActiveWed = false;
    isActiveThu = false;
    isActiveFir = false;
    isActiveSat = false;
    isActiveSun = false;

    locations = [] as any;
    locationsId = [] as any;
    location = "";
    loading = false;
    localSrc = require("../../../../../assets/img/placeholder.png");

    locationDays = [] as any;
    newlocationDays = [] as any;

    data = {} as any;
    newdata = [] as any;

    @dropdown.Action
    getDropdowns!: (a: string) => Promise<IIndexableObject>;

    @roles.State
    roles!: { id: string; name: string }[];

    @roles.Action
    getRoles!: () => Promise<void>;

    @practitioner.Action
    getPractitionerById!: (id: string) => Promise<IPractitioner>;

    get allLocation() {
      if (!this.locations || this.locations.length === 0) return [];
      return this.locations.map((i: any) => {
        return {
          code: i.id,
          display: i.name,
        };
      });
    }
    getLocationName(id: string) {
      const pt = this.locations.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }

    setActive(item: string) {
      if (item == "mon") {
        this.isActiveMon = !this.isActiveMon;
        this.newdata.push("mon");
        this.data.mon = "mon .";
      } else if (item == "tue") {
        this.newdata.push("tue");
        this.data.tue = "tue .";
        this.isActiveTue = !this.isActiveTue;
      } else if (item == "wed") {
        this.newdata.push("wed");
        this.data.wed = "wed .";
        this.isActiveWed = !this.isActiveWed;
      } else if (item == "thu") {
        this.newdata.push("thu");
        this.data.thu = "thu .";
        this.isActiveThu = !this.isActiveThu;
      } else if (item == "fri") {
        this.newdata.push("fri");
        this.data.fri = "fri .";
        this.isActiveFir = !this.isActiveFir;
      } else if (item == "sat") {
        this.newdata.push("sat");
        this.data.sat = "sat .";
        this.isActiveSat = !this.isActiveSat;
      } else {
        this.newdata.push("sun");
        this.data.sun = "sun .";
        this.isActiveSun = !this.isActiveSun;
      }
    }

    async add() {
      this.locationDays.push({
        locationId: this.location,
        days: this.data,
      });
      this.newlocationDays.push({
        locationId: this.location,
        days: this.newdata,
      });
      this.locationsId.push(this.location);
      this.data = {};
    }

    async deleteLocationDays(index: number) {
      this.locationDays.splice(index, 1);
    }

    async submit() {
      this.loading = true;
      console.log("idd", this.locationsId);
      if (
        !this.locationDays ||
        this.locationDays.length == 0 ||
        !this.locationsId
      )
        return;
      this.$emit(
        "location-days",
        this.locationDays,
        this.newlocationDays,
        this.locationsId
      );

      this.loading = false;
      this.done();
    }

    done() {
      this.show = false;
    }

    async fetchLocation() {
      const AllLocation = cornieClient().get(
        "/api/v1/location/myOrg/getMyOrgLocations/"
      );
      const response = await Promise.all([AllLocation]);
      this.locations = response[0].data;
    }

    async created() {
      await this.fetchLocation();
      await this.getRoles();
    }
  }
</script>
<style scoped>
  .active {
    background: #080056;
    border: 1px solid #080056;
    color: #fff;
  }
</style>
