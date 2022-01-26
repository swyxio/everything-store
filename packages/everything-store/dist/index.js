import { readable } from 'svelte/store';
export default function mediaQueryStore(query) {
    let matcher = window.matchMedia(query);
    return readable(matcher.matches, (set) => {
        const update = (m) => set(m.matches);
        matcher.addEventListener('change', update);
        return () => matcher.removeEventListener('change', update);
    });
}
