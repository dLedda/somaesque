import type * as THREE from 'three';
import {MOUSE} from "three";

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
    private scrolling: boolean = false;
    private lastTouch: {x: number, y: number} = {x: 0, y: 0};
    private lastScroll1: {x: number, y: number} = {x: 0, y: 0};
    private lastScroll2: {x: number, y: number} = {x: 0, y: 0};

    constructor(object: THREE.Object3D, fliables: Fliable[], camera: THREE.Camera, element: HTMLCanvasElement) {
        this.object = object;
        this.fliables = fliables;
        this.element = element;
        this.yAxis = object.worldToLocal(camera.up);
        this.xAxis = object.position.sub(camera.position);
        this.xAxis.divideScalar(Math.sqrt(this.xAxis.getComponent(0)**2 + this.xAxis.getComponent(1)**2 + this.xAxis.getComponent(2)**2));
        this.xAxis = this.xAxis.clone().cross(this.yAxis.clone());
        this.start = this.object.rotation.clone();

        this.element.addEventListener('touchstart', (ev) => this.handleTouchStart(ev));
        this.element.addEventListener("touchcancel", (ev) => this.handleTouchEnd(ev));
        window.addEventListener('touchmove', (ev) => this.handleTouchMove(ev));
        window.addEventListener('touchend', (ev) => this.handleTouchEnd(ev));
        this.element.addEventListener('wheel', (ev) => this.handleScroll(ev));
        this.element.addEventListener('mouseover', () => this.hovered = true);
        this.element.addEventListener('mouseout', () => this.hovered = false);
        this.element.addEventListener('mousedown', (ev) => this.handleMouseDown(ev));
        window.addEventListener('mousemove', (ev) => this.handleMove(ev));
        window.addEventListener('mouseup', () => this.dragging = false);
    }

    private handleMouseDown(event: MouseEvent) {
        if (event.button === 1) {
            this.object.setRotationFromEuler(this.start);
        }
        if (!this.dragging) {
            this.lastX = event.x;
            this.lastY = event.y;
            this.dragging = true;
        }
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

    private handleTouchMove(event: TouchEvent) {
        if (this.dragging) {
            const newTouchX = event.touches.item(0).clientX;
            const newTouchY = event.touches.item(0).clientY;
            const touchDiffX = newTouchX - this.lastTouch.x;
            const touchDiffY = newTouchY - this.lastTouch.y;
            const xDiff = touchDiffX * RotationControls.ROTATION_FACTOR;
            const yDiff = touchDiffY * RotationControls.ROTATION_FACTOR;
            this.object.rotateOnAxis(this.yAxis, xDiff);
            this.object.rotateOnWorldAxis(this.xAxis, yDiff);
            this.lastTouch.x = newTouchX;
            this.lastTouch.y = newTouchY;
        } else if (this.scrolling) {
            if (this.flyingEnabled && this.hovered) {
                const newTouchX1 = event.touches.item(0).clientX;
                const newTouchX2 = event.touches.item(1).clientX;
                const newTouchY1 = event.touches.item(0).clientY;
                const newTouchY2 = event.touches.item(1).clientY;
                const lastDist = Math.sqrt((this.lastScroll1.x - this.lastScroll2.x) ** 2 + (this.lastScroll1.y - this.lastScroll2.y) ** 2);
                const newDist = Math.sqrt((newTouchX1 - newTouchX2) ** 2 + (newTouchY1 - newTouchY2) ** 2)
                const delta = newDist - lastDist;
                for (const fliable of this.fliables) {
                    const direction = delta / Math.abs(delta);
                    fliable.flyBy(direction / 10);
                }
            }
        }
    }

    private handleTouchStart(event: TouchEvent) {
        if (event.touches.length === 1) {
            this.lastTouch.x = event.touches.item(0).clientX;
            this.lastTouch.y = event.touches.item(0).clientY;
            this.dragging = true;
        } else if (event.touches.length === 2) {
            this.lastScroll1.x = event.touches.item(0).clientX;
            this.lastScroll1.y = event.touches.item(0).clientY;
            this.lastScroll2.x = event.touches.item(1).clientX;
            this.lastScroll2.y = event.touches.item(1).clientY;
            this.scrolling = true;
        }
        this.hovered = true;
    }

    private handleTouchEnd(event: TouchEvent) {
        this.dragging = false;
        this.scrolling = false;
        this.hovered = false;
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