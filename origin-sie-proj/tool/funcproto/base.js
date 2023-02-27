/*MIT License
See Also MIT-LICENSE.txt
Copyright (c) 2013 dhrname*/

function base(name) {
    if (!arguments[0]) {
      throw new Error("No arguments errror");
    } else if (!this.__id_ && this[name]) {
      /*upメソッドで呼ばれておらず、かつ、id登録されている場合は、登録されたオブジェクトを返す*/
      return this[name];
    } else {
      var F = function() {},
          s;
      F.prototype = this;
      s = new F();
      s.constructor = F;
      s.mix = base.mix;
      s.up = base;
      /*__id_プロパティはupメソッドで呼ばれたかどうか判別するため*/
      s.__id_ = name;
      this[name] = s;
      /*IE 8では、グローバルオブジェクトのプロトタイプ継承がうまくいかないため、
       *次のような自身が値であるようなプロパティを設定する
       */
      s[name] = s;
      F = void 0;
      return s;  
    }
};

this.__id_ = null;

(function(){
  /*mixメソッドで使うNGハッシュを作成*/
  var hash = {},
      proto = Object.prototype; 
  for (var i in this) {
    hash[i] = true;
  }
  for (var i in proto) {
    hash[i] = true;
  }
  base.__ng_ = hash;
})();

base.mix = function(obj) {
    if (!arguments[0]) {
      throw new Error("No arguments errror");
    }
    if (typeof obj !== "function") {
      var alias = base;
      for (var i in obj) {
        /*hasOwnPropertyメソッドを使わないのは、プロトタイプチェーンをたどるようにするため
         *なお、Object.prototypeとグローバルオブジェクトのプロパティなどは外した方がエラーがおきにくい
         */
        if (!alias.__ng_[i]) {
          this[i] = obj[i];
        }
      }
      i = alias = void 0;
    } else {
      obj.call(this);
    }
    return this;
};