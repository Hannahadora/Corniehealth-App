<template>
  <div
    class="inline-block align-bottom bg-white shadow-xl rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg smaller sm:w-ful bigger"
    :class="{ bigger: 'bigger' }"
  >
    <!-- <div class="inline-block align-bottom bg-white shadow-xl rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-96 sm:w-ful"> -->
    <div class="bg-white pt-4 pb-4 sm:px-3 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <!-- <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    
                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div> -->
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
          <slot name="header"></slot>
          <div class="mt-2">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
    <slot name="buttons"></slot>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class RolesAndPrivileges extends Vue {}
</script>
<style>
.smaller {
  width: 24rem;
}

.bigger {
  width: 40rem;
  max-height: 400px !important;
}
</style>
