/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import api from './../axios.js'
import store from './../store/store.js'

const actions = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({commit}, width) {

        commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({commit}, payload) {
        commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({commit}, list) {
        commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({commit}, list) {
        commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({commit}) {
        commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({commit}, val) {
        commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // Cart Items
    // /////////////////////////////////////////////
    updateCartData({commit}, payload) {
        commit('UPDATE_CART_DATA', payload)
    },

    getCartData() {
        return api.get("user/cart")
            .then(response => {
                store.dispatch("updateCartData", response.data.data);
                return response;
            })
            .catch(error => {
                return error;
            });
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({commit}, payload) {
        commit('UPDATE_USER_INFO', payload)
    },

    // /////////////////////////////////////////////
    // Paypal Config
    // /////////////////////////////////////////////

    updatePpConfig({commit}, payload) {
        commit('UPDATE_PP_CONFIG', payload)
    },

    async resendVerificationEmailLink({commit}, email) {
        return await api.get(`/resend/${email}`)
            .then(res => {
                    if (res.status == 201) {
                        let success = {
                            title: 'Email Verification Sent',
                            description: res.data.message,
                            color: 'success',
                            time: 5500
                        }
                        commit("MESSAGE_NOTIFICATION", success)
                    }

                },
                (error) => {
                    console.log(error, 'something went wrong on the go');
                    let fail = {
                        title: 'Oops',
                        description: 'Something went wrong.',
                        color: 'danger'
                    }
                    commit("MESSAGE_NOTIFICATION", fail)
                })
    },

    // Fetching user's profile information
    async fetchUserInfo({commit}) {
        return await api.get("/user")
            .then(response => {
                    if (response.status == 200) {
                        commit('UPDATE_USER_INFO_ONLY', response.data);
                        return response.data;
                    }
                },
                (error) => {
                    let fail = {
                        title: 'Oops',
                        description: 'Something went wrong.Try page refresh.',
                        color: 'danger'
                    };
                    commit("MESSAGE_NOTIFICATION", fail)
                }
            );
    },

    // Updating user's profile information
    async updateUserProfile({commit}, params) {
        return await api.patch("/user/profile", params)
            .then(res => {
                if (res.status == 200) {
                    let success = {
                        title: 'Success',
                        description: 'Your profile changes have been saved.',
                        color: 'success'
                    };
                    commit("MESSAGE_NOTIFICATION", success);
                    // update user information
                    commit("UPDATE_USER_INFO_ONLY", res.data.updatedInfo);
                }
                return res;
            }, error => {
                let fail = {
                    title: 'Oops',
                    description: 'Something went wrong.Try again.',
                    color: 'danger'
                };
                commit("MESSAGE_NOTIFICATION", fail);
            });
    },

    // Update user's password
    async updateUserPassword({commit}, params) {
        return await api.patch("/user/password/", params)
            .then(res => {
                let success = {
                    title: 'Success',
                    description: 'Your password has been updated',
                    color: 'success'
                };
                commit("MESSAGE_NOTIFICATION", success);
                return res;
            }, error => {
                let mssgDescription = '';
                if (error.response.data.message !== undefined) {
                    mssgDescription = error.response.data.message + "<br>";
                }

                if (error.response.data.errors !== undefined) {
                    for (var key in error.response.data.errors) {
                        mssgDescription += error.response.data.errors[key] + "<br>";
                    }
                }
                let fail = {
                    title: 'Oops',
                    description: mssgDescription,
                    color: 'danger'
                };
                commit("MESSAGE_NOTIFICATION", fail);
            });
    },

    // Logout users
    removeItemFromCart({commit}, payload) {
        return new Promise((resolve, reject) => {
            api.delete("/orders/removeCartItem/" + payload.domain_id).then(
                (response) => {
                    store.dispatch("updateCartData", response.data.data);
                    commit('UPDATE_DOMAIN_CART_STATUS', {
                        id: payload.domain_id,
                        status: 0
                    });
                    resolve(response);
                },
                (error) => {
                    let ErrorMsg = "";

                    if (error.response.data.message !== undefined) {
                        ErrorMsg += error.response.data.message + "<br>";
                    }

                    if (error.response.data.errors !== undefined) {
                        for (var key in error.response.data.errors) {
                            ErrorMsg += error.response.data.errors[key] + "<br>";
                        }
                    }
                    reject(ErrorMsg);
                }
            );
        });
    },

    // Logout users
    async logoutUser({commit}) {
        return await api.get("/auth/logout").then(
            (response) => {
                commit('LOGOUT_USER')

                let success = {
                    title: "Signing Off",
                    description: 'You\'re logout. Try to login again.',
                    color: "warning",
                    time: 3500,
                };
                commit('MESSAGE_NOTIFICATION', success)
                return response
            },
            (error) => {
                // response either success or fail, must logout the users account
                commit('LOGOUT_USER')
            }
        );
    }
}

export default actions
