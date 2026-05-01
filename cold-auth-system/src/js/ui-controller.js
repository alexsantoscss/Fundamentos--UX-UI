const UIController = {
    toggleForms: (hideId, showId) => {
        const hideEl = document.getElementById(hideId);
        const showEl = document.getElementById(showId);

        hideEl.classList.add('fade-out');
        
        setTimeout(() => {
            hideEl.classList.add('hidden');
            hideEl.classList.remove('fade-out');
            
            showEl.classList.remove('hidden');
            showEl.classList.add('fade-in');
            
            setTimeout(() => {
                showEl.classList.remove('fade-in');
            }, 500);
        }, 400);
    },

    setLoading: (btnId, isLoading) => {
        const btn = document.getElementById(btnId);
        if (isLoading) {
            btn.classList.add('btn-loading');
            btn.disabled = true;
        } else {
            btn.classList.remove('btn-loading');
            btn.disabled = false;
        }
    },

    showSuccess: () => {
        const overlay = document.getElementById('success-overlay');
        overlay.classList.remove('hidden');
    }
};