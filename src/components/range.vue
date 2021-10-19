<template>

<label for="fader">Volume</label>
<input type="range" min="0" max="100" value="50" id="fader" 
	step="20" list="volsettings">
<datalist id="volsettings">
	<option>0</option>
	<option>20</option>
	<option>40</option>
	<option>60</option>
	<option>80</option>
	<option>100</option>
</datalist>
    <input type="range" min="0" max="180" 	step="20" list="volsettings" v-model="sliderMin">

    <div class='range-slider'>
    <input type="range" min="0" max="180" step="1" v-model="sliderMin">
    <input type="number" min="0" max="180" step="1" v-model="sliderMin" class="minnumber">
    <input type="range" min="0" max="180" step="1" v-model="sliderMax">
    <input type="number" min="0" max="180" step="1" v-model="sliderMax" class="maxnumber">
  </div>





  <div class="slidecontainer">
  <p>Default range slider:</p>
  <input type="range" min="1" max="100" value="50" list="tickmarks">

<datalist id="tickmarks">
  <option value="0" label="0%"></option>
  <option value="10"></option>
  <option value="20"></option>
  <option value="30"></option>
  <option value="40"></option>
  <option value="50" label="50%"></option>
  <option value="60"></option>
  <option value="70"></option>
  <option value="80"></option>
  <option value="90"></option>
  <option value="100" label="100%"></option>
</datalist>
  </div>
</template>
<script>
export default {
    data(){
        return {
            minAngle: 10,
            maxAngle: 30
        }
    },
     computed: {
    sliderMin: {
      get: function() {
        var val = parseInt(this.minAngle);
        return val;
      },
      set: function(val) {
        val = parseInt(val);
        if (val > this.maxAngle) {
          this.maxAngle = val;
        }
        this.minAngle = val;
      }
    },
    sliderMax: {
      get: function() {
        var val = parseInt(this.maxAngle);
        return val;
      },
      set: function(val) {
        val = parseInt(val);
        if (val < this.minAngle) {
          this.minAngle = val;
        }
        this.maxAngle = val;
      }
    }
  }
}
</script>
<style scoped>
.minnumber{
    position: relative;
    top: 25px;
    left: -100px;
}
.maxnumber{
    position: relative;
    top: 25px;
    left: 160px;
}
.range-slider {
  width: 300px;
  margin: auto;
  text-align: center;
  position: relative;
  height: 2.5em;
}

.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
  
}

/* input[type=number] {
  border: 1px solid #ddd;
  text-align: center;
  font-size: 1.6em;
  -moz-appearance: textfield;
}

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}*/

input[type=number]:invalid,
input[type=number]:out-of-range {
  border: 2px solid #ff6347;
} 

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #FE4D3C;
}

input[type=range]:focus::-ms-fill-lower {
  background: #F2F7FF;
}

input[type=range]:focus::-ms-fill-upper {
  background: #FE4D3C;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #FE4D3C;
  border-radius: 5px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #FE4D3C;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #FE4D3C;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}

</style>