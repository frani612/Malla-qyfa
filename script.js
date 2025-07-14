window.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('li'));

  function cumplePrerrequisitos(ramo) {
    const id = ramo.dataset.id;

    const prerrequisitos = ramos.filter(r => {
      const abre = r.dataset.abre?.trim();
      if (!abre) return false;
      const ids = abre.split(/\s+/);
      return ids.includes(id);
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

  function actualizarEstados() {
    ramos.forEach(ramo => {
      if (cumplePrerrequisitos(ramo)) {
        desbloquearRamo(ramo);
      } else {
        if (!ramo.classList.contains('tachado')) {
          bloquearRamo(ramo);
        }
      }
    });
  }

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
});
