/*MIT License
See Also MIT-LICENSE.txt
Copyright (c) 2013 dhrname*/

function base(name) {
    if (!arguments[0]) {
      throw new Error("No arguments errror");
    } else if (!this.__id_ && this[name]) {
      /*up���\�b�h�ŌĂ΂�Ă��炸�A���Aid�o�^����Ă���ꍇ�́A�o�^���ꂽ�I�u�W�F�N�g��Ԃ�*/
      return this[name];
    } else {
      var F = function() {},
          s;
      F.prototype = this;
      s = new F();
      s.constructor = F;
      s.mix = base.mix;
      s.up = base;
      /*__id_�v���p�e�B��up���\�b�h�ŌĂ΂ꂽ���ǂ������ʂ��邽��*/
      s.__id_ = name;
      this[name] = s;
      /*IE 8�ł́A�O���[�o���I�u�W�F�N�g�̃v���g�^�C�v�p�������܂������Ȃ����߁A
       *���̂悤�Ȏ��g���l�ł���悤�ȃv���p�e�B��ݒ肷��
       */
      s[name] = s;
      F = void 0;
      return s;  
    }
};

this.__id_ = null;

(function(){
  /*mix���\�b�h�Ŏg��NG�n�b�V�����쐬*/
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
        /*hasOwnProperty���\�b�h���g��Ȃ��̂́A�v���g�^�C�v�`�F�[�������ǂ�悤�ɂ��邽��
         *�Ȃ��AObject.prototype�ƃO���[�o���I�u�W�F�N�g�̃v���p�e�B�Ȃǂ͊O���������G���[�������ɂ���
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