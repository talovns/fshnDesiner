document.addEventListener('DOMContentLoaded', function() { 
    // Слушаем кастомное событие formValid, которое отправляет validation.js
    document.addEventListener('formValid', function(event) { 
        const formData = event.detail; 
        
        console.clear(); 
        console.log('--- НОВОЕ СООБЩЕНИЕ С САЙТА ---');
        console.log('ФИО:', formData.fullname); 
        console.log('Телефон:', formData.phone); 
        console.log('Email:', formData.email); 
        console.log('Тема:', formData.subject); 
        console.log('Сообщение:', formData.message); 
        
        const timestamp = new Date().toLocaleString('ru-RU'); 
        console.log('Время отправки:', timestamp); 
        console.log('---------------------------------');
    }); 
});