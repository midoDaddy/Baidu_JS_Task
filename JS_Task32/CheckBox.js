/*
* @Author: midoDaddy
* @Date:   2017-08-17 17:34:01
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-17 22:52:30
*/
//定义表单项构造函数
function CheckBox(cfg) {
    this.cfg = {
        //表单元素
        container: null,
        label: null,
        type: 'radio',
        tipFlag: true,
        count: 2,
        //元素属性
        name: '',         
        values: [],
        optionNames: [],           
        //表单样式
        basicTheme: 'form-item-basic',
        specialTheme: '',
        //验证规则
        required: true,
        validator: null,
        //提示信息
        requiredTip: '必填项，不能为空',
        errorTip: '填写有误'
    };
    this.CFG = extend(this.cfg, cfg);
    this.createCheckBox();
}

CheckBox.prototype = {
    
    constructor: CheckBox, 
    
    //创建表单项
    createCheckBox: function() {
        this.createWrapper();
        this.createLabel();
        this.createItemGroup();
        this.createTip();    
    },

    //创建wrapper
    createWrapper: function() {
        var cfg = this.cfg;
        this.wrapper = document.createElement('div');
        this.wrapper.className = cfg.specialTheme ? 
            (cfg.basicTheme + ' ' + cfg.specialTheme) : cfg.basicTheme;
        cfg.container.appendChild(this.wrapper);
    },

    //创建label
    createLabel: function() {
        var cfg = this.cfg;
        if (cfg.label) {
            this.label = document.createElement('label');
            this.label.for = cfg.id;
            this.label.innerHTML = cfg.label; 
            this.wrapper.appendChild(this.label);
        }
    },
    
    //创建checkbox表单组
    createItemGroup: function() {
        var cfg = this.cfg;
        this.itemGroup = [];
        for (var i = 0; i < cfg.count; i++) {          
            var labelWrapper = document.createElement('label'),
                optionName = document.createElement('span'),
                checkItem = document.createElement('input');

            labelWrapper.className = 'label-wrapper';
            optionName.innerHTML = cfg.optionNames[i];
            checkItem.name = cfg.name;
            checkItem.type = cfg.type;
            cfg.values[i] && (checkItem.value = cfg.values[i]);

            this.wrapper.appendChild(labelWrapper);
            labelWrapper.appendChild(checkItem);
            labelWrapper.appendChild(optionName);

            this.itemGroup.push(checkItem);
        }
    },

    //创建tip
    createTip: function() {
        var cfg = this.cfg;
        if (cfg.tipFlag) {
            this.tip = document.createElement('p');
            this.tip.className = 'tip';
            this.wrapper.appendChild(this.tip);
        }  
    },
    

    //显示错误信息
    showErrorTip: function(msg) {
        this.tip.innerHTML = msg;
        this.tip.className = 'tip error-tip';
    },
    
    //验证表单值
    validate: function(){
        var cfg = this.CFG;

        //验证必填项是否为空
        if (cfg.required) {
            var flag = false;
            this.itemGroup.forEach(function(item) {
                if (item.checked) {
                    flag = true;
                }
            })
            if (!flag) {
                this.showErrorTip(cfg.requiredTip);
                return false;
            }                
        }
        //验证是否符合自定义规则
        if (cfg.validator) {
            if (!cfg.validator(itemGroup)) {
                this.showErrorTip(cfg.errorTip);
                return false;
            }
        }
        //如果验证通过，显示通过提示       
        return true;
    },    
}