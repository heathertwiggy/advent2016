(function(window, document, undefined){

    // we're gonna need a bigger state machine.
    // not sufficiently large to warrant automatic construction tho.
    function Keypad() {
        let keypad = {};
        const key = function(symbol, up, right, down, left){
            return {
                symbol,
                U: () => keypad[up],
                R: () => keypad[right],
                D: () => keypad[down],
                L: () => keypad[left]
            }
        };

//          1
//        2 3 4
//      5 6 7 8 9
//        A B C
//          D

        keypad['1'] = key('1', '1', '1', '3', '1');
        keypad['2'] = key('2', '2', '3', '6', '2');
        keypad['3'] = key('3', '1', '4', '7', '2');
        keypad['4'] = key('4', '4', '4', '8', '3');
        keypad['5'] = key('5', '5', '6', '5', '5');
        keypad['6'] = key('6', '2', '7', 'A', '5');
        keypad['7'] = key('7', '3', '8', 'B', '6');
        keypad['8'] = key('8', '4', '9', 'C', '7');
        keypad['9'] = key('9', '9', '9', '9', '8');
        keypad['A'] = key('A', '6', 'B', 'A', 'A');
        keypad['B'] = key('B', '7', 'C', 'D', 'A');
        keypad['C'] = key('C', '8', 'C', 'C', 'B');
        keypad['D'] = key('D', 'B', 'D', 'D', 'D');

        return keypad;
    }
    const keypad = Keypad();

    // run

    const testInput = [
        "ULL",
        "RRDDD",
        "LURDL",
        "UUUUD"
    ];

    const input = [
        "UULLULLUULLLURDLDUURRDRRLDURDULLRURDUDULLLUULURURLRDRRRRULDRUULLLLUUDURDULDRRDRUDLRRLDLUDLDDRURURUURRRDDDLLRUDURDULUULLRRULLRULDUDRDRLDLURURUDDUDLURUDUDURLURURRURLUDDRURRDLUURLLRURRDUDLULULUDULDLLRRRDLRDLDUDRDDDRRUURRRRRUURRDRRDLURDRRURDLLUULULLRURDLDDDRRLLRRUURULURUUDDLRRUDDRURUUDLRLRDLRURRRDULLDLRUDDUULRDULURUURDULUDLLRRLDDLRDLRUDRLDDRLRRRDURDULLRRRDRRLUURURDRRDRRLDLUDURURLDUURDRUDRDDRLDRRLDLURURULLUURUDUUDLRLL",
        "LLLULLULDDULRLLURLLLRUUDDLRUULRLULLDLLRRDRLRLRLLDRUUURULDRDDLUDLLDUDULLLRLULLLRULDRDRUDLLRLRLLUDULRRRLDRUULDDULLDULULLUDUDLDRDURDLDLLDUDRRRDLUURRUURULLURLDURLRRLLDDUUULDRLUUDUDLURLULUDURRDRLLDDDDDRRULLRLDULULDDRUURRDLUDDDUDURDDRDRULULLLLUURDURUUUULUDLRURRULRDDRURURLLRLUUDUUURDLLDDLUDRLLLUDLLLLULRLURDRRRDUUDLLDLDDDURRDDRURUURDDRURRLDDDURDLLUURUUULRLUURRUDRLLDLURDUDRLULDLRLULULUDDLRDUDRUDLUULUULDURDRRRRLRULLUDRDDRDLDUDRDRRLDLLLLUDDLRULDLLDDUULDDRRULRRUURUDRDURLLLDDUUDRUUDLULLDR",
        "UDUUULLDDDDLUDLDULRLRDLULLDDRULDURRLURRUDLRRUDURRDUDRRRUULRLLRLUDLDRRDUURDDRDRDUUUDUDLDLLRRLUURLUUUDDDUURLULURRLURRRDRDURURUDRLRUURUDRUDDDRDRDLDRDURDLDRRDUUDLLURLDDURRRLULDRDRLLRLLLRURLDURDRLDRUURRLDLDRLDDDRLDLRLDURURLLLLDDRDUDLRULULLRDDLLUDRDRRLUUULDRLDURURDUDURLLDRRDUULDUUDLLDDRUUULRRULDDUDRDRLRULUUDUURULLDLLURLRRLDDDLLDRRDDRLDDLURRUDURULUDLLLDUDDLDLDLRUDUDRDUDDLDDLDULURDDUDRRUUURLDUURULLRLULUURLLLLDUUDURUUDUULULDRULRLRDULDLLURDLRUUUDDURLLLLDUDRLUUDUDRRURURRDRDDRULDLRLURDLLRRDRUUUURLDRURDUUDLDURUDDLRDDDDURRLRLUDRRDDURDDRLDDLLRR",
        "ULDRUDURUDULLUDUDURLDLLRRULRRULRUDLULLLDRULLDURUULDDURDUUDLRDRUDUDDLDRDLUULRRDLRUULULUUUDUUDDRDRLLULLRRDLRRLUDRLULLUUUUURRDURLLRURRULLLRLURRULRDUURRLDDRRDRLULDDRRDRLULLRDLRRURUDURULRLUDRUDLUDDDUDUDDUDLLRDLLDRURULUDRLRRULRDDDDDRLDLRRLUUDLUURRDURRDLDLDUDRLULLULRLDRDUDLRULLULLRLDDRURLLLRLDDDLLLRURDDDLLUDLDLRLUULLLRULDRRDUDLRRDDULRLLDUURLLLLLDRULDRLLLUURDURRULURLDDLRRUDULUURRLULRDRDDLULULRRURLDLRRRUDURURDURDULURULLRLDD",
        "DURLRRRDRULDLULUDULUURURRLULUDLURURDDURULLRRUUDLRURLDLRUDULDLLRRULLLLRRLRUULDLDLLRDUDLLRLULRLLUUULULRDLDLRRURLUDDRRLUUDDRRUDDRRURLRRULLDDULLLURRULUDLRRRURRULRLLLRULLRRURDRLURULLDULRLLLULLRLRLLLDRRRRDDDDDDULUUDUDULRURDRUDRLUULURDURLURRDRRRRDRRLLLLUDLRRDURURLLULUDDLRLRLRRUURLLURLDUULLRRDURRULRULURLLLRLUURRULLLURDDDRURDUDDULLRULUUUDDRURUUDUURURRDRURDUDRLLRRULURUDLDURLDLRRRRLLUURRLULDDDUUUURUULDLDRLDUDULDRRULDRDULURRUURDU"
    ];


    // ok, I can't seem to run the input through my keypad in a *clean* manner.
    // Tried a few flavours of getting the data and I like none of them! hah.

    console.table([testInput, input].map(data =>
        [
            procedural,
            explicitKeys,
            arrayTrix,
            mutableTrix
        ]
        .map(f => f(keypad, data))
        .concat()
    ).concat());

})(window, document);

