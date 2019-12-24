/*
data = players[{stats}]



*/

const elems = {

}


let data = {}

const sectionLabels = document.getElementsByClassName("section-label")

for (label of sectionLabels) {
    console.log("a")
    data[label.innerHTML.replace(" ", "_").replace(":", "")] = ""
}


function updateData() {

}