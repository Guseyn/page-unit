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

  override(methodName, method) {
    this.elm[methodName] = method.bind(this);
  }

}

module.exports = Unit;
