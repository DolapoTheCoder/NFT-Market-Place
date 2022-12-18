export function accountPresent(string) {
    return {
        type: 'ACCOUNT_PRESENT',
        account: string
    };
}