(function(){
    var bigInput = ["L5",
        "R1", "R3", "L4", "R3", "R1", "L3", "L2", "R3", "L5", "L1", "L2", "R5", "L1", "R5", "R1", "L4", "R1", "R3", "L4",
        "L1", "R2", "R5", "R3", "R1", "R1", "L1", "R1", "L1", "L2", "L1", "R2", "L5", "L188", "L4","R1","R4","L3","R47",
        "R1","L1","R77","R5","L2","R1","L2","R4","L5","L1","R3","R187","L4","L3","L3","R2","L3","L5","L4","L4","R1","R5",
        "L4","L3","L3", "L3","L2","L5","R1","L2","R5","L3","L4","R4","L5","R3","R4","L2","L1","L4","R1","L3","R1","R3",
        "L2","R1", "R4","R5","L3","R5","R3","L3","R4","L2","L5","L1","L1","R3","R1","L4","R3","R3","L2","R5","R4","R1",
        "R3","L4","R3","R3","L2","L4","L5","R1","L4","L5","R4","L2","L1","L3","L3","L5","R3","L4","L3","R5","R4","R2","L4",
        "R2","R3","L3","R4","L1","L3","R2","R1","R5","L4","L5","L5","R4","L5","L2","L4","R4","R4","R1","L3","L2","L4","R3"];

    // Ok so if we can transform every state-dependent step into an absolute coordinate change we'll do pretty well.

    var toInstructions = function(instr){
        return {dir: instr[0], len: parseInt(instr.substring(1, instr.length), 10)};
    };

    var input = bigInput.map(toInstructions);

    var direction = function(symbol, left, right){
        var dist = 0;

        return {
            symbol: symbol,
            L: left,
            R: right,
            next: function(direction){
                return this[direction]();
            },
            record: function(length){
                dist += length;
                return dist;
            },
            travel: function(){
                return dist;
            }
        }
    };

    var headings = {};
    headings["N"] = direction("N", function L(){ return headings["W"]}, function R(){return headings["E"]});
    headings["E"] = direction("E", function L(){ return headings["N"]}, function R(){return headings["S"]});
    headings["S"] = direction("S", function L(){ return headings["E"]}, function R(){return headings["W"]});
    headings["W"] = direction("W", function L(){ return headings["S"]}, function R(){return headings["N"]});

    var Dude = function(){
        var heading = headings["N"];

        return {
            step: function (instr) {
                heading = heading.next(instr.dir);
                heading.record(instr.len);
            }
        }
    };

    var dude = new Dude();

    input.forEach(dude.step);

    for (var symbol in headings){
        var heading = headings[symbol];
        console.log(symbol, ":", heading.travel());
    }

    var xpos = headings.E.travel() - headings.W.travel();
    var ypos = headings.N.travel() - headings.S.travel();

    var dist = Math.abs(xpos) + Math.abs(ypos);

    console.log({x: xpos, y:ypos, dist: dist});
})();



