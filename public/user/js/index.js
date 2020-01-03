document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('attBtn')) {
        this.target.classList.add('active')
    }
}, false)