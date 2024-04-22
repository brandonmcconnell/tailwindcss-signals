import plugin from 'tailwindcss/plugin';
const getStyleVarName = (modifier) => `--tw-signal${modifier ? `_${modifier}` : ''}`;
// using empty values here so the compiler plays nice and generates the styles without values
const EMPTY_VALUES = { values: { DEFAULT: '' } };
const signals = plugin(({ matchUtilities, matchVariant }) => {
    matchUtilities({
        signal: (_, { modifier }) => {
            return {
                [getStyleVarName(modifier)]: 'true',
            };
        },
    }, {
        ...EMPTY_VALUES,
        modifiers: 'any',
    });
    matchVariant('signal', (_, { modifier }) => {
        return `@container style(${getStyleVarName(modifier)}: true)`;
    }, EMPTY_VALUES);
});
module.exports = signals;
