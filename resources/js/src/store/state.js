/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import navbarSearchAndPinList from "@/layouts/components/navbar/navbarSearchAndPinList"
import themeConfig from "@/../themeConfig.js"
import colors from "@/../themeConfig.js"

// /////////////////////////////////////////////
// Helper
// /////////////////////////////////////////////

// *From Auth - Data will be received from auth provider
/*
const userDefaults = {
  uid         : 0,          // From Auth
  displayName : "John Doe", // From Auth
  about       : "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
  photoURL    : require("@assets/images/portrait/small/avatar-s-11.jpg"), // From Auth
  status      : "online",
  userRole    : "admin"
}
*/


// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components
const is_touch_device = () => {
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = function (query) {
        return window.matchMedia(query).matches;
    }

    if (('ontouchstart' in window) || window.DocumentTouch) {
        return true;
    }

    // include the 'heartz' as a way to have a non matching MQ to help terminate the join
    // https://git.io/vznFH
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

const get_currentUserData = () => {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo == null) {
        return JSON.parse('{}');
    } else {
        return JSON.parse(userInfo);
    }
};

const get_currentCartData = () => {
    var cartData = localStorage.getItem("cartData");
    if (cartData == null) {
        return JSON.parse('{ "order":[], "order_item":[] }');
    } else {
        return JSON.parse(localStorage.getItem("cartData"));
    }
}


const get_ppConfigData = () => {
    var ppConfigData = localStorage.getItem("ppConfigData");
    if (ppConfigData == null) {
        return JSON.parse('{}');
    } else {
        return JSON.parse(localStorage.getItem("ppConfigData"));
    }
}


// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
    AppActiveUser: get_currentUserData(),
    currentCartData: get_currentCartData(),
    ppConfigData: get_ppConfigData(),
    bodyOverlay: false,
    isVerticalNavMenuActive: true,
    is_touch_device: is_touch_device(),
    mainLayoutType: themeConfig.mainLayoutType || "vertical",
    navbarSearchAndPinList: navbarSearchAndPinList,
    reduceButton: themeConfig.sidebarCollapsed,
    verticalNavMenuWidth: "reduced",
    verticalNavMenuItemsMin: false,
    scrollY: 0,
    starredPages: navbarSearchAndPinList["pages"].data.filter((page) => page.is_bookmarked),
    theme: themeConfig.theme || "light",
    themePrimaryColor: colors.primary,
    domainsData: [],

    // Can be used to get current window with
    // Note: Above breakpoint state is for internal use of sidebar & navbar component
    windowWidth: null,

    resendLink: {
        status: false,
        userEmail: null
    }
}

export default state
