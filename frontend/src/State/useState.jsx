import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import ky from 'ky';

const urlText = 'http://localhost:3000/test';

const testText = "С приходом осени природа начинает играть новыми красками.Листья на деревьях меняют цвет и падают на землю, образуя мягкий ковер.Это время года всегда навевает на меня легкую грусть и ностальгию.";

export const testsStore = create((set, get) => ({
    result: {
        correct: 0,
        incorrect: 0
    },
    wpm: 0,
    rawWpm: 0,
    mode: { "mode": "quote", "option": "short" },
    setResult: (result) => set({ results: result }),
    setMode: (mode) => set({ mode }),
    setWpm: (wpm) => set({ wpm }),
    setRawWpm: (rawWpm) => set({ rawWpm }),
    // updateText: async () => {
    //     try {
    //         const mode = get().mode;
    //         const response = await ky.post(urlText, { body: { mode: mode.mode, option: mode.option } }).json();
    //         set({ text: response.text });
    //     } catch (error) {
    //         console.error('Failed to fetch text:', error);
    //     }
    // },
    getText: async () => {
        try {
            const mode = get().mode;
            const response = await ky.post(urlText, { body: { mode: mode.mode, option: mode.option } }).json();
            console.log(response.text);
            return response.text;
        } catch {
            return testText;
        }
    },
    getMode: () => { return get.mode },
    getWpm: () => { return get().wpm },
    getRawWpm: () => { return get().rawWpm }
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