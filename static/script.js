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
    
    const params = {
        query: "volcano", // Example search query
        categories: "111", // Example category (e.g., nature)
        purity: "100", // Example purity (e.g., sfw)

        sorting: "relevance", // Example sorting (e.g., relevance)
        order: "desc", // Example order (e.g., descending)
       
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
        img.src = wallpaper.path;
        img.style.maxWidth = "20%";
        img.style.height = "auto";
        img.style.display = "block";

        img.onerror = function() {
            const proxyUrl = "https://corsproxy.io/?";
            const imgUrl = wallpaper.path; 

            const img = new Image();
            img.src = proxyUrl + encodeURIComponent(imgUrl);
            console.error("Error loading image:", img.src);
            img.style.display = "none"; 
            img.href = "https://wallhaven.cc/w/" + wallpaper.id;
        };
        

        document.body.appendChild(img);
    }
}