// DOM Elements
let appPreloader; 
document.addEventListener('DOMContentLoaded', function() {
    appPreloader = document.getElementById('preloader');
});
const uploadForm = document.getElementById('upload-form');
const photoUploadInput = document.getElementById('photo-upload');
const photoDateInput = document.getElementById('photo-date');
const photoDescriptionInput = document.getElementById('photo-description');
const selectedFilesContainer = document.getElementById('selected-files');
const uploadModal = document.getElementById('upload-modal');
const showUploadModalBtn = document.getElementById('show-upload-modal');
const closeUploadModalBtn = document.getElementById('close-upload-modal');
const cancelUploadBtn = document.getElementById('cancel-upload');
const submitUploadBtn = document.getElementById('submit-upload');
const emptyUploadBtn = document.getElementById('empty-upload-btn');
const monthFilter = document.getElementById('month-filter');
const personFilters = document.querySelectorAll('.badge[data-person]');
const photosTimeline = document.getElementById('photos-timeline');
const emptyTimeline = document.getElementById('empty-timeline');
const fullscreenView = document.getElementById('fullscreen-view');
const fullscreenImg = document.getElementById('fullscreen-img');
const closeFullscreenBtn = document.getElementById('close-fullscreen');
const prevPhotoBtn = document.getElementById('prev-photo');
const nextPhotoBtn = document.getElementById('next-photo');
const toastContainer = document.getElementById('toast-container');
const navUploadBtn = document.querySelector('.navbar-actions .btn');

// Set current date as default for photo upload
photoDateInput.valueAsDate = new Date();

// Event Listeners
document.addEventListener('DOMContentLoaded', initialize);
showUploadModalBtn.addEventListener('click', () => showModal(uploadModal));
if (navUploadBtn) {
    navUploadBtn.addEventListener('click', () => showModal(uploadModal));
}
closeUploadModalBtn.addEventListener('click', () => closeModal(uploadModal));
cancelUploadBtn.addEventListener('click', () => closeModal(uploadModal));
emptyUploadBtn.addEventListener('click', () => showModal(uploadModal));
submitUploadBtn.addEventListener('click', handlePhotoUpload);

monthFilter.addEventListener('change', filterPhotos);
personFilters.forEach(filter => {
    filter.addEventListener('click', togglePersonFilter);
});

closeFullscreenBtn.addEventListener('click', closeFullscreen);
prevPhotoBtn.addEventListener('click', showPrevPhoto);
nextPhotoBtn.addEventListener('click', showNextPhoto);

photoUploadInput.addEventListener('change', handleFileSelect);

// Keyboard navigation for fullscreen view
document.addEventListener('keydown', (e) => {
    if (fullscreenView.classList.contains('show')) {
        if (e.key === 'Escape') {
            closeFullscreen();
        } else if (e.key === 'ArrowLeft') {
            showPrevPhoto();
        } else if (e.key === 'ArrowRight') {
            showNextPhoto();
        }
    }
});

document.getElementById('close-upload-modal').onclick = function() {
    closeModal(document.getElementById('upload-modal'));
};

document.getElementById('cancel-upload').onclick = function() {
    closeModal(document.getElementById('upload-modal'));
};

// Initialize app - sử dụng biến photos từ photos.js
function initialize() {
    // Show appPreloader
    appPreloader.style.display = 'flex';
    appPreloader.querySelector('p').textContent = 'Đang tải ảnh...';
    
    // Fetch photos from server
    fetch('/api/photos')
        .then(response => response.json())
        .then(data => {
            // Gán dữ liệu cho biến photos từ photos.js
            window.photos = data;
            
            // Đảm bảo mỗi ảnh có thuộc tính monthYear
            window.photos.forEach(photo => {
                if (photo.date && !photo.monthYear) {
                    const photoDate = new Date(photo.date);
                    photo.monthYear = `${photoDate.getFullYear()}-${String(photoDate.getMonth() + 1).padStart(2, '0')}`;
                }
                // Đảm bảo mỗi ảnh có thuộc tính description
                if (!photo.description) {
                    photo.description = "";
                }
            });
            
            // Gọi hàm filterPhotos từ photos.js
            filterPhotos();
            
            if (window.photos.length === 0) {
                emptyTimeline.style.display = 'block';
            } else {
                emptyTimeline.style.display = 'none';
            }
            
            // Hide appPreloader
            appPreloader.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
            showToast('Lỗi', 'Không thể tải dữ liệu ảnh', 'error');
            
            // Hide appPreloader
            appPreloader.style.display = 'none';
        });
}