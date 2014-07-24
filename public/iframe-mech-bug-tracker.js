(function() {

	jQuery(document).ready(function($) {
		var mechBugTracker = $('#mech-bug-tracker'),
			pullTab = $('#mech-pull-tab'),
			$frameElement = $(frameElement),
			trackerHeight = mechBugTracker.outerHeight(),
			pullTabWidth = pullTab.outerWidth(),
			pullTabHeight = pullTab.outerHeight(),
			projectID = $frameElement.data('projectid'),
			trackerWidth = function() {
				$frameElement.css('width', '100%');
				return $('#mech-bug-tracker').width();
			}();
		if (!Modernizr.csstransforms || !Modernizr.csstransitions) {
			var bugTrackerLeft = $('#mech-bug-tracker').css('left');
		}

		if (!projectID) {
			console.log('Please Provide a ProjectID (bugTracker.js?projectID={##})');
			return;
		}
		$frameElement.prop({
			'frameborder': '0',
			'scrolling': 'no',
			'marginwidth': '0',
			'marginheight': '0',
			'allowTransparency': 'true'
		}).css({
			'position': 'absolute',
			'bottom': 0,
			'left': 0,
			'max-width': '100%',
			'width': pullTabWidth,
			'height': pullTabHeight
		});
		$('#mech-pull-tab').click(function(e) {
			$frameElement.css({
				'width': trackerWidth,
				'height': trackerHeight
			});
			if(!bugTrackerLeft) {
				// timeout to allow iFrame size to adjust before transition starts
				setTimeout(function() { $('#mech-bug-tracker').addClass('active') }, 10);
			} else {
				$('#mech-bug-tracker').animate({'left': '0'});
			}
		});
		$('#mech-bug-close').click(function(e) {
			var fA = function () {
				$frameElement.css({
					'width': pullTabWidth,
					'height': pullTabHeight
				});				
			}
			if(!bugTrackerLeft) {
				$('#mech-bug-tracker').removeClass('active').bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
					fA();
					$(this).unbind();
				});
			} else {
				$('#mech-bug-tracker').animate({'left': bugTrackerLeft}, 400, fA);
			}
		});
		$('#bug_submit').click(function(e) {
			e.preventDefault();
			var bugFrom = $("#bugTrackForm");
			var inputArray = [];
			var makeArray = {
				'bug[project_id]': projectID,
				'bug[url]': window.parent.document.URL,
				'bug[os]': navigator.platform,
				'bug[ua]': navigator.userAgent,
				'bug[browser]': bowser.name,
				'bug[browser_version]': bowser.version,
				'bug[width]': $(window.parent.document).width(),
				'bug[height]': $(window.parent.document).height()
			};
			$.each(makeArray, function(key, value) {
				inputArray.push(makeInput(key, value));
			});

	        bugFrom.append(inputArray).submit();
			if(!bugTrackerLeft) {
				$('#mech-bug-tracker').removeClass('active');
			} else {
				$('#mech-bug-tracker').animate({'left': bugTrackerLeft});
			}
			bugFrom.trigger('reset');
		});
	});


	function makeInput (key, value) {
		var input = document.createElement("input");
		input.name = key;
		input.type = 'hidden';
		input.value = value;
	    return input;
	}
})();

