/*
* @Author: midoDaddy
* @Date:   2017-08-29 16:43:43
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-29 23:07:52
*/

$(function(){
    $('#start-btn').on('click', function() {
        var floatLayer = new FloatLayer({
            width: 350,
            height: 200,
            y: 150,
            title: '米多多',
            content: '米多多是个可爱的小姑娘',
            theme: 'tomato'
        });
    })
})