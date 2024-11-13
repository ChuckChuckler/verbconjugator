function randint(int){
    return Math.floor(Math.random()*int);
}

let tense = "";
let verb = "";
let verbHolder = "";
let person = "";
let number = "";
let mood = "";
let answer = "";
let questionType = "";

let verbs = [['sedeo', 'sedere', 'sedi'], ['audio', 'audire', 'audivi'], ['venio', 'venire', 'veni'], ['interficio', 'interficere', 'interfeci'], ['dico', 'dicere', 'dixi'], ['ambulo', 'ambulare', 'ambulavi'], ['amo', 'amare', 'amavi'], ['scribo', 'scribere', 'scripsi'], ['lego', 'legere', 'legi'], ['bibo', 'bibere', 'bibi'], ['capo', 'capere', 'cepi'], ['ceno', 'cenare', 'cenavi'], ['laudo', 'laudare', 'laudavi']];
let presEndings = [['o', 's', 't'], ['mus', 'tis', 'nt']];
let imprfctEndings = [['bam', 'bas', 'bat'], ['bamus', 'batis', 'bant']];
let perfEndings = [['i', 'isti', 'it'], ['imus', 'istis', 'erunt']];
let pluperfEndings = [['eram', 'eras', 'erat'], ['eramus', 'eratis', 'erant']];
let imprftSubjEndings = [['m', 's', 't'], ['mus', 'tis', 'nt']];
let pluperfSubjEndings = [['issem', 'isses', 'isset'], ['issemus', 'issetis', 'issent']];

function generate(){
    verb = verbs[randint(verbs.length)];
    verbHolder = verb;
    let endings = [];
    let root = "";
    let ind = randint(2)+1;
    if(ind == 1){
        ind=randint(4)+1;
        mood = "indicative";
        if(ind == 1){
            tense = "present";
            endings = presEndings;
            verbTemp = verb[1].replace("ire", "ie");
            if(verbTemp != verb[1]){
                endings[1][2] = "unt";
            }
            root = verb[1].replace("re", "");
        }else if(ind == 2){
            tense = "imperfect";
            endings = imprfctEndings;
            verbTemp = verb[1].replace("ire", "ie");
            if(verbTemp == verb[1]){
                root = verbTemp.replace("re", "");
            }else{
                root = verbTemp;
            }
        }else if(ind == 3){
            tense = "perfect";
            endings = perfEndings;
            root = verb[2].substring(0, verb[2].length-1);
        }else{
            tense = "pluperfect";
            endings = pluperfEndings;
            root = verb[2].substring(0, verb[2].length-1);
        }
    }else{
        mood = "subjunctive";
        ind=randint(2)+1;
        if(ind == 1){
            endings = imprftSubjEndings;
            root = verb[1];
            tense = "imperfect";
        }else{
            endings = pluperfSubjEndings;
            root = verb[2].replace("vi", "");
            verbTemp = verb[2].replace("vi", "");
            if(verbTemp = verb[2]){
                root = verbTemp.substring(0, verbTemp.length-1);
            }
            tense = "pluperfect";
        }
    }
    ind = randint(2)+1;
    if(ind == 1){
        ind = randint(3);
        ind = 0;
        verbTemp = root+endings[0][ind];
        number = "singular";
        if(ind == 0){
            person = "1st";
            if(verb[1].includes("are")){
                verb = verb[0];
            }else{
                verb = verbTemp;
            }
        }else if(ind == 1){
            person = "2nd";
        }else{
            person = "3rd";
        }
    }else{
        ind = randint(3);
        verb = root+endings[1][ind];
        number = "plural";
        if(ind == 0){
            person = "1st";
        }else if(ind == 1){
            person = "2nd";
        }else{
            person = "3rd";
        }
    
    }
    return [verb, person, number, tense, mood, verbHolder];
}

function conj(){
    let results = generate();
    verb = results[0];
    person = results[1];
    number = results[2];
    tense = results[3];
    mood = results[4];
    answer = [person, number, tense, mood];
    document.getElementById("display").innerText = `Conjugate: ${verb}`;
    questionType = "conj";
    document.getElementById("answer").value = "";
    document.getElementById("correct").innerText = "";
    document.getElementById("instrcts").innerText = "Write person (1st/2nd/3rd), number (singular/plural), tense (perfect/imperfect/perfect/pluperfect), and mood (indicative/subjunctive) in any order. \n Example: 3rd singular pluperfect subjunctive";
    document.getElementById("check").style.display = "block";
    document.getElementById("answer").style.display = "block";
}

function formVerb(){
    results = generate();
    verb = results[0];
    answer = verb;
    person = results[1];
    number = results[2];
    tense = results[3];
    mood = results[4];
    verbHolder = results[5];
    document.getElementById("display").innerText = `Form the ${person} person ${number} ${tense} ${mood} of ${verbHolder[0]}, ${verbHolder[1]}, ${verbHolder[2]}`;
    questionType = "form";
    document.getElementById("answer").value = "";
    document.getElementById("correct").innerText = "";
    document.getElementById("instrcts").innerText = "Write only the verb, all lowercase, no spaces or special characters.";
    document.getElementById("check").style.display = "block";
    document.getElementById("answer").style.display = "block";
}

function check(){
    document.getElementById("check").style.display = "none";
    if(questionType == "form"){
        if(document.getElementById("answer").value == answer){
            document.getElementById("correct").innerText = "correct! :D";
        }else{
            document.getElementById("correct").innerText = `Incorrect :( The correct answer is '${answer}'.`;
        }
    }else{
        let answers = document.getElementById("answer").value.split(" ");
        if(answer.includes(answers[0]) && answer.includes(answers[1]) && answer.includes(answers[2]) && answer.includes(answers[3])){
            document.getElementById("correct").innerText = "correct! :D";
        }else{
            document.getElementById("correct").innerText = `Incorrect :( The correct answer is '${answer}'.`;
        }
    }
}