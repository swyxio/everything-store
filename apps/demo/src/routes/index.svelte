<script context="module" lang="ts">	
	export const prerender = true;
</script>

<script lang="ts">
	import {mediaQueryStore, breakPointStore} from 'everything-store';

	const w600 = mediaQueryStore('(min-width:600px)');
	const bps = breakPointStore()
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<source srcset="svelte-welcome.webp" type="image/webp" />
				<img src="svelte-welcome.png" alt="Welcome" />
			</picture>
		</div>

	</h1>

	<h1>Breakpoint: {$bps}</h1>
	<!-- <h1>Width >600px: {$w600}</h1> -->
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
