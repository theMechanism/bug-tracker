"use strict";

jQuery(document).ready(function($) {

	var rpc = new easyXDM.Rpc({},
    {
        remote: {
            resizeiFrame: {},
            parentInfo: {}
        }
    });

	var mechBugTracker = $('#mech-bug-tracker'),
		mechBugReport = $('#mech-bug-report'),
		mechBugResponse = $('#mech-bug-response'),
		mechBugError = $('#mech-bug-error'),
		mechPullTab = $('#mech-pull-tab'),
		mechBugClose = $('.mech-bug-close', mechBugTracker),
		mechBugMoreLess = $('.mech-bug-more', mechBugTracker),
		mechBugForm = $("#mech-bug-form"),
		mechBugSubmit = $('#mech-bug-submit'),
		mechBugBugInfo = $('#mech-bug-info'),
		mechBugWraps = $('.mech-bug-wrap', mechBugTracker),
		mechBugErrorInfo = $('#mech-bug-error-info'),
		mechBugID = $('#mech-bug-id'),
		mechBugUserName = $('#mech-bug-user-name'),
		mechBugDescription = $('#mech-bug-description'),
		mechBugURL = $('#mech-bug-url'),
		mechBugBrowser = $('#mech-bug-browser'),
		mechBugBrowserVersion = $('#mech-bug-browser-version'),
		mechBugWidth = $('#mech-bug-width'),
		mechBugHeight = $('#mech-bug-height'),
		mechBugCreated = $('#mech-bug-created'),
		mechBugUA = $('#mech-bug-ua'),
		mechBugOS = $('#mech-bug-os'),
		transitions = (Modernizr.csstransforms && Modernizr.csstransitions),
		views = [mechBugReport, mechBugResponse, mechBugError, mechPullTab];

	var funcArray = [];
	$.each(views, function (index, element) {
		funcArray.push(function(callback) {
			getDimensions(element, callback);
		});
	});
	doThese(funcArray, function() {

		mechBugTracker.append(mechPullTab);
		expand(mechPullTab);

		mechPullTab.click(function(e) {
			transitionTo(mechBugReport);
		});

		mechBugClose.click(function(e) {
			minimize(function() {
				expand(mechPullTab);
				mechBugMoreLess.unbind()
				mechBugWraps.removeClass('expanded');
				mechBugErrorInfo.empty();
			})
		});

		mechBugSubmit.click(function(e) {
			e.preventDefault();
			rpc.parentInfo(function(parentInfo) {
				var makeArray = {
					'bug[name]': $('#form-name').val(),
					'bug[description]': $('#form-description').val(),
					'bug[project_id]': parentInfo.projectID,
					'bug[url]': parentInfo.url,
					'bug[os]': navigator.platform,
					'bug[ua]': navigator.userAgent,
					'bug[browser]': bowser.name,
					'bug[browser_version]': bowser.version,
					'bug[width]': parentInfo.width,
					'bug[height]': parentInfo.height
				};
				mechBugSubmit.addClass('loading');
				$.post('/bugs', makeArray)
					.done(function(data) {
						console.log(data);

						mechBugBugInfo.detach();
						mechBugResponse.height('auto');

						if (data.id) {
							mechBugID.html(data.id);
							mechBugUserName.html(data.name);
							mechBugDescription.html(data.description);
							mechBugURL.html(data.url);
							mechBugBrowser.html(data.browser);
							mechBugBrowserVersion.html(data.browser_version);
							mechBugWidth.html(data.width);
							mechBugHeight.html(data.height);
							mechBugCreated.html(data.created_at);
							mechBugUA.html(data.ua);
							mechBugOS.html(data.os);

							$('.mech-bug-padding', mechBugResponse).append(mechBugBugInfo);

							mechBugForm.trigger('reset');

							transitionTo(mechBugResponse);
						} else {
							mechBugErrorInfo.detach();
							$.each(data, function(index, error) {
								mechBugErrorInfo.append('<div>' + error + '</div>');
							});

							$('.mech-bug-padding', mechBugError).append(mechBugErrorInfo);

							transitionTo(mechBugError);
						}

						mechBugSubmit.removeClass('loading');

						mechBugMoreLess.click(function(e) {
							var parent = $(this).closest(mechBugWraps);

							minimize(function() {
								parent.toggleClass('expanded');

								parent.y = $('.mech-bug-padding', parent).outerHeight();
								parent.height(parent.y);

								expand(parent);
							});
						});
					});
			});
		});
	});

	function getDimensions (element, callback) {
		rpc.resizeiFrame(1000, 1000, false, function() {
			mechBugTracker.append(element);

			$(element).css({
				width: 'auto',
				height: 'auto'
			});

			var w = element.outerWidth(),
				h = element.outerHeight();

			element.x = w;
			element.y = h;

			element.detach().height(h);
			callback();
		});
	}
	function expand (element) {
		getDimensions(element, function() {
			rpc.resizeiFrame(element.x, element.y, true, function(response) {
				element.width(response.x);
				element.height(response.y);
				mechBugTracker.append(element);
				if(transitions) {
					// timeout to allow iFrame size to adjust before transition starts
					setTimeout(function() { mechBugTracker.addClass('active') }, 10);
				} else {
					$(element).animate({ 'left': '0' });
				}
			});			
		});
	}
	function transitionTo (element) {
		minimize(function() {
			mechBugTracker.append(element);
			expand(element);
		});
	}
	function minimize (afterMinimize) {
		var fA = function () {
			$.each(views, function (index, element) {
				element.detach();
			});
			afterMinimize();
		}
		if(transitions) {
			mechBugTracker
				.removeClass('active')
				.bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
					fA();
					$(this).unbind();
			});
		} else {
			var eF = [];
			$.each(views, function (index, element) {
				eF.push(function(callback) { element.animate({'left': -element.x}, 400, callback) });
			});
			doThese(eF, fA);
		}
	}
	function doThese (funcs, callback) {
		// this function takes an array of asynchronous functions and executes the callback when they are complete
		var counter = 0;
		$.each(funcs, function (index, func) {
			func(check);
		});
		function check() {
			counter++
			if (counter === $(funcs).size()) {
				callback();
			}
		}
	}

});

