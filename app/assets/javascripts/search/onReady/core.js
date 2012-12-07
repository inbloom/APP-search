$(function() {

    searchResults = []

    // Setup Dot Notation Array
    dotNotationDisplayArray = new Array();
    readAlignmentDataFromFiles();
    var $dotNotation = $( '#dotNotationInput');
    $dotNotation.typeahead({source: dotNotationDisplayArray, items:8});

    // Resize the results pane based on our browser (dumb.. but feh)
    $("#resultsPane").css({
        top:  $("#searchBody").position().top + $("#searchBody").height(),
        left: $("#filterFields").position().left + $("#filterFields").width(),
        right: 0,
        bottom: $("div.footer").height()
    });

    // Refactoring the standard twitter popover code to allow mouse over popovers
    $("a[rel=popovers]").popover({
        trigger: 'manual',
        animate: false,
        html: true,
        placement: 'right',
        content : function() {
            return $(this).siblings('div.flyout').html();
        },
        template: '<div class="popover" onmouseover="$(this).mouseleave(function() {$(this).hide(); });"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    }).mouseenter(function(e) {
        $("a[rel=popovers]").not(this).popover('hide');
        $(this).popover('show');
    });

    // On button click search
    $("#searchButton").on('click', function() {
        performSearch();
    });

    // On Enter search
    $("#searchInput").on('keydown', function(e) {
        if (e.keyCode == 13) {
            performSearch();
        }
    });

    // Fires the search
    function performSearch() {
        var query = $('#searchInput').val();
        $.ajax({
            type : "POST",
            dataType : 'json',
            url  : "/search/full_search",
            data : { query : query },
            success : function(xhr) {
                searchResults = xhr
                parseSearchResults();
            },
            error : function(xhr, txtStatus, errThrown) {

            }
        });
    }

});

// Parse out the results
function parseSearchResults() {
    $("#resultsPane").empty();

    for (i in searchResults) {
        var r = searchResults[i];
        $("#resultsPane").append($("<div class='result'><a href='"+r['url']+"' target='_blank'>"+r['title']+"</a></div>"));

    }
}

