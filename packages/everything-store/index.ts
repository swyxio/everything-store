import { writable, readable, Readable, Subscriber, Unsubscriber } from 'svelte/store';
let stores = new Map<string, Readable<boolean>>();

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
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
  } as Record<string, MediaQueryList>

  let currentMatch = null
  for (const size of breakpoints) {
    if (sizes[size].matches) {
      currentMatch = size
      break;
    }
  }

  let store = readable(currentMatch, (set) => {
    Object.entries(sizes).forEach(([key, listener]) => {
      listener.addEventListener('change', 
        (value: MediaQueryListEvent) => set(value.matches ? key : breakpoints[breakpoints.indexOf(key)-1])
      );
    })
    return () => {
      Object.entries(sizes).forEach(([key, listener]) => {
        listener.removeEventListener('change', 
          (value: MediaQueryListEvent) => set(value.matches ? key : breakpoints[breakpoints.indexOf(key)-1])
        );
      })
    }
  });

  return store
}

export function mediaQueryStore(query: string, defaultForSsr = false) {
  if (typeof window === 'undefined') {
    return writable(defaultForSsr);
  }

  let existing = stores.get(query);
  if (existing) {
    return existing;
  }

  let listener = window.matchMedia(query);
  let store = readable(listener.matches, (set) => {
    let updater = (value: MediaQueryListEvent) => set(value.matches);
    listener.addEventListener('change', updater);
    return () => listener.removeEventListener('change', updater);
  });

  stores.set(query, store);
  return store;
}

let inMemoryDarkModeStore = null as {
  subscribe: (this: void, run: Subscriber<string>) => Unsubscriber;
  toggleDark():void
} | null
export type AllowedModes = 'light' | 'dark' // in future may support system but skipping that for now
export function darkModeStore(localStorageKey = 'darkModeStore') {
  if (typeof window === 'undefined') {
    return writable<AllowedModes>('light');
  }

  if (inMemoryDarkModeStore) {
    return inMemoryDarkModeStore;
  }


	let darkMode = writable<AllowedModes>('light');
	if (typeof localStorage !== 'undefined') {
		if (
			localStorage[localStorageKey] === 'dark' ||
			(!(localStorageKey in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			darkMode.set('dark');
      document.documentElement.classList.add('dark');
		} else if (
			localStorage[localStorageKey] === 'light' ||
			(!(localStorageKey in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)
		) {
      darkMode.set('light'); // maybe not needed, doublecheck this
      document.documentElement.classList.remove('dark');
    }
	}

  // // TODO: add a listener to the dark mode media query in edge case that people change preferences DURING THE APP LIFETIME 
  // // very edge case, cant be bothrered
  // let listener = window.matchMedia('(prefers-color-scheme: dark)');
  // let mediaStore = readable(darkMode, (set) => {
  //   let updater = (value: MediaQueryListEvent) => set(value.matches);
  //   listener.addEventListener('change', updater);
  //   return () => listener.removeEventListener('change', updater);
  // });
  let store = {
    subscribe: darkMode.subscribe,
    toggleDark() {
      darkMode.update(current => {
        if (current === 'dark') {
          document.documentElement.classList.remove('dark');
          localStorage[localStorageKey] = 'light';
          return 'light'
        } else if (current === 'light') {
          document.documentElement.classList.add('dark');
          localStorage[localStorageKey] = 'dark';
          return 'dark'
        }
      })
    }
  }

  inMemoryDarkModeStore = store
  return store;
}