const request = require('request');
require('dotenv').config();
const makeCall = require('./_helper');

let attempt = 1;
const pincodes = [  '110059', '110058', '110060', '110064', '110015' ];
const dateToVerify = '18-05-2021';
const age = 18;
const feeType = 'Free';
const vaccineType = "COVISHIELD";
const nextRunTIme = 10000;
const slot = "09:00AM-11:00AM";
const beneficiaries = ["44674045451550"];
const dose = 1;

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
            }, (nextRunTIme));
    
        } else {
            setInterval(function() {
                getCovidShieldAvailability(pincode).then(result => {
                    if(result.success) {
                        isCOVIDSHIELDAvailable(result, pincode);
                    }
                });
            }, (nextRunTIme));
        }
    
    });
})

function isCOVIDSHIELDAvailable(result, pincode) {
    result.responseData.centers.forEach((center)=>{
        center.sessions.forEach((session)=>{
            if(session.vaccine === vaccineType && center.fee_type === feeType) {
                if(+session.available_capacity_dose1 && +session.min_age_limit === age) {
                    console.log(session.vaccine, +session.available_capacity_dose1, +session.min_age_limit)
                    
                    callNotifier(pincode);

                    /*
                    * Booking through bot is closed now due to security.
                    *
                    bookNow({center_id: center.center_id, session_id: session.session_id}).then((bookingresponse)=>{
                        console.log('Booking Response: ', bookingresponse)
                    })
                    *
                    */

                    const message = pincode + ' - COVISHIELD is now Available @ ' + center.name + '. Address: '+ center.address + ' Remaining vaccine: ' + session.available_capacity_dose1 + ' on ' + session.date + ' for age group '+ session.min_age_limit;
                    console.log('###############################################################');
                    console.log(message);
                    console.log('###############################################################');
                }
            }

        })

    })
}

//Booking through bot is now closed due to security in API using captcha.
function bookNow(details) {

    return new Promise((resolve) => {
        try {
            resolve({success: false, msg: "", error: 'no'});
            request.post({
                url: 'https://cdn-api.co-vin.in/api/v2/appointment/schedule',
                form: {
                    beneficiaries,
                    captcha: "4XUUy",
                    center_id: details.center_id,
                    dose,
                    session_id: details.session_id,
                    slot: slot
                }
            }, function (err, httpResponse, body) {

                if(body){
                    try {
                        resolve({success: true, msg: "", responseData: body });
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

function callNotifier(pincode) {
    const data = {
        mobileNumber: process.env.NOTIFICATION_TO,
        otp: pincode
    }
    console.log(data);
    makeCall(data);
}
