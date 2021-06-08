import type * as THREE from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

export enum SomaesqueGeometry {
    c000000 = 'c000000',
    c000001 = 'c000001',
    c000011 = 'c000011',
    c000111 = 'c000111',
    c001001 = 'c001001',
    c001011 = 'c001011',
    c001111 = 'c001111',
    c011011 = 'c011011',
}

const MESH_ROT_MAP = [
    "000000",   // 000000
    "000001",   // 000001
    "000001z",  // 000010
    "000011",   // 000011
    "000001b",  // 000100
    "000011x",  // 000101
    "000011b",  // 000110
    "000111",   // 000111
    "000001yy", // 001000
    "001001",   // 001001
    "000011yy", // 001010
    "001011",   // 001011
    "000011zx", // 001100
    "001011x",  // 001101
    "000111y",  // 001110
    "001111",   // 001111
    "000001ba", // 010000
    "000011xx", // 010001
    "001001ya", // 010010
    "001011zb", // 010011
    "000011yx", // 010100
    "000111x",  // 010101
    "001011zb", // 010110
    "001111zb", // 010111
    "000011zz", // 011000
    "001011xx", // 011001
    "001011z",  // 011010
    "011011",   // 011011
    "000111yx", // 011100
    "001111x",  // 011101
    "001111yx", // 011110
    "011011",   // 011111
    "000001y",  // 100000
    "000011a",  // 100001
    "000011b",  // 100010
    "000111b",  // 100011
    "001001b",  // 100100
    "001011yc", // 100101 //---
    "001011b",  // 100110
    "001111b",  // 100111
    "000011ccx",// 101000
    "001011a",  // 101001
    "000111bb", // 101010
    "001111a",  // 101011
    "001011yz", // 101100 //---
    "011011x",  // 101101 //---
    "001111y",  // 101110 //---
    "011011",   // 101111
    "000011xz", // 110000 //---
    "000111ba", // 110001 //---
    "001011ba", // 110010 //---
    "001111ba", // 110011
    "001011bx", // 110100
    "001111bx", // 110101
    "011011b",  // 110110
    "011011",   // 110111
    "000111bba",// 111000
    "001111xx", // 111001
    "001111ya", // 111010
    "011011",   // 111011
    "001111yz", // 111100
    "011011",   // 111101
    "011011",   // 111110
    "011011",   // 111111
];

const ROT_CODE_MAP = {
    x(mesh: THREE.Object3D) { mesh.rotateX(Math.PI/2); },
    y(mesh: THREE.Object3D) { mesh.rotateY(Math.PI/2); },
    z(mesh: THREE.Object3D) { mesh.rotateZ(Math.PI/2); },
    a(mesh: THREE.Object3D) { mesh.rotateX(-Math.PI/2); },
    b(mesh: THREE.Object3D) { mesh.rotateY(-Math.PI/2); },
    c(mesh: THREE.Object3D) { mesh.rotateZ(-Math.PI/2); },
} as const;

type GeomRecord = Record<SomaesqueGeometry, THREE.BufferGeometry>;

export default class GeometryManager {
    private readonly root: string = "";
    private geometryRecord: GeomRecord = {} as GeomRecord;
    constructor(root: string, onReadyCb: (error?: string) => any) {
        this.root = root;
        Promise.allSettled(Object.keys(SomaesqueGeometry).map(geomId =>
            this.loadCubeGeometry(geomId as SomaesqueGeometry),
        )).then(() => onReadyCb()).catch((err) => onReadyCb(err));
    }

    private async loadCubeGeometry(id: SomaesqueGeometry): Promise<THREE.BufferGeometry> {
        const onLoaded = (obj: THREE.Group, resolve: (geom: THREE.BufferGeometry) => any) => {
            const geom = (obj.children[0] as THREE.Mesh).geometry;
            this.geometryRecord[id] = geom;
            resolve(geom);
        };
        const load = (resolve: (geom: THREE.BufferGeometry) => any, reject: (err: string) => any) => {
            const loader = new OBJLoader();
            loader.load(
                `${this.root}${id}.obj`,
                obj => onLoaded(obj, resolve),
                () => {},
                (err) => reject(`Error loading OBJ file: ${err}`),
            );
        };
        return new Promise(load);
    }

    retrieve(geometry: SomaesqueGeometry) {
        let requestedGeom = this.geometryRecord[geometry];
        if (requestedGeom) {
            return requestedGeom;
        } else {
            throw new Error(`Geometry with id: ${geometry} does not exist!`);
        }
    }

    retrieveCubeGeometry(neighbourProfile: number) {
        return this.geometryRecord.c000000;
        // let requestedGeom = this.geometryRecord[`c${MESH_ROT_MAP[neighbourProfile].substr(0, 6)}`];
        // const rotations = MESH_ROT_MAP[neighbourProfile].substr(6);
        // if (!requestedGeom) {
        //     throw new Error(`No similar cube found for the neighbour profile: ${neighbourProfile}`)
        // } else if (rotations) {
        //     requestedGeom = requestedGeom.clone();
        //     for (let i = 0; i < rotations.length; i++) {
        //         ROT_CODE_MAP[rotations[i]](requestedGeom);
        //     }
        // }
        // return requestedGeom;
    }
}