document.addEventListener("DOMContentLoaded", 
    function(e) {
        let button = document.querySelector("input[type=button]")
        let p = document.querySelector("p")
        button.addEventListener("click", 
            function(e) {
                console.log("JS로 입력함")
                p.textContent = "JS로 입력했어!"
            }
        )
    }
)