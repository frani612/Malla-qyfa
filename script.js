<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Malla Curricular - Química y Farmacia</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Malla Interactiva - Química y Farmacia</h1>
  <div id="malla"></div>
  <script>
    const ramos = [
      // Ejemplo para 9 semestres completo. Sigue este formato para agregar ramos:
      { id: "matematica", nombre: "Matemática", semestre: 1, desbloquea: ["estadistica", "calculo", "fisica"] },
      { id: "intro-cf", nombre: "Introducción a las ciencias farmacéuticas", semestre: 1 },
      { id: "psicologia", nombre: "Psicología general", semestre: 1 },
      { id: "quimica-general", nombre: "Química general", semestre: 1, desbloquea: ["quimica-inorganica", "lab-inorganica", "quimica-organica", "lab-organica"] },
      { id: "lab-quimica-general", nombre: "Lab. de química general", semestre: 1, desbloquea: ["quimica-inorganica", "lab-inorganica", "quimica-organica", "lab-organica"] },
      { id: "biologia-celular", nombre: "Biología celular", semestre: 1, desbloquea: ["fisiologia", "farmacognosia", "microbiologia", "bioquimica", "lab-bioquimica"] },

      { id: "anatomia", nombre: "Anatomía humana", semestre: 2, desbloquea: ["fisiologia"] },
      { id: "quimica-inorganica", nombre: "Química inorgánica", semestre: 2, prereq: ["quimica-general", "lab-quimica-general"], desbloquea: ["quimica-analitica", "fisicoquimica", "lab-fisicoquimica"] },
      { id: "lab-inorganica", nombre: "Lab. química inorgánica", semestre: 2, prereq: ["quimica-general", "lab-quimica-general"], desbloquea: ["lab-quimica-analitica", "fisicoquimica", "lab-fisicoquimica"] },
      { id: "quimica-organica", nombre: "Química orgánica", semestre: 2, prereq: ["quimica-general", "lab-quimica-general"], desbloquea: ["quimica-org-avanzada", "microbiologia"] },
      { id: "lab-organica", nombre: "Lab. química orgánica", semestre: 2, prereq: ["quimica-general", "lab-quimica-general"], desbloquea: ["lab-quimica-org-avanzada", "microbiologia"] },
      { id: "estadistica", nombre: "Estadística", semestre: 2, prereq: ["matematica"], desbloquea: ["epidemiologia"] },
      { id: "fisica", nombre: "Introducción a la física", semestre: 2, prereq: ["matematica"] },

      { id: "calculo", nombre: "Cálculo", semestre: 3, prereq: ["matematica"], desbloquea: ["fisicoquimica", "lab-fisicoquimica"] },
      { id: "fisiologia", nombre: "Fisiología humana", semestre: 3, prereq: ["biologia-celular", "anatomia"], desbloquea: ["fisiopatologia"] },
      { id: "quimica-org-avanzada", nombre: "Química orgánica avanzada", semestre: 3, prereq: ["quimica-organica"], desbloquea: ["farmacognosia", "bioquimica", "lab-bioquimica"] },
      { id: "lab-quimica-org-avanzada", nombre: "Lab. química org. avanzada", semestre: 3, prereq: ["lab-organica"], desbloquea: ["farmacognosia", "bioquimica", "lab-bioquimica"] },
      { id: "quimica-analitica", nombre: "Química analítica cuali-cuantitativa", semestre: 3, prereq: ["quimica-inorganica"] },
      { id: "lab-quimica-analitica", nombre: "Lab. analítica cuali-cuantitativa", semestre: 3, prereq: ["lab-inorganica"] },
      { id: "epidemiologia", nombre: "Epidemiología y salud pública", semestre: 3, prereq: ["estadistica"] },
      { id: "formacion-1", nombre: "Formación integral I", semestre: 3 },

      { id: "fisiopatologia", nombre: "Fisiopatología", semestre: 4, prereq: ["fisiologia"] },
      { id: "fisicoquimica", nombre: "Fisicoquímica", semestre: 4, prereq: ["quimica-inorganica", "calculo"] },
      { id: "lab-fisicoquimica", nombre: "Lab. fisicoquímica", semestre: 4, prereq: ["lab-inorganica", "calculo"] },
      { id: "analisis-instrumental", nombre: "Análisis químico instrumental", semestre: 4, prereq: ["quimica-analitica"] },
      { id: "lab-instrumental", nombre: "Lab. análisis químico instrumental", semestre: 4, prereq: ["lab-quimica-analitica"] },
      { id: "farmacognosia", nombre: "Farmacognosia y fitoterapia", semestre: 4, prereq: ["biologia-celular", "quimica-org-avanzada"] },
      { id: "microbiologia", nombre: "Microbiología general", semestre: 4, prereq: ["quimica-organica", "lab-organica"] },
      { id: "formacion-2", nombre: "Formación integral II", semestre: 4 },

      // Continúa desde el 5to al 9no semestre de la misma forma...
    ];

    const estado = {};

    function render() {
      const contenedor = document.getElementById("malla");
      contenedor.innerHTML = "";

      for (let s = 1; s <= 9; s++) {
        const sem = document.createElement("div");
        sem.className = "semestre";
        sem.innerHTML = `<h2>Semestre ${s}</h2>`;

        const delSemestre = ramos.filter(r => r.semestre === s);

        delSemestre.forEach(ramo => {
          const aprobado = estado[ramo.id];
          const requisitos = ramo.prereq || [];
          const desbloqueado = requisitos.length === 0 || requisitos.every(req => estado[req]);

          const div = document.createElement("div");
          div.className = "ramo";
          if (aprobado) div.classList.add("aprobado");
          else if (desbloqueado) div.classList.add("desbloqueado");

          div.textContent = ramo.nombre;

          if (!aprobado && desbloqueado) {
            const btn = document.createElement("button");
            btn.textContent = "Aprobar";
            btn.onclick = () => {
              estado[ramo.id] = true;
              render();
            };
            div.appendChild(btn);
          }

          sem.appendChild(div);
        });

        contenedor.appendChild(sem);
      }
    }

    render();
  </script>
</body>
</html>
