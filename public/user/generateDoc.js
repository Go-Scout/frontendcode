let data = {}
const dataElems = {
    name: document.querySelector("#name"),
    exitVelo: document.querySelector("#exitVelo"),
    infieldVelo: document.querySelector("#infieldVelo"),
    outfieldVelo: document.querySelector("#outfieldVelo"),
    popTime: document.querySelector("#popTime"),
    catcherVelo: document.querySelector("#catcherVelo"),
    fastballVelo: document.querySelector("#fastballVelo"),
    maxFastball: document.querySelector("#maxFastball"),
    sixtyyardVelo: document.querySelector("#sixtyyardVelo"),
    curveballVelo: document.querySelector("#curveballVelo"),
    changeupVelo: document.querySelector("#changeupVelo"),
    sliderVelo: document.querySelector("#sliderVelo"),
    splitterVelo: document.querySelector("#splitterVelo"),
    cutterVelo: document.querySelector("#cutterVelo"),
    knuckleVelo: document.querySelector("#knuckleVelo"),
    forkVelo: document.querySelector("#forkVelo"),
}
data = {
    name: dataElems.name.value,
    exitVelo: dataElems.exitVelo.value,
    infieldVelo: dataElems.infieldVelo.value,
    outfieldVelo: dataElems.outfieldVelo.value,
    popTime: dataElems.popTime.value,
    catcherVelo: dataElems.catcherVelo.value,
    fastballVelo: dataElems.fastballVelo.value,
    maxFastball: dataElems.maxFastball.value,
    sixtyyardVelo: dataElems.sixtyyardVelo.value,
    curveballVelo: dataElems.curveballVelo.value,
    changeupVelo: dataElems.changeupVelo.value,
    sliderVelo: dataElems.sliderVelo.value,
    splitterVelo: dataElems.splitterVelo.value,
    cutterVelo: dataElems.cutterVelo.value,
    knuckleVelo: dataElems.knuckleVelo.value,
    forkVelo: dataElems.forkVelo.value,
}
const generate = () => {
    const doc = new docx.Document({
        creator: "GoScout",
        description: "Your generated player report.",
        title: `${data.name} Report`,
    })
    doc.addSection({
        properties: {},
        children: [
            new Paragraph({
                children: [
                    new TextRun(`Player ${data.name} had a pop-time of ${data.popTime} and a Knuckle Velocity of ${data.knuckleVelo}`),
                ],
            }),
        ],
    })
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(`${data.name}.docx`, buffer);
    })
}
