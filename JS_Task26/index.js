/*
* @Author: midoDaddy
* @Date:   2017-08-23 11:23:49
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-23 22:44:29
*/
var commander = new Commander();
var ship1 = new Ship({
    id: 'ship-1',
    startDeg: 60
});
var ship2 = new Ship({
    id: 'ship-2',
    index: 2,
    startDeg: -60,
    radius: 200
});
var ship3 = new Ship({
    id: 'ship-3',
    startDeg: 180
});
var ship4 = new Ship({
    id: 'ship-4',
    startDeg: 270
});

$('#ship-1-command').find('.start').on('click', ship1.go.bind(ship1));
$('#ship-1-command').find('.stop').on('click', ship1.stop.bind(ship1));
$('#ship-1-command').find('.destroy').on('click', ship1.destroy.bind(ship1));

$('#ship-2-command').find('.start').on('click', ship2.go.bind(ship2));
$('#ship-2-command').find('.stop').on('click', ship2.stop.bind(ship2));
$('#ship-2-command').find('.destroy').on('click', ship2.destroy.bind(ship2));