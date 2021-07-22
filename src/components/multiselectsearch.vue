<template>
  <span>
    <label class="block uppercase mb-1 text-xs font-bold">{{ label }}</label>
      <Field :name="inputName"
        v-slot="{ handleChange, errorMessage }"
        :rules="rules"
        v-model="myValue"
        v-bind="$attrs"
      >

        <Dropdown 
            v-model="myValue" 
            :options="items" 
            optionLabel="name"
            @update:modelValue="handleChange" 
            :placeholder="placeholder" 
            style="width: 100%; outline: transparant !important"
            :style="{
                borderColor: Boolean(myValueIsDefault) ? '' : Boolean(errorMessage) ? '#EC0868' : '#35BA83'
            }"
        >
            <template #value="slotProps">
                <div class="country-item country-item-value flex items-center" v-if="slotProps.value">
                    <ContactIcon />
                    <div class="ml-2" :class="{ 'p-2': !slotProps.value[optionLabel]}">{{slotProps.value[optionLabel]}}</div>
                </div>
                <span v-else class="p-2">
                    {{slotProps.placeholder}}
                </span>
            </template>
            <template #option="slotProps">
                <div class="country-item flex items-center">
                    <ContactIcon />
                    <div class="ml-2 w-full">
                        <span class="flex justify-between">
                            <span>{{ slotProps.option[optionLabel] }}</span>
                            <span class="ml-3 text-current">{{ slotProps.option[subText] }}</span>
                        </span>
                    </div>
                </div>
            </template>
        </Dropdown>

        <span v-if="errorMessage" class="text-red-400">{{ errorMessage }}</span>
      </Field>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Dropdown from 'primevue/dropdown'
import { Prop, Watch } from 'vue-property-decorator';
import { Field } from 'vee-validate';
import ContactIcon from '@/components/icons/contactinfo.vue'

@Options({
  name: "DateRangePicker",
  components: {
    Dropdown,
    Field,
    ContactIcon,
  },
})

export default class MySelect extends Vue {
    myValue: any = { };
    showList = false;
    myValueIsDefault = true;

    @Prop({ type: String, default: '' })
    label!: any;

    @Prop({ type: String, default: '' })
    optionLabel!: any;

    @Prop({ type: String, default: '' })
    subText!: any;

    @Prop({ type: String, default: '' })
    placeholder!: any;
    
    @Prop({ type: String, default: '' })
    name!: any;

    @Prop({ type: Array, default: [ ] })
    items!: any;

    @Prop()
    rules!: any;

    @Watch('myValue')
    onChange(): void {
        this.myValueIsDefault = false;
    }

    get inputName() {
        const id = Math.random().toString(36).substring(2, 9);
        return this.name || `input-${id}`;
    }

    toggleDropdown(): void {
        this.showList = !this.showList;
    }

    // itemSelected(item: any): void {
    //     this.myValue = item;
    //     this.showList = false;
    //     console.log(this.myValue, "updtd");
        
    // }
}
</script>
