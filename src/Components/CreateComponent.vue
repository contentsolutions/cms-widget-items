<template>
    <div class="create-component-wrapper p-2">
        <h1 class="display-4 mb-4">{{$t('createEntity')}}</h1>
        <div class="entity-wrapper" v-if="$store.state.options.permissions.write">
            <div class="mb-4">
                <div class="form-group">
                    <label for="title">{{$t('title')}}</label>
                    <input type="text" class="form-control" id="title" v-model="fields.title"/>
                </div>

                <div class="form-group mt-5">
                    <button class="btn btn-success" v-bind:class="{ 'btn-loading': btnLoading }" @click="createEntity()">{{$t('create')}}</button>
                    <button class="btn btn-outline-secondary" @click="$store.commit('updateCurrentView', {page: 'list'})">{{$t('back')}}</button>
                </div>
            </div>
        </div>
        <div class="entity-wrapper" v-if="!$store.state.options.permissions.write">
            <div class="pl-0 pt-5">
                <p class="lead">
                    {{$t('errorInsufficientPermissions')}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>

    import {config} from "../setup/config";
    import {HttpService} from "../services/HttpService";
    import Noty from "noty";

    export default {
        name: 'CreateComponent',
        data() {
            return {
                createdEntity: {},
                btnLoading: false,
                fields: {
                    title: null
                }
            }
        },

        methods: {

            httpInstance() {
                return new HttpService(this.$store.state.options.projectId, this.$store.state.options.apiBaseUrl, this.$store.state.options.apiAccessToken);
            },

            createEntity() {
                let self = this;
                self.btnLoading = true;

                this.httpInstance().post(config.ENDPOINT, {
                        title: this.fields.title
                    })
                    .then(function (response) {
                        self.createdEntity = response.data.data;
                        self.btnLoading = false;
                        self.$store.commit('updateCurrentView', {pag: 'list'});
                        new Noty({text: self.$i18n.t('successCreateEntity'), type: 'success', timeout: 3000}).show();
                    })
                    .catch(function (error) {
                        self.httpInstance().handleError(error.response);
                        self.btnLoading = false;
                    });
            },
        }
    }
</script>
