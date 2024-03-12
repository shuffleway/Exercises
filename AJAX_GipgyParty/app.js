//Global variables.
const $gifArea = $('.gif-area');
const $searchGifInput = $('.input-gif');


//This method receieves the responds, get a random gif image, 
//create htnl and append it to the gif area container
function addGif(res){
    let index = res.data.data.length;
    
    if(index)
    {
        let randomIndex = Math.floor(Math.random() * index);
        let $divImag = $('<div>', {class: 'img-div'});
        let $newGif = $('<img>', {src : res.data.data[randomIndex].images.original.url, class: 'img-gif'})

        $divImag.append($newGif);
        $gifArea.append($divImag);


    }
}

//This method get api response, and pass it to the addGif method to append the requested value.
$('form').on('submit', async function(e){
    e.preventDefault();
    
   const res = await axios.get('https://api.giphy.com/v1/gifs/search', 
   {params: {q: $searchGifInput.val(), api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'}});
   $searchGifInput.val('');
   addGif(res);
} )

//This method delete the whole div element containing the gif image. 
$('#remove1').on('click', function(){
    $('.gif-area').empty();
});

