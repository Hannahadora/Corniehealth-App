<template>
  <main class="p-6 ">
    <h3
    class='
    text-primary
    text-xl
    font-bold
    border-b border-gray-300
    '
    >
      Organization Information</h3>
    <section>
    <div class="image-upload flex mt-10">
      <img src='../../../../assets/img/avatar.png' alt='a man smiling' id='display_image' />
      <br>
     <input type="file"  accept="image/*" name="image" id="file" hidden>
     <label for="file" class='text-pink-600 font-bold cursor-pointer'> Upload Image</label>
    </div>
    <div class="main-box mt-10 ">
    <div class='w-full h-full '> 
        <div>
          <label  
          for="OrganizationName" class="font-bold text-base uppercase mb-4"> Organization Name </label>
          <br />
          <input id="OrganizationName" required
          class=" appearance-none w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          placeholder="Enter "
          v-model="OrganizationName"
          />
        </div>

        <div>
          <label  
          for="Alias" class="font-bold text-base uppercase mb-4"> Alias  </label>
          <br />
          <input id="Alias" required
          class=" appearance-none w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          placeholder="Enter "
          v-model="alias"
          />
        </div>

        <div>
           <label  
          for="OrganizationType" class="font-bold text-base uppercase mb-4"> Organization Type </label>
          <br />
          <select name="select" id="OrganizationType" 
          class="  w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          >
            <option  value="First Option" > Select </option>
            <option  value="First Option"> First Option </option>
            <option  value="First Option"> First Option </option>
            <option  value="First Option"> First Option </option>
          </select>
        </div>

        <div>
          <label  
          for="ReferenceOrganization" class="font-bold text-base uppercase mb-4"> Reference organization </label>
          <br />
          <input id="ReferenceOrganization" required
          class=" appearance-none w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          placeholder="Enter "
          v-model="alias"
          />
        </div>

           <div>
          <label  
          for="RegistrationNumber" class="font-bold text-base uppercase mb-4"> Registration Number  </label>
          <br />
          <input id="RegistrationNumber" required type='Number'
          class=" appearance-none w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          placeholder="Enter "
          v-model="alias"
          />
        </div>
       
       <div>
           <label  
          for="PhoneNumber" class="font-bold text-base uppercase mb-4"> Phone Number  </label>
          <br />
        <div id="PhoneNumber"  class='flex'>
          <select class=' border border-gray-300   my-4 px-3 py-2 rounded-l-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 '>
            <option value="1"> Nig </option>
            <option value="1"> Nig </option>
            <option value="1"> Nig </option>
          </select>
          <input placeholder="(+234) --" class='  rounded-r-md appearance-none w-full  my-4 px-3 py-2 border border-gray-300 placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 ' type='number' />
        </div>
       </div>

    </div>  
    <div class='w-full h-full ' > 

      
      
      <div>
           <label  
          for="DomainName" class="font-bold text-base uppercase mb-4"> Domain Name </label>
          <br />
        <div id="DomainName"  class='flex'>
          <input class=' appearance-none w-1/2 border border-gray-300  bg-gray-500   my-4 px-3 py-2 rounded-l-md placeholder-white
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 ' disabled placeholder="https://corniehealth.com/"/>
          
          <input placeholder="Domain--" class='  rounded-r-md appearance-none w-1/2  my-4 px-3 py-2 border border-gray-300 placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 '  />
        </div>
       </div>

        <div>
          <label  
          for="OrganizationIdentifier" class="font-bold text-base uppercase mb-4"> Organization Identifier </label>
          <br />
          <input id="OrganizationIdentifier" required
          class=" appearance-none w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          placeholder="Enter "
          v-model="OrganizationIdentifier"
          />
        </div>

         <div>
           <label  
          for="ProviderProfile" class="font-bold text-base uppercase mb-4"> Provider Profile </label>
          <br />
          <select name="select" id="ProviderProfile" 
          class="  w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          >
            <option  value="First Option" > Select </option>
            <option  value="First Option"> First Option </option>
            <option  value="First Option"> First Option </option>
            <option  value="First Option"> First Option </option>
          </select>
        </div>

        <div>
           <label  
          for="IncorporationType" class="font-bold text-base uppercase mb-4"> Incorporation Type </label>
          <br />
          <select name="select" id="IncorporationType" 
          class="  w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          >
            <option  value="First Option" > Select </option>
            <option  value="First Option"> First Option </option>
            <option  value="First Option"> First Option </option>
            <option  value="First Option"> First Option </option>
          </select>
        </div>  

        <div>
          <label  
          for="EmailAddress" class="font-bold text-base uppercase mb-4"> Email Address </label>
          <br />
          <input id="Email Address" required
          class=" appearance-none w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          type='email'
          placeholder="Enter "
          v-model="EmailAddress"
          />
        </div>

        <div>
          <label  
          for="Website" class="font-bold text-base uppercase mb-4"> Website </label>
          <br />
          <input id="Website" required
          class=" appearance-none w-full my-4 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400
          focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out
          sm:text-sm sm:leading-5 "
          placeholder="Enter "
          v-model="Website"
          />
        </div>
      
      
      
      </div>  
    </div> 

    <div class="my-8 flex justify-end">
        <span >
          <button class=' border border-blue-800 mr-8
           rounded-3xl   px-6 py-2 
                      placeholder-gray-400
                      focus:outline-none
                      focus:shadow-outline-blue
                      focus:border-blue-300
                      transition
                      duration-150
                      ease-in-out 
                      sm:text-sm
                      sm:leading-5
          
          '> 
          Revert Changes
        </button>
        </span>
         <span >
          <button class='
          px-6 py-2  text-white appearance-none
                      border-none
                      bg-pink-600
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
          '> 
          Save Changes
        </button>
        </span>
      </div> 
    </section>
  </main>
</template>


<script>


export default {
  name: "OrganizationInformation",
  components: {
   
  },
  
};
</script>

<style scoped>
.main-box{
  display: grid;
  grid-template-columns: repeat(2, 1fr );
  grid-gap: 3rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
