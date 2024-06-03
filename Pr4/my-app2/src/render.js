const videoselectBtn = document.getElementById("videoSelectBtn"); 
const { desktopCapturer } = require("electron");
const {Menu} = remote;

videoSelectBtn.onclick= getVideoSources;

async function getVideoSources(){
const inputSources = await desktopCapturer.getSources({ 
  types: ["window", "screen"]
});
console.log(inputSources);
const videoOptionsMenu = menu.buildFromTemplate(
    inputSources.map(source => {
        return {
            ladel: source.name,
            click: () => selectSource(source)
        };
    })
);

videoOptionsMenu.popup();
}