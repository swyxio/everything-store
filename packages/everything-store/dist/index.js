import { writable, readable } from 'svelte/store';
let stores = new Map();
const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
export function breakPointStore() {
    if (typeof window === 'undefined') {
        return writable(false);
    }
    const sizes = {
        xs: window.matchMedia('(max-width: 639px)'),
        sm: window.matchMedia('(min-width: 640px)'),
        md: window.matchMedia('(min-width: 768px)'),
        lg: window.matchMedia('(min-width: 1024px)'),
        xl: window.matchMedia('(min-width: 1280px)'),
        xxl: window.matchMedia('(min-width: 1536px)'),
    };
    let currentMatch = null;
    for (const size of breakpoints) {
        if (sizes[size].matches) {
            currentMatch = size;
            break;
        }
    }
    let store = readable(currentMatch, (set) => {
        Object.entries(sizes).forEach(([key, listener]) => {
            listener.addEventListener('change', (value) => set(value.matches ? key : breakpoints[breakpoints.indexOf(key) - 1]));
        });
        return () => {
            Object.entries(sizes).forEach(([key, listener]) => {
                listener.removeEventListener('change', (value) => set(value.matches ? key : breakpoints[breakpoints.indexOf(key) - 1]));
            });
        };
    });
    return store;
}
export function mediaQueryStore(query, defaultForSsr = false) {
    if (typeof window === 'undefined') {
        return writable(defaultForSsr);
    }
    let existing = stores.get(query);
    if (existing) {
        return existing;
    }
    let listener = window.matchMedia(query);
    let store = readable(listener.matches, (set) => {
        let updater = (value) => set(value.matches);
        listener.addEventListener('change', updater);
        return () => listener.removeEventListener('change', updater);
    });
    stores.set(query, store);
    return store;
}
