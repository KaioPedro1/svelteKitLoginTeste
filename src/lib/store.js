import { writable } from 'svelte/store';

export let loadingLogin = writable(false);
export let isFormLogin = writable(true);