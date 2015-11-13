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
      ranking_ken_1: [{
        rank: 1,
        name: 'branco'
      }]
    },
    created: function() {
      console.log('creted');
      this.getAjax();
    },
    methods: {

      getAjax: function() {
        var self = this;
        $.get("https://docs.google.com/spreadsheets/d/1IkfDAo4WhcFN0n7OUqjvawz8kalKzcisVznA1HsXoH4/pub?gid=0&single=true&output=csv", function(csv){
          console.log(csv);
          $.csv.toArrays(csv,{}, function(err, data) {
            console.log(data);
            self.ranking_ken_1 = data;
          });
      	});
      } // getAjax

    }

  });

})();
