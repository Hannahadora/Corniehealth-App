<template>
  <div class="w-full border-b border-gray-400 mb-5 flex justify-between pb-1">
    <h1 class="font-bold">
      <slot></slot>
    </h1>

    <button
      class="flex items-center"
      @click="
        $router.push(
          `/dashboard/provider/settings/add-practitioner/${properties.id}`
        )
      "
    >
      <edit-icon class="fill-current text-red-500 mr-1 text-sm" />
      <h1 class="text-red-500 text-xs font-bold">Edit</h1>
    </button>
  </div>
  <div>
    <cornie-avatar-field text="Edit Image" v-model="properties.img.url" />
    <div class="flex justify-between items-baseline mt-5 mb-10">
      <h1 class="font-bold">{{ properties.type }}</h1>
      <cornie-checkbox
        v-model="properties.available"
        :label="'Available For Online Booking'"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
  import CornieCheckbox from "@/components/custom-checkbox.vue";
  import EditIcon from "@/components/icons/edit-prac.vue";
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";

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
