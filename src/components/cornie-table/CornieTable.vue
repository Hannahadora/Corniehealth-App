<template>
  <div>
    <div class="flex">
      <slot name="topleft">
      <span class="flex items-center">
        <sort-icon class="mr-5" />
        <icon-input
          class="border border-gray-600 rounded-full focus:outline-none"
          type="search"
          placeholder="Search Table"
          v-model="query"
        >
          <template v-slot:prepend>
            <search-icon />
          </template>
        </icon-input>
      </span>
      </slot>
      <cornie-spacer />
      <span class="flex justify-between items-center">
        <dots-horizontal-icon class="mr-7" />
        <print-icon class="mr-7" />
        <refresh-icon class="mr-7" />
        <filter-icon class="cursor-pointer" @click="$emit('filter')" />
      </span>
    </div>
    <card class="mt-3">
      <table class="w-full" style="border-radius: 5px">
        <thead class="bg-accent p-4 text-primary">
          <th class="text-left p-2" width="1" v-if="check">
            <cornie-checkbox @click="selectAll" v-model="selectedAll" />
          </th>
          <th class="text-left p-2" width="1">
            <span> # </span>
          </th>
          <template v-for="(column, index) in preferredColumns" :key="index">
            <th class="text-left p-3" v-if="column.show">
              <div class="flex items-center">
                <slot :name="`${column.key}-header`">
                  <span class="uppercase text-xs">
                    {{ column.title }}
                  </span>
                </slot>
                <filter-by-icon
                  class="ml-2 cursor-pointer"
                  @click="setOrderBy(column.orderBy)"
                />
              </div>
            </th>
          </template>
          <th class="text-left p-2" width="1">
            <table-settings-icon
              class="text-primary cursor-pointer"
              @click="showColumnFilter = true"
            />
          </th>
        </thead>
        <tr
          v-for="(row, index) in filteredItems"
          :key="index"
          class="border-t-2 border-y-gray"
        >
          <td class="p-2" v-if="check">
            <cornie-checkbox @click="select(row)" :checked="isSelected(row)" />
          </td>
          <td class="p-2">{{ index }}</td>
          <template v-for="(column, index) in preferredColumns" :key="index">
            <td class="p-3 text-sm" v-if="column.show">
              <slot :name="column.key" :item="row" :index="index">
                {{ row[column.key] }}
              </slot>
            </td>
          </template>
          <td>
            <div class="flex justify-center">
              <cornie-menu top="30px" right="100%">
                <template #activator="{ on }">
                  <icon-btn v-on="on">
                    <dots-vertical-icon />
                  </icon-btn>
                </template>
                <card-text>
                  <slot name="actions" :item="row" :index="index" />
                </card-text>
              </cornie-menu>
            </div>
          </td>
        </tr>
      </table>
    </card>
    <column-filter
      :columns="columns"
      v-model:preferred="preferredColumns"
      v-model:visible="showColumnFilter"
    />
  </div>
</template>

<script src="./CornieTable.ts"></script>

<style scoped>
table {
}
</style>
