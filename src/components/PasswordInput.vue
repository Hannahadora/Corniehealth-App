<template>
  <icon-input :type="visible ? 'text' : 'password'" class="py-2 px-3">
    <template v-slot:append>
      <span @click="visible = !visible">
        <open-eye-icon />
      </span>
    </template>
  </icon-input>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconInput from "./IconInput.vue";
import OpenEyeIcon from "./icons/eye.vue";

@Options({
  components: {
    IconInput,
    OpenEyeIcon,
  },
})
export default class PasswordInput extends Vue {
  visible = false;
}
</script>
