

document.addEventListener('DOMContentLoaded', function() {
    const clubsGrid = document.getElementById('clubs-grid');
    const clubsCount = document.getElementById('clubs-count');
    const searchInput = document.getElementById('club-search');
    const categoryFilter = document.getElementById('category-filter');
    const emptyState = document.getElementById('empty-state');
    
    
    renderClubs(clubsData);
    
   
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterClubs, 300));
    }
    
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterClubs);
    }
    
    
    function filterClubs() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : '';
        
        let filteredClubs = clubsData.filter(club => {
            const matchesSearch = club.name.toLowerCase().includes(searchTerm) ||
                                  club.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || club.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        renderClubs(filteredClubs);
    }
    
    
    function renderClubs(clubs) {
        if (!clubsGrid) return;
        
        
        if (clubsCount) {
            clubsCount.textContent = `Showing ${clubs.length} club${clubs.length !== 1 ? 's' : ''}`;
        }
        
        
        if (clubs.length === 0) {
            clubsGrid.classList.add('hidden');
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }
        
        clubsGrid.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');
        
        clubsGrid.innerHTML = clubs.map(club => createClubCard(club)).join('');
    }
    
    
    function createClubCard(club) {
        return `
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 group">
                <div class="h-32 bg-gradient-to-br ${club.gradient} flex items-center justify-center relative">
                    <span class="text-5xl group-hover:scale-110 transition-transform duration-300">${club.logo}</span>
                    <div class="absolute inset-0 bg-black/10"></div>
                </div>
                <div class="p-5">
                    <div class="mb-3">
                        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full capitalize">
                            ${club.category}
                        </span>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary transition">
                        ${club.name}
                    </h3>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${club.description}</p>
                    
                    <div class="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            ${club.members} members
                        </div>
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            ${club.events} events
                        </div>
                    </div>
                    
                    <button class="w-full mt-4 bg-gradient-to-r ${club.gradient} text-white py-2 rounded-lg font-medium hover:shadow-lg transition text-sm">
                        Join Club
                    </button>
                </div>
            </div>
        `;
    }
    
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});
