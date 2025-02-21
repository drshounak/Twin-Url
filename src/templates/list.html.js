export default (keys) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>List - Twin-Url</title>
  <link rel="icon" type="image/x-icon" href="https://assets.2tw.in/twin-url-logo.webp">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { 
    font-family: 'Inter', sans-serif; 
    background: #1a1a19; 
    color: #FFFFFF; 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    padding: 2rem; 
  }
  header { text-align: center; margin-bottom: 2rem; }
  h1 { font-size: 2.5rem; font-weight: 600; color: #FFFFFF; }
  header p { font-size: 1.1rem; color: #e63d45; margin-top: 0.5rem; }
  .container { 
    max-width: 900px; 
    width: 100%; 
    background: #1a1a19; 
    padding: 1.5rem; 
    border-radius: 8px; 
    border: 1px solid rgb(229, 113, 113, 0.5); /* Lighter red shade for borders */
    margin: 0 auto; 
    overflow-x: auto; 
  }
  .search-container { 
    margin-bottom: 1.5rem; 
    display: flex; 
    gap: 1rem; 
  }
  #search-input { 
    flex: 1; 
    background: #1a1a19; 
    border: 1px solid rgb(229, 113, 113, 0.3); /* Lighter red shade for borders */
    border-radius: 6px; 
    padding: 0.75rem; 
    color: #FFFFFF; 
    font-size: 1rem; 
  }
  #search-input:focus { 
    outline: none; 
    border-color: #D32C4B; 
  }
  table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid rgb(229, 113, 113, 0.5); /* Lighter red shade for borders */ }
  th { color: #F5F5F5; font-weight: 500; }
  .path-cell { 
    width: 28%; 
    color: #c13449; 
    cursor: pointer; 
    max-width: 0; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap; 
  }
  .path-cell:hover { color: #F44336; }
  .destination-cell { 
    width: 52%; 
    word-wrap: break-word; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    max-width: 0; 
    position: relative; 
  }
  .destination-cell:hover::after { 
    content: attr(title); 
    position: absolute; 
    left: 0; 
    top: 100%; 
    background: #1a1a19; 
    padding: 0.5rem; 
    border-radius: 4px; 
    border: 1px solid rgb(229, 113, 113, 0.5); /* Lighter red shade for borders */
    z-index: 10; 
    white-space: normal; 
    word-break: break-all; 
    max-width: 400px; 
    box-shadow: 0 2px 4px rgba(230, 61, 69, 0.1); /* Red shadow for consistency */
  }

  .actions-cell { width: 20%; }
  .actions-cell button { 
    background: none; 
    border: 1px solid rgb(229, 113, 113, 0.3); /* Lighter red shade for borders */
    padding: 0.5rem; 
    border-radius: 6px; 
    color: #FFFFFF; 
    cursor: pointer; 
    font-size: 0.8rem; 
    transition: border-color 0.2s, color 0.2s; 
    margin-right: 0.5rem; 
  }
  .actions-cell button:hover { border-color: #D32C4B; color: #D32C4B; }
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
  }
  .modal-content { 
    background: #1a1a19; 
    padding: 1.5rem; 
    border-radius: 8px; 
    border: 1px solid rgb(229, 113, 113, 0.5); /* Lighter red shade for borders */
    width: 100%; 
    max-width: 400px; 
  }
  .modal-content h2 { font-size: 1.25rem; color: #FFFFFF; margin-bottom: 1rem; }
  .modal-content form { display: flex; flex-direction: column; gap: 1rem; }
  .modal-content input { 
    background: #1a1a19; 
    border: 1px solid rgb(229, 113, 113, 0.3); /* Lighter red shade for borders */
    border-radius: 6px; 
    padding: 0.75rem; 
    color: #FFFFFF; 
  }
  .modal-content input:focus { outline: none; border-color: #D32C4B; }
  .modal-content button { 
    background: #D32C4B; 
    color: #FFFFFF; 
    border: none; 
    padding: 0.75rem; 
    border-radius: 6px; 
    font-weight: 500; 
    cursor: pointer; 
  }
  .modal-content button:hover { background: #F44336; }
  .links { margin-bottom: 1.5rem; display: flex; gap: 1rem; justify-content: center; }
  .links a { color: #D32C4B; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .links a:hover { color: #F44336; }
  footer { margin-top: auto; padding: 1rem; font-size: 0.8rem; color: #F5F5F5; text-align: center; }
  footer a { color: #e63d45; text-decoration: none; }
  footer a:hover { color: #F44336; }
  .notification { 
    position: fixed; 
    top: 1rem; 
    right: 1rem; 
    background: #1a1a19; 
    padding: 0.5rem 1rem; 
    border-radius: 6px; 
    border: 1px solid rgb(229, 113, 113, 0.5); /* Lighter red shade for borders */
    color: #e63d45; 
    font-size: 0.9rem; 
    opacity: 0; 
    transition: opacity 0.3s ease-out; 
  }
  .notification.show { opacity: 1; }
</style>
</head>
<body>
  <header>
    <h1>Twin-Url</h1>
    <p>Transform long URLs into sleek Twins. Shorten, shine, succeed.</p>
  </header>
  <div class="container">
    <div class="links">
      <a href="/">Home</a>
    </div>
    <table>
      <thead>
        <tr>
          <th class="path-cell">Path</th>
          <th class="destination-cell">Destination</th>
          <th class="actions-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        ${keys.map(({ name, value }) => `
          <tr>
            <td class="path-cell copy-key" data-key="${name}">${name}</td>
            <td class="destination-cell" title="${value}">${value}</td>
            <td class="actions-cell">
              <button class="modify-btn" data-path="${name}" data-url="${value}">Modify</button>
              <button class="delete-btn" data-path="${name}">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  <div id="modifyModal" class="modal">
    <div class="modal-content">
      <h2>Modify Link</h2>
      <form id="modify-form">
        <label>Path</label>
        <input type="text" name="path" readonly>
        <label>New Destination URL</label>
        <input type="url" name="url" required>
        <label>Secret Code</label>
        <input type="text" name="secretCode" required>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
  <div id="deleteModal" class="modal">
    <div class="modal-content">
      <h2>Delete Link</h2>
      <form id="delete-form">
        <label>Path</label>
        <input type="text" name="path" readonly>
        <label>Secret Code</label>
        <input type="text" name="secretCode" required>
        <button type="submit">Delete</button>
      </form>
    </div>
  </div>
  <footer>
    Powered by <a href="https://2tw.in">Twin-Url</a> on Cloudflare Workers | <a href="https://2tw.in/GBnNcmic">Fork on GitHub</a>
  </footer>
  <div id="notification" class="notification"></div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const modifyModal = document.getElementById('modifyModal');
      const deleteModal = document.getElementById('deleteModal');
      const modifyForm = document.getElementById('modify-form');
      const deleteForm = document.getElementById('delete-form');
      const notification = document.getElementById('notification');

      function showNotification(message) {
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 2000);
      }

      // Event delegation for buttons and copy
      document.querySelector('table').addEventListener('click', (e) => {
        const target = e.target;

        // Modify button
        if (target.classList.contains('modify-btn')) {
          const path = target.getAttribute('data-path');
          const url = target.getAttribute('data-url');
          modifyForm.path.value = path;
          modifyForm.url.value = url;
          modifyModal.style.display = 'flex';
        }

        // Delete button
        if (target.classList.contains('delete-btn')) {
          const path = target.getAttribute('data-path');
          deleteForm.path.value = path;
          deleteModal.style.display = 'flex';
        }

        // Click-to-copy
        if (target.classList.contains('copy-key')) {
          const key = target.getAttribute('data-key');
          const url = location.origin + '/' + key;
          navigator.clipboard.writeText(url)
            .then(() => showNotification('Copied!'))
            .catch(err => showNotification('Copy failed: ' + err));
        }
      });

      // Modify form submission
      modifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const path = modifyForm.path.value;
        const url = modifyForm.url.value;
        const secretCode = modifyForm.secretCode.value;
        const response = await fetch('/api/redirects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ path, url, secretCode }),
        });
        const message = await response.text();
        showNotification(message);
        if (response.ok) location.reload();
        modifyModal.style.display = 'none';
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
