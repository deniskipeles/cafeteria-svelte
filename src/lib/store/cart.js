import { writable } from 'svelte/store';

export const store = writable({
    total: 0,
    orders: [],
    balance: 0
});