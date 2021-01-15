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
                                    <h4 class="mb-4">Reset Password</h4>
                                    <p>Enter New Password</p>
                                </div>

                                <div>
                                    <vs-input label="Email Address" name="email" v-model="email" class="w-full mt-10"
                                              v-validate="'required|email'" disabled/>

                                    <vs-input
                                            label="Password"
                                            type="password"
                                            ref="password"
                                            name="password"
                                            v-model="password"
                                            class="w-full mt-6"
                                            v-validate="'required|min:6|max:30'"
                                    />
                                    <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first("password") }}</span>

                                    <vs-input
                                            label="Confirm Password"
                                            type="password"
                                            name="confirmPassword"
                                            v-model="confirmPassword"
                                            class="w-full mt-6"
                                            v-validate="'required|confirmed:password'" />
                                    <span class="text-danger text-sm" v-show="errors.has('confirmPassword')">{{ errors.first("confirmPassword") }}</span>

                                    <vs-button class="w-full mt-8 mb-8" @click.prevent="submitForm">Reset Password
                                    </vs-button>

                                    <div class="login-register-footer-block mt-12">
                                        Know your password?
                                        <router-link class="login-register-link" to="/login">Login</router-link>
                                    </div>
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
        data() {
            return {
                email: this.$route.query.email,
                password: '',
                confirmPassword: '',
                token: this.$route.params.token,
            };
        },
        methods: {
            submitForm() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$vs.loading();

                        // Valid
                        this.$http
                            .post("/auth/password/reset", {
                                email: this.email,
                                token: this.token,
                                password: this.password,
                                password_confirmation: this.confirmPassword,
                            })
                            .then(
                                (response) => {
                                    this.$vs.loading.close();

                                    let success = {
                                        title: "Password has been reset successfully",
                                        description: "Please login with your new password",
                                        color: "success",
                                    };
                                    this.$store.commit("MESSAGE_NOTIFICATION", success);
                                    this.$router.push('/login');
                                },
                                (error) => {
                                    this.$vs.loading.close();
                                    let mssgDescription = "";

                                    self.formError = true;
                                    if (error.response.data.message !== undefined) {
                                        mssgDescription = error.response.data.message + "<br>";
                                    }

                                    if (error.response.data.errors !== undefined) {
                                        for (var key in error.response.data.errors) {
                                            mssgDescription += error.response.data.errors[key] + "<br>";
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
                    }
                });
            },
        },
    };
</script>
