<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-screen">
    <cornie-card height="100%" class="flex flex-col bg-white">
      <cornie-card-title>
        <div class="w-full flex items-center justify-between">
          <div class="w-full flex items-center">
            <span class="pr-2 flex items-center cursor-pointer border-r-2">
              <cornie-icon-btn @click="$emit('close-access-diag')">
                <arrow-left-icon />
              </cornie-icon-btn>
            </span>

            <h2 class="font-bold text-lg text-primary ml-3 -mt-0.5">
              Location(s) & privileges
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
                :items="practitionerRoles"
                v-model="role"
                label="Role"
                placeholder="--Select--"
                class="w-full"
              />
            </div>
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

            <!-- <div class="col-span-12">
              <span class="text-primary text-sm font-semibold mb-5"> Available Days </span>
              <div class="grid grid-cols-7 gap-4 w-full mt-4">
                <div :class="{'active' : isActiveMon}" @click="setActive('mon')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Mon
                </div>
                <div :class="{'active' : isActiveTue}" @click="setActive('tue')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Tue
                </div>
                <div :class="{'active' : isActiveWed}" @click="setActive('wed')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Wed
                </div>
                <div :class="{'active' : isActiveThu}" @click="setActive('thu')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Thu
                </div>
                <div :class="{'active' : isActiveFir}" @click="setActive('fri')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Fri
                </div>
                <div :class="{'active' : isActiveSat}" @click="setActive('sat')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                 Sat
                </div>
                 <div :class="{'active' : isActiveSun}" @click="setActive('sun')" class="cursor-pointer border font-medium border-gray-300 rounded py-2 px-6 text-center justify-center flex text-xs">
                  Sun
                </div>

              </div>
            </div> -->
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
            <div class="col-span-12 pt-4">
              <div class="text-sm font-bold mb-5 uppercase">
                Change default location
              </div>
              <template v-if="accessRoles.length">
                <div v-if="id">
                  <div
                    class="flex justify-between mb-4"
                    v-for="(access, index) in accessRoles"
                    :key="index"
                  >
                    <div class="flex justify-center items-center">
                      <cornie-radio
                        v-model="accessRoles[index].default"
                        name="default"
                        :value="true"
                        @update:modelValue="setDefault(access.locationId)"
                      ></cornie-radio>
                      <div class="flex flex-col">
                        DEfault {{ accessRoles[index].default }}
                        <div class="mb-0 font-bold text-sm">
                          {{
                            access.location.name
                              ? access.location.name
                              : access.location
                          }}
                          <!-- <span class="ml-5 text-gray-400 text-xs font-light">
                            {{ isActiveMon ? data?.mon : '' }} {{isActiveTue ? data?.tue : ''}}  {{isActiveWed ? data?.wed : ''}}
                              {{isActiveThu ? data?.thu : ''}}  {{isActiveFir ? data?.fri : ''}}  {{isActiveSat ? data?.sat : ''}}
                              {{isActiveSun ? data?.sun : ''}}
                          </span> -->
                        </div>
                        <div class="text-xs text-gray-400">
                          {{ getRoleName(access.roleId) }}
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-center items-center">
                      <button class="border-0 mr-5">
                        <edit-icon
                          class="fill-current text-primary"
                          @click="editRole(access.roleId, access.locationId)"
                        />
                      </button>
                      <button class="border-0" @click="deleteItem(access.id)">
                        <delete-red />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  v-else
                  class="flex justify-between mb-4"
                  v-for="(access, index) in accessRoles"
                  :key="index"
                >
                  <div class="flex justify-center items-center">
                    <cornie-radio
                      v-model="defaultVal"
                      name="default"
                      :value="`${access.roleId}?${access.locationId}`"
                      @update:modelValue="setDefault"
                    ></cornie-radio>
                    <div class="flex flex-col">
                      <div class="mb-0 font-bold text-sm">
                        {{ access.location }}
                      </div>
                      <div class="text-xs text-gray-400">{{ access.role }}</div>
                    </div>
                  </div>
                  <div class="flex justify-center items-center">
                    <button class="border-0 mr-5">
                      <edit-icon
                        class="fill-current text-primary"
                        @click="editRole(access.roleId, access.locationId)"
                      />
                    </button>
                    <button class="border-0" @click="deleteRoleAccess(index)">
                      <delete-red />
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </cornie-card-text>
      <div class="flex justify-end mx-4 mt-auto mb-4">
        <cornie-btn
          @click="show = false"
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
  import CornieSelect from "@/components/autocomplete.vue";
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
  import { cornieClient } from "@/plugins/http";
  import IPractitioner, {
    PractitionerLocationRole,
  } from "@/types/IPractitioner";
  import { Options, Vue } from "vue-class-component";
  import { Prop, PropSync, Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { string } from "yup";

  const dropdown = namespace("dropdown");
  const roles = namespace("roles");
  const practitioner = namespace("practitioner");

  @Options({
    name: "Accessrole",
    components: {
      ...CornieCard,
      CornieIconBtn,
      ArrowLeftIcon,
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
  export default class Accessrole extends Vue {
    @PropSync("modelValue", { type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String, default: "" })
    id!: string;

    @Prop({ type: String, default: "" })
    locationId!: string;

    @Prop({ type: String, default: "" })
    roleId!: string;

    @Prop({ type: String, default: "" })
    locationRoleId!: string;

    @Prop({ type: String, default: "" })
    updatedBy!: string;

    @Prop({ type: Object, default: {} })
    deletedRole!: any;

    @Prop({ type: Object, default: {} })
    setRoles!: any;

    @Prop({ type: String, default: "" })
    currentStatus!: string;

    @Prop({ type: String, default: "" })
    updateDate!: string;

    required = string().required();

    status = "";
    loading = false;
    expand = false;
    isActive = false;
    isVisible = "";
    location = "";
    role = "";
    locations = [];
    defaultVal = "";
    isDefault = false;

    isActiveMon = false;
    isActiveTue = false;
    isActiveWed = false;
    isActiveThu = false;
    isActiveFir = false;
    isActiveSat = false;
    isActiveSun = false;
    data = {} as any;

    accessRoles = [] as any;
    payloadAccessroles = [] as any;

    @dropdown.Action
    getDropdowns!: (a: string) => Promise<IIndexableObject>;

    @roles.State
    roles!: { id: string; name: string }[];

    @roles.Action
    getRoles!: () => Promise<void>;

    @practitioner.Action
    getPractitionerById!: (id: string) => Promise<IPractitioner>;

    @practitioner.Action
    deleteLocationrole!: ({ id, roleId }: any) => Promise<boolean>;

    get allLocation() {
      if (!this.locations || this.locations.length === 0) return [];
      return this.locations.map((i: any) => {
        return {
          code: i.id,
          display: i.name,
        };
      });
    }

    @practitioner.Action
    getPractitionerRoleById!: (id: string) => PractitionerLocationRole;

    @Watch("setRoles")
    roleChanged() {
      this.setnewRoles();
    }

    @Watch("id")
    idChanged() {
      this.setAccessroles();
    }

    async setnewRoles() {
      const newrole = this.setRoles;
      this.accessRoles = newrole;
    }

    async setAccessroles() {
      const practitioner = await this.getPractitionerById(this.id);
      if (!practitioner) return;
      this.accessRoles = practitioner.locationRoles;
    }
    get allaction() {
      return this.roleId ? "Edit" : "Add";
    }

    @Watch("deletedRole")
    deleteRole() {
      if (this.deletedRole === {}) return;

      this.accessRoles = [
        ...this.accessRoles.filter(
          (item: any) =>
            item.roleId !== this.deletedRole.roleId &&
            item.locationId !== this.deletedRole.locationId
        ),
      ];

      this.$emit("role-deleted");
    }
    get payload() {
      return {
        ...this.accessRoles,
      };
    }

    getRoleName(id: string) {
      const pt = this.roles.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }
    editRole(locationId: string, roleId: string) {
      this.location = locationId;
      this.role = roleId;
    }

    async add() {
      if (this.role && this.location) {
        // const added = this.accessRoles.some(
        //   (item: any) =>
        //     item.roleId === this.role && item.locationId === this.location
        // );

        // if (added) {
        //   this.location = "";
        //   this.role = "";
        //   return;
        // }
        //this.setDefault(this.location as string);
        let access = {
          roleId: this.role,
          locationId: this.location,
          role: this.practitionerRoles.find((item) => item.code === this.role)
            ?.display,
          location: this.allLocation.find((item) => item.code === this.location)
            ?.display,
          default: this.isDefault,
          // days: this.data
        };
        let accessRoles = {
          id: this.id,
          roleId: this.role,
          locationId: this.location,
          default: this.isDefault,
        };
        this.accessRoles.push(access);
        this.payloadAccessroles.push(accessRoles);

        this.location = "";
        this.role = "";
      }
    }
    async submit() {
      this.loading = true;
      if (this.id) await this.apply();
      else await this.save();
      this.loading = false;
    }

    async apply() {
      this.loading = true;
      if (this.locationRoleId) await this.updateRole();
      else await this.createRole();
      this.loading = false;
    }

    async createRole() {
      try {
        const response = await cornieClient().post(
          `/api/v1/practitioner/location-roles/${this.id}`,
          this.payloadAccessroles
        );
        if (response.success) {
          window.notify({
            msg: "Practitioner role created",
            status: "success",
          });
          if (!this.accessRoles.length) return;
          this.$emit("add-access-roles", this.accessRoles);
          this.$emit("close-access-diag");
          this.loading = false;
          this.show = false;
        }
      } catch (error: any) {
        this.loading = false;
        // console.log(error.response.data);
      }
    }

    async updateRole() {
      const url = `/api/v1/practitioner/location-roles/${this.locationRoleId}`;
      const payload = { locationId: this.locationId, roleId: this.roleId };
      try {
        const response = await cornieClient().put(url, payload);
        if (response.success) {
          window.notify({
            msg: "Practitioner role updated",
            status: "success",
          });
          this.show = false;
        }
      } catch (error: any) {
        window.notify({ msg: error.response.data.message, status: "error" });
      }
    }

    async deleteRoleAccess(index: number) {
      const confirmed = await window.confirmAction({
        message:
          "Are you sure you want to delete this location role? This action cannot be undone.",
        title: "Delete location role",
      });
      if (!confirmed) return;
      this.accessRoles.splice(index, 1);
    }

    async deleteItem(roleId: string) {
      console.log(this.id, roleId, "role");
      const id = this.id;
      const confirmed = await window.confirmAction({
        message:
          "Are you sure you want to delete this location role? This action cannot be undone.",
        title: "Delete location role",
      });
      if (!confirmed) return;
      if (await this.deleteLocationrole({ id, roleId }))
        window.notify({ msg: "Location role deleted", status: "success" });
      else window.notify({ msg: "Location role not deleted", status: "error" });
    }

    get practitionerRoles() {
      return this.roles.map((role) => ({ code: role.id, display: role.name }));
    }

    // async setDefault(val: string) {

    //   const [roleId, locationId] = val.split("?");
    //   let item = this.accessRoles.find(
    //     (item: any) => item.roleId === roleId && item.locationId === locationId
    //   );

    //   if (item) item.default = true;
    // }

    async setDefault(location: string) {
      if (!this.id) return;
      const url = `/api/v1/practitioner/location-roles/default/`;
      const body = {
        locationId: location,
        practitionerId: this.id,
      };
      try {
        const response = await cornieClient().patch(url, body);
        if (response.success) {
          this.isDefault = true;
          console.log("Default set");
        }
      } catch (error) {
        this.isDefault = false;
        window.notify({ msg: "Cannot set default location", status: "error" });
      }
    }

    async save() {
      if (!this.accessRoles.length) return;
      this.$emit("add-access-roles", this.accessRoles);
      this.$emit("close-access-diag");
    }

    async fetchLocation() {
      const AllLocation = cornieClient().get(
        "/api/v1/location/myOrg/getMyOrgLocations"
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
  /* .active {
  background: #080056;
  border: 1px solid #080056;
  color: #fff;
} */
</style>
