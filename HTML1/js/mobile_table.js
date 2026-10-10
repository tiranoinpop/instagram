// 공부 노트 공통 : 모바일에서 표를 보기 좋게 만들기 위한 준비 작업
//
// 칸이 많거나(3칸 이상), 칸 안에 코드 상자 / 입력창이 들어 있는 표는 좁은 화면(폰)에서
// 칸이 너무 좁아져서 글자가 세로로 쪼개져 읽기 힘들다.
// 그래서 모바일(CSS 의 @media 600px 이하)에서는 표의 한 행을 "카드" 하나로 바꿔서 보여준다.
// 이때 각 칸 앞에 "무슨 칸인지" 라벨(제목 행의 글자)이 필요하므로, 여기서 아래를 미리 붙여 둔다.
//   1. 카드로 바꿀 표에 class="stack"            (모바일에서 카드로 쌓을 표라는 표시)
//   2. 각 칸(td)에 data-label="제목 행의 글자"    (CSS 가 ::before 로 라벨을 보여줌)
//   3. 첫 칸에 코드 상자가 든 표는 class="plain"  (첫 칸을 카드 제목처럼 꾸미지 않고 라벨을 보여줌)
// PC 화면에서는 CSS 규칙이 적용되지 않으므로 표 모양은 그대로다.

document.addEventListener("DOMContentLoaded", function () {
    // 코드 상자나 입력창처럼 "넓은 내용"이 들어 있는지 검사할 때 쓰는 선택자
    const WIDE_CONTENT = "pre, form, input, select, button, textarea, img"

    document.querySelectorAll("table").forEach(function (table) {
        const rows = table.rows                                  // 이 표 자신의 행들 (안에 든 다른 표의 행은 제외)
        if (rows.length < 2) return

        const headRow = rows[0]
        if (!headRow.querySelector("th")) return                 // 제목 행(th)이 없는 표는 그대로 둔다

        const labels = Array.from(headRow.cells).map(function (cell) {
            return cell.textContent.trim()
        })
        const bodyRows = Array.from(rows).slice(1)

        // 3칸 이상이거나, 2칸이어도 칸 안에 코드 상자 / 입력창이 있으면 카드로 바꾼다
        const hasWideContent = bodyRows.some(function (row) {
            return row.querySelector(WIDE_CONTENT) !== null
        })
        if (labels.length < 3 && !hasWideContent) return

        table.classList.add("stack")
        headRow.classList.add("hdr")

        // 첫 칸에 코드 상자가 있으면 카드 제목처럼 꾸미지 않는다
        const firstCellHasPre = bodyRows.some(function (row) {
            return row.cells[0] && row.cells[0].querySelector("pre") !== null
        })
        if (firstCellHasPre) table.classList.add("plain")

        bodyRows.forEach(function (row) {
            Array.from(row.cells).forEach(function (cell, i) {
                if (labels[i]) cell.setAttribute("data-label", labels[i])
            })
        })
    })
})
