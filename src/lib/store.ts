import {writable} from 'svelte/store';
import type {SentCard, WIC} from "$lib/client/schemas";

const initPop: {
    msg: string,
    title: string,
    isPop: boolean
} = {
    msg: '',
    title: '',
    isPop: false
};
export const popStore = writable(initPop);

export const pop = (message: string, title: string = 'Notification') => {
    setTimeout(() => {
        popStore.set({
            msg: message,
            title: title,
            isPop: true
        })
        setTimeout(() => {
            popStore.set({
                msg: '',
                title: '',
                isPop: false
            })
        }, 2500);
    }, 1);
};

const initSent: SentCard = {id: '', hash: '', sentence: '', translation: "",};

export const contextStore = writable(initSent)
export const resetSentStore = () => contextStore.set(initSent);
const initWords:Set<string> = new Set();
export const wordsStore = writable(initWords);
export const chosenWordsStore = writable('');
export const userHasOffsetStore = writable(false);
const initWic:Map<string, WIC> = new Map()
export const wicStore = writable(initWic)
