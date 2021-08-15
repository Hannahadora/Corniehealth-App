<template>
    <div class="w-full" v-bind="$attrs">
        <div class="container">
            <div class="w-full">
                <label class="block uppercase mb-1 text-xs font-semibold">{{
                label
                }}</label>
            </div>
            <div class="w-full">
                <span class="flex border justify-between dd-item px-4 py-2 cursor-pointer" @click="showItems">
                    <span class="dd-item" :class="{ 'text-gray-500': !myValue }">{{ !myValue ? placeholder : optionLabel ? myValue[optionLabel] : myValue }}</span>
                    <span><i class="pi dd-item pi-chevron-down"></i></span>
                </span>
            </div>
            <div class="w-full dd-item relative" v-if="drop">
                <div class="absolute w-full pb-2 bg-white dd-item rounded-md shadow-xl z-20" style="max-height: 300px;overflow-y:scroll">
                    <a  @click="itemSelected(item)" v-for="(item, index) in items" :key="index" class="block cursor-pointer dd-item px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                        {{ optionLabel ? item[optionLabel]: item }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
// import { Field } from 'vee-validate';
import ContactIcon from '@/components/icons/contactinfo.vue'

@Options({
  name: "DateRangePicker",
  components: {
    // Field,
    ContactIcon,
  },
})

export default class MySelect extends Vue {
    myValue: any;
    showList = false;
    filterText = '';
    
    drop = false;

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

    @Prop({ type: Boolean, default: false })
    isContact!: boolean;

    @Prop({ type: Boolean, default: false })
    withFilter!: boolean;

    @Prop()
    rules: any;

    showItems() {
        this.drop = !this.drop;
    }

    itemSelected(item: any) {
        this.drop = false;
        this.myValue = item;
        console.log(item, "itemmm");
        
        this.$emit('item-selected', item)
    }

    get inputName() {
        const id = Math.random().toString(36).substring(2, 9);
        return this.name || `input-${id}`;
    }

    get filteredItems() {
        if (this.items.length <= 0) return [ ];
        if (!this.filterText) return this.items;
        console.log(this.filterText, "text");
        
        return this.items.filter((i: any) => {
            return this.optionLabel ? 
                i[this.optionLabel] && i[this.optionLabel].toLowerCase().includes(this.filterText.toLowerCase()) :
                i && i.toString().toLowerCase().includes(this.filterText.toLowerCase())
        });
    }

    toggleDropdown(): void {
        this.showList = !this.showList;
    }

    created() {
        window.addEventListener('click', (e: any) => {
            if (!e.target.classList.contains('dd-item')) this.drop = false;
        })
    }
}
</script>