/*
* @Author: 63431
* @Date:   2017-08-16 15:24:28
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-18 10:48:51
*/

//合并对象
function extend(obj1, obj2) {
    var newObj = {};
    for (var item in obj1) {
        if (obj1.hasOwnProperty(item)) {
            newObj[item] = obj1[item];
        }
    }
    for (var item in obj2) {
        if (obj2.hasOwnProperty(item)) {
            newObj[item] = obj2[item];
        }
    }
    return newObj;
}

//定义表单项构造函数
function FormItem(cfg) {
    this.cfg = {
        id: null,
        maxLength: null,
        minLength: null,
        required: true,
        pattern: null,
        equalTo: null,
        errorTip: '格式错误',
        successTip: '格式正确',
        requiredTip: '必填项，不能为空',
        rulesTip: '',
        tipContainer: null
    };
    this.CFG = extend(this.cfg, cfg);
    this.elem = document.getElementById(this.CFG.id);
    this.tipContainer = this.CFG.tipContainer || this.elem.nextElementSibling;
}

FormItem.prototype = {
    
    constructor: FormItem, 

    //显示正确提示  
    showSuccessTip: function() {
        this.elem.className = 'item-success',    
        this.tipContainer.className = 'tip tip-success';
        this.tipContainer.innerHTML = this.CFG.successTip;
    },

    //显示错误提示  
    showErrorTip: function(requiredFlag) {
        this.elem.className = 'item-error',    
        this.tipContainer.className = 'tip tip-error';
        this.tipContainer.innerHTML = requiredFlag ? this.CFG.requiredTip : this.CFG.errorTip;
    },

    //显示默认提示
    showDefaultTip: function() {
        this.elem.className = '',    
        this.tipContainer.className = 'tip';
        this.tipContainer.innerHTML = this.CFG.rulesTip;
    },

    //验证表单值
    validate: function(){
        var cfg = this.CFG,
            value = this.elem.value.trim(),
            length = value.replace(/[^\x00-\xff]/g, 'aa').length,
            errorTip = cfg.errorTip;

        //验证必填项是否为空
        if (cfg.required) {
            if (length === 0) {
                this.showErrorTip(true);
                return false;
            }
        }
        //验证最大长度
        if (cfg.maxLength) {
            if (length > cfg.maxLength) {
                this.showErrorTip();
                return false;
            }
        }
        //验证最小长度
        if (cfg.minLength) {
            if (length < cfg.minLength) {
                this.showErrorTip();
                return false;
            }
        }
        //验证是否匹配正则表达式
        if (cfg.pattern) {
            if (!cfg.pattern.test(value)) {
                this.showErrorTip();
                return false;
            }
        }       
        //验证是否等于特定值
        if (cfg.equalTo) {
            if (value !== cfg.equalTo.value.trim()) {
                this.showErrorTip();
                return false;
            }
        }
        //如果验证通过，显示通过提示       
        this.showSuccessTip();
        return true;
    },
    
    //绑定事件：获取焦点时显示默认提示，失去焦点时验证表单项值
    bindEvent: function() {
        this.elem.addEventListener('focus', this.showDefaultTip.bind(this));
        this.elem.addEventListener('blur', this.validate.bind(this));
    },
}