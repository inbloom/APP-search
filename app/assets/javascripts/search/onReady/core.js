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

    // Real popover code
    $("a[rel=popovers]").popover({
            trigger: 'manual',
            animate: false,
            html: true,
            placement: 'right',
            content : function() {
                return $(this).siblings('div.flyout').html();
            },
            template: '<div class="popover" onmouseover="$(this).mouseleave(function() {$(this).hide(); });"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
        }).click(function(e) {
//            e.preventDefault();
        }).mouseenter(function(e) {
            $("a[rel=popovers]").not(this).popover('hide');
            $(this).popover('show');
        });

});