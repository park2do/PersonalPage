const registerBtn = document.getElementById('registerBtn')
const registerForm = document.getElementById('registerForm')

registerBtn.addEventListener('click', () => {
    registerForm.style.display = 'block';
    requestAnimationFrame(()=> {
            registerForm.classList.toggle('show')
    })
})


form.addEventListener('submit', function(event) {
    const confirmed = confirm('가입하시겠습니까?');
    if (!confirmed) {
        event.preventDefault(); // 사용자가 취소하면 폼 제출 안 함
    }
});

// modal을 불러오고 사용자 정보로 채운 뒤, 모달을 보여줌
function showConfirmationModal(event) {
    event.preventDefault(); // 기본 제출 막기

    // 이미 모달이 있으면 재사용
    if (document.getElementById('confirmModal')) {
        fillModalWithFormData();
        document.getElementById('confirmModal').style.display = 'flex';
        return;
    }

    // 없으면 fetch로 로드
    fetch('modal.html')
        .then(res => res.text())
        .then(html => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            document.body.appendChild(wrapper);

            fillModalWithFormData();
            setupModalLogic();
            document.getElementById('confirmModal').style.display = 'flex';
        });
}

// 폼 입력값을 모달에 채움
function fillModalWithFormData() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const genderRadio = document.querySelector('input[name="vbtn-radio"]:checked');
    const gender = genderRadio ? genderRadio.nextElementSibling.textContent : '선택 안됨';

    const confirmDetails = document.getElementById('confirmDetails');
    confirmDetails.innerHTML = `
        <strong>이름:</strong> ${name} <br>
        <strong>이메일:</strong> ${email} <br>
        <strong>주소:</strong> ${address} <br>
        <strong>전화번호:</strong> ${phone} <br>
        <strong>성별:</strong> ${gender} <br>
    `;
}

// 모달 내 "예", "아니오" 버튼 동작 설정
function setupModalLogic() {
    const yesBtn = document.getElementById('modalYes');
    const noBtn = document.getElementById('modalNo');
    const modal = document.getElementById('confirmModal');
    const form = document.querySelector('form');

    yesBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        form.submit();
    });

    noBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// 기존 confirm 코드 제거하고 아래로 교체
form.removeEventListener('submit', existingSubmitHandler); // 기존 핸들러 제거 필요하면 이 부분 참고
form.addEventListener('submit', showConfirmationModal);
