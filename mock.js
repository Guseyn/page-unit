'use strict'

const { AsyncObject } = require('@cuties/cutie')

// mock global document
global.document = {
  getElementById: (id) => {
    return {
      id: id
    }
  }
}

// async object that gets only data from object
class ObjWithNoFuncs extends AsyncObject {
  constructor (elm) {
    super(elm)
  }

  syncCall () {
    return (elm) => {
      this.objWithNoFuncs(elm)
      return JSON.parse(JSON.stringify(elm))
    }
  }

  objWithNoFuncs (obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'function') {
        obj[key] = 'some function'
      } else if (typeof obj[key] === 'object') {
        this.objWithNoFuncs(obj[key])
      }
    }
  }
}

module.exports = {
  ObjWithNoFuncs
}
