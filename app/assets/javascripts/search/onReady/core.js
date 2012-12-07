$(function() {

    searchResults = []
    searchFilters = {
        'endUserFilters' : []
    }

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
        $("a[rel=popovers]").clearQueue();
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

    // Account for end user filters
    $(".endUserFilters input[type=checkbox]").live('click', function(e) {
        var checked = $(this).attr('checked');
        if (checked) {
            $("input[type=checkbox][value="+$(this).val()+"]").attr('checked',checked);
            $("span#endUserFilters").append($('<a href="#" class="filter '+$(this).val()+'"><i class="icon-ban-circle icon-white"></i> '+$(this).val().replace("_"," ")+'</a>'));
        } else {
            $("input[type=checkbox][value="+$(this).val()+"]").removeAttr('checked');
            $("a."+$(this).val()).remove();
        }
        updateFilters();
    });


});

// Update search filters
function updateFilters() {
    // End User Filters
    searchFilters['endUserFilters'] = [];
    $("div.flyout div.endUserFilters input[type=checkbox][checked=checked]").each(function() {
        searchFilters['endUserFilters'].push($(this).val().replace("_"," "));
    });
    parseSearchResults();
}


// Fires the search
function performSearch() {
    $("#resultsPane").empty();
    $("#resultsPane").append($("<p>Searching...</p>"));

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

// Parse out the results
function parseSearchResults() {
    $("#resultsPane").empty();

    for (i in searchResults) {
        var r = searchResults[i];

        // End User Filter?  If End User is a filter lets filter by it!
        var endUserFound = true;
        if (searchFilters.endUserFilters.length != 0) {
            endUserFound = false;
            for (a in searchFilters.endUserFilters) {
                if (r['endUser'].match(searchFilters.endUserFilters[a])) {
                    endUserFound = true;
                }
            }
        }

        if (endUserFound) {
            $("#resultsPane").append($("<div class='result'><p><em><a href='"+r['url']+"' target='_blank'>"+r['title']+"</a></em></p><cite>"+r['url']+"</cite></div>"));
        }
    }
}

