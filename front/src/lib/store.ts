import { persisted } from "svelte-persisted-store";
import { writable, type Writable } from "svelte/store";

export const userInfo: Writable<Writable<{ username: string; email: string; currency: number; language: number } | null>> = persisted("userInfo", writable())
export const userSets = writable([])
export const isSearching = writable(false)
export const navbarHeight = writable(0)