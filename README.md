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

## Generic Media Query Store

Subscribe for `true/false` whenever a media query changes.

```html
<script>
	import {mediaQueryStore} from 'everything-store';

	const isLandscape = mediaQueryStore('(orientation: landscape)');
</script>

<h1>isLandscape: {$isLandscape}</h1>
```

Thanks to @dimfeld for impl: https://svelte.dev/repl/0d5e9844f81b423386f405da3cb69087?version=3.46.2