'use strict';
var exec = require("child_process").exec;
var child;
var key = process.env.GM_API_KEY;

exports.sendEmail = function(dest, subject, message) {
	let promise = new Promise((resolve, reject) => {
		
		child = exec(`
			curl -s --user 'api:${key}' \
		    https://api.mailgun.net/v3/sandboxdc7bd586535b41cda8522138eed1ba22.mailgun.org/messages \
		    -F from='Mailgun Sandbox <postmaster@sandboxdc7bd586535b41cda8522138eed1ba22.mailgun.org>' \
		    -F to=${dest}\
		    -F subject='${subject}' \
		    -F text='${message}'
			`, 
			function(error, stdout, stderr) {
				console.log('stdout: ' + stdout);
				console.log('stderr: ' + stderr);
				if (error !== null) {
					console.log("exec error: " + error);
					reject();
				}
				resolve();
			});
	});
	return promise;
};