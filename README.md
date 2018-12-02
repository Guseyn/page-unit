# page-unit
Library for [Page](https://github.com/Guseyn/page) framework that provides Unit abstraction.

[![NPM Version][npm-image]][npm-url]

It's based on the [Async Tree Pattern](https://github.com/Guseyn/async-tree-patern/blob/master/Async_Tree_Patern.pdf).

## install

`npm install @page-libs/unit`

## build

`npm run build`

Package is already built. So, for using in Page you just need to install it.

## test

`npm test`

## Unit

### Unit implementation

```js
class Unit {

  constructor(elm) {
    this.elm = elm;
    for (let propertyName of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (this[propertyName] instanceof Function 
          && this[propertyName] !== 'constructor' 
          && propertyName.startsWith('on')) {
        this.elm[propertyName] = this[propertyName].bind(this);
      }
    }  
  }

  override(unit, methodName, method) {
    unit.elm[methodName] = method.bind(this);
  }

}

```

Every class that extends `Unit` has `override` method. It can be used for rebinding events from encapsulated elements to a custom events of Unit that encapsulates them. In the example below, when button is clicked, `onsubmit` is used instead of `onclick` event of the button.

## Example

Let's say we have html template(pseudocode):

```html
<div id="user-form">
  <input id ="name">
  <input id ="password">
  <button id="submit">Sign in</button>
</div>
```

```js
class UserForm extends Unit {
  
  constructor(elm, nameUnit, passwordUnit, submitButtonUnit) {
     super(elm);
     this.nameUnit = nameUnit;
     this.passwordUnit = passwordUnit;
     this.submitButtonUnit = submitButtonUnit;
     // so when submit button is clicked, onsubmit event will be invoked
     this.override(this.submitButtonUnit, 'onclick', this.onsubmit); 
  }

  onsubmit() {
     // ajaxRequest using nameUnit.value() and passwordUnit.value();
  }

}

```

```js
class SubmitButton extends Unit {
  
  constructor(elm) {
     super(elm);
  }

  onclick() {
    /* it can be defined, but it also can be
         overridden with some other event(in that case this method would be ignored) */
  }

}
```

```js
class NameInput extends Unit {
     
   constructor(elm) {
     super(elm);
   }

   value() {
     return this.elm.value;
   }
 
}
```

```js
class PasswordInput extends Unit {
     
   constructor(elm) {
     super(elm);
   }

   value() {
     return this.elm.value;
   }
 
}
```

### usage

```js
new UserForm(
  document.getElementById('user-form'), 
  new NameInput(document.getElementById('name')),
  new PasswordInput(document.getElementById('password')),
  new SubmitButton(document.getElementById('submit'))
);

```

[npm-image]: https://img.shields.io/npm/v/@page-libs/unit.svg
[npm-url]: https://npmjs.org/package/@page-libs/unit
