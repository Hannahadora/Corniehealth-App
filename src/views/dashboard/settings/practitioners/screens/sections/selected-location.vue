<template>
  <div class="container-fluid flex flex-col">
    <span
      class="flex items-center"
      @click="() => (showItems = !showItems)"
      v-if="initials"
    >
      <span>
        <!-- <div class="image-con rounded-full border flex items-center justify-center" v-if="actor?.image">
                    <img :src="actor?.image" class="rounded-full" style="width: 100%;height:100%" :alt="actor?.name">
                </div> -->
        <div
          class="image-con rounded-full -ml-3 flex items-center border justify-center bg-white"
        >
          <span class="text-warning">{{ initials }} </span>
        </div>
      </span>
      <span class="mx-2 flex items-center">
        <span>
          <span class="text-primary font-semibold">{{
            selectedItem?.display
          }}</span>
        </span>
        <span class="w-full text-gray-400 text-sm mx-2">
          <chevron-down />
        </span>
      </span>
    </span>
    <div class="w-full relative">
      <div
        class="w-full absolute shadow bg-white top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto mt-2 svelte-5uyqqj"
        v-if="showItems"
      >
        <div
          v-for="(item, i) in items"
          :key="i"
          @click="selected(item)"
          class="cursor-pointer w-full border-gray-100 rounded-xl hover:bg-white-cotton-ball"
        >
          <div
            class="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative"
          >
            {{ item.display }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ChevronDown from "@/components/icons/chevrondownprimary.vue";

export interface IItem {
  code: string;
  display: string;
}

@Options({
  components: {
    ChevronDown,
  },
})
export default class ActorsList extends Vue {
  @Prop()
  item!: IItem;

  @Prop()
  items!: IItem[];

  showItems = false;

  selectedItem: IItem = {} as IItem;

  get initials() {
    if (!this.selectedItem || !this.selectedItem?.display) return "";
    const wordsInName = this.selectedItem?.display?.split(" ");
    if (wordsInName?.length <= 1) return wordsInName[0][0];
    return `${wordsInName[0][0]} ${wordsInName[1][0]}`;
  }

  selected(location: IItem) {
    this.showItems = false;
    this.$emit("changed", { code: location.code, display: location.display });
  }

  @Watch("item")
  updateselectedItem() {
    if (this.item) this.selectedItem = this.item;
  }

  created() {
    this.selectedItem = this.item ?? ({} as IItem);
  }
}
</script>

<style scoped>
.image-con {
  width: 32px;
  height: 32px;
}
</style>
