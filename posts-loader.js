// posts-loader.js
async function loadPosts() {
    try {
      console.log("Fetching list of posts from /posts/index.html...");
      
      const response = await fetch('/posts/index.html');
      if (!response.ok) {
        console.error("Failed to fetch posts:", response.status, response.statusText);
        return;
      }
  
      const text = await response.text();
      console.log("Fetched HTML response:", text);
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const links = [...doc.querySelectorAll('a')];
  
      const postLinks = links
        .filter(link => link.href.endsWith('.html'))
        .map(link => link.href.split('/').pop());
  
      console.log("Parsed post links:", postLinks);
  
      const writingList = document.getElementById('writing-list');
      const archiveList = document.getElementById('archive-list');
      postLinks.sort().reverse();
  
      postLinks.forEach((post, index) => {
        const listItem = document.createElement('li');
        const archiveItem = document.createElement('li');
        const anchor = document.createElement('a');
  
        const title = post.replace(/-/g, ' ').replace('.html', '');
  
        anchor.href = `/posts/${post}`;
        anchor.textContent = title;
  
        listItem.appendChild(anchor);
        archiveItem.appendChild(anchor.cloneNode(true));
  
        if (writingList && index < 8) {
          writingList.appendChild(listItem);
        }
  
        if (archiveList) {
          archiveList.appendChild(archiveItem);
        }
      });
  
      const archiveItem = document.createElement('li');
      const archiveLink = document.createElement('a');
      archiveLink.href = '/archive.html';
      archiveLink.textContent = 'archive...';
      archiveItem.appendChild(archiveLink);
      writingList.appendChild(archiveItem);
  
    } catch (error) {
      console.error("error loading posts:", error);
    }
  }
  
  window.onload = loadPosts;
  