const desbloqueos = {
  1: [12,14,13],
  4: [8,9,10,11],
  5: [8,9,10,11],
  6: [15,16,17,18,19],

  12: [20],
  14: [23,24],
  15: [22],
  16: [27],
  17: [28],
  18: [31,32],
  19: [31,32],

  22: [30,35],
  23: [33],
  24: [33],
  25: [33],
  26: [33],
  27: [35,42],
  28: [30],

  30: [37],
  31: [41],
  32: [41],
  33: [38],
  34: [39],
  35: [36],

  37: [42,43,44,45,46,47],
  38: [45],
  39: [53],
  40: [42,47],
  41: [43,44,46,47],
  42: [54],

  43: [49],
  44: [52],
  45: [49,50],
  46: [53,56],
  47: [52],

  48: [54,58],
  49: [54,58],
  50: [54,58,58],
  51: [53,54,58],
  52: [56,54,58],
  53: [57,54,58],

  54: [59,60],
  55: [59,60],
  56: [59,60],
  57: [59,60],
};

const ramos = document.querySelectorAll('li[data-id]');

function bloquearCascada(ramo) {
  if (!ramo.classList.contains('bloqueado')) {
    ramo.classList.add('bloqueado');
    ramo.classList.remove('tachado');
    const id = parseInt(ramo.dataset.id);
    const dependientes = desbloqueos[id] || [];
    dependientes.forEach(idDep => {
      const r = document.querySelector(`li[data-id="${idDep}"]`);
      bloquearCascada(r);
    });
  }
}

ramos.forEach(ramo => {
  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('bloqueado')) {
      alert('Debes completar los prerrequisitos primero.');
      return;
    }
    ramo.classList.toggle('tachado');
    const id = parseInt(ramo.dataset.id);
    const desbloqueados = desbloqueos[id] || [];

    if (ramo.classList.contains('tachado')) {
      desbloqueados.forEach(idDesbloqueado => {
        const r = document.querySelector(`li[data-id="${idDesbloqueado}"]`);
        r.classList.remove('bloqueado');
      });
    } else {
      desbloqueados.forEach(idDesbloqueado => {
        const r = document.querySelector(`li[data-id="${idDesbloqueado}"]`);
        bloquearCascada(r);
      });
    }
  });
});
