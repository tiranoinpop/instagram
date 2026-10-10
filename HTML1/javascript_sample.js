document.addEventListener("DOMContentLoaded",
     function(e) {
        let configID = document.querySelector("#id i")
        let idText = document.querySelector("#id span")

        configID.addEventListener("click",
            function(e) {
                idText.textContent = prompt("변경할 아이디를 입력하세요")
            }
        )

        let profileEditBtn = document.querySelector("#profile_info button")
        let userInfo = document.querySelector("#userInfo")
        let summary = document.querySelector("#summary")
        let profileDetail = document.querySelector("#profileDetail a")
        let changing =false

        profileEditBtn.addEventListener("click",
            function(e) {
                if(changing) {
                    let _userinfo = userInfo.querySelector("input").value
                    let _summary = summary.querySelector("input").value
                    let _profileDetail = profileDetail.querySelector("input").value

                    userInfo.textContent = _userinfo
                    summary.textContent = _summary

                    if (_profileDetail.startsWith("http://") || _profileDetail.startsWith("https://")) {
                        _profileDetail = "<a href='" + _profileDetail + "'>" + _profileDetail + "</a>"
                    }

                    profileDetail.innerHTML = _profileDetail
                    e.target.textContent = "프로필 편집"
                    changing = false
                }
                else {
                    let _userinfo = userInfo.textContent
                    let _summary = summary.textContent
                    let _profileDetail = profileDetail.textContent

                    userInfo.innerHTML = "<input type='text' value='" + _userinfo + "'/>"
                    summary.innerHTML = "<input type='text' value='" + _summary + "'/>"
                    profileDetail.innerHTML = "<input type='text' value='" + _profileDetail + "'/>"
                    e.target.textContent = "프로필 편집 완료"
                    changing = true
                }
            }
        )

    }
)