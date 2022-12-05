# sticky-menu
Current version: 1.0.2 of Dec 05, 2022

## Installation
```npm
npm install -S git@github.com:larsactionhero/sticky-menu.git
```

## Usage
First, make sure to import dependency:
```javascript
import StickyMenu from 'stickymenu';
```

### 1. For a single instance:
```javascript

// select menu item
const stickyMenuElement = document.querySelector('.my-menu');

// set up config
const stickyMenuConfig = {
  element: stickyMenuElement,
  options: {
    contentElement: document.querySelector('.header-slider'), // set element to prevent from jumping when menu is active
    setContentOffset: true,
    contentElementOffset: 100, // e.g. header height
    startStickyAtPos: 50, // e.g. start at 50% of header height
    hide: false,
  }
};

const stickyMenuInst = new StickyMenu(stickyMenuElement, stickyMenuConfig);
stickyMenuInst.init();
```

### 2. For a multiple instances:
```javascript
const stickyMenuElement_1 = document.querySelector('.my-menu');
const stickyMenuElement_2 = document.querySelector('.my-second-menu');

// set up config as object and loop over entries
const stickyMenuConfig = {
  0: {
    element: stickyMenuElement_1,
    options: {
      contentElement: document.querySelector('.header-slider'),
      setContentOffset: true,
      contentElementOffset: contentOffset,
      startStickyAtPos: (mainHeaderHeight / 2), // fire when nav is hidden by half of its height
      hide: false,
    },
  },
  1: {
    element: stickyMenuElement_2,
    options: {
      startStickyAtPos: 400,
      hide: false,
    },
  },
};

// iterate over config items an fire init for each entry
for (let i = 0; i < Object.keys(stickyMenuConfig).length; i += 1) {
  stickyMenuItem = stickyMenuConfig[i];
  stickyMenuElement = document.querySelector(stickyMenuItem.element);
  initStickyMenu = (stickyMenuElement !== null) ? stickyMenuElement.dataset.stickyMenu : false;

  if (initStickyMenu === '1') {
    const stickyMenuInst = new StickyMenu(stickyMenuElement, stickyMenuItem.options);
    stickyMenuInst.init();
  }
}
```

### 3. Params on html element(s)
init an element:  
```
[data-sticky-menu="1"]
```

```html
<div class="sticky-menu" data-sticky-menu="1">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
</div>
```

```css
@import '~sticky-menu/css/sticky-menu.css';
```

## Setup
Setup requires an element `HTMLElement`.
Options are optional are are being passed via object.
```javascript
const sticky = new StickyMenu(element, options);
```

## Options
```javascript 
startStickyAtPos = options.startStickyAtPos || 0;
```
Controls at which scroll position the sticky menu takes effect.

---
```javascript 
breakpoint: Number (default: 0) 
```
If set, sticky menu inits only when window width is > breakpoint

---
```javascript 
navElement: HTMLElement (*required)
```
---
```javascript 
navClass: String (default: 'stickymenu')
```
The initial menu class. Usually no need to overwrite it.

---
```javascript 
navPos: Number // if set, TODO
```
---
```javascript 
contentElement: HTMLElement 
```
Defines a content element to apply dynamic setting of offset on.
---
```javascript 
setContentOffset: Boolean (true or false)
```
---
```javascript 
contentElementOffset: Number (default: 0)
```
---
```javascript 
zIndex: Number (default: null)
```
---
```javascript 
hide: Boolean (default: false)
```
