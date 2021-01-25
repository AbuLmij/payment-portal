<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    </div>
</template>

<script>

    export default {
        mounted() {
            let params = this.$route.query;
            this.$http.post('complete_payment', params).then((res) => {
               console.log('done');
            });
        }
    };
</script>