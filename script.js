window.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('li'));

  function cumplePrerrequisitos(ramo) {
    const id = ramo.dataset.id;
    const prerrequisitos = ramos.filter(r => {
      if (!r.dataset.abre) return false;
      if (r.dataset.abre.trim() === '') return false;

      // Uso split con regex para evitar elementos vacíos por espacios extras
      const abreIds = r.dataset.abre.trim().split(/\s+/);

      return abreIds.includes(id);
    });

    // console.log(`Ramo ${id} tiene prerrequisitos:`, prerrequisitos.map(r => r.dataset.id));

    if (prerrequisitos.length === 0) return true;

    const todosTachados = prerrequisitos.every(r => r.classList.contains('tachado'));

    // console.log(`¿Todos prerrequisitos de ${id} tachados?`, todosTachados);

    return todosTachados;
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
