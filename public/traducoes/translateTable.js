export function translateTable() {
  // obtém a linguagem atual
  const currentLang = 'pt-br'; // substitua pela lógica para obter a linguagem atual

  // carrega o arquivo de tradução correspondente
  const translationFile = `./${currentLang}.json`;
  $.getJSON(translationFile, function (data) {
    // traduz o texto dos elementos da tabela
    const searchLabel = document.body.getElementById('usu_filter').getElementsByTagName('label')[0];
    searchLabel.textContent = data['Buscar'];

    const showLabel = document.body.getElementById('usu_length').getElementsByTagName('label')[0];
    showLabel.textContent = data['Mostrar'];

    const infoElement = document.body.getElementById('usu_info');
    const infoText = infoElement.textContent;
    
    const translatedInfo = data['Mostrando %d a %d de %d registros'].replace('_START_', infoText.split(' - ')[0]).replace('_END_', infoText.split(' - ')[1]).replace('_TOTAL_', $('#usu').DataTable().page.info().recordsDisplay);
    infoElement.textContent = translatedInfo;

    const previousButton = document.body.getElementById('usu_previous');
    previousButton.textContent = data['Anterior'];

    const nextButton = document.body.getElementById('usu_next');
    nextButton.textContent = data['Próximo'];

    const pageLinks = document.body.getElementById('usu_paginate').getElementsByTagName('a');
    for (let i = 0; i < pageLinks.length; i++) {
      const pageText = pageLinks[i].textContent;
      if (!isNaN(pageText)) {
        const translatedPage = data[pageText];
        if (translatedPage) {
          pageLinks[i].textContent = translatedPage;
        }
      }
    }
  });
}

// chamada da função de tradução quando a tabela for inicializada
$('#usu').on('init.dt', function () {
  translateTable();
});


