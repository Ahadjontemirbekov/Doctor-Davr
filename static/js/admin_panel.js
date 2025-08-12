/**
 * Doctor Davr Admin Panel - Main JavaScript File
 * Version: 1.0.0
 * Author: Your Name
 * License: MIT
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // ============ GLOBAL VARIABLES ===============
    // =============================================
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mainContent = document.querySelector('.main-content');
    const dropdowns = document.querySelectorAll('.sidebar-menu li a .dropdown');
    const submenus = document.querySelectorAll('.submenu');
    const searchBar = document.querySelector('.search-bar input');
    const notificationBtn = document.querySelector('.notification');
    const messageBtn = document.querySelector('.message');
    const userMenu = document.querySelector('.user-menu');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    const addDoctorForm = document.getElementById('addDoctorForm');
    const addServiceForm = document.getElementById('addServiceForm');
    const fileUploads = document.querySelectorAll('.file-upload input[type="file"]');
    const fileUploadLabels = document.querySelectorAll('.file-upload-label');
    const chartControls = document.querySelectorAll('.chart-controls button');
    const appointmentTable = document.querySelector('.data-table');
    const appointmentRows = document.querySelectorAll('.data-table tbody tr');
    const viewButtons = document.querySelectorAll('.btn-sm.btn-primary');
    const confirmButtons = document.querySelectorAll('.btn-sm.btn-success');
    const cancelButtons = document.querySelectorAll('.btn-sm.btn-danger');
    const deleteButtons = document.querySelectorAll('.btn-sm.btn-secondary');
    const darkModeToggle = document.createElement('div');

    // =============================================
    // ============ HELPER FUNCTIONS ===============
    // =============================================

    /**
     * Debounce function to limit how often a function can fire
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    /**
     * Format date to readable string
     * @param {Date} date - Date object
     * @returns {string} Formatted date string
     */
    function formatDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('uz-UZ', options);
    }

    /**
     * Generate random number between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    function randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * Generate random patient data
     * @returns {Object} Patient data object
     */
    function generateRandomPatient() {
        const firstNames = ['Ali', 'Vali', 'Hasan', 'Husan', 'Otabek', 'Shoxrux', 'Javohir', 'Farhod', 'Sardor', 'Dilshod'];
        const lastNames = ['Xo\'jayev', 'Toshmatov', 'Eshmatov', 'Qodirov', 'Karimov', 'Yuldashev', 'Rahimov', 'Nosirov', 'Sobirov', 'Xolmatov'];
        const genders = ['male', 'female'];
        const services = ['9D Diagnostika', 'Kardiologik konsultatsiya', 'Labaratoriya tekshiruvi', 'Stomatologik ko\'rik', 'Nevrologik tekshiruv'];
        const doctors = ['Dr. Xakimov', 'Dr. Yusupova', 'Dr. Rahimov', 'Dr. Qodirova', 'Dr. Karimov'];
        const statuses = ['Tasdiqlangan', 'Kutilmoqda', 'Bekor qilingan', 'Yakunlangan'];

        const gender = genders[Math.floor(Math.random() * genders.length)];
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const service = services[Math.floor(Math.random() * services.length)];
        const doctor = doctors[Math.floor(Math.random() * doctors.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const id = 'QBL-' + randomBetween(7000, 8000);
        const date = new Date();
        date.setDate(date.getDate() - randomBetween(0, 30));

        return {
            id,
            name: `${firstName} ${lastName}`,
            date: formatDate(date),
            service,
            doctor,
            status,
            gender
        };
    }

    // =============================================
    // ============ SIDEBAR FUNCTIONALITY ==========
    // =============================================

    // Toggle sidebar collapse/expand
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-collapsed');

        if (sidebar.classList.contains('active')) {
            localStorage.setItem('sidebarState', 'expanded');
        } else {
            localStorage.setItem('sidebarState', 'collapsed');
        }
    });

    // Initialize sidebar state from localStorage
    if (localStorage.getItem('sidebarState') === 'collapsed') {
        sidebar.classList.add('active');
        mainContent.classList.add('sidebar-collapsed');
    }

    // Handle dropdown menus in sidebar
    dropdowns.forEach(dropdown => {
        const parentLi = dropdown.closest('li');

        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const submenu = parentLi.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                dropdown.style.transform = submenu.style.display === 'block' ? 'rotate(90deg)' : 'rotate(0)';
            }
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.sidebar-menu li')) {
            submenus.forEach(submenu => {
                submenu.style.display = 'none';
            });

            dropdowns.forEach(dropdown => {
                dropdown.style.transform = 'rotate(0)';
            });
        }
    });

    // =============================================
    // ============ TOP NAV FUNCTIONALITY ==========
    // =============================================

    // Search functionality with debounce
    searchBar.addEventListener('input', debounce(function(e) {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        // In a real app, you would make an API call here
    }, 300));

    // Notification dropdown
    notificationBtn.addEventListener('click', function() {
        // In a real app, this would toggle a notification dropdown
        console.log('Notifications clicked');
    });

    // Messages dropdown
    messageBtn.addEventListener('click', function() {
        // In a real app, this would toggle a messages dropdown
        console.log('Messages clicked');
    });

    // User menu dropdown
    userMenu.addEventListener('click', function() {
        // In a real app, this would toggle a user dropdown
        console.log('User menu clicked');
    });

    // =============================================
    // ============ MODAL FUNCTIONALITY ============
    // =============================================

    // Close modals when clicking close button
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
        });
    });

    // Close modals when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // =============================================
    // ============ FORM FUNCTIONALITY =============
    // =============================================

    // Handle file upload display
    fileUploads.forEach((upload, index) => {
        upload.addEventListener('change', function() {
            const fileName = this.files[0] ? this.files[0].name : 'Rasm yuklash';
            fileUploadLabels[index].querySelector('span').textContent = fileName;
        });
    });

    // Add Doctor Form submission
    if (addDoctorForm) {
        addDoctorForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            // In a real app, you would send this to your backend
            console.log('Doctor form submitted:', Object.fromEntries(formData));

            // Show success message
            alert('Shifokor muvaffaqiyatli qo\'shildi!');
            document.getElementById('addDoctorModal').classList.remove('active');
            this.reset();
            fileUploadLabels[0].querySelector('span').textContent = 'Rasm yuklash';
        });
    }

    // Add Service Form submission
    if (addServiceForm) {
        addServiceForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            // In a real app, you would send this to your backend
            console.log('Service form submitted:', Object.fromEntries(formData));

            // Show success message
            alert('Xizmat muvaffaqiyatli qo\'shildi!');
            document.getElementById('addServiceModal').classList.remove('active');
            this.reset();
            fileUploadLabels[1].querySelector('span').textContent = 'Rasm yuklash';
        });
    }

    // =============================================
    // ============ TABLE FUNCTIONALITY ============
    // =============================================

    // Handle view buttons in appointment table
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const patientId = row.querySelector('td:first-child').textContent;
            const patientName = row.querySelector('.user-cell span').textContent;

            // In a real app, you would fetch patient details from your backend
            console.log(`Viewing details for ${patientName} (${patientId})`);

            // For demo, we'll just open the modal with some data
            const modal = document.getElementById('patientModal');
            const patientAvatar = modal.querySelector('.patient-avatar img');
            const patientNameEl = modal.querySelector('.info-value:first-child');
            const patientBirthdate = modal.querySelector('.info-value:nth-child(2)');
            const patientPhone = modal.querySelector('.info-value:nth-child(3)');
            const patientAddress = modal.querySelector('.info-value:nth-child(4)');
            const patientBloodType = modal.querySelector('.info-value:nth-child(5)');
            const patientStatus = modal.querySelector('.info-value:nth-child(6)');
            const appointmentCount = modal.querySelector('.stat-card:first-child p');
            const lastVisit = modal.querySelector('.stat-card:nth-child(2) p');
            const serviceCount = modal.querySelector('.stat-card:nth-child(3) p');

            // Set random data for demo
            const gender = Math.random() > 0.5 ? 'men' : 'women';
            const randomId = Math.floor(Math.random() * 100);
            patientAvatar.src = `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
            patientNameEl.textContent = patientName;
            patientBirthdate.textContent = `${randomBetween(1, 28)}.${randomBetween(1, 12)}.${randomBetween(1950, 2000)}`;
            patientPhone.textContent = `+998 9${randomBetween(10, 99)} ${randomBetween(100, 999)} ${randomBetween(10, 99)}`;
            patientAddress.textContent = ['Toshkent sh., Yunusobod tumani', 'Toshkent sh., Mirzo Ulug\'bek tumani', 'Toshkent sh., Shayxontoxur tumani'][Math.floor(Math.random() * 3)];
            patientBloodType.textContent = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'][Math.floor(Math.random() * 8)];
            patientStatus.textContent = row.querySelector('.badge').textContent;
            appointmentCount.textContent = randomBetween(5, 50);
            lastVisit.textContent = formatDate(new Date());
            serviceCount.textContent = randomBetween(3, 15);

            modal.classList.add('active');
        });
    });

    // Handle confirm buttons in appointment table
    confirmButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const patientId = row.querySelector('td:first-child').textContent;
            const patientName = row.querySelector('.user-cell span').textContent;

            // In a real app, you would send a confirmation to your backend
            console.log(`Confirming appointment for ${patientName} (${patientId})`);

            // Update UI
            const statusBadge = row.querySelector('.badge');
            statusBadge.classList.remove('badge-warning');
            statusBadge.classList.add('badge-success');
            statusBadge.textContent = 'Tasdiqlangan';

            // Remove confirm button
            this.remove();
        });
    });

    // Handle cancel buttons in appointment table
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const patientId = row.querySelector('td:first-child').textContent;
            const patientName = row.querySelector('.user-cell span').textContent;

            // In a real app, you would send a cancellation to your backend
            console.log(`Canceling appointment for ${patientName} (${patientId})`);

            // Update UI
            const statusBadge = row.querySelector('.badge');
            statusBadge.classList.remove('badge-warning', 'badge-success');
            statusBadge.classList.add('badge-danger');
            statusBadge.textContent = 'Bekor qilingan';

            // Remove cancel button
            this.remove();
        });
    });

    // Handle delete buttons in appointment table
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const patientId = row.querySelector('td:first-child').textContent;
            const patientName = row.querySelector('.user-cell span').textContent;

            // In a real app, you would send a deletion request to your backend
            console.log(`Deleting appointment for ${patientName} (${patientId})`);

            // Confirm before deleting
            if (confirm(`Haqiqatan ham ${patientId} raqamli qabulni o'chirmoqchimisiz?`)) {
                row.remove();
                alert('Qabul muvaffaqiyatli o\'chirildi!');
            }
        });
    });

    // =============================================
    // ============ CHART FUNCTIONALITY ============
    // =============================================

    // Initialize charts
    function initCharts() {
        // Appointments Chart
        const appointmentsCtx = document.getElementById('appointmentsChart').getContext('2d');
        const appointmentsChart = new Chart(appointmentsCtx, {
            type: 'line',
            data: {
                labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul'],
                datasets: [{
                    label: 'Qabullar soni',
                    data: [120, 190, 170, 220, 240, 210, 250],
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderColor: 'rgba(67, 97, 238, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Patients Chart
        const patientsCtx = document.getElementById('patientsChart').getContext('2d');
        const patientsChart = new Chart(patientsCtx, {
            type: 'bar',
            data: {
                labels: ['Yangi bemorlar', 'Qayta kelganlar', 'Muntazam bemorlar', 'Bemorlar umumiy'],
                datasets: [{
                    label: 'Bemorlar',
                    data: [45, 30, 25, 100],
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.7)',
                        'rgba(76, 201, 240, 0.7)',
                        'rgba(72, 149, 239, 0.7)',
                        'rgba(247, 37, 133, 0.7)'
                    ],
                    borderColor: [
                        'rgba(67, 97, 238, 1)',
                        'rgba(76, 201, 240, 1)',
                        'rgba(72, 149, 239, 1)',
                        'rgba(247, 37, 133, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Chart controls functionality
        chartControls.forEach(control => {
            control.addEventListener('click', function() {
                // Remove active class from all buttons
                chartControls.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get the time period
                const period = this.textContent.toLowerCase();

                // In a real app, you would fetch new data based on the period
                console.log(`Loading data for ${period} period`);

                // For demo, we'll just update the chart with random data
                if (period === 'kunlik') {
                    appointmentsChart.data.labels = ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
                    appointmentsChart.data.datasets[0].data = [15, 30, 25, 35, 20, 10];
                } else if (period === 'haftalik') {
                    appointmentsChart.data.labels = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
                    appointmentsChart.data.datasets[0].data = [45, 60, 55, 70, 50, 30];
                } else if (period === 'oylik') {
                    appointmentsChart.data.labels = ['1-hafta', '2-hafta', '3-hafta', '4-hafta'];
                    appointmentsChart.data.datasets[0].data = [180, 220, 240, 210];
                } else if (period === 'yillik') {
                    appointmentsChart.data.labels = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
                    appointmentsChart.data.datasets[0].data = [120, 190, 170, 220, 240, 210, 250, 230, 260, 240, 280, 300];
                } else if (period === 'bu oy') {
                    patientsChart.data.labels = ['1-hafta', '2-hafta', '3-hafta', '4-hafta'];
                    patientsChart.data.datasets[0].data = [10, 15, 12, 8];
                } else if (period === 'o\'tgan oy') {
                    patientsChart.data.labels = ['1-hafta', '2-hafta', '3-hafta', '4-hafta'];
                    patientsChart.data.datasets[0].data = [8, 12, 10, 6];
                } else if (period === 'bu yil') {
                    patientsChart.data.labels = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
                    patientsChart.data.datasets[0].data = [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
                }

                // Update the chart
                appointmentsChart.update();
                patientsChart.update();
            });
        });
    }

    // Initialize charts when DOM is loaded
    initCharts();

    // =============================================
    // ============ DARK MODE FUNCTIONALITY ========
    // =============================================

    // Create dark mode toggle button
    darkModeToggle.innerHTML = `
        <div class="dark-mode-toggle">
            <i class="fas fa-moon"></i>
            <span>Dark Mode</span>
            <label class="switch">
                <input type="checkbox" id="darkModeSwitch">
                <span class="slider"></span>
            </label>
        </div>
    `;

    // Add dark mode toggle to sidebar footer
    const sidebarFooter = document.querySelector('.sidebar-footer');
    sidebarFooter.insertBefore(darkModeToggle, sidebarFooter.firstChild);

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeSwitch').checked = true;
    }

    // Dark mode toggle functionality
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }

    // =============================================
    // ============ DEMO DATA GENERATION ===========
    // =============================================

    // Generate random appointments for demo
    function generateDemoAppointments() {
        const tbody = appointmentTable.querySelector('tbody');

        // Clear existing rows except first 5 (which are in the HTML)
        if (tbody.children.length > 5) {
            while (tbody.children.length > 5) {
                tbody.removeChild(tbody.lastChild);
            }
        }

        // Add 10 more random appointments
        for (let i = 0; i < 10; i++) {
            const patient = generateRandomPatient();
            const gender = patient.gender === 'male' ? 'men' : 'women';
            const randomId = Math.floor(Math.random() * 100);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${patient.id}</td>
                <td>
                    <div class="user-cell">
                        <img src="https://randomuser.me/api/portraits/${gender}/${randomId}.jpg" alt="User">
                        <span>${patient.name}</span>
                    </div>
                </td>
                <td>${patient.date}</td>
                <td>${patient.doctor}</td>
                <td><span class="badge ${patient.status === 'Tasdiqlangan' ? 'badge-success' : patient.status === 'Kutilmoqda' ? 'badge-warning' : patient.status === 'Bekor qilingan' ? 'badge-danger' : 'badge-info'}">${patient.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary">Ko'rish</button>
                    ${patient.status === 'Kutilmoqda' ? '<button class="btn btn-sm btn-success">Tasdiqlash</button>' : ''}
                    ${patient.status !== 'Bekor qilingan' && patient.status !== 'Yakunlangan' ? '<button class="btn btn-sm btn-danger">Bekor qilish</button>' : ''}
                    ${patient.status === 'Yakunlangan' ? '<button class="btn btn-sm btn-secondary">Tarix</button>' : ''}
                </td>
            `;

            tbody.appendChild(row);
        }

        // Re-attach event listeners to new buttons
        attachTableEventListeners();
    }

    // Attach event listeners to table buttons
    function attachTableEventListeners() {
        const newViewButtons = document.querySelectorAll('.data-table .btn-sm.btn-primary');
        const newConfirmButtons = document.querySelectorAll('.data-table .btn-sm.btn-success');
        const newCancelButtons = document.querySelectorAll('.data-table .btn-sm.btn-danger');
        const newDeleteButtons = document.querySelectorAll('.data-table .btn-sm.btn-secondary');

        // View buttons
        newViewButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const patientId = row.querySelector('td:first-child').textContent;
                const patientName = row.querySelector('.user-cell span').textContent;

                console.log(`Viewing details for ${patientName} (${patientId})`);
                document.getElementById('patientModal').classList.add('active');
            });
        });

        // Confirm buttons
        newConfirmButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const statusBadge = row.querySelector('.badge');
                statusBadge.classList.remove('badge-warning');
                statusBadge.classList.add('badge-success');
                statusBadge.textContent = 'Tasdiqlangan';
                this.remove();
            });
        });

        // Cancel buttons
        newCancelButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const statusBadge = row.querySelector('.badge');
                statusBadge.classList.remove('badge-warning', 'badge-success');
                statusBadge.classList.add('badge-danger');
                statusBadge.textContent = 'Bekor qilingan';
                this.remove();
            });
        });

        // Delete buttons
        newDeleteButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                const patientId = row.querySelector('td:first-child').textContent;

                if (confirm(`Haqiqatan ham ${patientId} raqamli qabulni o'chirmoqchimisiz?`)) {
                    row.remove();
                }
            });
        });
    }

    // Generate demo data button (for testing)
    const demoDataBtn = document.createElement('button');
    demoDataBtn.textContent = 'Generate Demo Data';
    demoDataBtn.className = 'btn btn-primary';
    demoDataBtn.style.position = 'fixed';
    demoDataBtn.style.bottom = '20px';
    demoDataBtn.style.right = '20px';
    demoDataBtn.style.zIndex = '1000';
    demoDataBtn.addEventListener('click', generateDemoAppointments);

    // Add button to body (only for development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        document.body.appendChild(demoDataBtn);
    }

    // =============================================
    // ============ NOTIFICATION SYSTEM ============
    // =============================================

    // Simulate real-time notifications
    function simulateNotifications() {
        const messages = [
            'Yangi qabul yaratildi: #QBL-7852',
            'Sarah Johnson yangi sharh qoldirdi',
            'Tizim yangilandi yangi versiyaga (v1.2.0)',
            'Bugun 5 ta yangi bemor ro\'yxatdan o\'tdi',
            'Dr. Xakimov ish jadvalini yangiladi'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const notificationCount = document.querySelector('.notification .badge');

        // Increment notification count
        let count = parseInt(notificationCount.textContent);
        notificationCount.textContent = count + 1;

        // Create notification toast
        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-bell"></i>
            </div>
            <div class="toast-content">
                <p>${randomMessage}</p>
                <small>${new Date().toLocaleTimeString()}</small>
            </div>
            <button class="toast-close">&times;</button>
        `;

        // Add toast to body
        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Auto-remove toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', function() {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
    }

    // Simulate notifications every 30-60 seconds
    setInterval(simulateNotifications, randomBetween(30000, 60000));

    // =============================================
    // ============ ACTIVITY FEED UPDATES ==========
    // =============================================

    // Simulate real-time activity updates
    function simulateActivity() {
        const activities = [
            {
                icon: 'fa-user-plus',
                color: 'bg-primary',
                text: '<strong>John Smith</strong> yangi bemor sifatida ro\'yxatdan o\'tdi.',
                time: '2 daqiqa oldin'
            },
            {
                icon: 'fa-calendar-check',
                color: 'bg-success',
                text: 'Yangi qabul <strong>#QBL-7842</strong> yaratildi.',
                time: '15 daqiqa oldin'
            },
            {
                icon: 'fa-exclamation-triangle',
                color: 'bg-warning',
                text: 'Dr. Xakimov <strong>9D Diagnostika</strong> xizmati uchun yangi narx belgiladi.',
                time: '1 soat oldin'
            },
            {
                icon: 'fa-comment',
                color: 'bg-info',
                text: '<strong>Sarah Johnson</strong> yangi sharh qoldirdi.',
                time: '3 soat oldin'
            },
            {
                icon: 'fa-times-circle',
                color: 'bg-danger',
                text: 'Qabul <strong>#QBL-7835</strong> bekor qilindi.',
                time: '5 soat oldin'
            }
        ];

        const activityList = document.querySelector('.activity-list');
        const newActivity = activities[Math.floor(Math.random() * activities.length)];

        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon ${newActivity.color}">
                <i class="fas ${newActivity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${newActivity.text}</p>
                <span class="activity-time">${newActivity.time}</span>
            </div>
        `;

        // Add new activity to top of list
        activityList.insertBefore(activityItem, activityList.firstChild);

        // Remove oldest activity if more than 10
        if (activityList.children.length > 10) {
            activityList.removeChild(activityList.lastChild);
        }
    }

    // Simulate activity every 1-2 minutes
    setInterval(simulateActivity, randomBetween(60000, 120000));

    // =============================================
    // ============ WIDGET UPDATES =================
    // =============================================

    // Simulate real-time widget updates
    function updateWidgets() {
        const widgets = document.querySelectorAll('.widget');

        widgets.forEach(widget => {
            const widgetInfo = widget.querySelector('.widget-info h3');
            const trend = widget.querySelector('.trend');

            if (widgetInfo) {
                const currentValue = parseInt(widgetInfo.textContent.replace(/,/g, ''));
                const change = randomBetween(-10, 20);
                const newValue = Math.max(0, currentValue + change);

                // Format number with commas
                widgetInfo.textContent = newValue.toLocaleString('en-US');

                // Update trend indicator
                if (trend) {
                    if (change > 0) {
                        trend.classList.remove('down');
                        trend.classList.add('up');
                        trend.innerHTML = `<i class="fas fa-arrow-up"></i> ${Math.abs(change)}%`;
                    } else if (change < 0) {
                        trend.classList.remove('up');
                        trend.classList.add('down');
                        trend.innerHTML = `<i class="fas fa-arrow-down"></i> ${Math.abs(change)}%`;
                    } else {
                        trend.classList.remove('up', 'down');
                        trend.innerHTML = `<i class="fas fa-equals"></i> 0%`;
                    }
                }
            }
        });
    }

    // Update widgets every 30 seconds
    setInterval(updateWidgets, 30000);

    // =============================================
    // ============ PRINT FUNCTIONALITY ============
    // =============================================

    // Add print button to content header
    const printBtn = document.createElement('button');
    printBtn.className = 'btn btn-outline-primary btn-sm';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Chop etish';
    printBtn.addEventListener('click', function() {
        window.print();
    });

    const contentHeader = document.querySelector('.content-header');
    if (contentHeader) {
        contentHeader.appendChild(printBtn);
    }

    // =============================================
    // ============ THEME COLOR PICKER ============
    // =============================================

    // Add theme color picker to settings
    const themeColors = [
        { name: 'Binafsha', value: '#4361ee' },
        { name: 'Yashil', value: '#28a745' },
        { name: 'Qizil', value: '#dc3545' },
        { name: 'Sariq', value: '#ffc107' },
        { name: 'Ko\'k', value: '#17a2b8' }
    ];

    const themePicker = document.createElement('div');
    themePicker.className = 'theme-picker';
    themePicker.innerHTML = `
        <h4>Mavzu rangi</h4>
        <div class="theme-colors">
            ${themeColors.map(color => `
                <div class="theme-color" data-color="${color.value}" style="background-color: ${color.value}" title="${color.name}"></div>
            `).join('')}
        </div>
    `;

    // Find settings submenu and add theme picker
    const settingsSubmenu = document.querySelector('.sidebar-menu li a[href="#"] i.fa-cog').closest('li').querySelector('.submenu');
    if (settingsSubmenu) {
        const appearanceItem = Array.from(settingsSubmenu.querySelectorAll('li a')).find(item => item.textContent === "Ko'rinish");
        if (appearanceItem) {
            appearanceItem.insertAdjacentElement('afterend', themePicker);
        }
    }

    // Handle theme color selection
    document.querySelectorAll('.theme-color').forEach(color => {
        color.addEventListener('click', function() {
            const colorValue = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', colorValue);
            document.documentElement.style.setProperty('--primary-hover', shadeColor(colorValue, -20));

            // Save to localStorage
            localStorage.setItem('primaryColor', colorValue);
            localStorage.setItem('primaryHover', shadeColor(colorValue, -20));
        });
    });

    // Helper function to shade colors
    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
        const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
        const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }

    // Load saved theme color
    if (localStorage.getItem('primaryColor')) {
        document.documentElement.style.setProperty('--primary-color', localStorage.getItem('primaryColor'));
        document.documentElement.style.setProperty('--primary-hover', localStorage.getItem('primaryHover'));
    }

    // =============================================
    // ============ LANGUAGE SWITCHER ==============
    // =============================================

    // Add language switcher to top nav
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    languageSwitcher.innerHTML = `
        <select id="languageSelect">
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
        </select>
    `;

    const topNavRight = document.querySelector('.top-nav-right');
    if (topNavRight) {
        topNavRight.insertBefore(languageSwitcher, topNavRight.firstChild);
    }

    // Handle language change
    document.getElementById('languageSelect').addEventListener('change', function() {
        const lang = this.value;
        console.log(`Language changed to ${lang}`);
        // In a real app, you would implement actual language switching
    });

    // =============================================
    // ============ RESPONSIVE ADJUSTMENTS =========
    // =============================================

    // Handle window resize
    function handleResize() {
        if (window.innerWidth < 992) {
            sidebar.classList.add('active');
            mainContent.classList.add('sidebar-collapsed');
        } else {
            if (localStorage.getItem('sidebarState') !== 'collapsed') {
                sidebar.classList.remove('active');
                mainContent.classList.remove('sidebar-collapsed');
            }
        }
    }

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener('resize', debounce(handleResize, 200));

    // =============================================
    // ============ TOAST NOTIFICATIONS ============
    // =============================================

    // Custom toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">&times;</button>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);

        toast.querySelector('.toast-close').addEventListener('click', function() {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
    }

    // =============================================
    // ============ FORM VALIDATION ================
    // =============================================

    // Add form validation to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;

            // Validate required fields
            this.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            // Validate email fields
            this.querySelectorAll('input[type="email"]').forEach(field => {
                if (field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                e.preventDefault();
                showToast('Iltimos, barcha kerakli maydonlarni to\'ldiring', 'error');
            }
        });
    });

    // Add input validation
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });

    // =============================================
    // ============ PASSWORD TOGGLE ================
    // =============================================

    // Add password toggle functionality
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        const input = toggle.querySelector('input');
        const icon = toggle.querySelector('i');

        icon.addEventListener('click', function() {
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // =============================================
    // ============ SESSION TIMEOUT ================
    // =============================================

    // Session timeout warning
    let idleTimer;
    const timeoutInMinutes = 30;

    function resetIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            showToast('Sizning sessiyangiz yaqinda tugaydi. Faollikni davom ettiring.', 'warning');
        }, timeoutInMinutes * 60000);
    }

    // Reset timer on user activity
    ['mousemove', 'keypress', 'click', 'scroll'].forEach(event => {
        window.addEventListener(event, resetIdleTimer);
    });

    // Start timer
    resetIdleTimer();

    // =============================================
    // ============ INITIALIZATION COMPLETE ========
    // =============================================

    console.log('Doctor Davr Admin Panel initialized successfully');
});

