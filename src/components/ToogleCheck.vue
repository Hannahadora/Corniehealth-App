<template>
  <div class="toogle-check">
       <label class="switch">
                <input type="checkbox" v-model='checked'
                @change="changes()"
                />
                <span class="slider round"></span>
                {label}
        </label>
  </div>
</template>



<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}
input:checked + .slider {
 background: #FF5964;
}
input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
</style>



<script>
export default {
  name: "ToogleCheck",
    props: {
      label: {
        type: String,
        required: false,
      },
    },
    data(){
      return{
        checked : " ",
      }
    },
    methods: {
      changes() {
        const checked = this.checked
        this.$emit('updated', checked)
      }
    }
};
</script>