userAjaxCallbacks = {};

// callbacks namespaced 
// object.page.callback
// userAjaxCallbacks[bugShow][addComment]

userAjaxCallbacks.bugShow = {
  addComment: function(rsp){
    $('.list-group').append(rsp.html);
    $('#comment_content').val('');
  }
}

userAjaxCallbacks.bugTable = {
  updateStatus: function(rsp){
    console.log('made it to the call back -- check out rsp:');
    console.log(rsp);
    var bug_id = rsp.bug.id;
    var html = rsp.html;
    $('.bug_' + bug_id + '_status').replaceWith(html);
  }
}

userAjaxCallbacks.projectShow = {
  updateTeamLeaderboard: function(rsp){
    $('.leaderboard-container').html(rsp.html);
  }
}
