/*MIT License
Copyright (c) 2013 dhrname*/

if (!Function.prototype.sleep) {
  Function.prototype.sleep = (function(){
    var num = [],
        result = 0,
        functionque = [],
        se = setTimeout,
        cl = clearTimeout,
        idse = null,    //ID that a setTimeout method returns
        f = function () {
          cl(idse);
          var s = functionque.shift();
          if (s) {
            s.args[0] = result;
            result = s.func.apply(s.func, s.args);
          }
          if (functionque.length > 0) {
            idse = se(f, num.shift());
          } else {       //Time Loop End
            result = 0;  //Reset the result and ID
            idse = null;
          }
          s = void 0;
        };
    return function () {
      var fque = functionque,
          flen = 0;
      fque.push({
        func: this,
        args: Array.prototype.slice.call(arguments)
      });
      flen = fque.length;
      num.push((arguments[0] || 0));
      if ((flen === 1) && !idse) {
        idse = se(f, 0);
      } else if ((this !== fque[flen-2]) && (flen > 1)){
        /*Input a back property to the previous function*/
        this.back = fque[flen-2].func;
      }
      fque = flen = void 0;
      return this;
    };  
  })();
}