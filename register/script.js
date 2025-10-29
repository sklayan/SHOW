// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('regform');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const cpassword = document.getElementById('cpassword');

    // 检查元素是否成功获取
    if (!form) {
        console.error('Form element not found!');
        return;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const isRequiredValid = checkRequired([username, email, password, cpassword]);
        let isFormValid = isRequiredValid;
        
        if (isRequiredValid) {
            const isUsernameValid = checkLength(username, 3, 15);
            const isEmailValid = checkEmail(email);
            const isPasswordValid = checkLength(password, 6, 25);
            const isPasswordsMatch = checkPasswordsMatch(password, cpassword);

            isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
        }

        if (isFormValid) {
            alert("Registration successful!");
            form.reset();
            // 重置所有表单项的样式
            document.querySelectorAll(".form-item").forEach((group) => {
                group.className = "form-item";
                group.querySelector('small').innerText = ''; // 清空错误信息
            }); 
        }
    });

    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
            return false;
        } else if (input.value.length > max) {
            showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
            return false;
        } else {
            showSuccess(input);
            return true;
        }
    }

    function formatFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    function checkEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email.value.trim())) {
            showSuccess(email);
            return true;
        } else {
            showError(email, "Email is not valid");
            return false;
        }
    }

    function checkPasswordsMatch(input1, input2) {
        if (input1.value !== input2.value) {
            showError(input2, "Passwords do not match");
            return false;
        }
        return true;
    }

    function checkRequired(inputArray) {
        let isValid = true;
        inputArray.forEach((input) => {
            if (input.value.trim() === "") {
                showError(input, `${formatFieldName(input)} is required`);
                isValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.className = "form-item error";
        const small = formGroup.querySelector("small");
        small.innerText = message;
    }

    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.className = "form-item success";
        const small = formGroup.querySelector("small");
        small.innerText = '';
    }
});