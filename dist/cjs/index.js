"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = __importDefault(require("tailwindcss/plugin"));
const getStyleVarName = (modifier) => `--tw-signal${modifier ? `_${modifier}` : ''}`;
// using empty values here so the compiler plays nice and generates the styles without values
const EMPTY_VALUES = { values: { DEFAULT: '' } };
const signals = (0, plugin_1.default)(({ matchUtilities, matchVariant }) => {
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
