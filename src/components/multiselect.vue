<template>
  <span>
    <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label>
      <Field :name="inputName"
        v-slot="{ handleChange, errorMessage }"
        :rules="rules"
        v-model="myValue"
        v-bind="$attrs"
      >
        <MultiSelect
        class="focus:outline-none"
            style="width: 100%; outline: transparant !important"
            :style="{
                borderColor: myValueIsDefault ? '' : Boolean(errorMessage) || Boolean(myValue.length <= 0) ? '#EC0868' : '#35BA83'
            }"
            @update:modelValue="handleChange" 
            v-model="myValue" 
            :options="items" 
            :optionLabel="optionLabel"
            :placeholder="`--${placeholder}--`"
        />

        <span v-if="errorMessage" class="text-red-400">{{ errorMessage }}</span>
      </Field>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MultiSelect from 'primevue/multiselect'
import { Prop, Watch } from 'vue-property-decorator';
import { Field } from 'vee-validate';

@Options({
  name: "DateRangePicker",
  components: {
    MultiSelect,
    Field,
  },
})

export default class MySelect extends Vue {
    myValue = '';
    myValueIsDefault = true;

    @Watch('myValue')
    onChange(): void {
        this.myValueIsDefault = false;
    }

    @Prop({ type: String, default: '' })
    label!: any;

    @Prop({ type: String, default: '' })
    optionLabel!: any;

    @Prop({ type: String, default: '' })
    placeholder!: any;
    
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
