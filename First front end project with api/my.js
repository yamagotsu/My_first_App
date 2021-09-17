let timer 
let removeFirstPhotoDelay

//grabs data for dogs then stores it
async function start(){
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    breedList(data.message)
}

start()
// creating the select element
function breedList(list){
document.getElementById("breed").innerHTML = `
<select onchange="showByBreed(this.value)">
<option>Choose a dog breed</option> 
${Object.keys(list).map(function (breed){
    return `<option>${breed}</option>`
}).join("")}
</select>
`

}
//load imagines for a breed
async function showByBreed(breed){
   if(breed !== "Choose a dog breed"){
       const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
       const data = await response.json()
       makeSlideShow(data.message);
   }

}
//create a timed slideshow for breeds
function makeSlideShow(images){
    let position = 0;
    clearInterval(timer)
    clearTimeout(removeFirstPhotoDelay)

    if(images.length > 1) {
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
`
    position += 2
    if(images.length == 2){
        position = 0
    }
    timer = setInterval(nextSlide, 3000)
    }
    else {
        document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>`
    }

    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[position]}')"></div>`)
        removeFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
         } ,1000)
        if(position + 1 >= images.length) {
            position = 0;
        }
        else{
            position++;
        }
    }
}
