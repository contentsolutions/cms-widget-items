<template>
    <div class="delete-component-wrapper">
        <div class="p-2">
            <h1 class="display-4">{{$t('deleteEntity')}}</h1>
            <div class="entity-wrapper" v-if="$store.state.options.permissions.delete">
                <p class="lead">{{$t('deleteEntityConfirmation')}}</p>
                <p class="lead font-weight-bold">{{selectedEntity.title}}</p>
                <hr class="my-4">
                <p>
                    <button class="btn btn-danger" v-bind:class="{ 'btn-loading': btnLoading }" @click="deleteEntity()">{{$t('delete')}}</button>
                    <button class="btn btn-outline-secondary" @click="$store.commit('updateCurrentView', {page: 'list'})">{{$t('back')}}</button>
                </p>
            </div>
            <div class="entity-wrapper" v-if="!$store.state.options.permissions.delete">
                <div class="pl-0 pt-5">
                    <p class="lead">
                        {{$t('errorInsufficientPermissions')}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {HttpService} from "../services/HttpService";
    import {config} from "../setup/config";
    import Noty from "noty";

    export default {
        name: 'DeleteComponent',
        data() {
            return {
                selectedEntity: {},
                btnLoading: false
            }
        },

        created() {
            this.fetchEntity();
        },

        methods: {

            httpInstance() {
                return new HttpService(this.$store.state.options.projectId, this.$store.state.options.apiBaseUrl, this.$store.state.options.apiAccessToken);
            },

            fetchEntity() {
                let self = this;
                this.httpInstance().get(config.ENDPOINT + '/' + self.$store.state.selectedEntityId)
                    .then(function (response) {
                        self.selectedEntity = response.data;
                    }).catch(function (error) {
                        self.httpInstance().handleError(error.response);
                    });
            },

            deleteEntity() {
                let self = this;
                self.btnLoading = true;

                this.httpInstance().delete(config.ENDPOINT + '/' + self.$store.state.selectedEntityId)
                    .then(function(response) {
                        self.btnLoading = false;
                        self.$store.commit('updateCurrentView', {pag: 'list'});
                        new Noty({text: self.$i18n.t('successDeleteEntity'), type: 'success', timeout: 3000}).show();
                    }).catch(function(error){
                        self.httpInstance().handleError(error.response);
                        self.btnLoading = false;
                    });
            },
        }
    }
</script>
