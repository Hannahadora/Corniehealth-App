<template>
  <div class="container-fluid">
    <div class="w-full px-2">
      <div>
        <p class="text-base text-gray-500 my-3">
          Add participants to this slot
        </p>
        <div class="w-full">
          <div class="w-full flex">
            <span>
              <cornie-select :items="[1, 2, 3]" />
            </span>
            <span>
              <div class="container">
                <cornie-input>
                  <template #prepend-inner>
                    <search-icon />
                  </template>
                </cornie-input>
              </div>
            </span>
          </div>
          <div class="w-full pb-2">
            <span>
              <div
                class="py-1 px-1 border"
                role="none"
                style="background: #f6f8f9; border-radius: 4px"
              >
                <div
                  class="w-full flex relative items-center my-2"
                  v-for="(actor, index) in allActors"
                  :key="index"
                >
                  <div class="w-11/12 flex" @click="selectPractitioner(actor)">
                    <div class="w-1/12">
                      <img
                        src="https://via.placeholder.com/40x40"
                        class="rounded-full border"
                        alt="Image"
                      />
                    </div>
                    <div class="w-11/12 ml-3">
                      <p class="capitalize py-0 my-0 font-semibold text-sm">
                        {{ actor.display }}
                      </p>
                      <span
                        class="capitalize text-gray-400 font-normal text-xs"
                        >{{ actor.type }}</span
                      >
                    </div>
                  </div>
                  <div class="w-1/12">
                    <input
                      type="checkbox"
                      :checked="
                        selectedActors.findIndex(
                          (i) => i.code === actor.code
                        ) >= 0
                      "
                      name=""
                      @click="selectPractitioner(actor)"
                      id=""
                    />
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>

        <div class="w-full flex justify-end mt-6">
          <corniebtn
            class="bg-danger py-2 px-8 rounded text-white"
            @click="$emit('close')"
          >
            <span>Close</span>
          </corniebtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import { Prop } from "vue-property-decorator";
import DeleteIcon from "@/components/icons/delete.vue";
import SearchBox from "./search-box.vue";
import MultiSelect from "./apply-to.vue";
import { namespace } from "vuex-class";
import CornieInput from "./rounded-input.vue";
import CornieSelect from "./rounded-dropdown.vue";
const schedules = namespace("schedules");

@Options({
  components: {
    IconInput,
    SearchIcon,
    DeleteIcon,
    SearchBox,
    MultiSelect,
    CornieInput,
    CornieSelect,
  },
})
export default class AllActors extends Vue {
  search = "";
  data: any;
  selectedActors: any = [];

  @schedules.Action
  removePractitioner!: (reqData: any) => Promise<boolean>;

  @schedules.Action
  addPractitioner!: (reqData: any) => Promise<boolean>;

  @Prop()
  schedule!: any;

  @Prop()
  actors!: any;

  selectPractitioner(actor: any) {
    this.$emit("actoradded", { id: actor.code, firstName: actor.display });
  }

  get allActors() {
    return [{ code: "1", display: "Hello", type: "Surgeon" }];
  }

  get persons() {
    if (
      !this.schedule ||
      !this.schedule.practitioners ||
      this.schedule.practitioners.length === 0
    )
      return [];
    return this.schedule.practitioners;
  }

  async addActor(actor: any) {
    try {
      const removed = await this.addPractitioner({
        id: this.schedule.id,
        body: [actor.code],
      });
      if (removed) {
        window.notify({ msg: "Actor added successfully", status: "success" });
        this.$emit("actoradded", {
          id: actor.code,
          firstName: actor.display,
          scheduleId: this.schedule.id,
          image: actor.image,
        });
      } else {
        window.notify({ msg: "Actor could not be added", status: "error" });
      }
    } catch (error) {}
  }

  async removeActor(actor: any) {
    const confirmed = await window.confirmAction({
      message: "Are you sure you want to remove this actor?",
    });
    if (!confirmed) return;
    try {
      const removed = await this.removePractitioner({
        id: this.schedule.id,
        body: [actor.id],
      });
      if (removed) {
        window.notify({ msg: "Actor removed successfully", status: "success" });
      } else {
        window.notify({ msg: "Actor could not be removed", status: "error" });
      }
    } catch (error) {}
  }
}
</script>
