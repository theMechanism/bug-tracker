// right now -- take short cut -- avoid making this another object,
// start by creating a callback registry

var ModalController = function(modalFormUrls) {
  this.modalFormUrls = modalFormUrls;
  this.modalForms = {};
  
  this.$modal = $('.modal');
  this.$title = $('.modal-title');
  this.$body = $('.modal-body');


}

//   // console.log(<%= modal_urls  %>);
//   $( document ).ready( function(){
//     var modalFormUrls = <%= modal_urls  %>;
//     var modalForms = {};

//     _.each(modalFormUrls, function(url, key){
//       $.get(url, function(partial){
//         modalForms[key] = partial;
//       });
      
//       $('.' + key).click(function(e){
//         console.log('in key listener of modal, show event');
//         console.log(e);
//         $('.modal-title').html( toCapitalizedWords(key) );
//         $('.modal-body').html( modalForms[key] );
        
//         $('.modal').modal(); 
//       })  
//     });

//     $('.modal').submit(function(event){
//       $('form').hide()
//       $('.modal-body').append( '<%= fa_icon 'spinner spin' %>' );
//       return true;
//     });


//     //  TODO - move to utility functions file
//     function toCapitalizedWords(name) {
//         var words = name.match(/[A-Za-z][a-z]*/g);
//         return words.map(capitalize).join(" ");
//     }

//     function capitalize(word) {
//         return word.charAt(0).toUpperCase() + word.substring(1);
//     } 


//     $('.modal')
//         .bind('ajax:success', function(e, data, status, xhr) {
//           if (data.redirect_url){
//             console.log('success');
//             console.log(data);
//             window.location.replace(data.redirect_url);
//           } else {
//             console.log('fail');
//             console.log(data);
//             $('.modal-body').html( data);
//           }
//         })
//         .bind('ajax:error', function(e, xhr, status, error) {
//             console.log("error json: " + xhr.responseText);
//         });

//   });
  
