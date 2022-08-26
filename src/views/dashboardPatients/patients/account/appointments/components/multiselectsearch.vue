<template>
	<div class="relative">
		<div v-if="label" class="mb-2">
			<label>{{ label }}</label>
		</div>
		<button
			ref="select"
			type="button"
			class="d-select-wrapper w-full"
			@focus="openItemList"
		>
			<div
				class="d-select flex items-center"
				:class="{ active: active }"
				@click="toggleListVisiblity"
			>
				<span>
					<img class="mr-2" :src="icon" alt="" />
				</span>
				<div v-if="selectedItem && active" class="overflow-x-hidden capitalize" style="white-space: nowrap;">
					{{ selectedItem[itemLabelProp] }}
				</div>
				<template v-else>
					<span class="cursor-pointer mx-2 overflow-x-hidden capitalize" :class="[active ? 'text-white' : 'text-grey-blue']" style="white-space: nowrap;">{{
						placeholder
					}}</span>
				</template>
				<span class="dropdown-icon">
					<img
						class="cursor-pointer"
						src="/images/book-appointment/arrow-down-grey.png"
						alt=""
					/>
				</span>
			</div>
			<div v-if="itemListVisible" tabindex="-1" class="dropdown-list-wrapper">
				<div class="dropdown-section">
					<input
						ref="search"
						v-model="search"
						class="w-full d-input px-3 py-2 focus:outline-none"
						type="text"
						:placeholder="searchPlaceHolder"
						@blur="closeItemList(true)"
						@keyup="getSearchValue"
					/>
				</div>
				<div v-if="newItemText" class="dropdown-section py-2 px-4">
					<span class="orange-link cursor-pointer" @click="$emit('addNew')">
						{{ newItemText }}
					</span>
				</div>
				<div class="">
					<div class="dropdown-list">
						<div v-if="!items.length" class="py-2 px-4 text-center">
							no items
						</div>
						<div
							v-if="matchingItems.length === 0 && !!items.length"
							class="py-2 px-4 text-center"
						>
							no match found
						</div>
						<div
							v-for="item in matchingItems"
							:key="item[itemValueProp]"
							class="px-4 py-3"
						>
							<input
								:id="item[itemLabelProp]"
								type="checkbox"
								:v-model="item"
								:name="item[itemLabelProp]"
								@change="selectItem(item)"
							/>
							<label :for="item">{{ item[itemLabelProp] }}</label>
						</div>
						<!-- <div
              @click="selectItem(item)"
              v-for="item in matchingItems"
              :key="item[itemValueProp]"
              :class="{
                selected:
                  selectedItem &&
                  selectedItem[itemValueProp] === item[itemValueProp],
              }"
              class="py-2 px-4 dropdown-list-item"
            >
              {{ item[itemLabelProp] }}
            </div> -->
					</div>
				</div>
			</div>
		</button>
	</div>
</template>

<script>
function isObject(value) {
  return Object(value) === value
}

