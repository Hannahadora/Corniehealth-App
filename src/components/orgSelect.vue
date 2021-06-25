<template>
                <div>
              <select
                :name="name"
                :id="id"
                :v-model="modelName"
                class="
                  w-full
                  my-4
                  px-3
                  py-2
                  border border-gray-300
                  rounded-md
                  placeholder-gray-400
                  focus:outline-none
                  focus:shadow-outline-blue
                  focus:border-blue-300
                  transition
                  duration-150
                  ease-in-out
                  sm:text-sm
                  sm:leading-5
                "
              >
                 <slot></slot>
              </select>
            </div>
</template>

<script>
    export default {
        name: "OrgSelect",
         props: {
            id:String,
            modelName:String,
            placeholder:String
  },        
    }

</script>