        function showSection(sectionId) {
            // Oculta todas las secciones
            document.querySelectorAll('main > section').forEach(section => {
                section.classList.add('hidden');
            });
            // Muestra la sección deseada
            document.getElementById(sectionId).classList.remove('hidden');
            document.querySelector('main').classList.add('hidden');
        }

        function resetPage() {
            // Muestra el main y oculta todas las secciones
            document.querySelectorAll('main > section').forEach(section => {
                section.classList.add('hidden');
            });
            document.querySelector('main').classList.remove('hidden');
        }
    
