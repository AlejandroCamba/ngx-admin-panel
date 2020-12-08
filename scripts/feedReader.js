---
layout: null
---
(function () {
  const t = (entry, tname) => entry.getElementsByTagName(tname)[0];
const date = entry => new Date(t(entry, 'updated').textContent).toDateString();
const content = entry => t(entry, 'content')

fetch('https://github.com/AlejandroCamba/ngx-admin-panel/releases.atom')
  .then(response => response.text())
  .then(xml => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml,"text/xml");
  const html = Array.from(xmlDoc.getElementsByTagName('entry')).map((entry, i) => {
    console.log(entry);
    return `
    <div class="entry">
      <div class="timestamp">${date(entry)}</div>
      <a href="${t(entry, 'link').getAttribute('href')}">
        <h2 class="entry-title">${t(entry, 'title').innerHTML}</h2>
      </a>
      <div class="content" id="${i}"></div>
    </div>`
  });

  document.getElementById('items').innerHTML = html.join('');

  Array.from(xmlDoc.getElementsByTagName('entry')).forEach((entry, i) => {
    document.getElementById(i).innerHTML += content(entry).childNodes[0].textContent;
  });
})


})();