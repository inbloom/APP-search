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

// We process the contents of the Vocabulary CSV data using csv2Array JS.
// We then load this data into arrays to ma

function processVocabularyInput(allText)	{
    var reader = new FileReader();
    reader.readAsText(allText);
    var output = $.csv2Array(allText);
    for (var i = 1; i < output.length-1; i++)
    {
        if (output[i][0] !== "") {window.intendedEndUserRoleArray.push(output[i][0]);}
        if (output[i][1] !== "") {window.educationalUseArray.push(output[i][1]);}
        if (output[i][2] !== "") {window.typicalAgeRangeArray.push(output[i][2]);}
        if (output[i][3] !== "") {window.interactivityTypeArray.push(output[i][3]);}
        if (output[i][4] !== "") {window.mediaTypeArray.push(output[i][4]);}
        if (output[i][5] !== "") {window.learningResourceTypeArray.push(output[i][5]);}
    }
    setFlyoverDivHTML();

}
