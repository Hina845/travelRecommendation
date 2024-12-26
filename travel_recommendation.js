const popup = document.getElementById('popup');

function show_popup(data) {
}

async function query(text) {
    text = text.toLowerCase();
    console.log(text);
    var keyword = {"beach": "beaches",
                   "beaches": "beaches",
                   "country": "countries",
                   "countries": "countries",
                   "temple": "temples",
                   "temples": "temples"};
    
    const popup = document.getElementById('popup'); 
    
    const img = document.getElementById('pop_up_img');
    const title = document.getElementById('pop_up_title');
    const desc = document.getElementById('pop_up_desc');
    const function_field = document.getElementById('function');
    const next_btn = document.getElementById('next_btn');
    const prev_btn = document.getElementById('prev_btn');

    if (text in keyword) {
        popup.style.display = 'flex';
        popup.style.height = '80%';
        function_field.style.display = 'flex';
        img.style.display = 'block';
        title.style.display = 'block';
        await fetch('travel_recommendation_api.json').then(response => {
            response.json().then (data => {
                
                if (text == 'countries' || text == 'country') {
                    places = [];
                    data["countries"].forEach(element => {
                        element['cities'].forEach(city => {
                            places.push(city);
                        });
                    });
                } else places = data[keyword[text]];

                let current_element = 0;

                img.src = 'images/' + places[0].imageUrl;
                title.innerHTML = places[0].name;
                desc.innerHTML = places[0].description;

                next_btn.addEventListener('click', () => {
                    current_element = (current_element + 1) % places.length;
                    img.src = 'images/' + places[current_element].imageUrl;
                    title.innerHTML = places[current_element].name;
                    desc.innerHTML = places[current_element].description;
                });

                prev_btn.addEventListener('click', () => {
                    current_element--;
                    if (current_element < 0) current_element = places.length - 1;
                    img.src = 'images/' + places[current_element].imageUrl;
                    title.innerHTML = places[current_element].name;
                    desc.innerHTML = places[current_element].description;
                });
            });
        }).catch(error => {
            console.log(error);
        })
    } else {
        popup.style.display = 'flex';
        popup.style.height = '20%';
        img.style.display = 'none';
        function_field.style.display = 'none';
        title.style.display = 'none';
        desc.innerHTML = "No results found";
    }
}

const search_bar = document.getElementById('search_bar');
const search_btn = document.getElementById('search_btn');
const cls_btn = document.getElementById('cls_btn');

search_btn.addEventListener('click', () => {
    result = query(search_bar.value);
    console.log(result);
});

cls_btn.addEventListener('click', () => {
    popup.style.display = 'none';
    search_bar.value = '';
});


