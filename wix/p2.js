import wixData from 'wix-data';


$w.onReady(() => {

    // Use the wixData API to filter the dataset based on the column and value
    $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__categoryId', 'Finance & Insurance'));

    // main dropdown filter
    $w("#dropdown6").onChange((event) => {
        const selectedfilter = event.target.value;
        console.log(selectedfilter);
        if (selectedRating == "Sponsored") {
            $w("#dynamicDataset").setFilter(wixData.filter().contains("categories__categoryId", 'Finance & Insurance'));
            console.log('done')
        } else {

            $w("#dynamicDataset").setSort(wixData.sort().descending("numberOfReviews"));
            console.log('done')
        }
    });

    // ratings filter
    $w("#dropdown9").onChange((event) => {
        const selectedRating = event.target.value;
        console.log(selectedRating);
        if (selectedRating == "all") {
            // If "All" is selected, show all items
            $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__categoryId', 'Finance & Insurance')); // Reset the filter
        } else {
            // Filter items based on selected rating
            $w('#dynamicDataset').setFilter(wixData.filter().ge("stars", parseFloat(selectedRating))); // Apply filter
            console.log(3)
        }
    });

    // button click filter
    $w('#dropdown8').onChange((event) => {
        const selectedOption = event.target.value; // Get the selected option from the dropdown
        console.log(selectedOption);
        if (selectedOption === "All") {
            $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__categoryId', 'Finance & Insurance')); // Reset the filter
        } else {
            // Filter based on the selected option
            $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__displayName', selectedOption)); // Apply filter
            console.log(4)
        }
        // Apply any other filters based on this dropdown's selection
    });

    $w('#button37').onClick((e) => {
        if ($w('#columnStrip26').collapsed) {
            $w('#columnStrip26').expand()
        } else {
            $w('#columnStrip26').collapse()
        }
    })

    // textbox filter

    $w('#dynamicDataset').onReady(() => {
        $w('#repeater1').onItemReady(($item, itemData) => {
            let long = itemData.about;
            let short = long.slice(0, 50);
            $item('#text81').text = short + ". . . ";
        });
    });

});