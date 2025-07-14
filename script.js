window.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('li'));

  actualizarEstados();

  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('bloqueado')) {
        alert('Este ramo está bloqueado. Completa los prerrequisitos primero.');
        return;
      }

      ramo.classList.toggle('tachado');

      actualizarEstados();
    });
  });

  function actualizarEstados() {
    ramos.forEach(ramo => {
      if (ramo.classList.contains('tachado')) {
        desbloquearRamos(ramo.dataset.abre);
      }
    });

    ramos.forEach(ramo => {
      if (!cumplePrerrequisitos(ramo)) {
        if (!ramo.classList.contains('tachado')) {
          bloquearRamo(ramo);
        }
      } else {
        desbloquearRamo(ramo);
      }
    });
  }

  function desbloquearRamos(ids) {
    if (!ids) return;
    const idsArray = ids.split(' ');
    idsArray.forEach(id => {
      const r = ramos.find(ramo => ramo.dataset.id === id);
      if (r) desbloquearRamo(r);
    });
  }

  function cumplePrerrequisitos(ramo) {
    const id = ramo.dataset.id;

    const prerrequisitos = ramos.filter(r => {
      if (!r.dataset.abre) return false;
      return r.dataset.abre.split(' ').includes(id);
    });

    if (prerrequisitos.length === 0) return true;

    return prerrequisitos.every(r => r.classList.contains('tachado'));
  }

  function bloquearRamo(ramo) {
    ramo.classList.add('bloqueado');
    ramo.classList.remove('tachado');
    ramo.style.pointerEvents = 'none';
    ramo.style.cursor = 'not-allowed';
  }

  function desbloquearRamo(ramo) {
    ramo.classList.remove('bloqueado');
    ramo.style.pointerEvents = 'auto';
    ramo.style.cursor = 'pointer';
  }
});
