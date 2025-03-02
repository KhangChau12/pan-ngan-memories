// Mở modal 
function showModal(modal) {
    modal.classList.add('show');
}

// Đóng modal
function closeModal(modal) {
    console.log("Đóng modal:", modal);
    if (modal) {
        modal.classList.remove('show');
    } else {
        console.error("Modal không tồn tại");
        // Nếu không tìm thấy modal, đóng tất cả các modal
        document.querySelectorAll('.modal.show').forEach(m => {
            m.classList.remove('show');
        });
    }
}

// Hiển thị thông báo toast
function showToast(title, message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success'
        ? '<i class="fas fa-check-circle toast-icon"></i>'
        : '<i class="fas fa-exclamation-circle toast-icon"></i>';
    
    toast.innerHTML = `
        ${icon}
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    // Thêm chức năng đóng
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
    
    // Tự động xóa sau 4 giây
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 4000);
    
    toastContainer.appendChild(toast);
}

// Thêm vào cuối file ui.js
document.addEventListener('DOMContentLoaded', function() {
    // Tìm tất cả các nút đóng modal
    document.querySelectorAll('[id="close-upload-modal"], [id="cancel-upload"]').forEach(function(button) {
        button.addEventListener('click', function() {
            // Tìm modal gần nhất
            const modal = document.getElementById('upload-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
});