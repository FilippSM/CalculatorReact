module.exports = {
  extends: [
    'stylelint-config-standard-scss',  // ← вместо 'stylelint-config-standard'
    'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-scss',                  // ← ДОБАВИЛИ для SCSS
    'stylelint-order',                 // ← ваш плагин
  ],
  rules: {
    // Все ваши оригинальные правила
    'color-no-invalid-hex': true,
    'font-family-no-duplicate-names': true,
    
    // Дополнительные для SCSS (опционально)
    'selector-class-pattern': null,
    'custom-property-pattern': null
  }
}


// export default {
//     extends: [
//         'stylelint-config-standard',
//         'stylelint-config-recess-order'
//     ],
//     plugins: [
//         'stylelint-order',
//     ],
//     rules: {
//         'color-no-invalid-hex': true,
//         'font-family-no-duplicate-names': true,
//     }
// };