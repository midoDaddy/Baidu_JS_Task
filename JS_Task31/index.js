/*
* @Author: 63431
* @Date:   2017-08-08 22:02:21
* @Last Modified by:   63431
* @Last Modified time: 2017-08-17 10:14:27
*/

'use strict';
 (function(){

    function $(id) {
        return document.getElementById(id);
    }

    var schoolData = {
        '北京': ['北京大学', '北京工业大学', '北京理工大学', '北京师范大学', '北京邮电大学', '北京传媒大学'],
        '南京': ['南京大学', '南京工业大学', '南京理工大学', '南京师范大学', '南京邮电大学', '南京传媒大学'],
        '武汉': ['武汉大学', '武汉工业大学', '武汉理工大学', '武汉师范大学', '武汉邮电大学', '武汉传媒大学'],
        '西安': ['西安大学', '西安工业大学', '西安理工大学', '西安师范大学', '西安邮电大学', '西安传媒大学'],
        '上海': ['上海大学', '上海工业大学', '上海理工大学', '上海师范大学', '上海邮电大学', '上海传媒大学'],
        '天津': ['天津大学', '天津工业大学', '天津理工大学', '天津师范大学', '天津邮电大学', '天津传媒大学']        
    }
    var schoolForm = $('school-form'),
        companyForm = $('company-form');
    
    //渲染学校选项列表
    function renderSchoolSelect(cityName) {
        var schoolList = schoolData[cityName],
            html = '';
        schoolList.forEach(function(item) {
            html += '<option value=' + item + '>' + item + '</option>';
        })
        $('school-select').innerHTML = html;
    }
    
    //选择学生，显示学校选择表单
    $('student-radio').addEventListener('click', function(){
        companyForm.style.display = 'none';
        schoolForm.style.display = 'block';
    });
    
    //选择非学生，显示就业单位表单
    $('non-student-radio').addEventListener('click', function(){
        companyForm.style.display = 'block';
        schoolForm.style.display = 'none';
        $('company-input').focus();
    });
    
    //根据选择的城市，显示相应的学校
    $('city-select').addEventListener('change', function(){
        var city = this.value;
        renderSchoolSelect(city);
    });
    
    //初始化
    renderSchoolSelect('北京');

})();