// Add CSS for custom toast notifications
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .custom-toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #fff;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        padding: 15px;
        display: flex;
        align-items: center;
        max-width: 350px;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        z-index: 2000;
    }

    .custom-toast.show {
        transform: translateX(0);
    }

    .custom-toast.success {
        border-left: 4px solid #28a745;
    }

    .custom-toast.error {
        border-left: 4px solid #dc3545;
    }

    .custom-toast.warning {
        border-left: 4px solid #ffc107;
    }

    .custom-toast.info {
        border-left: 4px solid #17a2b8;
    }

    .custom-toast .toast-icon {
        margin-right: 10px;
        font-size: 1.2rem;
    }

    .custom-toast.success .toast-icon {
        color: #28a745;
    }

    .custom-toast.error .toast-icon {
        color: #dc3545;
    }

    .custom-toast.warning .toast-icon {
        color: #ffc107;
    }

    .custom-toast.info .toast-icon {
        color: #17a2b8;
    }

    .custom-toast .toast-message {
        flex: 1;
        font-size: 0.9rem;
    }

    .custom-toast .toast-close {
        background: none;
        border: none;
        font-size: 1rem;
        margin-left: 10px;
        cursor: pointer;
        color: var(--gray-color);
    }

    .notification-toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #fff;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        padding: 15px;
        display: flex;
        align-items: center;
        max-width: 350px;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        z-index: 2000;
    }

    .notification-toast.show {
        transform: translateX(0);
    }

    .notification-toast .toast-icon {
        margin-right: 10px;
        font-size: 1.2rem;
        color: var(--primary-color);
    }

    .notification-toast .toast-content {
        flex: 1;
    }

    .notification-toast .toast-content p {
        margin: 0;
        font-size: 0.9rem;
    }

    .notification-toast .toast-content small {
        font-size: 0.8rem;
        color: var(--gray-color);
    }

    .notification-toast .toast-close {
        background: none;
        border: none;
        font-size: 1rem;
        margin-left: 10px;
        cursor: pointer;
        color: var(--gray-color);
    }

    .theme-picker {
        padding: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .theme-picker h4 {
        margin-bottom: 10px;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.8);
    }

    .theme-colors {
        display: flex;
        gap: 10px;
    }

    .theme-color {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
        transition: transform 0.2s;
    }

    .theme-color:hover {
        transform: scale(1.1);
    }

    .dark-mode-toggle {
        display: flex;
        align-items: center;
        padding: 10px 0;
        color: rgba(255, 255, 255, 0.8);
    }

    .dark-mode-toggle i {
        margin-right: 10px;
        font-size: 1rem;
    }

    .dark-mode-toggle span {
        flex: 1;
        font-size: 0.9rem;
    }

    .language-switcher select {
        padding: 5px 10px;
        border-radius: var(--border-radius);
        border: 1px solid var(--gray-light);
        background-color: var(--white);
        color: var(--dark-color);
        font-size: 0.9rem;
    }

    .dark-mode .language-switcher select {
        background-color: #2a2a3a;
        color: #f0f0f0;
        border-color: #3a3a4a;
    }
`;
document.head.appendChild(toastStyles);