1. Install Node and NPM - https://nodejs.org/en/download/

2. Take code clone

3. Goto code and run command on command line - npm install

4. create a .env file and add below details
    PORT=3000

    VOICE_API_KEY="<your key>"
    VOICE_RECEIVER="<ivr received id>"
    VOICE_METHOD=dial.click2call
    
    NOTIFICATION_TO="<Your mobile number to get a call>"
    
5. run nodemon server.js

Note:

Change the pincode and date in server.js file and get a call with picode on your mobile phone once the slot is available.
// Also get the complete message on console.

Change the age accordingly on server.js file inside function isCOVIDSHIELDAvailable.

Any issue you can send email to abhishekgupta00143@gmail.com
![Screenshot (5)](https://user-images.githubusercontent.com/19344514/118360800-59c1be00-b5a6-11eb-9ca6-0f4df4d03dc7.jpg)
