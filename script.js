const localidades = {
    11: [16, 17, 18],
    16: [11],
    17: [11],
    18: [11],
};
const planos = {
  30: ['FaleMais 30'],
  60: ['FaleMais 60'],
  120: ['FaleMais 120'],
}

const teste = {
  11: {
    16: 1.9,
    17: 1.7,
    18: 0.9,
  },
  16: { 11: 2.9 },
  17: { 11: 2.7 },
  18: { 11: 1.9 },
}

const origem = document.querySelector('#origem');
const destino = document.querySelector('#destino');
const plano = document.querySelector('#plano');
const tempo = document.querySelector('#tempo');
const botao = document.querySelector('#calcular');
const faleMais = document.querySelector('#faleMais');
const concorrencia = document.querySelector('#concorrencia');

const comparativo = (orig, dest) => {
  console.log('implementando');
  if (!Object.keys(teste).includes(orig) || teste[orig] === undefined || teste[orig] === null) {
    return alert('Origem informada de forma errada');
  }

  if (!Object.keys(teste[orig]).includes(dest) || teste[orig][dest] === undefined || teste[orig][dest] === null) {
    return alert('Destino informada de forma errada');
  }

  const precoMinuto = teste[orig][dest];
  const concorrencia = parseFloat(tempo.value * precoMinuto).toFixed(2);

  if (tempo.value <= plano.value) {
    const faleMais = 0;
    return {
      faleMais,
      concorrencia
    }
  }

  const minutos = tempo.value - plano.value;
  const faleMais = parseFloat((minutos * precoMinuto) * 1.1).toFixed(2);

  return {
    faleMais,
    concorrencia
  }
}



const listar = (obj, element, txt = '') => {
  Object.keys(obj).map(ddd => {
    element.innerHTML += `<option value="${ddd}">${txt && txt}${ddd}</option>`;
  });
};

const calcular = () => {
  if (isNaN(origem.value) || isNaN(destino.value) || isNaN(plano.value)) {
    return alert('Favor preencher todas as opções para que possa ser calculado');
  }

  if (isNaN(tempo.value) || Number(tempo.value) === 0 || tempo.value.length === 0) {
    return alert('Os minutos também precisam ser informados para que seja calulado');
  }

  console.log('\n\n');
  const valores = comparativo(origem.value, destino.value);

  // document.getElementById('faleMais').textContent = 'TESTE';
  faleMais.innerHTML += ` R$ ${valores.faleMais}`;
  concorrencia.innerText += ` R$ ${valores.concorrencia}`;
};

const getOrigem = listar(localidades, origem);

const getDestino = ddd => {
  const opcoes = localidades[ddd];
  document.querySelector('#plano').innerHTML = '<option hidden>--Escolha sua Opção--</option>';
  destino.innerHTML = '<option hidden>--Escolha sua Opção--</option>';

  opcoes.map(ddd => destino.innerHTML += `<option value="${ddd}">${ddd}</option>`);

  destino.addEventListener('change', () => {
    plano.innerHTML = '<option hidden>--Escolha sua Opção--</option>';
    listar(planos, plano, 'FaleMais VxTel ');
  });
}

origem.addEventListener('change', () => getDestino(origem.value));
