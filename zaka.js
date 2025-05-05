// zaka.js

// פונקציה ראשית שמבצעת את כל החישובים
function calculateEligibility() {
  // 1. אוספים את כל הערכים מהטופס
  const form = document.getElementById('zakaForm');
  const data = {
    // משפחה
    marryDate: form.marrydate.value,
    marryYears: +form.marry_years.value,
    children: +form.y1.value,
    sibHusband: +form.a1.value,
    sibWife: +form.aa1.value,
    srvHusband: +form.zavaman.value,
    srvWife: +form.zavawoman.value,
    priorityZone: form.leumit1.value === 'כן',
    plan10: form.eserplus.value === 'כן',
    negev: +form.negev.value,

    single: form.ravak1.checked, // לא ממש בשימוש פה
    ravakPriority: form.ravak1.value === 'כן',
    ravakAge: +form.ravak3.value,
    ravakSib: +form.ravak4.value,
    ravakSrv: +form.ravak2.value,
    ravakDis75: form.nechut_ravak.value === 'כן',
    ravakWheel: form.nechutkise_ravak.value === 'כן',
    ravakOlim: form.olim_ravak.value === 'כן',
    ravakYears: +form.olim_vetek_ravak.value,

    // סטטוס נוסף
    chadhorit: form.chadhorit_family.value === 'כן',
    dis75: form.nechut_family.value === 'כן',
    wheel: form.nechutkise_family.value === 'כן',
    olimFamily: form.olim_family.value === 'כן',
    vetek: +form.olim_vetek.value
  };

  // 2. חישוב ניקוד (דוגמה בסיסית)
  let score = 0;
  if (data.marryYears >= 5) score += 10;
  score += data.children * 5;
  score += data.srvHusband + data.srvWife > 0 ? 5 : 0;
  if (data.priorityZone) score += 8;
  if (data.plan10) score += 7;
  score += data.negev;

  if (data.chadhorit) score += 5;
  if (data.dis75) score += 15;
  if (data.wheel) score += 20;
  if (data.olimFamily) score += 12;
  score += data.vetek;

  // 3. על פי הניקוד – סכום זכאות בסיסית (דוגמה)
  let baseEligibility = score * 1000;     // ₪
  let armyBonus    = (data.srvHusband + data.srvWife) * 2000;
  let plan10Bonus  = data.plan10 ? 50000 : 0;
  let negevBonus   = data.negev * 10000;

  // 4. סכום סופי
  let total = baseEligibility + armyBonus + plan10Bonus + negevBonus;

  // 5. עדכון השדות ב־DOM
  form.nikud.value   = score;
  form.zakaut.value  = baseEligibility.toLocaleString();
  form.zava.value    = armyBonus.toLocaleString();
  form.eserplusmain.value = plan10Bonus.toLocaleString();
  form.tosefetnegev.value = negevBonus.toLocaleString();
  form.zsofi.value   = total.toLocaleString();
}

// חיבור הכפתור
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('computeBtn')
          .addEventListener('click', calculateEligibility);
});
