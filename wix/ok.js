import wixData from 'wix-data';
import wixLocation from 'wix-location';

const Category = 'Personal Services';
let isInputFocused = false;

$w.onReady(() => {
    // Use the onItemReady event of the repeater
    $w(`#repeater1`).onItemReady(($item, itemData) => {
        const booleanValue = itemData.isRecommendedInCategories;
        if (booleanValue === true) {
            $item('#box1').style.backgroundColor = '#FFFD8D';
            $item('#text82').show();
            $item('#box2').show();
        }
    });

    // main dropdown filter
    $w("#dropdown6").onChange((event) => {
        const selectedfilter = event.target.value;
        if (selectedfilter === "recommended") {
            $w("#dynamicDataset").setSort(wixData.sort().descending('isRecommendedInCategories').ascending('title'));
        } else {
            $w("#dynamicDataset").setSort(wixData.sort().descending("stars"));
        }
    });

    $w('#button37').onClick((e) => {
        if ($w('#columnStrip26').collapsed) {
            $w('#columnStrip26').expand();
            $w('#button42').show();

        } else {
            $w('#columnStrip26').collapse()
            $w('#button42').hide();
        }
    })
    $w('#button42').onClick((e) => {
        $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__categoryId', Category));
        $w('#input9').value = '';

    })

    // textbox filter
    $w('#repeater1').onItemReady(($item, itemData) => {
        var longText = itemData.about;
        var maxLength = 250;
        if (longText.length > maxLength) {
            // If it's longer, shorten it and add ellipses
            var shortText = longText.slice(0, maxLength) + '...';
            $item('#text81').text = shortText;
        } else {
            // If it's not longer, keep the original text
            $item('#text81').text = longText;
        }
    });

    //params
    setTimeout(() => {
        const paramValue = wixLocation.query['paramName'];
        if (paramValue) {
            $w('#dropdown8').value = paramValue;
            $w('#columnStrip26').expand();
            $w('#button42').show();
            // filtering
            const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
            const subFilter = wixData.filter().contains('categories__displayName', paramValue);
            const combinedFilter = categoryFilter.and(subFilter);
            $w('#dynamicDataset').setFilter(combinedFilter);
            console.log(paramValue)
        }
    }, 1000);
    setTimeout(() => {
        const paramValue = wixLocation.query['paramLocation'];
        if (paramValue) {
            $w('#input9').value = paramValue;
            $w('#columnStrip26').expand();
            $w('#button42').show();
            // filtering
            const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
            const countryFilter = wixData.filter().contains('location__country', paramValue);
            const combinedFilter = categoryFilter.and(countryFilter);
            $w('#dynamicDataset').setFilter(combinedFilter);
            console.log(paramValue)
        }
    }, 1000);
    subcategoryDropdown();
    subfilter();
    ratingFilter();
    locationSearch();

});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
function locationSearch() {
    $w('#input9').onFocus(() => {
        isInputFocused = true;
        // Show repeater2 if the input value is not empty
        if ($w('#input9').value !== '') {
            $w('#repeater2').show();
        }
    });

    $w('#input9').onBlur(() => {
        isInputFocused = false;
        $w('#repeater2').hide();
    });
    $w('#input9').onKeyPress((e) => {
        if (isInputFocused && $w('#input9').value !== '') {
            $w('#repeater2').show();
            setTimeout(() => {
                $w('#dataset1').setFilter(wixData.filter().contains('countries', $w('#input9').value));
            }, 100);
        } else {
            $w('#repeater2').hide();
        }
    });
    $w('#repeater2').onItemReady(($item, itemData, index) => {
        const buttonLabel = itemData.countries;
        $item('#button43').onClick(() => {
            $w('#dynamicDataset').setFilter(wixData.filter().contains('location__country', buttonLabel).and(wixData.filter().contains('categories__categoryId', Category)));
            $w('#repeater2').hide()
        });
    });
}

