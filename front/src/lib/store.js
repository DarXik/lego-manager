import {persisted} from "svelte-persisted-store";
import {writable} from "svelte/store";

export const userInfo = persisted("userInfo", writable([]))
export const userSets = persisted("userSets", writable([]))