let paymentWindow = null, successCallback, errorCallback;

    window.addEventListener("message", (event) => {
        try {
            if (event.origin !== "http://payment-portal.net:88") {
                return;
            }
            if (event.data.code === 200 && successCallback) {
                successCallback({
                    message: event.data.message,
                });
            }
            if (event.data.code === 400 && errorCallback) {
                errorCallback({
                    message: event.data.message,
                });
            }
        } catch (e) {
            if (errorCallback) {
                errorCallback({
                    message: e.getMessage()
                });
            }
        }
    }, false);

function CreationShopPayment(publishableKey) {
    if (typeof publishableKey !== 'string') {
        console.error('Please provide a publishable key');
        return;
    }
    let keyLength = publishableKey.length;
    if (publishableKey.includes('_test_')) {
        keyLength -= 5;
    }
    if (keyLength !== 38 || publishableKey.slice(0, 3) !== 'pk_') {
        console.error('Please provide a valid publishable key');
        return;
    }

    return {
        publishableKey,

        initPayment(paymentSecret) {
            if (typeof paymentSecret !== 'string') {
                console.error('Please provide a payment secret');
                return;
            }
            if (paymentSecret.length !== 255 || paymentSecret.slice(0, 3) !== 'ps_') {
                console.error('Please provide a valid payment secret');
                return;
            }
            let popupOptions = {
                url: `http://payment-portal.net:88/pay?pk=${this.publishableKey}&ps=${paymentSecret}`,
                target: '_blank',
                w: 450,
                h: 500
            };
            return new Promise((resolve, reject) => {
                successCallback = resolve;
                errorCallback = reject;
                popup(popupOptions);
            });
        }
    }
}

function popup({url, target, w, h}) {
    if (paymentWindow == null || paymentWindow.closed) {
        // Fixes dual-screen position                             Most browsers      Firefox
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft;
        const top = (height - h) / 2 / systemZoom + dualScreenTop;

        paymentWindow = window.open(
            url,
            target,
            `scrollbars=1,width=${w / systemZoom},height=${h / systemZoom},top=${top},left=${left}`
        );
    } else {
        paymentWindow.focus();
    }
}