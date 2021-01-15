<template>
    <div id="my-orders-page">
        <div class="vx-row">
            <!-- LIST -->
            <div class="vx-col w-full">
                <vx-card id="grid_section" class="mt-base">
                    <h3>Order {{ this.$route.params.orderRefNum }}</h3>

                    <vs-table
                            :sst="true"
                            @sort="gridSort"
                            v-model="gridItemSelected"
                            ref="listview"
                            :data="gridData"
                            stripe
                    >
                        <template slot="thead">
                            <vs-th sort-key="domains.domain">
                                Domain
                            </vs-th>
                            <vs-th sort-key="domains.domain_authority">
                                DA
                            </vs-th>
                            <vs-th sort-key="domains.referring_domains">
                                RD
                            </vs-th>
                            <vs-th sort-key="domains.domain_rating">
                                DR
                            </vs-th>
                            <vs-th sort-key="domains.trust_flow">
                                TF
                            </vs-th>
                            <vs-th sort-key="domains.citation_flow">
                                CF
                            </vs-th>
                            <vs-th sort-key="domains.google_index">
                                Google Index
                            </vs-th>
                            <vs-th sort-key="domains.monthly_uniques">
                                Monthly Uniques
                            </vs-th>
                            <vs-th sort-key="domains.category1">
                                1st Category
                            </vs-th>
                            <vs-th sort-key="domains.category2">
                                2nd Category
                            </vs-th>
                            <vs-th sort-key="domains.category2">
                                3rd Category
                            </vs-th>
                            <vs-th sort-key="domains.top_level_domain">
                                TLD
                            </vs-th>
                            <vs-th sort-key="orders_items.price">
                                Price ($)
                            </vs-th>
                        </template>

                        <template slot-scope="{data}">
                            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                <vs-td :data="data[indextr].domain">
                                    {{ data[indextr].domain }}
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
                                    {{ data[indextr].google_index | numeralFormat('0,0') }}
                                </vs-td>

                                <vs-td :data="data[indextr].monthly_uniques">
                                    {{ data[indextr].monthly_uniques | numeralFormat('0,0') }}
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

                                <vs-td :data="data[indextr].price">
                                    {{ data[indextr].price | numeralFormat('$ 0,0.00') }}
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
                return this.$store.state.AppActiveUser
            },
        },
        data: () => ({
            // GRID
            gridItemSelected: [],
            gridSortCol: 'domain',
            gridSortDir: 'asc',
            gridData: [],
        }),
        mounted: function () {
            this.getGridData()
        },
        methods: {
            gridSort(col, direction) {
                if (direction) {
                    this.gridSortDir = direction;
                    this.gridSortCol = col;
                    this.getGridData();
                }
            },
            getGridData() {
                this.$vs.loading();
                // Valid
                this.$http.get(`/orders/${this.$route.params.orderRefNum}`, {
                    params: {
                        sort_col: this.gridSortCol,
                        sort_dir: this.gridSortDir
                    }
                }).then((response) => {
                    this.gridData = response.data.data;

                }, (error) => {
                    let ErrorMsg = '';

                    if (error.response.data.message !== undefined) {
                        ErrorMsg += error.response.data.message + '<br>'
                    }

                    if (error.response.data.errors !== undefined) {
                        for (var key in error.response.data.errors) {
                            ErrorMsg += error.response.data.errors[key] + '<br>'
                        }
                    }

                    this.$vs.notify({
                        color: 'danger',
                        title: 'Error',
                        text: ErrorMsg
                    })
                }).finally(() => {
                    this.$vs.loading.close();
                });
            },
        }
    }
</script>
