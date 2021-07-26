<template>
  <div class="w-full border py-2 flex mt-12">
    <Dialog header="Header" v-model:visible="show" :style="{width: '50vw'}" :position="'right'" :modal="true">
        <p class="p-m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <template #footer>
            <!-- <Button label="No" icon="pi pi-times" @click="closePosition" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" @click="closePosition" autofocus /> -->
        </template>
    </Dialog>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Options({
  components: {
    
  },
})
export default class RolesAndPrivileges extends Vue {
    @Prop({ type: Boolean, default: false })
    show!: false;
}
</script>
<style>

</style>
