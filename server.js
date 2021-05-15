const request = require('request');
require('dotenv').config()
const sendSms = require('./_helper');

let attempt = 1;

//-------------------Functions To fetch list-------------------------------
//110093
function getCovidShieldAvailability4() {
    // console.log('Start Fetching Auth');
    return new Promise((resolve) => {
        try {
            console.log("COVID Vaccine Availability Check Attempt: " + attempt + " for pincode 110093 (18+ only)")
            console.log('-----------------------------------------------------------------------------------------')

            attempt = attempt + 1;
            request.get({
                url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=110093&date=16-05-2021'
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

//110092
function getCovidShieldAvailability() {
    // console.log('Start Fetching Auth');
    return new Promise((resolve) => {
        try {
            console.log('-----------------------------------------------------------------------------------------')
            console.log("COVID Vaccine Availability Check Attempt: " + attempt + " for pincode 110092 (18+ only)")
            console.log('-----------------------------------------------------------------------------------------')

            attempt = attempt + 1;
            request.get({
                url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=110092&date=16-05-2021'
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

//110094
function getCovidShieldAvailability3() {
    // console.log('Start Fetching Auth');
    return new Promise((resolve) => {
        try {
            console.log("COVID Vaccine Availability Check Attempt: " + attempt + " for pincode 110096 (18+ only)")
            console.log('-----------------------------------------------------------------------------------------')

            attempt = attempt + 1;
            request.get({
                url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=110096&date=16-05-2021'
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

//110095
function getCovidShieldAvailability1() {
    // console.log('Start Fetching Auth');
    return new Promise((resolve) => {
        try {
            console.log("COVID Vaccine Availability Check Attempt: " + attempt + " for pincode 110095 (18+ only)")
            console.log('-----------------------------------------------------------------------------------------')

            attempt = attempt + 1;
            request.get({
                url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=110095&date=16-05-2021'
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

//------------------------------Function call with interval-----------------------------------

//110092
getCovidShieldAvailability().then(result => {
    if(result.success) {
        isCOVIDSHIELDAvailable(result, '110092');

        setInterval(function(){
            getCovidShieldAvailability().then(result => {
                if(result.success) {
                    // console.log("COVID RESPONSE")
                    // console.log(result)
                    isCOVIDSHIELDAvailable(result, '110092');
                } else {
                    // console.log("COVID Error")
                    // console.log(result.error)
                }
            });
        }, (10000));

    } else {
        setInterval(function() {
            getCovidShieldAvailability().then(result => {
                if(result.success) {
                    isCOVIDSHIELDAvailable(result, '110092');
                } else {
                    // console.log("COVID Error")
                    // console.log(result.error)
                }
            });
        }, (10000));
    }

});

//110093
getCovidShieldAvailability4().then(result => {
    if(result.success) {
        isCOVIDSHIELDAvailable(result, '110093');

        setInterval(function(){
            getCovidShieldAvailability4().then(result => {
                if(result.success) {
                    // console.log("COVID RESPONSE")
                    // console.log(result)
                    isCOVIDSHIELDAvailable(result, '110093');
                } else {
                    // console.log("COVID Error")
                    // console.log(result.error)
                }
            });
        }, (13000));

    } else {
        setInterval(function() {
            getCovidShieldAvailability4().then(result => {
                if(result.success) {
                    isCOVIDSHIELDAvailable(result, '110093');
                } else {
                    // console.log("COVID Error")
                    // console.log(result.error)
                }
            });
        }, (13000));
    }

});

//110094
getCovidShieldAvailability3().then(result => {
    if(result.success) {
        isCOVIDSHIELDAvailable(result, '110096');

        setInterval(function() {
            getCovidShieldAvailability3().then(result => {
                if(result.success) {
                    isCOVIDSHIELDAvailable(result, '110096');
                } else {
                    // console.log("COVID Error")
                    // console.log(result.error)
                }
            });
        }, (11000));

    } else {
        setInterval(function() {
            getCovidShieldAvailability3().then(result => {
                if(result.success) {
                    isCOVIDSHIELDAvailable(result, '110096');
                } else {
                    // console.log("COVID Error")
                    // console.log(result.error)
                }
            });
        }, (11000));
    }
});

//110095
getCovidShieldAvailability1().then(result => {
    if(result.success) {
        isCOVIDSHIELDAvailable(result, '110095');

        setInterval(function(){
            getCovidShieldAvailability1().then(result => {
                if(result.success) {
                    // console.log("COVID RESPONSE")
                    // console.log(result)
                    isCOVIDSHIELDAvailable(result, '110095');
                } else {
                    // console.log("COVID Error")
                    // console.log(result.error)
                }
            });
        }, (12000));

    } else {
        setInterval(function() {
            getCovidShieldAvailability1().then(result => {
                if(result.success) {
                    isCOVIDSHIELDAvailable(result, '110095');
                } else {
                    // console.log("COVID Error")
                    // console.log(result.error)
                }
            });
        }, (12000));
    }

});

//----------------------------Logic to check for the Availability with filter ----------------

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

//--------------------------- Get a Call on availablity with pincode -------------------------
function sendSMSCall(message) {
    const sendSmsData = {
        mobileNumber: process.env.NOTIFICATION_TO,
        otp: message
    }
    console.log(sendSmsData);
    sendSms(sendSmsData);
}
