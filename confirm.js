const API_URL =
    "https://yoyaku8.onrender.com/api/reservations";

const FORMSPREE_URL =
    "https://formspree.io/f/mqenwlpa";

const booking =
    JSON.parse(
        localStorage.getItem("booking")
    );

const confirmArea =
    document.getElementById("confirmArea");

confirmArea.innerHTML = `

<p>姓名：${booking.name}</p>

<p>电子邮件：${booking.email}</p>

<p>电话：${booking.phone}</p>

<p>预约日期：${booking.reserveDate}</p>

<p>预约时间：${booking.reserveTime}</p>

<p>预约项目：${booking.service}</p>

`;

document
    .getElementById("submitBtn")
    .addEventListener("click", async () => {

        const message =
            document.getElementById("message");

        try {

            // Spring Boot
            const response =
                await fetch(API_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(booking)

                });

            const result =
                await response.text();

            // 时间冲突
            if (!response.ok) {

                message.innerHTML =
                    "<p style='color:red'>"
                    + result +
                    "</p>";

                return;
            }

            // Formspree
            const mailResponse =
                await fetch(FORMSPREE_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"
                    },

                    body:
                        JSON.stringify(booking)

                });

            if (!mailResponse.ok) {

                message.innerHTML =
                    "<p style='color:red'>メール送信失敗</p>";

                return;
            }

            // 清除数据
            localStorage.removeItem("booking");

            // 跳转完成页
            window.location.href =
                "complete.html";

        } catch (error) {

            console.error(error);

            message.innerHTML =
                "<p style='color:red'>システムエラー</p>";

        }

    });
