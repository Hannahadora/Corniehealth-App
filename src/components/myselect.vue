<template>
  <span>
      <Field :name="inputName"
        v-slot="{ meta, handleChange, errorMessage }"
        :rules="rules"
        v-model="myValue"
        v-bind="$attrs"
      >
        <Dropdown
        class="focus:outline-none"
            style="width: 100%; outline: transparant !important"
            :style="{
                borderColor: !meta.valid ? errorMessage ? '#EC0868' : '' : '#35BA83'
            }"
            @update:modelValue="handleChange" 
            v-model="myValue" 
            :options="items" 
            :optionLabel="label"
        />

        <span v-if="errorMessage" class="text-red-400">{{ errorMessage }}</span>
      </Field>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Dropdown from 'primevue/dropdown'
import { Prop } from 'vue-property-decorator';
import { Field } from 'vee-validate';

@Options({
  name: "DateRangePicker",
  components: {
    Dropdown,
    Field,
  },
})

export default class MySelect extends Vue {
    myValue = 1;

    @Prop({ type: String, default: '' })
    label!: any;
    
    @Prop({ type: String, default: '' })
    name!: any;

    @Prop({ type: Array, default: [ ] })
    items!: any;

    @Prop()
    rules!: any;

    get inputName() {
        const id = Math.random().toString(36).substring(2, 9);
        return this.name || `input-${id}`;
    }
}
</script>
