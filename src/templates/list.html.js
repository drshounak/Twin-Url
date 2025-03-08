export default (keys) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - Twin-Url | Modern URL Shortener for Professionals</title>
  <link rel="icon" type="image/x-icon" href="https://assets.2tw.in/twin-url-logo.webp">
  <link rel="manifest" href="/manifest.json"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
  :root {
    --primary: #D32C4B;
    --primary-hover: #F44336;
    --primary-light: rgba(229, 113, 113, 0.3);
    --primary-medium: rgba(229, 113, 113, 0.5);
    --text: #FFFFFF;
    --text-muted: #9CA3AF;
    --bg-dark: #0F0F0F;
    --bg-card: #1A1A19;
    --transition: all 0.2s ease;
  }
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body { 
    font-family: 'Inter', sans-serif; 
    background: var(--bg-dark); 
    color: var(--text); 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column;
    line-height: 1.6;
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--primary-light);
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .logo img {
    height: 32px;
    width: auto;
  }
  
  .logo h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-links a {
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
  }
  
  .nav-links a:hover {
    color: var(--primary);
  }
  
  .header {
    text-align: center;
    padding: 3rem 2rem 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(90deg, #FFFFFF 0%, #D32C4B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
  }
  
  .header p {
    font-size: 1.1rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .container { 
    max-width: 1000px; 
    width: 100%; 
    background: var(--bg-card); 
    padding: 2rem;
    margin: 0 auto 4rem;
    border-radius: 12px; 
    border: 1px solid var(--primary-medium);
    box-shadow: 0 8px 24px rgba(211, 44, 75, 0.15);
  }
  
  .header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .search-container {
    flex: 1;
    max-width: 400px;
    position: relative;
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }
  
  #search-input {
    width: 100%;
    background: var(--bg-dark);
    border: 1px solid var(--primary-light);
    border-radius: 8px;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    color: var(--text);
    font-size: 0.95rem;
    transition: var(--transition);
  }
  
  #search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(211, 44, 75, 0.2);
  }
  
  .action-button {
    background: var(--primary);
    color: var(--text);
    border: none;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }
  
  .action-button:hover {
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(211, 44, 75, 0.25);
  }
  
  .links-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
  }
  
  .links-table th {
    text-align: left;
    padding: 1rem;
    font-weight: 600;
    color: var(--text-muted);
    border-bottom: 1px solid var(--primary-light);
  }
  
  .links-table td {
    padding: 1rem;
    border-bottom: 1px solid var(--primary-light);
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-all;
  }
  
  .links-table tr:last-child td {
    border-bottom: none;
  }
  
  .links-table tbody tr {
    transition: var(--transition);
  }
  
  .links-table tbody tr:hover {
    background: rgba(211, 44, 75, 0.05);
  }

  .links-table tr.hidden {
    display: none;
  }
  
  .path-cell {
    width: 25%;
    color: var(--primary);
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .destination-cell {
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-muted);
    position: relative;
  }
  
  .destination-cell .tooltip {
    visibility: hidden;
    position: absolute;
    left: 0;
    top: 100%;
    background: var(--bg-card);
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid var(--primary-medium);
    z-index: 100;
    width: max-content;
    max-width: 400px;
    word-break: break-all;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .destination-cell:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
  
  .actions-cell {
    width: 25%;
    text-align: right;
  }
  
  .table-button {
    background: transparent;
    border: 1px solid var(--primary-light);
    color: var(--text);
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    margin-left: 0.5rem;
  }
  
  .table-button:hover {
    border-color: var(--primary);
    color: var(--primary);
    background: rgba(211, 44, 75, 0.05);
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
  }
  
  .empty-state-icon {
    margin-bottom: 1.5rem;
  }
  
  .empty-state h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .empty-state p {
    color: var(--text-muted);
    max-width: 400px;
    margin: 0 auto 1.5rem;
  }

  .no-results {
    text-align: center;
    padding: 2rem;
    color: var(--text-muted);
    display: none;
  }
  
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .modal.show {
    opacity: 1;
    display: flex;
  }
  
  .modal-content {
    background: var(--bg-card);
    border-radius: 12px;
    border: 1px solid var(--primary-medium);
    width: 90%;
    max-width: 450px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transform: translateY(20px);
    transition: transform 0.3s;
  }
  
  .modal.show .modal-content {
    transform: translateY(0);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .modal-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .close-modal {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0.25rem;
    transition: var(--transition);
  }
  
  .close-modal:hover {
    color: var(--primary);
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .form-group label {
    display: block;
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input {
    width: 100%;
    background: var(--bg-dark);
    border: 1px solid var(--primary-light);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: var(--text);
    font-size: 0.95rem;
    transition: var(--transition);
  }
  
  .form-group input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(211, 44, 75, 0.2);
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .form-actions button {
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .cancel-button {
    background: transparent;
    border: 1px solid var(--primary-light);
    color: var(--text);
  }
  
  .cancel-button:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  .submit-button {
    background: var(--primary);
    color: var(--text);
    border: none;
  }
  
  .submit-button:hover {
    background: var(--primary-hover);
    box-shadow: 0 4px 12px rgba(211, 44, 75, 0.25);
  }
  
  .notification {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    background: var(--bg-card);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--primary-medium);
    color: var(--primary);
    font-size: 0.95rem;
    font-weight: 500;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
  }
  
  .notification.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    gap: 0.5rem;
  }
  
  .pagination-button {
    background: transparent;
    border: 1px solid var(--primary-light);
    color: var(--text);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
  }
  
  .pagination-button:hover,
  .pagination-button.active {
    border-color: var(--primary);
    color: var(--primary);
    background: rgba(211, 44, 75, 0.05);
  }
  
  footer {
    margin-top: auto;
    padding: 2rem;
    font-size: 0.9rem;
    color: var(--text-muted);
    text-align: center;
    border-top: 1px solid var(--primary-light);
  }
  
  footer a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
  }
  
  footer a:hover {
    color: var(--primary-hover);
  }
  
  @media (max-width: 768px) {
    .header h1 {
      font-size: 2rem;
    }
    
    .header p {
      font-size: 1rem;
    }
    
    .nav {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    
    .container {
      padding: 1.5rem;
    }
    
    .header-actions {
      flex-direction: column;
      gap: 1rem;
    }
    
    .search-container {
      max-width: 100%;
    }
    
    .links-table th:not(:first-child):not(:last-child),
    .links-table td:not(:first-child):not(:last-child) {
      display: none;
    }
    
    .links-table th:first-child,
    .links-table td:first-child {
      width: 60%;
    }
    
    .links-table th:last-child,
    .links-table td:last-child {
      width: 40%;
    }
  }
</style>
</head>
<body>
  <nav class="nav">
    <div class="logo">
      <img src="https://assets.2tw.in/twin-url-logo.webp" alt="Twin-Url Logo">
      <h2>Twin-Url</h2>
    </div>
    <div class="nav-links">
      <a href="/">Home</a>
      <a href="/list" class="active">Dashboard</a>
      <a href="https://2tw.in/GBnNcmic">GitHub</a>
    </div>
  </nav>

  <header class="header">
    <h1>Your Link Dashboard</h1>
    <p>Manage your shortened links, track their performance, and optimize your digital presence.</p>
  </header>

  <div class="container">
    <div class="header-actions">
      <div class="search-container">
        <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="search-input" placeholder="Search links...">
      </div>
      <a href="/" class="action-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Create New Link
      </a>
    </div>

    ${keys.length > 0 ? `
    <table class="links-table">
      <thead>
        <tr>
          <th>Short Link</th>
          <th>Destination</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${keys.map(({ name, value }) => `
          <tr class="table-row">
            <td class="path-cell copy-key" data-key="${name}" title="Click to copy">
              ${name}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px; vertical-align: -3px;">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </td>
            <td class="destination-cell">
              ${value}
              <div class="tooltip">${value}</div>
            </td>
            <td class="actions-cell">
              <button class="table-button modify-btn" data-path="${name}" data-url="${value}">
                Edit
              </button>
              <button class="table-button delete-btn" data-path="${name}">
                Delete
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="no-results">
      <p>No links found matching your search.</p>
    </div>
    ` : `
    <div class="empty-state">
      <div class="empty-state-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D32C4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </div>
      <h3>No Links Yet</h3>
      <p>Start creating shortened URLs to manage and track them from this dashboard.</p>
      <a href="/" class="action-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Create Your First Link
      </a>
    </div>
    `}
    
    ${keys.length > 10 ? `
    <div class="pagination">
      <button class="pagination-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="pagination-button active">1</button>
      <button class="pagination-button">2</button>
      <button class="pagination-button">3</button>
      <button class="pagination-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
    ` : ''}
  </div>

  <div id="modifyModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edit Link</h2>
        <button class="close-modal" data-modal="modifyModal">&times;</button>
      </div>
      <form id="modify-form">
        <div class="form-group">
          <label for="modify-path">Short Link</label>
          <input type="text" id="modify-path" name="path" readonly>
        </div>
        <div class="form-group">
          <label for="modify-url">Destination URL</label>
          <input type="url" id="modify-url" name="url" placeholder="https://example.com" required>
        </div>
        <div class="form-group">
          <label for="modify-code">Secret Code</label>
          <input type="text" id="modify-code" name="secretCode" placeholder="Enter secret code" required>
        </div>
        <div class="form-actions">
          <button type="button" class="cancel-button" data-modal="modifyModal">Cancel</button>
          <button type="submit" class="submit-button">Save Changes</button>
        </div>
      </form>
    </div>
  </div>

  <div id="deleteModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Delete Link</h2>
        <button class="close-modal" data-modal="deleteModal">&times;</button>
      </div>
      <form id="delete-form">
        <div class="form-group">
          <label for="delete-path">Short Link</label>
          <input type="text" id="delete-path" name="path" readonly>
        </div>
        <div class="form-group">
          <label for="delete-code">Secret Code</label>
          <input type="text" id="delete-code" name="secretCode" placeholder="Enter secret code" required>
        </div>
        <div class="form-actions">
          <button type="button" class="cancel-button" data-modal="deleteModal">Cancel</button>
          <button type="submit" class="submit-button">Delete Link</button>
        </div>
      </form>
    </div>
  </div>

  <footer>
    <p>© 2025 Twin-Url. All rights reserved.</p>
    <p>Powered by <a href="https://2tw.in">Twin-Url</a> on Cloudflare Workers | <a href="https://2tw.in/GBnNcmic">Fork on GitHub</a></p>
  </footer>

  <div id="notification" class="notification"></div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const modifyModal = document.getElementById('modifyModal');
      const deleteModal = document.getElementById('deleteModal');
      const modifyForm = document.getElementById('modify-form');
      const deleteForm = document.getElementById('delete-form');
      const notification = document.getElementById('notification');
      const searchInput = document.getElementById('search-input');
      const tableRows = document.querySelectorAll('.table-row');
      const noResults = document.querySelector('.no-results');
      
      // Show notification
      function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 2500);
      }
      
      // Open modal
      function openModal(modal) {
        document.body.style.overflow = 'hidden';
        modal.classList.add('show');
      }
      
      // Close modal
      function closeModal(modal) {
        document.body.style.overflow = '';
        modal.classList.remove('show');
      }
      
      // Search functionality
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          const searchTerm = this.value.toLowerCase().trim();
          let visibleRows = 0;
          
          tableRows.forEach(row => {
            const pathCell = row.querySelector('.path-cell').textContent.toLowerCase().trim();
            const destinationCell = row.querySelector('.destination-cell').textContent.toLowerCase().trim();
            
            if (pathCell.includes(searchTerm) || destinationCell.includes(searchTerm)) {
              row.classList.remove('hidden');
              visibleRows++;
            } else {
              row.classList.add('hidden');
            }
          });
          
          // Show/hide "No results" message
          if (visibleRows === 0 && searchTerm !== '') {
            noResults.style.display = 'block';
          } else {
            noResults.style.display = 'none';
          }
        });
      }
      
      // Close modal buttons
      document.querySelectorAll('.close-modal, .cancel-button').forEach(btn => {
        btn.addEventListener('click', () => {
          const modalId = btn.getAttribute('data-modal');
          closeModal(document.getElementById(modalId));
        });
      });
      
      // Close modal when clicking outside
      document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeModal(modal);
          }
        });
      });
      
      // Table click handlers
      document.querySelector('.links-table')?.addEventListener('click', (e) => {
        // Copy path
        if (e.target.closest('.copy-key')) {
          const key = e.target.closest('.copy-key').getAttribute('data-key');
          const url = location.origin + '/' + key;
          navigator.clipboard.writeText(url)
            .then(() => showNotification('Link copied to clipboard!'))
            .catch(err => showNotification('Copy failed. Please try again.'));
        }
        
        // Modify button
        if (e.target.closest('.modify-btn')) {
          const btn = e.target.closest('.modify-btn');
          const path = btn.getAttribute('data-path');
          const url = btn.getAttribute('data-url');
          
          document.getElementById('modify-path').value = path;
          document.getElementById('modify-url').value = url;
          document.getElementById('modify-code').value = '';
          
          openModal(modifyModal);
        }
        
        // Delete button
        if (e.target.closest('.delete-btn')) {
          const btn = e.target.closest('.delete-btn');
          const path = btn.getAttribute('data-path');
          
          document.getElementById('delete-path').value = path;
          document.getElementById('delete-code').value = '';
          
          openModal(deleteModal);
        }
      });
      
      // Modify form submission
      modifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = modifyForm.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Saving...';
        submitBtn.disabled = true;
        
        const formData = new FormData(modifyForm);
        
        try {
          const response = await fetch('/api/redirects', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData),
          });
          
          const message = await response.text();
          showNotification(message);
          
          if (response.ok) {
            closeModal(modifyModal);
            setTimeout(() => location.reload(), 1000);
          }
        } catch (error) {
          showNotification('An error occurred. Please try again.');
        } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
      
      // Delete form submission
      deleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const path = deleteForm.path.value;
        const secretCode = deleteForm.secretCode.value;
        const response = await fetch('/api/redirects', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ path, secretCode }),
        });
        const message = await response.text();
        showNotification(message);
        if (response.ok) location.reload();
        deleteModal.style.display = 'none';
      });

      // Close modals when clicking outside
      [modifyModal, deleteModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.style.display = 'none';
        });
      });
    });
  </script>
</body>
</html>
`;
