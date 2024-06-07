# sticky-menu
sticky-menu is a light-weight plugin to easily create a sticky navigation which can be customized for your needs.
It's written in vanilla javascript and comes without any further dependencies. 

## Installation
```npm
npm install sticky-menu
```

## Usage
First, make sure to import dependency:
```javascript
import StickyMenu from 'sticky-menu';
```

Import basic css:
```css
@import '~/stickymenu/css/style.css'; /* you may check if you need the tilde (~) alias for /node_modules folder. */
```

## Setup
Setup requires an element `HTMLElement`.
Options are passed as `Object`.
```javascript
const sticky = new StickyMenu(options);
```

Requires an html element selector (classname, id, data-attribute, …).<br>
Options are passed as `Object`.

#### Basically you need:
```javascript
const options = {
  // place options here
};
const stickyMenu = new StickyMenu(options); // fires init
```

#### Example with options:
```javascript
const menuElementSelector = document.querySelector('.myNavElement');
const stickyMenu = new StickyMenu({
  menuElement: menuElementSelector,
  options: {
    contentElement: document.querySelector('main'), 
    contentElementOffset: 100,  // content offset (in px)
    startStickyAtPos: 30,       // sticky menu starts if scrollTop is >= 30px
    resizeEventTimeout: 100,    // timeout after which the resize event fires (in ms)
    scrollEventTimeout: 100,     // timeout after scroll the scroll event fires (in ms)
  }
});

stickyMenu.init(); // call init() to fire plugin
```

## Options
| Option name | Type | Default | Description | Required |
|---|---|---|---|---|
| `breakpoint` | Number  | 0 _(in px)_ | Stickymenu is only initialized if window width is above or equal to breakpoint.  | false |
| `contentElement` | HTMLElement  || Element to apply offset (in px) on.<br>_Note:_ a (_sticky_) element with `position: fixed` usually causes 'jumping' content due to its missing height.<br>To prevent that, just use the `contentElementOffset` option by adding offset to the to the next following element after your menu element.<br> Will only be applied if option is set. | false |
| `contentElementOffset` | Number | 0 _(in px)_ | Sets content element offset. | false |
| `menuElement` | HTMLElement  |  | The target element to apply sticky mode on. | **true** |
| `menuClass` | String  | `stickymenu` | A css class which is added to target element when in sticky mode.<br>Note: the active class is generated automatically. `yourClassName` results in `yourclassname-active`.  | false |
| `scrollPosY` | Number  | 0 _(in px)_ | Controls at which scroll position the stickymenu takes effect. | false |
| `resizeEventTimeout` | Number  | 50 _(in ms)_ | Final event execution in resize handler is delayed to prevent being fired on every px while resizing.<br>This sets timeout in ms after which the final resize event fires. | false |
| `scrollEventTimeout` | Number  | 50 _(in ms)_ | Final event execution in scroll handler is delayed to prevent being fired on every px while scrolling.<br>This sets timeout in ms after which the final scroll event fires. | false |
