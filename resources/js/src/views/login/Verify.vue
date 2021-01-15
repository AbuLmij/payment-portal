<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card fixedHeight class="login-register-form-wrapper">
                <div slot="no-body" class="full-page-bg-color">
                    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12" class="bg-white">
                        <div class="vx-col hidden lg:block lg:w-1/2">
                            <img src="@assets/images/pages/login.png" alt="login" class="w-full"/>
                        </div>

                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
                            <div class="p-8 h-full">
                                <div class="vx-card__title mb-4">
                                    <h4 class="mb-4">Verify Email</h4>
                                    <p class="mb-4">Verifying your email, please wait...</p>
                                </div>
                            </div>
                        </div>
                    </vs-row>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
    window.$cookies.remove("_DMt");

    export default {
        methods: {
            verifyAccount() {
                let userId = this.$route.params.id;
                let query = this.$route.query;
                this.$vs.loading();

                this.$http
                    .get(`/email/verify/${userId}`, {params: query})
                    .then(() => {
                        let success = {
                            title: "Your account is verified successfully",
                            color: "success",
                            time: 5500,
                        };
                        this.$store.commit("MESSAGE_NOTIFICATION", success);
                    })
                    .catch(error => {
                        let mssgDescription = "An error occurred";

                        // self.formError = true;
                        if (error.response.data.message !== undefined) {
                            mssgDescription = error.response.data.message;
                        }

                        if (error.response.data.errors !== undefined) {
                            mssgDescription += ":";
                            for (var key in error.response.data.errors) {
                                mssgDescription += "\n" + error.response.data.errors[key];
                            }
                        }

                        let fail = {
                            title: "Oops",
                            description: mssgDescription,
                            color: "danger",
                            time: 5000,
                        };
                        this.$store.commit("MESSAGE_NOTIFICATION", fail);
                    })
                    .finally(() => {
                        this.$vs.loading.close();
                        this.$router.push({name: "Login"});
                    });
            }
        },
        mounted() {
            this.verifyAccount()
        }
    };
</script>

<style lang="scss">
</style>
