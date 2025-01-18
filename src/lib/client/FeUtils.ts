import ky from "ky";
import {API, SENTENCE_API} from "$lib/client/common";
import tippy from "tippy.js";
import type {Props} from "tippy.js";
import {pop} from "$lib/store";
import {goto, invalidateAll} from "$app/navigation";
import type {Para} from "$lib/client/schemas";
import {TEXT_FAILED_TO_SAVE_SENTENCE, TEXT_SENTENCE_SAVED} from "$lib/client/texts";

export const removeCookie = (key: string) =>
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

export const FE_SESSION = "myWordsSession";
export const setCookie = (key: string, value: string) =>
    document.cookie = key + "=" + value + ";path=/"

export const getWordDetail = async (word: string) => {
    const res = await ky.post(API+"/word/detail", {json: {word}}).json() as {word: any, contexts: any,error: any};
    if (res.error) {
        pop("The word is is still being processed. Please try again later", "Info");
        return null
    }
    return res;
}

export type TippyOptions = Partial<Props>

export const tooltip = (ele: HTMLElement, options: TippyOptions) => {
    const tip = tippy(ele, options);
    return {
        update(options: TippyOptions) {
            tip.setProps(options);
        },
        destroy() {
            tip.destroy();
        }
    }
}

export const handleCheckOut = async (docId: number) => {
    pop("Complete payment to unlock document", "Redirecting");
    const res = await ky.post(API + "/checkout", {json: {docId}}).json() as {url: string};
    // open the url in a new tab
    window.open(res.url, "_blank");
    return res.url;
};

export const handleGoToCollections = async () => {
    await invalidateAll()
    await goto("/private/collections")
}

export const updateSessionCookie = (session:any) => {
    if (session) {
        setCookie(FE_SESSION, JSON.stringify(session));
    }
};

export const handleSaveSentence = async (parse: Para) => {
    const res = await ky.post(SENTENCE_API + '/save',
        {json: {parse}}).json() as {data: any, error: any};
    if (res.data) {
        pop(TEXT_SENTENCE_SAVED);
        return
    }
    pop(TEXT_FAILED_TO_SAVE_SENTENCE);
}

// new line, tab, space...
export const isStrEmpty = (str: string) => !str.trim();