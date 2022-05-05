const ribbons1 = ['jant', 'febt', 'mart'];
const ribbons2 = ['aprt', 'mayt', 'jult'];
const ribbons3 = ['junt', 'sept', 'octt'];
const birds = ['feby', 'apry', 'augy'];
const doublePis = ['nov3', 'dec2'];

const cardScore = (captured) => {
  const kwang = [];
  const kwang12 = [];
  const rib1 = [];
  const rib2 = [];
  const rib3 = [];
  const rib12 = [];
  const bird = [];
  const animal = [];
  const doublePi = [];
  const pi = [];
  captured.forEach((cardId) => {
    switch (true) {
      case cardId === 'deck':
        kwang12.push(cardId);
        break;
      case cardId === 'dect':
        rib12.push(cardId);
        break;
      case cardId.slice(3, 4) === 'k':
        kwang.push(cardId);
        break;
      case ribbons1.includes(cardId):
        rib1.push(cardId);
        break;
      case ribbons2.includes(cardId):
        rib2.push(cardId);
        break;
      case ribbons3.includes(cardId):
        rib3.push(cardId);
        break;
      case birds.includes(cardId):
        bird.push(cardId);
        break;
      case cardId.slice(3, 4) === 'y':
        animal.push(cardId);
        break;
      case doublePis.includes(cardId):
        doublePi.push(cardId);
        break;
      default:
        pi.push(cardId);
    }
  });

  // KWANG SCORING
  let kwangScore = 0;
  const totalKwang = kwang.length + kwang12.length;
  if (totalKwang === 5) {
    kwangScore += 15;
  }
  if (totalKwang > 2) {
    if (kwang12.length) {
      kwangScore += (totalKwang - 1);
    } else {
      kwangScore += totalKwang;
    }
  }

  // RIBBON SCORING
  let ribbonScore = 0;
  const totalRibbon = rib1.length + rib2.length + rib3.length + rib12.length;
  if (totalRibbon > 4) {
    ribbonScore += (totalRibbon - 4);
  }
  if (rib1.length === 3) {
    ribbonScore += 3;
  }
  if (rib2.length === 3) {
    ribbonScore += 3;
  }
  if (rib3.length === 3) {
    ribbonScore += 3;
  }

  // ANIMAL SCORING
  let animalScore = 0;
  const totalAnimals = bird.length + animal.length;
  if (totalAnimals > 4) {
    animalScore += (totalAnimals - 4);
  }
  if (bird.length === 3) {
    animalScore += 5;
  }

  // PI SCORING
  let piScore = 0;
  const totalPi = pi.length + (doublePi.length * 2);
  if (totalPi > 9) {
    piScore += (totalPi - 9);
  }

  const total = kwangScore + ribbonScore + animalScore + piScore;

  return [total, kwangScore, ribbonScore, animalScore, piScore];
};

export { cardScore };
