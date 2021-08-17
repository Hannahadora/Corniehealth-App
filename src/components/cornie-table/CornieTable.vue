<template>
  <div>
    <div class="flex">
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
      <cornie-spacer/>
      <span class="flex justify-between items-center">
        <dots-horizontal-icon class="mr-7"/>
        <print-icon class="mr-7" />
        <refresh-icon class="mr-7" />
        <filter-icon class="cursor-pointer" @click="showColumnFilter = true" />
      </span>
    </div>
    <table class="w-full mt-3">
      <thead class="bg-accent p-4 text-primary">
        <th class="text-left p-2" width="1">
          <cornie-checkbox @click="selectAll" v-model="selectedAll"/>
        </th>
        <th class="text-left p-2" width="1">
          <span> # </span>
        </th>
        <template v-for="(column, index) in columns" :key="index">
          <th class="text-left p-3 run" v-if="column.show">
            <span class="flex items-center uppercase text-xs"> 
              {{column.title}} 
              <filter-by-icon class="ml-2" @click="setOrderBy(column.orderBy)"/>
            </span>
          </th>
        </template>
        <th class="text-left p-2" width="1">
          <table-settings-icon class="text-primary" />
        </th>
      </thead>
      <tr v-for="(row, index) in filteredItems" :key="index">
        <td class="p-2"> 
          <cornie-checkbox @click="select(row)" :checked="isSelected(row)"/>
        </td>
        <td class="p-2"> {{index}} </td>
        <template v-for="(column, index) in columns" :key="index">
          <td class="p-3 text-sm" v-if="column.show">
            <slot :name="column.key" v-bind="row" :index="index">
              {{row[column.key]}}
            </slot>
          </td>
        </template>
        <td>
          <div class="flex justify-center">
            <cornie-menu :close-on-click="false" top="30px" right="100%">
              <template #activator="{ on }">
                <icon-btn v-on="on">
                  <dots-vertical-icon />
                </icon-btn>
              </template>
              <card-text>
                <slot name="actions" />
              </card-text>
            </cornie-menu>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script src="./CornieTable.ts"></script>