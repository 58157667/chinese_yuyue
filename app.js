const form = document.getElementById('bookingForm');
const msgBox = document.getElementById('message');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    msgBox.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    // 姓名非空
    if (!name) {
        msgBox.textContent = '名前を入力してください';
        return;
    }

    // 手机号只能是数字
    const phoneReg = /^\d+$/;
    if (!phoneReg.test(phone)) {
        msgBox.textContent = '電話番号は半角数字のみ入力可能です';
        return;
    }

    // 日期、时间、项目必选
    if (!date) {
        msgBox.textContent = '予約日を選択してください';
        return;
    }
    if (!time) {
        msgBox.textContent = '時間を選択してください';
        return;
    }
    if (!service) {
        msgBox.textContent = 'サービスを選択してください';
        return;
    }

    // 校验通过，可跳转/提交后端
    msgBox.style.color = 'green';
    msgBox.textContent = '予約情報を送信しました';

    // 如需跳转到确认页解开下面注释
    // window.location.href = 'confirm.html';
});