function procedural(keypad, input){
    const decodeKey = (keypad, start, code) => {
        let key = keypad[start];
        let keys = [];

        for (let i = 0; i < code.length; i++){
            key = key[code[i]]();
            keys.push(key);
        }

        return key.symbol;
    };

    const k0 = "5";
    const k1 = decodeKey(keypad, k0, input[0]);
    const k2 = decodeKey(keypad, k1, input[1]);
    const k3 = decodeKey(keypad, k2, input[2]);
    const k4 = decodeKey(keypad, k3, input[3]);
    const k5 = decodeKey(keypad, k4, input[4] || "");
    console.log("procedural: ", k1,k2,k3,k4,k5);

    document.getElementById("out").innerHTML = [k1,k2,k3,k4,k5].join(" ");
    return [k1,k2,k3,k4,k5].join(" ");
}

function explicitKeys(keypad, input){
    // this is unfortunate
    const explicitKeys = [];
    input.reduce((firstKey, tokens) => {
        const subKey = tokens.split("").reduce((someKey, token) => {
            return someKey[token]();
        }, firstKey);
        explicitKeys.push(subKey.symbol);
        return subKey;
    }, keypad[5]);


    console.log("unfortunate: ", explicitKeys.join(" "));
    return explicitKeys.join(" ");
}

function arrayTrix(keypad, input){
    // well this is awkward
    const keys = [keypad[5]];
    const arrayTrix = input.map(tokens => {
        const seed = keys[keys.length - 1];
        keys.push(tokens.split("").reduce((someKey, token) => {
            return someKey[token]();
        }, seed));

        return keys[keys.length - 1];
    })
        .map(key => key.symbol)
        .join(" ");

    console.log("awkward", arrayTrix);
    return arrayTrix;
}

function mutableTrix(keypad, input){
    // well this is still awkward
    let thing = keypad[5];
    const mutableTrix = input.map(tokens => {
        thing = tokens.split("").reduce((someKey, token) => {
            return someKey[token]();
        }, thing);

        return thing;
    })
        .map(key => key.symbol)
        .join(" ");

    console.log("still awkward", mutableTrix);
    return mutableTrix;
}