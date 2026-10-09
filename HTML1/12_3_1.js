let button = document.querySelector("input")
button.addEventListener("input",
    function(e) {
        console.log(e.target.value)
    }
)
//<script src="12_3_1.js"></script>  src 오퍼랜드를 써서
//html 소스와 분리할수 있음

document.addEventListener("DOMContentLoaded", 
    // 이벤트 핸들러는 이벤트가 발생했을 때 호출되는 함수
    // 그 중 DOMContentLoaded 이벤트는 html 문서가 모두 로드되고 파싱이 완료되었을 때 발생하는 이벤트
    function(e) {
        let button = document.querySelector("input")
        button.addEventListener("input",
            function(e) {
               console.log(e.target.value)
            }
        )
    }
)