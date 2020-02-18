var QuestionTitle = [
    {title: "1. Bindend referendum", description: "Er moet een bindend referendum komen, waarmee burgers door het parlement aangenomen wetten kunnen tegenhouden."}, 
    {title: "2. Maatschappelijke dienstplicht", description: "Er moet een maatschappelijke dienstplicht voor jongeren komen. Zij kunnen dan dienen in het leger, bij de politie of in de zorg."}, 
    {title: "3. Anoniem solliciteren", description: "Om discriminatie op basis van de naam te voorkomen, moet anoniem solliciteren bij de overheid en bij openbare instellingen de regel worden."}
];

QuestionTitle.forEach(function(entry) {
    console.log(entry.title);
    document.getElementById("QuestionTitle").innerHTML = entry.title
    document.getElementById("QuestionDescription").innerHTML = entry.description
});

/*
setInterval(function() {   
    document.getElementById("QuestionTitle").innerHTML = entry.title[index++]
    if (index == QuestionTitle.length) {
        index = 0;
    }
}, 1000); 
*/

function toggle_visibility(id) {
    var e = document.getElementById(id); 
    e.style.display = 'block';
    if (e.style.display == 'block') {
        e.style.display = 'none';
        const parsed = parseInt(e.id);
        console.log(parsed + 1);
    } else {
        e.style.display = 'block';
    }
};
