<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
    <div v-if="show" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
           
            <div class="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" aria-hidden="true"></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <slot></slot>
        </div>
    </div>

</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
// import Modal from '@/components/confirm.vue'

@Options({
  components: {
    // Modal
  },
})
export default class RolesAndPrivileges extends Vue {
 @Prop({ type: Boolean, default: false })
 show!: boolean;

}
</script>
<style>

</style>
