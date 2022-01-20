<template>
  <div>
    <cornie-dialog v-model="show" center>
      <cornie-card width="400px">
        <cornie-card-title>
          <span class="font-extrabold text-primary"> New Progress Note </span>
          <cornie-spacer />
          <cornie-icon-btn @click="show = false">
            <close-icon />
          </cornie-icon-btn>
        </cornie-card-title>
        <cornie-card-text>
          <span class="text-sm">
            Is this patient already registered on CornieHealth?
          </span>
        </cornie-card-text>
        <cornie-card-text class="flex justify-end">
          <cornie-btn
            class="text-primary border-2 border-primary mr-3 px-4"
            @click="$router.push({ name: 'New Patient' })"
          >
            Nos
          </cornie-btn>
          <cornie-btn
            class="bg-danger text-white px-4"
            @click="registerNew = true"
          >
            Yess
          </cornie-btn>
        </cornie-card-text>
      </cornie-card>
    </cornie-dialog>
    <register-existing v-model:visible="registerNew" />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import RegisterExisting from "./register-existing.vue";
import CornieCard from "@/components/cornie-card/CornieCard.vue";
import CornieCardTitle from "@/components/cornie-card/CornieCardTitle.vue";
import CornieCardText from "@/components/cornie-card/CornieCardText.vue";
import CornieBtn from "@/components/CornieBtn.vue";
import CornieDialog from "@/components/CornieDialog.vue";
import CornieIconBtn from "@/components/CornieIconBtn.vue";
import CornieSpacer from "@/components/CornieSpacer.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

@Options({
  name: "PatientRegistrationDialog",
  components: {
    RegisterExisting,
    CornieCard,
    CornieCardTitle,
    CornieCardText,
    CornieBtn,
    CornieDialog,
    CornieIconBtn,
    CornieSpacer,
    CloseIcon,
  },
})
export default class RegistrationDialog extends Vue {
  @Prop({ type: Boolean, default: false })
  modelValue!: boolean;

  @PropSync("modelValue")
  show!: boolean;

  registerNew = false;

  @Watch("show")
  hidden() {
    if (!this.show) this.registerNew = false;
  }
}
</script>
