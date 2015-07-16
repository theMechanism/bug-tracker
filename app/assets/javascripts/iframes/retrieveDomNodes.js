function getDomNodes() {
  var nodes = {
    mechBugTracker: $('#mech-bug-tracker'),
    mechBugReport: $('#mech-bug-report'),
    mechBugResponse: $('#mech-bug-response'),
    mechBugError: $('#mech-bug-error'),
    mechPullTab: $('#mech-pull-tab'),
    
    
    mechBugForm: $('#mech-bug-form'),
    mechBugFormName: $('#form-name'),
    mechBugSubmit: $('#mech-bug-submit'),
    mechBugInfo: $('#mech-bug-info'),
    
    mechBugErrorInfo: $('#mech-bug-error-info'),
    mechBugID: $('#mech-bug-id'),
    mechBugUserName: $('#mech-bug-user-name'),
    mechBugDescription: $('#mech-bug-description'),
    mechBugURL: $('#mech-bug-url'),
    mechBugBrowser: $('#mech-bug-browser'),
    mechBugBrowserVersion: $('#mech-bug-browser-version'),
    mechBugWidth: $('#mech-bug-width'),
    mechBugHeight: $('#mech-bug-height'),
    mechBugCreated: $('#mech-bug-created'),
    mechBugUA: $('#mech-bug-ua'),
    mechBugOS: $('#mech-bug-os'),
    hasTransitions: (Modernizr.csstransforms && Modernizr.csstransitions)
  }
  nodes.mechBugClose = $('.mech-bug-close', nodes.mechBugTracker);
  nodes.mechBugMoreLess = $('.mech-bug-more', nodes.mechBugTracker);
  nodes.mechBugWraps = $('.mech-bug-wrap', nodes.mechBugTracker);
  
  return nodes;
}