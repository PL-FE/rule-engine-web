export const resizeDirectie = {
    mounted (el, binding) {
        const dragDom = el
        const { modifiers } = binding
        let { x, y } = modifiers
        if (!x && !y) {
            x = true
        }
        // 获取dragDom元素的css有没有定位属性，没有则添加
        const style = window.getComputedStyle(dragDom, null)
        if (style.position === 'static') {
            dragDom.style.position = 'relative'
        }
        if (x) {
            const dragDomRight = document.createElement('div')
            dragDomRight.classList.add('dragDomRight')
            dragDomRight.style.cursor = 'col-resize'
            dragDomRight.style.position = 'absolute'
            dragDomRight.style.right = '0'
            dragDomRight.style.top = '0'
            dragDom.appendChild(dragDomRight)
            // 拖动dragDomRight，改变dragDom的宽度
            dragDomRight.onmousedown = (e) => {
                const clientX = e.clientX
                const offsetWidth = dragDom.offsetWidth
                document.onmousemove = (e) => {
                    e.preventDefault()
                    dragDom.style.width = e.clientX - clientX + offsetWidth + 'px'
                }
                document.onmouseup = () => {
                    document.onmousemove = null
                    document.onmouseup = null
                }
            }
        } else {
            const dragDomTop = document.createElement('div')
            dragDomTop.classList.add('dragDomTop')
            dragDomTop.style.cursor = 'row-resize'
            dragDomTop.style.position = 'absolute'
            dragDomTop.style.left = '0'
            dragDomTop.style.top = '0'
            dragDom.appendChild(dragDomTop)
            dragDomTop.onmousedown = (e) => {
                const offsetHeight = dragDom.offsetHeight
                const clientY = e.clientY
                document.onmousemove = (e) => {
                    e.preventDefault()
                    dragDom.style.height = clientY - e.clientY + offsetHeight + 'px'
                }
                document.onmouseup = () => {
                    document.onmousemove = null
                    document.onmouseup = null
                }
            }
        }
    }
}