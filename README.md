<h1 align="center">Signals for Tailwind CSS</h1>

<div align="center">

[![minified size](https://img.shields.io/bundlephobia/min/tailwindcss-signals)](https://bundlephobia.com/package/tailwindcss-signals)
[![license](https://img.shields.io/github/license/brandonmcconnell/tailwindcss-signals?label=license)](https://github.com/brandonmcconnell/tailwindcss-signals/blob/main/LICENSE)
[![version](https://img.shields.io/npm/v/tailwindcss-signals)](https://www.npmjs.com/package/tailwindcss-signals)
[![twitter](https://img.shields.io/twitter/follow/branmcconnell)](https://twitter.com/branmcconnell)

</div>

⚠️ **This plugin is experimental and relies on style queries (container queries), which are not yet widely supported in browsers.** See the browser compatibility table on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#browser_compatibility) for more information.

Signals for Tailwind CSS is a plugin that utilizes style queries (container queries) to reactively enable a custom state, which can then be consumed by any descendants in the DOM.

This shares some similarities to the existing `group` variants and utility in that both provide methods for styling elements based on their ancestors's state. Unlike with group states, signal states can be explicitly signaled, allowing their state to be inherited with a single, simple, unchained variant. This reduces the developer's effort and need to compose a chain of variants, improving the developer experience with a more declarative API.

## Installation

You can install the plugin via npm:

```bash
npm install tailwindcss-signals
```

Then, include it in your `tailwind.config.js`:

```js
module.exports = {
  plugins: [
    require('tailwindcss-signals'),
  ]
}
```

## Usage

The plugin introduces the `signal` variant, which can be used to apply styles based on an ancestor's signaled state.

Here's an example comparing the traditional approach with the new signals approach:

#### Without Signals
```html
<input type="checkbox" class="peer" /> 👈🏼 check/uncheck here
<div class="hover:[&>div]:bg-green-800 peer-checked:[&>div]:bg-green-800">
  <div class="bg-red-800 p-1 text-white">or hover here</div>
</div>
```
Tailwind Play: https://play.tailwindcss.com/E3ig9SPTsc

#### With Signals
```html
<input type="checkbox" class="peer" /> 👈🏼 check/uncheck here
<div class="peer-checked:signal hover:signal">
  <div class="signal:bg-green-800 bg-red-800 p-1 text-white">or hover here</div>
</div>
```
Tailwind Play: https://play.tailwindcss.com/weFkMf4U5K

Notice how, with signals, we don't have to use any arbitrary selector variants like `[&>div]` and can instead apply those styles dorectly to the targeted descendants, also allowing us to consolidate some redundancy in the parent, so that whatever condition(s) activate the signal only need to be specified once, rather than once per style/utility.

This is part of the beauty of Signals for Tailwind CSS — a declarative API.

> The example above is simple for the sake of example, but the benefits of Signals for Tailwind CSS become more apparent as the complexity of your styles and conditions increase.

## Why use Signals for Tailwind CSS?

Signals for Tailwind CSS provides a more declarative and straightforward approach to applying styles based on an ancestor's state. By leveraging style queries (container queries), it eliminates the need for complex selector chaining and arbitrary targeting, resulting in a cleaner and more maintainable codebase.

This plugin is particularly useful for:

- Simplifying the application of styles based on ancestor states
- Improving developer experience with a more declarative API
- Reducing the need for complex selector chaining and arbitrary targeting

## Why NOT use Signals for Tailwind CSS?

⚠️ Browser support for style queries is still limited, so Signals for Tailwind CSS may not be suitable for projects that require broad compatibility. The good news is both browsers lacking support, Safari and Firefox, have already begun implementing style queries in their development versions, so it's only a matter of time before they're widely available.


---

I hope you find `tailwindcss-signals` a valuable addition to your projects. If you have any issues or suggestions, don't hesitate to open an issue or pull request.

If you liked this, you might also like my other Tailwind CSS plugins:
* [tailwindcss-selector-patterns](https://github.com/brandonmcconnell/tailwindcss-selector-patterns): Dynamic CSS selector patterns
* [tailwindcss-multitool](https://github.com/brandonmcconnell/tailwindcss-multitool): Group utilities together by variant
* [tailwindcss-jstool](https://github.com/brandonmcconnell/tailwindcss-jstool): Effortless build-time JS script injection
* [tailwindcss-directional-shadows](https://github.com/brandonmcconnell/tailwindcss-directional-shadows): Supercharge your shadow utilities with added directional support (includes directional `shadow-border` utilities too ✨)
* [tailwindcss-default-shades](https://github.com/brandonmcconnell/tailwindcss-default-shades): Default shades for simpler color utility classes
* [tailwind-lerp-colors](https://github.com/brandonmcconnell/tailwind-lerp-colors): Expand your color horizons and take the fuss out of genertaing new—or expanding existing—color palettes