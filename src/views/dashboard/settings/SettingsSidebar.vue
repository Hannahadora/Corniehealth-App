<template>
  <div class="mt-2 mb-5 rounded-lg bg-white w-full h-full max-h-full">
    <div class="w-full h-full max-h-full p-3">
      <div class="flex flex-col h-full w-full overflow-auto max-h-full">
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
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class Settings extends Vue {}
</script>
<style scoped></style>
