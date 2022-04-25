<template>
<div>
  <div class="w-full  mb-5  pb-1">
        <button class="items-center float-right flex justify-end">
            <edit-icon class="fill-current text-danger font-bold mr-1 text-sm" />
            <h1 class="text-danger  text-sm font-bold float-right ">Edit</h1>
        </button>
  </div>
</div>

</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
import EditIcon from "@/components/icons/edit-prac.vue";
import CornieCheckbox from "@/components/custom-checkbox.vue";

@Options({
  name: "ScreenHeader",
  components: {
    CornieAvatarField,
    CornieCheckbox,
    EditIcon,
  },
})
export default class ScreenHeader extends Vue {
  @Prop({ default: {} })
  properties!: any;
}
</script>
