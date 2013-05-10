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

function processDataForAlignmentArray(allText, jsonStandards)	{
    var lines = allText.split(/\n|\r/);
    for (var i = 1; i < lines.length -1 ; i++) {
       var split = lines[i].split(',');
       var tmp_title = split[2].replace(/(HS[\w])-/, "$1.");
       var notation = '["'+tmp_title.replace(/\./g,'"]["')+'"]';
       try {
         valed = eval("jsonStandards" + notation);  
         dotNotationDisplayArray.push(tmp_title);
       }   
       catch (e) {
         console.log(tmp_title);
       }   
    }
}
