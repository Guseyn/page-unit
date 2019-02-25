# page-unit

[![NPM Version](https://img.shields.io/npm/v/@page-libs/unit.svg)](https://npmjs.org/package/@page-libs/unit)
[![Build Status](https://travis-ci.org/Guseyn/page-unit.svg?branch=master)](https://travis-ci.org/Guseyn/page-unit)
[![codecov](https://codecov.io/gh/Guseyn/page-unit/branch/master/graph/badge.svg)](https://codecov.io/gh/Guseyn/page-unit)

Library for [Page](https://github.com/Guseyn/page) framework that provides Unit abstraction. It's based on the [Async Tree Pattern](https://github.com/Guseyn/async-tree-patern/blob/master/Async_Tree_Patern.pdf).

## Install

`npm install @page-libs/unit`

## Run test

`npm test`

## Run build

`npm run build`

Package is already built. So, for using in Page you just need to install it.

## Unit

### Unit implementation

```js
class Unit {
  constructor (elm) {
    this.elm = elm
    for (let propertyName of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (this[propertyName] instanceof Function &&
          this[propertyName] !== 'constructor' &&
          propertyName.startsWith('on')) {
        this.elm[propertyName] = this[propertyName].bind(this)
      }
    }
  }

  override (unit, methodName, method) {
    unit.elm[methodName] = method.bind(this)
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
const { Unit } = require('@page-libs/unit')

class UserForm extends Unit {
  constructor (elm, nameUnit, passwordUnit, submitButtonUnit) {
    super(elm)
    this.nameUnit = nameUnit
    this.passwordUnit = passwordUnit
    this.submitButtonUnit = submitButtonUnit
    // so when submit button is clicked, onsubmit event will be invoked
    this.override(this.submitButtonUnit, 'onclick', this.onsubmit)
  }

  onsubmit () {
    // ajaxRequest using nameUnit.value() and passwordUnit.value();
  }
}

```

```js
const { Unit } = require('@page-libs/unit')

class SubmitButton extends Unit {
  constructor (elm) {
    super(elm)
  }

  onclick () {
    /* it can be defined, but it also can be
         overridden with some other event(in that case this method would be ignored) */
  }
}

```

```js
const { Unit } = require('@page-libs/unit')

class NameInput extends Unit {
  constructor (elm) {
    super(elm)
  }

  value () {
    return this.elm.value
  }
}

```

```js
const { Unit } = require('@page-libs/unit')

class PasswordInput extends Unit {
  constructor (elm) {
    super(elm)
  }

  value () {
    return this.elm.value
  }
}

```

Then you can declare elements in the following style:

```js
new UserForm(
  document.getElementById('user-form'), 
  new NameInput(document.getElementById('name')),
  new PasswordInput(document.getElementById('password')),
  new SubmitButton(document.getElementById('submit'))
)

```