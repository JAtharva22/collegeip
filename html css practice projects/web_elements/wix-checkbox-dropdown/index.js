import wixData from 'wix-data';

let lastFilterContinents = [];

$w.onReady(() => {
	setupRepeater();
	loadContinents();
	setupHandler();
});

// handle each suggestion repeater item
function setupRepeater() {
	$w('#continents').onItemReady(($item, itemData) => {
		$item('#optionCheckbox').onChange(() => {
			filterByCheckboxes()
		})
		$item('#optionText').text = itemData.value;
	});
}

function loadContinents() {
	wixData.query('dropdown') //dropdown options
		.find()
		.then(results => {
			$w('#continents').data = [];
			// Create and map an array for the dropdown menu options
			let continentDropdownOptions = [];
			continentDropdownOptions.push(...results.items.map(continent => {
				return { _id: continent._id, value: continent.title, label: continent.title };
			}));
			$w('#continents').data = continentDropdownOptions;
		});
}

// Filtering per options checked
function filterByCheckboxes() {
	let continents = [];
	$w('#continents').forEachItem(($item, itemData, index) => {
		if ($item('#optionCheckbox').unchecked) {
			continents.push($item('#optionText').text);
		}
	});
	filter(continents);
	// $w('#numContinentsText').text = `${continents.length} continent${((continents.length > 1) ? 's ' : ' ')} selected.`;
}

// Collapse or expand the multi-select menu on click
function setupHandler() {
	$w('#continentBox').onClick(() => {
		if ($w('#continents').collapsed) {
			$w('#continents').expand();
		} else {
			$w('#continents').collapse();
		}
	});
}

function filter(continents) {
	let newContinentsFilterCheck = compareArrays(continents, lastFilterContinents);
	if (!newContinentsFilterCheck) {
		let newFilter = wixData.filter();
		newFilter = newFilter.hasSome('continent', continents);
		$w('#dynamicDataset').setFilter(newFilter);
		lastFilterContinents = continents;
	}
}

// Code to compare string arrays
// Used to compare the current and previous continent selections
function compareArrays(newFilterArray, lastFilterArray) {
	if (newFilterArray.length !== lastFilterArray.length) { return false } //Checking if the number of items in the filter arrays match
	//Sort both arrays for easy comparison and checking if the items match
	let sortedNewFilterArray = newFilterArray.concat().sort()
	let sortedLastFilterArray = lastFilterArray.concat().sort()
	for (let index in sortedNewFilterArray) {
		if (sortedNewFilterArray[index] !== sortedLastFilterArray[index]) return false
	}
	return true
}




