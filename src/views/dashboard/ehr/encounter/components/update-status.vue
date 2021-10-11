<template>
    <div class="container-fluid">
        <div class="w-full">
          <div class="container px-6 content-con">
            <div class="w-full py-3">
              <div class="w-full my-6">
                <input-desc-rounded :label="'Current Status'" :info="''">
                  <input disabled type="text" v-model="updateData.currentStatus" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <div class="w-full my-6">
                <input-desc-rounded :label="'Updated By'" :info="''">
                  <input disabled type="text" v-model="updateData.updatedBy"  class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <div class="w-full my-6">
                <input-desc-rounded :label="'Last Date Updated'" :info="''">
                  <input disabled type="text" v-model="updateData.lastUpdated" class="p-2 border w-100 w-full" style="border-radius: 8px">
                </input-desc-rounded>
              </div>

              <cornie-select v-model="newStatus" :label="'New Status'" :items="statuses" style="width: 100%" />
            </div>

            <div class="w-full flex flex justify-end mt-12">
                <corniebtn class="text-primary p-2 cancel-btn rounded-full px-8 mx-2 cursor-pointer">
                    <span class="font-semibold" @click="closeModal">Cancel</span>
                </corniebtn>

                <!-- submit button -->
                <slot name="submit" />
            </div>
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import IUpdateStatus from '@/types/IUpdateModel'
import CornieInput from "@/components/cornieinput.vue"
import CornieSelect from "@/components/cornieselect.vue"
import InputWithDesc from "@/views/dashboard/ehr/vitals/components/input-with-desc.vue"
import InputDescRounded from "@/views/dashboard/ehr/vitals/components/input-desc-rounded.vue"


@Options({
    components: {
        CornieInput,
        CornieSelect,
        InputWithDesc,
        InputDescRounded,
    }
})
export default class StatusUpdate extends Vue {
    @Prop({ type: Object, default: { }})
    updateData!: IUpdateStatus;

    newStatus = "";

    get statuses() {
        if (this.updateData?.statuses?.length <= 0) return [ ];
        return this.updateData.statuses;
    }

    closeModal() {
        this.$emit('closesidemodal');
        this.newStatus = '';
    }

    @Watch('newStatus')
    newStatusSelected() {
        this.$emit('changed', this.newStatus)
    }
}
</script>

<style scoped>
.cancel-btn {
  border: 1px solid #080056;
  box-sizing: border-box;
  border-radius: 124px;
  color: #080056;
}
</style>
