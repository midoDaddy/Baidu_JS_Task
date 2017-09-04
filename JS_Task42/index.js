/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-04 23:00:01
*/
$(function() {
    var calenderSingleCon = $('.calender-single-container').hide(),
        calenderRangeCon = $('.calender-range-container').hide(),
        dateSingleInput = $('#date-single-select-input');
        dateRangeInput = $('#date-range-select-input');

    var calenderRange = new Calender({
            container: calenderRangeCon,
            showItem: dateRangeInput, 
            rangeSelect: true,  
            maxRange: 20,
            minRange: 5,    
            width: 300,
            height: 300
        }),
        calenderSinge = new Calender({
            container: calenderSingleCon,
            showItem: dateSingleInput, 
            maxDate: new Date(2017, 9, 31),
            minDate: new Date(2016, 0, 26),   
            width: 300,
            height: 300
        });

    dateSingleInput.on('click', function(){
        calenderSingleCon.toggle();
    });
    dateRangeInput.on('click', function(){
        calenderRangeCon.toggle();
    });

})