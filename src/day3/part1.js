(function(window, document, undefined){

    const isPossibleTriangle = row =>
        row[0] + row[1] > row[2] &&
        row[1] + row[2] > row[0] &&
        row[2] + row[0] > row[1];


    const input = document.getElementById("in").textContent
        .split("\n")
        .map(row => row.split(/\s+/)
            .map(n => parseInt(n, 10))
        );

    const possibles = input.filter(isPossibleTriangle);

    document.getElementById('out').textContent = ""+possibles.length;
    console.log(possibles.length);
})(window, document);




