document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.categories').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const modalOverlay = document.getElementById('modalOverlay');
    const messageModal = document.querySelector('.message-modal');
    const newThreadModal = document.getElementById('newThreadModal');
    const threadsContainer = document.getElementById('threadsContainer');
    
    // Переменные для отслеживания активного модального окна
    let activeModal = null;

    // Функции для управления модальными окнами
    function openModal(modal) {
        activeModal = modal;
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (activeModal) {
            activeModal.style.display = 'none';
            activeModal = null;
        }
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Обработчик клика на оверлей
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay && activeModal) {
            closeModal();
        }
    });

    // Модальное окно сообщения
    function openMessageModal(title, author, content, avatar = '/src/img/97default_2022.webp') {
        document.querySelector('.message-modal__title').textContent = title;
        document.querySelector('.message-modal__author').textContent = 'By ' + author;
        document.querySelector('.message-modal__text').textContent = content;
        document.querySelector('.message-modal__avatar').src = avatar;
        
        openModal(messageModal);
    }

    document.querySelector('.message-modal__close').addEventListener('click', closeModal);

    // Модальное окно нового треда
    function openNewThreadModal() {
        openModal(newThreadModal);
    }

    document.getElementById('newThreadBtn').addEventListener('click', openNewThreadModal);
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);

    // Создание новой карточки
    document.getElementById('postBtn').addEventListener('click', function() {
        const title = document.getElementById('threadTitle').value.trim();
        const content = document.getElementById('threadContent').value.trim();
        
        if (title && content) {
            const newThread = document.createElement('div');
            newThread.className = 'table-card';
            newThread.innerHTML = `
                <img src="/src/img/97default_2022.webp" alt="Tournament" class="table-icon">
                <div class="table-info">
                    <span class="table-main-text">${title}</span>
                    <span class="table-secondary-text">By You</span>
                </div>
            `;
            newThread.addEventListener('click', () => openMessageModal(title, 'You', content));
            threadsContainer.prepend(newThread);
            closeModal();
        } else {
            alert('Please fill in both title and content fields');
        }
    });

    // Обработчики для существующих карточек
    document.querySelectorAll('.table-card').forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.table-main-text').textContent;
            const author = this.querySelector('.table-secondary-text').textContent.replace('By ', '');
            openMessageModal(title, author, "Пример содержимого поста");
        });
    });

    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeModal) {
            closeModal();
        }
    });

    // Меню
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.categories').classList.toggle('active');
    });
});