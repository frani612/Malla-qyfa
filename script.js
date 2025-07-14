const desbloqueos = {
  1: [12,14,13],
  4: [8,9,10,11],
  5: [8,9,10,11],
  6: [15,16,17,18,19],
  // ... resto del objeto
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
