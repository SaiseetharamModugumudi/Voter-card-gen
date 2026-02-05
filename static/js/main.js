// Main JavaScript for Voter ID Card Generator

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips and popovers if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        initBootstrapComponents();
    }

    // Setup form validations
    setupFormValidation();

    // Setup search functionality
    setupSearch();

    // Setup delete confirmation
    setupDeleteConfirmation();
});

/**
 * Initialize Bootstrap tooltips and popovers
 */
function initBootstrapComponents() {
    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Popover initialization
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Setup form validation
 */
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

/**
 * Setup search functionality
 */
function setupSearch() {
    const searchForm = document.querySelector('form[action*="search"]');
    if (searchForm) {
        const searchInput = searchForm.querySelector('input[name="q"]');
        if (searchInput) {
            // Add debounce to search input
            let searchTimeout;
            searchInput.addEventListener('input', function() {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(function() {
                    // Can add auto-search functionality here
                }, 500);
            });
        }
    }
}

/**
 * Setup delete confirmation dialog
 */
function setupDeleteConfirmation() {
    const deleteForms = document.querySelectorAll('form[action*="delete"]');
    deleteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!confirm('Are you sure you want to delete this voter card? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    });
}

/**
 * Format date to Indian format (DD/MM/YYYY)
 */
function formatDateToIndian(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Calculate age from date of birth
 */
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

/**
 * Validate Indian Voter ID format (example: ABC1234567890)
 */
function validateVoterID(voterId) {
    const pattern = /^[A-Z]{3}[0-9]{10}$/;
    return pattern.test(voterId);
}

/**
 * Validate photo file size
 */
function validatePhotoFile(file, maxSizeMB = 5) {
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
        showNotification(`File size exceeds ${maxSizeMB}MB limit`, 'error');
        return false;
    }

    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return false;
    }

    return true;
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    const alertClass = `alert-${type}`;
    const alertHTML = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${getAlertIcon(type)} ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    const container = document.querySelector('main .container');
    if (container) {
        container.insertAdjacentHTML('afterbegin', alertHTML);
    }
}

/**
 * Get alert icon based on type
 */
function getAlertIcon(type) {
    const icons = {
        'success': '<i class="fas fa-check-circle"></i>',
        'error': '<i class="fas fa-exclamation-circle"></i>',
        'warning': '<i class="fas fa-exclamation-triangle"></i>',
        'info': '<i class="fas fa-info-circle"></i>'
    };
    return icons[type] || icons['info'];
}

/**
 * Print voter card
 */
function printVoterCard() {
    const printContent = document.querySelector('.voter-id-container');
    if (printContent) {
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent.outerHTML;
        window.print();
        document.body.innerHTML = originalContent;
        location.reload();
    }
}

/**
 * Download voter card as PDF (requires additional library)
 */
function downloadVoterCardPDF() {
    showNotification('PDF download feature coming soon!', 'info');
    // This would require a library like html2pdf or jsPDF
}

/**
 * Export voter cards as CSV
 */
function exportVoterCardsCSV(data) {
    if (!data || data.length === 0) {
        showNotification('No data to export', 'warning');
        return;
    }

    const headers = Object.keys(data[0]);
    let csv = headers.join(',') + '\n';

    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            // Escape commas and quotes in values
            return `"${String(value).replace(/"/g, '""')}"`;
        });
        csv += values.join(',') + '\n';
    });

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `voter_cards_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

/**
 * Fetch voter card data via API
 */
async function fetchVoterCardData(cardId) {
    try {
        const response = await fetch(`/api/card/${cardId}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch voter card data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching voter card:', error);
        showNotification('Error loading voter card data', 'error');
        return null;
    }
}

/**
 * Update voter card display with fetched data
 */
async function updateVoterCardDisplay(cardId) {
    const data = await fetchVoterCardData(cardId);
    if (data) {
        // Update card display elements
        const cardElements = document.querySelectorAll('[data-field]');
        cardElements.forEach(element => {
            const field = element.getAttribute('data-field');
            if (data[field]) {
                element.textContent = data[field];
            }
        });
    }
}

/**
 * Setup real-time form validation
 */
function setupRealtimeValidation() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            // Remove validation class while typing
            this.classList.remove('is-invalid', 'is-valid');
        });
    });
}

/**
 * Validate individual field
 */
function validateField(field) {
    if (!field.value.trim()) {
        field.classList.add('is-invalid');
        return false;
    }

    // Additional validations based on field type
    if (field.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            field.classList.add('is-invalid');
            return false;
        }
    }

    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    return true;
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Setup voter card card interaction
 */
function setupVoterCardInteraction() {
    const voterCards = document.querySelectorAll('.voter-card-item');
    
    voterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Setup navigation active state
 */
function setupNavigationActiveState() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize all components on page load
 */
function initializeApp() {
    setupRealtimeValidation();
    setupVoterCardInteraction();
    setupNavigationActiveState();

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export functions for external use
window.VoterIDApp = {
    calculateAge,
    formatDateToIndian,
    validateVoterID,
    validatePhotoFile,
    showNotification,
    printVoterCard,
    downloadVoterCardPDF,
    exportVoterCardsCSV,
    fetchVoterCardData,
    updateVoterCardDisplay
};
