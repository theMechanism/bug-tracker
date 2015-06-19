userAjaxCallbacks = {};

// BAD -- multiple instantiations... very glitchy and need counter , not sure why or of bettter strategy
userAjaxCallbacks.instanceCounter = 0;
userAjaxObjects = [];

// callbacks namespaced 
// object.page.callback
// userAjaxCallbacks[bugShow][addComment]

userAjaxCallbacks.bugShow = {
  addComment: function(html){
    $('.list-group').append(html);
  }
}

userAjaxCallbacks.projectShow = {
  updateTeamLeaderboard: function(html){
    $('.leaderboard-container').html(html);
  }
}
