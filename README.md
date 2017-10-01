# Vanilla Drag

A _tiny_ (5KB) package to allow free dragging of HTML elements.

## Installation

```shell
npm install --save vanilla-drag
```

## Getting Started

```javascript
import VanillaDrag from 'vanilla-drag';

const target = document.getElementById('target');
const drag = new VanillaDrag(window, target);
```

## Options

The VanillaDrag constructor takes two arguments.

```javascript
new VanillaDrag([window], [HTMLElement])
```

### [window]

The current context's window object. 99% of the time this will always be a case of passing in the global variable `window`.

### [HTMLElement]

An instance of a `HTMLElement` that will have dragging enabled. Jquery users can access an instance of this object using the following Jquery index / method `$('#target')[0]` or `$('#target').get(0)`. For Jquery collections containing multiple elements, the collection will need to be iterated over and a separate instance of VanillaDrag created for each item.
