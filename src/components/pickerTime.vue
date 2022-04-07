<template>
<div>
    <label
        class="flex capitalize items-center mb-1 text-black text-sm font-semibold"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </label>
    <Datepicker style="height:100px" v-model="time"  timePicker :placeholder="placeholder"  @update:modelValue="updateValue"  :value="modelValue"/>
</div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css'


export default {
   components: { Datepicker },
   
   props:{
     label:{
       type:String,
       default: ""
     },
     placeholder: { type: String, default: '' },
     modelValue: { type: [TimeRanges, String], default: '' },
   },
    emits: ['update:modelValue'],
    setup(props:any, {emit} : {emit:any}) {
        const data = reactive({
          isFocused: false,
          value: '',
        });

        const time = ref({ 
              hours: new Date().getHours(),
            minutes: new Date().getMinutes()
        });

         function updateValue(event: any) {
           console.log(event,"event")
           if(event.hours < 9 || event.minutes < 9){
             emit('update:modelValue', +'0'+event.hours +':'+ '0'+event.minutes);
           }else{
              emit('update:modelValue', event.hours +':'+ event.minutes);
           }
        }

        
        return {
            time, updateValue, data
        }
    }
}
</script>
<style  scoped>

  .dp__overlay {
      position: absolute;
      overflow-y: auto;
      width: 100%;
      height: 30%;
  }

.dp__time_col {
    font-size: 1rem !important;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}


  
  .dp__instance_calendar {
    position: relative;
    height: 100px !important;
  }


</style>