export default {
  name: "MSelect",

  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    searchPlaceHolder: {
      type: String,
      default: "Search ...",
    },
    newItemText: {
      type: String,
      default: ""
    },
    active: {
      type: Boolean,
      default: false
    },

    /*
     * an array of primitives or objects
     */
    items: {
      type: Array,
      default: () => [],
    },
    /*
     * used to identify which property will be used as the value if `items` is an array of items
     * example: <d-select item-label-prop="name">
     * const items = [{ id: 1, name: "Mike" }]
     * Mike will be show in the dropdown
     */
    itemLabelProp: {
      type: String,
      default: "label",
    },
    /*
     * used to identify which property will be used as the value if `items` is an array of items
     * example: <d-select item-value-prop="id" v-model="clientId">
     * const items = [{ id: 1, name: "Mike" }]
     * clientId will be `1` if Mike is selected
     */
    itemValueProp: {
      type: String,
      default: "value",
    },
    /*
     * determines if item value or entire item object is passed to v-model
     * example 1: <d-select item-value-prop="id" v-model="clientId" :items="items">
     * const items = [{ id: 1, name: "Mike" }]
     * clientId will be `1` if Mike is selected
     *
     * example 2: <d-select item-value-prop="id" v-model="client" :items="items" return-object>
     * const items = [{ id: 1, name: "Mike" }]
     * client will be `{ id: 1, name: "Mike" }` if Mike is selected
     */
    returnObject: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      events: [],
      eventListener: null,
      itemListVisible: false,
      search: "",
      selectedItem: null,
    }
  },

  computed: {
    matchingItems() {
      return this.items
        .map(item => {
          if (!isObject(item)) {
            return {
              [this.itemLabelProp]: item,
              [this.itemValueProp]: item,
            }
          }
          return item
        })
        .filter(item => {
          return item[this.itemLabelProp]
            .toString()
            .toLowerCase()
            .includes(this.search.toLowerCase())
        })
    },
  },
  watch: {
    value(value) {
      this.setValue(value)
    },
  },

  mounted() {
    this.setValue(this.value)
    this.setupEventListener()
  },

  unmounted() {
    this.teardownEventListener()
  },

  methods: {
    toggleListVisiblity() {
      if (this.focusing) return (this.focusing = false)
      this.itemListVisible
        ? (this.itemListVisible = false)
        : this.openItemList()
    },
    openItemList(fromFocus = false) {
      if (fromFocus) {
        this.focusing = true
      }
      this.itemListVisible = true
      this.$nextTick(() => {
        this.$refs.search.focus()
      })
    },
    closeItemList(fromBlur = false) {
      if (fromBlur) {
        return setTimeout(() => {
          this.itemListVisible = false
        }, 250)
      }
      this.itemListVisible = false
    },
    selectItem(item) {
      this.active = true
      this.selectedItem = item
      this.itemListVisible = false
      this.$emit("input", this.returnObject ? item : item[this.itemValueProp])
    },
    setupEventListener() {
      this.eventListener = e => {
        if (
          e.target !== this.$refs.dropdown &&
          !this.$refs?.select?.contains(e.target)
        ) {
          this.itemListVisible = false
        }
      }
      document.body.addEventListener("click", this.eventListener)
    },
    teardownEventListener() {
      document.body.removeEventListener("click", this.eventListener)
    },

    setValue(value) {
      if (isObject(value) && this.returnObject) {
        value = value[this.itemValueProp]
      }
      this.selectedItem = this.items.find(item => {
        return item[this.itemValueProp] === value
      })
    },

    getSearchValue() {
      this.$emit("query", this.search)
    }
  },
}
</script>

<style scoped>
.d-select-wrapper {
  appearance: none;
  position: relative;
  text-align: unset;
}

.d-select {
  border-radius: 8px;
  border-width: 1px;
  border-color: #C2C7D6;
  background-color: #fff;
  position: relative;
  padding: 16px 8px;
  line-height: 19px;
  font-size: 12px;
}

.dropdown-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 4px;
  pointer-events: none;
  width: 18px;
  height: 18px;
}

.dropdown-icon > svg {
  height: 20px;
  width: 20px;
}

.dropdown-list-wrapper {
  width: max-content;
  background: #ffffff;
  box-shadow: 0px 1px 5px #3f3f4419;
  border: 1px solid #e7eaf4;
  border-radius: 4px;
  position: absolute;
  z-index: 20;
  margin-top: 8px;
}

.dropdown-list {
  width: 100%;
  overflow-y: scroll;
  max-height: 252px;
}

.dropdown-list-item:hover,
.dropdown-list-item.selected {
  background-color: #f5f5f5;
}

.dropdown-section {
  border-bottom-width: 1px;
  border-color: #dededf;
}

.active {
  color: #ffffff !important;
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  background: #080056;
  border: 1px solid #080056;
  box-sizing: border-box;
  border-radius: 8px;
  white-space: nowrap;
  max-width: 200px;
  opacity: 1!important;
}

input[type="checkbox"]:after {
  border: 1px solid #c4bdbd !important;
}
input[type="checkbox"]:checked:after {
  background-color: #ff0000 !important;
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
  background: #ff0000;
  border-radius: 2px;
}

</style>
