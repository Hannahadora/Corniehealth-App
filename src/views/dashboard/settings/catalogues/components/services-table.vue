<template>
  <div class="container-fluid">
    <div class="w-full">
      <cornie-table v-model="items" :columns="headers">
        <template #name="{ item }">
          <div
            class="text-no-wrap flex items-center uppercase text-xs"
            style="white-space: nowrap"
          >
            <Avatar />
            <span class="ml-2">{{ item.name }}</span>
          </div>
        </template>
        <template #itemCode-header>
          <div
            class="text-no-wrap flex uppercase text-xs"
            style="white-space: nowrap"
          >
            Item Code
          </div>
        </template>
        <template #status="{ item }">
          <div class="text-no-wrap">
            <span
              class="status p-1"
              :class="{
                active: item.status === 'active',
                inactive: item.status === 'inactive',
              }"
            >
              {{ item.status }}</span
            >
          </div>
        </template>
        <template #actions="{ item }">
          <table-action
            @click="
              () =>
                $router.push({
                  name: 'New Service',
                  params: { serviceId: item.id },
                })
            "
          >
            <newview-icon class="text-yellow-500 fill-current" />
            <span class="ml-3 text-xs">View</span>
          </table-action>
          <table-action
            @click="
              () =>
                $router.push({
                  name: 'New Service',
                  params: { serviceId: item.id },
                })
            "
          >
            <edit-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs">Edit</span>
          </table-action>
          <table-action @click="onDelete(item.id)">
            <deactivate-icon class="text-primary fill-current" />
            <span class="ml-3 text-xs">Deactivate</span>
          </table-action>
        </template>
      </cornie-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import TableAction from "@/components/table-action.vue";
import Avatar from "@/components/avatar.vue";
import AddIcon from "@/components/icons/add-green.vue";
import NewviewIcon from "@/components/icons/newview.vue";
import AnalyticsIcon from "@/components/icons/analytics.vue";
import EditIcon from "@/components/icons/edit-purple.vue";
import DeactivateIcon from "@/components/icons/deactivate.vue";
import { Prop } from "vue-property-decorator";
import ICatalogueService from "@/types/ICatalogue";
import { namespace } from "vuex-class";

const catalogue = namespace("catalogues");

@Options({
  components: {
    CornieTable,
    TableAction,
    Avatar,
    AddIcon,
    NewviewIcon,
    AnalyticsIcon,
    EditIcon,
    DeactivateIcon,
  },
})
export default class ServicesTable extends Vue {
  headers = [
    {
      title: "Name",
      key: "name",
      show: true,
    },
    {
      title: "Item Code",
      key: "itemCode",
      show: true,
    },
    {
      title: "Category",
      key: "category",
      show: true,
    },
    {
      title: "Sub Category",
      key: "subCategory",
      show: true,
    },
    {
      title: "Description",
      key: "description",
      show: true,
    },
    {
      title: "Last Updated",
      key: "lastUpdated",
      show: true,
    },
    {
      title: "Status",
      key: "status",
      show: true,
    },
  ];

  @catalogue.Action
  deleteService!: (serviceId: string) => Promise<boolean>;

  @Prop({ type: Array, default: [] })
  items!: ICatalogueService[];

  async onDelete(serviceId: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "Are you sure you want to deacttivate this srvice?",
        title: "Deactivate Service",
      });
      if (confirmed) {
        const response = await this.deleteService(serviceId);
      }
    } catch (error) {}
  }
}
</script>
<style scoped>
* {
  font-family: Inter;
  font-style: normal;
}

.status {
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}

.bolder {
  font-weight: 600;
  color: #fe4d3c;
}

.active {
  color: #35ba83;
  background: rgba(53, 186, 131, 0.08);
  border-radius: 5px;
}

.inactive {
  color: #fe4d3c;
  background: rgba(254, 77, 60, 0.08);
  border-radius: 5px;
}
</style>
