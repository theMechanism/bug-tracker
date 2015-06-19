userAjaxCallbacks = {};

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