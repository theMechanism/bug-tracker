var GlobalUtils = {
  toCapitalizedWords: function(name) {
    var words = name.match(/[A-Za-z][a-z]*/g);
    return words.map(GlobalUtils.capitalize).join(" ");
  },
  capitalize: function(word) {
    return word.charAt(0).toUpperCase() + word.substring(1);
  } 
} 