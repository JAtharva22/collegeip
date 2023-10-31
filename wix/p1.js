import wixData from 'wix-data';
import wixUsers from 'wix-users';
import { authentication, currentMember } from 'wix-members-frontend';
import wixLocation from 'wix-location';

const options = {
    fieldsets: ['FULL']
}

let globalSeen = [];
let seenFields = [];

let combinedFilter;
let locFilter;
$w('#input1').value = '';
$w('#input2').value = '';
$w('#input3').value = '';
//salary
$w('#input7').value = '1000000000000';
$w('#input8').value = '0';
// experience
$w('#input6').value = '0';
$w('#input9').value = '100';
let globalEmail, globalId;
let globalCredits = 0;
const isLoggedIn = authentication.loggedIn();
if (isLoggedIn) {
    $w('#columnStrip1').collapse();
}

wixUsers.onLogin(() => {
    wixLocation.to('https://greatcompani.wixsite.com/taplead');
});

$w.onReady(function () {
    loginCheck();

    $w('#button4').onClick(() => {
        $w('#columnStrip1').collapse();
    })

    // function for populating repeater
    repeaterPop();

    $w('#button1').onClick((e) => {
        $w('#repeater1').show();
        skillsFilter();
        // Combine all education filters with 'and'
        combinedFilter = combinedFilter.and(wixData.filter().contains('education', $w('#input2').value));

        const minSalval = parseFloat($w('#input8').value);
        const maxSalval = parseFloat($w('#input7').value);

        if (!isNaN(minSalval) && !isNaN(maxSalval)) {
            combinedFilter = combinedFilter.and(wixData.filter().le('salValue', maxSalval));
            combinedFilter = combinedFilter.and(wixData.filter().ge('salValue', minSalval));
        } else {
            console.log('not possible')
        }
        combinedFilter = combinedFilter.and(wixData.filter().ge('expValue', parseFloat($w('#input6').value)));
        combinedFilter = combinedFilter.and(wixData.filter().le('expValue', parseFloat($w('#input9').value)));

        // Get the location filter
        const locFilter = getLocationFilter();

        // Combine all filters with 'or'
        const supFilter = locFilter.and(combinedFilter);

        $w('#recruitData').setFilter(supFilter);
    });
    resetButton(); //reset btn
});

function repeaterPop() {

    // repeater populating
    $w('#repeater1').onItemReady(($item, itemData, index) => {
        $item('#nameText').text = itemData.name;
        $item('#expText').text = itemData.expValue.toString() + ' years';
        $item('#salText').text = 'Rs ' + itemData.salValue.toString() + 'L / year';
        $item('#skillsText').text = itemData.keySkills;
        $item('#EduText').text = itemData.education;
        $item('#locationText').text = itemData.currentLocation;

        setTimeout(() => {
            if (globalSeen && globalSeen.includes(itemData.serial_number)) {
                wixData.query("hiddenData")
                    .eq('serial_number', itemData.serial_number)
                    .find()
                    .then((result) => {
                        $item('#xxxNumber').text = result.items[0].mobileNo;
                        $item('#xxxEmail').text = result.items[0].eMail_primary;
                    });
                $item('#button3').hide();
                $item('#warnBox').hide()
                $item('#button5').hide();
                $item('#box3').hide();
            }
        }, 1000);
        $item('#button3').onClick(() => {
            if (isLoggedIn && globalCredits) {
                globalCredits--;
                $w('#creditsText').text = globalCredits.toString();

                if (globalSeen && !globalSeen.includes(itemData.serial_number)) {
                    seenFields.push(itemData.serial_number);
                }
                const toUpdate = {
                    "_id": globalId,
                    'email': globalEmail,
                    'credits': globalCredits,
                    'seen': globalSeen.concat(seenFields)
                };
                wixData.update("membersCredit", toUpdate);

                wixData.query("hiddenData")
                    .eq('serial_number', itemData.serial_number)
                    .find()
                    .then((result) => {
                        $item('#xxxNumber').text = result.items[0].mobileNo;
                        $item('#xxxEmail').text = result.items[0].eMail_primary;
                    });
                $item('#button3').hide();
                $item('#warnBox').hide()
                $item('#button5').hide();
                $item('#box3').hide();

            } else if (!isLoggedIn) {
                $w('#columnStrip1').expand();
                $item('#warnBox').show()
                $item('#warnBox').text = 'Please Login';
                $item('#box3').show();
                $item('#button5').show();
                $item('#button5').onClick(() => {
                    $item('#warnBox').hide()
                    $item('#button5').hide();
                    $item('#box3').hide();
                })
            } else if (isLoggedIn && globalCredits === 0) {
                $item('#warnBox').show()
                $item('#warnBox').text = 'Request Credits';
                $item('#box3').show();
                $item('#button5').show();
                $item('#button5').onClick(() => {
                    $item('#warnBox').hide();
                    $item('#button5').hide();
                    $item('#box3').hide();
                })
            }
        });
    });
}

