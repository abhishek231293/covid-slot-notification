1. Install Node and NPM - https://nodejs.org/en/download/

2. Take code clone

3. Goto code and run command on command line - npm install

4. create a .env file and add below details
    PORT=3000

    VOICE_API_KEY=<your key>
    VOICE_RECEIVER=<ivr received id>
    VOICE_METHOD=dial.click2call
    
    NOTIFICATION_TO=<Your mobile number to get a call>
    
5. run nodemon server.js

Note:

Change the pincode and date in each function and get a call with picode on your mobile phone once the slot is available.
// Also get the complete message on console.

Change the age accordingly on server.js file inside function isCOVIDSHIELDAvailable.

Any issue you can send email to abhishekgupta00143@gmail.com