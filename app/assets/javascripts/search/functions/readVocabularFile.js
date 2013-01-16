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
