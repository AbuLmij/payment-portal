<template>
    <div id="domains-page">
        <div class="vx-row">
            <!-- LIST -->
            <div class="vx-col w-full">
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
                            <vs-button class="mr-3 float-left" to="/admin/users/create">
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
                                                      style="color:inherit;" @click="gridChangePageLimit(item)">
                                        {{ item }}
                                    </vs-dropdown-item>
                                </vs-dropdown-menu>
                            </vs-dropdown>
                        </template>

                        <template slot="thead">
                            <vs-th sort-key="type">
                                Type
                            </vs-th>
                            <vs-th sort-key="name">
                                Name
                            </vs-th>
                            <vs-th sort-key="email">
                                E-mail
                            </vs-th>
                            <vs-th sort-key="job_title">
                                Job title
                            </vs-th>
                            <vs-th sort-key="company">
                                Company
                            </vs-th>
                            <vs-th sort-key="website">
                                Website
                            </vs-th>
                            <vs-th sort-key="vat_number">
                                Vat Number
                            </vs-th>
                        </template>

                        <template slot-scope="{data}">
                            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                <vs-td :data="data[indextr].type">
                                    {{ data[indextr].type.toUpperCase() }}
                                </vs-td>

                                <vs-td :data="data[indextr].name">
                                    <vs-button class="p-0" type="flat" @click="editUser(data[indextr].id)">
                                        {{ data[indextr].name }}
                                    </vs-button>
                                </vs-td>

                                <vs-td :data="data[indextr].email">
                                    {{ data[indextr].email }}
                                </vs-td>

                                <vs-td :data="data[indextr].job_title">
                                    {{ data[indextr].job_title }}
                                </vs-td>

                                <vs-td :data="data[indextr].company">
                                    {{ data[indextr].company }}
                                </vs-td>

                                <vs-td :data="data[indextr].website">
                                    {{ data[indextr].website }}
                                </vs-td>

                                <vs-td :data="data[indextr].vat_number">
                                    {{ data[indextr].vat_number }}
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
            cartData() {
                return this.$store.state.currentCartData
            },
        },
        data: () => ({
            // GRID
            gridSelectAll: false,
            gridItemSelected: [],
            gridPage: 1,
            gridPageLimit: 5,
            gridTotalData: 0,
            gridSearchQuery: "",
            gridSortCol: 'name',
            gridSortDir: 'asc',
            gridPageLimitInfo: ' - - - - - ',
            gridPageLimitArr: [5, 10, 50, 100, 150, 200],
            gridData: [],
        }),
        watch: {},
        mounted: function () {
            this.getGridData();
        },
        methods: {
            // GRID
            gridSearch(q) {
                this.gridSearchQuery = q ? q : '';
                this.getGridData();
            },
            gridChangePage(page) {
                this.gridPage = page;
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
                this.getGridData()
            },
            getGridData() {
                this.$vs.loading();
                var self = this.$data;

                // Valid
                this.$http.get('/admin/users', {
                    params: {
                        sort_col: self.gridSortCol,
                        sort_dir: self.gridSortDir,
                        page: self.gridPage,
                        page_limit: self.gridPageLimit,
                        q: self.gridSearchQuery
                    }
                })
                    .then((response) => {
                        self.gridData = response.data.data;

                        let from = parseInt(response.data.from) || 0;
                        let to = parseInt(response.data.to) || 0;

                        self.gridPageLimitInfo = from + ' - ' + to + ' of ' + response.data.total;

                        self.gridTotalData = response.data.total;

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
            editUser(id) {
                this.$router.push(`/admin/users/${id}/edit`);
            },
        }
    }
</script>
