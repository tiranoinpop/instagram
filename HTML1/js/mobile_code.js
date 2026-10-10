// 공부 노트 공통 : 모바일에서 코드 상자를 읽기 좋게 만들기
//
// 폰은 화면이 좁아서, 가로로 긴 코드를 줄바꿈하면 구조가 무너져서 읽기 어렵다.
// 그래서 모바일(화면 너비 600px 이하)에서만 코드 상자의 "보이는 모양"을 아래처럼 바꾼다.
//   1. 들여쓰기를 절반으로 줄인다      (4칸 → 2칸 : 같은 구조를 더 좁은 폭에 표시)
//   2. 줄 끝에 붙은 설명(주석)을 다음 줄로 내린다   ( 코드   // 설명  →  코드 줄 + 설명 줄 )
//      주석 앞의 맞춤용 공백이 사라져서 한 줄이 훨씬 짧아진다.
// PC 화면으로 돌아오면 원래 코드로 되돌린다. 코드의 내용 자체는 바뀌지 않는다. (공백과 줄 위치만 달라짐)

(function () {
    const query = window.matchMedia("(max-width: 600px)")

    // 줄 끝 주석 : 코드 뒤에 공백 2칸 이상 + ( // 설명  |  /* 설명 */  |  <!-- 설명 --> )
    const TRAILING_COMMENT = /^(.*\S)\s{2,}(\/\/.*|\/\*.*\*\/|<!--.*-->)\s*$/

    function mobileLines(original) {
        const out = []
        original.split(/\r?\n/).forEach(function (line) {
            // 1. 들여쓰기 절반
            const m = line.match(/^( +)(.*)$/)
            let indent = ""
            let body = line
            if (m) {
                indent = " ".repeat(Math.ceil(m[1].length / 2))
                body = m[2]
            }

            // 2. 줄 끝 주석을 다음 줄로
            const c = body.match(TRAILING_COMMENT)
            if (c) {
                out.push({ text: indent + c[1], comment: false })
                out.push({ text: indent + c[2], comment: true })
            } else {
                out.push({ text: indent + body, comment: false })
            }
        })
        return out
    }

    function apply(code) {
        if (code.dataset.original === undefined) code.dataset.original = code.textContent
        const lines = mobileLines(code.dataset.original)
        code.textContent = ""
        lines.forEach(function (line, i) {
            if (i > 0) code.appendChild(document.createTextNode("\n"))
            if (line.comment) {
                const span = document.createElement("span")
                span.className = "cmt"
                span.textContent = line.text
                code.appendChild(span)
            } else {
                code.appendChild(document.createTextNode(line.text))
            }
        })
    }

    function restore(code) {
        if (code.dataset.original !== undefined) code.textContent = code.dataset.original
    }

    function update() {
        document.querySelectorAll("pre code").forEach(function (code) {
            if (query.matches) apply(code)
            else restore(code)
        })
    }

    document.addEventListener("DOMContentLoaded", update)
    // 폰을 가로로 돌리거나 창 크기를 바꿔서 기준(600px)을 넘나들 때도 다시 적용
    if (query.addEventListener) query.addEventListener("change", update)
})()
