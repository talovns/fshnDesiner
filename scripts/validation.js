document.addEventListener('DOMContentLoaded', function() { 
    const form = document.getElementById('feedbackForm'); 
    if (!form) return; 

    form.addEventListener('submit', function(event) { 
        event.preventDefault(); // Отменяем стандартную отправку формы

        // 1. Очищаем старые ошибки перед новой проверкой
        document.querySelectorAll('.error-text').forEach(el => el.remove());
        document.querySelectorAll('.border-red-500').forEach(input => {
            input.classList.remove('border-red-500', 'focus:ring-red-500');
            input.classList.add('border-gray-300', 'focus:ring-black');
        });

        let isValid = true; 

        // 2. Проверка ФИО (минимум 2 слова)
        const fullname = document.getElementById('fullname'); 
        const fullnameValue = fullname.value.trim(); 
        const words = fullnameValue.split(/\s+/);
        if (words.length < 2) { 
            showError(fullname, 'Введите минимум 2 слова (Имя и Фамилию)'); 
            isValid = false; 
        } 

        // 3. Проверка телефона (минимум 10 цифр)
        const phone = document.getElementById('phone'); 
        const phoneValue = phone.value.trim(); 
        const phoneDigits = phoneValue.replace(/\D/g, ''); 
        if (phoneDigits.length < 10) { 
            showError(phone, 'Номер телефона должен содержать минимум 10 цифр'); 
            isValid = false; 
        } 

        // 4. Проверка email
        const email = document.getElementById('email'); 
        const emailValue = email.value.trim(); 
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) { 
            showError(email, 'Введите корректный email адрес'); 
            isValid = false; 
        } 

        // 5. Проверка чекбокса
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            showError(agreement, 'Необходимо согласие на обработку данных');
            isValid = false;
        }

        // Если всё верно - создаем событие для второго скрипта
        if (isValid) { 
            const formData = { 
                fullname: fullnameValue, 
                phone: phoneValue, 
                email: emailValue, 
                subject: document.getElementById('subject').value || '(не выбрано)',
                message: document.getElementById('message').value.trim() || '(пусто)' 
            }; 

            const customEvent = new CustomEvent('formValid', { detail: formData }); 
            document.dispatchEvent(customEvent); 
            
            alert('Форма успешно отправлена! Данные выведены в консоль.'); 
            form.reset(); // Очищаем форму
        } 
    }); 

    // Функция для показа ошибки (Tailwind классы)
    function showError(input, message) { 
        // Меняем цвет рамки на красный
        input.classList.remove('border-gray-300', 'focus:ring-black');
        input.classList.add('border-red-500', 'focus:ring-red-500'); 
        
        // Создаем текст ошибки
        const helpText = document.createElement('p'); 
        helpText.classList.add('error-text', 'text-red-500', 'text-xs', 'mt-1'); 
        helpText.textContent = message; 
        
        // Добавляем текст под инпут
        input.parentNode.appendChild(helpText); 
    } 

    // Убираем красную рамку, как только пользователь начинает печатать
    document.querySelectorAll('input, select, textarea').forEach(input => { 
        input.addEventListener('input', function() { 
            this.classList.remove('border-red-500', 'focus:ring-red-500');
            this.classList.add('border-gray-300', 'focus:ring-black');
            const parent = this.parentNode; 
            const error = parent.querySelector('.error-text'); 
            if (error) error.remove(); 
        }); 
    }); 
});