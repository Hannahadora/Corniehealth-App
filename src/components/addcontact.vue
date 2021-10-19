<template>
  <modal :visible="show" class="w-1/2 h-1/2">
    <div class="form flex flex-col">
      <div class="nav flex justify-start bg-primary">
        <div class="back">.</div>
      </div>
      <div class="form flex flex-col">
        <div class="text-primary font-bold">Add Contact</div>
        <div class="text-sm text-black">Add a new contact..</div>
        <div class="py-2">
          <div class="image-upload flex mt-10 items-center">
            <avatar class="mr-2" :src="displayImg" />
            <br />
            <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              @change="onFileChanged"
              hidden
            />
            <label for="file" class="text-pink-600 font-bold cursor-pointer">
              Upload Image</label
            >
          </div>

          <div class="flex space-x-5 mt-3">
            <div class="number p-2 w-1/2">
              <div>
                <label for="fName" class="font-bold text-base uppercase mb-4">
                  First Name
                </label>
                <br />
                <input
                  type="text"
                  id="fName"
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
                  placeholder="First Name"
                  v-model="fName"
                />
              </div>
            </div>
            <div class="number p-2 w-1/2">
              <div>
                <label for="lName" class="font-bold text-base uppercase mb-4">
                  Last Name
                </label>
                <br />
                <input
                  type="text"
                  id="lName"
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
                  placeholder="Last Name"
                  v-model="lName"
                />
              </div>
            </div>
          </div>
          <div class="flex space-x-5 mt-3">
            <div class="number p-2 w-1/2">
              <div>
                <label for="fName" class="font-bold text-base uppercase mb-4">
                  First Name
                </label>
                <br />
                <input
                  type="text"
                  id="fName"
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
                  placeholder="First Name"
                  v-model="fName"
                />
              </div>
            </div>
            <div class="number p-2 w-1/2">
              <div>
                <label for="fName" class="font-bold text-base uppercase mb-4">
                  First Name
                </label>
                <br />
                <select
                  class="
                    border border-gray-300
                    my-4
                    px-3
                    py-2
                    rounded-l-md
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex space-x-5 mt-3">
            <div class="number p-2 w-1/2">
              <div>
                <label for="fName" class="font-bold text-base uppercase mb-4">
                  First Name
                </label>
                <br />
                <input
                  type="text"
                  id="fName"
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
                  placeholder="First Name"
                  v-model="fName"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import modal from "@/components/modal.vue";

export default {
  name: "AddContact",
  components: {
    modal,
  },
  data() {
    return {
      displayImg: require("@/assets/img/placeholder.png"),
      fname: "",
      lname: "",
      purpose: "",
      gender: "",
      image: "",
      country: "",
      state: "",
      city: "",
      phone: "",
      email: "",
      address: "",
    };
  },
  computed: {
    payload() {
      return {
        fName: this.fName,
        lName: this.lName,
        purpose: this.purpose,
        gender: this.gender,
        country: this.country,
        state: this.state,
        city: this.city,
        phone: this.phone,
        email: this.email,
        address: this.address,
      };
    },
  },
};
</script>
