import { persisted } from "svelte-persisted-store";
import { writable, type Writable } from "svelte/store";

export const userInfo: Writable<Writable<{ username: string; email: string; } | null>> = persisted("userInfo", writable())
export const userSets = writable([])
export const isSearching = writable(false)
export const navbarHeight = writable(0)