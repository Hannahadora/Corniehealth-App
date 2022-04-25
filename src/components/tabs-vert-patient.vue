<template>
  <div
    v-for="(tab, index) in items"
    :key="`tab-${index}`"
    class="
      px-1
      py-0.5
      my-2
      border-l-2
      text-sm
      cursor-pointer
      hover:bg-gray-300 hover:bg-opacity-20
      block
    "
    :class="
      syncedValue == index
        ? ['border-danger font-bold h-6']
        : ['border-transparent text-gray-400']
    "
    @click="syncedValue = index"
  >
    <span v-if="index === 0 || index === 1 || index === 2">
      {{ tab.name }}
    </span>
    <div v-else class="flex space-x-4 cursor-pointer" @click="expand = !expand">
      {{ tab.name }}
      <div class="mt-5 w-full flex justify-end">
        <div v-if="expand" class>
          <chevron-down-icon
            class="cursor-pointer stroke-current -mt-4"
            :class="{ 'text-primary': expand }"
            @click="expand = false"
          />
        </div>
        <div v-else>
          <chevron-right-icon
            class="cursor-pointer stroke-current -mt-4"
            :class="{ 'text-primary': expand }"
            @click="expand = true"
          />
        </div>
      </div>
    </div>
  </div>
    <div v-if="expand && syncedValue == 3">
      <div v-for="(setting, key, i) in organization" :key="i">
        <s-bar-link
          :name="setting.name"
          :to="mapUrl(setting.to)"
        >
          
          <template v-slot="{ active }">
            <keep-alive>
              <component
                :is="setting.icon"
                :class="{ 'fill-current': active }"
              >
              </component>
            </keep-alive>
          </template>
        </s-bar-link>
      </div>

      <!-- <router-link
        v-for="(child, i) in tab.children"
        :key="i"
        :to="child.to"
        :class="!syncedValue == 3 ? ['text-gray-400'] : ['border-transparent']"
        class="
          text-sm
          cursor-pointer
          text-gray-400
          hover:bg-gray-400
          py-4
          px-4
          rounded-lg
          hover:bg-opacity-10
          block
        "
        active-class="bg-gray-100 font-bold"
      >
        {{ child.name }}
      </router-link> -->
    </div>
  <!-- <tab :vnode="$slots.default()[syncedValue]" /> -->
</template>

<script lang="ts">
import { VNode } from "@vue/runtime-core";
import { Vue, Options } from "vue-class-component";
import { Prop, PropSync } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { getPracticeNav } from "@/features/navigation";

import SBarLink from "./patientsidebarlink.vue";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondownprimary.vue";
import { AccountMeta } from "@/types/user";

const user = namespace("user");
type INav = { name: string; to: string; icon: string };
@Options({
  name: "tab",
})
class Tab extends Vue {
  @Prop()
  vnode!: VNode;

  render() {
    return this.vnode;
  }
}
interface ISidebarLink {
  name: string;
  to: string | { name: string };
  icon?: string;
  hasSubsection: boolean;
  children?: ISidebarLink[];
}

@Options({
  name: "tabs",
  components: {
    Tab,
    SBarLink,
    ChevronRightIcon,
    ChevronDownIcon,
  },
})
export default class Tabs extends Vue {
  @Prop()
  items!: string[];

  @Prop()
  subsection!: any;

  @Prop({ type: Boolean, default: false })
  tabshowdrop!: boolean;

  @PropSync("modelValue", { type: Number, default: 0 })
  syncedValue!: number;

  @user.Getter
  accountMeta!: AccountMeta;

  expand = false;
  query = "";

  get organization() {
    return [
      {
        name: "Appointments",
        to: "transactions/appointments",
        icon: "",
      },
        {
          name: "Specialist Referrals",
          to: "transactions/specialist",
        },
        {
          name: "Visits",
          to: "transactions/visits",
        },
        {
          name: "Medications",
          to: "transactions/medications",
        },
        {
          name: "Diagnostics",
          to: "transactions/diagnostics",
        },
        {
          name: "Bills",
          to: "transactions/bills",
        },
    ];
  }

  get settings() {
    const provider = {
      Organization: this.filter(this.organization as any),
    };
    return provider;
  }

  mapUrl(url: string) {
    const settingsBase = this.$router.resolve({
      name: "View Patient",
    }).href;
    // const settingsBase = this.$router.resolve({ name: "Patient EHR" }).href;
    return `${settingsBase}/${url}`.replace("//", "/");
  }
  filter(navs: INav[]) {
    if (!this.query) return navs;
    return navs.filter((nav) =>
      nav.name.toLowerCase().includes(this.query.toLowerCase())
    );
  }

  isActive(index: number): boolean {
    return index == this.syncedValue;
  }

  mounted() {}
}
</script>
