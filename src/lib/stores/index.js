import { writable } from "svelte/store";


// this ensures that we always get unique id
export const id = writable(0)

export const alerts = writable([])
