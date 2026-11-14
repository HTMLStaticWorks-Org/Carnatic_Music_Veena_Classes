/**
 * Nadam Veena Academy — Student & Instructor Dashboard Controller (dashboard.js)
 * Manages:
 * 1. Sidebar Navigation, Mobile Collapse, Skeleton Loaders & User Session
 * 2. Multi-Step Class Booking, Rescheduling & Cancellation (localStorage)
 * 3. Practice Notes: Web Audio Swara Synth, Practice Track Player, Filter, Practiced State & Sadhana Diary
 * 4. Fees & Payments: Pay-Now Modal (UPI/Stripe/PayPal), Invoice Status & Receipt Generator
 * 5. Progress & Certificate Preview Modal
 * 6. Real-Time Guru-Shishya Messages Inbox (localStorage)
 * 7. Profile & Settings Persistence
 * 8. Instructor Dashboard: Attendance Marking & Practice Note Publishing
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. SESSION, SIDEBAR NAVIGATION & SKELETON TRANSITIONS
     ------------------------------------------------------------------------ */
  function initDashboardShell() {
    var rawUser = localStorage.getItem('nadam_auth_user');
    var user = rawUser ? JSON.parse(rawUser) : null;

    if (user) {
      document.querySelectorAll('[data-user-name]').forEach(function (el) {
        el.textContent = user.name || 'Ananya Venkataraman';
      });
      document.querySelectorAll('[data-user-level]').forEach(function (el) {
        el.textContent = user.level || 'Madhyama (Varnam Level)';
      });
    }

    /* Sidebar Panel Navigation */
    var navBtns = document.querySelectorAll('[data-dash-nav]');
    var panels = document.querySelectorAll('[data-dash-panel]');
    var topbarTitle = document.getElementById('dashTopbarTitle');
    var sidebar = document.querySelector('.dashboard-sidebar');

    function switchPanel(targetId, labelText) {
      navBtns.forEach(function (btn) {
        var active = btn.getAttribute('data-dash-nav') === targetId;
        btn.classList.toggle('is-active', active);
      });
      panels.forEach(function (panel) {
        var isMatch = panel.getAttribute('data-dash-panel') === targetId;
        panel.classList.toggle('is-active', isMatch);
      });
      if (topbarTitle && labelText) {
        topbarTitle.textContent = labelText;
      }
      if (sidebar) {
        sidebar.classList.remove('is-open');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-dash-nav');
        var label = btn.getAttribute('data-dash-title') || btn.textContent.trim();
        switchPanel(target, label);
      });
    });

    /* Quick Action jump buttons inside Overview */
    document.querySelectorAll('[data-dash-jump]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-dash-jump');
        var matchingNav = document.querySelector('[data-dash-nav="' + target + '"]');
        var label = matchingNav ? (matchingNav.getAttribute('data-dash-title') || matchingNav.textContent.trim()) : '';
        switchPanel(target, label);
      });
    });

    /* Mobile Sidebar Toggle */
    var toggleBtn = document.querySelector('[data-action="toggle-dash-sidebar"]');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('is-open');
      });
    }

    /* Logout Action */
    document.querySelectorAll('[data-action="logout"]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('nadam_auth_user');
        window.location.href = 'login.html';
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. MULTI-STEP CLASS BOOKING, RESCHEDULE & CANCEL (localStorage)
     ------------------------------------------------------------------------ */
  var DEFAULT_BOOKINGS = [
    {
      id: 'BK-901',
      course: 'Saraswati Veena — Tana Varnam (Bhairavi)',
      guru: 'Vidushi Dr. Meenakshi Sundaram',
      date: '2026-11-18',
      slot: '06:30 PM IST',
      mode: 'Online (Dual-Cam Fret View)',
      status: 'Confirmed'
    },
    {
      id: 'BK-902',
      course: 'Manodharma & Kalpanaswaram Lab',
      guru: 'Vidwan S. Raghavan Iyer',
      date: '2026-11-21',
      slot: '10:00 AM IST',
      mode: 'Mylapore Campus — Studio 2',
      status: 'Confirmed'
    }
  ];

  function getBookings() {
    var saved = localStorage.getItem('nadam_student_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem('nadam_student_bookings', JSON.stringify(DEFAULT_BOOKINGS));
    return DEFAULT_BOOKINGS.slice();
  }

  function saveBookings(list) {
    localStorage.setItem('nadam_student_bookings', JSON.stringify(list));
  }

  function initClassBooking() {
    var tableBody = document.getElementById('studentBookingsBody');
    var slotBtns = document.querySelectorAll('.slot-btn[data-slot-time]');
    var selectedSlotInput = document.getElementById('bookingSelectedSlot');
    var bookingForm = document.getElementById('dashBookingForm');
    var stepPills = document.querySelectorAll('[data-booking-step]');
    var feedbackEl = document.getElementById('bookingFeedbackMsg');

    function renderBookings() {
      if (!tableBody) return;
      var bookings = getBookings();
      tableBody.innerHTML = '';
      bookings.forEach(function (b, index) {
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td><strong>' + b.id + '</strong></td>' +
          '<td>' + b.course + '</td>' +
          '<td>' + b.guru + '</td>' +
          '<td>' + b.date + ' • <strong>' + b.slot + '</strong></td>' +
          '<td><span class="tag tag--gold">' + b.mode + '</span></td>' +
          '<td><span class="tag tag--peacock">' + b.status + '</span></td>' +
          '<td>' +
            '<div style="display:flex;gap:0.4rem;flex-wrap:wrap;">' +
              '<button type="button" class="icon-toggle-btn" style="width:auto;padding:0 0.7rem;height:36px;font-size:0.78rem;" data-reschedule-idx="' + index + '" title="Reschedule to next day"><i class="fa-solid fa-calendar-day"></i>&nbsp;Reschedule</button>' +
              '<button type="button" class="icon-toggle-btn" style="width:auto;padding:0 0.7rem;height:36px;font-size:0.78rem;color:var(--kumkum);" data-cancel-idx="' + index + '" title="Cancel slot"><i class="fa-solid fa-xmark"></i>&nbsp;Cancel</button>' +
            '</div>' +
          '</td>';
        tableBody.appendChild(tr);
      });

      tableBody.querySelectorAll('[data-cancel-idx]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idx = parseInt(btn.getAttribute('data-cancel-idx'), 10);
          var list = getBookings();
          list.splice(idx, 1);
          saveBookings(list);
          renderBookings();
        });
      });

      tableBody.querySelectorAll('[data-reschedule-idx]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var idx = parseInt(btn.getAttribute('data-reschedule-idx'), 10);
          var list = getBookings();
          if (list[idx]) {
            list[idx].slot = list[idx].slot === '06:30 PM IST' ? '07:30 PM IST' : '06:30 PM IST';
            list[idx].status = 'Rescheduled';
            saveBookings(list);
            renderBookings();
          }
        });
      });
    }

    slotBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        slotBtns.forEach(function (b) { b.classList.remove('is-selected'); });
        btn.classList.add('is-selected');
        if (selectedSlotInput) {
          selectedSlotInput.value = btn.getAttribute('data-slot-time');
        }
        stepPills.forEach(function (p, i) {
          p.classList.toggle('is-active', i <= 1);
        });
      });
    });

    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var courseSel = document.getElementById('bookingCourseSelect');
        var guruSel = document.getElementById('bookingGuruSelect');
        var dateIn = document.getElementById('bookingDateInput');
        var modeSel = document.getElementById('bookingModeSelect');
        var slotVal = selectedSlotInput ? selectedSlotInput.value : '06:30 PM IST';

        var list = getBookings();
        var newId = 'BK-' + (903 + list.length);
        list.unshift({
          id: newId,
          course: courseSel ? courseSel.value : 'Saraswati Veena 1-on-1 Session',
          guru: guruSel ? guruSel.value : 'Vidushi Dr. Meenakshi Sundaram',
          date: (dateIn && dateIn.value) ? dateIn.value : '2026-11-24',
          slot: slotVal,
          mode: modeSel ? modeSel.value : 'Online (Dual-Cam Fret View)',
          status: 'Confirmed'
        });
        saveBookings(list);
        renderBookings();

        stepPills.forEach(function (p) { p.classList.add('is-active'); });
        if (feedbackEl) {
          feedbackEl.style.display = 'block';
          feedbackEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Booking <strong>' + newId + '</strong> confirmed for ' + slotVal + '!';
        }
      });
    }

    renderBookings();
  }

  /* ------------------------------------------------------------------------
     3. PRACTICE NOTES, AUDIO TRACK PLAYER & PERSONAL SADHANA DIARY
     ------------------------------------------------------------------------ */
  function initPracticeNotes() {
    /* Practice Audio Track Synth Player */
    var playBtn = document.getElementById('practiceTrackPlayBtn');
    var trackTitle = document.getElementById('practiceTrackTitle');
    var progressBar = document.getElementById('practiceTrackProgress');
    var timeLabel = document.getElementById('practiceTrackTime');
    var tempoSelect = document.getElementById('practiceTempoSelect');
    var trackTimer = null;
    var progressPct = 0;

    /* Raga Mohanam Phrase Frequencies (Sa Ri2 Ga3 Pa Dha2 Sa) */
    var mohanamNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00, 329.63, 293.66, 261.63];
    var noteStep = 0;

    function triggerPracticeTone(freq) {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window._dashAudioCtx) window._dashAudioCtx = new AudioCtx();
      var ctx = window._dashAudioCtx;
      if (ctx.state === 'suspended') ctx.resume();

      var now = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
    }

    function stopTrack() {
      if (trackTimer) {
        clearInterval(trackTimer);
        trackTimer = null;
      }
      if (playBtn) {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play Reference Track';
      }
    }

    if (playBtn) {
      playBtn.addEventListener('click', function () {
        if (trackTimer) {
          stopTrack();
          return;
        }
        var speed = tempoSelect ? parseFloat(tempoSelect.value) || 1 : 1;
        var intervalMs = Math.round(520 / speed);
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause Track';

        trackTimer = setInterval(function () {
          triggerPracticeTone(mohanamNotes[noteStep % mohanamNotes.length]);
          noteStep++;
          progressPct = (progressPct + 4) % 100;
          if (progressBar) progressBar.style.width = progressPct + '%';
          if (timeLabel) {
            var secs = Math.floor((progressPct / 100) * 145);
            var m = Math.floor(secs / 60);
            var s = secs % 60;
            timeLabel.textContent = '0' + m + ':' + String(s).padStart(2, '0') + ' / 02:25';
          }
        }, intervalMs);
      });
    }

    /* Load Custom Track Button on Individual Practice Cards */
    document.querySelectorAll('[data-load-track]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var title = btn.getAttribute('data-load-track');
        if (trackTitle) trackTitle.textContent = title;
        progressPct = 0;
        stopTrack();
        if (playBtn) playBtn.click();
      });
    });

    /* Mark as Practiced Checkboxes */
    var practicedMap = JSON.parse(localStorage.getItem('nadam_practiced_lessons') || '{}');
    document.querySelectorAll('[data-lesson-check]').forEach(function (chk) {
      var id = chk.getAttribute('data-lesson-check');
      if (practicedMap[id]) {
        chk.checked = true;
      }
      chk.addEventListener('change', function () {
        practicedMap[id] = chk.checked;
        localStorage.setItem('nadam_practiced_lessons', JSON.stringify(practicedMap));
      });
    });

    /* Personal Sadhana Diary Notes */
    var diaryInput = document.getElementById('sadhanaDiaryInput');
    var diarySaveBtn = document.getElementById('sadhanaDiarySaveBtn');
    var diaryStatus = document.getElementById('sadhanaDiaryStatus');

    if (diaryInput) {
      var savedDiary = localStorage.getItem('nadam_sadhana_diary');
      if (savedDiary) diaryInput.value = savedDiary;
    }
    if (diarySaveBtn && diaryInput) {
      diarySaveBtn.addEventListener('click', function () {
        localStorage.setItem('nadam_sadhana_diary', diaryInput.value);
        if (diaryStatus) {
          diaryStatus.textContent = 'Saved to local Sadhana Journal just now.';
        }
      });
    }

    /* Printable Notation PDF Download Generator */
    document.querySelectorAll('[data-download-notation]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var title = btn.getAttribute('data-download-notation') || 'Nadam_Veena_Notation';
        var content =
          'NADAM VEENA ACADEMY — MYLAPORE, CHENNAI\n' +
          'Official Archival Swara & Sahitya Notation Sheet\n' +
          '=================================================\n' +
          'Composition: ' + title + '\n' +
          'Sruti Alignment: Sa - Pa - Sa (2.5 Kattai / D#)\n\n' +
          'Arohanam  : S R2 G3 P D2 S\n' +
          'Avarohanam: S D2 P G3 R2 S\n\n' +
          'Pallavi Swara Passage (Adi Tala - 8 Beats):\n' +
          '| G , G , | P , , , | D , P , | S , , , ||\n' +
          '| R , S , | D , P , | G , R , | S , , , ||\n\n' +
          'Meettu (Right-Hand Plucking) Instructions:\n' +
          '- Use Index finger (Tarjani) on Long Dirgha Swaras.\n' +
          '- Plucked Thala strings on Laghu Sam, Dhrutam beats 5 and 7.\n';
        var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_notation.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. FEES & PAYMENTS: PAY-NOW MODAL & RECEIPT DOWNLOAD
     ------------------------------------------------------------------------ */
  function initFeesAndPayments() {
    var payConfirmBtn = document.getElementById('confirmFeePaymentBtn');
    var feeAlertBanner = document.getElementById('dashFeeAlertBanner');
    var pendingStatusBadge = document.getElementById('pendingInvoiceStatus');
    var paymentHistoryBody = document.getElementById('paymentHistoryBody');
    var payModal = document.getElementById('payNowModal');

    function applyPaidState() {
      if (feeAlertBanner) feeAlertBanner.style.display = 'none';
      if (pendingStatusBadge) {
        pendingStatusBadge.className = 'tag tag--peacock';
        pendingStatusBadge.textContent = 'Paid — ₹4,800 (Cleared)';
      }
    }

    if (localStorage.getItem('nadam_nov_fee_paid') === 'true') {
      applyPaidState();
    }

    if (payConfirmBtn) {
      payConfirmBtn.addEventListener('click', function () {
        localStorage.setItem('nadam_nov_fee_paid', 'true');
        applyPaidState();

        if (paymentHistoryBody) {
          var tr = document.createElement('tr');
          tr.innerHTML =
            '<td><strong>#INV-2026-114</strong></td>' +
            '<td>14 Nov 2026</td>' +
            '<td>Sadhana 1-on-1 Veena Mentorship (Nov–Dec)</td>' +
            '<td><strong>₹4,800</strong></td>' +
            '<td>UPI / Instant Gateway</td>' +
            '<td><span class="tag tag--peacock">Paid</span></td>' +
            '<td><button type="button" class="icon-toggle-btn" style="width:auto;padding:0 0.75rem;height:36px;" data-download-notation="Receipt_INV_2026_114"><i class="fa-solid fa-file-arrow-down"></i>&nbsp;Receipt</button></td>';
          paymentHistoryBody.insertBefore(tr, paymentHistoryBody.firstChild);
        }

        if (payModal) {
          payModal.classList.remove('is-open');
          payModal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     5. REAL-TIME MESSAGES INBOX (GURU-SHISHYA CHAT)
     ------------------------------------------------------------------------ */
  function initMessagesChat() {
    var chatForm = document.getElementById('dashChatForm');
    var chatInput = document.getElementById('dashChatInput');
    var chatMessages = document.getElementById('dashChatMessages');

    if (!chatForm || !chatInput || !chatMessages) return;

    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = chatInput.value.trim();
      if (!text) return;

      var studentBubble = document.createElement('div');
      studentBubble.className = 'chat-bubble chat-bubble--student';
      studentBubble.innerHTML = '<p>' + text.replace(/</g, '&lt;') + '</p><small style="opacity:0.8;font-size:0.72rem;">Just now</small>';
      chatMessages.appendChild(studentBubble);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(function () {
        var guruBubble = document.createElement('div');
        guruBubble.className = 'chat-bubble chat-bubble--guru';
        guruBubble.innerHTML = '<strong>Vidushi Dr. Meenakshi Sundaram</strong><p>Blessings! I have noted your query. Let us review the Gandharam deflection in the Anupallavi during our next class.</p><small style="color:var(--text-muted);font-size:0.72rem;">Auto-acknowledged • Guru Desk</small>';
        chatMessages.appendChild(guruBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 900);
    });
  }

  /* ------------------------------------------------------------------------
     6. PROFILE & SETTINGS PERSISTENCE
     ------------------------------------------------------------------------ */
  function initProfileSettings() {
    var profileForm = document.getElementById('dashProfileForm');
    var profileFeedback = document.getElementById('dashProfileFeedback');
    if (!profileForm) return;

    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameIn = document.getElementById('profileNameInput');
      var srutiIn = document.getElementById('profileSrutiInput');
      var newName = nameIn ? nameIn.value.trim() : 'Ananya Venkataraman';
      var newSruti = srutiIn ? srutiIn.value : 'D# (2.5 Kattai)';

      localStorage.setItem('nadam_auth_user', JSON.stringify({
        name: newName,
        role: 'student',
        level: 'Madhyama (Varnam Level)',
        sruti: newSruti
      }));

      document.querySelectorAll('[data-user-name]').forEach(function (el) {
        el.textContent = newName;
      });

      if (profileFeedback) {
        profileFeedback.style.display = 'inline-flex';
        profileFeedback.textContent = 'Profile & Sruti preferences saved!';
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. INSTRUCTOR DASHBOARD: ATTENDANCE & UPLOAD PRACTICE NOTES
     ------------------------------------------------------------------------ */
  function initInstructorFeatures() {
    document.querySelectorAll('[data-attendance-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = btn.textContent.trim();
        var next = current === 'Present' ? 'Rescheduled' : (current === 'Rescheduled' ? 'Absent' : 'Present');
        btn.textContent = next;
        btn.className = next === 'Present' ? 'tag tag--peacock' : (next === 'Rescheduled' ? 'tag tag--gold' : 'tag');
        btn.style.cursor = 'pointer';
      });
    });

    var uploadForm = document.getElementById('instructorUploadNoteForm');
    var uploadedList = document.getElementById('instructorUploadedNotesBody');
    var uploadFeedback = document.getElementById('instructorUploadFeedback');

    if (uploadForm && uploadedList) {
      uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var titleIn = document.getElementById('instNoteTitle');
        var ragaIn = document.getElementById('instNoteRaga');
        var talaIn = document.getElementById('instNoteTala');
        var batchIn = document.getElementById('instNoteBatch');

        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td><strong>' + (titleIn ? titleIn.value : 'New Kriti Notation') + '</strong></td>' +
          '<td>' + (ragaIn ? ragaIn.value : 'Kalyani') + '</td>' +
          '<td>' + (talaIn ? talaIn.value : 'Adi Tala') + '</td>' +
          '<td>' + (batchIn ? batchIn.value : 'Madhyama Batch') + '</td>' +
          '<td><span class="tag tag--peacock">Published Now</span></td>';
        uploadedList.insertBefore(tr, uploadedList.firstChild);

        if (uploadFeedback) {
          uploadFeedback.style.display = 'block';
          uploadFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Practice notation published to student portals!';
        }
        uploadForm.reset();
      });
    }
  }

  function initAllDashboard() {
    initDashboardShell();
    initClassBooking();
    initPracticeNotes();
    initFeesAndPayments();
    initMessagesChat();
    initProfileSettings();
    initInstructorFeatures();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllDashboard);
  } else {
    initAllDashboard();
  }
})();
