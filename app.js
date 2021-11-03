let imageUrlList = [];
let titleList = [];
// let imageBtnGet = document.getElementById("image_subreddit").value;
// let quoteBtnGet = document.getElementById("quote_subreddit").value;
let imageBtnGet = document.getElementById("image_subreddit");
let quoteBtnGet = document.getElementById("quote_subreddit");








function fetchImageUrls( image_subreddit_value ) {
    fetch(`https://www.reddit.com/r/${image_subreddit_value}.json`)
    .then(response => 
        response.json())
    .then(body => {
        for (let index=0 ; index<body.data.children.length ; index++) {
            if(body.data.children[index].data.post_hint == 'image') {
                let imageLink = body.data.children[index].data.url_overridden_by_dest;
                // Reddit API image link
                imageUrlList.push(imageLink);                
            }
        }

    }  
    );
}

function fetchTitles( quote_subreddit_value ) {
    fetch(`https://www.reddit.com/r/${quote_subreddit_value}.json`)
    .then(response => 
        response.json())
    .then(body => {
        for (let index=0 ; index<body.data.children.length ; index++) {
            let postTitle = body.data.children[index].data.title;
            // Reddit API image link
            titleList.push(postTitle);             
        }

    }  
    );
}


function linkMeme() {
    // Includes 2 second delay to give time for json fetch functions and populating lists used
    setTimeout(() => {
        console.log(imageUrlList.length);





        
        let parentDiv = document.createElement('div');
        parentDiv.id = 'memes';
        for (let index=0 ; index<imageUrlList.length ; index++) {

            let div = document.createElement('div');
            let h4 = document.createElement('h4');
            let image = document.createElement('img');
            image.src = imageUrlList[index];
            // Reddit API Post title
            h4.textContent = titleList[index];
            div.appendChild(h4);
            div.appendChild(image);
            parentDiv.appendChild(div);

        }
    document.body.appendChild(parentDiv);







    }, 2000);
}

function fetchDankMemes() {
    if (document.getElementById('memes')) {
    document.getElementById('memes').remove();
    }

    let quote = quoteBtnGet.value;
    let image = imageBtnGet.value;
    console.log(quote);
    console.log(image);
    fetchTitles(quote);
    fetchImageUrls(image);
    linkMeme();
    // console.log(titleList);
    // console.log(imageUrlList);


    colorChange();
}




function updateImageLink() {
    let image = imageBtnGet.value;
    return image;
}

imageBtnGet.addEventListener("click", updateImageLink);




// function fetchMemes() {
//     colorChange();

//     /*
//     r/stockimages 
//     r/shittystockphotos
//     */

//     if (document.getElementById('memes')) {
//         document.getElementById('memes').remove();
//     }


//     let parentDiv = document.createElement('div');
//     parentDiv.id = 'memes';
//     fetch(`https://www.reddit.com/r/memes.json`)
//     .then(response => 
//         response.json())
//     .then(body => {
//             for (let index=0 ; index<body.data.children.length ; index++) {
//                 if(body.data.children[index].data.post_hint == 'image') {
//                     let div = document.createElement('div');
//                     let h4 = document.createElement('h4');
//                     let image = document.createElement('img');
//                     // Reddit API image link
//                     image.src = body.data.children[index].data.url_overridden_by_dest;
//                     // Reddit API Post title
//                     h4.textContent = body.data.children[index].data.title;
//                     div.appendChild(h4);
//                     div.appendChild(image);
//                     parentDiv.appendChild(div);
//                 }
// }
//     document.body.appendChild(parentDiv);
//     }
// );
// }