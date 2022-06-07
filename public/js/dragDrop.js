


function drag(){
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.contGraf');
    const attr = document.createAttribute("class");
    
    draggables.forEach(draggable =>{
        
        draggable.addEventListener('dragstart',() =>{
             if(draggable.type == null) {
                attr.value = "dragging";
                draggable.classList.add("dragging")
            }
        })
        draggable.addEventListener('dragend',() =>{
            if(draggable.type == null) {
            // if(draggable.hasAttributeNode("dragging","class") ){
                attr.value = "dragging";
                draggable.classList.remove("dragging");
            }
        })
    })
    containers.forEach(contGraf =>{
        contGraf.addEventListener('dragover', e =>{
            e.preventDefault();
            const draggable = document.querySelector('.dragging')
            const afterElement = getDragAfterElement(contGraf, e.clientY);


            if (afterElement == null){
                contGraf.appendChild(draggable)
            }else if(contGraf.nodeType === Node.ELEMENT_NODE ){
                console.log(contGraf.nodeType)
                contGraf.insertBefore(draggable, afterElement)
            }
        })
    })
    function getDragAfterElement(contGraf, y){
        const draggbleElements = [...contGraf.querySelectorAll('.draggable:not(.dragging)')]
        return draggbleElements.reduce((closest, child)=>{
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2;
            if(offset < 0 && offset > closest.offset) {
                return{offset: offset, element: child}
            } else{
                return closest
            }
        },{offset: Number.NEGATIVE_INFINITY}).element
    }
}