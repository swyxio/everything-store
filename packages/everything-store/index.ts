import { readable } from 'svelte/store';

export default function mediaQueryStore(query: string) {
	let matcher = window.matchMedia(query);
	return readable(matcher.matches, (set) => {
		const update = (m: any) => set(m.matches);
		matcher.addEventListener('change', update);
		return () => matcher.removeEventListener('change', update);
	});
}