<template>
    <div id="domain-add">
        <vs-row vs-align="flex-start" vs-type="flex" vs-justify="space-around" vs-w="12">
            <div class="vx-col sm:w-full md:w-3/12 lg:w-3/12">
                <form>
                    <vx-card title="Import" class="mt-base px-5 pt-3" id="domain_import_form">
                        <vs-upload
                                automatic
                                :accept="'.csv,.xls,.xlsx'"
                                :action="uploadActionURL"
                                :headers="headersUpload"
                                @on-success="successUpload"
                                @on-error="errorUpload"
                                fileName="importFile"
                                id="file-input"
                                class="text-center"
                                text="Import Data"
                                limit="1"
                        />
                        <h6 class="mt-4 mb-2">Import Guide:</h6>
                        <small>
                            <span class="text-warning text-bold">Your data should be in the correct format. The first line of your file should be the column headers.</span>
                        </small>
                    </vx-card>
                </form>
            </div>
            <div class="vx-col sm:w-full md:w-7/12 lg:w-7/12" v-if="showMappingOfData">
                <vx-card title="Field Mapping" class="mt-base px-5 pt-3">
                    <div class="flex justify-center items-center my-2">
                        <vs-button color="primary" type="filled" class="text-center" @click="submitFieldMapping"
                                   icon="publish">Upload Data
                        </vs-button>
                    </div>
                    <table class="flex justify-center align-center flex-col md:px-10 lg:px-10">
                        <tr v-for="(item, index) in fieldMapping" :key="index" class="flex justify-center align-center">
                            <td class="py-1 px-3 w-1/3">
                                <span class="text-bold">{{item.field}}</span>
                            </td>
                            <td class="py-1 px-3 w-3/4">
                                <select class="w-full text-md py-2 px-3 border-1 border-grey rounded-lg"
                                        v-model="item.index_of_csv_field">
                                    <option class="block font-semibold" value="" selected></option>
                                    <option :value="i" class="block font-semibold" v-for="(data,i) in importedData[0]"
                                            :key="i">
                                        {{data}}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </vx-card>
            </div>
        </vs-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                uploadActionURL: process.env.MIX_DATA_API_URL + "admin/domains/import",
                headersUpload: {
                    Authorization: "Bearer " + window.$cookies.get("_DMt"),
                },
                file: null,
                showFormAlert: false,
                formStatus: false,
                formErrorMsg: "",
                importedData: [],
                showMappingOfData: false,
                fieldMapping: [],

            };
        },
        mounted() {
            const self = this
            // $(document.body).on('click', '.btn-x-file', function () {
            //     self.showMappingOfData = false;
            //     self.importedData = [];
            //     self.fieldMapping = [];
            //
            // });
        },
        computed: {
            activeUserInfo() {
                return this.$store.state.AppActiveUser
            },
        },
        methods: {
            successUpload: function (response) {
                this.resetAlerts();
                const res = JSON.parse(response.currentTarget.response);

                this.$vs.loading.close();

                let notice = {
                    title: 'Success',
                    description: res.message,
                    color: 'success',
                    time: 4500,
                };
                this.$store.commit("MESSAGE_NOTIFICATION", notice);
                this.$router.push({name: 'Domains List'});
                // const formattedData = JSON.parse(data1);
                // self.importedData = formattedData.data;
                // self.fieldMapping = formattedData.fields;
                // self.showMappingOfData = true;


                // if (reply.length > 0) {
                // 	if (reply.length > 3) {
                // 		titleMessage = "Uploaded Anyway";
                // 		self.formErrorMsg = "Records are successfully added. But, there were domain names already exist in the table. Or the file column for domain names are empty.";
                // 		color = "warning";
                // 		time = 9500;
                // 	}

                // 	if (reply.length === 1) {
                // 		titleMessage = "Uploaded Anyway";
                // 		self.formErrorMsg = "But there were " + reply[0].errorInfo[2];
                // 		color = "warning";
                // 		time = 6000;
                // 	}
                // 	// console.log(reply, "replies");
                // }
            },

            errorUpload: function (err) {
                var self = this.$data;
                this.resetAlerts();

                self.formErrorMsg = "";
                let titleMessage = "Oops!";
                let color = "danger";
                let time = 4500;

                let currentTarget = err.currentTarget;

                // Internal server error, then stop here to avoid errors on console
                if (currentTarget.status === 500) {
                    let fail = {
                        title: titleMessage,
                        description: "Something went wrong on your file. Make sure your file contains valid column records.",
                        color: "danger",
                        time: 5500,
                    };
                    this.$store.commit("MESSAGE_NOTIFICATION", fail);
                    return;
                }

                let reply = JSON.parse(err.currentTarget.response);

                if (reply.message) {
                    self.formErrorMsg = reply.message;
                    time = 6500;
                }

                this.$vs.loading.close();

                let fail = {
                    title: titleMessage,
                    description: self.formErrorMsg,
                    color: "danger",
                    time: time,
                };
                this.$store.commit("MESSAGE_NOTIFICATION", fail);
            },

            resetAlerts: function () {
                var self = this.$data;
                self.showFormAlert = false;
                self.formStatus = false;
                self.formErrorMsg = "";
            },

            submitFieldMapping: function () {
                this.$vs.loading();
                this.$http
                    .post("admin/domains/save_mapping", {
                        field_mapping: this.fieldMapping,
                        data: this.importedData,
                        user_id: this.activeUserInfo.id
                    })
                    .then(
                        (response) => {
                            this.$vs.loading.close();

                            let success = {
                                title: "Success",
                                description: "Data has been succesfully imported.",
                                color: "success",
                            };
                            this.$store.commit("MESSAGE_NOTIFICATION", success);

                            this.backToDomain();
                        },
                        (error) => {
                            this.$vs.loading.close();
                            let mssgDescription = "";
                            if (error.response.data.message !== undefined) {
                                mssgDescription = error.response.data.message;
                            }

                            if (error.response.data.errors !== undefined) {
                                for (var key in error.response.data.errors) {
                                    mssgDescription += error.response.data.errors[key];
                                }
                            }

                            let fail = {
                                title: "Oops",
                                description: mssgDescription,
                                color: "danger",
                            };
                            this.$store.commit("MESSAGE_NOTIFICATION", fail);
                        }
                    );
            },
            backToDomain() {
                this.$router.push({name: "Domains List"});
            },
        },
    };
</script>
