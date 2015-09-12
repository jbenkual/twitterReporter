'use strict';
var readline = require("readline");
var exec = require("child_process").exec;
var child;
var dest;
var message;
var subject;
var key = process.env.GM_API_KEY;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if(process.argv.length < 3) {
	console.log(`\nUsage:  name@provider.com subject message`);
	console.log("\nSending Failed!\n");
	return;
}

dest = process.argv[2];
subject = process.argv.slice(3).join(' ');
getMessage();


function getSubject() {
	rl.question("Enter a subject of the email: ", function(answer) {
    subject = answer;
    getMessage();
  });
}

function getMessage() {
	rl.question("Enter the message of the email: ", function(answer) {
    message = answer;
    SendEmail(dest, subject, message)
    .then( ()=> { 
    	console.log("email sent");
    	process.exit();
    })
    .catch(() => {
    	console.error("Email was NOT sent, try again");
    	process.exit();
    });
  });
}

function SendEmail(dest, subject, message) {

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
				//process.exit();
			});
	});
	return promise;


/*
	*/
}


//message = process.argv[4];

/*if(process.argv.length == 3){
	getSubject();
}
else if(process.argv.length == 4) {
	getMessage();
}
else {
	SendEmail(dest, subject, message);
}*/
