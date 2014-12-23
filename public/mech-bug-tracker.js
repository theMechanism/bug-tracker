/* global console, easyXDM */

(function() {

	'use strict';

	var scriptName 	= 'mech-bug-tracker.js',			// should match the name of this script
		script_tag = getScriptTag(scriptName),
		serverURL = script_tag.src.substr(0, script_tag.src.indexOf(scriptName)),
		iframeFile 	= 'iframe-mech-bug-tracker.html',
		depends 	= {
			'easyXDM': serverURL + 'js/easyXDM.min.js'
		};

	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	var scriptCount = Object.size(depends);	// count of scripts required
	var scriptLoads = 0;	// count of script loaded

	for (var key in depends) {
		if (depends.hasOwnProperty(key)) {
			loadScript(key, depends[key], checkFinish);
		}
	}

	function checkFinish () {
		scriptLoads++;
		if (scriptLoads === scriptCount) {
			main();
		}
	}

	function loadScript (dependency, src, callback) {
		// this function checks if the dependency is present.
		// it waits for load before executing the callback.
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
			(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(scriptTag);
		} else {
			callback();
		}
	}

	function main() {

		var projectID = getParams(script_tag).projectID,
			iframeContainer = document.createElement('div');

		iframeContainer.style.position = 'fixed';
		iframeContainer.style.zIndex = 999;
		iframeContainer.style.bottom = 0;
		iframeContainer.style.left = 0;
		iframeContainer.style.top = 'auto';
		iframeContainer.style.right = 'auto';
		iframeContainer.style['max-height'] = '100%';
		iframeContainer.style['max-width'] = '100%';

		document.getElementsByTagName('body')[0].appendChild(iframeContainer);


		try {
			if (!projectID) {
				throw('Please Provide a ProjectID (bugTracker.js?projectID={##})');
			}
		} catch(e) {
			console.log(e);
		}

		var rpc = new easyXDM.Rpc({
			remote: serverURL + iframeFile,
			container: iframeContainer,
			props: {
				id: 'mech-bug-iframe',
				frameborder: '0',
				scrolling: 'no',
				marginwidth: '0',
				marginheight: '0',
				allowTransparency: 'true',
				style: {
					height: '100%',
					width: '100%',
					display: 'block'
				}
			}
		},
		{
			local: {
	            resizeiFrame: function (widthReq, heightReq, allowScroll) {
					var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
						windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

					var width = (widthReq < windowWidth) ? widthReq : windowWidth;
					var height = (heightReq < windowHeight) ? heightReq : windowHeight;

					iframeContainer.style.width = width + 'px';
					iframeContainer.style.height = height + 'px';

					var sc = (allowScroll) ? 'yes' : 'no';
					document.getElementById('mech-bug-iframe').scrolling = sc;

	                return {
						x: width,
						y: height
	                };
	            },
	            parentInfo: function () {
	            	return {
	            		width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
	            		height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
	            		projectID: projectID,
	            		url: window.location.href
	            	};
	            }
	        }
		});
	}

	// Extract "GET" parameters from a JS include querystring
	function getScriptTag(script_name) {
		// Find all script tags
		var scripts = document.getElementsByTagName('script');
		// Look through them trying to find ourselves
		for(var i=0; i<scripts.length; i++) {
			if(scripts[i].src.indexOf('/' + script_name) > -1) {
				return scripts[i];
			}
		}
		// No scripts match
		return {};
	}
	function getParams(script_tag) {
		// Get an array of key=value strings of params
		var pa = script_tag.src.split('?').pop().split('&');

		// Split each key=value into array, the construct js object
		var p = {};
		for(var j=0; j<pa.length; j++) {
			var kv = pa[j].split('=');
			p[kv[0]] = kv[1];
		}
		return p;
	}

})();

