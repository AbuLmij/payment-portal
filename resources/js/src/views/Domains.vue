<template>
    <div id="domains-page">
        <div class="vx-row">
            <!-- FILTERS -->
            <div class="vx-col sm:w-full md:w-1/4 lg:w-1/6">
                <vx-card id="filter_section" title="Filters" class="mt-base">
                    <div class="mb-3">
                        Price Range ($)
                        <vs-slider color="primary"
                                   v-model="gridDataFilter.price" ticks step="1" text-fixed="K" max="4"/>
                        <div class="w-full text-center">
                            <small>{{ gridDataFilterPriceLabel }}</small>
                        </div>
                    </div>

                    <div class="mb-3">
                        DA
                        <vs-slider color="primary" ticks step="1" max="100" v-model="gridDataFilter.domain_authority"/>
                        <div class="w-full text-center">
                            <small>{{ gridDataFilterDALabel }}</small>
                        </div>
                    </div>

                    <div class="mb-3">
                        RD
                        <vs-slider color="primary" ticks step="1" text-fixed="0K" max="10"
                                   v-model="gridDataFilter.referring_domains"/>
                        <div class="w-full text-center">
                            <small>{{ gridDataFilterRDLabel }}</small>
                        </div>
                    </div>

                    <div class="mb-3">
                        DR
                        <vs-slider color="primary" ticks step="1" max="100" v-model="gridDataFilter.domain_rating"/>
                        <div class="w-full text-center">
                            <small>{{ gridDataFilterDRLabel }}</small>
                        </div>
                    </div>

                    <div class="mb-3">
                        TF
                        <vs-slider color="primary" ticks step="1" max="100" v-model="gridDataFilter.trust_flow"/>
                        <div class="w-full text-center">
                            <small>{{ gridDataFilterTFLabel }}</small>
                        </div>
                    </div>

                    <div class="mb-3">
                        CF
                        <vs-slider color="primary" ticks step="1" max="100" v-model="gridDataFilter.citation_flow"/>
                        <div class="w-full text-center">
                            <small>{{ gridDataFilterCFLabel }}</small>
                        </div>
                    </div>

                    <div class="mb-3">
                        Monthly Uniques
                        <vs-slider color="primary" ticks step="1" text-fixed="0K" max="10"
                                   v-model="gridDataFilter.monthly_uniques"/>
                        <div class="w-full text-center">
                            <small>{{ gridDataFilterMonthlyUniqueLabel }}</small>
                        </div>
                    </div>

                    <div class="vx-row mb-3">
                        <div class="vx-col w-full">
                            <span>TLD</span>
                        </div>
                        <div class="vx-col w-full">
                            <vs-input class="w-full" v-model="gridDataFilter.top_level_domain" @change="getGridData"/>
                        </div>
                    </div>

                    <div class="vx-row mb-3">
                        <div class="vx-col w-full">
                            <span>Language</span>
                        </div>
                        <div class="vx-col w-full">
                            <vs-input class="w-full" v-model="gridDataFilter.lang" @change="getGridData"/>
                        </div>
                    </div>

                    <div class="vx-row mb-3">
                        <div class="vx-col w-full">
                            <span>Added in the last days</span>
                        </div>
                        <div class="vx-col w-full">
                            <vs-input class="w-full" v-model="gridDataFilter.added_days" @change="getGridData"/>
                        </div>
                    </div>

                    <div class="vx-row mb-3">
                        <div class="vx-col w-full">
                            <span>Search by keyword</span>
                        </div>
                        <div class="vx-col w-full">
                            <vs-input class="w-full" v-model="gridDataFilter.search_keyword" @change="getGridData"/>
                        </div>
                    </div>

                    <div class="vx-row mb-3">
                        <div class="vx-col w-full">
                            <span>Search in</span>
                            <vs-checkbox v-model="gridDataFilter.searchCategory1" @change="getGridData"
                                         class="mt-2 mb-3 ml-0">1st Category
                            </vs-checkbox>
                            <vs-checkbox v-model="gridDataFilter.searchCategory2" @change="getGridData"
                                         class="mb-3 ml-0">2nd Category
                            </vs-checkbox>
                            <vs-checkbox v-model="gridDataFilter.searchCategory3" @change="getGridData"
                                         class="mb-3 ml-0">3rd Category
                            </vs-checkbox>
                        </div>
                    </div>

                    <div class="vx-row mb-3">
                        <!-- <span>Domains per Page</span> -->
                        <div class="vx-col">Domains per Page</div>
                        <div class="vx-col">
                            <center>
                                <vs-input-number v-model="gridPageLimit" :step="50" :min="50" :max="200"
                                                 style="width: 95px"/>
                            </center>
                        </div>
                    </div>

                    <div class="vx-row mt-3 mb-3">
                        <div class="vx-col w-full">
                            <vs-checkbox v-model="gridDataFilter.google_index" class="mb-3 ml-0" @change="getGridData">
                                Google Index
                            </vs-checkbox>
                        </div>
                    </div>

                    <vs-button class="w-full" @click.prevent="gridClearFilters">Clear Filters</vs-button>
                </vx-card>
            </div>

            <!-- LIST -->
            <div class="vx-col sm:w-full md:w-3/4 lg:w-5/6">
                <vx-card id="grid_section" class="mt-base">
                    <vs-table
                            :sst="true"
                            @search="gridSearch"
                            @change-page="gridChangePage"
                            @sort="gridSort"
                            v-model="gridItemSelected"
                            stripe
                            :total="gridTotalData"
                            pagination
                            :maxItems="gridPageLimit"
                            search
                            :data="gridData"
                    >
                        <template slot="header">
                            <vs-dropdown class="grid-limiter-info float-left">
                                <a class="a-icon" href="#">
                                    {{ gridPageLimitInfo }}
                                    <vs-icon class="notranslate icon-scale icon-select vs-select--icon"
                                             icon="expand_more"></vs-icon>
                                </a>
                                <vs-dropdown-menu>
                                    <vs-dropdown-item :key="index" v-for="(item, index) in gridPageLimitArr"
                                                      style="color: inherit" @click="gridChangePageLimit(item)">
                                        {{ item }}
                                    </vs-dropdown-item>
                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </template>

                        <template slot="thead">
                            <vs-th sort-key="domain"> Domain</vs-th>
                            <vs-th sort-key="domain_authority"> DA</vs-th>
                            <vs-th sort-key="referring_domains"> RD</vs-th>
                            <vs-th sort-key="domain_rating"> DR</vs-th>
                            <vs-th sort-key="trust_flow"> TF</vs-th>
                            <vs-th sort-key="citation_flow"> CF</vs-th>
                            <vs-th sort-key="google_index"> Google Index</vs-th>
                            <vs-th sort-key="monthly_uniques"> Monthly Uniques</vs-th>
                            <vs-th sort-key="category1"> 1st Category</vs-th>
                            <vs-th sort-key="category2"> 2nd Category</vs-th>
                            <vs-th sort-key="category2"> 3rd Category</vs-th>
                            <vs-th sort-key="top_level_domain"> TLD</vs-th>
                            <vs-th sort-key="lang"> Language</vs-th>
                            <vs-th sort-key="added_days">
                                Added <br/>
                                (Days)
                            </vs-th>
                            <vs-th sort-key="guest_post"> Guest Post</vs-th>
                            <vs-th sort-key="price"> Price ($)</vs-th>

                            <!-- Only display for regular users -->
                            <vs-td v-if="userType !== 'admin'" class="text-center">
                                <vs-button color="primary" type="filled" icon="check"
                                           @click="gridAddCartAll"></vs-button>
                            </vs-td>
                        </template>

                        <template slot-scope="{ data }">
                            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                <vs-td :data="data[indextr].domain">
                                    <strong class="text-primary">
                                        {{ data[indextr].domain }}
                                    </strong>
                                </vs-td>

                                <!-- MOZ DATA = DA -->
                                <vs-td :data="data[indextr].domain_authority">
                                    {{ data[indextr].domain_authority }}
                                </vs-td>

                                <!-- MAJESTIC = REFD -->
                                <vs-td :data="data[indextr].referring_domains">
                                    {{ data[indextr].referring_domains }}
                                </vs-td>

                                <!-- Ahrefs - Get Ahrefs Data = domain_rating -->
                                <vs-td :data="data[indextr].domain_rating">
                                    {{ data[indextr].domain_rating }}
                                </vs-td>

                                <!-- MAJESTIC = TF -->
                                <vs-td :data="data[indextr].trust_flow">
                                    {{ data[indextr].trust_flow }}
                                </vs-td>

                                <!-- MAJESTIC = CF-->
                                <vs-td :data="data[indextr].citation_flow">
                                    {{ data[indextr].citation_flow }}
                                </vs-td>

                                <vs-td :data="data[indextr].google_index">
                                    {{ data[indextr].google_index > 0 ? "Yes" : "No" }}
                                </vs-td>

                                <vs-td :data="data[indextr].monthly_uniques">
                                    {{ data[indextr].monthly_uniques | numeralFormat("0,0") }}
                                </vs-td>

                                <!-- CATEGORY = ttft0 -->
                                <vs-td :data="data[indextr].category1">
                                    {{ data[indextr].category1 }}
                                </vs-td>

                                <!-- CATEGORY = ttft1 -->
                                <vs-td :data="data[indextr].category2">
                                    {{ data[indextr].category2 }}
                                </vs-td>

                                <!-- CATEGORY = ttft1 -->
                                <vs-td :data="data[indextr].category3">
                                    {{ data[indextr].category3 }}
                                </vs-td>

                                <vs-td :data="data[indextr].top_level_domain">
                                    {{ data[indextr].top_level_domain }}
                                </vs-td>

                                <vs-td :data="data[indextr].lang">
                                    {{ data[indextr].lang }}
                                </vs-td>

                                <vs-td :data="data[indextr].added_days">
                                    {{ data[indextr].added_days }}
                                </vs-td>

                                <vs-td :data="data[indextr].guest_post">
                                    {{ data[indextr].guest_post > 0 ? "Yes" : "No" }}
                                </vs-td>

                                <vs-td class="pl-1 pr-1 pt-5 pb-5" :data="data[indextr].price">
                                    <strong class="text-primary">
                                        {{ data[indextr].price | numeralFormat("$ 0,0.00") }}
                                    </strong>
                                </vs-td>

                                <!-- Only display for regular users -->
                                <vs-td v-if="userType !== 'admin'" :data="tr.id">
                                    <vs-button
                                            :class="{'text-primary': tr.is_in_cart,
                                                        'text-secondary': !tr.is_in_cart}"
                                            color="#eee"
                                            text-color="#adadad"
                                            type="filled"
                                            icon="shopping_cart"
                                            class="btn-add-to-cart"
                                            @click="toggleCartStatus(tr.id)"
                                    ></vs-button>
                                </vs-td>
                            </vs-tr>
                        </template>
                    </vs-table>
                </vx-card>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        components: {},
        computed: {
            activeUserInfo() {
                return this.$store.state.AppActiveUser;
            },
            userType() {
                return this.$store.getters["getUserType"];
            },
            cartData() {
                return this.$store.state.currentCartData;
            },
            gridDataFilterPriceLabel() {
                let label = this.gridDataFilter.price[0] > 0 ? this.gridDataFilter.price[0] + ",000" : "0";
                label += "-";
                label += this.gridDataFilter.price[1] > 0 ? this.gridDataFilter.price[1] + ",000" : "0";

                return label;
            },
            gridDataFilterDALabel() {
                return this.gridDataFilter.domain_authority[0] + "-" + this.gridDataFilter.domain_authority[1];
            },
            gridDataFilterRDLabel() {
                let label = this.gridDataFilter.referring_domains[0] > 0 ? this.gridDataFilter.referring_domains[0] + ",000" : "0";
                label += "-";
                label += this.gridDataFilter.referring_domains[1] > 0 ? this.gridDataFilter.referring_domains[1] + ",000" : "0";

                return label;
            },
            gridDataFilterDRLabel() {
                return this.gridDataFilter.domain_rating[0] + "-" + this.gridDataFilter.domain_rating[1];
            },
            gridDataFilterTFLabel() {
                return this.gridDataFilter.trust_flow[0] + "-" + this.gridDataFilter.trust_flow[1];
            },
            gridDataFilterCFLabel() {
                return this.gridDataFilter.citation_flow[0] + "-" + this.gridDataFilter.citation_flow[1];
            },
            gridDataFilterMonthlyUniqueLabel() {
                let label = this.gridDataFilter.monthly_uniques[0] > 0 ? this.gridDataFilter.monthly_uniques[0] + "0,000" : "0";
                label += "-";
                label += this.gridDataFilter.monthly_uniques[1] > 0 ? this.gridDataFilter.monthly_uniques[1] + "0,000" : "0";

                return label;
            },
        },
        data: () => ({
            // FILTERS
            gridDataFilter: {
                price: [0, 4],
                domain_authority: [0, 100],
                referring_domains: [0, 10],
                domain_rating: [0, 100],
                trust_flow: [0, 100],
                citation_flow: [0, 100],
                monthly_uniques: [0, 10],
                top_level_domain: "",
                lang: "",
                added_days: "",
                search_keyword: "",
                searchCategory1: true,
                searchCategory2: true,
                searchCategory3: true,
                google_index: true,
            },

            defaultGridDataFilter: {
                price: [0, 4],
                domain_authority: [0, 100],
                referring_domains: [0, 10],
                domain_rating: [0, 100],
                trust_flow: [0, 100],
                citation_flow: [0, 100],
                monthly_uniques: [0, 10],
                top_level_domain: "",
                lang: "",
                added_days: "",
                search_keyword: "",
                searchCategory1: true,
                searchCategory2: true,
                searchCategory3: true,
                google_index: true,
            },

            // GRID
            gridItemSelected: [],
            gridPage: 1,
            gridPageLimit: 50,
            gridTotalData: 0,
            gridSearchQuery: "",
            gridSortCol: "domain",
            gridSortDir: "asc",
            gridPageLimitInfo: " - - - - - ",
            gridPageLimitArr: [50, 100, 150, 200],
            gridData: [],
        }),
        watch: {
            gridDataFilterPriceLabel: _.debounce(
                function () {
                    this.getGridData();
                },
                2000,
                {maxWait: 3000}
            ),
            gridDataFilterDALabel: _.debounce(
                function () {
                    this.getGridData();
                },
                2000,
                {maxWait: 3000}
            ),
            gridDataFilterRDLabel: _.debounce(
                function () {
                    this.getGridData();
                },
                2000,
                {maxWait: 3000}
            ),
            gridDataFilterDRLabel: _.debounce(
                function () {
                    this.getGridData();
                },
                2000,
                {maxWait: 3000}
            ),
            gridDataFilterTFLabel: _.debounce(
                function () {
                    this.getGridData();
                },
                2000,
                {maxWait: 3000}
            ),
            gridDataFilterCFLabel: _.debounce(
                function () {
                    this.getGridData();
                },
                2000,
                {maxWait: 3000}
            ),
            gridDataFilterMonthlyUniqueLabel: _.debounce(
                function () {
                    this.getGridData();
                },
                2000,
                {maxWait: 3000}
            ),
            gridPageLimit: _.debounce(
                function (val) {
                    this.gridChangePageLimit(val);
                },
                2000,
                {maxWait: 3000}
            ),
        },
        mounted: function () {
            this.getGridData();
            // 	this.$store.dispatch('updateCartData',JSON.parse('{ "order":[], "order_item":[] }'))
        },

        methods: {
            // GRID
            gridSearch(q) {
                this.gridSearchQuery = q ? q : '';
                this.getGridData();
            },
            gridChangePage(page) {
                this.$data.gridPage = page;
                this.getGridData();
            },
            gridSort(col, direction) {
                if (direction) {
                    this.gridSortDir = direction;
                    this.gridSortCol = col;
                    this.getGridData();
                }
            },
            gridChangePageLimit(limit) {
                this.$data.gridPageLimit = limit;
                this.getGridData();
            },
            gridClearFilters() {
                var self = this.$data;
                self.gridDataFilter = self.defaultGridDataFilter;

                this.getGridData();
            },
            getGridData() {
                var self = this.$data;

                this.$vs.loading();

                // Valid
                this.$http
                    .get("/domains", {
                        params: {
                            sort_col: self.gridSortCol,
                            sort_dir: self.gridSortDir,
                            page: self.gridPage,
                            page_limit: self.gridPageLimit,
                            q: self.gridSearchQuery,
                            gridDataFilter: self.gridDataFilter,
                        },
                    })
                    .then(
                        (response) => {
                            response.data = response.data.data;
                            let dataLength = parseInt(response.data.length) || 0;
                            let currGridPage = parseInt(this.$data.gridPage);
                            let currGridPageLimit = parseInt(this.$data.gridPageLimit);

                            let from = 1;
                            if (currGridPage > 1) {
                                from = currGridPageLimit;
                                if (currGridPage > 2) {
                                    from = (currGridPage - 1) * currGridPageLimit;
                                }
                                from++;
                            }

                            let to = currGridPage > 1 ? currGridPage * currGridPageLimit : currGridPageLimit;
                            to = to > dataLength ? dataLength : to;

                            self.gridPageLimitInfo = from + " - " + to + " of " + dataLength;

                            if (dataLength > 0) {
                                self.gridData = response.data;
                            } else {
                                self.gridData = [];
                            }
                            this.$store.commit("UPDATE_DOMAINS_DATA", self.gridData);
                            self.gridTotalData = dataLength;
                            this.$vs.loading.close();
                        },
                        (error) => {
                            //console.log(error);

                            let ErrorMsg = "";

                            if (error.response.data.message !== undefined) {
                                ErrorMsg += error.response.data.message + "<br>";
                            }

                            if (error.response.data.errors !== undefined) {
                                for (var key in error.response.data.errors) {
                                    ErrorMsg += error.response.data.errors[key] + "<br>";
                                }
                            }

                            this.$vs.notify({
                                color: "danger",
                                title: "Error",
                                text: ErrorMsg,
                            });
                            this.$vs.loading.close();
                        }
                    );
            },
            toggleCartStatus(domain_id) {
                if (this.gridData.find(d => d.id === domain_id).is_in_cart) {
                    this.removeFromCart(domain_id);
                } else {
                    this.addToCart([domain_id]);
                }
            },
            removeFromCart(domain_id) {
                this.$vs.loading();
                this.$store.dispatch('removeItemFromCart', {domain_id}).catch((ErrorMsg) => {
                    this.$vs.notify({
                        color: "danger",
                        title: "Error",
                        text: ErrorMsg,
                    });
                }).finally(() => {
                    this.$vs.loading.close();
                });
            },
            addToCart(ids) {
                this.$vs.loading();
                this.$http.post("/orders/addToCart", {ids}).then((response) => {
                        this.$vs.loading.close();
                        this.$store.dispatch("updateCartData", response.data.data);
                        this.$store.commit('UPDATE_DOMAIN_CART_STATUS', {
                            id: ids,
                            status: 1
                        });

                        this.$vs.notify({
                            color: "success",
                            title: "Cart Updated",
                            text: "Added Item in Cart",
                        });
                    },
                    (error) => {
                        this.$vs.loading.close();

                        let ErrorMsg = "";

                        if (error.response.data.message !== undefined) {
                            ErrorMsg += error.response.data.message + "<br>";
                        }

                        if (error.response.data.errors !== undefined) {
                            for (var key in error.response.data.errors) {
                                ErrorMsg += error.response.data.errors[key] + "<br>";
                            }
                        }

                        this.$vs.notify({
                            color: "danger",
                            title: "Error",
                            text: ErrorMsg,
                        });
                    }
                );
            },
            gridAddCartAll() {
                var self = this.$data;

                let domainIds = self.gridData.map((domain) => domain.id);
                if (domainIds.length > 0) {
                    this.addToCart(domainIds);
                }
            },
        },
    };
</script>
