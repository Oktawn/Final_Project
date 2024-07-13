import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import ky from 'ky';

const urlText = 'http://localhost:3000/test';
const urlStats = 'http://localhost:3000/stats';
const urlResult = 'http://localhost:3000/results';
const testText = "С приходом осени природа начинает играть новыми красками.Листья на деревьях меняют цвет и падают на землю, образуя мягкий ковер.Это время года всегда навевает на меня легкую грусть и ностальгию.";

export const testsStore = create((set, get) => ({
    text: "",
    mode: { "mode": "quote", "size": "short" },
    setResult: (result) => set({ results: result }),
    setMode: (mode) => {
        set({ mode: mode });
    },
    setText: async () => {
        try {
            const mode = get().mode;
            const response = await ky.post(urlText, { json: { mode: mode.mode, size: mode.size } }).json();
            set({ text: await response.text });
        } catch {
            set({ text: testText });
        }
    },
    getText: () => {
        return get().text;
    },
    getMode: () => { return get.mode },
    fetchTest: async (user, data, end) => {
        const mode = get().mode;
        const resMode = mode.mode + " " + mode.size;
        if (data === null && user !== null) {
            await ky.post(urlResult, {
                json: {
                    user_id: user.user_id,
                    mode: resMode,
                    complited: end
                }
            })
            return;
        }

        const { wpm, raw, acc } = data;
        if (user !== null)
            try {
                await ky.post(urlResult, {
                    json: {
                        user_id: user.user_id,
                        wpm: wpm,
                        raw: raw,
                        accuracy: acc,
                        mode: resMode,
                        complited: end
                    }
                })
            }
            catch (error) {
                console.log(error);
            }
    }
}));

export const SettingStore = create(persist((set, get) => ({
    theme: false,
    isAuth: false,
    changeAuth: () => { set(state => ({ isAuth: !state.isAuth })) },
    changeTheme: () => { set(state => ({ theme: !state.theme })) },
    getTheme: () => { return get().theme },
    getAuth: () => { return get().isAuth },
}),
    {
        name: 'SettingUser',
        getStorage: () => localStorage,
    }

)
);

export const StatsStore = create((set, get) => ({
    stats: { "start": 0 },
    result: [{ "wpm": 0, "rawWpm": 0, "accuracy": 0, "mode": "quote short", "date": new Date() }],
    getStats: async (id) => {
        try {
            const response = await ky.get(urlStats + `/${id}`).json();
            set({ stats: await response[0] });
        } catch {
            console.log("error");
        }
    },
    getResult: async (id) => {
        try {
            const response = await ky.get(urlResult + `/${id}`).json();
            set({ result: await response });
        } catch {
            console.log("error");
        }
    },
    fetchResult: async (result) => {
        await ky.post(urlResult, { json: result });

    }

}));