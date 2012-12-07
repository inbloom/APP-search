$(function() {

    // Setup Arrays for Filter Results Data Display
    window.intendedEndUserRoleArray = new Array();
    window.educationalUseArray = new Array();
    window.typicalAgeRangeArray = new Array();
    window.interactivityTypeArray = new Array();
    window.learningResourceTypeArray = new Array();
    window.mediaTypeArray = new Array();

    // Setup Arrays for Filter Results Data Selection
    window.intendedEndUserRoleFilterArray = new Array();
    window.educationalUseFilterArray = new Array();
    window.typicalAgeRangeFilterArray = new Array();
    window.interactivityTypeFilterArray = new Array();
    window.learningResourceTypeFilterArray = new Array();
    window.mediaTypeFilterArray = new Array();

    // Setup Dot Notation Array
    window.dotNotationDisplayArray = new Array();
    readAlignmentDataFromFiles();
    var $dotNotation = $( '#dotNotationInput');
    $dotNotation.typeahead({source: dotNotationDisplayArray, items:8});

    // Setup Variables For Search Stats and Results
    window.resultsReturned = 0;
    window.resultsStart = 0;
    window.resultSetSize = 10;

    // Read Vocabular CSV Into Filter Results Data Arrays
    readVocabularyFile();

    $("#resultsPane").css({
        top:  $("#searchBody").position().top + $("#searchBody").height(),
        left: $("#filterFields").position().left + $("#filterFields").width(),
        right: 0,
        bottom: $("div.footer").height()
    });

});