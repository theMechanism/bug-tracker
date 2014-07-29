jQuery(document).ready(function($) {

	var rpc = new easyXDM.Rpc({},
    {
        remote: {
            resizeiFrame:{},
            parentInfo: {}
        }
    });

	var mechBugTracker = $('#mech-bug-tracker'),
		mechBugReport = $('#mech-bug-report'),
		mechBugResponse = $('#mech-bug-response'),
		mechPullTab = $('#mech-pull-tab'),
		mechBugClose = $('.mech-bug-close', mechBugTracker),
		mechBugForm = $("#mech-bug-form"),
		mechBugSubmit = $('#mech-bug-submit'),
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
				$.post('/bugs', makeArray)
					.done(function(data) {
						console.log(data);
						minimize(mechBugResponse);
					});
		        mechBugForm.trigger('reset');
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
				mechPullTab.animate({'left': -mechPullTab.x});
				$(element).animate({'left': '0'});
			}
		});
	}
	function minimize (element) {
		if (element) 
			var cn = 'transition';
		var fA = function () {
			mechBugReport.detach();
			mechBugResponse.detach();
			if (element) {
				mechBugTracker.removeClass(cn);
				expand(element);
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
						if (element) {
							callback();
						} else {
							mechPullTab.animate({'left': '0'}, 400, callback);
						}
					}
				],
				fA
			);
			function doThese (funcs, callback) {
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

