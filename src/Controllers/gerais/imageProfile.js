import { createCanvas } from 'canvas';
import { randomBytes } from 'crypto';
export function criarImagemInicial(nome) {
    // Tamanho da imagem
    const width = 100;
    const height = 100;
  
    // Criar um canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
  
    // Definir a cor de fundo aleatória
    const backgroundColor = `rgb(${randomBytes(3).join(',')})`;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  
    // Obter as duas primeiras iniciais do nome em maiúsculo
    const initials = nome.split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  
    // Desenhar as iniciais no centro da imagem
    ctx.font = 'bold 48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, width/2, height/2);
  
    // Retornar a imagem como uma URL de dados
    return canvas.toDataURL();
  }