userAjaxCallbacks = {};

// callbacks namespaced 
// object.pageOrHtmlElement.callback
// userAjaxCallbacks[bugShow][addComment]

userAjaxCallbacks.bugShow = {
  addComment: function(rsp){
    $('.list-group').append(rsp.html);
    $('#comment_content').val('');
  }
}

userAjaxCallbacks.bugTable = {
  updateStatus: function(rsp){
    var bug_id = rsp.bug.id;
    var html = rsp.html;
    $('.bug_' + bug_id + '_status').replaceWith(html);
  },
  updateAdminAssign: function(rsp){
    var bug_id = rsp.bug.id;
    $('.bug_' + bug_id + '_row').replaceWith(rsp.html.row);
    // if there is a leaderboard, also update
    $('.leaderboard-container').html(rsp.html.leaderboard);
  }
}

userAjaxCallbacks.projectShow = {
  updateTeamLeaderboard: function(rsp){
    $('.leaderboard-container').html(rsp.html);
  }
}
