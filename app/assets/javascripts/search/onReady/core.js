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

$(function() {

    searchResults = [];

    pagination = {
        'offset'    : 0,
        'limit'     : parseInt($("#paginationLimit").val()),
        'page'      : 0,
        'pages'     : 0,
        'number_of_buttons' : 5
    };

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
        },
        
        'groupTypeFilters' : {
            'gT001':'Class',
            'gT002':'Community',
            'gT003':'Grade',
            'gT004':'Group Large (6&plus; members)',
            'gT005':'Group Small (3-5 members)',
            'gT006':'Individual',
            'gT007':'Inter-Generational',
            'gT008':'Multiple Class',
            'gT009':'Pair',
            'gT010':'School',
            'gT011':'State/Province',
            'gT012':'World'
        }

    };

    // Setup Dot Notation Array
    dotNotationDisplayArray = new Array();
    readAlignmentDataFromFiles();
    var $dotNotation = $( '#dotNotationFilter');
    $dotNotation.typeahead({
        source : dotNotationDisplayArray,
        items  : 8
    });

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
        resetPagination();
        performSearch();
    });

    $("#paginationLimit").on('change', function() {
        pagination['limit'] = parseInt($("#paginationLimit").val());
        resetPagination();
        performSearch();
    });

    $("#publisherFilter").on('change', function() {
        resetPagination();
        performSearch();
    });

    $("#dotNotationFilter").on('change', function() {
        resetPagination();
        performSearch();
    });

    // On Enter search
    $("#searchInput").on('keydown', function(e) {
        if (e.keyCode == 13) {
            resetPagination();
            performSearch();
        }
    });

    // On click of the pagination buttons do that thing.
    $(".paginationPageButtons li a[rel=pagination]").live("click", function() {
        var page = parseInt($(this).attr('href').substr(1));
        pagination['offset'] = pagination['limit'] * (page -1);
        performSearch();
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
        resetPagination();
        performSearch();
    });
}

// If a user clicks the filter item we need to be able to unchecked based on that click.
function unCheck(id) {
    $("input[type=checkbox][value="+id+"]").removeAttr('checked');
    $("a."+id).remove();
    resetPagination();
    performSearch();
}

// Fires the search
function performSearch() {
    $("#resultsPane").empty();
    $("#resultsPane").append($("<h5>Searching...</h5>"));

    var query = $('#searchInput').val();

    var filters = {};
    $('div.items input[type=checkbox][checked]').each(function(e,obj) {
        filters[obj.name] = true;
    });

    var publisher = $('#publisherFilter').val();
    if (publisher != '') {
        filters['publisher['+publisher+']'] = true;
    }

    var notation = $('#dotNotationFilter').val();
    if (notation != '') {
        filters['targetName['+notation+ ']'] = true;
    }

    $.ajax({
        type : "POST",
        dataType : 'json',
        url  : "/search/full_search",
        data : { query : query, filters : filters, limit : pagination['limit'], offset : pagination['offset'] },
        success : function(xhr) {
            searchResults = xhr
            parseSearchResults();
        },
        error : function(xhr, txtStatus, errThrown) {
            // @TODO need to add code to do something with errors
        }
    });
}

// Parse out the results
function parseSearchResults() {

    pagination['page'] = (pagination['offset'] / pagination['limit']) + 1 || 1;
    pagination['pages'] = Math.ceil(searchResults.hits.total / pagination['limit']);

    $("#resultsPane").empty();

    // Draw each of the search result hits to the page
    if (searchResults.hits.hits != undefined && searchResults.hits.hits.length > 0 ) {
        for(item in searchResults.hits.hits) {

            var props = searchResults.hits.hits[item]['_source'].properties;
            var item_thumb = (props.thumbnailUrl != undefined) ? props.thumbnailUrl[0] : '';
            var item_url = (props.url != undefined) ? props.url[0] : '';
            var item_name  = (props.name != undefined) ? props.name[0] : '';

            $("#resultsPane").append($("<div class='result'><img class='thumbnail' src='"+item_thumb+"' width='190' height='60' /><p><em><a href='"+item_url+"' target='_blank'>"+item_name+"</a></em></p><cite>"+item_url+"</cite></div>"));

        }
    }

    // Inject the pagination buttons

    if (pagination['pages'] > 1) {
        $("#resultsPane").append($('<div class="pagination pull-right"><ul class="paginationPageButtons"></ul></div>'));
        $(".paginationPageButtons").append($('<li class="'+((pagination['page']==1)?"disabled":"")+'"><a rel="pagination" href="#'+1+'"> &lt;&lt; </a></li>'));
        if ((pagination['page'] - pagination['number_of_buttons'] > 1)) {
            $(".paginationPageButtons").append($('<li><a rel="pagination" href="#1">1 ...</a></li>'));
        }
        for (i = 1; i <= pagination['pages']; i++) {
            if ((i + pagination['number_of_buttons']) > pagination['page'] && (i - pagination['number_of_buttons']) < pagination['page']) {
                $(".paginationPageButtons").append($("<li class='"+((i==pagination['page'])?'active':'')+"'><a rel='pagination' href='#"+i+"'>"+i+"</a></li>"));
            }
        }
        if ((pagination['page'] + pagination['number_of_buttons']) < pagination['pages']) {
            $(".paginationPageButtons").append($('<li><a rel="pagination" href="#'+pagination['pages']+'">... '+pagination['pages']+'</a></li>'));
        }
        $(".paginationPageButtons").append($('<li class="'+((pagination['page']==pagination['pages'])?'disabled':'')+'"><a rel="pagination" href="#'+pagination['pages']+'"> &gt;&gt; </a></li>'));
    }

    // Apply the showing text
    if (searchResults.hits.total >= 1) {
        $("span.showing-text").show();
        $("span.showing-text").html("Showing " + (pagination['offset'] + 1) + " to " + (pagination['offset'] + pagination['limit'] + 0) + " of " + searchResults.hits.total + " Results");
    } else {
        $("span.showing-text").hide();
        $("#resultsPane").append("<h5>It appears your search returned no results.</h5>");
    }

}

// When changing the search, reset to the first page.
function resetPagination() {
    pagination['page'] = 1;
    pagination['offset'] = 0;
}