function loginCheck() {
    currentMember.getMember(options)
        .then((member) => {
            globalEmail = member.loginEmail; // Assign the email to the global variable
            const toInsert = {
                "email": globalEmail,
                "credits": 15, // change default credit from here
                'seen': []
            };
            if (isLoggedIn) {
                checkForEmail()
                    .then((exists) => {
                        if (!exists) {
                            console.log('Email does not exist in membersCredit', exists);
                            wixData.insert("membersCredit", toInsert);
                        } else {
                            wixData.get("membersCredit", globalId)
                                .then((item) => {
                                    globalCredits = item.credits;
                                    $w('#creditsText').text = globalCredits.toString();
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking for email: " + error);
                    });
            } else {
                console.log('User is not logged in');
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

async function checkForEmail() {
    try {
        if (globalEmail) { // Check if globalEmail is defined
            const results = await wixData.query("membersCredit")
                .eq('email', globalEmail) // Access the global email variable
                .find();
            if (results.items.length > 0) {
                globalId = results.items[0]._id;
                globalSeen = globalSeen.concat(results.items[0].seen);

                return true;
            } else {
                return false;
            }
        } else {
            console.error("globalEmail is undefined");
            return false;
        }
    } catch (error) {
        console.error("Error querying dataset: " + error);
        return false;
    }
}

function getLocationFilter() {
    const locationInput = $w('#input3').value;
    const locationArray = locationInput.split(',').map(location => location.trim());
    let locationFilters = [];

    for (let i = 0; i < locationArray.length; i++) {
        locationFilters.push(wixData.filter().contains('currentLocation', locationArray[i]));
    }

    // Combine all location filters with 'or'
    let locFilter = locationFilters[0];
    for (let i = 1; i < locationFilters.length; i++) {
        locFilter = locFilter.or(locationFilters[i]);
    }

    return locFilter;
}

function skillsFilter() {
    const skillsInput = $w('#input1').value;
    const skillsArray = skillsInput.split(',').map(skill => skill.trim());
    let skillFilters = [];

    for (let i = 0; i < skillsArray.length; i++) {
        skillFilters.push(wixData.filter().contains('keySkills', skillsArray[i]));
    }

    // Combine all skill filters with 'and'
    combinedFilter = skillFilters[0];
    for (let i = 1; i < skillFilters.length; i++) {
        combinedFilter = combinedFilter.and(skillFilters[i]);
    }
}

// reset button
function resetButton() {
    $w('#resetBtn').onClick(() => {
        $w('#repeater1').hide();
        $w('#recruitData').setFilter(wixData.filter());
        $w('#input1').value = '';
        $w('#input2').value = '';
        $w('#input3').value = '';
        $w('#input7').value = '1000000000000';
        $w('#input8').value = '0';
        $w('#input6').value = '0';
        $w('#input9').value = '100';
    })
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// if member is logged in it will see the logged in member in custom database
// it will retrieve the credits from cdb
// and will perform queries on it 

// on sign in
// new member info will be stored in custom db along with 5 credits