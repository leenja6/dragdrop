export function ghostItem(element, itemID) {
    document.body.addEventListener('dragover', (e) => {
        e.preventDefault()
        if (document.querySelector(element)) {
            const w = document.querySelector(element)
            const r = ((window.screen.width - itemID.w)/2).toFixed()
            w.style.opacity = 1
            w.style.width = itemID.wp + 'px'
            w.style.top = (window.event.pageY - 15) + 'px'
            w.style.left = (window.event.pageX - itemID.c + Number(r)) + 'px'
        }    
    })
}
