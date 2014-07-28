jQuery(document).ready(function($) {

	var rpc = new easyXDM.Rpc({},
    {
        remote: {
            resizeiFrame:{},
            parentInfo: {}
        }
    });

	var mechBugTracker = $('#mech-bug-tracker'),
		pullTab = $('#mech-pull-tab'),
		trackerHeight = mechBugTracker.outerHeight(),
		pullTabWidth = pullTab.outerWidth(),
		pullTabHeight = pullTab.outerHeight(),
		trackerWidth;


	rpc.resizeiFrame('100%', 0, function(response) {
		trackerWidth = mechBugTracker.outerWidth();
		rpc.resizeiFrame(pullTabWidth + 'px', pullTabHeight + 'px');
	});

	if (!Modernizr.csstransforms || !Modernizr.csstransitions) {
		var bugTrackerLeft = $('#mech-bug-tracker').css('left');
	}

	$('#mech-pull-tab').click(function(e) {
		expand();
	});
	$('#mech-bug-close').click(function(e) {
		minimize();
	});
	$('#mech-bug-submit').click(function(e) {
		e.preventDefault();
		var mechBugForm = $("#mech-bug-form");
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
			window.open('', 'mech-bug-window', 'scrollbars=no,menubar=no,height=200,width=600,resizable=yes,toolbar=no,status=no')
	        mechBugForm.prop('target', 'mech-bug-window').append(inputArray).submit();
			minimize();
			mechBugForm.trigger('reset');
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
		input.name = key;
		input.type = 'hidden';
		input.value = value;
	    return input;
	}

});

