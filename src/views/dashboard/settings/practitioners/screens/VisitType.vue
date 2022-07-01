<template>
  <screen-header :properties="properties"> Work Info </screen-header>

  <div>
    <h1>Visit Type</h1>
    {{ properties.visitType }}
  </div>
</template>
<script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import { Prop } from "vue-property-decorator";

  @Options({
    name: "VisitType",
    components: {},
  })
  export default class VisitType extends Vue {
    @Prop({ default: {} })
    properties!: any;
  }
</script>
