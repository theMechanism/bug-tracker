jQuery(document).ready(function($) {

	var rpc = new easyXDM.Rpc({},
    {
        remote: {
            resizeiFrame:{},
            parentInfo: {}
        }
    });

	var mechBugTracker = $('#mech-bug-tracker'),
		mechPullTab = $('#mech-pull-tab'),
		mechBugClose = $('#mech-bug-close'),
		mechBugForm = $("#mech-bug-form"),
		mechBugSubmit = $('#mech-bug-submit'),
		trackerHeight = mechBugTracker.outerHeight(),
		pullTabWidth = mechPullTab.outerWidth(),
		pullTabHeight = mechPullTab.outerHeight(),
		trackerWidth;


	rpc.resizeiFrame('100%', 0, function(response) {
		trackerWidth = mechBugTracker.outerWidth();
		rpc.resizeiFrame(pullTabWidth + 'px', pullTabHeight + 'px');
	});

	if (!Modernizr.csstransforms || !Modernizr.csstransitions) {
		var bugTrackerLeft = $('#mech-bug-tracker').css('left');
	}

	mechPullTab.click(function(e) {
		expand();
	});
	mechBugClose.click(function(e) {
		minimize();
	});
	mechBugSubmit.click(function(e) {
		e.preventDefault();
		var inputArray = [];
		rpc.parentInfo(function(parentInfo) {
			var makeArray = {
				'bug[project_id]': parentInfo.projectID,
				'bug[url]': parentInfo.url,
				'bug[os]': navigator.platform,
				'bug[ua]': navigator.userAgent,
				'bug[browser]': bowser.name,
				'bug[browser_version]': bowser.version,
				'bug[width]': parentInfo.width,
				'bug[height]': parentInfo.height
			};
			$.each(makeArray, function(key, value) {
				inputArray.push(makeInput(key, value));
			});
			window.open('', 'mechBugWindow', 'scrollbars=no,menubar=no,height=200,width=600,resizable=yes,toolbar=no,status=no');
			minimize();
	        mechBugForm.prop('target', 'mechBugWindow')
				.append(inputArray)
				.submit()
				.trigger('reset')
				.find('input').remove('.mech-hidden-input');
		});
	});

	function expand () {
		rpc.resizeiFrame(trackerWidth + 'px', trackerHeight + 'px', function() {		
			if(!bugTrackerLeft) {
				// timeout to allow iFrame size to adjust before transition starts
				setTimeout(function() { $('#mech-bug-tracker').addClass('active') }, 10);
			} else {
				$('#mech-bug-tracker').animate({'left': '0'});
			}
		});
	}
	function minimize () {
		var fA = function () {
			rpc.resizeiFrame(pullTabWidth + 'px', pullTabHeight + 'px');				
		}
		if(!bugTrackerLeft) {
			$('#mech-bug-tracker').removeClass('active').bind('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				fA();
				$(this).unbind();
			});
		} else {
			$('#mech-bug-tracker').animate({'left': bugTrackerLeft}, 400, fA);
		}
	}

	function makeInput (key, value) {
		var input = document.createElement("input");
		input.className = "mech-hidden-input";
		input.name = key;
		input.type = 'hidden';
		input.value = value;
	    return input;
	}

});

