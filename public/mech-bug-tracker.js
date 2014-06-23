(function() {

	var scriptName 	= 'mech-bug-tracker.js',			// should match the name of this script
		formPath 	= 'getform',			// url of the bug form HTML content
		cssPath		= 'getformstyle';
	var depends = {
		'jQuery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
		'bowser': 'http://arcane-coast-4951.herokuapp.com/js/bowser.min.js',
		'Modernizr.csstransforms': 'http://arcane-coast-4951.herokuapp.com/js/modernizr.js'
	};

	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	}

	var scriptCount = Object.size(depends);	// count of scripts required
	var scriptLoads = 0;	// count of script loaded

	for (var key in depends) {
		if (depends.hasOwnProperty(key)) {
			loadScript(key, depends[key], function() {
				scriptLoads++;
				if (scriptLoads === scriptCount) {
					main();
				}
			});
		}
	}
	function loadScript (dependency, src, callback) {
		if (window[dependency] === undefined) {	// if dependency is not present
			var scriptTag = document.createElement('script');
			scriptTag.setAttribute('type', 'text/javascript');
			scriptTag.setAttribute('src', src);
			if (scriptTag.readyState) {
				scriptTag.onreadystatechange = function () { // For old versions of IE
					if (this.readyState == 'complete' || this.readyState == 'loaded') {
						callback();
					}
				};
			} else { // Other browsers
				scriptTag.onload = callback;
			}
			(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);
		} else {
			callback();
		}
	}
	function main() {
		jQuery(document).ready(function($) {
			var script_tag = getScriptTag(scriptName),
				bugTrackURL = script_tag.src.substr(0, script_tag.src.indexOf(scriptName)),
				formURL = bugTrackURL + formPath + "\?callback=\?",
				cssURL = bugTrackURL + cssPath + "\?callback=\?"
				projectID = getParams(script_tag).projectID;
				if (!projectID) {
					console.log('Please Provide a ProjectID (bugTracker.js?projectID={##})');
					return;
				}

			$.when(
				$.getJSON(cssURL),
				$.getJSON(formURL)
			).done(function(css, form) {
				
				$('head').append("<style>" + css[0].css + "</style>");
				$(script_tag).after(form[0].html);
				if (!Modernizr.csstransforms) {
					var bugTrackerLeft = $('#mech-bug-tracker').css('left');
				}
				$('#mech-pull-tab').click(function(e) {
					if(!bugTrackerLeft) {
						$('#mech-bug-tracker').addClass('active');
					} else {
						$('#mech-bug-tracker').animate({'left': '0'});
					}
				});
				$('#mech-bug-close').click(function(e) {
					if(!bugTrackerLeft) {
						$('#mech-bug-tracker').removeClass('active');
					} else {
						$('#mech-bug-tracker').animate({'left': bugTrackerLeft});
					}
				});
				$('#bugTrackForm button').click(function(e) {
					e.preventDefault();
					var bugFrom = $("#bugTrackForm");
					var inputArray = [];
					var makeArray = {
						'bug[project_id]': projectID,
						'bug[url]': document.URL,
						'bug[os]': navigator.platform,
						'bug[ua]': navigator.userAgent,
						'bug[browser]': bowser.name,
						'bug[browser_version]': bowser.version,
						'bug[width]': $(window).width(),
						'bug[height]': $(window).height()
					};
					$.each(makeArray, function(key, value) {
						inputArray.push(makeInput(key, value));
					});
					window.open('', 'formpopup', 'width=400,height=400,scrollbars=no,menubar=no,resizable=yes,toolbar=no,status=no');
			        bugFrom.prop("target", "formpopup").prop("action", bugTrackURL + "bugs").append(inputArray).submit();
					if(!bugTrackerLeft) {
						$('#mech-bug-tracker').removeClass('active');
					} else {
						$('#mech-bug-tracker').animate({'left': bugTrackerLeft});
					}
					bugFrom.trigger('reset');
				});
			});
		});


		function makeInput (key, value) {
			var input = document.createElement("input");
			input.name = key;
			input.type = 'hidden';
			input.value = value;
		    return input;
		}
		// Extract "GET" parameters from a JS include querystring
		function getScriptTag(script_name) {
			// Find all script tags
			var scripts = document.getElementsByTagName("script");
			// Look through them trying to find ourselves
			for(var i=0; i<scripts.length; i++) {
				if(scripts[i].src.indexOf("/" + script_name) > -1) {
					return scripts[i]
				}
			}
			// No scripts match
			return {};
		}
		function getParams(script_tag) {
			// Get an array of key=value strings of params
			var pa = script_tag.src.split("?").pop().split("&");

			// Split each key=value into array, the construct js object
			var p = {};
			for(var j=0; j<pa.length; j++) {
				var kv = pa[j].split("=");
				p[kv[0]] = kv[1];
			}
			return p;
		}
	}
})();

