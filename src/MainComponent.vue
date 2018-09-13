<template>
    <div class="main-component">
        <ListComponent v-if="$store.state.currentView === 'list'"></ListComponent>
        <ViewComponent v-if="$store.state.currentView === 'view'"></ViewComponent>
        <CreateComponent v-if="$store.state.currentView === 'create'"></CreateComponent>
        <UpdateComponent v-if="$store.state.currentView === 'update'"></UpdateComponent>
        <DeleteComponent v-if="$store.state.currentView === 'delete'"></DeleteComponent>
        <ErrorComponent v-if="$store.state.currentView === 'error'"></ErrorComponent>
    </div>
</template>

<script>
    import ListComponent from './Components/ListComponent';
    import ViewComponent from './Components/ViewComponent';
    import CreateComponent from './Components/CreateComponent';
    import UpdateComponent from './Components/UpdateComponent';
    import DeleteComponent from './Components/DeleteComponent';
    import ErrorComponent from './Components/ErrorComponent';
    import {config} from "./setup/config";
    import translations from "./setup/translations";

    export default {
        name: 'MainComponent',
        components: {
            ListComponent, CreateComponent, DeleteComponent, UpdateComponent, ErrorComponent, ViewComponent
        },
        created() {
            this.loadOptions();
        },
        methods: {
            loadOptions() {
                try {
                    // Load options
                    let jsonString = this.$root.$el.attributes["data-options"].nodeValue;
                    let options = (this.isValidJson(jsonString)) ? JSON.parse(jsonString) : {} ;
                    if (Object.keys(options).length === 0) {
                        throw("Options were not loaded! Please provide a valid JSON object with options.");
                    }

                    // Load Language.
                    // We use session storage because we need to access the current language otside vue scope
                    if (Object.keys(translations).indexOf(options.lang) >= 0) {
                        this.$i18n.locale = options.lang;
                        sessionStorage.setItem('locale', options.lang);
                    } else {
                        this.$i18n.locale = config.DEFAULT_LOCALE;
                        sessionStorage.setItem('locale', config.DEFAULT_LOCALE);
                    }

                    // Load project ID
                    if (options.projectId) {
                        this.$store.state.options.projectId = options.projectId;
                    } else {
                        throw("Options error! Please provide Project ID as part of data-options parameter.");
                    }

                    // Load API Access Token
                    if (options.apiAccessToken) {
                        this.$store.state.options.apiAccessToken = options.apiAccessToken;
                    } else {
                        throw("Options error! Please provide API Access Token as part of data-options parameter.");
                    }

                    // Load API Base URL
                    if (options.apiBaseUrl) {
                        this.$store.state.options.apiBaseUrl = options.apiBaseUrl;
                    } else {
                        throw("Options error! Please provide API Base URL as part of data-options parameter.");
                    }

                    // Load permissions
                    // All permissions are true by default, so unless the permission is set to false, we will enable it
                    if (options.permissions.read === false) {
                        this.$store.state.options.permissions.read = false;
                    }
                    if (options.permissions.write === false) {
                        this.$store.state.options.permissions.write = false;
                    }
                    if (options.permissions.delete === false) {
                        this.$store.state.options.permissions.delete = false;
                    }

                } catch (e) {
                    console.error(e);
                    this.$store.state.currentView = "error";
                }
            },

            isValidJson(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style lang="scss">
    @import './assets/scss/main.scss';
</style>
