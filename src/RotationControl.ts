import type * as THREE from 'three';

export default class RotationControls {
    private static ROTATION_FACTOR = 1/200;
    private object: THREE.Object3D;
    private element: HTMLCanvasElement;
    private respondToMovement: boolean = false;
    private lastX: number = 0;
    private lastY: number = 0;
    private yAxis: THREE.Vector3;
    private xAxis: THREE.Vector3;
    private start: THREE.Euler;

    constructor(object: THREE.Object3D, camera: THREE.Camera, element: HTMLCanvasElement) {
        this.object = object;
        this.element = element;
        this.yAxis = object.worldToLocal(camera.up);
        this.xAxis = object.position.sub(camera.position);
        this.xAxis.divideScalar(Math.sqrt(this.xAxis.getComponent(0)**2 + this.xAxis.getComponent(1)**2 + this.xAxis.getComponent(2)**2));
        this.xAxis = this.xAxis.clone().cross(this.yAxis.clone());
        this.start = this.object.rotation.clone();

        this.element.addEventListener('mousedown', (event) => {
            if (event.button === 1) {
                this.object.setRotationFromEuler(this.start);
            }
            if (!this.respondToMovement) {
                this.lastX = event.x;
                this.lastY = event.y;
                this.respondToMovement = true;
            }
        });
        window.addEventListener('mousemove', (ev) => this.handleMove(ev));
        window.addEventListener('mouseup', () => this.respondToMovement = false);
    }

    private handleMove(event: MouseEvent) {
        if (this.respondToMovement) {
            const xDiff = event.movementX * RotationControls.ROTATION_FACTOR;
            const yDiff = event.movementY * RotationControls.ROTATION_FACTOR;
            this.object.rotateOnAxis(this.yAxis, xDiff);
            this.object.rotateOnWorldAxis(this.xAxis, yDiff);
        }
    }
}