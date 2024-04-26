<h1 align="center">Signals for Tailwind CSS</h1>

<div align="center">

[![minified size](https://img.shields.io/bundlephobia/min/tailwindcss-signals)](https://bundlephobia.com/package/tailwindcss-signals)
[![license](https://img.shields.io/github/license/brandonmcconnell/tailwindcss-signals?label=license)](https://github.com/brandonmcconnell/tailwindcss-signals/blob/main/LICENSE)
[![version](https://img.shields.io/npm/v/tailwindcss-signals)](https://www.npmjs.com/package/tailwindcss-signals)
[![twitter](https://img.shields.io/twitter/follow/branmcconnell)](https://twitter.com/branmcconnell)

</div>

<table><tr></tr><tr><td>

### ⚠️ This plugin is experimental and relies on [style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#container_style_queries_2) (via container queries), which are not yet widely supported in browsers.

The good news is that Safari and Firefox, the browsers lacking support, have already begun implementing style queries in their development versions, so it's only a matter of time before they're widely available.

See the browser compatibility table on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#browser_compatibility) or [caniuse](https://caniuse.com/css-container-queries-style) for more information.

<br></td></tr></table>

Signals for Tailwind CSS is a plugin that utilizes [style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#container_style_queries_2) (via container queries) to reactively enable a custom state, which can then be consumed by any of its descendants in the DOM.

`signal` is similar to the existing `group` variant/utility in that both provide methods for styling elements based on their ancestors' state. Unlike `group` states, however, signal states can be explicitly signaled, allowing their state to be both set and consumed with a single, simple, unchained variant.

This reduces development effort and the need to compose a chain of variants, improving the developer experience with a more declarative API.

Depending on your use case, a traditional `group` may make more sense, but often, particularly when managing a parent or ancestor state with anything more complex than a simple `peer-X` or `group-X`, a `signal` may be a simpler option.

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

<table><tr></tr><tr><td>

#### Example: Without Signals
```html
<input type="checkbox" class="peer" /> 👈🏼 check/uncheck here
<div class="hover:[&>div]:bg-green-800 peer-checked:[&>div]:bg-green-800">
  <div class="bg-red-800 p-1 text-white">or hover here</div>
</div>
```
Open this example in Tailwind Play: https://play.tailwindcss.com/E3ig9SPTsc

<br></td></tr><tr></tr><tr><td>

#### Example: With Signals
```html
<input type="checkbox" class="peer" /> 👈🏼 check/uncheck here
<div class="peer-checked:signal hover:signal">
  <div class="signal:bg-green-800 bg-red-800 p-1 text-white">or hover here</div>
</div>
```
Open this example in Tailwind Play: https://play.tailwindcss.com/weFkMf4U5K

<br></td></tr></table>

Notice how, with signals, we don't have to use any arbitrary selector variants like `[&>div]` and can instead apply those styles directly to the targeted descendants. This allows us to consolidate some redundancy in the parent so that whatever condition activates the signal only needs to be specified once rather than once per style/utility.

The benefits of Signals for Tailwind CSS become more apparent as the complexity of your styles and conditions increase.

### Activating a `signal` based on a descendant condition

The general purpose of this plugin is to provide a declarative approach to applying styles based on an _**ancestor's**_ state.

However, thanks to the power of the [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) CSS pseudo-class, we can even activate a signal based on a _**descendant's**_ state.

<table><tr></tr><tr><td>

#### Example: Descendant condition
```html
<div class="has-[:is(input:checked,div:hover)]:signal">
  <input type="checkbox" /> 👈🏼 check/uncheck here
  <div class="bg-red-800 p-1 text-white signal:bg-green-800">or hover here</div>
</div>
```
Open this example in Tailwind Play: https://play.tailwindcss.com/YnlzSITNqF

<br></td></tr></table>

This is most useful for situations where you want to apply styles to an entire block based on the current state of one of its descendants.

Here are a few examples of cases where such a feature might be useful:
* Activating a signal based on the presence or visibility of a specific child element
* Activating a signal on a form based on the validity of one or more of its descendant form fields
* Activating a signal when a specific descendant element is focused or hovered
* Activating a signal based on the presence of a specific class on a descendant element
* and many more!

⚠️ Some cautions:
* Watch out for circularity issues. If you set up a signal that activates based on a descendant's state, and that descendant's state is also based on the signal, you may run into issues.
* In some cases, if you want to check if **any** descendant is focused, for example, you may not need `:has()` and could use a simpler pseudo-class variant such as…
  * `focus-within:signal` instead of `has-[:focus]:signal`
  * `valid:signal` instead of `has-[:valid]:signal` (for a `form`, which checks if all form contents are valid)
* This is a bit less declarative when you use `:has()`, but for use cases where you would need it, it would likely still be simpler than the alternative.

### Differentiating signals

When using multiple signals, you may run into situations where you want one signal nested in another, which could cause issues. In that case, you can distinguish signals apart by naming them using the modifier syntax built into Tailwind CSS, the same naming convention used for `group` and `peer` variants.


<table><tr></tr><tr><td>

#### Example: Naming a signal
```html
<input type="checkbox" class="peer/checkable origin-bottom-left" /> 👈🏼 check/uncheck here
<div class="peer/hoverable bg-slate-700 text-white">✨ hover/unhover here ✨</div>
<div class="active:signal/custom peer-checked/checkable:signal peer-hover/hoverable:signal">
  <div class="
    text-white
    bg-red-800 after:content-['_👀']
    signal/custom:!bg-purple-800 signal:bg-green-800
    signal/custom:after:!content-['_🦄'] signal:after:content-['_😱']
  ">press me</div>
</div>
```
Open this example in Tailwind Play: https://play.tailwindcss.com/MkWvEuaWtO

<br></td></tr></table>

By giving a signal a name, you can ensure it is unique and doesn't conflict with other signals. You can name a signal by adding a slash and the name after the `signal` variant, like `signal/{name}`.

Consuming a named signal is the same as consuming a regular signal, but with the name appended to the variant: `signal/{name}`.

<i><small>For more information on this modifier syntax, see [Differentiating peers](https://tailwindcss.com/docs/hover-focus-and-other-states#differentiating-peers) from the official Tailwind CS documentation.</small></i>

## Why use Signals for Tailwind CSS?

Signals for Tailwind CSS provides a more declarative and straightforward approach to applying styles based on an ancestor's state. Leveraging style queries (via container queries) eliminates the need for complex selector chaining and arbitrary targeting, resulting in a cleaner and more maintainable codebase.

This plugin is particularly useful for:

- Simplifying the application of styles based on ancestor states
- Improving developer experience with a more declarative API
- Reducing the need for complex selector chaining and arbitrary targeting

## Why NOT use Signals for Tailwind CSS?

**⚠️ Browser support for [style queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#container_style_queries_2) is still limited, so Signals for Tailwind CSS may not be suitable for projects that require broad compatibility.**

The good news is that Safari and Firefox, the browsers lacking support, have already begun implementing style queries in their development versions, so it's only a matter of time before they're widely available.

See the browser compatibility table on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries#browser_compatibility) or [caniuse](https://caniuse.com/css-container-queries-style) for more information.


---

I hope you find `tailwindcss-signals` a valuable addition to your projects. If you have any issues or suggestions, don't hesitate to open an issue or pull request.

If you liked this, you might also like my other Tailwind CSS plugins:
* [tailwindcss-multi](https://github.com/brandonmcconnell/tailwindcss-multi): Group utilities together by variant
* [tailwindcss-mixins](https://github.com/brandonmcconnell/tailwindcss-mixins): Construct reusable & aliased sets of utilities inline
* [tailwindcss-members](https://github.com/brandonmcconnell/tailwindcss-members): Apply styles based on child or descendant state, the inverse of groups
* [tailwindcss-selector-patterns](https://github.com/brandonmcconnell/tailwindcss-selector-patterns): Dynamic CSS selector patterns
* [tailwindcss-js](https://github.com/brandonmcconnell/tailwindcss-js): Effortless build-time JS script injection
* [tailwindcss-directional-shadows](https://github.com/brandonmcconnell/tailwindcss-directional-shadows): Supercharge your shadow utilities with added directional support (includes directional `shadow-border` utilities too ✨)
* [tailwindcss-default-shades](https://github.com/brandonmcconnell/tailwindcss-default-shades): Default shades for simpler color utility classes
* [tailwind-lerp-colors](https://github.com/brandonmcconnell/tailwind-lerp-colors): Expand your color horizons and take the fuss out of generating new—or expanding existing—color palettes