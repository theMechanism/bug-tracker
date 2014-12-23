/* global jQuery, easyXDM, Modernizr, bowser, console, WebFont */

WebFont.load({
	google: {
		families: ['Open Sans:400,700']
	},
	active: mechBugInit
});


function mechBugInit() {
	'use strict';

	var console = window.console || { log: function() {} };

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
			mechBugForm = $('#mech-bug-form'),
			mechBugFormName = $('#form-name'),
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
			hasTransitions = (Modernizr.csstransforms && Modernizr.csstransitions),
			views = [mechBugReport, mechBugResponse, mechBugError, mechPullTab];


		var cookieMonster = {
			setName: function(name) {
				$.cookie('mechBugTracker', name);
			},
			retrieveName: function() {
				return $.cookie('mechBugTracker');
			}
		};

		mechBugFormName.val(cookieMonster.retrieveName());

		mechPullTab.x = 180;

		$.each(views, function (index, element) {
			mechBugTracker.css({'visibility': 'hidden'}).append(element);
		});

		rpc.resizeiFrame(1000, 1000, false, function() {
			getDimensions(views, function() {
				$.each(views, function (index, element) {
					element.detach().css({'visibility': 'visible'});
				});

				mechBugTracker.append(mechPullTab);
				rpc.resizeiFrame(mechPullTab.x, mechPullTab.y, false, function() {
					expand(mechPullTab);

					mechPullTab.click(function() {
						fromTo(mechPullTab, mechBugReport);
					});

					mechBugClose.click(handleClose);

					mechBugForm.submit(handleSubmit);
					mechBugSubmit.click(handleSubmit);
				});
			});
		});

		function handleClose(e) {
			var parent = $(e.target).closest('.mech-bug-wrap');
			fromTo(parent, mechPullTab, function() {
				mechBugMoreLess.unbind();
				mechBugWraps.removeClass('expanded');
				mechBugErrorInfo.empty();
			});
		}

		function handleSubmit(e) {
			e.preventDefault();
			if (mechBugSubmit.hasClass('loading')) return;
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

							mechBugID.text(data.id);
							mechBugUserName.text(data.name);
							mechBugDescription.text(data.description);
							mechBugURL.text(data.url);
							mechBugBrowser.text(data.browser);
							mechBugBrowserVersion.text(data.browser_version);
							mechBugWidth.text(data.width);
							mechBugHeight.text(data.height);
							mechBugCreated.text(data.created_at);
							mechBugUA.text(data.ua);
							mechBugOS.text(data.os);

							$('.mech-bug-padding', mechBugResponse).append(mechBugInfo);

							mechBugForm.trigger('reset');
							mechBugFormName.val(makeArray['bug[name]']);

							fromTo(mechBugReport, mechBugResponse);
						} else {
							mechBugErrorInfo.detach();
							mechBugError.height('auto');
							$.each(data, function(index, error) {
								mechBugErrorInfo.append('<div>' + error + '</div>');
							});

							$('.mech-bug-padding', mechBugError).append(mechBugErrorInfo);

							mechBugForm.trigger('reset');
							mechBugFormName.val(makeArray['bug[name]']);

							fromTo(mechBugReport, mechBugError);
						}

						mechBugSubmit.removeClass('loading');

						mechBugMoreLess.click(function() {
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
				cookieMonster.setName(makeArray['bug[name]']);
			});
		}

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
			if(hasTransitions) {
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
				rpc.resizeiFrame(tWidth, tHeight, true, function() {
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
			};
			if(hasTransitions) {
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
				counter++;
				if (counter === $(funcs).size()) {
					callback();
				}
			}
		}

	});
}