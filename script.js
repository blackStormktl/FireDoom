const firePixalArray=[]
const fireWidth=20
const fireHieght=20
const fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]
function start(){
    createFireDataStruture();
    console.log(firePixalArray)
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation,100)
}

function createFireDataStruture(){
    const numberOfPixel =  fireWidth *  fireHieght

    for(let i = 0 ;  i < numberOfPixel ;  i++){
        firePixalArray[i]=0;
    }
}

function calculateFirePropagation(){
    for(let colummn = 0 ;  colummn <  fireWidth ; colummn++){
         for(let row = 0 ; row < fireHieght ; row++){
            const pixelIndex = colummn + ( fireWidth *  row )
            console.log(pixelIndex)
           updateFireIntersityPerpixel(pixelIndex)
         }
    }
    renderFire()
}


function updateFireIntersityPerpixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth

    if(belowPixelIndex >=  fireWidth *  fireHieght){
        return 
    }

    const decay =Math.floor(Math.random()*3)
    const belowPixelFireIntensity = firePixalArray[belowPixelIndex]
    const newFireIntensity =  belowPixelFireIntensity -  decay
    firePixalArray[currentPixelIndex] =  newFireIntensity
    belowPixelFireIntensity -  decay >= 0 ? belowPixelFireIntensity - decay : 0;
}



function renderFire(){
    const debug = false;
    let html = '<table cellpaddin=0 cellspacing=0>'
     for(let row = 0 ;  row < fireWidth ;  row ++){
          html += '<tr>'

        for(let colum = 0 ; colum < fireWidth;  colum++){

            const pixelIndex = colum + (fireWidth * row)
            const fireIntesity =  firePixalArray[pixelIndex]

            if(debug ===true){
                html+='<td>'
                html+= `<div class="pixel-index">${pixelIndex}</div>`
                html+=fireIntesity;
                html+='</td>'

            }else{
                const color = fireColorsPalette[fireIntesity]
                const colorString =  `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString}")`
                html+='</td>'
            }
    
        }
          html+='</tr>'
     }
    html +='</table>'

    document.querySelector('.firecanvas').innerHTML=html
}


function createFireSource(){
    for(let column =  0 ;  column <= fireWidth ; column++ ){
        const overFlowPixelIndex = fireWidth * fireHieght
        const pixelIndex = (overFlowPixelIndex - fireWidth) +  column

        firePixalArray[pixelIndex] =36;
    }
}
start()