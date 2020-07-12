var lis = document.querySelectorAll("li");


for (let i = 0; i < lis.length; i++) {
    const li = lis[i];

    li.addEventListener("mouseover", function(){
        this.classList.add("selected");
    });
    
    li.addEventListener("mouseout", function(){
        this.classList.remove("selected");
    });
    
    li.addEventListener("click", function(){
        li.classList.toggle("done");
    });
};
