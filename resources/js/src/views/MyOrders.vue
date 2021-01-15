<template>
    <div id="my-orders-page">
        <div class="vx-row">
            <!-- LIST -->
            <div class="vx-col w-full">
                <vx-card id="grid_section" class="mt-base">
                    <vs-table
                            :sst="true"
                            @sort="gridSort"
                            v-model="gridItemSelected"
                            ref="listview"
                            :data="gridData"
                            stripe
                    >
                        <template slot="thead">
                            <vs-th sort-key="orders.order_ref_num">
                                Order ID
                            </vs-th>
                            <vs-th sort-key="orders.created_at">
                                Creation Date
                            </vs-th>
                            <vs-th sort-key="domains">
                                Domains
                            </vs-th>
                            <vs-th sort-key="domain_count">
                                Domain Count
                            </vs-th>
                            <vs-th sort-key="orders.total">
                                Total ($)
                            </vs-th>
                            <vs-th sort-key="orders.status">
                                Status
                            </vs-th>
                        </template>

                        <template slot-scope="{data}">
                            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                <vs-td :data="data[indextr].order_id">
                                    <a href="#" color="primary" @click="viewOrderData(data[indextr].order_ref_num)"><b>{{
                                        data[indextr].order_ref_num }}</b></a>
                                </vs-td>

                                <vs-td :data="data[indextr].created_at">
                                    {{ data[indextr].created_at | moment("MMM DD, YYYY hh:mm A") }}
                                </vs-td>

                                <vs-td :data="data[indextr].domains">
                                    {{ data[indextr].domains }}
                                </vs-td>

                                <vs-td :data="data[indextr].domain_count">
                                    {{ data[indextr].domain_count }}
                                </vs-td>

                                <vs-td :data="data[indextr].total">
                                    {{ data[indextr].total | numeralFormat('$ 0,0.00') }}
                                </vs-td>

                                <vs-td :data="data[indextr].status">
                                    {{ data[indextr].status }}
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
            gridSortCol: 'created_at',
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
                this.$http.get('/orders/myorders', {
                    params: {
                        sort_col: this.gridSortCol,
                        sort_dir: this.gridSortDir
                    }
                })
                    .then((response) => {
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
            viewOrderData(order_ref_num) {
                this.$router.push('/orders/' + order_ref_num)
            },
        }
    }
</script>
