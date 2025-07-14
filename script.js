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
    // Primero desbloqueamos todos los ramos que cumplen prerrequisitos (incluidos los que no tienen)
    ramos.forEach(ramo => {
      if (cumplePrerrequisitos(ramo)) {
        desbloquearRamo(ramo);
      } else {
        bloquearRamo(ramo);
      }
    });

    // Luego desbloqueamos los ramos que abren los ramos tachados
    ramos.forEach(ramo => {
      if (ramo.classList.contains('tachado')) {
        desbloquearRamos(ramo.dataset.abre);
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

    // Encuentra todos los ramos que "abren" este ramo
    const prerrequisitos = ramos.filter(r => {
      if (!r.dataset.abre) return false;
      return r.dataset.abre.split(' ').includes(id);
    });

    // Si no tiene prerrequisitos, cumple siempre
    if (prerrequisitos.length === 0) return true;

    // Si tiene prerrequisitos, todos deben estar tachados
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
