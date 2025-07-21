// Methadone Converter - Client-side functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('conversionForm');
    const dosageInput = document.getElementById('dosage');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    // Form validation
    function validateDosage(value) {
        const num = parseFloat(value);
        return !isNaN(num) && num > 0 && num <= 1000; // Reasonable upper limit
    }

    // Real-time input validation
    dosageInput.addEventListener('input', function() {
        const value = this.value.trim();
        const isValid = value === '' || validateDosage(value);
        
        if (isValid) {
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            submitButton.disabled = false;
        } else {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
            submitButton.disabled = true;
        }
    });

    // Form submission handling
    form.addEventListener('submit', function(e) {
        const dosageValue = dosageInput.value.trim();
        
        // Client-side validation
        if (!dosageValue) {
            e.preventDefault();
            showAlert('Please enter a dosage amount.', 'error');
            dosageInput.focus();
            return;
        }

        if (!validateDosage(dosageValue)) {
            e.preventDefault();
            showAlert('Please enter a valid dosage between 0.01 and 1000 mg.', 'error');
            dosageInput.focus();
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Converting...';
        
        // Re-enable button after a delay (in case of server error)
        setTimeout(function() {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }, 10000);
    });

    // Custom alert function
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());

        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Insert alert at the top of the main content
        const container = document.querySelector('.col-lg-8');
        container.insertBefore(alertDiv, container.firstChild);

        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            if (alertDiv && alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Auto-dismiss alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(function() {
            if (alert && alert.parentNode) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 5000);
    });

    // Number input formatting
    dosageInput.addEventListener('blur', function() {
        const value = parseFloat(this.value);
        if (!isNaN(value) && value > 0) {
            this.value = value.toFixed(2);
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            dosageInput.value = '';
            dosageInput.classList.remove('is-valid', 'is-invalid');
            dosageInput.focus();
        }
    });

    // Focus management
    dosageInput.focus();

    // Accessibility improvements
    dosageInput.setAttribute('aria-describedby', 'dosage-help');
    
    // Add screen reader announcements for results
    const resultsCard = document.querySelector('.border-success');
    if (resultsCard) {
        resultsCard.setAttribute('role', 'region');
        resultsCard.setAttribute('aria-label', 'Conversion results');
    }
});

// Utility functions
function formatNumber(num, decimals = 2) {
    return parseFloat(num).toFixed(decimals);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showAlert('Copied to clipboard!', 'success');
    }).catch(function() {
        showAlert('Failed to copy to clipboard.', 'error');
    });
}

// Print functionality
function printResults() {
    window.print();
}

// Export functionality (if needed in the future)
function exportResults() {
    const results = document.querySelector('.border-success');
    if (results) {
        // Implementation for exporting results
        console.log('Export functionality would go here');
    }
}
