/*
 * Copyright 2012-2013 inBloom, Inc. and its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Mouseover effect of Popover flyouts for the left sidebar items with chevrons.
// Clears popovers other than current mouseover item and creates gold effect color.
function flyoutLabelMouseOver(item){
    clearPopovers(item);
    item.style.backgroundColor='#F8B93B';
};


// Mouseout effect of Popover flyouts for the left sidebar items with chevrons.
// Restores the color back to the original blue color on Mouseout.

function flyoutLabelMouseOut(item){
    item.style.backgroundColor='#8accf2';
};

// Clear Popover will close popovers other than the current item.

function clearPopovers(item){
    if(item.id != "flyoutLabel1"){$("#flyoutLabel1").popover('hide');};
    if(item.id != "flyoutLabel2"){$("#flyoutLabel2").popover('hide');};
    if(item.id != "flyoutLabel3"){$("#flyoutLabel3").popover('hide');};
    if(item.id != "flyoutLabel4"){$("#flyoutLabel4").popover('hide');};
    if(item.id != "flyoutLabel5"){$("#flyoutLabel5").popover('hide');};
    if(item.id != "flyoutLabel6"){$("#flyoutLabel6").popover('hide');};
};

// Clear Popover will close popovers other than the current item.

function clearAllPopovers(){
    $("#flyoutLabel1").popover('hide');
    $("#flyoutLabel2").popover('hide');
    $("#flyoutLabel3").popover('hide');
    $("#flyoutLabel4").popover('hide');
    $("#flyoutLabel5").popover('hide');
    $("#flyoutLabel6").popover('hide');
};



// This function sets the contents of the Filter flyout popovers.

function setFlyoverDivHTML() {
    $("#popoverflyoutLabel1").html(setupTableGrid("#popoverflyoutLabel1",window.intendedEndUserRoleArray, window.intendedEndUserRoleFilterArray));
    $("#popoverflyoutLabel2").html(setupTableGrid("#popoverflyoutLabel2",window.educationalUseArray, window.educationalUseFilterArray));
    $("#popoverflyoutLabel3").html(setupTableGrid("#popoverflyoutLabel3",window.typicalAgeRangeArray, window.typicalAgeRangeFilterArray));
    $("#popoverflyoutLabel4").html(setupTableGrid("#popoverflyoutLabel4",window.interactivityTypeArray, window.interactivityTypeFilterArray));
    $("#popoverflyoutLabel5").html(setupTableGrid("#popoverflyoutLabel5",window.learningResourceTypeArray, window.learningResourceTypeFilterArray));
    $("#popoverflyoutLabel6").html(setupTableGrid("#popoverflyoutLabel6",window.mediaTypeArray, window.mediaTypeFilterArray));

    updateFlyoverDisplay();

}

// This function sets up the Table Grid on the Flyout popovers.
function setupTableGrid(divLabel, filterArray, selectedFilterArray) {
    var str = "<table style='width:800px;'>";
    for (var i = 0; i < filterArray.length; i++) {
        if ( (i%3) == 0) {
            if (filterArray[i + 2] != undefined) {
                str = str + "<tr>";
                if (jQuery.inArray(filterArray[i], selectedFilterArray) != -1) {
                    str = str + "<td><input type='checkbox' checked='checked' id='" + filterArray[i] + "' name='" + filterArray[i] + "' value='" + filterArray[i] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i]+ "   </td>";
                }
                else {
                    str = str + "<td><input type='checkbox' id='" + filterArray[i] + "' name='" + filterArray[i] + "' value='" + filterArray[i] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i]+ "   </td>";
                }

                if (jQuery.inArray(filterArray[i + 1], selectedFilterArray) != -1) {
                    str = str + "<td><input type='checkbox' checked='checked' id='" + filterArray[i + 1] + "' name='" + filterArray[i + 1] + "' value='" + filterArray[i + 1] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i + 1]+ "   </td>";
                }
                else {
                    str = str + "<td style='width:33%;'><input type='checkbox' id='" + filterArray[i + 1] + "' name='" + filterArray[i + 1] + "' value='" + filterArray[i + 1] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i + 1]+ "   </td>";
                }

                if (jQuery.inArray(filterArray[i + 2], selectedFilterArray) != -1) {
                    str = str + "<td><input type='checkbox' checked='checked' id='" + filterArray[i + 2] + "' name='" + filterArray[i + 2] + "' value='" + filterArray[i + 2] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i + 2]+ "   </td>";
                }
                else {
                    str = str + "<td><input type='checkbox' id='" + filterArray[i + 2] + "' name='" + filterArray[i + 2] + "' value='" + filterArray[i + 2] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i + 2]+ "   </td>";
                }
                str = str + "</tr>";
            }
            else if (filterArray[i + 1] != undefined) {
                str = str + "<tr>";
                if (jQuery.inArray(filterArray[i], selectedFilterArray) != -1) {
                    str = str + "<td><input type='checkbox' checked='checked' id='" + filterArray[i] + "' name='" + filterArray[i] + "' value='" + filterArray[i] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i]+ "   </td>";
                }
                else {
                    str = str + "<td><input type='checkbox' id='" + filterArray[i] + "' name='" + filterArray[i] + "' value='" + filterArray[i] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i]+ "   </td>";
                }

                if (jQuery.inArray(filterArray[i + 1], selectedFilterArray) != -1) {
                    str = str + "<td><input type='checkbox' checked='checked' id='" + filterArray[i + 1] + "' name='" + filterArray[i + 1] + "' value='" + filterArray[i + 1] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i + 1]+ "    </td>";
                }
                else {
                    str = str + "<td><input type='checkbox' id='" + filterArray[i + 1] + "' name='" + filterArray[i + 1] + "' value='" + filterArray[i + 1] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i + 1]+ "   </td>";
                }
                str = str + "</tr>";
            }
            else {
                str = str + "<tr>";
                if (jQuery.inArray(filterArray[i], selectedFilterArray) != -1) {
                    str = str + "<td><input type='checkbox' checked='checked' id='" + filterArray[i] + "' name='" + filterArray[i] + "' value='" + filterArray[i] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i]+ "   </td>";
                }
                else {
                    str = str + "<td><input type='checkbox' id='" + filterArray[i] + "' name='" + filterArray[i] + "' value='" + filterArray[i] + "' onClick='updateFilter(this, \""+divLabel+"\")'>   " + filterArray[i]+ "   </td>";
                }
                str = str + "</tr>";
            }
        }
    }
    str = str + "</table>";
    $(divLabel).html(str);
}


// Initialization of Popover flyouts for the left sidebar items with chevrons.

function updateFlyoverDisplay(){
    $("#flyoutLabel1").popover({
        html : true,
        content: function() {
            setFlyoverDivHTML();
            return $('#popoverflyoutLabel1').html();
        }
    });
    $("#flyoutLabel2").popover({
        html : true,
        content: function() {
            setFlyoverDivHTML();
            return $('#popoverflyoutLabel2').html();
        }
    });
    $("#flyoutLabel3").popover({
        html : true,
        content: function() {
            setFlyoverDivHTML();
            return $('#popoverflyoutLabel3').html();
        }
    });
    $("#flyoutLabel4").popover({
        html : true,
        content: function() {
            setFlyoverDivHTML();
            return $('#popoverflyoutLabel4').html();
        }
    });
    $("#flyoutLabel5").popover({
        html : true,
        content: function() {
            setFlyoverDivHTML();
            return $('#popoverflyoutLabel5').html();
        }
    });
    $("#flyoutLabel6").popover({
        html : true,
        content: function() {
            setFlyoverDivHTML();
            return $('#popoverflyoutLabel6').html();
        }
    });
}

// This function updates the Filter DIV that appear under each header on the left sidebar
// The update is called from selection of checkboxes in the corresponding flyout popover

function updateFilter(checkboxSelection, divLabel){
    var filterDivName = "#filter" + divLabel.substr(divLabel.length - 1);
    var filterArrayName = "";
    switch (divLabel.substr(divLabel.length - 1)) {
        case '1':
            filterArrayName = intendedEndUserRoleFilterArray;
            break;
        case '2':
            filterArrayName = educationalUseFilterArray;
            break;
        case '3':
            filterArrayName = typicalAgeRangeFilterArray;
            break;
        case '4':
            filterArrayName = interactivityTypeFilterArray;
            break;
        case '5':
            filterArrayName = learningResourceTypeFilterArray;
            break;
        case '6':
            filterArrayName = mediaTypeFilterArray;
            break;
    }
    var foundIn = false;
    for (var i = 0; i < (filterArrayName.valueOf()).length; i++){
        if (checkboxSelection.value == filterArrayName[i]) { foundIn = true; }
    }
    if (foundIn == false) {
        filterArrayName.push(checkboxSelection.value);
        filterArrayName.sort();
        $(filterDivName).empty();
        $(filterDivName).hide();
        for (var i = 0; i < (filterArrayName.valueOf()).length; i++){
            $(filterDivName).append(filterArrayName[i] + "<i class='icon-remove-sign icon-white pull-right'onclick='removeFilterElement(\""+filterArrayName[i]+"\",\""+divLabel+"\", false)'/><br/>");
            $(filterDivName).show();
        }
        $(filterDivName).show();
    }
    else {
        removeFilterElement(checkboxSelection.value, divLabel, true);
    }
    window.resultsStart = 0;
    displaySearchResults();
}


// This function removes an item that has been added to the filter result array
// The display is then updated to the current array

function removeFilterElement(removeItem, divLabel, fromPopover){
    var filterDivName = "#filter" + divLabel.substr(divLabel.length - 1);
    var filterArrayName = "";
    switch (divLabel.substr(divLabel.length - 1)) {
        case '1':
            var tempArray = jQuery.grep(intendedEndUserRoleFilterArray, function(value) {
                return value != removeItem;
            });
            intendedEndUserRoleFilterArray	= tempArray;
            filterArrayName = intendedEndUserRoleFilterArray;
            break;
        case '2':
            var tempArray = jQuery.grep(educationalUseFilterArray, function(value) {
                return value != removeItem;
            });
            educationalUseFilterArray	= tempArray;
            filterArrayName = educationalUseFilterArray;
            break;
        case '3':
            var tempArray = jQuery.grep(typicalAgeRangeFilterArray, function(value) {
                return value != removeItem;
            });
            typicalAgeRangeFilterArray	= tempArray;
            filterArrayName = typicalAgeRangeFilterArray;
            break;
        case '4':
            var tempArray = jQuery.grep(interactivityTypeFilterArray, function(value) {
                return value != removeItem;
            });
            interactivityTypeFilterArray = tempArray;
            filterArrayName = interactivityTypeFilterArray;
            break;
        case '5':
            var tempArray = jQuery.grep(learningResourceTypeFilterArray, function(value) {
                return value != removeItem;
            });
            learningResourceTypeFilterArray	= tempArray;
            filterArrayName = learningResourceTypeFilterArray;
            break;
        case '6':
            var tempArray = jQuery.grep(mediaTypeFilterArray, function(value) {
                return value != removeItem;
            });
            mediaTypeFilterArray	= tempArray;
            filterArrayName = mediaTypeFilterArray;
            break;
    }
    $(filterDivName).empty();
    $(filterDivName).hide();
    filterArrayName.sort();
    for (var i = 0; i < (filterArrayName.valueOf()).length; i++){
        $(filterDivName).append(filterArrayName[i] + "<i class='icon-remove-sign icon-white pull-right' onclick='removeFilterElement(\""+filterArrayName[i]+"\",\""+divLabel+"\", false)'/><br/>");
        $(filterDivName).show();
    }
    if (fromPopover == false) {
        clearAllPopovers();
    }
    window.resultsStart = 0;
    displaySearchResults();
}

// This function is triggered when the search button is pressed and causes a search to occur
// on BrainHoney's search servers and return.
function displaySearchResults(){
    $("#resultsPane").empty();
    var verb = "POST";
    var queryString = "";
    var contentType = "text/xml; charset=utf-8";

    // Setup Query String Parameters
    var searchQueryString = searchInput.value;
    searchQueryString = searchQueryString.replace(" and "," AND ");
    searchQueryString = searchQueryString.replace(" or "," OR ");
    searchQueryString = searchQueryString.replace(" not "," NOT ");

    for (var i = 0; i < intendedEndUserRoleFilterArray.length; i++) {searchQueryString = searchQueryString + " AND meta-lrmi-intendedEndUserRole:" + intendedEndUserRoleFilterArray[i];}
    for (var i = 0; i < educationalUseFilterArray.length; i++) {searchQueryString = searchQueryString + " AND meta-lrmi-educationalUse:" + educationalUseFilterArray[i];}
    for (var i = 0; i < typicalAgeRangeFilterArray.length; i++) {searchQueryString = searchQueryString + " AND meta-lrmi-typicalAgeRange:" + typicalAgeRangeFilterArray[i];}
    for (var i = 0; i < interactivityTypeFilterArray.length; i++) {searchQueryString = searchQueryString + " AND meta-lrmi-interactivityType:" + interactivityTypeFilterArray[i];}
    for (var i = 0; i < learningResourceTypeFilterArray.length; i++) {searchQueryString = searchQueryString + " AND meta-lrmi-learningResourceType:" + learningResourceTypeFilterArray[i];}
    for (var i = 0; i < mediaTypeFilterArray.length; i++) {searchQueryString = searchQueryString + " AND meta-lrmi-mediaType:" + mediaTypeFilterArray[i];}
    if (publisherInput.value != ""){searchQueryString = searchQueryString + " AND meta-lrmi-publisher-name:" + publisherInput.value;}
    if (dotNotationInput.value != ""){searchQueryString = searchQueryString + " AND meta-lrmi-objectiveStatementNotation:" + dotNotationInput.value;}
    if (searchQueryString.startsWith(" AND ")){searchQueryString = searchQueryString.substring(5,searchQueryString.length);}

    // Begin Call to BrainHoney

    var post = '<batch><request cmd="login" username="search/anonymous" password="agilix" /><request cmd="search" query="'+ searchQueryString + '" start="' + window.resultsStart + '" entityid="10118387"/></batch>';
    var format = "*/*";
    var url = "http://gls.agilix.com/Dlap.ashx";
    if (queryString.length > 0) {
        url = url + "?" + queryString;
    }
    $("#resultsPane").html("Loading ...");
    loadXMLDoc(verb, url, contentType, post, format);
    console.log(post);
}

