document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.switcher-btn');
    const themeContents = document.querySelectorAll('.theme-section');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            
            // Add active to clicked button
            btn.classList.add('active');
            
            // Get target theme (skillverse or musicverse)
            const target = btn.getAttribute('data-target');
            
            // Change body class to update CSS variables & toggle pill position
            document.body.className = `theme-${target}`;
            
            // Hide all content sections
            themeContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show targeted content section
            const targetContent = document.getElementById(`${target}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});
