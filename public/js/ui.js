// Mở modal 
function showModal(modal) {
    modal.classList.add('show');
}

// Đóng modal
function closeModal(modal) {
    console.log("Attempting to close modal:", modal);
    
    // Kiểm tra xem có phải element hay không
    if (modal instanceof Element) {
        modal.classList.remove('show');
        // Thêm các thuộc tính CSS trực tiếp để đảm bảo modal ẩn
        modal.style.opacity = "0";
        modal.style.visibility = "hidden";
        console.log("Modal removed show class");
    } else {
        console.error("Modal is not a valid element:", modal);
        // Nếu không phải element, đóng mọi modal đang hiển thị
        document.querySelectorAll('.modal.show').forEach(m => {
            m.classList.remove('show');
            m.style.opacity = "0";
            m.style.visibility = "hidden";
            console.log("Closed modal via querySelector");
        });
    }
    
    // Đóng chính xác modal tải ảnh bằng ID
    const uploadModal = document.getElementById('upload-modal');
    if (uploadModal) {
        uploadModal.classList.remove('show');
        uploadModal.style.opacity = "0";
        uploadModal.style.visibility = "hidden";
        console.log("Closed upload-modal specifically");
    }
}

// Thêm trực tiếp vào tất cả các nút đóng modal
document.addEventListener('DOMContentLoaded', function() {
    // Nút X trong modal
    const closeBtn = document.getElementById('close-upload-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Ngăn chặn event bubbling
            console.log("Close button clicked");
            closeModal(document.getElementById('upload-modal'));
        });
    }
    
    // Nút Hủy
    const cancelBtn = document.getElementById('cancel-upload');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Ngăn chặn event bubbling
            console.log("Cancel button clicked");
            closeModal(document.getElementById('upload-modal'));
        });
    }
    
    // Đóng modal khi click bên ngoài
    const modalDialog = document.querySelector('.modal-dialog');
    if (modalDialog) {
        document.getElementById('upload-modal').addEventListener('click', function(e) {
            // Nếu click ngoài dialog
            if (!modalDialog.contains(e.target)) {
                closeModal(document.getElementById('upload-modal'));
            }
        });
    }
});

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
