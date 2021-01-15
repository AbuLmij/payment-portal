<template>
    <div id="domains-page">
        <div class="vx-row">
            <!-- LIST -->
            <div class="vx-col sm:w-full">
                <vx-card id="grid_section" class="mt-base">
                    <vs-table
                            :sst="true"
                            @search="gridSearch"
                            @change-page="gridChangePage"
                            @sort="gridSort"
                            v-model="gridItemSelected"
                            ref="listview"
                            :total="gridTotalData"
                            :max-items="gridPageLimit"
                            :data="gridData"
                            pagination
                            search
                            stripe
                    >
                        <template slot="header">
                            <vs-button class="mr-3 float-left" to="/admin/promos/create">
                                Add
                            </vs-button>

                            <vs-dropdown class="grid-limiter-info float-left">
                                <a class="a-icon" href="#">
                                    {{ gridPageLimitInfo }}
                                    <vs-icon class="notranslate icon-scale icon-select vs-select--icon"
                                             icon="expand_more"></vs-icon>
                                </a>
                                <vs-dropdown-menu>
                                    <vs-dropdown-item :key="index" v-for="(item,index) in gridPageLimitArr"
                                                      style="color:inherit;" @click="gridChangePageLimt(item)">
                                        {{ item }}
                                    </vs-dropdown-item>
                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </template>

                        <template slot="thead">
                            <vs-th sort-key="code">
                                Code
                            </vs-th>
                            <vs-th sort-key="usage_limit">
                                Usage Limit
                            </vs-th>
                            <vs-th sort-key="discount">
                                Discount
                            </vs-th>
                            <vs-th sort-key="created_at">
                                Created On
                            </vs-th>
                        </template>

                        <template slot-scope="{data}">
                            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                <vs-td :data="data[indextr].domain">
                                    <vs-button class="p-0" type="flat" @click="editPromoCode(data[indextr].id)">
                                        {{ data[indextr].code }}
                                    </vs-button>
                                </vs-td>

                                <vs-td :data="data[indextr].usage_limit">
                                    {{ data[indextr].usage_limit > 0 ? data[indextr].usage_limit : "&#8734;" }}
                                </vs-td>

                                <vs-td :data="data[indextr].discount">
                                    {{ data[indextr].discount + "%" }}
                                </vs-td>

                                <vs-td :data="data[indextr].created_at">
                                    {{ data[indextr].created_at | moment("MMM DD, YYYY hh:mm A") }}
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
        computed: {
            activeUserInfo() {
                return this.$store.state.AppActiveUser
            },
        },
        data: () => ({
            // GRID
            gridSelectAll: false,
            gridItemSelected: [],
            gridPage: 1,
            gridPageLimit: 5,
            gridTotalData: 0,
            gridSortCol: 'code',
            gridSortDir: 'asc',
            gridPageLimitInfo: ' - - - - - ',
            gridPageLimitArr: [5, 10, 50, 100, 150, 200],
            gridData: [],
            gridSearchQuery: ''
        }),
        watch: {
            gridSelectAll(val) {
                if (val) {

                } else {

                }
                return false;
            }
        },
        mounted: function () {
            this.getGridData()
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
            getGridData() {
                this.$vs.loading();
                var self = this.$data;

                // Valid
                this.$http.get('/admin/promos', {
                    params: {
                        sort_col: self.gridSortCol,
                        sort_dir: self.gridSortDir,
                        page: self.gridPage,
                        page_limit: self.gridPageLimit,
                        q: self.gridSearchQuery
                    }
                })
                    .then((response) => {
                        response = response.data.data;
                        self.gridData = response.data;

                        let from = parseInt(response.from) || 0;
                        let to = parseInt(response.to) || 0;

                        self.gridPageLimitInfo = from + ' - ' + to + ' of ' + response.total;

                        self.gridTotalData = response.total;

                        this.$vs.loading.close();
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
                    })
            },
            editPromoCode(id) {
                this.$router.push(`/admin/promos/${id}/edit`);
            },
        }
    }
</script>
