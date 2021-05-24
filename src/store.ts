import { derived, writable } from 'svelte/store';
import { get } from 'svelte/store';

type PolycubeInput = {
    color: string,
    rep: bigint,
}

const MAX_DIMS = 5;
const MIN_DIMS = 2;

const store = {
    polycubes: writable<PolycubeInput[]>([{rep: BigInt(0), color: colorFromIndex(0)}]),
    somaDimension: writable(3), 
};

export const selectedCube = writable(0);
export const isMaxDimension = derived(store.somaDimension, $somaDimension => $somaDimension >= MAX_DIMS);
export const isMinDimension = derived(store.somaDimension, $somaDimension => $somaDimension <= MIN_DIMS);
export const isMaxPolycubes = derived([store.polycubes, store.somaDimension], ([$polycubes, $somaDimension]) => $polycubes.length >= $somaDimension ** 3);
export const isMinPolycubes = derived(store.polycubes, ($polycubes) => $polycubes.length <= 1);

export const somaDimension = {
    subscribe: store.somaDimension.subscribe,
    inc() {
        if (!get(isMaxDimension)) {
            store.somaDimension.update(dims => {
                polycubes.reset(dims + 1);
                return dims + 1;
            });
        }
    },
    dec() {
        if (!get(isMinDimension)) {
            store.somaDimension.update(dims => {
                polycubes.reset(dims - 1);
                return dims - 1;
            });
        }
    }
};

export const polycubes = {
    subscribe: store.polycubes.subscribe,
    addCube() {
        const isMaxPolycubes = get(store.polycubes).length >= get(store.somaDimension) ** 3;
        if (!isMaxPolycubes) {
            store.polycubes.update(polycubes => polycubes.concat({
                rep: BigInt(0),
                color: colorFromIndex(polycubes.length),
            }));
        }
    },
    removeCube() {
        const isMinPolycubes = get(store.polycubes).length <= 1;
        if (!isMinPolycubes) {
            store.polycubes.update(polycubes => polycubes.splice(0, polycubes.length - 1));
        }
    },
    toggle(cubeIndex: number, x: number, y: number, z: number) {
        const dims = get(store.somaDimension);
        const mask = BigInt(1) << BigInt(dims ** 2 * x + dims * y + z);
        const cubes = get(store.polycubes);
        cubes[cubeIndex].rep ^= mask;
        store.polycubes.set(cubes);
    },
    set(cubeIndex: number, val: boolean, x: number, y: number, z: number) {
        const dims = get(store.somaDimension);
        const mask = BigInt(1) << BigInt(dims ** 2 * x + dims * y + z);
        const cubes = get(store.polycubes);
        if (val) {
            cubes[cubeIndex].rep |= mask
        } else {
            cubes[cubeIndex].rep &= ~mask
        }
        store.polycubes.set(cubes);
    },
    reset(dims: number) {
        store.polycubes.update(polycubes => {
            const result: PolycubeInput[] = [];
            for (let i = 0; i < Math.min(polycubes.length, dims**3); i++) {
                result.push({
                    rep: BigInt(0),
                    color: colorFromIndex(i),
                });
            }
            return result;
        });
    }
};

function colorFromIndex(index: number) {
    const colorWheelCycle = Math.floor(index / 6);
    const darknessCycle = Math.floor(index / 12);
    const spacing = (360 / 6);
    const offset = colorWheelCycle === 0 ? 0 : spacing / (colorWheelCycle + 2);
    let hue = spacing * (index % 6) + offset;
    const saturation = 100;
    const lightness = 1 / (2 + darknessCycle) * 100;
    return `hsl(${hue},${saturation}%,${lightness}%)`;
}    