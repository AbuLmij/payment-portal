<template>
    <div>
        <label class="mt-2 text-sm">Masked?</label>
        <select class="w-full text-md py-2 px-3 border-1 border-grey rounded-lg" v-model="data.masked">
            <option :value="op.value" class="block font-semibold" v-for="(op,i) in data.booleanOptions" :key="i">
                {{op.text}}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "MaskedInput",
        props: ['data']
    }
</script>

<style scoped>

</style>