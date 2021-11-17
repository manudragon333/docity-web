import _ from 'lodash';

export const ActionTypesFactory = (prefix, type) => {
    let p = _.upperCase(prefix) + '/' + _.upperCase(type);
    return {
        REQUEST: p + '_REQUEST',
        INPROGRESS: p + '_INPROGRESS',
        SUCCESS: p + '_SUCCESS',
        FAILED: p + '_FAILED',
        CHANGED: p + '_CHANGED',
        RESET: p + '_RESET',
        custom: (name) => { return `${p}_${name}` },
    };
}