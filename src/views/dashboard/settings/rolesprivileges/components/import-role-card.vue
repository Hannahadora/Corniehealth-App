<template>
    <div class="w-full bordered py-2 cursor-pointer" style="width: 100px">
        <div class="container flex flex-col items-center justify-around" style="height:90px">
            <span class="mb-3">
                <img src="https://via.placeholder.com/100" alt="Photo" class="rounded-full" style="width: 44px; height: 44px">
            </span>
            <span class="font-bold text-sm text-center">
                {{ role.name }}
            </span>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from '@/components/CornieInput.vue'
import { Prop } from "vue-property-decorator";


@Options({
  components: {
    CornieInput,
  },
})
export default class RolesAndPrivileges extends Vue {
    @Prop()
    role!: any;

}
</script>
<style>
    .bordered {
        border: 1px solid #6F6C93;
        box-sizing: border-box;
        border-radius: 8px;
    }
</style>
