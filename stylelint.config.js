export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-recess-order'
    ],
    plugins: [
        'stylelint-order',
    ],
    rules: {
        'color-no-invalid-hex': true,
        'font-family-no-duplicate-names': true,
    }
};