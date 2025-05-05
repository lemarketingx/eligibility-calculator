// zaka.js
$(function(){
    // אתחול Select2
    $('.select2').select2();
  
    // חישוב שנות נישואין
    $('#marryDate').on('change', () => {
      const d = new Date($('#marryDate').val());
      if (!isNaN(d)) {
        const yrs = new Date().getFullYear() - d.getFullYear();
        $('#marryYears').val(yrs);
      }
      recalc();
    });
  
    // כל שינוי בשדות – מחשב מחדש
    $('.eligibility-form input, .eligibility-form select').on('input change', recalc);
  
    function recalc() {
      // קורא ערכים
      const yrs      = +$('#marryYears').val() || 0;
      const kids     = +$('#childrenCount').val() || 0;
      const sibs     = +$('#siblingsCount').val() || 0;
      const mil      = +$('#militaryMonths').val() || 0;
      const periph   = $('#isPeripheral').val() === 'yes';
      const prog10   = $('#program10plus').val()   === 'yes';
      const negev    = $('#isNegev').val()         === 'yes';
      // רווקים (אם בש_TAB_SINGLE)
      const age      = +$('#applicantAge').val()   || 0;
      const rsibs    = +$('#singleSiblings').val() || 0;
      const rmil     = +$('#singleMilitary').val() || 0;
  
      let score = 0;
  
      // קריטריונים למשפחה
      score += yrs >= 2 ? 250 + (yrs -1)*50 : 0;
      if (yrs === 1) score += 250;
      score += kids >=1 ? 350 + (kids-1)*150 : 0;
      score += sibs * 50;
      score += mil * 10;
      if (periph) score += 100;
      if (prog10) score += 100;
      if (negev)  score += 100;
  
      // קריטריונים לרווקים
      if ($('#tab-single').hasClass('active')) {
        score = 0;
        if (age >= 30) score += 200;
        score += rsibs * 50;
        score += rmil * 10;
      }
  
      // הצגת תוצאות
      $('#totalScore').val(score);
      $('#baseEligibility').val(score >= 1000 ? 'זכאי' : 'לא זכאי');
    }
  
    // קריאה ראשונית
    recalc();
  });
  