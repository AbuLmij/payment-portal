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
}