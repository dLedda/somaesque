import type * as THREE from 'three';

interface Fliable {
    flyBy(factor: number);
}

export default class RotationControls {
    private static ROTATION_FACTOR = 1/200;
    private object: THREE.Object3D;
    private element: HTMLCanvasElement;
    private dragging: boolean = false;
    private flyingEnabled = true;
    private lastX: number = 0;
    private lastY: number = 0;
    private yAxis: THREE.Vector3;
    private xAxis: THREE.Vector3;
    private start: THREE.Euler;
    private fliables: Fliable[];
    private hovered: boolean = false;

    constructor(object: THREE.Object3D, fliables: Fliable[], camera: THREE.Camera, element: HTMLCanvasElement) {
        this.object = object;
        this.fliables = fliables;
        this.element = element;
        this.yAxis = object.worldToLocal(camera.up);
        this.xAxis = object.position.sub(camera.position);
        this.xAxis.divideScalar(Math.sqrt(this.xAxis.getComponent(0)**2 + this.xAxis.getComponent(1)**2 + this.xAxis.getComponent(2)**2));
        this.xAxis = this.xAxis.clone().cross(this.yAxis.clone());
        this.start = this.object.rotation.clone();

        this.element.addEventListener('mouseover', () => this.hovered = true);
        this.element.addEventListener('mouseout', () => this.hovered = false);
        this.element.addEventListener('wheel', (ev) => this.handleScroll(ev));
        this.element.addEventListener('mousedown', (event) => {
            if (event.button === 1) {
                this.object.setRotationFromEuler(this.start);
            }
            if (!this.dragging) {
                this.lastX = event.x;
                this.lastY = event.y;
                this.dragging = true;
            }
        });
        window.addEventListener('mousemove', (ev) => this.handleMove(ev));
        window.addEventListener('mouseup', () => this.dragging = false);
    }

    private handleMove(event: MouseEvent) {
        if (this.dragging) {
            const xDiff = event.movementX * RotationControls.ROTATION_FACTOR;
            const yDiff = event.movementY * RotationControls.ROTATION_FACTOR;
            this.object.rotateOnAxis(this.yAxis, xDiff);
            this.object.rotateOnWorldAxis(this.xAxis, yDiff);
        }
    }

    private handleScroll(event: WheelEvent) {
        if (this.flyingEnabled && this.hovered) {
            for (const fliable of this.fliables) {
                const direction = event.deltaY / Math.abs(event.deltaY);
                fliable.flyBy(direction / 10);
            }
        }
    }

    enableFly() {
        this.flyingEnabled = true;
    }

    disableFly() {
        this.flyingEnabled = false;
    }

    private static isMesh(object: THREE.Object3D): object is THREE.Mesh {
        return (object as THREE.Mesh).isMesh;
    }
}