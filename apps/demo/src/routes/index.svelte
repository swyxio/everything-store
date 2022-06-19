<script context="module" lang="ts">	
	export const prerender = true;
</script>

<script lang="ts">
	import {mediaQueryStore, breakPointStore, darkModeStore} from 'everything-store';

	const isLandscape = mediaQueryStore('(orientation: landscape)');
	const isDarkMode = mediaQueryStore('(prefers-color-scheme: dark)');
	const lessMotion = mediaQueryStore('(prefers-reduced-motion)');
	const bps = breakPointStore()
	const darkModeState = darkModeStore('customDarkModeLocalStorageKey')
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			Welcome to the EVERYTHING STORE!
		</div>

	</h1>

	<p>breakPointStore: {$bps}</p>
	<p>isLandscape: {$isLandscape}</p>
	<p>isDarkMode: {$isDarkMode}</p>
	<p>lessMotion: {$lessMotion}</p>
	<p>darkModeState: {$darkModeState}</p>
	<p>toggle darkModeState: <button on:click={() => darkModeState.toggleDark()}>toggle darkmodestate</button></p>
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
