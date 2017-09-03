/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-03 22:56:06
*/
$(function() {
    var calenderCon = $('.calender-container').hide(),
        dateInput = $('#date-select-input');

    var calender = new Calender({
        container: calenderCon,
        showItem: dateInput,
        currentDate: new Date(),  
        rangeSelect: true,      
        width: 300,
        height: 300
    });

    dateInput.on('click', function() {
        calenderCon.toggle();
    });

})