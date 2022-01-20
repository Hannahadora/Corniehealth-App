<template>
  <icon-input :type="visible ? 'text' : 'password'" class="py-2 px-3">
    <template v-slot:append>
      <span @click="visible = false" v-if="visible">
        <close-eye-icon class="cursor-pointer"/>
      </span>
      <span @click="visible = !visible" v-else>
        <open-eye-icon class="cursor-pointer"/>
      </span>
    </template>
  </icon-input>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "./IconInput.vue";
import OpenEyeIcon from "./icons/eye.vue";
import CloseEyeIcon from "./icons/eyeclose.vue";
@Options({
  components: {
    IconInput,
    OpenEyeIcon,
    CloseEyeIcon,
  },
})
export default class PasswordInput extends Vue {
  visible = false;
}
</script>
