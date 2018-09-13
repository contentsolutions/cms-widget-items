<template>
    <div class="update-component-wrapper p-2">
        <h1 class="display-4 mb-4">{{$t('editEntity')}}</h1>

        <div class="entity-wrapper" v-if="$store.state.options.permissions.write">
            <div class="mb-4">

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="title">{{$tc('title')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="title" v-model="selectedEntity.title"/>
                            <small class="form-text text-muted">{{$t('title_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="title">{{$tc('body')}}</label>
                            <textarea readonly class="form-control-plaintext border pl-2" id="body" v-model="selectedEntity.body"></textarea>
                            <small class="form-text text-muted">{{$t('body_description')}}</small>
                        </div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="street">{{$tc('street')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="street" v-model="selectedEntity.street"/>
                            <small class="form-text text-muted">{{$t('street_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="number">{{$tc('number')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="number" v-model="selectedEntity.number"/>
                            <small class="form-text text-muted">{{$t('number_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="level">{{$tc('level')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="level" v-model="selectedEntity.level"/>
                            <small class="form-text text-muted">{{$t('level_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="building">{{$tc('building')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="building" v-model="selectedEntity.building"/>
                            <small class="form-text text-muted">{{$t('building_description')}}</small>
                        </div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="street">{{$tc('street', 2)}}</label>
                            <div class="mb-2" v-for="(item, index) in selectedEntity.streets">
                                <input type="text" readonly class="form-control-plaintext border pl-2" v-model="selectedEntity.streets[index]"/>
                            </div>
                            <div>
                                <small class="form-text text-muted">{{$t('streets_description')}}</small>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="street">{{$tc('area', 2)}}</label>
                            <div class="mb-2" v-for="(item, index) in selectedEntity.areas">
                                <input type="text" readonly class="form-control-plaintext border pl-2" v-model="selectedEntity.areas[index]"/>
                            </div>
                            <div>
                                <small class="form-text text-muted">{{$t('area_description')}}</small>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="street">{{$tc('region', 2)}}</label>
                            <div class="mb-2" v-for="(item, index) in selectedEntity.regions">
                                <input type="text" readonly class="form-control-plaintext border pl-2" v-model="selectedEntity.regions[index]"/>
                            </div>
                            <div>
                                <small class="form-text text-muted">{{$t('region_description')}}</small>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="district">{{$tc('district')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="district" v-model="selectedEntity.district"/>
                            <small class="form-text text-muted">{{$t('district_description')}}</small>
                        </div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="city">{{$tc('city')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="city" v-model="selectedEntity.city"/>
                            <small class="form-text text-muted">{{$t('city_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="postal_code">{{$tc('postal_code')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="postal_code" v-model="selectedEntity.postal_code"/>
                            <small class="form-text text-muted">{{$t('postal_code_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="county">{{$tc('county')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="county" v-model="selectedEntity.county"/>
                            <small class="form-text text-muted">{{$t('county_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="state">{{$tc('state')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="state" v-model="selectedEntity.state"/>
                            <small class="form-text text-muted">{{$t('state_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="state_code">{{$tc('state_code')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="state_code" v-model="selectedEntity.state_code"/>
                            <small class="form-text text-muted">{{$t('state_code_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="county">{{$tc('country')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="country" v-model="selectedEntity.country"/>
                            <small class="form-text text-muted">{{$t('country_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="country_code">{{$tc('country_code')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="country_code" v-model="selectedEntity.country_code"/>
                            <small class="form-text text-muted">{{$t('country_code_description')}}</small>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="main_category">{{$tc('main_category')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="main_category" v-model="selectedEntity.main_category"/>
                            <small class="form-text text-muted">{{$t('main_category_description')}}</small>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="additional_categories">{{$tc('additional_categories')}}</label>
                            <input type="text" readonly class="form-control-plaintext border pl-2" id="additional_categories" v-model="selectedEntity.additional_categories"/>
                            <small class="form-text text-muted">{{$t('additional_categories_description')}}</small>
                        </div>
                    </div>
                </div>

                <div class="form-group mt-5">
                    <button class="btn btn-success" v-bind:class="{ 'btn-loading': btnLoading }" @click="updateEntity()">{{$t('update')}}</button>
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
        name: 'UpdateComponent',
        data() {
            return {
                selectedEntity: {},
                btnLoading: false
            }
        },

        computed: {

            /**
             * Sanitized data for input
             * @return {{}|selectedEntity}
             */
            requestData: function() {
                let requestObject = this.selectedEntity;
                requestObject['locations'] = requestObject.locations.map(entity => entity.id);
                requestObject['images'] = requestObject.images.map(entity => entity.id);
                requestObject['additional_categories'] = requestObject.additional_categories.map(entity => entity.id);
                requestObject['main_category'] = (requestObject.main_category) ? requestObject.main_category.id : '';

                delete requestObject.created_at;
                delete requestObject.created_at;
                delete requestObject.object_type;
                delete requestObject.custom;

                return requestObject;
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

            updateEntity() {
                let self = this;
                self.btnLoading = true;
                this.httpInstance().patch(config.ENDPOINT + '/' + self.$store.state.selectedEntityId, this.requestData)
                    .then(function(response) {
                        self.createdEntity = response.data.data;
                        self.btnLoading = false;
                        new Noty({text: self.$i18n.t('successUpdateEntity'), type: 'success', timeout: 3000}).show();
                    }).catch(function(error){
                        self.httpInstance().handleError(error.response);
                        self.btnLoading = false;
                    });
            },
        }
    }
</script>
