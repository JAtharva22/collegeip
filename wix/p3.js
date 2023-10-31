import wixData from 'wix-data';

$w.onReady(() => {

    // main dropdown filter
    $w("#dropdown6").onChange((event) => {
        const selectedfilter = event.target.value;
        console.log(selectedfilter);
        if (selectedfilter == "relevant") {
            $w("#dynamicDataset").setFilter(wixData.filter().contains("categories__categoryId", 'Finance & Insurance'));
        } else {
            $w("#dynamicDataset").setFilter(wixData.filter().contains('categories__categoryId', 'Finance & Insurance'));
            $w("#dynamicDataset").setSort(wixData.sort().descending("numberOfReviews"));
        }
    });

    $w('#button37').onClick((e) => {
        if ($w('#columnStrip26').collapsed) {
            $w('#columnStrip26').expand()
        } else {
            $w('#columnStrip26').collapse()
        }
    })

    // ratings filter
    $w("#dropdown9").onChange((event) => {
        const selectedRating = event.target.value;
        let s1 = $w('#dropdown8').value;
        console.log(selectedRating);
        if (selectedRating == "any") {
            // If "All" is selected, show all items
            $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__categoryId', 'Finance & Insurance')); // Reset the filter
        } else {
            const categoryFilter = wixData.filter().contains('categories__categoryId', 'Finance & Insurance');
            const ratingFilter = wixData.filter().ge("stars", parseFloat(selectedRating));
            const subFilter = wixData.filter().contains('categories__displayName', s1);
            const combinedFilter = categoryFilter.and(ratingFilter).and(subFilter);
            $w('#dynamicDataset').setFilter(combinedFilter);
        }
    });

    // subcategory filter
    $w('#dropdown8').onChange((event) => {
        const selectedOption = event.target.value; // Get the selected option from the dropdown
        console.log(selectedOption);
        let s2 = $w('#dropdown9').value;
        if (selectedOption === "RESET_ALL") {
            $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__categoryId', 'Finance & Insurance')); // Reset the filter
        } else {
            const categoryFilter = wixData.filter().contains('categories__categoryId', 'Finance & Insurance');
            const ratingFilter = wixData.filter().ge("stars", parseFloat(s2));
            const subFilter = wixData.filter().contains('categories__displayName', selectedOption);
            const combinedFilter = categoryFilter.and(ratingFilter).and(subFilter);
            $w('#dynamicDataset').setFilter(combinedFilter);
        }
    });

    // textbox filter
    $w('#repeater1').onItemReady(($item, itemData) => {
        var longText = itemData.about; // Get the text from the dataset column
        console.log(longText)
        var maxLength = 20; // Set your desired maximum length here

        // Check if the text is longer than the maximum length
        if (longText.length > maxLength) {
            // If it's longer, shorten it and add ellipses
            var shortText = longText.slice(0, maxLength) + '...';
            $item('#text81').text = shortText;
        } else {
            // If it's not longer, keep the original text
            $item('#text81').text = longText;
        }
    });

});