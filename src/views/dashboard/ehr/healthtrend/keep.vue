  <div class="flex flex-col">
        <div class="-my-2 sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="border-0">
              <table class="min-w-full">
                <thead class="border-b-2 border-gray-100">
                  <tr>
                    <th scope="col" class="px-1 py-1 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" class="px-1 py-1 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      practitioner
                    </th>
                    <th scope="col" class="px-1 py-1 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                      Appointment Type
                    </th>
                    <th scope="col" class="px-1  py-1 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                   
                  </tr>
                </thead>
                <tbody class="bg-white ">
                  <tr  class="border-b-2 border-gray-100" v-for="(input, index) in sortAppointments" :key="index">
                    <td class="px-1 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <calendar-icon/>
                        </div>
                        <div class="ml-0">
                          <div class="text-sm font-bold text-primary">
                            {{
                              new Date(
                              input.createdAt
                            ).toLocaleDateString("en-US",{ day: 'numeric', month: 'long', year: 'numeric' })
                            }}
                          </div>
                          <div class="text-sm mt-1 font-light text-gray-800">
                            {{input.newslot}} (1 slot)
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-1 py-1 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                           <span class="rounded-full">
                               <more-actors :items="input.practitioner" v-if="input.practitioner.length > 1"/>
                              <Actors :items="input.practitioner" v-else/>
                          </span>
                        </div>
                        <div class="ml-0">
                          <div class="text-sm font-bold text-black">
                            Dr. {{input.practitioner.firstName +' '+ input.practitioner.lastName}}
                          </div>
                          <div class="text-sm mt-1 font-light text-gray-800">
                            {{input.practitioner.department}}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-1 py-1 whitespace-nowrap text-sm text-black">
                        {{input.appointmentType}}
                    </td>
                    <td class="px-1 py-1 whitespace-nowrap text-sm text-black" v-if="input.Location.length > 0">
                      {{input.location}}
                    </td>
                    <td class="px-1 py-1 whitespace-nowrap text-sm text-black" v-else>
                      No location
                    </td>
                  </tr>

                  <!-- More people... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      