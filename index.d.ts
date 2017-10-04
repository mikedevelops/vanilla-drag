// Type definitions for vanilla-drag
// Definitions by: Michael Smart http://michaelsmart.co.uk

export = VanillaDrag;

declare class VanillaDrag {
    private root;
    private element;
    private dragging;
    private origin;
    private elementRectCache;
    /**
     * VanillaDrag
     * @param root
     * @param element
     */
    constructor(root: Window, element: HTMLElement);
    /**
     * Handle drag start
     * @param event
     */
    handleMouseDown(event: MouseEvent): void;
    handleMouseMove(event: MouseEvent): void;
    /**
     * Handle drag end
     */
    handleMouseUp(): void;
    /**
     * Check if an element is out of bounds
     * @param nodeX
     * @param nodeY
     * @param boundsMinX
     * @param boundsMaxX
     * @param boundsMinY
     * @param boundsMaxY
     */
    outOfBounds(x: number, y: number, boundsMinX: number, boundsMaxX: number, boundsMinY: number, boundsMaxY: number): boolean;
}

declare namespace VanillaDrag {
    export interface Coordinate {
        x: number,
        y: number
    }
}
