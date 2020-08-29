var movies =  [
    {
        title: "saving private ryan",
        hasWatched: true,
        rating: 5 
    },
    {
        title: "Frozen",
        hasWatched: false,
        rating: 3.5
    },
];

function myMovie(arr){
    arr.forEach(element => {
        var result = "You have ";
        if (element.hasWatched){
            result += "watched ";
        }
        else {
            result += "not watched ";
        }
        result += "\"" + element.title + "\" - "; 
        result += element.rating + " stars.";  
        console.log(result);
    });
}

myMovie(movies);