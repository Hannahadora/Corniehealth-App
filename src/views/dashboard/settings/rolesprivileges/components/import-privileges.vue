<template>
  <div class="w-full px-4">
    <div class="container my-4">
      <h1 class="font-bold text-2xl">Import privileges from existing roles</h1>
    </div>

    <div class="container border-b-dashed pb-5">
      <p>
        You can copy access control settings from other roles. This helps reduce
        the repetitive work and saves time.
      </p>
    </div>

    <div class="container my-4">
      <h2 class="font-bold text-lg">Select Role to Import from:</h2>
    </div>
    <div class="container my-4">
      <icon-input
        class="border border-gray-600 rounded-full focus:outline-none"
        type="search"
        v-model="search"
      >
        <template v-slot:prepend>
          <search-icon />
        </template>
      </icon-input>
      <!-- <CornieInput class="rounded-full w-full" /> -->
    </div>

    <div class="w-full">
      <div class="container">
        <p class="italic text-sm my-2" style="color: #6f6c93">
          {{
            `${items.length ? items.length : ""} ${
              items.length > 1 ? "results" : items.length === 1 ? "result" : ""
            }`
          }}
        </p>
      </div>
    </div>
    <div class="w-full flex py-3" id="rolesLine">
      <div class="container px-2" v-for="(role, index) in items" :key="index">
        <ImportRoleCard :role="role" />
      </div>
    </div>

    <div class="w-full border-b-dashed mb-6 mt-3"></div>

    <div class="container mt-4">
      <h2 class="font-bold text-lg">Privileges</h2>
    </div>
    <div class="container my-4">
      <p class="italic text-base flex justify-center" style="color: #6f6c93">
        Select a role to see privileges which you can import.
      </p>
    </div>

    <div class="container mt-4">
      <Accordion title="Accounting" v-model="showAccounting">
        <template v-slot:title>
          <p class="flex justify-between"><span>Accounting </span></p>
        </template>
        <template v-slot:default>
          <div class="container my-3 p-3">
            <span class="flex items-center">
              <ToggleCheck :checkedText="''" :uncheckedText="''" />
              <span class="ml-2 font-semibold"
                >Allow access to this module</span
              >
            </span>
          </div>

          <div class="w-full px-3">
            <div class="container flex justify-between flex-auto">
              <div class="w-full flex items-center">
                <div class="border-b-2 w-full"></div>
              </div>
              <div class="w-3/12 flex justify-end">
                <span class="flex">
                  <div class="box_1 flex justify-center">
                    <span class="text-white font-bold">—</span>
                  </div>
                  <span class="ml-2">Access All Privileges</span>
                </span>
              </div>
            </div>
          </div>

          <div class="container">
            <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
          </div>
          <div class="w-full px-3">
            <div class="container border rounded-md flex mb-2 py-3">
              <div class="w-4/12">
                <div class="container p-3">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
              <div class="w-4/12">
                <div class="container side_border p-3" id="sideBorder">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
              <div class="w-4/12">
                <div class="container p-3">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Accordion>

      <Accordion title="Analytics" v-model="showAnalytics">
        <template v-slot:title>
          <p class="flex justify-between"><span>Analytics </span></p>
        </template>
        <template v-slot:default>
          <div class="container my-3 p-3">
            <span class="flex items-center">
              <ToggleCheck :checkedText="''" :uncheckedText="''" />
              <span class="ml-2 font-semibold"
                >Allow access to this module</span
              >
            </span>
          </div>

          <div class="w-full px-3">
            <div class="container flex justify-between flex-auto">
              <div class="w-full flex items-center">
                <div class="border-b-2 w-full"></div>
              </div>
              <div class="w-3/12 flex justify-end">
                <span class="flex">
                  <div class="box_1 flex justify-center">
                    <span class="text-white font-bold">—</span>
                  </div>
                  <span class="ml-2">Access All Privileges</span>
                </span>
              </div>
            </div>
          </div>

          <div class="container">
            <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
          </div>
          <div class="w-full px-3">
            <div class="container border rounded-md flex mb-2 py-3">
              <div class="w-4/12">
                <div class="container p-3">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
              <div class="w-4/12">
                <div class="container side_border p-3" id="sideBorder">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
              <div class="w-4/12">
                <div class="container p-3">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Accordion>

      <Accordion title="Billing and Payments" v-model="showBilling">
        <template v-slot:title>
          <p class="flex justify-between"><span>Billing and Payments </span></p>
        </template>
        <template v-slot:default>
          <div class="container my-3 p-3">
            <span class="flex items-center">
              <ToggleCheck :checkedText="''" :uncheckedText="''" />
              <span class="ml-2 font-semibold"
                >Allow access to this module</span
              >
            </span>
          </div>

          <div class="w-full px-3">
            <div class="container flex justify-between flex-auto">
              <div class="w-full flex items-center">
                <div class="border-b-2 w-full"></div>
              </div>
              <div class="w-3/12 flex justify-end">
                <span class="flex">
                  <div class="box_1 flex justify-center">
                    <span class="text-white font-bold">—</span>
                  </div>
                  <span class="ml-2">Access All Privileges</span>
                </span>
              </div>
            </div>
          </div>

          <div class="container">
            <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
          </div>
          <div class="w-full px-3">
            <div class="container border rounded-md flex mb-2 py-3">
              <div class="w-4/12">
                <div class="container p-3">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
              <div class="w-4/12">
                <div class="container side_border p-3" id="sideBorder">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
              <div class="w-4/12">
                <div class="container p-3">
                  <Checkbox :label="'Create shift shedules'" />
                  <Checkbox :label="'Create shift shedules'" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Accordion>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
// import CornieInput from '@/components/cornieinput.vue'
import ImportRoleCard from "./import-role-card.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { namespace } from "vuex-class";
import Accordion from "@/components/accordion-component.vue";

const roles = namespace("roles");

@Options({
  components: {
    // CornieInput,
    ImportRoleCard,
    IconInput,
    SearchIcon,
    Accordion,
  },
})
export default class RolesAndPrivileges extends Vue {
  search = "";
  showAccounting = false;
  showAnalytics = false;
  showBilling = false;

  @roles.State
  roles!: any[];

  @roles.Action
  getRoles!: () => Promise<boolean>;

  craeted() {
    if (!this.roles) this.getRoles();
  }

  get items() {
    if (!this.search) return this.roles;
    return this.roles.filter((i: any) =>
      i.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
</script>
<style>
.border-b-dashed {
  border-bottom: 1px dashed #c5c4d4;
}

#rolesLine {
  overflow-x: scroll;
}

#rolesLine::-webkit-scrollbar {
  height: 5px;
}
</style>
