<template>
    <div class="container mx-auto">
        <div class="w-full border-b-2 curved flex py-2">
            <div class="w-9/12 flex font-bold text-xl py-2">
                <h2>Create a New Role</h2>
            </div>
            <div class="w-9/12 flex items-center justify-end">
                <!-- <span class="cursor-pointer"><i class="pi pi-exclamation-circle p-2"></i> User Stats</span> -->
            </div>
        </div>

            <SideModal :show="false" >
                <ModalContent />
                <template v-slot:cancel>
                    <Button :loading="false" >
                    <button class="close_btn_border mr-3 text-gray-500 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
                        Close
                    </button>
                    </Button>
                </template>
            </SideModal>
            

        <div class="w-full curved flex py-2 mt-8">
            <div class="w-4/12">
                <cornie-input :label="'Role Name'" v-model="role.name" class="w-full" style="width: 100%" placeholder="--Enter--" />
            </div>
            <div class="w-1/12"></div>
            <div class="w-4/12">
                <cornie-input :label="'Description'" v-model="role.description" class="w-full" style="width: 100%" placeholder="--Enter--" />
            </div>
        </div>

        <div class="w-full border-b-2 curved flex py-2 mt-5">
            <div class="w-full flex font-bold text-lg py-2">
                <h2>Access Control</h2>
            </div>
        </div>

        <div class="w-full flex items-center py-2 mt-5">
            <div class="w-8/12">
                <p>
                    Grant access to modules and define privileges within said modules for this role. Any user assigned this role will be able to access the defined modules and will be restricted to whatever privileges you have granted within the accessed modules.
                </p>
            </div>
            <div class="w-4/12 flex justify-end">
                <Button @click="toggleSideBar" class="import_button px-8 py-2 ">
                    <span class="flex items-center">
                        <Icon :type="3" />
                        <span class="ml-2">Import from Role</span>
                    </span>
                </Button>
            </div>
        </div>

        <div class="w-full mt-5">
            <Accordion title="Accounting" v-model="showAccounting">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Accounting </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Analytics" v-model="showAnalytics">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Analytics </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Billing and Payments" v-model="showBilling">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Billing and Payments </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Certificates" v-model="showCertificates">
                <template v-slot:title>
                    <p class="flex justify-between"><span> </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Clinical" v-model="showClinicals">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Billing and Payments </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Diagnostics" v-model="showDiagnostics">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Billing and Payments </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Engagements" v-model="showEngagements">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Billing and Payments </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="In-Patients" v-model="showPatients">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Billing and Payments </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Medications" v-model="showMedications">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Billing and Payments </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Referrals" v-model="showReferrals">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Billing and Payments </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>

            <Accordion title="Suppoort" v-model="showSupport">
                <template v-slot:title>
                    <p class="flex justify-between"><span>Billing and Payments </span></p>
                </template>
                <template v-slot:default>
                    <div class="container my-3 p-3">
                        <span class="flex items-center">
                            <ToggleCheck :checkedText="''" :uncheckedText="''" />
                            <span class="ml-2 font-semibold">Allow access to this module</span>
                        </span>
                    </div>

                    <div class="w-full px-3">
                        <div class="container flex justify-between flex-auto">
                            <div class="w-full flex items-center">
                                <div class="border-b-2 w-full"></div>
                            </div>
                            <div class="w-3/12 flex justify-end">
                                <span class="flex ">
                                    <div class="box_1 flex justify-center"><span class="text-white font-bold">—</span></div>
                                    <span class="ml-2">Access All Privileges</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <h2 class="p-3 modal_subheader mt-3">Privileges</h2>
                    </div>
                    <div class="w-full px-3">
                        <div class="container border rounded-md flex mb-2 py-3">
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container side_border p-3" id="sideBorder">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                            <div class="w-4/12">
                                <div class="container p-3">
                                    <Checkbox :label="'Create shift shedules'" />
                                    <Checkbox :label="'Create shift shedules'" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Accordion>
        </div>

        <div class="w-full my-5">
            <div class="container flex justify-end">
                <Button class="import_button px-8 py-2"
                     @click="
                        $router.push({ name: 'Roles'})
                    "
                >
                    Cancel
                </Button>

                <Button style="background: #FE4D3C" @click="onSubmit" class="px-8 py-2 ml-3 bg-red-500 rounded-full text-white font-bold">
                    Save
                </Button>
            </div>
        </div>

            
    <SideModal :show="sideBarShown" @close-modal="toggleSideBar">
      <ImortPrivilege />
      <template v-slot:cancel>
        <Button :loading="false" >
          <button @click="toggleSideBar" class="close_btn_border mr-3 text-gray-500 focus:outline-none text-white font-bold py-3 px-8 rounded-full">
            Close
          </button>
        </Button>
      </template>
      <!-- <template v-slot:accept>
        <Button :loading="false">
          <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full">
            New Role
          </button>
        </Button>
      </template> -->
    </SideModal>


    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CornieInput from '@/components/cornieinput.vue'
