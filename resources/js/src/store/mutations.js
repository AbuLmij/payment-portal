/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import router from './../router.js'

const mutations = {


    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu

    TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
        state.isVerticalNavMenuActive = value
    },
    TOGGLE_REDUCE_BUTTON(state, val) {
        state.reduceButton = val
    },
    UPDATE_MAIN_LAYOUT_TYPE(state, val) {
        state.mainLayoutType = val
    },
    UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
        state.verticalNavMenuItemsMin = val
    },
    UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
        state.verticalNavMenuWidth = width
    },


    // VxAutoSuggest

    UPDATE_STARRED_PAGE(state, payload) {

        // find item index in search list state
        const index = state.navbarSearchAndPinList["pages"].data.findIndex((item) => item.url == payload.url)

        // update the main list
        state.navbarSearchAndPinList["pages"].data[index].is_bookmarked = payload.val

        // if val is true add it to starred else remove
        if (payload.val) {
            state.starredPages.push(state.navbarSearchAndPinList["pages"].data[index])
        } else {
            // find item index from starred pages
            const index = state.starredPages.findIndex((item) => item.url == payload.url)

            // remove item using index
            state.starredPages.splice(index, 1)
        }
    },

    // Navbar-Vertical

    ARRANGE_STARRED_PAGES_LIMITED(state, list) {
        const starredPagesMore = state.starredPages.slice(10)
        state.starredPages = list.concat(starredPagesMore)
    },
    ARRANGE_STARRED_PAGES_MORE(state, list) {
        let downToUp = false
        let lastItemInStarredLimited = state.starredPages[10]
        const starredPagesLimited = state.starredPages.slice(0, 10)
        state.starredPages = starredPagesLimited.concat(list)

        state.starredPages.slice(0, 10).map((i) => {
            if (list.indexOf(i) > -1) downToUp = true
        })

        if (!downToUp) {
            state.starredPages.splice(10, 0, lastItemInStarredLimited)
        }
    },


    // ////////////////////////////////////////////
    // UI
    // ////////////////////////////////////////////

    TOGGLE_CONTENT_OVERLAY(state, val) {
        state.bodyOverlay = val
    },
    UPDATE_PRIMARY_COLOR(state, val) {
        state.themePrimaryColor = val
    },
    UPDATE_THEME(state, val) {
        state.theme = val
    },
    UPDATE_WINDOW_WIDTH(state, width) {
        state.windowWidth = width
    },
    UPDATE_WINDOW_SCROLL_Y(state, val) {
        state.scrollY = val
    },


    // /////////////////////////////////////////////
    // Cart Items
    // /////////////////////////////////////////////

    // Updates user cart items in state and localstorage
    UPDATE_CART_DATA(state, payload) {
        for (const property of Object.keys(payload)) {
            if (payload[property] != null) {
                // If some of user property is null - user default property defined in state.AppActiveUser
                state.currentCartData[property] = payload[property]
            }
        }
        // Store data in localStorage
        localStorage.setItem("cartData", JSON.stringify(payload))
    },


    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    // Updates user info in state and localstorage
    UPDATE_USER_INFO(state, payload) {
        for (const property of Object.keys(payload)) {
            if (payload[property] != null) {
                // If some of user property is null - user default property defined in state.AppActiveUser
                state.currentCartData[property] = payload[property]
            }
        }
        state.AppActiveUser = payload;
        localStorage.setItem("userInfo", JSON.stringify(payload));
    },

    UPDATE_USER_INFO_ONLY(state, payload) {
        state.AppActiveUser = payload;
        localStorage.setItem("userInfo", JSON.stringify(payload));
    },

    // /////////////////////////////////////////////
    // Paypal Config
    // /////////////////////////////////////////////

    // Updates user info in state and localstorage
    UPDATE_PP_CONFIG(state, payload) {
        for (const property of Object.keys(payload)) {
            if (payload[property] != null) {
                // If some of user property is null - user default property defined in state.AppActiveUser
                state.currentCartData[property] = payload[property]
            }
        }
        // Store data in localStorage
        localStorage.setItem("ppConfigData", JSON.stringify(payload))
    },

    UPDATE_RESEND_LINK_STATUS(state, {verifyStatus, userEmail}) {
        state.resendLink.status = verifyStatus
        state.resendLink.userEmail = userEmail
    },

    MESSAGE_NOTIFICATION(state, {title, description, color, time}) {
        this._vm.$vs.notify({
            title,
            text: description,
            color,
            time: time | 4500,
        });
    },

    LOGOUT_USER(state) {
        window.$cookies.remove("_DMt");
        localStorage.removeItem("userInfo");
        localStorage.clear();

        router.push({name: 'Login'})
    },

    UPDATE_DOMAINS_DATA(state, payload) {
        state.domainsData = payload;
    },

    UPDATE_DOMAIN_CART_STATUS(state, payload) {
        if (Array.isArray(payload.id)) {
            state.domainsData.forEach(d => {
                if (payload.id.includes(d.id)) {
                    d.is_in_cart = payload.status
                }
            });
        } else {
            let domain = state.domainsData.find(d => d.id === payload.id);
            if (domain) {
                domain.is_in_cart = payload.status;
            }
        }
    }
}

export default mutations
