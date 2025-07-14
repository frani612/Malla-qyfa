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
      // Semestres 1 al 9 (ya definidos)...
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
      { id: "farmacologia-1", nombre: "Farmacología I", semestre: 5, prereq: ["fisiopatologia", "microbiologia"] },
      { id: "bioquimica", nombre: "Bioquímica general", semestre: 5, prereq: ["biologia-celular", "quimica-org-avanzada"] },
      { id: "lab-bioquimica", nombre: "Lab. bioquímica general", semestre: 5, prereq: ["lab-quimica-org-avanzada"] },
      { id: "tec-farmaceutica", nombre: "Tecnología farmacéutica I", semestre: 5, prereq: ["fisicoquimica", "lab-fisicoquimica", "analisis-instrumental", "lab-instrumental"] },
      { id: "farmacoquimica-1", nombre: "Fármacoquímica I", semestre: 5 },
      { id: "evidencia-1", nombre: "Análisis de la evidencia científica I", semestre: 5, prereq: ["fisiopatologia", "farmacognosia"] },
      { id: "formacion-3", nombre: "Formación integral III", semestre: 5 },
      { id: "farmacologia-2", nombre: "Farmacología II", semestre: 6, prereq: ["farmacologia-1"] },
      { id: "tec-farmaceutica-2", nombre: "Tecnología farmacéutica II", semestre: 6, prereq: ["tec-farmaceutica"] },
      { id: "farmacoquimica-2", nombre: "Fármacoquímica II", semestre: 6, prereq: ["farmacoquimica-1"] },
      { id: "evidencia-2", nombre: "Análisis de la evidencia científica II", semestre: 6, prereq: ["evidencia-1"] },
      { id: "bioquimica-clinica", nombre: "Bioquímica clínica", semestre: 6, prereq: ["bioquimica", "lab-bioquimica"] },
      { id: "practica-primaria", nombre: "Práctica atención primaria", semestre: 6, prereq: ["evidencia-2", "farmacologia-2"] },
      { id: "farmacocinetica", nombre: "Farmacocinética clínica", semestre: 7, prereq: ["farmacologia-2", "bioquimica-clinica"] },
      { id: "nutricion", nombre: "Nutrición clínica", semestre: 7, prereq: ["farmacologia-2", "bioquimica-clinica"] },
      { id: "tec-cosmetica", nombre: "Tecnología cosmética", semestre: 7, prereq: ["tec-farmaceutica-2"] },
      { id: "toxicologia", nombre: "Toxicología", semestre: 7, prereq: ["farmacologia-2"] },
      { id: "farmacia-clinica-1", nombre: "Farmacia clínica I", semestre: 7, prereq: ["farmacologia-2", "bioquimica-clinica"] },
      { id: "farmacia-asistencial", nombre: "Farmacia asistencial", semestre: 8, prereq: ["evidencia-2"] },
      { id: "bioequivalencia", nombre: "Bioequivalencia", semestre: 8, prereq: ["farmacocinetica", "tec-cosmetica"] },
      { id: "control-calidad", nombre: "Control de calidad de procesos", semestre: 8, prereq: ["tec-cosmetica"] },
      { id: "gestion", nombre: "Administración y gestión farmacéutica", semestre: 8, prereq: ["practica-primaria"] },
      { id: "farmacia-clinica-2", nombre: "Farmacia clínica II", semestre: 8, prereq: ["farmacia-clinica-1", "nutricion"] },
      { id: "practica-comunitaria", nombre: "Práctica farmacia comunitaria", semestre: 8, prereq: ["farmacoquimica-2", "toxicologia"] },
      { id: "internado", nombre: "Internado en farmacia asistencial", semestre: 9, prereq: ["farmacia-asistencial"] },
      { id: "seminario-1", nombre: "Seminario de título I", semestre: 9, prereq: ["farmacia-asistencial"] },

      { id: "internado-final", nombre: "Internado final (clínica / industria / cosmética)", semestre: 10, prereq: ["internado"] },
      { id: "seminario-2", nombre: "Seminario de título II", semestre: 10, prereq: ["seminario-1"] },
      { id: "legislacion", nombre: "Legislación farmacéutica y bioética", semestre: 10, prereq: ["practica-comunitaria"] },
      { id: "farmacovigilancia", nombre: "Farmacovigilancia y atención farmacéutica", semestre: 10, prereq: ["farmacia-clinica-2", "toxicologia"] }
    ];

    const estado = {};

    function render() {
      const contenedor = document.getElementById("malla");
      contenedor.innerHTML = "";

      for (let s = 1; s <= 10; s++) {
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

