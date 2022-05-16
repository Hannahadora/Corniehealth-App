<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5 flex flex-col space-y-10">
      <div class="flex flex-col space-y-2 bg-blue-100 p-4 font-light rounded-md">
        <div>The accounting method that you adopt for determining your inventory costs can have a direct impact on your
          key financial statements</div>
        <div>We have provided a summary explanation below, however, we advice that you consult your accountant before
          choosing an inventory valuation method.</div>
      </div>
      <div class="flex flex-col space-y-16">
        <div>
          <cornie-radio :name="name" v-model="Cvaluation" value="lifo"
            label="The Last-In, First-Out (LIFO) method assumes that the last unit to arrive in inventory is sold first. In essence, your COGS will be calculated based on Last-In, while the ending inventory value is calculated based on First-In." />
        </div>
        <div>
          <cornie-radio :name="name" v-model="Cvaluation" value="fifo"
            label="The First-In, First-Out (FIFO) method assumes that the oldest unit of inventory is sold first. In essence, your COGS will be calculated based on First-In, while the ending inventory value is calculated based on Last-In." />
        </div>
        <div>
          <cornie-radio :name="name" v-model="Cvaluation" value="wac"
            label="The Weighted Average Cost (WAC) method takes into account the weighted average of all units available within a period and then uses that average cost to determine the value of COGS and ending inventory." />
        </div>
        <div>
          <cornie-radio :name="name" v-model="Cvaluation" value="rc"
            label="The Replacement Cost method assigns value based on the amount your business will spend to replace that inventory item after sale. This, of course, means that the value assigned changes over time depending on supplier pricing at the time of replacement." />
        </div>

      </div>
      <div class="flex justify-end py-5">
        <cornie-btn @click="show = false" class="border-primary border-2  mr-3 rounded-xl text-primary">
          Cancel
        </cornie-btn>
        <cornie-btn :invalid="!Cvaluation" :loading="loading" @click="submit"
          class="text-white bg-danger px-2 rounded-xl">
          Apply
        </cornie-btn>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import CornieRadio from "@/components/cornieradio.vue";
import { Options, Vue } from "vue-class-component";
import { namespace } from "vuex-class";

const inventory = namespace('inventorysettings')

@Options({
  name: "InventoryValuation",
  components: {
    CornieRadio,

  },
})

export default class InventoryValuationIndex extends Vue {
  Cvaluation = ''
  idd = ""
  loading = false

  @inventory.State
  valuation!: any

  @inventory.Action
  getAllValuation!: () => void

  @inventory.Action
  createValuation!: (data: string) => Promise<void>

  @inventory.Action
  updateValuation!: (data: any) => Promise<void>

  get name() {
    const id = Math.random().toString(36).substring(2, 9);
    return `valuation-${id}`;
  }

  async submit() {
    // console.log("valuation", this.Cvaluation)
    if (!this.Cvaluation) return
    if (!this.idd) {
      await this.createValuation(this.Cvaluation).then(() => {
        window.location.reload()
      })
    } else {
      // console.log("idd", this.idd, "va", this.Cvaluation)
      await this.updateValuation({
        id: this.idd,
        valuation: this.Cvaluation
      }).then(() => {
        window.location.reload()
      })
    }

  }

  async mounted() {
    await this.getAllValuation()
    // console.log('cc', this.valuation)
    this.Cvaluation = this.valuation?.valuation
    this.idd = this.valuation.id
  }
}
</script>