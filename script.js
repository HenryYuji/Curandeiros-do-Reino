const symptoms = [
    "febre alta e bubões visíveis no pescoço",
    "tosse violenta com dificuldade para respirar",
    "feridas negras aparecendo nas extremidades",
    "delírios e dores intensas pelo corpo"
   ];
   const outcomes = {
    treat: [
      "Você conseguiu estabilizar o paciente! Ele tem uma chance de sobreviver.",
      "O tratamento falhou. O paciente não resistiu.",
      "O paciente parece melhorar, mas o estado é crítico."
    ],
    quarantine: [
      "O paciente foi isolado com sucesso. A doença não se espalhará.",
      "O paciente morreu em quarentena. A cidade está mais segura.",
      "A doença se espalhou, mesmo após o isolamento."
    ]
   };
   function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
   }
   function treatPatient() {
    const result = getRandomElement(outcomes.treat);
    document.getElementById("result").textContent = result;
    newPatient();
   }
   function quarantinePatient() {
    const result = getRandomElement(outcomes.quarantine);
    document.getElementById("result").textContent = result;
    newPatient();
   }
   function newPatient() {
    const newSymptoms = getRandomElement(symptoms);
    document.getElementById("patient-description").textContent = `Um novo paciente chegou com ${newSymptoms}. O que você vai fazer?`;
   }
   
   