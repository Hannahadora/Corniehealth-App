<template>
  <cornie-radio-image
    label="Phone"
    value="Phone"
    name="system"
    v-model="system"
    @change="handleSystemChange"
  >
    <template #image v-if="system === 'Phone'">
      <mobile-icon class="w-3 fill-current text-white" />
    </template>
    <template #image v-else>
      <mobile-icon class="w-3 fill-current text-gray-400" />
    </template>
  </cornie-radio-image>
  <cornie-radio-image
    name="system"
    label="Fax"
    value="Fax"
    v-model="system"
    @change="handleSystemChange"
  >
    <template #image v-if="system === 'Fax'">
      <fax-icon class="fill-current text-white" />
    </template>
    <template #image v-else>
      <fax-icon class="fill-current text-gray-400" />
    </template>
  </cornie-radio-image>
  <cornie-radio-image
    label="Email"
    value="Email"
    v-model="system"
    @change="handleSystemChange"
    name="system"
  >
    <template #image v-if="system === 'Email'">
      <mail-icon class="fill-current text-white" />
    </template>
    <template #image v-else>
      <mail-icon class="fill-current text-gray-400" />
    </template>
  </cornie-radio-image>
  <cornie-radio-image
    label="Pager"
    value="Pager"
    v-model="system"
    @change="handleSystemChange"
    name="system"
  >
    <template #image v-if="system === 'Pager'">
      <pager-icon class="fill-current text-white" />
    </template>
    <template #image v-else>
      <pager-icon class="fill-current text-gray-400" />
    </template>
  </cornie-radio-image>
  <cornie-radio-image
    label="Url"
    value="Url"
    v-model="system"
    @change="handleSystemChange"
    name="system"
  >
    <template #image v-if="system === 'Url'">
      <url-icon class="fill-current text-white" />
    </template>
    <template #image v-else>
      <url-icon class="fill-current text-gray-400" />
    </template>
  </cornie-radio-image>
  <cornie-radio-image
    label="Sms"
    value="Sms"
    v-model="system"
    @change="handleSystemChange"
    name="system"
  >
    <template #image v-if="system === 'Sms'">
      <sms-icon class="fill-current text-white" />
    </template>
    <template #image v-else>
      <sms-icon class="fill-current text-gray-400" />
    </template>
  </cornie-radio-image>
  <cornie-radio-image
    label="More"
    value="More"
    v-model="system"
    @change="handleSystemChange"
    name="system"
  >
    <template #image v-if="system === 'More'">
      <dot-hor-icon class="fill-current text-white" />
    </template>
    <template #image v-else>
      <dot-hor-icon class="fill-current text-gray-400" />
    </template>
  </cornie-radio-image>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieRadioImage from "@/components/cornieradioimage.vue";
import FaxIcon from "@/components/icons/fax.vue";
import DotHorIcon from "@/components/icons/dot-hor.vue";
import SmsIcon from "@/components/icons/sms.vue";
import UrlIcon from "@/components/icons/url.vue";
import PagerIcon from "@/components/icons/pager.vue";
import MailIcon from "@/components/icons/mail.vue";
import MobileIcon from "@/components/icons/mobile.vue";

@Options({
  components: {
    CornieRadioImage,
    FaxIcon,
    DotHorIcon,
    SmsIcon,
    UrlIcon,
    PagerIcon,
    MailIcon,
    MobileIcon,
  },
  emits: ["system-changed"],
})
export default class SystemButtonGroup extends Vue {
  system = "Phone";

  async handleSystemChange() {
    this.$emit("system-changed", this.system);
  }
}
</script>
