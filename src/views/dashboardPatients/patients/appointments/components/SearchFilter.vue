<template>
  <div>
    <form
      class="xl:w-full lg:w-2/3 w-full mx-auto xl:grid block grid-cols-5 gap-2"
    >
      <div class="relative col-span-2">
        <div class="my-4 w-full flex items-center">
          <sort-icon class="mr-5" />
          <span class="rounded-full">
            <icon-input
              autocomplete="off"
              class="w-full border border-gray-600 rounded-full focus:outline-none py-2"
              type="search"
              placeholder="Search Doctors"
              v-model="query"
            >
              <template v-slot:prepend>
                <search-icon />
              </template>
            </icon-input>
          </span>
        </div>
        <div v-if="practitionersDropdown">
          <div
            class="w-full max-h-80 overflow-y-scroll z-20 mt-10 bg-white px-2 py-4 shadow absolute block top-10"
          >
            <div v-if="loading" class="text-blue-500 text-center text-xs">
              Searching
            </div>

            <div v-if="!loading && specialties.length > 0">
              <div class="w-full text-left mb-2">
                <div class="ddh w-full px-2 py-4">Specialty</div>
                <ul
                  v-for="(specialty, index) in specialties"
                  :key="index"
                  class="block"
                >
                  <li
                    class="lowercase px-2 py-4 hover:bg-gray-100 cursor-pointer"
                    @click="selectProvider(specialty, 'specialty')"
                  >
                    {{ specialty.name }}
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="providers.length > 0">
              <div class="w-full text-left mb-2">
                <div class="ddh w-full px-2 py-4">Provider</div>
                <ul
                  v-for="(provider, index) in providers"
                  :key="index"
                  class="block"
                >
                  <li
                    class="px-2 py-4 lowercase hover:bg-gray-100 cursor-pointer"
                    @click="selectProvider(provider, 'provider')"
                  >
                    {{ provider.name }}
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="!loading && practitioners.length > 0">
              <div class="w-full text-left">
                <div class="ddh w-full px-2 py-4">Practitioners</div>
                <ul
                  v-for="(practitioner, index) in practitioners"
                  :key="index"
                  class="block"
                >
                  <li
                    class="lowercase px-2 py-4 hover:bg-gray-100 cursor-pointer"
                    @click="selectProvider(practitioner, 'practitioner')"
                  >
                    {{ practitioner.name }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";

import IconBtn from "@/components/CornieIconBtn.vue";
import IconInput from "@/components/IconInput.vue";
import SearchIcon from "@/components/icons/search.vue";
import SortIcon from "@/components/icons/sort.vue";

@Options({
  name: "SearchFilter",
  components: {
    IconBtn,
    IconInput,
    SearchIcon,
    SortIcon,
  },
})
export default class SearchFilter extends Vue {
  practitionersDropdown = false;
  type = "";
  providerName = "";
  specialties = [] as any;
  providers = [] as any;
  practitioners = [] as any;
  loading = false;
  query = "";

  @Watch("query")
  onChange() {
    if (this.query !== "") {
      this.practitionersDropdown = true;
      this.findProviders(this.query);
    } else this.practitionersDropdown = false;
  }

  get payload() {
    let data;
    data = {
      specialty: this.providerName,
      location: undefined,
    };

    return data;
  }

  created() {}

  async findProviders(query: string) {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/search?query=${query}`
      );
      this.specialties = data.specialties;
      this.practitioners = data.practitioners;
      this.providers = data.providers;
    } catch (error) {
      window.notify({
        msg: "There was an error fetching data",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  selectProvider(value: any, type: string) {
    this.$emit("getSelectedInput", value, type);
    this.type = type;
    setTimeout(() => {
      this.practitionersDropdown = false;
    }, 500);
  }

  closePractitionerDropdown() {
    this.practitionersDropdown = false;
    // const xspecialty = this.specialties?.find(
    //   el => el.name === this.providerName
    // )
    // const xpractitioners = this.practitioners?.find(
    //   el => el.name === this.providerName
    // )
    // const xproviders = this.providers?.find(
    //   el => el.name === this.providerName
    // )
    // if (!xspecialty || !xpractitioners || !xproviders) {
    //   this.providerName = ""
    // }
  }
}
</script>

<style scoped>
.ddh {
  background: #f0f4fe;
  border-radius: 8px;
  padding: 16px auto 16px 8px;
  text-align: left;
  width: 100%;
  font-weight: 700;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #667499;
}
.input-wrapper {
  border: 1px solid #c5c4d4;
  box-sizing: border-box;
  border-radius: 4px;
}

.search-dropdown {
  max-height: 300px;
}

.c-input {
  border: red;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #9d8ec1;
  border-radius: 2px;
}

@media screen and (max-width: 1024px) {
  .c-input {
    font-size: 14px !important;
  }
}
</style>
