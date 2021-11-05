let imageUrlList = [];
let titleList = [];
let imageBtnGet = document.getElementById("image_subreddit");
let quoteBtnGet = document.getElementById("quote_subreddit");
let image = imageBtnGet.value;
let quote = quoteBtnGet.value;
let imageTextField = document.getElementById('image_text_box');
let titleTextField = document.getElementById('title_text_box');

const memeBtn = document.getElementById('memeBtn');
const bg = ["#ff3381", "#93f", "#f56", "#eeff00", "#003cff"];
const fg = ["#111", "#fff", "#111", "#111", "#fff"];

function colorChange() {
    let limit = bg.length;
    let index = Math.floor(Math.random() * limit);
    memeBtn.style.background = bg[index];
    memeBtn.style.color = fg[index];
}

function fetchImageUrls() {
    let image_subreddit_value = "";
    let imageTextValue = imageTextField.value;  

    if (imageTextValue.length > 0) {
        image_subreddit_value = imageTextValue;
        console.log(image_subreddit_value);
    } else {
        image_subreddit_value = updateImageLink();
    }
    console.log(image_subreddit_value);

    // let image_subreddit_value = updateImageLink();
    // console.log(image_subreddit_value);
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


function fetchTitles() {
    let quote_subreddit_value = "";
    let titleTextValue = titleTextField.value;  
    if (titleTextValue.length > 0) {
        quote_subreddit_value = titleTextValue;
        console.log(quote_subreddit_value);
    } else {
        quote_subreddit_value = updateQuoteLink();
    }
    console.log(quote_subreddit_value);
    // let quote_subreddit_value = updateQuoteLink();
    // console.log(quote_subreddit_value);
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
    // Includes 1 second delay to give time for json fetch functions and populating lists used
    setTimeout(() => {
        // console.log(imageUrlList.length);      
        let parentDiv = document.createElement('div');
        parentDiv.id = 'memes';
        for (let index=0 ; index<imageUrlList.length ; index++) {
            let div = document.createElement('div');
            let h4 = document.createElement('h4');
            let image = document.createElement('img');
            image.src = imageUrlList[index];
            console.log(image.src);
            // Reddit API Post title
            h4.textContent = titleList[index];
            div.appendChild(h4);
            div.appendChild(image);
            parentDiv.appendChild(div);
        }
    document.body.appendChild(parentDiv);
    }, 1000);
}

/*
Clears content lists or else original content will keep showing as the new content is added to the
end of list after original data fetch - and - only the first 20 odd items on list will be displayed
*/
function clearLists() {
    imageUrlList = [];
    titleList = [];
}


function fetchDankMemes() {
    if (document.getElementById('memes')) {
        document.getElementById('memes').remove();
    }

    let quote = quoteBtnGet.value;
    let image = imageBtnGet.value;
    // console.log(quote);
    // console.log(image);
    fetchTitles();
    fetchImageUrls();
    linkMeme();
    let imageTextValue = imageTextField.value;
    let titleTextValue = titleTextField.value;   
    console.log(imageTextValue);
    console.log(titleTextValue);
    // console.log(titleList);
    // console.log(imageUrlList);

    clearLists();
    colorChange();
}




function updateImageLink() {
    let image = imageBtnGet.value;
    // console.log(image);
    return image;
}

function updateQuoteLink() {
    let quote = quoteBtnGet.value;
    // console.log(quote);
    return quote;
}



imageBtnGet.addEventListener("input", updateImageLink);
quoteBtnGet.addEventListener("input", updateQuoteLink);


