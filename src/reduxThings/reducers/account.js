export function accountPresent(state = '0x000', action) {
    switch (action.type) {
        case 'ACCOUNT_PRESENT':
            return action.accountPresent;
        default:
            return state;
    }
}