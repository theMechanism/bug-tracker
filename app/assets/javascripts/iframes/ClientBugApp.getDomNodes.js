function getDomNodes($mountNode) {

  var components = {
    mechPullTab: $('#mech-pull-tab'),

    controlPanel: {
      parent: $('#mech-bug-report'),
      menu: {
        selects: $('.menu_select a')
      },
      selected_content: $('#selected_content'),
      form: $('form#new_bug'),
      bugName: $('#bug_name'),
      bugDesc: $('#bug_description'),
      formSubmitButton: $('form a[href="#submit"]'),
      bugsTable: $('#bugsTable'),
      links: $('#links')
    },
    feedback: {
      response: $('#mech-bug-response'),
      error: $('#mech-bug-error'),
      errorInfo: $('#mech-bug-error-info')
    },
    wraps: $('.mech-bug-wrap', $mountNode),
    closeButtons: $('.mech-bug-close')
  }

  return components;
}