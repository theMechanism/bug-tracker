$( ".mech-bug-wrap" ).mouseenter(function() {
  console.log(this);
  console.log('within bounds, bg should be transluscent');
  $( this ).fadeTo( "fast", 0.5 );
})
.mouseleave(function() {
  $( this ).fadeTo( "fast", 1);
  console.log('out of bounds, bg should retract + become more opaque');
});

function chickenOrEgg(){
  console.log('never intteeed');
}