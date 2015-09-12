'use strict';
var readline = require("readline");
var sendEmail = require("./sendEmail").sendEmail;

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if(process.argv.length < 3) {
	console.log(`\nUsage:  name@provider.com subject message`);
	console.log("\nSending Failed!\n");
	return;
}

let sendTo = process.argv[2];
let emailSubject = process.argv.slice(3).join(' ');
getMessage(sendTo, emailSubject);


function getSubject(dest) {
	rl.question("Enter a subject of the email: ", function(subject) {
    getMessage(dest, subject);
  });
}

function getMessage(dest, subject) {
	rl.question("Enter the message of the email: ", function(message) {
    sendEmail(dest, subject, message)
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
