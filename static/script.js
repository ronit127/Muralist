async function update_image() {
    const id = document.getElementById("wallpaper_id").value;

    const res = await fetch('/getImageFromId', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    });

    const data = await res.json(); 
    const path = data.path;        
    console.log("Path:", path);
    if(!path) {
        console.error("No path returned from server.");
        return;
    }
    const img = document.getElementById("wallpaper");
    img.src = path;
    img.style.display = "block"; // Ensure the image is displayed
    console.log("Response received:", res);
}

async function search_image() {
    const theme = document.getElementById("wallpaper_id").value;
    const params = {
        query: theme, 
        categories: "111",
        purity: "100", 
        sorting: "relevance", 
        order: "desc", 
    };
    
    const res = await fetch('/searchImages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    const data = await res.json();
    for(wallpaper of data['data']) {
        console.log("Wallpaper:", wallpaper);

        if(!wallpaper.path) {
            console.error("No path found for wallpaper:", wallpaper);
            continue;
        }

        const img = document.createElement("img");
        
        img.alt = "Wallpaper Image";
        img.src = `/proxyImage?url=${encodeURIComponent(wallpaper.path)}`
       
        img.style.maxWidth = "20%";
        img.style.height = "auto";
        img.style.display = "block";
        
        document.body.appendChild(img);
    }
}


