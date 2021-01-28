<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    </div>
</template>

<script>

    export default {
        mounted() {
            let params = this.$route.query;
            this.$vs.loading();
            this.$http.post('complete_payment', params).then((result) => {
                try {
                    if (window.opener && !window.opener.closed) {
                        result.data.code = 200;
                        window.opener.postMessage(result.data, '*');
                    }
                } catch (err) {
                }
                return false;
            })
                .catch((error) => {
                    try {
                        if (window.opener && !window.opener.closed) {
                            window.opener.postMessage({
                                message: error.message,
                                code: 400
                            }, '*');
                        }
                    } catch (err) {
                    }
                    return false;
                })
                .finally(() => {
                    window.close();
                });
        }
    };
</script>