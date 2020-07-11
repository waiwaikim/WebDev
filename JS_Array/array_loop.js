
function printReserve(arr){
    for (let i = arr.length-1; i >=0; i--) {
        console.log(arr[i]);
    }
}
printReserve([5,4,3,2,1]);

function isUniform(arr){
    var first = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if(first !== arr[i]){
            return false;
        }   
    }
    return true;
}

console.log(isUniform([1,1,1,1,1]));
console.log(isUniform([1,2,4]));
console.log(isUniform(["a", "a", "a"]));
console.log(isUniform(["a","a","a", "b"]));


function sumArray(arr){
    var sum=0;
    arr.forEach(e => {
        sum+=e;
    });
    return sum;
}

console.log(sumArray([1,2,3]));
console.log(sumArray([10,3,10,4]));
console.log(sumArray([-5,100]));

function max(arr){
    var myMax = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if(myMax < arr[i]){
            myMax = arr[i];
        }
    }
    return myMax;
}

console.log(max([1,2,3]));
console.log(max([10,3,10,4]));
console.log(max([-5,100]));

