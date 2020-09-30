// Set all the variables and arrays.
var subjectsIndex = 0;
var questionResults = [];
var questionAnswers = [];
var results = [];

/**
This function will display all the questions on request. 
Also it will store the results based on the by the user selected answers.
*/
function nextQuestion(opinion) {
    // display the questions instead of the result page.
    document.getElementById('Questions').style.display = "block";
    document.getElementById('beforeResults').style.display = "none";
    document.getElementById('Results').style.display = "none";  

    resetButtons();
    // If there are more subjects than the index is high, display a new question.
    if (subjectsIndex != subjects.length) { 
        subject = subjects[subjectsIndex];
        partyOpinions = subject.parties;
        checkBox = document.getElementById("addWeight");

        if (opinion == 'skip') {
            questionResults.push({index: subjectsIndex, opinion: opinion});
        } else {
            // loop through all the partyOpinions.
            partyOpinions.forEach(function(subjectItems) {
                if (subjectItems.position == opinion) { 
                    sameAnswer = subjectItems;
                    if (checkBox.checked == true) {
                        // push data to questionResults array.
                        questionResults.push({index: subjectsIndex, answer: sameAnswer.name, opinion: opinion, checked: true});
                        questionResults.push({index: subjectsIndex, answer: sameAnswer.name, opinion: opinion, checked: true});
                    } else {
                        // push data to questionResults array.
                        questionResults.push({index: subjectsIndex, answer: sameAnswer.name, opinion: opinion, checked: false});
                    }
                }
            }); 
        }

        // place the question title and description in the html.
        document.getElementById('QuestionTitle').innerHTML = subjectsIndex+1 +'.'+ ' ' + subject.title;
        document.getElementById('QuestionDescription').innerHTML = subject.statement; 
        
        subjectsIndex++;
    } else {
        document.getElementById('Questions').style.display = "none";
        document.getElementById('beforeResults').style.display = "block";
        document.getElementById('Results').style.display = "none";
    }
}

/**
This function does the oposite of the nextQuestion function.
It will display the previous question.
*/
function previousQuestion() {
    // the index is higher than 0 display the previous question, else go back to homepage.
    if (subjectsIndex != 0) {
        subjectsIndex=subjectsIndex-1;
        subject = subjects[subjectsIndex];
        // place the question title and description in the html.
        document.getElementById('QuestionTitle').innerHTML = subjectsIndex+1 +'.'+ ' ' + subject.title;
        document.getElementById('QuestionDescription').innerHTML = subject.statement;

        questionResults.forEach(function(answers) {
            // Check the checkbox if it was clicked previously. else, uncheck it.
            if ((subjectsIndex == answers.index) && (answers.checked == true)) {
                document.getElementById("addWeight").checked = true;
            } else if ((subjectsIndex == answers.index) && (answers.checked == false)) {
                document.getElementById("addWeight").checked = false;
            }
            // Mark the button that was clicked previously.
            if ((subjectsIndex == answers.index) && (answers.opinion == 'pro')) {
                resetButtons();
                document.getElementById('buttonPro').style.backgroundColor = '#01B4DC';
            } else if ((subjectsIndex == answers.index) && (answers.opinion == 'none')) {
                resetButtons();
                document.getElementById('buttonNone').style.backgroundColor = '#01B4DC';
            } else if ((subjectsIndex == answers.index) && (answers.opinion == 'contra')) {
                resetButtons();
                document.getElementById('buttonContra').style.backgroundColor = '#01B4DC';
            }
        });

    } else { 
        // Go back to homepage.
        window.location.href='Stemwijzer.html';
    }
}

function resetButtons () {
    document.getElementById('buttonPro').style.backgroundColor = 'black';
    document.getElementById('buttonNone').style.backgroundColor = 'black';
    document.getElementById('buttonContra').style.backgroundColor = 'black';
}

function backToFilter () {
    document.getElementById('Questions').style.display = "none";
    document.getElementById('beforeResults').style.display = "block";
    document.getElementById('Results').style.display = "none";
}

/**
This function will calculate which of the parties has the most of the same answers.
*/
function calculateResult(filter) {
    questionResults.forEach(function(questionResults) {
        questionAnswers.push(questionResults.answer);
    });    
    parties.forEach(function(party) {
        if (filter == 'all') {
            results.push(questionAnswers.filter( code => code === party.name)); 
        } else if ((filter == 'secular') && (party.secular == true)) {
            results.push(questionAnswers.filter( code => code === party.name)); 
        } else if ((filter == 'big' ) && (party.size >= 10)) {
            results.push(questionAnswers.filter( code => code === party.name)); 
        }
    }); 

    winningParty = results.reduce(function(a,i,ii) {
        if (ii === 1){
            return a
        };
        if (i.length > a.length){
            return i
        }
        return a
    });
    //display in the html the party which is the closest to your opinion.
    document.getElementById('winningParty').innerHTML = winningParty.shift();

    // display the result page instead of the questions.
    document.getElementById('Questions').style.display = "none";
    document.getElementById('beforeResults').style.display = "none";
    document.getElementById('Results').style.display = "block";
}   


