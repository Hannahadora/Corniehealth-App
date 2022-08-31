<template>
	<div></div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";


@Options({
  name: "Insurance",
  components: {},
})
export default class Insurance extends Vue {
  @Prop({ type: Object, default: {} })
    practitioners!: any
}
</script>

<style scoped>

</style>