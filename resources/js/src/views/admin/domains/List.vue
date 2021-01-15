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
						stripe
						:total="gridTotalData"
						pagination
						:maxItems="gridPageLimit"
						search
						:data="gridData"
					>
						<template slot="header">
							<vs-button class="mr-3 float-left" to="/admin/domains/add"> Add </vs-button>

							<vs-button color="success" class="mr-3 float-left" to="/admin/domains/import"> Import </vs-button>

							<vs-dropdown class="grid-limiter-info float-left">
								<a class="a-icon" href="#">
									{{ gridPageLimitInfo }}
									<vs-icon class="notranslate icon-scale icon-select vs-select--icon" icon="expand_more"></vs-icon>
								</a>
								<vs-dropdown-menu>
									<vs-dropdown-item :key="index" v-for="(item, index) in gridPageLimitArr" style="color: inherit" @click="gridChangePageLimit(item)">
										{{ item }}
									</vs-dropdown-item>
								</vs-dropdown-menu>
							</vs-dropdown>
						</template>

						<template slot="thead">
							<vs-th sort-key="domain"> Domain </vs-th>
							<vs-th sort-key="available"> Available </vs-th>
							<vs-th sort-key="domain_authority"> DA </vs-th>
							<vs-th sort-key="referring_domains"> RD </vs-th>
							<vs-th sort-key="domain_rating"> DR </vs-th>
							<vs-th sort-key="trust_flow"> TF </vs-th>
							<vs-th sort-key="citation_flow"> CF </vs-th>
							<vs-th sort-key="google_index"> Google Index </vs-th>
							<vs-th sort-key="monthly_uniques"> Monthly Uniques </vs-th>
							<vs-th sort-key="category1"> 1st Category </vs-th>
							<vs-th sort-key="category2"> 2nd Category </vs-th>
							<vs-th sort-key="category2"> 3rd Category </vs-th>
							<vs-th sort-key="top_level_domain"> TLD </vs-th>
							<vs-th sort-key="lang"> Language </vs-th>
							<vs-th sort-key="added_days">
								Added <br />
								(Days)
							</vs-th>
							<vs-th sort-key="guest_post"> Guest Post </vs-th>
							<vs-th sort-key="price" class="pl-1 pr-1"> Price ($) </vs-th>
						</template>

						<template slot-scope="{ data }">
							<vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
								<vs-td :data="data[indextr].domain">
									<vs-button class="p-0" type="flat" @click="editDomain(data[indextr].id)">
										<b>{{ data[indextr].domain }}</b>
									</vs-button>
								</vs-td>

								<vs-td :data="data[indextr].available">
									<vs-avatar v-if="data[indextr].available > 0" size="small" color="success" icon="check" />
									<vs-avatar v-else size="small" color="danger" icon="close" />
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

								<!-- CATEGORY = ttft2 -->
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

								<vs-td class="pl-1 pr-1" :data="data[indextr].price">
									<b>{{ data[indextr].price | numeralFormat("$ 0,0.00") }}</b>
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
			return this.$store.state.AppActiveUser;
		},
		cartData() {
			return this.$store.state.currentCartData;
		},
	},
	data: () => ({
		// FILTERS
		gridDataFilter: {
			search_keyword: "",
			price: [0, 4],
			domain_authority: [0, 68],
			referring_domains: [0, 5],
			domain_rating: [0, 100],
			trust_flow: [0, 100],
			citation_flow: [0, 100],
			monthly_uniques: [0, 5],
			top_level_domain: "",
			lang: "",
			added_days: "",
			searchCategory1: true,
			searchCategory2: true,
			searchDescription: true,
			google_index: true,
		},

		// GRID
		gridSelectAll: false,
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
		gridSelectAll(val) {
			if (val) {
			} else {
			}
			return false;
		},
	},
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
			this.$http
				.get("/domains", {
					params: {
						sort_col: self.gridSortCol,
						sort_dir: self.gridSortDir,
						page: self.gridPage,
						page_limit: self.gridPageLimit,
						q: self.gridSearchQuery
					}
				})
				.then(
					(response) => {
						let data = response.data.data;
						let dataLength = parseInt(data.length) || 0;
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
							self.gridData = data;
						} else {
							self.gridData = [];
						}

						self.gridTotalData = dataLength;

						this.$vs.loading.close();
					},
					(error) => {
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
		editDomain(id) {
			this.$router.push("/admin/domains/edit/" + id);
		},
	},
};
</script>
