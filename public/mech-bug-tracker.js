(function() {

	var depends = {
		'jQuery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js',
		'bowser': 'js/bowser.min.js'
	};

	var scriptCount = 0;
	var scriptLoads = 0;

	for (var key in depends) {
		if (depends.hasOwnProperty(key)) {
			scriptCount++;
			loadScript(key, depends[key]);
		}
	}

	function loadScript (dependency, src) {
		if (window[dependency] === undefined) {
			var scriptTag = document.createElement('script');
			scriptTag.setAttribute('type', 'text/javascript');
			scriptTag.setAttribute('src', src);
			if (scriptTag.readyState) {
				scriptTag.onreadystatechange = function () { // For old versions of IE
					if (this.readyState == 'complete' || this.readyState == 'loaded') {
						scriptLoads++;
						scriptLoadHandler();
					}
				};
			} else { // Other browsers
				scriptTag.onload = function() {
					scriptLoads++;
					scriptLoadHandler();
				};
			}
		} else {
			return;
		}
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);

		function scriptLoadHandler () {
			if (scriptLoads === scriptCount) {
				main();
			}
		}
	}

	function main() {
		jQuery(document).ready(function($) {
			var script_tag = getScriptTag('mech-bug-tracker.js');
			// var jsonURL = 'bug-form.json';
			// $.getJSON(jsonURL, {
			// 	crossDomain: true
			// }).done(function(data) {
			// 	$(script_tag).after(data.html);
				$('#mech-pull-tab').click(function(e) {
					$('#mech-bug-tracker').addClass('active');
				});
				$('#mech-bug-close').click(function(e) {
					$('#mech-bug-tracker').removeClass('active');
				});
				$('#bugTrackForm button').click(function(e) {
					e.preventDefault();
					var projectID = getParams(script_tag).projectID;
					if (!projectID) {
						console.log('Please Provide a ProjectID (bugTracker.js?projectID={##})');
						return;
					}
					var bugFrom = $("#bugTrackForm");
					var inputArray = [];
					var makeArray = {
						'projectID': projectID,
						'url': document.URL,
						'os': navigator.platform,
						'ua': navigator.userAgent,
						'browser': bowser.name,
						'browserVersion': bowser.version,
						'browserWidth': $(window).width(),
						'browserHeight': $(window).height()
					};
					$.each(makeArray, function(key, value) {
						inputArray.push(makeInput(key, value));
					});
					window.open('', 'formpopup', 'width=400,height=400,scrollbars=no,menubar=no,resizable=yes,toolbar=no,status=no');
			        bugFrom.get(0).target = 'formpopup';
				    bugFrom.append(inputArray).submit();		    
				});
			// });
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

