<template>
  <div class="w-full">
    <cornie-card-text>
      <div class="md:grid md:grid-cols-2 my-3 w-full">
        <div
          class="py-3 px-6"
          v-for="(optionalItem, index) in optionalItems"
          :key="index"
        >
          <cornie-card
            height="150px"
            @click="optionalItem.click"
            class="cursor-pointer hover:bg-gray-50"
          >
            <cornie-card-text class="h-full">
              <div class="flex h-full items-center">
                <component :is="optionalItem.icon" class="mx-4" />
                <div>
                  <p class="font-extrabold text-lg text-primary">
                    {{ optionalItem.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ optionalItem.number }} Added
                  </p>
                </div>
              </div>
            </cornie-card-text>
          </cornie-card>
        </div>
      </div>
    </cornie-card-text>
  </div>
</template>
<script lang="ts">
  import CornieCard from "@/components/cornie-card/index";
  import BillIcon from "@/components/icons/billpayment.vue";
  import { Options, Vue } from "vue-class-component";

  @Options({
    components: {
      BillIcon,
      ...CornieCard,
    },
  })
  export default class PaymentAccount extends Vue {
    showPrimaryAccount = false;
    showSecondaryAccount = false;
    get optionalItems() {
      return [
        {
          name: "Primary Account",
          icon: "bill-icon",
          click: () => (this.showPrimaryAccount = true),
          number: 0,
        },
        {
          name: "Secondary Account",
          icon: "bill-icon",
          click: () => (this.showSecondaryAccount = true),
          number: 0,
        },
      ];
    }
  }
</script>
