interface Coordinate {
    x: number,
    y: number
}

class VanillaDrag {
    private dragging: boolean;
    private origin: Coordinate;
    private elementRectCache: ClientRect;

    /**
     * VanillaDrag
     * @param root 
     * @param element 
     */
    constructor (
        private root: Window,
        private element: HTMLElement
    ) {
        this.dragging = false;
        this.origin = { x: 0, y: 0 };
        this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.element.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.root.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.root.addEventListener('resize', this.handleMouseMove.bind(this));
    }

    /**
     * Handle drag start
     * @param event 
     */
    public handleMouseDown (event: MouseEvent): void {
        this.elementRectCache = this.element.getBoundingClientRect();
        this.dragging = true;
        this.origin.x = event.pageX - this.elementRectCache.left;
        this.origin.y = event.pageY - this.elementRectCache.top;
    }

    public handleMouseMove (event: MouseEvent): void {
        const { pageX, pageY } = event;

        if (this.outOfBounds(pageX, pageY, 0, this.root.innerWidth, 0, this.root.innerHeight)) {
            this.dragging = false;
        }
        
        if (this.dragging || event.type === 'resize') {
            const { width, height } = this.elementRectCache; 
            const { x, y } = this.origin;

            this.element.style.right = `${this.root.innerWidth - (pageX - x + width)}px`;
            this.element.style.bottom = `${this.root.innerHeight - (pageY - y + height)}px`;
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

export = VanillaDrag;