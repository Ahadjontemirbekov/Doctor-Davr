document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const bemorForm = document.getElementById('bemorForm');
    const bemorlarTable = document.getElementById('bemorlarTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editForm');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelEditBtn = document.querySelector('.cancel-edit-btn');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');

    // Variables
    let bemorlarData = [];
    let filteredData = [];
    let currentPage = 1;
    const itemsPerPage = 10;
    let sortColumn = null;
    let sortDirection = 'asc';

    // Initialize the application
    function init() {
        loadBemorlarFromLocalStorage();
        renderBemorlarTable();
        setupEventListeners();
    }

    // Load data from localStorage
    function loadBemorlarFromLocalStorage() {
        const savedData = localStorage.getItem('bemorlarData');
        if (savedData) {
            bemorlarData = JSON.parse(savedData);
            filteredData = [...bemorlarData];
        }
    }

    // Save data to localStorage
    function saveBemorlarToLocalStorage() {
        localStorage.setItem('bemorlarData', JSON.stringify(bemorlarData));
    }

    // Setup event listeners
    function setupEventListeners() {
        // Form submission
        bemorForm.addEventListener('submit', handleFormSubmit);

        // Search functionality
        searchInput.addEventListener('input', handleSearch);
        searchBtn.addEventListener('click', handleSearch);

        // Pagination
        prevPageBtn.addEventListener('click', goToPrevPage);
        nextPageBtn.addEventListener('click', goToNextPage);

        // Modal controls
        closeModalBtn.addEventListener('click', closeEditModal);
        cancelEditBtn.addEventListener('click', closeEditModal);
        window.addEventListener('click', (e) => {
            if (e.target === editModal) {
                closeEditModal();
            }
        });

        // Edit form submission
        editForm.addEventListener('submit', handleEditSubmit);

        // Table sorting
        const headers = document.querySelectorAll('#bemorlarTable thead th');
        headers.forEach((header, index) => {
            if (index !== headers.length - 1) { // Skip actions column
                header.addEventListener('click', () => {
                    sortColumn = index;
                    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
                    sortData();
                    renderBemorlarTable();
                    updateSortIndicator();
                });
            }
        });
    }

    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(bemorForm);
        const newBemor = {
            id: Date.now().toString(),
            toliq_ism: formData.get('toliq_ism'),
            yil: parseInt(formData.get('yil')),
            hudud: formData.get('hudud'),
            summa: parseFloat(formData.get('summa')),
            created_at: new Date().toISOString()
        };

        bemorlarData.unshift(newBemor);
        filteredData.unshift(newBemor);

        saveBemorlarToLocalStorage();
        renderBemorlarTable();
        showNotification('Bemor muvaffaqiyatli qoʻshildi', 'success');

        bemorForm.reset();
    }

    // Handle search
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();

        if (searchTerm.trim() === '') {
            filteredData = [...bemorlarData];
        } else {
            filteredData = bemorlarData.filter(bemor =>
                bemor.toliq_ism.toLowerCase().includes(searchTerm) ||
                bemor.hudud.toLowerCase().includes(searchTerm) ||
                bemor.yil.toString().includes(searchTerm) ||
                bemor.summa.toString().includes(searchTerm)
            );
        }

        currentPage = 1;
        renderBemorlarTable();
    }

    // Sort data
    function sortData() {
        if (sortColumn === null) return;

        filteredData.sort((a, b) => {
            let valueA, valueB;

            switch (sortColumn) {
                case 0: // Ism
                    valueA = a.toliq_ism.toLowerCase();
                    valueB = b.toliq_ism.toLowerCase();
                    break;
                case 1: // Yil
                    valueA = a.yil;
                    valueB = b.yil;
                    break;
                case 2: // Hudud
                    valueA = a.hudud.toLowerCase();
                    valueB = b.hudud.toLowerCase();
                    break;
                case 3: // Summa
                    valueA = a.summa;
                    valueB = b.summa;
                    break;
                case 4: // Created At
                    valueA = new Date(a.created_at);
                    valueB = new Date(b.created_at);
                    break;
                default:
                    return 0;
            }

            if (valueA < valueB) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    // Update sort indicator in table headers
    function updateSortIndicator() {
        const headers = document.querySelectorAll('#bemorlarTable thead th');
        headers.forEach((header, index) => {
            header.innerHTML = header.innerHTML.replace(/<i class="fas fa-sort-[^"]*"><\/i>/, '');

            if (index === sortColumn) {
                const sortIcon = document.createElement('i');
                sortIcon.className = `fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`;
                header.appendChild(sortIcon);
            }
        });
    }

    // Render the table with patient data
    function renderBemorlarTable() {
        bemorlarTable.innerHTML = '';

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        if (paginatedData.length === 0) {
            const row = bemorlarTable.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 6;
            cell.textContent = 'Hech qanday maʼlumot topilmadi';
            cell.style.textAlign = 'center';
            cell.style.padding = '20px';
            return;
        }

        paginatedData.forEach(bemor => {
            const row = bemorlarTable.insertRow();

            // Format created_at date
            const createdDate = new Date(bemor.created_at);
            const formattedDate = createdDate.toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });

            // Cells
            row.insertCell().textContent = bemor.toliq_ism;
            row.insertCell().textContent = bemor.yil;
            row.insertCell().textContent = bemor.hudud;
            row.insertCell().textContent = formatCurrency(bemor.summa);
            row.insertCell().textContent = formattedDate;

            // Actions cell
            const actionsCell = row.insertCell();
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'action-btns';

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.className = 'action-btn edit-btn';
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Tahrirlash';
            editBtn.addEventListener('click', () => openEditModal(bemor));

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Oʻchirish';
            deleteBtn.addEventListener('click', () => confirmDeleteBemor(bemor.id));

            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deleteBtn);
            actionsCell.appendChild(actionsDiv);
        });

        updatePaginationInfo();
    }

    // Format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('uz-UZ', {
            style: 'currency',
            currency: 'UZS',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Update pagination information
    function updatePaginationInfo() {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        pageInfo.textContent = `${currentPage}/${totalPages}`;

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Go to previous page
    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderBemorlarTable();
        }
    }

    // Go to next page
    function goToNextPage() {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderBemorlarTable();
        }
    }

    // Open edit modal
    function openEditModal(bemor) {
        document.getElementById('editId').value = bemor.id;
        document.getElementById('editToliqIsm').value = bemor.toliq_ism;
        document.getElementById('editYil').value = bemor.yil;
        document.getElementById('editHudud').value = bemor.hudud;
        document.getElementById('editSumma').value = bemor.summa;

        editModal.style.display = 'flex';
        setTimeout(() => {
            editModal.style.opacity = '1';
            document.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
    }

    // Close edit modal
    function closeEditModal() {
        editModal.style.opacity = '0';
        document.querySelector('.modal-content').style.transform = 'translateY(-20px)';
        setTimeout(() => {
            editModal.style.display = 'none';
            editForm.reset();
        }, 300);
    }

    // Handle edit form submission
    function handleEditSubmit(e) {
        e.preventDefault();

        const id = document.getElementById('editId').value;
        const updatedBemor = {
            toliq_ism: document.getElementById('editToliqIsm').value,
            yil: parseInt(document.getElementById('editYil').value),
            hudud: document.getElementById('editHudud').value,
            summa: parseFloat(document.getElementById('editSumma').value),
            created_at: new Date().toISOString()
        };

        // Update in both arrays
        const index = bemorlarData.findIndex(b => b.id === id);
        if (index !== -1) {
            bemorlarData[index] = { ...bemorlarData[index], ...updatedBemor };
        }

        const filteredIndex = filteredData.findIndex(b => b.id === id);
        if (filteredIndex !== -1) {
            filteredData[filteredIndex] = { ...filteredData[filteredIndex], ...updatedBemor };
        }

        saveBemorlarToLocalStorage();
        renderBemorlarTable();
        closeEditModal();
        showNotification('Bemor maʼlumotlari muvaffaqiyatli yangilandi', 'success');
    }

    // Confirm before deleting a patient
    function confirmDeleteBemor(id) {
        if (confirm('Haqiqatan ham bu bemorni oʻchirib tashlamoqchimisiz?')) {
            deleteBemor(id);
        }
    }

    // Delete a patient
    function deleteBemor(id) {
        bemorlarData = bemorlarData.filter(b => b.id !== id);
        filteredData = filteredData.filter(b => b.id !== id);

        // Adjust current page if needed
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }

        saveBemorlarToLocalStorage();
        renderBemorlarTable();
        showNotification('Bemor muvaffaqiyatli oʻchirildi', 'success');
    }

    // Show notification
    function showNotification(message, type = 'success') {
        notification.className = 'notification';
        notification.classList.add(type);
        notification.classList.add('show');
        notificationMessage.textContent = message;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Initialize the application
    init();

    // Sample data for testing (can be removed in production)
    function addSampleData() {
        if (bemorlarData.length === 0) {
            const sampleData = [
                {
                    id: '1',
                    toliq_ism: 'Ali Valiyev',
                    yil: 1985,
                    hudud: 'Toshkent',
                    summa: 1500000,
                    created_at: '2023-05-15T10:30:00Z'
                },
                {
                    id: '2',
                    toliq_ism: 'Dilshod Rajabov',
                    yil: 1990,
                    hudud: 'Samarqand',
                    summa: 2000000,
                    created_at: '2023-05-16T11:45:00Z'
                },
                {
                    id: '3',
                    toliq_ism: 'Gulnora Xasanova',
                    yil: 1978,
                    hudud: 'Buxoro',
                    summa: 1750000,
                    created_at: '2023-05-17T09:15:00Z'
                },
                {
                    id: '4',
                    toliq_ism: 'Javlon Qodirov',
                    yil: 1995,
                    hudud: 'Andijon',
                    summa: 1250000,
                    created_at: '2023-05-18T14:20:00Z'
                },
                {
                    id: '5',
                    toliq_ism: 'Malika Yusupova',
                    yil: 1982,
                    hudud: 'Fargʻona',
                    summa: 1900000,
                    created_at: '2023-05-19T16:10:00Z'
                },
                {
                    id: '6',
                    toliq_ism: 'Olimjon Toʻxtayev',
                    yil: 1975,
                    hudud: 'Namangan',
                    summa: 2100000,
                    created_at: '2023-05-20T08:45:00Z'
                },
                {
                    id: '7',
                    toliq_ism: 'Sevara Rahmonova',
                    yil: 1992,
                    hudud: 'Qashqadaryo',
                    summa: 1650000,
                    created_at: '2023-05-21T13:30:00Z'
                },
                {
                    id: '8',
                    toliq_ism: 'Temur Jalilov',
                    yil: 1988,
                    hudud: 'Surxondaryo',
                    summa: 1800000,
                    created_at: '2023-05-22T10:15:00Z'
                },
                {
                    id: '9',
                    toliq_ism: 'Ulugʻbek Nosirov',
                    yil: 1980,
                    hudud: 'Xorazm',
                    summa: 2200000,
                    created_at: '2023-05-23T11:20:00Z'
                },
                {
                    id: '10',
                    toliq_ism: 'Xurshida Qodirova',
                    yil: 1993,
                    hudud: 'Navoiy',
                    summa: 1550000,
                    created_at: '2023-05-24T15:40:00Z'
                },
                {
                    id: '11',
                    toliq_ism: 'Shoxrux Mirzayev',
                    yil: 1987,
                    hudud: 'Jizzax',
                    summa: 1950000,
                    created_at: '2023-05-25T09:55:00Z'
                },
                {
                    id: '12',
                    toliq_ism: 'Feruza Abdullayeva',
                    yil: 1991,
                    hudud: 'Sirdaryo',
                    summa: 1700000,
                    created_at: '2023-05-26T14:10:00Z'
                },
                {
                    id: '13',
                    toliq_ism: 'Bahodir Karimov',
                    yil: 1983,
                    hudud: 'Qoraqalpogʻiston',
                    summa: 2300000,
                    created_at: '2023-05-27T16:30:00Z'
                }
            ];

            bemorlarData = sampleData;
            filteredData = [...sampleData];
            saveBemorlarToLocalStorage();
            renderBemorlarTable();
        }
    }

    // Uncomment the following line to add sample data (for testing purposes)
    // addSampleData();
});