import Button from '@/components/globals/corniebtn.vue'
import Accordion from '@/components/accordion-component.vue'
import Checkbox from '@/components/custom-checkbox.vue';
import ToggleCheck from '@/components/ToogleCheck.vue';
// import Tooltip from '@/components/tooltip.vue';
import ImortPrivilege from './components/import-privileges.vue'
import Icon from './components/icon.vue'

import SideModal from '@/components/modal-right.vue'
// import ModalContent from './components/import-privileges.vue'
import { namespace } from 'vuex-class';
import modules from './util/role-modules'

const roles = namespace('roles');

@Options({
  components: {
    CornieInput,
    Button,
    Accordion,
    Checkbox,
    ToggleCheck,
    SideModal,
    // ModalContent,
    ImortPrivilege,
    Icon,
    // Tooltip,
  },
})
export default class RolesAndPrivileges extends Vue {
    hello() {
        alert('hi')
    }

    sideBarShown = false;

    showAccounting = true;
    showAnalytics = false;
    showBilling = false;
    showCertificates = false;
    showClinicals = false;
    showDiagnostics = false;
    showEngagements = false;
    showPatients = false;
    showMedications = false;
    showReferrals = false;
    showSupport = false;


    @roles.State
    org!: any;

    role: any = { }

    @roles.Action
    createRole!: (role: any) => any;

    @roles.Action
    getOrg!: () => any;


    toggleSideBar() {
        this.sideBarShown = !this.sideBarShown;
    }

    async created() {
        console.log(modules, 'modules');
        
        await this.getOrg();
    }

    get orgId() {
        if (!this.org) return '';
        console.log(this.org, "gggg");
        
        return this.org.id;
    }

    onSubmit() {
        this.role.orgId = this.org.id;
        this.createRole(this.role);
    }

}
</script>
<style>
    .import_button {
        border: 1px solid #080056;
        box-sizing: border-box;
        border-radius: 124px;
        color: #080056;
        font-weight: bold;
    }

    .box_border {
        border: 1px solid #6F6C93 !important;
        /* border-left: 1px solid #6F6C93 !important; */
    }

    #sideBorder {
        border-right: 1px solid #6F6C93 !important;
        border-left: 1px solid #6F6C93 !important;
    }

    .modal_subheader {
        font-size: 18px;
        font-weight: 700;
        color: #1F1514;
    }

    .box_1 {
        width: 24px;
        height: 24px;
        background: #080056;
    }

    input[type=checkbox] {
        background: #9e9dad !important;
    }

    input[type="checkbox"]:checked {
        background: yellow !important;
    }

    input[type="checkbox"]:checked .slider {
        background: yellow !important;
    }

    /* .bordered {
        border: 1px solid #6F6C93;
        border-radius: 8px;
    } */
</style>
