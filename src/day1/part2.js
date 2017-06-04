(function(){
    const bigInput = ["L5",
        "R1", "R3", "L4", "R3", "R1", "L3", "L2", "R3", "L5", "L1", "L2", "R5", "L1", "R5", "R1", "L4", "R1", "R3", "L4",
        "L1", "R2", "R5", "R3", "R1", "R1", "L1", "R1", "L1", "L2", "L1", "R2", "L5", "L188", "L4","R1","R4","L3","R47",
        "R1","L1","R77","R5","L2","R1","L2","R4","L5","L1","R3","R187","L4","L3","L3","R2","L3","L5","L4","L4","R1","R5",
        "L4","L3","L3", "L3","L2","L5","R1","L2","R5","L3","L4","R4","L5","R3","R4","L2","L1","L4","R1","L3","R1","R3",
        "L2","R1", "R4","R5","L3","R5","R3","L3","R4","L2","L5","L1","L1","R3","R1","L4","R3","R3","L2","R5","R4","R1",
        "R3","L4","R3","R3","L2","L4","L5","R1","L4","L5","R4","L2","L1","L3","L3","L5","R3","L4","L3","R5","R4","R2","L4",
        "R2","R3","L3","R4","L1","L3","R2","R1","R5","L4","L5","L5","R4","L5","L2","L4","R4","R4","R1","L3","L2","L4","R3"];

    const toInstructions = instr => ({dir: instr[0], len: parseInt(instr.substring(1, instr.length), 10)});
    const input = bigInput.map(toInstructions);

    const direction = function(symbol, left, right, delta){
        return {
            symbol: symbol,
            L: left,
            R: right,
            delta: delta,
            next: function(direction){
                return this[direction]();
            }
        }
    };

    let headings = {
        N: direction("N", () => headings["W"], () => headings["E"], (length) => Pos(0, +length)),
        E: direction("E", () => headings["N"], () => headings["S"], (length) => Pos(+length, 0)),
        S: direction("S", () => headings["E"], () => headings["W"], (length) => Pos(0, -length)),
        W: direction("W", () => headings["S"], () => headings["N"], (length) => Pos(-length, 0))
    };

    let Pos = (x, y) => ({x: x, y: y, key: x.toString() + "/" + y.toString()});

    const Dude = function(){
        let heading = headings["N"];
        let visited = [];
        let pos = Pos(0,0);

        visited.push(pos.key);

        const move = delta => (Pos(pos.x + delta.x, pos.y + delta.y));

        return {
            step: function (instr) {
                heading = heading.next(instr.dir);

                // I had originally misunderstood part 2 and thought it still just counted endpoints
                // so the structure isn't optimal for the problem. Oh well. Let's brute force:
                for (let i = 0; i < instr.len; i++){
                    pos = move(heading.delta(1));
                    if (visited.includes(pos.key)){
                        return pos;
                    }
                    visited.push(pos.key);
                }
                return false;
            },
            position: () => pos
        }
    };

    const dude = new Dude();

    input.some(dude.step); // some terminates on first truthy callback result, i.e. when we've found it.
    console.log(dude.position(), Math.abs(dude.position().x) + Math.abs(dude.position().y));
})();



