document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Show success message (in production, you would send this data to a server)
            showMessage('Thank you for your message. We will get back to you soon!', 'success');
            
            // Clear form
            contactForm.reset();
        });
    }
});

function validateForm(data) {
    // Name validation
    if (data.name.length < 2) {
        showMessage('Please enter a valid name', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showMessage('Please enter a valid phone number', 'error');
        return false;
    }
    
    // Service validation
    if (!data.service) {
        showMessage('Please select a service', 'error');
        return false;
    }
    
    // Message validation
    if (data.message.length < 10) {
        showMessage('Please enter a message (minimum 10 characters)', 'error');
        return false;
    }
    
    return true;
}

function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert message after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Add styles for messages
const styles = `
    .form-message {
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 5px;
        text-align: center;
    }
    
    .form-message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet); 