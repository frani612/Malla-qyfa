window.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('li'));

  function cumplePrerrequisitos(ramo) {
    const id = ramo.dataset.id;

    // Encuentra todos los ramos que deben estar tachados para desbloquear este
    const prerrequisitos = ramos.filter(r => {
      if (!r.dataset.abre) return false;

      const abreIds = r.dataset.abre.trim().split(/\s+/);
      return abreIds.includes(id);
    });

    // Si nadie lo desbloquea, está disponible desde el principio
    if (prerrequisitos.length === 0) return true;

    // Se desbloquea solo si TODOS los ramos que lo abren están tachados
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
      } else if (!ramo.classList.contains('tachado')) {
        bloquearRamo(ramo);
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
