<template>
  <div class="auth block h-screen">
    <div class="p-5">
      <img src="@/assets/img/logo.svg" />
    </div>
    <div class="px-7 w-full h-full grid auth-content">
      <section
        class="h-1/2 w-full mt-7 flex flex-col items-center justify-center"
      >
        <slot name="text" />
      </section>
      <section class="w-full h-full mt-2">
       <!-- <div class="h-5/6 2xl:h-3/6 w-2/3 block rounded-lg bg-white">
        </div>-->
          <slot />
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Auth extends Vue {}
</script>
<style scoped>
.auth {
  background-color: unset;
    min-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-image: none;
    background-repeat: no-repeat;
    background-size: 50%;
}
.auth-content {
  grid-template-columns: 25% 65%;
  column-gap: 15%;
}
@media (min-width: 640px) { 
.auth {
  background-color: unset;
    min-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-image: none;
    background-repeat: no-repeat;
    background-size: 50%;
}
.auth-content {
  grid-template-columns: 25% 65%;
  column-gap: 15%;
}
}
@media (min-width: 768px) { 
  .auth {
    background-color: #e5e5e5;
    min-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-image: url("../../assets/img/bg.png");
    background-repeat: no-repeat;
    background-size: 50%;
  }
  .auth-content {
    grid-template-columns: 25% 65%;
    column-gap: 15%;
  }
}
@media (min-width: 1024px) { 
  .auth {
    background-color: #e5e5e5;
    min-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-image: url("../../assets/img/bg.png");
    background-repeat: no-repeat;
    background-size: 50%;
  }
  .auth-content {
    grid-template-columns: 25% 65%;
    column-gap: 15%;
  }
}
@media (min-width: 1280px) { 
  .auth {
  background-color: #e5e5e5;
  min-width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-image: url("../../assets/img/bg.png");
  background-repeat: no-repeat;
  background-size: 50%;
}
.auth-content {
  grid-template-columns: 25% 65%;
  column-gap: 15%;
}
}
@media (min-width: 1536px) { 
  .auth {
    background-color: #e5e5e5;
    min-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-image: url("../../assets/img/bg.png");
    background-repeat: no-repeat;
    background-size: 50%;
  }
  .auth-content {
    grid-template-columns: 25% 65%;
    column-gap: 15%;
  }
}
</style>
