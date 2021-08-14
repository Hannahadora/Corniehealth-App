<template>
  <div class="tooltip-box">
    <slot />
    <div
      class="tooltip flex flex-col"
    >
      <span
        class="text"
      >{{ text }}</span>
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.tooltip-box { 
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip{
  opacity: 1;
}
.tooltip{
  color: #ffffff;
    text-align: center;
    padding: 23px;
    border-radius: 8px;
    width: 350px;
    bottom: 100%;
    left: 50%;
    margin-left: -180px;
    opacity: 0;
    transition: opacity 1s;
    position: absolute;
    z-index: 1;
    background-color: #211F45;
}
/*.tooltip { 
  color: #ffffff;
  text-align: center;
  padding: 5px 0;
  border-radius: 8px;
  
  width: 120px;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  opacity: 0;
  transition: opacity 1s;

  position: absolute;
  z-index: 1;

  background: #211F45;
}*/

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #a782e8 transparent transparent transparent;
}
</style>