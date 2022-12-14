<template>
  <div class="w-full">
    <div class="mb-8">
      <div class="h-full xl:grid grid-cols-7 flex flex-wrap gap-4">
        <multiselectsearch
          v-model="search.specialty"
          :icon="require('@/assets/img/book-appointment/icon-doctor-grey.png')"
          :placeholder="specialtyPlaceholder"
          :items="specialties"
          :active="specialtyActive"
          @query="findSpecialtys"  
          item-label-prop="name"
          item-value-prop="id"
        />
        <multiselectsearch
          v-model="search.location"
          :icon="require('@/assets/img/book-appointment/icon-location-grey.png')"
          :placeholder="locationPlaceholder"
          :items="locations"
          :active="locationActive"
          item-label-prop="name"
          item-value-prop="id"
        />
        <multiselectsearch
          v-model="search.hospital"
          :icon="require('@/assets/img/book-appointment/icon-hospital-grey.png')"
          :placeholder="hospitalPlaceholder"
          item-label-prop="name"
          item-value-prop="id"
          :items="hospitals"
          :active="hospitalActive"
          @query="findHospitals"
        />
        <multiselectsearch
          v-if="tab === 'doctors'"
          v-model="experience"
          :icon="require('@/assets/img/book-appointment/icon-experience-grey.png')"
          placeholder="Experience"
          :items="experiences"
          :active="experienceActive"
        />
        <multiselectsearch
          v-if="tab === 'doctors'"
          v-model="search.visitType"
          :icon="require('@/assets/img/book-appointment/icon-visit-grey.png')"
          placeholder="Visit Type"
          :items="visitTypes"
        />
        <!-- <multiselectsearch
						v-model="search.insurance"
						:icon="require('@/assets/img/book-appointment/icon-insurance-grey.png')"
						placeholder="Insurance"
						:items="insurances"
					/> -->
        <!-- <multiselectsearch
          v-if="tab === 'hospitals'"
          v-model="search.rating"
          :icon="require('@/assets/img/book-appointment/icon-insurance-grey.png')"
          placeholder="Rating"
          :items="ratings"
        /> -->
        <multiselectsearch
          v-if="tab === 'doctors'"
          v-model="search.language"
          :icon="require('@/assets/img/book-appointment/icon-lang-grey.png')"
          placeholder="Language"
          :items="languages"
        />
        <multiselectsearch
          v-if="tab === 'doctors'"
          id="lcd"
          v-model="search.gender"
          :icon="require('@/assets/img/book-appointment/icon-gender-grey.png')"
          placeholder="Gender"
          :items="genders"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, PropSync, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { cornieClient } from "@/plugins/http";
import search from "@/plugins/search";
import Multiselectsearch from "./multiselectsearch.vue";

@Options({
  name: "SelectGroup",
  components: { Multiselectsearch },
})
export default class addMedications extends Vue {
  @Prop({ type: String, default: "" })
  tab!: string;

  @Prop({ type: String, default: "" })
  selectedSpecialty!: string;

  @Prop({ type: String, default: "" })
  selectedLocation!: string;

  @Prop({ type: Array, default: [] })
  locations!: any[];

  @Watch('experience')
  onChange() {
    if(this.experience === 'All' || this.experience === ''){
      this.search.min = 0;
       this.search.max = 0
    } else {
      const fminmax = this.experience.split(' ')
      console.log(fminmax, 'fminmax')
      const dMinmax = fminmax[0].split('-')
      console.log(dMinmax, 'dminmax')
      // this.search.min = Number(dMinmax[0])
      // this.search.max = Number(dMinmax[1])
    }
  }

  loading = false;
  search: any = {
    specialty: "",
    location: "",
    hospital: "",
    min: 0,
    max: 0,
    insurance: "",
    language: "",
    gender: "",
    rating: "",
    visitType: "",
  };
  specialties: any = [];

  // locations: any = [];

  hospitals: any = [];

  experiences: any = [
    "All",
    "1-5 years",
    "6-10 years",
    "11-15 years",
    "16-20 years",
  ];

  visitTypes = ["Visit", "Walk in", "Virtual"];
  ratings = ["All", "1 star", "2 stars", "3 stars", "4 stars", "5 stars"];
  insurances = ["All", "1-5 years", "6-10 years", "11-15 years", "16-20 years"];
  languages = ["English", "Yoruba", "Ibo", "Hausa", "French"];
  genders = ["All", "Male", "Female"];
  specialtyActive = false;
  locationActive = false;
  hospitalActive = false;
  experienceActive = false;
  experience = "";

  get specialtyPlaceholder() {
    if (this.search.specialty) {
      return this.search.specialty;
    } else {
      return "Specialty";
    }
  }
  get locationPlaceholder() {
    if (this.search.location) {
      return this.search.location;
    } else {
      return "Location";
    }
  }
  get hospitalPlaceholder() {
    if (this.search.hospital) {
      return this.search.hospital;
    } else {
      return "Hospital";
    }
  }
  get experiencePlaceholder() {
    if (this.experience) {
      return `${this.search.min} - ${this.search.max} Years`;
    } else {
      return "Experience";
    }
  }

  @Watch("search", { deep: true })
  handler() {
    this.$emit("searchQuery", this.search);
    this.$router.push(
      `${
        this.$route.path
      }?specialty=${this.search.specialty.toLowerCase()}`
    );
  }

  @Watch("selectedSpecialty") 
  updated() {
    this.selectedSpecialty
      ? (this.search.specialty = (this.selectedSpecialty as any))
      : undefined;
      this.specialtyActive = true;
  }

  @Watch("selecetedLocation") 
  updatedx() {
    this.selectedLocation
      ? (this.search.specialty = (this.selectedLocation as any))
      : undefined;
      this.locationActive = true;
  }

  async findCity(query: any) {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/locations?query=${query}`
      );
      this.locations = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching locations",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async findHospitals(query: any) {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/hospitals?query=${query}`
      );
      this.hospitals = data || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching hospitals",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  async findSpecialtys(query: any) {
    try {
      this.loading = true;
      const { data } = await cornieClient().get(
        `/api/v1/booking-website/search?query=${query}`
      );
      this.specialties = data.specialties || [];
    } catch (error) {
      window.notify({
        msg: "There was an error fetching specialties",
        status: "error",
      });
    } finally {
      this.loading = false;
    }
  }

  setActiveStates() {
    if (this.search.specialty) {
      this.specialtyActive = true;
    }
    if (this.search.location) {
      this.locationActive = true;
    }
    if (this.search.hospital) {
      this.hospitalActive = true;
    }
    if (this.experience) {
      this.experienceActive = true;
    }
  }

  created() {
    this.setActiveStates();
  }
}
</script>

<style scoped>
.x-scroll {
  overflow-x: scroll;
}
.y-visible {
  overflow-y: visible !important;
  height: 80px;
}
</style>
