let SMAarray = [[],[],[]];

function demoPinger() {
    for(let i = 0; i < 3; i++) {
        setInterval(async () => {
            let ping = Math.floor((Math.random()+2) * (i+1) * 10);
            if(SMAarray[i].length == 10) {
                SMAarray[i].pop();
            }
            SMAarray[i].unshift(ping);
        },100);

        for(let i = 1; i < 4; i++) {
            setInterval(async () => {
                let avg = Math.round(SMAarray[i-1].reduce((a, b) => a + b) / SMAarray[i-1].length);
                document.getElementById(`demoSite${i}`).innerHTML = `${avg}ms.`

            },1000);
        }
    }
}



demoPinger();