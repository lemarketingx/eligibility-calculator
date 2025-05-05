// פונקציית החישוב
function calculateEligibility() {
  const form = document.getElementById('zakaForm');
  // קריאה לערכים...
  const data = {
    marryYears: +form.marry_years.value,
    children: +form.y1.value,
    sibHusband: +form.a1.value,
    sibWife: +form.aa1.value,
    srvHusband: +form.zavaman.value,
    srvWife: +form.zavawoman.value,
    priorityZone: form.leumit1.value === 'כן',
    plan10: form.eserplus.value === 'כן',
    negev: +form.negev.value,
    chadhorit: form.chadhorit_family.value === 'כן',
    dis75: form.nechut_family.value === 'כן',
    wheel: form.nechutkise_family.value === 'כן',
    olimFamily: form.olim_family.value === 'כן',
    vetek: +form.olim_vetek.value,
    ravakPriority: form.ravak1.value === 'כן',
    ravakAge: +form.ravak3.value,
    ravakSib: +form.ravak4.value,
    ravakSrv: +form.ravak2.value,
    ravakDis75: form.nechut_ravak.value === 'כן',
    ravakWheel: form.nechutkise_ravak.value === 'כן',
    ravakOlim: form.olim_ravak.value === 'כן',
    ravakYears: +form.olim_vetek_ravak.value
  };

  // חישוב ניקוד (דוגמה)
  let score = 0;
  score += Math.min(data.marryYears, 10) * 2;
  score += data.children * 5;
  if (data.srvHusband + data.srvWife > 0) score += 5;
  if (data.priorityZone) score += 8;
  if (data.plan10) score += 7;
  score += data.negev;
  if (data.chadhorit) score += 5;
  if (data.dis75) score += 15;
  if (data.wheel) score += 20;
  if (data.olimFamily) score += 12;
  score += data.vetek;

  // סכומי זכאות
  const baseElig    = score * 1000;
  const armyBonus   = (data.srvHusband + data.srvWife) * 2000;
  const plan10Bonus = data.plan10 ? 50000 : 0;
  const negevBonus  = data.negev * 10000;
  const total       = baseElig + armyBonus + plan10Bonus + negevBonus;

  // עדכון תוצאות
  form.nikud.value        = score;
  form.zakaut.value       = baseElig.toLocaleString();
  form.zava.value         = armyBonus.toLocaleString();
  form.eserplusmain.value = plan10Bonus.toLocaleString();
  form.tosefetnegev.value = negevBonus.toLocaleString();
  form.zsofi.value        = total.toLocaleString();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('computeBtn')
          .addEventListener('click', calculateEligibility);
});
