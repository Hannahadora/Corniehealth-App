<template>
  <div class="h-full flex justify-center">
    <div class="w-full mx-5">
      <span
        class="
          flex
          border-b-2
          w-full
          font-semibold
          text-xl text-primary
          py-2
          mx-auto
        "
      >
       Add Payment Account
      </span>

     <div class="flex 
     justify-between 
     border-b-2
     ">

     <div class='mr-6 my-6'>
        <p class='text-pink-600 '>  Do you have an account already profiled with NAPS? </p>
        <div class="flex my-4">
       <input class='mr-3' type="radio"  id="yes" v-model="picked"  value='false' >
     <label class='mr-3' for="yes">Yes</label>
    <input class='mr-3' type="radio" id="no" v-model="picked"  value='true'  >
    <label for="no">No</label>
        </div>
     </div>
     
      <div
       v-if='picked' 
     class='my-4 
     bg-gray-100
     px-4
     py-4
     rounded-md
     text-base
     '> 
       Your account MUST be profiled on NAPS before activating your  account 
       <div class="flex mt-4">
           <div class='flex'>
               <file-icon class='cursor-pointer'/>
               <span>
                  <span class="text-base">  Indemnity Letter </span>
                   <br>
                   <span class="text-xs text-gray-400 "> Addressed to the CEO of your Bank </span>
               </span>
           </div>
            <div class='flex'>
               <file-icon class='cursor-pointer'/>
               <span>
                    <span class="text-base">   NAPS Profile Request </span>
                   <br>
                  <span class="text-xs text-gray-400 ">  Addressed to your account officer </span>
               </span>
           </div>
       </div>
     </div>
     
       
     </div>

     <div
     class='border-b-2 
     mb-10
     '>

     <div
     class=' select-box
     my-6'>
    <div>
               <label for='categories' class="font-bold text-base uppercase mb-4"> categories </label>
               <orgSelect
                name="select"
                id=" categories"
                v-model="categories"
              >
                <option >
                 Option 1
                </option>
              </orgSelect>
     </div>

    <div>
               <label for='categories' class="font-bold text-base uppercase mb-4"> locations </label>
               <orgSelect
                name="select"
                id="locations"
                v-model="locations"
              >
                <option >
                  option 1
                </option>
              </orgSelect>
     </div>

     </div>

     <div
     class=' select-box mt-4 mb-20'>
                  <div>
               <label for='bank' class="font-bold text-base uppercase mb-4"> bank </label>
               <orgSelect
                name="select"
                id="bank"
                v-model="bank"
              >
                <option >
                   option1
                </option>
              </orgSelect>
     </div>

    <div>
               <label for='accountNumber' class="font-bold text-base uppercase mb-4"> account number </label>
               <orgSelect
                name="select"
                id="accountNumber"
                v-model="accountNumber"
              >
                <option >
                 option 1
                </option>
              </orgSelect>
     </div>

   <div>
               <label for='accountName' class="font-bold text-base uppercase mb-4"> account nAME </label>
               <orgSelect
                name="select"
                id="accountName"
                v-model="accountName"
              >
                <option >
                 option 1
                </option>
              </orgSelect>
     </div>

     </div>
   
    <div class='flex'>
        <input class='mr-2' type='checkbox' />
        <label class='mr-2' > I authorize paystack to debit my account.  </label>
        <span class ='text-pink-600'> Read authorization document </span>

    </div>

    </div>

    

    <div class="my-8 flex justify-end">
          <span>
            <button
              class="
                border border-blue-800
                mr-8
                rounded-3xl
                px-6
                py-2
                placeholder-gray-400
                focus:outline-none
                focus:shadow-outline-blue
                focus:border-blue-300
                transition
                duration-150
                ease-in-out
                sm:text-sm
                sm:leading-5
                cursor-pointer
              "
            >
              Cancel
            </button>
          </span>
          <span>
            <button
              type="submit"
              class="
                px-6
                py-2
                text-white
                appearance-none
                border-none
                bg-gray-400
                rounded-3xl
                placeholder-gray-400
                focus:outline-none
                focus:shadow-outline-blue
                focus:border-blue-300
                transition
                duration-150
                ease-in-out
                sm:text-sm
                sm:leading-5
                cursor-pointer
              "
            >
             Activate Account
            </button>
          </span>
    </div>

  </div>
  </div>
</template>
<script>
import OrgSelect from "@/components/orgSelect.vue";
import FileIcon from "@/components/icons/file.vue";

export default {
  name: "AddPaymentAccount",
  components: {
   OrgSelect,
   FileIcon,
  },
  data(){
    return{
     picked:true
    }
  },
  

};
</script>
<style>
.select-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
}

</style>
