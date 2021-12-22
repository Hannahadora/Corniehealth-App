<template>
  <cornie-dialog v-model="show" right class="w-4/12 h-full">
    <card height="100%" class="h-full flex flex-col bg-white overflow-y-auto">
      <card-title class="p-0">
        <icon-btn @click="show = false">
          <arrow-left stroke="#ffffff" />
        </icon-btn>
      </card-title>
      <card-text class="p-6 pt-0 pb-0">
        <h1 class="text-primary text-xl font-extrabold mb-5">New Job Level</h1>
      </card-text>
      <card-text
        class="p-6 pt-0 flex-grow flex flex-col"
        style="overflow-y: auto"
      >
        <v-form class="flex-grow flex flex-col" ref="myForm" @submit="() => {}">
          <p class="text-danger mb-2">
            Which of these best describes the job level?
          </p>
          <div class="border-b-2 mb-6 pb-6 grid grid-cols-2 gap-y-1">
            <cornie-radio
              v-for="(category, i) in categories"
              :key="i"
              class="ml-3 my-3"
              name="type"
              :label="category.name"
              :value="category.id"
              v-model="categoryId"
            />
          </div>
          <h1 class="text-primary text-xl font-extrabold mb-5">
            Job Level Details
          </h1>
          <cornie-input
            class="w-full mb-6"
            label="Level id"
            placeholder="--Enter--"
            v-model="levelId"
          />
          <tag-input
            class="w-full"
            label="descriptions/tags"
            placeholder="--Enter--"
            v-model="tags"
          />
          <span class="flex-grow" />
          <div class="flex justify-end">
            <span class="flex-grow"></span>
            <span
              @click="hide"
              class="border-primary rounded-full text-black mr-2 py-2 px-6 cursor-pointer border focus:outline-none outline hover:bg-primary hover:text-white"
            >
              Cancel
            </span>
            <cornie-btn
              :loading="loading"
              type="button"
              @click="submit"
              class="bg-danger rounded-full text-white py-2 px-6 focus:outline-none hover:opacity-90"
            >
              Create a Job Level
            </cornie-btn>
          </div>
        </v-form>
      </card-text>
    </card>
  </cornie-dialog>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieDialog from "@/components/CornieDialog.vue";
import Card from "@/components/cornie-card/CornieCard.vue";
import CardText from "@/components/cornie-card/CornieCardText.vue";
import CardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import ArrowLeft from "@/components/icons/arrowleft.vue";
import IconBtn from "@/components/CornieIconBtn.vue";
import CornieInput from "@/components/cornieinput.vue";
import CornieSelect from "@/components/cornieselect.vue";
import CustomCheckbox from "@/components/custom-checkbox.vue";
import CornieRadio from "@/components/cornieradio.vue";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import TagInput from "@/components/tag-input.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import { namespace } from "vuex-class";
import { LevelCollection } from "@/types/ILevel";
import { quantumClient } from "@/plugins/http";
import { CornieUser } from "@/types/user";

const level = namespace("OrgLevels");
const user = namespace("user");
const hierarchy = namespace("hierarchy");

@Options({
  name: "AddLevel",
  components: {
    TagInput,
    CornieDialog,
    Card,
    CardText,
    CardTitle,
    ArrowLeft,
    CornieBtn,
    IconBtn,
    CornieInput,
    CornieSelect,
    CustomCheckbox,
    CornieRadio,
  },
})
export default class AddLevel extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  @Prop({ type: Object, default: {} })
  level!: LevelCollection;

  levelId = "";
  tags = [] as string[];
  categoryId = "";

  loading = false;

  @user.Getter
  cornieUser!: CornieUser;

  @hierarchy.State
  categories!: { id: string; name: string }[];

  @hierarchy.Action
  fetchCategories!: () => Promise<void>;

  @level.Mutation
  addLevels!: (levels: LevelCollection[]) => void;

  @level.Action
  fetchLevels!: () => Promise<void>;

  orgTags = [];

  hide() {
    this.show = false;
  }

  @Watch("level")
  levelChanged() {
    if (!this.level?.id) return;
    const level = this.level;
    this.levelId = level.name || "";
    this.categoryId = level.category?.id || "";
    this.tags = (level.tags || []).map((tag) => tag.name);
  }

  get levelTags() {
    return [] as any[];
  }

  get newTags() {
    return this.tags.map((tag) => ({
      name: tag,
      orgId: this.cornieUser.organizationId,
    }));
  }

  get creationPayload() {
    return {
      level: {
        orgId: this.cornieUser.organizationId,
        categoryId: this.categoryId,
        name: this.levelId,
        levelTags: this.levelTags,
      },
      tags: this.newTags,
    } as LevelCollection;
  }

  get updatePayload() {
    return {
      levelId: this.level.id,
      orgId: this.cornieUser.organizationId,
      categoryId: this.categoryId,
      name: this.levelId,
      levelTags: this.levelTags,
      newTags: this.newTags,
    };
  }

  async submit() {
    this.loading = true;
    if (this.level?.id) await this.update();
    else await this.create();
    this.loading = false;
  }

  async update() {
    try {
      await quantumClient().patch("/org/levels", this.updatePayload);
      this.fetchLevels();
    } catch (e) {
      window.notify({ msg: "Level not updated", status: "error" });
    }
  }

  async create() {
    try {
      await quantumClient().post("/org/levels", this.creationPayload);
      this.fetchLevels();
    } catch (e) {
      window.notify({ msg: "Level not added", status: "error" });
    }
  }

  created() {
    if (!this.categories.length) this.fetchCategories();
  }
}
</script>
