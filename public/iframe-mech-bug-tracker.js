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
		mechPullTab = $('#mech-pull-tab'),
		mechBugClose = $('.mech-bug-close', mechBugTracker),
		mechBugMore = $('#mech-bug-more'),
		mechBugForm = $("#mech-bug-form"),
		mechBugSubmit = $('#mech-bug-submit'),
		mechBugInfo = $('#mech-bug-info'),
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
		transitions = (Modernizr.csstransforms && Modernizr.csstransitions);

	initElems(function() {
		mechPullTab.click(function(e) {
			expand(mechBugReport);
		});
		mechBugClose.click(function(e) {
			minimize();
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

						mechBugSubmit.removeClass('loading');
						mechBugForm.trigger('reset');
						transitionTo(mechBugResponse);

						mechBugMore.click(function(e) {
							mechBugInfo.css('display', 'block');

							mechBugResponse.y = $('.mech-bug-padding', mechBugResponse).outerHeight();
							mechBugResponse.height(mechBugResponse.y);

							rpc.resizeiFrame(mechBugResponse.x + 'px', mechBugResponse.y + 'px', true);
						});
					});
			});
		});
	});

	function initElems(callback) {
		rpc.resizeiFrame('100%', '100%', false, function(response) {
			mechBugReport.detach();
			mechBugResponse.detach();

			getDimensions(mechPullTab);
			getDimensions(mechBugReport);
			getDimensions(mechBugResponse);

			mechBugTracker.append(mechPullTab);
			rpc.resizeiFrame(mechPullTab.x + 'px', mechPullTab.y + 'px', false);

			if (!transitions) {
				mechBugReport.css({'left': -mechBugReport.x});
			}
			callback();
		});

		function getDimensions (element) {
			mechBugTracker.append(element);

			var w = element.outerWidth(),
				h = element.outerHeight();

			element.x = w;
			element.y = h;

			element.detach().height(h);
		}
	}
	function expand (element) {
		mechBugTracker.append(element);
		rpc.resizeiFrame(element.x + 'px', element.y + 'px', true, function() {
			if(transitions) {
				// timeout to allow iFrame size to adjust before transition starts
				setTimeout(function() { mechBugTracker.addClass('active') }, 10);
			} else {
				mechPullTab.animate({ 'left': -mechPullTab.x });
				$(element).animate({ 'left': '0' });
			}
		});
	}
	function transitionTo (element) {
		minimize(function() {
			expand(element);
		})
	}
	function minimize (afterMinimize) {
		if (afterMinimize) 
			var cn = 'transition';
		var fA = function () {
			mechBugReport.detach();
			mechBugResponse.detach();
			mechBugInfo.hide();
			if (afterMinimize) {
				mechBugTracker.removeClass(cn);
				afterMinimize();
			} else {
				rpc.resizeiFrame(mechPullTab.x + 'px', mechPullTab.y + 'px', false);
			}
		}
		if(transitions) {
			mechBugTracker
				.removeClass('active')
				.addClass(cn)
				.bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
					fA();
					$(this).unbind();
			});
		} else {
			doThese([
					function(callback) {
						mechBugReport.animate({'left': -mechBugReport.x}, 400, callback);
					},
					function(callback) {
						mechBugResponse.animate({'left': -mechBugResponse.x}, 400, callback);
					},
					function(callback) {
						if (afterMinimize) {
							callback();
						} else {
							mechPullTab.animate({'left': '0'}, 400, callback);
						}
					}
				],
				fA
			);
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
		}
	}

});

