# The Everything Store

a nice utils library of stores for the discerning Svelte developer.

## Breakpoint Store

Subscribe for Tailwind breakpoints. No customization for now, copy out the code if you must

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
