document.addEventListener('DOMContentLoaded', function(event) {
    const search = document.getElementById('search');
    const results = document.getElementById('results');
    let data = [];
    let search_term = '';
  
    fetch('/searchcc.json')
      .then(response => response.json())
      .then(data_server => {
        data = data_server;
      });
  
    search.addEventListener('input', event => {
      search_term = event.target.value.toLowerCase();
      showList();
    });
  
    const showList = () => {
      results.innerHTML = '';
      results.setAttribute("class","")
      if (search_term.length <= 0) return;
      const match = new RegExp(`${search_term}`, 'gi');
      let result = data.filter(partido => match.test(partido.title) || match.test(partido.nombrecorto));
      if (result.length == 0) {
        const li = document.createElement('li');
        li.innerHTML = `No se encontraron resultados`;
        results.appendChild(li);
        results.setAttribute("class","results")
      }
      result.forEach(e => {
        const a = document.createElement('a');
        a.href = e.url;
        a.setAttribute("class","result_ind");
        a.innerHTML = `<li>${e.title} (${e.nombrecorto})</li>`;
        results.appendChild(a);
        results.setAttribute("class","results")
      });
    };
  });