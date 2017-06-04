(function(window, document, undefined){

    const isPossibleTriangle = row =>
    row[0] + row[1] > row[2] &&
    row[1] + row[2] > row[0] &&
    row[2] + row[0] > row[1];


    const input = document.getElementById("in").textContent.trim()
        .split("\n")
        .map(row => row.trim().split(/\s+/)
            .map(n => parseInt(n, 10))
        );


    // curse it
    const rows = input.length;
    if (rows % 3 != 0) throw new Error("can't do it boss");

    function readTri(row, col){
        return [input[row][col], input[row+1][col], input[row+2][col]];
    }

    // it's treason, then.
    const triangles = [];
    for (let row = 0; row < rows; row+=3){
        for (let col = 0; col < 3; col++){
            triangles.push(readTri(row, col));
        }
    }

    const possibles = triangles.filter(isPossibleTriangle);

    document.getElementById('out').textContent = ""+possibles.length;
    console.log(possibles.length);
})(window, document);
