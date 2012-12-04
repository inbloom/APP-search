function processDataForAlignmentArray(allText)	{
    var reader = new FileReader();
    reader.readAsText(allText);
    var output = $.csv2Array(allText);
    for (var i = 1; i < output.length-1; i++)
    {
        dotNotationDisplayArray.push(output[i][2]);
    }
}
