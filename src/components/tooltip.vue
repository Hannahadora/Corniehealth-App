<template>
  <div class="tooltip-box">
    <slot />
    <div class="tooltip flex flex-col">
      <slot name="tooltip">
        <span class="text text-xs">
          {{ text }}
        </span>
      </slot>
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>
  .tooltip-box {
    position: relative;
    display: inline-block;
        top: 5px;
    left: 5px;

  }

  .tooltip-box:hover .tooltip {
    opacity: 1;
  }
  .tooltip {
    color: #ffffff;
    text-align: center;
    padding: 9px;
    border-radius: 4px;
    width: 150px;
    bottom: 100%;
    opacity: 0;
    transition: opacity 1s;
    position: absolute;
    z-index: 1;
    background-color: #080056;
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

  background: #080056;
}*/

  /* .text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #a782e8 transparent transparent transparent;
} */
</style>
