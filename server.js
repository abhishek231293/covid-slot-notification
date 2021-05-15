const request = require('request');
require('dotenv').config();
const sendSms = require('./_helper');

let attempt = 1;
const pincodes = [ '110092', '110093', '110094', '110095', '110096' ];
const dateToVerify = '16-05-2021';
const age = 18;
const feeType = 'Free';
const vaccineType = "COVISHIELD";

function getCovidShieldAvailability(pincode) {
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
                        isCOVIDSHIELDAvailable(result, pincode);
                    }
                });
            }, (10000));
    
        } else {
            setInterval(function() {
                getCovidShieldAvailability(pincode).then(result => {
                    if(result.success) {
                        isCOVIDSHIELDAvailable(result, pincode);
                    }
                });
            }, (10000));
        }
    
    });
})

function isCOVIDSHIELDAvailable(result, pincode) {
    result.responseData.centers.forEach((center)=>{
        center.sessions.forEach((session)=>{
            if(session.vaccine === vaccineType && center.fee_type === feeType) {
                if(+session.available_capacity_dose1 && +session.min_age_limit === age) {
                    sendSMSCall(pincode);
                    console.log(session.vaccine, +session.available_capacity_dose1, +session.min_age_limit)
                    const message = pincode + ' - COVISHIELD is now Available @ ' + center.name + '. Address: '+ center.address + ' Remaining vaccine: ' + session.available_capacity + ' on ' + session.date + ' for age group '+ session.min_age_limit;
                    console.log('###############################################################');
                    console.log(message);
                    console.log('###############################################################');
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
