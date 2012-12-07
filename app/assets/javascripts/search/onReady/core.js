$(function() {

    searchResults = []
    searchFilters = {
        'endUserFilters'        : [],
        'ageRangeFilters'       : [],
        'educationalUseFilters' : []
    }

    filterKeys = {
        
        'endUserFilters' : {
            'eU001':'Administrator',
            'eU002':'Mentor',
            'eU003':'Parent',
            'eU004':'Peer Tutor',
            'eU005':'Specialist',
            'eU006':'Student',
            'eU007':'Teacher',
            'eU008':'Team'
        },

        'ageRangeFilters' : {
            'aR001':'0-2',
            'aR002':'3-5',
            'aR003':'5-8',
            'aR004':'8-10',
            'aR005':'10-12',
            'aR006':'12-14',
            'aR007':'14-16',
            'aR008':'16-18',
            'aR009':'18+'
        },

        'educationalUseFilters' : {
            'eU001':'Activity',
            'eU002':'Analogies',
            'eU003':'Assessment',
            'eU004':'Auditory',
            'eU005':'Brainstorming',
            'eU006':'Classifying',
            'eU007':'Comparing',
            'eU008':'Cooperative Learning',
            'eU009':'Creative Response',
            'eU010':'Demonstration',
            'eU011':'Differentiation ',
            'eU012':'Discovery Learning',
            'eU013':'Discussion/Debate',
            'eU014':'Drill & Practice',
            'eU015':'Experiential',
            'eU016':'Field Trip',
            'eU017':'Game',
            'eU018':'Generating hypotheses',
            'eU019':'Guided questions ',
            'eU020':'Hands-on',
            'eU021':'Homework',
            'eU022':'Identify similarities & differences',
            'eU023':'Inquiry',
            'eU024':'Interactive',
            'eU025':'Interview/Survey',
            'eU026':'Interviews',
            'eU027':'Introduction',
            'eU028':'Journaling ',
            'eU029':'Kinesthetic',
            'eU030':'Laboratory',
            'eU031':'Lecture',
            'eU032':'Metaphors',
            'eU033':'Model & Simulation',
            'eU034':'Musical',
            'eU035':'Nonlinguistic ',
            'eU036':'Note taking ',
            'eU037':'Peer Coaching',
            'eU038':'Peer Response',
            'eU039':'Play',
            'eU040':'Presentation',
            'eU041':'Problem Solving',
            'eU042':'Problem Based',
            'eU043':'Project',
            'eU044':'Questioning ',
            'eU045':'Reading',
            'eU046':'Reciprocal Teaching ',
            'eU047':'Reflection',
            'eU048':'Reinforcement',
            'eU049':'Research',
            'eU050':'Review',
            'eU051':'Role Playing',
            'eU052':'Service Learning ',
            'eU053':'Simulations',
            'eU054':'Summarizing ',
            'eU055':'Technology ',
            'eU056':'Testing Hypotheses',
            'eU057':'Thematic Instruction ',
            'eU058':'Visual/Spatial',
            'eU059':'Word Association',
            'eU060':'Writing'
        }


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
        trigger: 'click',
        animate: false,
        html: true,
        placement: 'right',
        content : function() {
            return $(this).siblings('div.flyout').html();
        },
        template: '<div class="popover" onmouseover="$(this).mouseleave(function() {$(\'a[rel=popovers]\').popover(\'hide\');});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
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

    checkboxOnClicks('endUserFilters');
    checkboxOnClicks('ageRangeFilters');
    checkboxOnClicks('educationalUseFilters');

});

// Add functionality to checkboxes
function checkboxOnClicks(id) {
    $("."+id+" input[type=checkbox]").live('click', function(e) {
        $("a[rel=popovers]").popover('hide');
        var checked = $(this).attr('checked');
        if (checked) {
            $("input[type=checkbox][value="+$(this).val()+"]").attr('checked',checked);
            $("span#"+id).append($('<a href="#" class="filter '+$(this).val()+'" onclick="unCheck(\''+$(this).val()+'\');"><i class="icon-ban-circle icon-white"></i> '+filterKeys[id][$(this).val()]+'</a>'));
        } else {
            $("input[type=checkbox][value="+$(this).val()+"]").removeAttr('checked');
            $("a."+$(this).val()).remove();
        }
        updateFilters();
    });
}

function unCheck(id) {
    $("input[type=checkbox][value="+id+"]").removeAttr('checked');
    $("a."+id).remove();
}


// Update search filters
function updateFilters() {
    // End User Filters
    searchFilters['endUserFilters'] = [];
    $("div.flyout div.endUserFilters input[type=checkbox][checked=checked]").each(function() {
        searchFilters['endUserFilters'].push(filterKeys.endUserFilters[$(this).val()]);
    });

    // Age Range Filters
    searchFilters['ageRangeFilters'] = [];
    $("div.flyout div.ageRangeFilters input[type=checkbox][checked=checked]").each(function() {
        searchFilters['ageRangeFilters'].push(filterKeys.ageRangeFilters[$(this).val()]);
    });

    // Educational Use Filters
    searchFilters['educationalUseFilters'] = [];
    $("div.flyout div.educationalUseFilters input[type=checkbox][checked=checked]").each(function() {
        searchFilters['educationalUseFilters'].push(filterKeys.educationalUseFilters[$(this).val()]);
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

        // End User Filter
        var endUserFound = true;
        if (searchFilters.endUserFilters.length != 0) {
            endUserFound = false;
            for (a in searchFilters.endUserFilters) {
                if (r['endUser'].match(searchFilters.endUserFilters[a])) {
                    endUserFound = true;
                }
            }
        }

        // Age Range Filter
        var ageRangeFound = true;
        if (searchFilters.ageRangeFilters.length != 0) {
            ageRangeFound = false;
            for (a in searchFilters.ageRangeFilters) {
                if (r['ageRange'].match(searchFilters.ageRangeFilters[a])) {
                    ageRangeFound = true;
                }
            }
        }

        // Educational Use Filter
        var educationalUseFound = true;
        if (searchFilters.educationalUseFilters.length != 0) {
            educationalUseFound = false;
            for (a in searchFilters.educationalUseFilters) {
                if (r['educationalUse'].match(searchFilters.educationalUseFilters[a])) {
                    educationalUseFound = true;
                }
            }
        }

        if (endUserFound && ageRangeFound && educationalUseFound) {
            $("#resultsPane").append($("<div class='result'><p><em><a href='"+r['url']+"' target='_blank'>"+r['title']+"</a></em></p><cite>"+r['url']+"</cite></div>"));
        }
    }
}

