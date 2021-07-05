import {get, Writable, writable} from "svelte/store";

export default class DimStore {
    static readonly MAX_DIMS = 20;
    static readonly MIN_DIMS = 1; 
    private store: Writable<number>;

    constructor(init: number) {
        this.store = writable(init);
    }

    currentVal() {
        return get(this.store);
    }

    subscribe(cb: (val: number) => any) {
        return this.store.subscribe(cb);
    }

    inc() {
        this.set(this.currentVal() + 1);
    }

    dec() {
        this.set(this.currentVal() - 1);
    }

    set(dim: number) {
        if (dim > DimStore.MAX_DIMS || dim < DimStore.MIN_DIMS) {
            return;
        }
        this.store.set(dim);
    }
}
