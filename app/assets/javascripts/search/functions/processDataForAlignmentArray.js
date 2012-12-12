function processDataForAlignmentArray(allText)	{
    var lines = allText.split(/\n|\r/);
    for (var i = 1; i < lines.length -1 ; i++) {
        var split = lines[i].split(',');
        dotNotationDisplayArray.push(split[2]);
    }
}
