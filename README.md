# The Everything Store

a nice utils library of stores for the discerning Svelte developer.

- Breakpoint Store
- Generic Media Query
- Dark Mode store

All stores are SSR friendly for SvelteKit.

## Breakpoint Store

Subscribe for Tailwind breakpoints: 

- `xs`: `window.matchMedia('(max-width: 639px)')`
- `sm`: `window.matchMedia('(min-width: 640px)')`
- `md`: `window.matchMedia('(min-width: 768px)')`
- `lg`: `window.matchMedia('(min-width: 1024px)')`
- `xl`: `window.matchMedia('(min-width: 1280px)')`
- `xxl`: `window.matchMedia('(min-width: 1536px)')`

No customization for now, copy out the code if you must.

```html
<script>
import {breakPointStore} from 'everything-store';
const bps = breakPointStore()
</script>

<h1>Breakpoint: {$bps}</h1>
```

![resize](https://user-images.githubusercontent.com/6764957/151087569-1dd7e59b-7326-44ae-bd61-fb22a25df54d.gif)


## Generic Media Query Store

Subscribe for `true/false` whenever a media query changes.

```html
<script>
import {mediaQueryStore} from 'everything-store';

const isLandscape = mediaQueryStore('(orientation: landscape)');
const isDarkMode = mediaQueryStore('(prefers-color-scheme: dark)');
const lessMotion = mediaQueryStore('(prefers-reduced-motion)');
</script>

<h1>isLandscape: {$isLandscape}</h1>
<!-- etc -->
```

Thanks to @dimfeld for impl: https://svelte.dev/repl/0d5e9844f81b423386f405da3cb69087?version=3.46.2

## Dark Mode Custom Store

This store reads, in order:

1. your previous dark mode setting from localStorage (using a customizable key that defaults to `darkModeStore`)
2. dark mode preference from `prefers-color-scheme: dark`

and updates your `<html>` document with a `dark` class if warranted
and saves any changes to your `darkModeStore` localStorage key. 

It also offers a custom method to `toggleDark()`. May take PRs to expand to support "system" and "custom" modes.

```svelte
<script>
import {darkModeStore} from 'everything-store';

const darkModeState = darkModeStore()
</script>
<p>darkModeState: {$darkModeState}</p>
<p>toggle darkModeState: 
    <button on:click={() => darkModeState.toggleDark()}>
        toggle darkmodestate
    </button>
</p>
```

## Other Great stores

- [ ]  Kev’s list of custom stores
    - [ ]  [Toggle Store](https://svelte.dev/repl/a3cb054398a94698a4cfe4c44f33b923?version=3.48.0)
    - [ ]  [Fetch Store](https://svelte.dev/repl/a74f1ed8e3eb4aec82cb743e13443ee4?version=3.48.0)
    - [ ]  [LocalStorage Store](https://svelte.dev/repl/e6c0e3db7d064d43a7e4559b2862e1f7?version=3.48.0)
        - [ ]  [Jacob Babich NPM package is neat](https://github.com/babichjacob/svelte-localstorage)!
    - [ ]  [Notification Toast Store](https://svelte.dev/repl/e166b01bc46149a49895c1622d26ce7e?version=3.48.0)
        - [ ]  Shout out to Antony and Li Hau!
    - [ ]  Form Validation Store
    - [ ]  [Periodic Fetch Store](https://svelte.dev/repl/b8fa406464d6434fba97902ac78b5e2b?version=3.48.0)
- [ ]  Brittney’s list of Stores
    - [ ]  [https://www.youtube.com/watch?v=a65aPLz18IM](https://www.youtube.com/watch?v=a65aPLz18IM)


## Contributing

1. `git clone` this repo
2. then `yarn` to install packages (also uses `prepare` script to run a build)
3. `yarn start` -> should open demo at `localhost:3000`

When updating code `yarn build` the code first, then `yarn start`.

When publishing:

1. `cd packages/everything-store`
1. `npm version patch` to bump versions
1. `npm publish` to publish (also uses `prepare` script to run a build and `prepublishOnly` to copy the readme)