const VanillaDrag = require('../../src/VanillaDrag');

describe('Drag', () => {
    let drag;
    let windowMock;
    let element;

    beforeEach(() => {
        windowMock = {
            addEventListener: jest.fn(),
            innerWidth: 50,
            innerHeight: 50
        };
        element = {
            addEventListener: jest.fn(),
            getBoundingClientRect: jest.fn(),
            style: {
                transform: ''
            }
        };
        drag = new VanillaDrag(windowMock, element);
    });

    describe('init', () => {
        test('it should attach event handlers', () => {
            expect(windowMock.addEventListener).toHaveBeenCalled();
            expect(windowMock.addEventListener.mock.calls[0][0]).toEqual('mousemove');
            expect(element.addEventListener).toHaveBeenCalledTimes(2);
            expect(element.addEventListener.mock.calls[0][0]).toEqual('mousedown');
            expect(element.addEventListener.mock.calls[1][0]).toEqual('mouseup');
        });
    });

    describe('handleMouseDown', () => {
        beforeEach(() => {
            element.getBoundingClientRect.mockReturnValue({ left: 10, top: 10, width: 10, height: 10 });
        });

        test('should set dragging state', () => {
            drag.handleMouseDown({ pageX: 5, pageY: 5 });

            expect(drag.dragging).toBeTruthy();
        });

        test('should set origin', () => {
            drag.handleMouseDown({ pageX: 20, pageY: 20 });

            expect(drag.origin).toEqual({ x: 10, y: 10 });
        });
    });

    describe('handleMouseMove', () => {
        beforeEach(() => {
            drag.outOfBounds = jest.fn();
        });

        test('should set dragging state to false if out of bounds', () => {
            drag.outOfBounds.mockReturnValue(true);
            drag.handleMouseMove({ pageX: 5, pageY: 5 });

            expect(drag.outOfBounds).toBeCalled();
            expect(drag.outOfBounds).toBeCalledWith(5, 5, 0, 50, 0, 50);
            expect(drag.dragging).toBeFalsy();
        });

        test('should update element style if in bounds', () => {
            drag.outOfBounds.mockReturnValue(false);
            drag.origin = { x: 5, y: 5 };
            drag.elementRectCache = { width: 10, height: 10 };
            drag.dragging = true;
            drag.handleMouseMove({ pageX: 10, pageY: 10 });

            expect(element.style.right).toEqual('35px');
            expect(element.style.bottom).toEqual('35px');
        });
    });

    describe('handleMouseUp', () => {
        test('should set dragging state to false if out of bounds', () => {
            drag.dragging = true;
            drag.handleMouseUp();

            expect(drag.dragging).toBeFalsy();
        });
    });

    describe('outOfBounds', () => {
        test('should return false if off left', () => {
            expect(drag.outOfBounds(-10, 10, 0, 100, 0, 100)).toBeTruthy();
        });
        
        test('should return false if off right', () => {
            expect(drag.outOfBounds(200, 10, 0, 100, 0, 100)).toBeTruthy();
        });

        test('should return false if off top', () => {
            expect(drag.outOfBounds(10, -10, 0, 100, 0, 100)).toBeTruthy();
        });
        
        test('should return false if off bottom', () => {
            expect(drag.outOfBounds(10, 200, 0, 100, 0, 100)).toBeTruthy();
        });
        
        test('should return true if in bounds', () => {
            expect(drag.outOfBounds(10, 10, 0, 100, 0, 100)).toBeFalsy();
        });
    });
});