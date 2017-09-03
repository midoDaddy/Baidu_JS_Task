/*
* @Author: midoDaddy
* @Date:   2017-08-31 14:46:09
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-02 23:47:59
*/
$(function() {
    var calenderCon = $('.calender-container').hide(),
        dateInput = $('#date-select-input');

    var calender = new Calender({
        container: calenderCon,
        showItem: dateInput,
        currentDate: new Date(),        
        width: 300,
        height: 300
    });

    dateInput.on('click', function() {
        calenderCon.toggle();
    });

})