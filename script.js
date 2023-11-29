const getUpdate = document.getElementById('getUpdate')
const copyUpdate = document.getElementById('copyUpdate')

const updateContainer = document.getElementById('updateContainer')

const toast = document.querySelector('.toast')

const enumerateArrayToString = (array) => {
    let arrayToString = array
    if (array.length > 1) {
        arrayToString = [...array.slice(0, array.length - 1).map(item => `${item},`), 'and', array[array.length - 1]]
    }
    return arrayToString.join(' ')
}

const getPublishingUpdate = (startDate, endDate, reccurenceDays) => {
    let update = ''

    if (startDate && endDate) {
        update += `This promotion is now scheduled to run from <b>${new Date(startDate).toDateString()} to ${new Date(endDate).toDateString()}</b>`

        if (reccurenceDays.length) {
            update += ` on <b>${enumerateArrayToString(reccurenceDays)}</b>`
        }

        update += `.`
    }


    if (startDate && endDate && reccurenceDays.length) {
        return `<span>${update}</span>`
    }

    return update
}

getUpdate.addEventListener('click', () => {
    let updateHtml = ``

    const finalPat = document.getElementById('finalPat').value
    const filter = document.getElementById('filter').value
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value
    const addedToCarouselSheet = document.getElementById('addedToCarouselSheet').checked

    const affectedComponents = [...document.querySelectorAll('.affectedComponents')]
        .filter(component => component.checked)
        .map(component => component.value)
    const reccurenceDays = [...document.querySelectorAll('.reccurenceDays')]
        .filter(day => day.checked)
        .map(day => day.value)


    updateHtml += `<p>`
    updateHtml += getPublishingUpdate(startDate, endDate, reccurenceDays)
    updateHtml += ` `
    if (affectedComponents.length) {
        if (filter) {
            updateHtml += `<span>I have used the filter <b>${filter}</b> for the <b>${enumerateArrayToString(affectedComponents)}</b>.</span>`
        } else {
            updateHtml += `<span>I have used no filter for the <b>${enumerateArrayToString(affectedComponents)}</b>.</span>`
        }
    }
    updateHtml += ` `
    if (finalPat) {
        updateHtml += `<span>The MPP is now updated with the provided <b>final PAT ${finalPat}</b>.</span>`
    }
    updateHtml += ` `
    if (addedToCarouselSheet) {
        updateHtml += `<span>I have also added this promotion to the <b>carousel sheet</b>.</span>`
    }
    updateHtml += `</p>`


    if (!finalPat) {
        updateHtml += `<br><p>Final PAT is not yet provided. </p>`
    }

    updateContainer.innerHTML = updateHtml
    copyUpdate.disabled = false
})

copyUpdate.addEventListener('click', () => {
    const updateContainer = document.getElementById('updateContainer')

    const clipboard = [new ClipboardItem({
        ["text/plain"]: new Blob([updateContainer.innerText], { type: "text/plain" }),
        ["text/html"]: new Blob([updateContainer.innerHTML], { type: "text/html" }),
    })]

    navigator.clipboard.write(clipboard)

    const copyAlert = document.createElement('div')
    copyAlert.classList.add('alert', 'alert-info', 'bg-primary', 'text-white', 'opacity-100', 'transition')
    copyAlert.innerHTML = `<span>Update Copied</span>`
    toast.appendChild(copyAlert)

    setTimeout(() => {
        // toast.removeChild(copyAlert)
        copyAlert.classList.add('opacity-0')
    }, 2000)

})
