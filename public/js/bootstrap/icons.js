import { getIcon } from 'bootstrap-icons';

const icon = getIcon('exemplo-de-icone');

// Exemplo de como adicionar o ícone em um elemento HTML usando jQuery
$('i').addClass(`bi-${icon.name}`);