<template>
    <div>
        <vs-input label="Domain" name="domain" v-model="data.domain" class="w-full mt-5"
                  v-validate="'required|url:require_protocol|max:255'"/>
        <span class="text-danger text-sm" v-show="errors.has('domain')">{{ errors.first("domain") }}</span>
        <div>
            <label class="mt-2 text-sm">Available?</label>
            <select class="w-full text-md py-2 px-3 border-1 border-grey rounded-lg" v-model="data.available">
                <option :value="op.value" class="block font-semibold" v-for="(op,i) in data.booleanOptions" :key="i">
                    {{op.text}}
                </option>
            </select>
        </div>
        <vs-input label="Price" name="price" v-model="data.price" class="w-full mt-5" v-validate="'required|max:7'"/>
        <span class="text-danger text-sm" v-show="errors.has('price')">{{ errors.first("price") }}</span>
        <div class="vs-component vs-con-input-label vs-input w-full mt-5 vs-input-primary">
            <vs-checkbox v-model="data.guest_post">Guest Post?</vs-checkbox>
        </div>

        <vs-input
                v-if="data.guest_post"
                label="Guest Post Price"
                name="guest_post_price"
                v-model="data.guest_post_price"
                class="w-full mt-5"
                v-validate="data.guest_post ? 'required|max:7' : ''"
        />
        <span class="text-danger text-sm"
              v-show="errors.has('guest_post_price')">{{ errors.first("guest_post_price") }}</span>
        <!--<vs-input label="Domain Authority" name="domain_authority" v-model="data.domain_authority" class="w-full mt-5"-->
                  <!--v-validate="'between:0,255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('domain_authority')">{{ errors.first("domain_authority") }}</span>-->

        <!--<vs-input label="Page Authority" name="page_authority" v-model="data.page_authority" class="w-full mt-5"-->
                  <!--v-validate="'between:0,255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('page_authority')">{{ errors.first("page_authority") }}</span>-->
        <!--<vs-input label="Referring Domains" name="referring_domains" v-model="data.referring_domains" class="w-full mt-5"-->
                  <!--v-validate="'integer'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('referring_domains')">{{ errors.first("referring_domains") }}</span>-->
        <!--<vs-input label="Domain Rating" name="domain_rating" v-model="data.domain_rating" class="w-full mt-5"-->
                  <!--v-validate="'between:0,255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('domain_rating')">{{ errors.first("domain_rating") }}</span>-->
        <!--<vs-input label="Trust Flow" name="trust_flow" v-model="data.trust_flow" class="w-full mt-5"-->
                  <!--v-validate="'between:0,255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('trust_flow')">{{ errors.first("trust_flow") }}</span>-->
        <!--<vs-input label="Alexa Rank" name="alexis_rank" v-model="data.alexis_rank" class="w-full mt-5"-->
                  <!--v-validate="'integer'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('alexis_rank')">{{ errors.first("alexis_rank") }}</span>-->
        <!--<vs-input label="Citation Flow" name="citation_flow" v-model="data.citation_flow" class="w-full mt-5"-->
                  <!--v-validate="'between:0,255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('citation_flow')">{{ errors.first("citation_flow") }}</span>-->
        <!--<div>-->
            <!--<label class="mt-2 text-sm">Google Index?</label>-->
            <!--<select class="w-full text-md py-2 px-3 border-1 border-grey rounded-lg" v-model="data.google_index">-->
                <!--<option :value="op.value" class="block font-semibold" v-for="(op,i) in data.booleanOptions" :key="i">-->
                    <!--{{op.text}}-->
                <!--</option>-->
            <!--</select>-->
        <!--</div>-->
        <!--<vs-input label="Alexa Rank" name="monthly_uniques" v-model="data.monthly_uniques" class="w-full mt-5"-->
                  <!--v-validate="'integer'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('monthly_uniques')">{{ errors.first("monthly_uniques") }}</span>-->

        <!--<vs-input label="Category 1" name="category1" v-model="data.category1" class="w-full mt-5"-->
                  <!--v-validate="'max:255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('category1')">{{ errors.first("category1") }}</span>-->

        <!--<vs-input label="Category 2" name="category2" v-model="data.category2" class="w-full mt-5"-->
                  <!--v-validate="'max:255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('category2')">{{ errors.first("category2") }}</span>-->

        <!--<vs-input label="Category 3" name="category3" v-model="data.category3" class="w-full mt-5"-->
                  <!--v-validate="'max:255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('category3')">{{ errors.first("category3") }}</span>-->

        <!--<vs-input label="Top Level Domain" name="top_level_domain" v-model="data.top_level_domain" class="w-full mt-5"-->
                  <!--v-validate="'max:255'"/>-->
        <!--<span class="text-danger text-sm" v-show="errors.has('top_level_domain')">{{ errors.first("top_level_domain") }}</span>-->

        <vs-input label="Lang" name="lang" v-model="data.lang" class="w-full mt-5" v-validate="'required|max:255'"/>
        <span class="text-danger text-sm" v-show="errors.has('lang')">{{ errors.first("lang") }}</span>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "DomainForm",
        props: ['data']
    }
</script>

<style scoped>

</style>