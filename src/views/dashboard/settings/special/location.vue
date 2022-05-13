<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <cornie-card height="100%" class="flex flex-col">
      <cornie-card-title class="w-full">
        <cornie-icon-btn @click="show = false" class="">
          <arrow-left-icon />
        </cornie-icon-btn>
        <div class="w-full border-l-2 border-gray-100">
          <h2 class="font-bold float-left text-lg text-primary ml-3 -mt-1">
            Manage Locations
          </h2>
          <cancel-icon class="float-right cursor-pointer" @click="show = false" />
        </div>
      </cornie-card-title>

      <cornie-card-text class="flex-grow scrollable">
        <v-form ref="form">
          <div class="w-full">
            <span
              class="cursor-pointer float-left rounded-lg font-semibold  mt-5 mb-5 py-2 px-5 text-primary border-2 border-primary mr-3 text-sm  focus:outline-none hover:opacity-90 flex justify-start"
              @click="showLocationModal = true">
              <span class="text-lg mr-4 -mt-1.5">+</span>New Location
            </span>
          </div>

          <div class="w-full flex space-x-7 mt-4" v-for="(item, index) in newspecials.locations" :key="index">
            <div class="w-full dflex mb-3">
              <div class="w-10 h-10">
                <house-icon />
              </div>
              <span>{{ item.name }}</span>
            </div>
            <delete-icon class="fill-current text-danger cursor-pointer" @click="deleteItem(item.id)" />
          </div>


        </v-form>
      </cornie-card-text>

      <cornie-card>
        <cornie-card-text class="flex justify-end">
          <cornie-btn @click="show = false" class="border-primary border-2 px-6 mr-3 rounded-xl text-primary">
            Cancel
          </cornie-btn>
          <cornie-btn @click="show = false" class="text-white bg-danger px-6 rounded-xl">
            Save
          </cornie-btn>

        </cornie-card-text>
      </cornie-card>
    </cornie-card>

  </cornie-dialog>
  <new-location v-model="showLocationModal" @location-added="specialadded" :specilatyId="specilatyId" />
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import CornieCard from "@/components/cornie-card";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import ArrowLeftIcon from "@/components/icons/arrowleft.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { cornieClient } from "@/plugins/http";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import CancelIcon from "@/components/icons/CloseIcon.vue";
import CloseIcon from "@/components/icons/whitecancel.vue";
import { namespace } from "vuex-class";
import Multiselect from "@vueform/multiselect";
import CornieSelect from "@/components/cornieselect.vue";
import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
import Avatar from "@/components/avatar.vue";
import DeleteIcon from "@/components/icons/delete.vue";
import NewLocation from './newlocation.vue';
import HouseIcon from "@/components/house.vue";
import ISpecial from "@/types/ISpecial";

const special = namespace("special");

@Options({
  name: "manageLocation",
  components: {
    ...CornieCard,
    CornieIconBtn,
    ArrowLeftIcon,
    Multiselect,
    CancelIcon,
    CornieDialog,
    Avatar,
    HouseIcon,
    NewLocation,
    SearchIcon,
    DeleteIcon,
    IconInput,
    CornieBtn,
    CornieSelect,
    CloseIcon
  },
})
export default class manageLocation extends Vue {
  @PropSync("modelValue", { type: Boolean, default: false })
  show!: boolean;

  @Prop({ type: String, default: "" })
  id!: string;

  @Prop({ type: String, default: "" })
  specilatyId!: string;



  loading = false;
  showPractitionerModal = false;
  showLocationModal = false;


  @special.Action
  getSpecialById!: (id: string) => Promise<ISpecial>;

  @special.State
  specials!: ISpecial[];

  @special.Action
  fetchSpecials!: () => Promise<void>;

  newspecials = [] as any;

  @Watch("specilatyId")
  idChanged() {
    this.setLocation();
  }

  async setLocation() {
    const location = await this.getSpecialById(this.specilatyId);
    if (!location) return;
    this.newspecials = location;
  }



  async deleteItem(value: string) {
    const confirmed = await window.confirmAction({
      message: "You are about to delete this Location",
    });
    if (!confirmed) return;
    try {
      const response = await cornieClient().delete(
        `/api/v1/specialty/location/${this.specilatyId}`,
        { locations: [value] }
      );
      if (response.success) {
        this.done();
        window.notify({ msg: "Location deleted successfully", status: "success" });
      }
    } catch (error) {
      window.notify({ msg: "Location not deleted", status: "error" });
    }
  }
  async specialadded() {
    await this.fetchSpecials();
  }


  done() {
    this.$emit("location-added");
    this.show = false;
  }

  async created() {
    await this.setLocation();
    await this.fetchSpecials();
  }
}
</script>
<style src="@vueform/multiselect/themes/default.css">
</style>
<style>
.dflex {
  display: -webkit-box;
}

.multiselect-option.is-selected {
  background: #fe4d3c;
  color: var(--ms-option-color-selected, #fff);
}

.multiselect-option.is-selected.is-pointed {
  background: var(--ms-option-bg-selected-pointed, #fe4d3c);
  color: var(--ms-option-color-selected-pointed, #fff);
}

.multiselect-option.is-selected {
  background: var(--ms-option-bg-selected, #fe4d3c);
  color: var(--ms-option-color-selected, #fff);
}

.multiselect {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  border: var(--ms-border-width, 1px) solid var(--ms-border-color, #d1d5db);
  border-radius: var(--ms-radius, 4px);
  background: var(--ms-bg, #fff);
  font-size: var(--ms-font-size, 1rem);
  min-height: calc(var(--ms-border-width, 1px) * 2 + var(--ms-font-size, 1rem) * var(--ms-line-height, 1.375) + var(--ms-py, 0.5rem) * 2);
}

.multiselect-tags {
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  margin: var(--ms-tag-my, 0.25rem) 0 0;
  padding-left: var(--ms-py, 0.5rem);
  align-items: center;
}

.multiselect-tag.is-user {
  padding: 5px 12px;
  border-radius: 22px;
  background: #080056;
  margin: 3px 3px 8px;
  position: relative;
  left: -10px;
}

/* .multiselect-clear-icon {
      -webkit-mask-image: url("/components/icons/chevrondownprimary.vue");
      mask-image: url("/components/icons/chevrondownprimary.vue");
      background-color: #080056;
      display: inline-block;
      transition: .3s;
  } */

.multiselect-placeholder {
  font-size: 0.8em;
  font-weight: 400;
  font-style: italic;
  color: #667499;
}

.multiselect-caret {
  transform: rotate(0deg);
  transition: transform 0.3s;
  -webkit-mask-image: url("../../../../assets/img/Chevron.png");
  mask-image: url("../../../../assets/img/Chevron.png");
  background-color: #080056;
  margin: 0 var(--ms-px, 0.875rem) 0 0;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
  flex-grow: 0;
  pointer-events: none;
}

.multiselect-tag.is-user img {
  width: 18px;
  border-radius: 50%;
  height: 18px;
  margin-right: 8px;
  border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
  color: #ffffff;
  border-radius: 50%;
}

.multiselect-tag-remove {
  display: flex;
  align-items: center;
  /* border: 1px solid #fff;
    background: #fff; */
  border-radius: 50%;
  color: #fff;
  justify-content: center;
  padding: 0.77px;
  margin: var(--ms-tag-remove-my, 0) var(--ms-tag-remove-mx, 0.5rem);
}
</style>
