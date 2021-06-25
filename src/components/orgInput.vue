<template>
              <input
                :id="id"
                :placeholder="placeholder"
                :v-model="modelName"
                :type="type"
                required
                class="
                  appearance-none
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
              />
            
</template>
<script>
    export default {
        name: "OrgInput",
         props: {
            id:String,
            modelName:String,
            placeholder:String,
            type: String
  },        
    }

</script>
