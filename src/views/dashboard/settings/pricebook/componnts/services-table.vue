<template>
    <div class="container-fluid">
        <div class="w-full">
            <cornie-table
                v-model="items"
                :columns="headers"
            >
                <template #name="{ item }">
                    <div class="text-no-wrap flex items-center uppercase text-xs " style="white-space:nowrap">
                        <Avatar /> 
                        <span class="ml-2">{{ item.name }}</span>
                    </div>
                </template>
                <template #itemCode-header>
                    <div class="text-no-wrap flex uppercase text-xs" style="white-space:nowrap">Item Code</div>
                </template>
                <template #unitOfSales-header>
                    <div class="text-no-wrap flex uppercase text-xs" style="white-space:nowrap">Unit Of Sales</div>
                </template>
                <template #unitPrice-header>
                    <div class="text-no-wrap flex uppercase text-xs" style="white-space:nowrap">Unit Price</div>
                </template>
                <template #actions="{ item }">
                    <table-action
                    @click="() => $router.push({ name: 'New Service', params: { serviceId: item.id } })"
                    >
                    <newview-icon class="text-yellow-500 fill-current" />
                    <span class="ml-3 text-xs">View</span>
                    </table-action>
                    <table-action
                    @click="() => $router.push({ name: 'New Service', params: { serviceId: item.id } })"
                    >
                    <edit-icon class="text-primary fill-current" />
                    <span class="ml-3 text-xs">Edit</span>
                    </table-action>
                    <table-action
                    >
                    <analytics-icon class="text-primary fill-current" />
                    <span class="ml-3 text-xs">Analytics</span>
                    </table-action>
                    
                    <table-action
                    >
                    <deactivate-icon class="text-primary fill-current" />
                    <span class="ml-3 text-xs">Deactivate</span>
                    </table-action>
                </template>
            </cornie-table>
        </div>
    </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import CornieTable from "@/components/cornie-table/CornieTable.vue";
import TableAction from "@/components/table-action.vue";
import Avatar from "@/components/avatar.vue"
import AddIcon from "@/components/icons/add-green.vue"
import NewviewIcon from "@/components/icons/newview.vue";
import AnalyticsIcon from "@/components/icons/analytics.vue"
import EditIcon from "@/components/icons/edit-purple.vue"
import DeactivateIcon from "@/components/icons/deactivate.vue"
import { Prop } from 'vue-property-decorator';
import ICatalogueService from '@/types/ICatalogue';
import { namespace } from 'vuex-class';

const catalogue = namespace('catalogues');

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
    }
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
      title: "Unit Of Sales",
      key: "unitOfSales",
      show: true,
    },
    {
      title: "Unit Price",
      key: "unitPrice",
      show: true,
    },
    {
      title: "Discount Limit",
      key: "discountLimit",
      show: true,
    },
    {
      title: "Last Updated",
      key: "lastUpdated",
      show: true,
    },
  ];

  @catalogue.Action
  deleteService!: (serviceId: string) => Promise<boolean>;

  @Prop({ type: Array, default: [ ]})
  items!: ICatalogueService[]

  async onDelete(serviceId: string) {
    try {
      const confirmed = await window.confirmAction({
        message: "Are you sure you want to deacttivate this srvice?",
        title: "Deactivate Service",
      });
      if (confirmed) {
        const response = await this.deleteService(serviceId);
        console.log(response, "IN COMP");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
