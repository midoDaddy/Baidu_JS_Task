/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-17 22:51:45
*/

'use strict';
(function(){ 
    
    var containerA = document.getElementById('container-a'),
        containerB = document.getElementById('container-b');
    
    //用户名表单项
    var usernameItemA = new FormItem({
        container: containerA,
        label: '用户名',
        id: 'username-input-a',
        maxLength: 16,
        minLength: 4
    });

    //密码表单项
    var pwdItemA = new FormItem({
        container: containerA,
        inputType: 'password',
        label: '密码',
        id: 'pwd-input-b',
        maxLength: 16,
        minLength: 6
    });

    //兴趣爱好表单项
    var textareaItemA = new FormItem({
        container: containerA,
        type: 'textarea',
        label: '兴趣爱好',
        cols: 30,
        rows: 5,
        id: 'hobby-textarea-a',
    });

    //城市选择表单项
    var selectItem = new FormItem({
        container: containerA,
        type: 'select',
        label: '选择城市',
        id: 'city-select',
        options: ['北京', '上海', '南京', '深圳', '广州', '杭州']
    });

    //用户名表单项
    var usernameItemA = new FormItem({
        container: containerB,
        label: '用户名',
        id: 'username-input-b',
        maxLength: 16,
        minLength: 4,
        specialTheme: 'form-item-tomato'
    });

    //密码表单项
    var pwdItemA = new FormItem({
        container: containerB,
        inputType: 'password',
        label: '密码',
        id: 'pwd-input-b',
        maxLength: 16,
        minLength: 6,
        specialTheme: 'form-item-tomato'
    });

    //兴趣爱好表单项
    var textareaItemA = new FormItem({
        container: containerB,
        type: 'textarea',
        label: '兴趣爱好',
        cols: 30,
        rows: 5,
        id: 'hobby-textarea-b',
        specialTheme: 'form-item-tomato'
    });

    //城市选择表单项
    var selectItem = new FormItem({
        container: containerB,
        type: 'select',
        label: '选择城市',
        id: 'city-select-b',
        options: ['北京', '上海', '南京', '深圳', '广州', '杭州'],
        specialTheme: 'form-item-tomato'
    });

    var sexItem = new CheckBox({
        type: 'radio',
        count: 2,
        label: '性别',
        container: containerA,
        name: 'sex',
        values: ['male', 'female'],
        optionNames: ['男', '女'],  
    });

    var ageItem = new CheckBox({
        type: 'checkbox',
        count: 3,
        label: '年龄',
        container: containerA,
        name: 'age',
        values: ['10~20', '20~30', '30~40'],
        optionNames: ['10~20', '20~30', '30~40'],  
    });
    
   

})();


