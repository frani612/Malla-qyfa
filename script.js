window.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('li'));

  function cumplePrerrequisitos(ramo) {
    const id = ramo.dataset.id;
    // Buscamos ramos que "abren" este ramo (prerrequisitos)
    const prerrequisitos = ramos.filter(r => {
      if (!r.dataset.abre) return false;
      // ¿Está el id actual en el arreglo de ids que desbloquea r?
      return r.dataset.abre.split(' ').includes(id);
    });
    // Si no tiene prerrequisitos, está desbloqueado
    if (prerrequisitos.length === 0) return true;

    // Todos los prerrequisitos deben estar tachados para desbloquear
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

  // Al cargar, actualizar estados
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
