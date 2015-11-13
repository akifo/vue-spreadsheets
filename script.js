(function() {

  'use strict';



  Vue.component('demo-grid', {
    template: '<table><tr v-for="station in data"><td v-for="info in station">{{info}}</td></tr></table>',
    props: {
      data: Array,
    }
  });

  var app = new Vue({
    el: '#app',
    data: {
      ranking_ken_1: []
    },
    created: function() {
      console.log('creted');
      this.getAjax();
    },
    methods: {

      getAjax: function() {
        var self = this;
        var JSONURL = 'https://spreadsheets.google.com/feeds/list/1IkfDAo4WhcFN0n7OUqjvawz8kalKzcisVznA1HsXoH4/1/public/basic?alt=json';
        $.get(JSONURL, function(spreadData){
          self.cleanItUp(spreadData);
      	});
      }, // getAjax

      cleanItUp: function(data) {
        var self = this;
        var cells = data.feed.entry;
        _.map(cells, function(cell) {
          console.log(cell);
          var rowObj = {};
          var rowCols = _.words(cell.content.$t,/[^,]+/g);
          console.log(rowCols);
          _.map(rowCols, function(col) {
            var keyVal = _.words(col,/[^:]+/g);
            rowObj[keyVal[0]] = keyVal[1];
          });
          rowObj.nid = cell.title.$t;
          self.ranking_ken_1.push(rowObj);
        });
      }

    }

  });

})();
