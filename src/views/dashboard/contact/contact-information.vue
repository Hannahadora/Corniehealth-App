<template>
  <div class="mt-2 mb-5 rounded-lg settings bg-white w-full h-full">
    <div class="w-full h-full p-3 border-r-2">
      <div class="flex flex-col">
        <div class="justify-center">
          <input
            type="search"
            name="search"
            id=""
            placeholder="Search"
            class="rounded-full border-primary border text-primary py-1 px-2"
          />
        </div>
        <div class="py-3">
          <div class="text-black text-lg uppercase font-semibold py-1">
            organization
          </div>
          <div class="px-3">
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">
                Organization Information
              </div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">
                Contact Information
              </div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">
                Location & Location Hierarchy
              </div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">
                Organization Hierarchy
              </div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">Bank & Accounts</div>
            </div>
          </div>
        </div>

        <div class="py-3">
          <div class="text-black text-lg uppercase font-semibold py-1">
            users & security
          </div>
          <div class="px-3">
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">
                Account Security
              </div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">Practitioners</div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">Group</div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">Care Team</div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">
                Roles and Privileges
              </div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">Approval</div>
            </div>
          </div>
        </div>

        <div class="py-3">
          <div class="text-black text-lg uppercase font-semibold py-1">
            Healthcare
          </div>
          <div class="px-3">
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">
                Healthcare Services
              </div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">
                Practice Forms/Templates
              </div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">Devices</div>
            </div>
            <div class="flex flex-row">
              <div class="text-primary"><img src="" alt="" /></div>
              <div class="text-primary font-semibold py-1">Care Partners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-3 w-full h-full">
      <div class="px-3">
        <div class="border-b-2 py-2 text-xl font-bold text-primary">
          Contact Information (Root Admin)
        </div>
        <div class="py-5">
          <div class="flex justify-between py-3">
            <div>
              <div class="text-lg font-semibold py-1 text-black">Password</div>
              <div class="text-base font-normal text-black">
                The same passworrd strength are enforced for all users across
                the app. <span class="text-primary uppercase">view policy</span>
              </div>
            </div>
            <a
              href=""
              class="
                rounded-full
                border-primary border
                bg-transparent
                px-3
                py-2
              "
              >Update Password</a
            >
          </div>

          <div class="flex justify-between py-3">
            <div>
              <div class="text-lg font-semibold py-1 text-black">
                Two Factor Authentication
              </div>
              <div class="text-base font-normal text-black">
                Two factor authentication enforced for all users across the app.
                <span class="text-primary uppercase">view policy</span>
              </div>
            </div>
            <a
              href=""
              class="
                rounded-full
                border-primary border
                bg-transparent
                px-3
                py-2
              "
              >Configure</a
            >
          </div>
        </div>

        <div class="border-b-2 py-2 text-lg font-bold text-primary">
          Other Contacts
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  components: {},
})
export default class ContactInfo extends Vue {}
</script>
<style scoped>
.settings {
  display: grid;
  grid-template-columns: 30% 70%;
}
</style>