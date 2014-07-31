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
		mechBugInfo = $('#mech-bug-info'),
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
			mechBugTracker.css({'visibility': 'hidden'}).append(element);
	});
	rpc.resizeiFrame(1000, 1000, false, function() {
		getDimensions(views, function() {
			$.each(views, function (index, element) {
				element.css({'visibility': 'visible'}).detach();
			});

			mechBugTracker.append(mechPullTab);
			rpc.resizeiFrame(mechPullTab.x, mechPullTab.y, false, function() {
				expand(mechPullTab);

				mechPullTab.click(function(e) {
					fromTo(mechPullTab, mechBugReport);
				});

				mechBugClose.click(function(e) {
					var parent = $(this).closest('.mech-bug-wrap');
					fromTo(parent, mechPullTab, function() {
						mechBugMoreLess.unbind()
						mechBugWraps.removeClass('expanded');
						mechBugErrorInfo.empty();
					});
				});

				mechBugSubmit.click(function(e) {
					e.preventDefault();
					if ($(this).hasClass('loading')) return;
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

								if (data.id) {
									mechBugInfo.detach();
									mechBugResponse.height('auto');

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

									$('.mech-bug-padding', mechBugResponse).append(mechBugInfo);

									mechBugForm.trigger('reset');

									fromTo(mechBugReport, mechBugResponse);
								} else {
									mechBugErrorInfo.detach();
									mechBugError.height('auto');
									$.each(data, function(index, error) {
										mechBugErrorInfo.append('<div>' + error + '</div>');
									});

									$('.mech-bug-padding', mechBugError).append(mechBugErrorInfo);

									mechBugForm.trigger('reset');

									fromTo(mechBugReport, mechBugError);
								}

								mechBugSubmit.removeClass('loading');

								mechBugMoreLess.click(function(e) {
									var parent = $(this).closest(mechBugWraps);

									parent.toggleClass('expanded');

									parent.y = $('.mech-bug-padding', parent).outerHeight();

									rpc.resizeiFrame(parent.x, parent.y, true, function(response) {
										parent.x = response.x;
										parent.y = response.y;
										parent.width(response.x);
										parent.height(response.y);
										expand(parent);
									});
								});
							});
					});
				});
			});
		});
	});

	function getDimensions (elements, callback) {
		rpc.parentInfo(function(data) {
			$.each(elements, function(index, element) {
				$(element).css({
					width: element.x || 'auto',
					height: element.y || 'auto'
				});

				var w = element.outerWidth(),
					h = element.outerHeight();

				element.x = (w < data.width) ? w : data.width;
				element.y = (h < data.height) ? h : data.height;

				element.height(element.y);
			});
			callback();
		});
	}
	function expand (element, afterExpand) {
		if(transitions) {
			// timeout to allow iFrame size to adjust before transition starts
			setTimeout(function() {
				element
					.addClass('active')
					.bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
						if (afterExpand) afterExpand();
						$(this).unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
					});
			}, 10);
		} else {
			$(element).animate({ 'left': '0' }, 400, afterExpand);
		}
	}
	function fromTo (from, to, afterMinimize, afterExpand) {
		mechBugTracker.append(to);
		getDimensions([from, to], function() {
			var tWidth = (from.x < to.x) ? to.x : from.x,
				tHeight = (from.y < to.y) ? to.y : from.y;
			rpc.resizeiFrame(tWidth, tHeight, true, function(response) {
				var toDo = [
					function(callback) {
						minimize(from, function() {
							from.detach();
							if (afterMinimize) afterMinimize();
							callback();
						});
					}, function(callback) {
						expand(to, function() {
							if (afterExpand) afterExpand();
							callback();
						});
					}
				];
				doThese(toDo, function() {
					rpc.resizeiFrame(to.x, to.y, true);
				});
			});
		});
	}
	function minimize (element, afterMinimize) {
		var aM = function () {
			if (afterMinimize) afterMinimize();
		}
		if(transitions) {
			element
				.removeClass('active')
				.bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
					aM();
					$(this).unbind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			});
		} else {
			element.animate({'left': -element.x}, 400, aM);
		}
	}
	function doThese (funcs, callback) {
		// this function takes an array of asynchronous functions with callbacks and executes the callback when they are all complete
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

