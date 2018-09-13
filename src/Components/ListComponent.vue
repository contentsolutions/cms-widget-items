<template>
    <div class="list-component-wrapper p-2">
        <h1 class="display-4 mb-4">{{$tc('entity', 2)}}</h1>
        <div class="entity-wrapper" v-if="$store.state.options.permissions.read">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 pl-0 mb-3">
                        <a href="#" class="btn btn-primary" @click="$store.commit('updateCurrentView', {page: 'create'})" v-if="$store.state.options.permissions.write">{{$t('createEntity')}}</a>
                    </div>
                    <div class="col-md-6 px-0 mb-3 d-none">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" :placeholder="$t('search') + '...'">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">{{$t('search')}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th>{{$t('title')}}</th>
                    <th class="text-right">{{$tc('action', 2)}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="entity in entityList" v-bind:key="entity.id">
                    <td class="align-middle">{{ entity.title }}</td>
                    <td class="text-right">
                        <a href="#" class="btn btn-sm btn-info mb-1" @click="$store.commit('updateCurrentView', {page: 'view', id: entity.id})">{{$t('view')}}</a>
                        <a href="#" class="btn btn-sm btn-warning mb-1" @click="$store.commit('updateCurrentView', {page: 'update', id: entity.id})" v-if="$store.state.options.permissions.write">{{$t('edit')}}</a>
                        <a href="#" class="btn btn-sm btn-danger mb-1" @click="$store.commit('updateCurrentView', {page: 'delete', id: entity.id})" v-if="$store.state.options.permissions.delete">{{$t('delete')}}</a>
                    </td>
                </tr>
                <tr v-if="entityList.length <= 0">
                    <td class="p-5 text-center" colspan="2">
                        {{ $t('errorNoEntities')}}
                    </td>
                </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation" class="my-5" v-if="paginationData.last_page > 1">
                <ul class="pagination">
                    <li class="page-item" v-if="paginationData.first_page_url && paginationData.current_page > 1">
                        <a class="page-link" href="javascript:" @click="goTo(paginationData.first_page_url)" :aria-label="$tc('first_page')" :title="$tc('first_page')">
                            <span aria-hidden="true">&laquo;</span>
                            <span aria-hidden="true" class="d-none d-md-inline">{{ $tc('first_page') }}</span>
                        </a>
                    </li>
                    <li class="page-item" v-if="paginationData.prev_page_url">
                        <a class="page-link" href="javascript:" @click="goTo(paginationData.prev_page_url)" :aria-label="$tc('prev')" :title="$tc('prev')">
                            <span aria-hidden="true">&lsaquo;</span>
                            <span aria-hidden="true" class="d-none d-md-inline">{{ $tc('prev') }}</span>
                        </a>
                    </li>
                    <li class="page-item"><span class="page-link disabled font-weight-bold">{{ $tc('page') }} {{ paginationData.current_page }}</span></li>
                    <!--
                    <li class="page-item"><a class="page-link" href="javascript:;">1</a></li>
                    <li class="page-item"><a class="page-link" href="javascript:;">2</a></li>
                    <li class="page-item"><a class="page-link" href="javascript:;">3</a></li>
                    -->
                    <li class="page-item" v-if="paginationData.next_page_url">
                        <a class="page-link" href="javascript:" @click="goTo(paginationData.next_page_url)" :aria-label="$tc('next')" :title="$tc('next')">
                            <span aria-hidden="true" class="d-none d-md-inline">{{ $tc('next') }}</span>
                            <span aria-hidden="true">&rsaquo;</span>
                        </a>
                    </li>
                    <li class="page-item" v-if="paginationData.last_page_url && paginationData.current_page !== paginationData.last_page">
                        <a class="page-link" href="javascript:" @click="goTo(paginationData.last_page_url)" :aria-label="$tc('last_page')" :title="$tc('last_page')">
                            <span aria-hidden="true" class="d-none d-md-inline">{{ $tc('last_page') }} ({{ paginationData.last_page }})</span>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>

            </nav>
        </div>
        <div class="entity-wrapper" v-if="!$store.state.options.permissions.read">
            <div class="pl-0 pt-5">
                <p class="lead">
                    {{$t('errorInsufficientPermissions')}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>

    import {config} from '../setup/config';
    import {HttpService} from '../services/HttpService';

    export default {
        name: 'ListComponent',
        data() {
            return {
                entityList: [],
                paginationData: {}
            }
        },

        created() {
            this.fetchList();
        },

        methods: {

            httpInstance() {
                return new HttpService(this.$store.state.options.projectId, this.$store.state.options.apiBaseUrl, this.$store.state.options.apiAccessToken);
            },

            fetchList() {
                let self = this;
                this.httpInstance().get(config.ENDPOINT)
                    .then(function (response) {
                        self.entityList = response.data.data;
                        self.paginationData = response.data;
                        delete self.paginationData.data;
                    })
                    .catch(function (error) {
                        self.httpInstance().handleError(error.response);
                    });
            },

            goTo(ApiPageUrl) {
                let self = this;
                this.httpInstance().get(ApiPageUrl)
                    .then(response => {
                        self.entityList = response.data.data;
                        self.paginationData = response.data;
                        delete self.paginationData.data;
                    })
                    .catch(function (error) {
                        self.httpInstance().handleError(error.response);
                    });

            }
        }
    }
</script>
