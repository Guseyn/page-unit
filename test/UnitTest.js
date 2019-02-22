
'use strict'

const { ObjWithNoFuncs } = require('./../mock')
const { DeepStrictEqualAssertion } = require('@cuties/assert')
const { Unit } = require('./../src/index')

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

class SubmitButton extends Unit {
  constructor (elm) {
    super(elm)
  }

  onclick () {
    /* it can be defined, but it also can be
         overridden with some other event(in that case this method would be ignored) */
  }
}

class NameInput extends Unit {
  constructor (elm) {
    super(elm)
  }

  value () {
    return this.elm.value
  }
}

class PasswordInput extends Unit {
  constructor (elm) {
    super(elm)
  }

  value () {
    return this.elm.value
  }
}

new DeepStrictEqualAssertion(
  new ObjWithNoFuncs(
    new UserForm(
      document.getElementById('user-form'),
      new NameInput(document.getElementById('name')),
      new PasswordInput(document.getElementById('password')),
      new SubmitButton(document.getElementById('submit'))
    )
  ),
  {
    elm: { id: 'user-form', onsubmit: 'some function' },
    nameUnit: { elm: { id: 'name' } },
    passwordUnit: { elm: { id: 'password' } },
    submitButtonUnit: { elm: { id: 'submit', onclick: 'some function' } }
  }
).call()
