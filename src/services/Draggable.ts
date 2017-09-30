interface Coordinate {
    x: number,
    y: number
}

export default class Draggable {
    private dragging: boolean;
    private origin: Coordinate;

    /**
     * Draggable
     * @param root 
     * @param element 
     */
    constructor (
        private root: Window,
        private element: HTMLElement
    ) {
        this.dragging = false;
        this.origin = { x: 0, y: 0 };
    }

    /**
     * Attach event listeners
     */
    public init (): void {
        this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.root.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    /**
     * Handle drag start
     * @param event 
     */
    public handleMouseDown (event: MouseEvent): void {
        const { left, top }: ClientRect = this.element.getBoundingClientRect();

        console.log(event.pageX, left)

        this.dragging = true;
        this.origin.x = event.pageX - left;
        this.origin.y = event.pageY - top;
    }

    public handleMouseMove (event: MouseEvent): void {
        const { pageX, pageY } = event;
        const { x, y } = this.origin;

        if (this.outOfBounds(pageX, pageY, 0, this.root.innerWidth, 0, this.root.innerHeight)) {
            this.dragging = false;
        }
        
        if (this.dragging) {
            this.element.style.left = `${pageX - x}px`;
            this.element.style.top = `${pageY - y}px`;
        }
    }

    /**
     * Handle drag end
     */
    public handleMouseUp (): void {
        this.dragging = false;
    }

    /**
     * Check if an element is out of bounds
     * @param nodeX 
     * @param nodeY 
     * @param boundsMinX 
     * @param boundsMaxX 
     * @param boundsMinY 
     * @param boundsMaxY 
     */
    public outOfBounds (
        x: number, 
        y: number, 
        boundsMinX: number, 
        boundsMaxX: number, 
        boundsMinY: number, 
        boundsMaxY: number
    ): boolean {
        return x <= boundsMinX || x >= boundsMaxX || y <= boundsMinY || y >= boundsMaxY;
    }
}
