/*
* @Author: midoDaddy
* @Date:   2017-08-30 16:44:35
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-08-30 23:41:53
*/
$(function() {
    function getRandomData(n) {
        var data = [];
        for (var i = 0; i < n; i++) {
            var item = {
                name: 'No.' + i,
                chinese: Math.round(Math.random()*100),
                math: Math.round(Math.random()*100),
                english: Math.round(Math.random()*100),
            }
            item.total = item.chinese + item.math + item.english;
            data.push(item)
        }
        return data;
    }

    var scoreData = getRandomData(20);
    
    var sortTable = new SortTable({
        container: $('.table-wrapper'),
        data: scoreData,
        head: {
            name: '姓名', 
            chinese: '语文', 
            math: '数学', 
            english: '英语', 
            total: '总分'
        },
        sortItems: ['chinese', 'math', 'english', 'total'],
        sortMethods: {
            chinese: function(a, b){
                return a.chinese - b.chinese
            }, 
            math: null,
            english: function(a, b){
                return b.chinese - a.chinese
            }, 
            total: null,
        },
        fontSize: 16,
        lineHeight: 3,
        width: 800,
        theme: 'tomato'
    })

})
