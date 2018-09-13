import Vue from 'vue';

// Add Vuex
import Vuex from 'vuex';
import VuexStore from './setup/store';

Vue.use(Vuex);
let store = new Vuex.Store(VuexStore);

import {config} from "./setup/config";

// Add i18n
import VueI18n from 'vue-i18n';
import translations from './setup/translations';
Vue.use(VueI18n);
let i18n = new VueI18n({
    locale: config.DEFAULT_LOCALE,
    fallbackLocale: config.DEFAULT_LOCALE,
    messages: translations
});

import MainComponent from './MainComponent.vue';

new Vue({
    el: config.SELECTOR,
    store: store,
    i18n: i18n,
    render: h => h(MainComponent),
});
