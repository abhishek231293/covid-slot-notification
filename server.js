const request = require('request');
require('dotenv').config()
const sendSms = require('./_helper');

let attempt = 1;
const pincodes = [ '110092', '110093', '110094', '110095' ]
const dateToVerify = '16-05-2021'

function getCovidShieldAvailability(pincode) {
    // console.log('Start Fetching Auth');
    return new Promise((resolve) => {
        try {
            console.log('-----------------------------------------------------------------------------------------')
            console.log("COVID Vaccine Availability Check Attempt: " + attempt + " for pincode "+ pincode +" (18+ only)")
            console.log('-----------------------------------------------------------------------------------------')

            attempt = attempt + 1;
            request.get({
                url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode='+pincode+'&date=' + dateToVerify
            }, function (err, httpResponse, body) {

                if(body){
                    try {
                        const responseData = JSON.parse(body);
                        resolve({success: true, msg: "", responseData });
                    } catch (e) {
                        resolve({success: false, msg: "", error: e});
                    }
                }
            });
        } catch (e) {
            resolve({success: false, msg: "", error: e});
        }

    });

}

pincodes.forEach((pincode)=> {
    getCovidShieldAvailability(pincode).then(result => {
        if(result.success) {
            isCOVIDSHIELDAvailable(result, pincode);
    
            setInterval(function(){
                getCovidShieldAvailability(pincode).then(result => {
                    if(result.success) {
                        // console.log("COVID RESPONSE")
                        // console.log(result)
                        isCOVIDSHIELDAvailable(result, pincode);
                    } else {
                        // console.log("COVID Error")
                        // console.log(result.error)
                    }
                });
            }, (10000));
    
        } else {
            setInterval(function() {
                getCovidShieldAvailability(pincode).then(result => {
                    if(result.success) {
                        isCOVIDSHIELDAvailable(result, pincode);
                    } else {
                        // console.log("COVID Error")
                        // console.log(result.error)
                    }
                });
            }, (10000));
        }
    
    });
})

function isCOVIDSHIELDAvailable(result, pincode) {
    // console.log('Send SMS')
    result.responseData.centers.forEach((center)=>{
        center.sessions.forEach((session)=>{
            if(session.vaccine === 'COVISHIELD' && center.fee_type === 'Free') {
                if(+session.available_capacity && +session.min_age_limit === 18) {
                    sendSMSCall(pincode);
                    console.log(session.vaccine, +session.available_capacity, +session.min_age_limit)
                    const message = pincode + ' - COVISHIELD is now Available @ ' + center.name + '. Address: '+ center.address + ' Remaining vaccine: ' + session.available_capacity + ' on ' + session.date + ' for age group '+ session.min_age_limit;
                    console.log('###############################################################');
                    console.log(message);
                    console.log('###############################################################');

                } else {
                    // console.log('COVISHIELD Not Available @ pincode ' + pincode + ' For 18+.')
                }
            }

        })

    })
}

function sendSMSCall(pincode) {
    const sendSmsData = {
        mobileNumber: process.env.NOTIFICATION_TO,
        otp: pincode
    }
    console.log(sendSmsData);
    sendSms(sendSmsData);
}
