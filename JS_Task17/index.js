(function(){

	//跨浏览器事件添加函数
	function addEvent(element, type, handler){
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		}else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		}else{
			element["on" + type] = handler;
		}
	}

	//日期格式标准化
	function getDateStr(date){
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m > 10 ? m : '0' + m;
		var d = date.getDate();
		d = d > 10 ? d : '0' + d;
		//ie不支持‘yyyy-mm-dd’的传入格式，使用'/'更加通用
		return y + '/' + m + '/' + d;
	}

	//生成测试数据
	function buildData(range){
		var data = {};
		var startDate = new Date(2016, 0, 1);
		for (var i = 0; i < 100; i++) {		
			var dateStr = getDateStr(startDate);
			var value = Math.ceil(Math.random()*range);
			data[dateStr] = value;
			startDate.setDate(startDate.getDate() + 1);
		}
		return data;
	}

	var aqiData = {
		'北京': buildData(500),
		'上海': buildData(200),
		'广州': buildData(150),
		'深圳': buildData(100),
		'杭州': buildData(250),
		'西安': buildData(450),
		'成都': buildData(400)
	}

	//用于渲染图表的数据
	var charData = {};

	//记录当前页面的表单选项
	var pageState = {
		nowSelectCity: '北京',
		nowGraTime: 'day'
	}

	//根据空气质量指数范围设置对应的颜色
	function getColor(value){
		var color = '';
		switch(true){
			case value >= 0 && value < 100: color = '#A7CF8C';
			break;
			case value >= 100 && value < 200: color = '#F7DA64';
			break;
			case value >= 200 && value < 300: color = '#F29E39';
			break;
			case value >= 300 && value < 400: color = '#DA555D';
			break;
			case value >= 400 && value <= 500: color = '#B9377A';
			break;
			default: color = 'white';
			}
		return color;		
	}

	//渲染图表
	function renderChart(){
		var aqiChartWrap = document.getElementsByClassName('aqi-chart-wrap')[0];
		var divStr = '', color = '';
		for(var item in charData){
			color = getColor(charData[item]);		
			divStr += '<div title="' + item + ':' + charData[item] + 
					'" style="height:' + charData[item] + 
					'px; background:' + color + '"> </div>';
		}
		aqiChartWrap.innerHTML = divStr;
	}

	//日、周、月的radio事件点击时的处理函数
	function graTimeChange(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		pageState.nowGraTime = target.value;
		initAqiCharData();		
		renderChart();		
	}

	//select发生变化时的处理函数
	function citySelectChange(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		pageState.nowSelectCity = target.value;
		initAqiCharData();	
		renderChart();	
	}

	//初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
	function initGraTimeForm(){
		var timeBox = document.getElementById('form-gra-time');
		addEvent(timeBox, 'change', graTimeChange);
	}

	//初始化城市select下拉选项框中的选项
	function initCitySelector(){
		var cityBox = document.getElementById('city-select');
		var text = '';
		for(var item in aqiData){
			text += '<option>' + item + '</option>'
		}
		cityBox.innerHTML = text;
		addEvent(cityBox, 'change', citySelectChange);
	}

	//初始化图表需要的数据格式
	function initAqiCharData(){
		var aqiCityData = aqiData[pageState.nowSelectCity];
		if (pageState.nowGraTime === 'day') {
			charData = aqiCityData;
		}
		if (pageState.nowGraTime === 'week'){
			charData = {};
			var weekCount = 0,
				dayCount = 0,
				weekSum = 0;
			for (var item in aqiCityData){
				dayCount++;
				weekSum += aqiCityData[item];
				var date = new Date(item);
				if (date.getDay() === 6){				
					weekCount++;				
					charData['第' + weekCount + '周'] = Math.round(weekSum/dayCount);
					dayCount = 0;
					weekSum = 0;
				}
			}
			if (dayCount != 0) {
				weekCount++;
				charData['第' + weekCount + '周'] = Math.round(weekSum/dayCount);
			}
		}
		if (pageState.nowGraTime === 'month') {
			charData = {};
			var monthCount = 0,
				monthSum = 0,
				dayCount = 0;
			for (var item in aqiCityData){
				var today = new Date(item);
				var monthNow = today.getMonth();
				today.setDate(today.getDate() + 1);
				var monthNext = today.getMonth();
				dayCount++;
				monthSum += aqiCityData[item];
				if (monthNow !== monthNext){
					monthCount++;
					charData[monthCount + '月'] = Math.round(monthSum/dayCount);
					monthSum = 0;
					dayCount = 0;
				}
			}
			if (monthSum !== 0) {
				monthCount++;
				charData[monthCount + '月'] = Math.round(monthSum/dayCount);
			}
		}
	}

	//初始化函数 
	function init(){
		initGraTimeForm();
		initCitySelector();
		initAqiCharData();
		renderChart();
	}

	init();

})();


