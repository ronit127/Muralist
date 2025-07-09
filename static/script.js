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
        query: theme, // Example search query
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
      
       
        img.style.maxWidth = "20%";
        img.style.height = "auto";
        img.style.display = "block";

        img.onload = () => {
            document.body.appendChild(img);
        };


        img.onerror = function() {
            console.warn("Error loading image:", img.src);
            img.onerror = null;
            img.src = `/proxyImage?url=${encodeURIComponent(wallpaper.path)}`; // Only use this if things dont work with regular path
        };
        

        img.src = wallpaper.path; // Use the path directly
    }
}