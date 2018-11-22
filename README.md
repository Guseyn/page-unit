# page-unit
Library for [Page](https://github.com/Guseyn/page) framework that provides Unit abstraction.

## install

`npm install @page-libs/unit`

## build

`npm run build`

## Unit

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
     submitButtonUnit.override('onclick', onsubmit); 
  }

  onsumbit() {
     // ajaxRequest using nameUnit.value() and passwordUnit.value();
   }

}
```

Every class that extends `Unit` has `override` method. It can be used for rebinding events from encapsulated elements to a custom events of Unit that encapsulates them. In the example above, when button is clicked, `onsubmit` is used instead of `onclick` event of the button.

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

## usage

```js
new UserForm(
  document.getElementById('user-form'), 
  new NameInput(document.getElementById('name')),
  new PasswordInput(document.getElementById('password')),
  new SubmitButton(document.getElementById('submit'))
);

```


