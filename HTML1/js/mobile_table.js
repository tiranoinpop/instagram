// 공부 노트 공통 : 모바일에서 표를 보기 좋게 만들기 위한 준비 작업
//
// 3칸 이상인 표는 좁은 화면(폰)에서 칸이 너무 좁아져서 글자가 세로로 쪼개져 읽기 힘들다.
// 그래서 모바일(CSS 의 @media 600px 이하)에서는 표의 한 행을 "카드" 하나로 바꿔서 보여준다.
// 이때 각 칸 위에 "무슨 칸인지" 라벨(제목 행의 글자)이 필요하므로, 여기서 아래 두 가지를 미리 붙여 둔다.
//   1. 3칸 이상인 표에 class="stack"          (모바일에서 카드로 쌓을 표라는 표시)
//   2. 각 칸(td)에 data-label="제목 행의 글자"  (CSS 가 ::before 로 라벨을 보여줌)
// PC 화면에서는 CSS 규칙이 적용되지 않으므로 표 모양은 그대로다.

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("table").forEach(function (table) {
        const rows = table.rows                                  // 이 표 자신의 행들 (안에 든 다른 표의 행은 제외)
        if (rows.length < 2) return

        const headRow = rows[0]
        if (!headRow.querySelector("th")) return                 // 제목 행(th)이 없는 표는 그대로 둔다

        const labels = Array.from(headRow.cells).map(function (cell) {
            return cell.textContent.trim()
        })
        if (labels.length < 3) return                            // 2칸 표는 좁아도 읽기 괜찮아서 그대로 둔다

        table.classList.add("stack")
        headRow.classList.add("hdr")

        Array.from(rows).slice(1).forEach(function (row) {
            Array.from(row.cells).forEach(function (cell, i) {
                if (labels[i]) cell.setAttribute("data-label", labels[i])
            })
        })
    })
})
