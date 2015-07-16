var GlobalUtils = {
  toCapitalizedWords: function(name) {
    var words = name.match(/[A-Za-z][a-z]*/g);
    return words.map(GlobalUtils.capitalize).join(" ");
  },
  capitalize: function(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  },
  loadBefore: function(funcs, callback){
    var counter = 0;
    $.each(funcs, function (index, func) {
      func(check);
    });
    function check() {
      counter++;
      if (counter === $(funcs).size()) {
        callback();
      }
    }
  } 
} 

// function doThese (funcs, callback) {
//       // this function takes an array of asynchronous functions with callbacks and executes the callback when they are all complete
//       var counter = 0;
//       $.each(funcs, function (index, func) {
//         func(check);
//       });
//       function check() {
//         counter++;
//         if (counter === $(funcs).size()) {
//           callback();
//         }
//       }
//     }