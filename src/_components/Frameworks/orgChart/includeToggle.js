export function toggleColorAll(cname,color){

    const  elements = document.getElementsByClassName(cname);
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('stroke', color);
        elements[i].setAttribute('stroke-width', 2.5);


    }

}
