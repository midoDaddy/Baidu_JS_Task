
(function(){
    var aqiData = {},
        cityInput = document.getElementById('aqi-city-input'),
        valueInput = document.getElementById('aqi-value-input'),
        addBtn = document.getElementById('add-btn'),
        aqiTable = document.getElementById('aqi-table');
    
    //去除首尾空格
    function trim(value) {
        return value.replace(/^\s*/, '').replace(/\s*$/, '');
    }
    
    //验证城市名称格式
    function checkCity(cityName) {
        var pattern = /[^a-zA-Z\u4e00-\u9fa5]/,
            value = trim(cityName);
        if (pattern.test(value)) {
            alert('城市名称只能输入中文或英文');
            return false;
        }
        return true;
    }

    //验证aqi数值格式
    function checkValue(aqiValue) {
        var pattern = /^(([1-9][0-9]{0,2})|0)$/,
            value = trim(aqiValue);
        if (!pattern.test(value)) {
            alert('空气质量指数只能输入0~999的整数');
            return false;
        }
        return true;
    }
    
    //添加数据
    function addAqiData() {
        var cityName = cityInput.value,
            aqiValue = valueInput.value;
        if (checkCity(cityName) && checkValue(aqiValue)) {
            aqiData[cityName] = aqiValue;
        }
    }

    //删除数据
    function deleteAqiData(elem) {       
        var item = elem.parentNode.parentNode.children[0].innerHTML;
        delete aqiData[item];       
    }

    //渲染数据
    function renderAqiList() {
        var tableHtml = '';
        tableHtml += '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
        for (var item in aqiData) {
            tableHtml += '<tr><td>' + item + '</td><td>' + aqiData[item] + 
                        '</td><td><button>删除</button></td></tr>'
        };
        aqiTable.innerHTML = tableHtml;
    }
    
    //添加数据事件
    addBtn.onclick = function() {
        addAqiData();
        renderAqiList();
    }; 

    //删除数据事件
    aqiTable.onclick = function(e) {
        var target = e.target;
        if (target.tagName === 'BUTTON') {
            deleteAqiData(target);
            renderAqiList();
        }       
    }

})();