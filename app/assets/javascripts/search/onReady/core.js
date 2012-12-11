$(function() {

    searchResults = [];
    searchResultsFiltered = [];
    searchFilters = {
        'endUserFilters'            : [],
        'ageRangeFilters'           : [],
        'educationalUseFilters'     : [],
        'interactivityTypeFilters'  : [],
        'learningResourceFilters'   : [],
        'mediaTypeFilters'          : []
    };
    pagination = {};

    filterKeys = {
        
        'endUserFilters' : {
            'end001':'Administrator',
            'end002':'Mentor',
            'end003':'Parent',
            'end004':'Peer Tutor',
            'end005':'Specialist',
            'end006':'Student',
            'end007':'Teacher',
            'end008':'Team'
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
        },

        'interactivityTypeFilters' : {
            'iT001':'Active',
            'iT002':'Expositive',
            'iT003':'Mixed'
        },

        'learningResourceFilters' : {
            'lR001':'Activity',
            'lR002':'Assessment',
            'lR003':'Audio',
            'lR004':'Broadcast',
            'lR005':'Calculator',
            'lR006':'Discussion',
            'lR007':'E-Mail',
            'lR008':'Field Trip',
            'lR009':'Hands-on',
            'lR010':'In-Person/Speaker',
            'lR011':'Kinesthetic',
            'lR012':'Lab Material (Printed Activities - Instruments - Samples...)',
            'lR013':'Lesson Plan',
            'lR014':'Manipulative',
            'lR015':'MBL (Microcomputer Based)',
            'lR016':'Model',
            'lR018':'On-Line',
            'lR019':'Podcast',
            'lR020':'Presentation',
            'lR021':'Printed',
            'lR022':'Quiz',
            'lR023':'Robotics',
            'lR024':'Still Image',
            'lR025':'Test',
            'lR026':'Video',
            'lR027':'Wiki',
            'lR028':'Worksheet'
        },
        
        'mediaTypeFilters' : {
            'mT001':'Audio CD',
            'mT002':'Audiotape',
            'mT003':'Calculator',
            'mT004':'CD-I',
            'mT005':'CD-ROM',
            'mT006':'Diskette',
            'mT007':'Duplication Master',
            'mT008':'DVD/ Blu-ray',
            'mT009':'E-Mail',
            'mT010':'Electronic Slides',
            'mT011':'Field Trip',
            'mT012':'Filmstrip',
            'mT013':'Flash',
            'mT014':'Image',
            'mT015':'In-Person/Speaker',
            'mT016':'Interactive Whiteboard',
            'mT017':'Manipulative',
            'mT018':'MBL (Microcomputer Based)',
            'mT019':'Microfiche',
            'mT020':'Overhead',
            'mT021':'Pamphlet',
            'mT022':'PDF',
            'mT023':'Person-to-Person',
            'mT024':'Phonograph Record',
            'mT025':'Photo',
            'mT026':'Podcast',
            'mT027':'Printed',
            'mT028':'Radio',
            'mT029':'Robotics',
            'mT030':'Satellite',
            'mT031':'Slides',
            'mT032':'Television',
            'mT033':'Transparency',
            'mT034':'Video Conference',
            'mT035':'Videodisc',
            'mT036':'Webpage',
            'mT037':'Wiki'
        }

    };


    // Setup Dot Notation Array
    dotNotationDisplayArray = new Array();
    readAlignmentDataFromFiles();
    var $dotNotation = $( '#dotNotationFilter');
    $dotNotation.typeahead({source: dotNotationDisplayArray, items:8});

    // Resize the results pane based on our browser (dumb.. but feh)
    $("#resultsPane").css({
        top:  $("#searchBody").position().top + $("#searchBody").height(),
        left: $("#filterFields").position().left + $("#filterFields").width(),
        right: 0,
        bottom: $("div.footer").height()
    });

    // Refactoring the standard twitter popover code to allow mouse over popovers
    // Note, popover content is injected into the pop over each time you draw it from the sibling flyout div.
    // So the checkboxes in the page which are hidden get squeezed into the popover.
    // All checkbox states in the flyover are ephemeral but the hidden checkboxes aren't.
    $("a[rel=popovers]").popover({
        trigger: 'click',
        animate: false,
        html: true,
        placement: 'right',
        content : function() {
            return $(this).siblings('div.flyout').html();
        },
        template: '<div class="popover" onmouseover="$(this).mouseleave(function() {$(\'a[rel=popovers]\').popover(\'hide\');});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    }).click(function(e) {
        $("a[rel=popovers]").not(this).popover('hide');
    });

    // On button click search
    $("#searchButton").on('click', function() {
        performSearch();
    });

    $("#paginationLimit").on('change', function() {
        pagination['page'] = 1;
        updateDisplay();
    });

    $("#publisherFilter").on('keyup', function() {
        parseSearchResults();
    });

    $("#dotNotationFilter").on('keyup', function() {
        parseSearchResults();
    });

    // On Enter search
    $("#searchInput").on('keydown', function(e) {
        if (e.keyCode == 13) {
            performSearch();
        }
    });

    // On click of the pagination buttons do that thing.
    $(".paginationPageButtons li a").live("click", function() {
        var page = $(this).attr('href').substr(1);
        updateDisplay(page);
        return false;
    });

    // Setup all the checkbox onclicks for the various filter groups
    for (key in filterKeys) {
        checkboxOnClicks(key)
    }

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

// If a user clicks the filter item we need to be able to unchecked based on that click.
function unCheck(id) {
    $("input[type=checkbox][value="+id+"]").removeAttr('checked');
    $("a."+id).remove();
    updateFilters();
}

// Update search filters
function updateFilters() {
    // Iterate through all the known search filters, find the checkbox list for them and then filter based on those
    for (key in searchFilters) {
        searchFilters[key] = [];
        $("div.flyout div." + key + " input[type=checkbox][checked=checked]").each(function() {
            searchFilters[key].push(filterKeys[key][$(this).val()]);
        });
    }
    parseSearchResults();
}


// Fires the search
function performSearch() {
    $("#resultsPane").empty();
    $("#resultsPane").append($("<h5>Searching...</h5>"));

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
    searchResultsFiltered = [];
    $("#resultsPane").empty();

    for (i in searchResults) {
        var r = searchResults[i];

        // TODO Refactor this so it's dry..

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

        // Interactivity Type Filter
        var interactivityTypeFound = true;
        if (searchFilters.interactivityTypeFilters.length != 0) {
            interactivityTypeFound = false;
            for (a in searchFilters.interactivityTypeFilters) {
                if (r['interactivityType'].match(searchFilters.interactivityTypeFilters[a])) {
                    interactivityTypeFound = true;
                }
            }
        }

        // Interactivity Type Filter
        var learningResourceFound = true;
        if (searchFilters.learningResourceFilters.length != 0) {
            learningResourceFound = false;
            for (a in searchFilters.learningResourceFilters) {
                if (r['learningResource'].match(searchFilters.learningResourceFilters[a])) {
                    learningResourceFound = true;
                }
            }
        }

        // Media Type Filter
        var mediaTypeFound = true;
        if (searchFilters.mediaTypeFilters.length != 0) {
            mediaTypeFound = false;
            for (a in searchFilters.mediaTypeFilters) {
                if (r['mediaType'].match(searchFilters.mediaTypeFilters[a])) {
                    mediaTypeFound = true;
                }
            }
        }

        // Publisher Filter
        var publisherFilterFound = true;
        var publisherFilter = $("#publisherFilter").val().toLowerCase();
        if (publisherFilter != "") {
            publisherFilterFound = false;
            if (r['publisher'].toLowerCase().match(publisherFilter)) {
                publisherFilterFound = true;
            }
        }

        // DotNotation Filter
        var dotNotationFound = true;
        var dotNotationFilter = $("#dotNotationFilter").val().toLowerCase();
        if (dotNotationFilter != "") {
            dotNotationFound = false;
            if (r['alignments'].toLowerCase().match(dotNotationFilter)) {
                dotNotationFound = true;
            }
        }

        if (endUserFound &&
            ageRangeFound &&
            educationalUseFound &&
            interactivityTypeFound &&
            learningResourceFound &&
            mediaTypeFound &&
            publisherFilterFound &&
            dotNotationFound) {
                searchResultsFiltered.push(r);
        }
    }
    // Okay now that we have our filtered results
    updateDisplay();
}

// Step through the filtered search results and use them
function updateDisplay(page) {
    // Define our pagination
    pagination['page'] = parseInt(page) || pagination['page'] || 1;
    pagination['limit'] = parseInt($('#paginationLimit').val());
    pagination['pages'] = Math.ceil(searchResultsFiltered.length / pagination['limit']);
    pagination['offset'] = (pagination['limit'] * pagination['page']) - pagination['limit'];
    // scrub the results
    $("#resultsPane").empty();

    // Draw the number of items in our filter that our pagination limit allows
    var countShowing = 0;
    for (i = pagination['offset']; i < (pagination['offset'] + pagination['limit']); i++) {
        if (searchResultsFiltered[i] == undefined) break;
        var r = searchResultsFiltered[i];
        var thumbnail = (r['url'] != "") ? 'http://beta.url2png.com/v6/P50C4FEF8F41CC/' + r['url2png_token'] + '/png/?url=' + r['url'] + '&thumbnail_max_width=160' : "";
        $("#resultsPane").append($("<div class='result'><img class='thumbnail' src='"+thumbnail+"' width='190' height='60' /><p><em><a href='"+r['url']+"' target='_blank'>"+r['title']+"</a></em></p><cite>"+r['url']+"</cite></div>"));
        countShowing++;
    }

    // Inject the pagination buttons
    if (pagination['pages'] > 1) {
        $("#resultsPane").append($('<div class="pagination pull-right"><ul class="paginationPageButtons"></ul></div>'));
        $(".paginationPageButtons").append($('<li class="'+((pagination['page']==1)?"disabled":"")+'"><a href="#'+1+'"> &lt;&lt; </a></li>'));
        for (i = 1; i <= pagination['pages']; i++) {
            $(".paginationPageButtons").append($("<li class='"+((i==pagination['page'])?'active':'')+"'><a href='#"+i+"'>"+i+"</a></li>"));
        }
        $(".paginationPageButtons").append($('<li class="'+((pagination['page']==pagination['pages'])?'disabled':'')+'"><a href="#'+pagination['pages']+'"> &gt;&gt; </a></li>'));
    }

    if (searchResultsFiltered.length >= 1) {
        $("span.showing-text").html("Showing " + (pagination['offset'] + 1) + " to " + (pagination['offset'] + countShowing) + " of " + searchResultsFiltered.length + " Results");
    } else {
        $("#resultsPane").append("<h5>It appears your search returned no results.</h5>");
    }
}