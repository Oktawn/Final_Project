import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const testsStore = create(persist((set, get) => ({
    text: null,
    result: {
        correct: 0,
        incorrect: 0
    },
    wpm: 0,
    rawWpm: 0,
    mode: { "mode": "short", "option": "short" },
    setResult: (result) => set({ results: result }),
    setMode: (mode) => set({ mode }),
    setWpm: (wpm) => set({ wpm }),
    setRawWpm: (rawWpm) => set({ rawWpm }),
    setText: (text) => set({ text }),
    getText: () => get().text,
    getWpm: () => get().wpm,
    getRawWpm: () => get().rawWpm
}),
    {
        name: 'store',
        getStorage: () => sessionStorage
    }));

export const ThemeStore = create(persist((set, get) => ({
    theme: false,
    changeTheme: () => { set(state => ({ theme: !state.theme })) },
    getTheme: () => { return get().theme },
}),
    {
        name: 'theme',
        getStorage: () => localStorage,
    }
)
);