// ratings filter
function ratingFilter() {

    $w("#dropdown9").onChange((event) => {
        const selectedRating = event.target.value;
        const s1 = $w('#dropdown8').value;
        if (s1 === "" || s1 === null) {
            if (selectedRating == "any") {
                $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__categoryId', Category));
            } else {
                const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
                const ratingFilter = wixData.filter().ge("stars", parseFloat(selectedRating));
                const combinedFilter = categoryFilter.and(ratingFilter);
                $w('#dynamicDataset').setFilter(combinedFilter);
            }
        } else {
            let subFilter;
            if (s1 !== 'RESET_ALL') {
                subFilter = wixData.filter().contains('categories__displayName', s1);
                if (selectedRating == "any") {
                    const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
                    const combinedFilter = categoryFilter.and(subFilter);
                    $w('#dynamicDataset').setFilter(combinedFilter);
                } else {
                    const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
                    const ratingFilter = wixData.filter().ge("stars", parseFloat(selectedRating));
                    const combinedFilter = categoryFilter.and(ratingFilter).and(subFilter);
                    $w('#dynamicDataset').setFilter(combinedFilter);
                }
            } else {
                if (selectedRating == "any") {
                    const categoryFilter = wixData.filter().contains('categories__categoryId', Category);;
                    $w('#dynamicDataset').setFilter(categoryFilter);
                } else {
                    const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
                    const ratingFilter = wixData.filter().ge("stars", parseFloat(selectedRating));
                    const combinedFilter = categoryFilter.and(ratingFilter);
                    $w('#dynamicDataset').setFilter(combinedFilter);
                }
            }
        }
    });
}

// subcategory filter
function subfilter() {
    $w('#dropdown8').onChange((event) => {
        const selectedOption = event.target.value;
        const s2 = $w('#dropdown9').value;
        console.log(s2)
        if (s2 === "" || s2 === null) {
            if (selectedOption === "RESET_ALL") {
                $w('#dynamicDataset').setFilter(wixData.filter().contains('categories__categoryId', Category));
            } else {
                const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
                const subFilter = wixData.filter().contains('categories__displayName', selectedOption);
                const combinedFilter = categoryFilter.and(subFilter);
                $w('#dynamicDataset').setFilter(combinedFilter);
            }
        } else {
            let ratingFilter;
            if (s2 === 'any') {
                ratingFilter = wixData.filter().ge("stars", 0);
            } else {
                ratingFilter = wixData.filter().ge("stars", parseFloat(s2));
            }

            if (selectedOption === "RESET_ALL") {
                const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
                const combinedFilter = categoryFilter.and(ratingFilter);
                $w('#dynamicDataset').setFilter(combinedFilter);
            } else {
                const categoryFilter = wixData.filter().contains('categories__categoryId', Category);
                const subFilter = wixData.filter().contains('categories__displayName', selectedOption);
                const combinedFilter = categoryFilter.and(subFilter);
                $w('#dynamicDataset').setFilter(combinedFilter);
            }
        }
    });
}

function subcategoryDropdown() {
    const uniqueSubcategories = [];

    // Get all items from your dataset
    wixData.query('Items')
        .contains('categories__categoryId', Category) 
        .find()
        .then(results => {
            // Extract all subcategories from the results
            results.items.forEach(item => {
                let subcategories = item.categories__displayName;

                // Iterate through subcategories and add unique ones to the array
                subcategories.forEach(subcategory => {
                    if (!uniqueSubcategories.includes(subcategory)) {
                        uniqueSubcategories.push(subcategory);
                    }
                });
            });

            // Create an array of option objects for the dropdown
            const options = uniqueSubcategories.map(subcategory => {
                return { label: subcategory, value: subcategory };
            });

            options.unshift({ label: 'All', value: 'RESET_ALL' });

            // Populate the dropdown with the unique subcategories
            $w('#dropdown8').options = options;
        })
        .catch(err => {
            console.error('Error:', err);
        });
}