// This function drives the search XML call to BrainHoney

function loadXMLDoc(verb, url, contentType, post, accept)
{
    xmlhttp=null;

    // code for Mozilla, etc.
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest()
    }
    // code for IE
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
    }
    if (xmlhttp!=null)
    {
        xmlhttp.onreadystatechange = onResponse;
        xmlhttp.open(verb,url,true);
        xmlhttp.setRequestHeader("Accept", accept);
        if (verb == "GET")
        {
            xmlhttp.send(null);
        }
        else
        {
            xmlhttp.setRequestHeader("Content-Type", contentType);
            xmlhttp.send(post);
        }
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
}

// This function processes the response back from the BrainHoney call and parses the display fields

function onResponse()
{
    if (xmlhttp.readyState == 4)
    {
        $("#resultStats").empty();
        $("#resultsPane").empty();
        var xmlDoc = xmlhttp.responseXML;
        $(xmlDoc).find("doc").each(function() {
            var name 	= $(this).find('str[name="dlap_title"]').text();
            var thumb 	= $(this).find('str[name="dlap_thumbnail"]').text();
            var link 	= $(this).find('arr[name="dlap_links"]').text();
            var desc 	= $(this).find('arr[name="meta-description-list/meta-description"]').text();
            var entityID = $(this).attr('entityid');
            var thumbURL = "http://gls.agilix.com/dlap.ashx?cmd=getresource&entityid="+ entityID + "&path=" + thumb;
            $("#resultsPane").append("<table style='width:100%;'><tr><td style='width:20%;'><a href='" + link + "' target='_blank'><img style='width:75%;height:75%' src='" + thumbURL + "'/></a></td><td style='width:80%;vertical-align:top;'><h5 style='margin:0 0 0 0;line-height:14px;'><a href='" + link + "' target='_blank'>" + name + "</a></h5><h6 style='margin:0 0 0 0;line-height:14px;font-size:10px;'><a href='" + link + "' target='_blank' style='color:grey;'>" + link + "</a></h6><p>" + desc.trunc(200,true) + "</p><br/><br/></td></tr>");
        });


        // Setup Pagination

        window.resultsReturned = parseInt($(xmlDoc).find('result').attr('numFound'));
        if (window.resultsStart == 0 && window.resultsReturned <= window.resultSetSize) {
            $("#resultsPane").append("<table style='width:100%;'><tr><td style='width:100%;text-align:center;'></td></tr></table>");}

        else if (window.resultsStart == 0 && window.resultsReturned > window.resultSetSize) {
            $("#resultsPane").append("<table style='width:100%;'><tr><td style='width:100%;text-align:center;'> Displaying " + (window.resultsStart+1) + " - " + (window.resultSetSize + window.resultsStart) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='updateSearchResults(\"next\");'>Next <i class='icon-forward'/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='updateSearchResults(\"last\");'>Last <i class='icon-fast-forward'/></a></td></tr></table>");}

        else if (window.resultsStart > 0 && window.resultSetSize < (window.resultsReturned - window.resultsStart) ) {
            $("#resultsPane").append("<table style='width:100%;'><tr><td style='width:100%;text-align:center;'><a href='#' onclick='updateSearchResults(\"first\");'><i class='icon-fast-backward'/> First</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='updateSearchResults(\"back\");'><i class='icon-backward'/> Back</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displaying " + (window.resultsStart+1) + " - " + (window.resultSetSize + window.resultsStart) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='updateSearchResults(\"next\");'>Next <i class='icon-forward'/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='updateSearchResults(\"last\");'>Last <i class='icon-fast-forward'/></a></td></tr></table>");
        }

        else if (window.resultSetSize >= (window.resultsReturned - window.resultsStart) ) {
            $("#resultsPane").append("<table style='width:100%;'><tr><td style='width:100%;text-align:center;'><a href='#' onclick='updateSearchResults(\"first\");'><i class='icon-fast-backward'/> First</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#' onclick='updateSearchResults(\"back\");'><i class='icon-backward'/> Back</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displaying " + (window.resultsStart+1) + " - " + window.resultsReturned + "</td></tr></table>");
        }

        $("#resultsPane").append("</table>");

        // Update Number of Results returned in Result Stats upper left area of Search Window.

        if (window.resultsReturned == "0") { $("#resultStats").html("<span class='label label-important'>Your search returned no results</span>"); }
        else if (window.resultsReturned == "1") { $("#resultStats").html("<span class='label label-success'>Your search returned " + window.resultsReturned + " result.</span>"); }
        else { $("#resultStats").html("<span class='label label-success'>Your search returned " + window.resultsReturned + " results.</span>"); }



    }
}

// Update the Search Results Based on Inputs

function updateSearchResults(incoming){
    if (incoming == "back") { window.resultsStart = window.resultsStart - window.resultSetSize;}
    else if (incoming == "next") { window.resultsStart = window.resultsStart + window.resultSetSize;}
    else if (incoming == "first") { window.resultsStart = 0;}
    else if (incoming == "last") { window.resultsStart = window.resultsReturned - window.resultSetSize;}
    displaySearchResults();

}


// Tracks the keypress events on the search input field and updates the search results
$("#searchInput").keyup(function(e){
    if (event.keyCode == '13') {
        window.resultsStart = 0;
        displaySearchResults();
    }
    return false;

});

$("#publisherInput").keyup(function(e){
    if (event.keyCode == '13') {
        window.resultsStart = 0;
        displaySearchResults();
    }
    return false;

});

$("#dotNotationInput").keyup(function(e){
    if (event.keyCode == '13') {
        window.resultsStart = 0;
        displaySearchResults();
    }
    return false;

});

$("#publisherInput").change(function(e){
    window.resultsStart = 0;
    displaySearchResults();
});

$("#dotNotationInput").change(function(e){
    window.resultsStart = 0;
    displaySearchResults();
});

$("#searchInput").focus(function(e){
    clearAllPopovers();
});

$("#publisherInput").focus(function(e){
    clearAllPopovers();
});

$("#dotNotationInput").focus(function(e){
    clearAllPopovers();
});

$("#resultsPane").click(function(e){
    clearAllPopovers();
});
