// In the Public Folder of LRMISearch is a file Vocabulary.csv that we need to read in
// We read the file and pass its contents for processing.

function readVocabularyFile() {
    $.ajax({
        type: "GET",
        url: "Vocabulary.csv",
        dataType: "text",
        success: function(data) {processVocabularyInput(data);}
    });
}
