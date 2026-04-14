const hospitalData = {
  "Caritas Hospital, Kottayam": {
    departments: {
      "General Medicine": { morning: 72, afternoon: 38, evening: 52 },
      "ENT": { morning: 48, afternoon: 24, evening: 34 },
      "Orthopedics": { morning: 58, afternoon: 30, evening: 42 },
      "Dermatology": { morning: 34, afternoon: 18, evening: 24 },
      "Gastroenterology": { morning: 52, afternoon: 28, evening: 38 },
      "Ophthalmology": { morning: 42, afternoon: 20, evening: 28 },
      "Cardiology / Emergency": { morning: 18, afternoon: 12, evening: 15 }
    },
    live: {
      "General Medicine": { currentToken: 26, avgConsultTime: 6, doctors: 2 },
      "ENT": { currentToken: 14, avgConsultTime: 5, doctors: 1 },
      "Orthopedics": { currentToken: 18, avgConsultTime: 7, doctors: 2 },
      "Dermatology": { currentToken: 10, avgConsultTime: 4, doctors: 1 },
      "Gastroenterology": { currentToken: 12, avgConsultTime: 6, doctors: 1 },
      "Ophthalmology": { currentToken: 9, avgConsultTime: 4, doctors: 1 },
      "Cardiology / Emergency": { currentToken: 4, avgConsultTime: 8, doctors: 2 }
    }
  },
  "Bharath Hospital, Kottayam": {
    departments: {
      "General Medicine": { morning: 64, afternoon: 34, evening: 46 },
      "ENT": { morning: 40, afternoon: 20, evening: 28 },
      "Orthopedics": { morning: 50, afternoon: 24, evening: 36 },
      "Dermatology": { morning: 28, afternoon: 16, evening: 22 },
      "Gastroenterology": { morning: 44, afternoon: 24, evening: 32 },
      "Ophthalmology": { morning: 34, afternoon: 16, evening: 22 },
      "Cardiology / Emergency": { morning: 16, afternoon: 10, evening: 12 }
    },
    live: {
      "General Medicine": { currentToken: 22, avgConsultTime: 6, doctors: 2 },
      "ENT": { currentToken: 11, avgConsultTime: 5, doctors: 1 },
      "Orthopedics": { currentToken: 15, avgConsultTime: 7, doctors: 2 },
      "Dermatology": { currentToken: 8, avgConsultTime: 4, doctors: 1 },
      "Gastroenterology": { currentToken: 10, avgConsultTime: 6, doctors: 1 },
      "Ophthalmology": { currentToken: 7, avgConsultTime: 4, doctors: 1 },
      "Cardiology / Emergency": { currentToken: 3, avgConsultTime: 8, doctors: 2 }
    }
  },
  "Mar Sleeva Medicity, Palai": {
    departments: {
      "General Medicine": { morning: 48, afternoon: 26, evening: 34 },
      "ENT": { morning: 28, afternoon: 14, evening: 20 },
      "Orthopedics": { morning: 38, afternoon: 18, evening: 26 },
      "Dermatology": { morning: 20, afternoon: 10, evening: 14 },
      "Gastroenterology": { morning: 30, afternoon: 16, evening: 22 },
      "Ophthalmology": { morning: 24, afternoon: 12, evening: 16 },
      "Cardiology / Emergency": { morning: 14, afternoon: 8, evening: 10 }
    },
    live: {
      "General Medicine": { currentToken: 18, avgConsultTime: 5, doctors: 2 },
      "ENT": { currentToken: 8, avgConsultTime: 4, doctors: 1 },
      "Orthopedics": { currentToken: 10, avgConsultTime: 6, doctors: 1 },
      "Dermatology": { currentToken: 5, avgConsultTime: 4, doctors: 1 },
      "Gastroenterology": { currentToken: 7, avgConsultTime: 5, doctors: 1 },
      "Ophthalmology": { currentToken: 5, avgConsultTime: 4, doctors: 1 },
      "Cardiology / Emergency": { currentToken: 2, avgConsultTime: 8, doctors: 1 }
    }
  }
};

const symptomRules = [
  {
    match: ["Ear Pain"],
    department: "ENT",
    urgency: "Routine",
    carePath: "Specialist OPD",
    note: "Ear-related symptoms are best checked under ENT."
  },
  {
    match: ["Skin Rash"],
    department: "Dermatology",
    urgency: "Routine",
    carePath: "Specialist OPD",
    note: "Skin-related complaints are best checked under Dermatology."
  },
  {
    match: ["Joint Pain"],
    department: "Orthopedics",
    urgency: "Routine",
    carePath: "Specialist OPD",
    note: "Joint or bone-related complaints are best checked under Orthopedics."
  },
  {
    match: ["Stomach Pain"],
    department: "Gastroenterology",
    urgency: "Visit Today",
    carePath: "Priority OPD",
    note: "Stomach pain may need faster review depending on severity and duration."
  },
  {
    match: ["Headache"],
    department: "General Medicine",
    urgency: "Routine",
    carePath: "General OPD",
    note: "General Medicine is the first recommended department for common headaches."
  },
  {
    match: ["Eye Irritation"],
    department: "Ophthalmology",
    urgency: "Routine",
    carePath: "Specialist OPD",
    note: "Eye irritation is best checked under Ophthalmology."
  },
  {
    match: ["Fever"],
    department: "General Medicine",
    urgency: "Routine",
    carePath: "General OPD",
    note: "Fever is usually first checked under General Medicine."
  },
  {
    match: ["Cough"],
    department: "General Medicine",
    urgency: "Routine",
    carePath: "General OPD",
    note: "Cough is usually first checked under General Medicine."
  },
  {
    match: ["Fever", "Cough"],
    department: "General Medicine",
    urgency: "Visit Today",
    carePath: "Priority OPD",
    note: "Fever with cough may need same-day consultation depending on condition."
  },
  {
    match: ["Chest Pain"],
    department: "Cardiology / Emergency",
    urgency: "Urgent",
    carePath: "Emergency / Fast Review",
    note: "Chest pain should be treated with higher priority."
  },
  {
    match: ["Breathlessness"],
    department: "Cardiology / Emergency",
    urgency: "Urgent",
    carePath: "Emergency / Fast Review",
    note: "Breathlessness should be treated with higher priority."
  },
  {
    match: ["Chest Pain", "Breathlessness"],
    department: "Cardiology / Emergency",
    urgency: "Emergency",
    carePath: "Immediate Emergency Care",
    note: "Chest pain with breathlessness needs immediate emergency attention."
  }
];

const intakeForm = document.getElementById("intakeForm");
const summaryPanel = document.getElementById("summaryPanel");
const waitPanel = document.getElementById("waitPanel");
const tokenPanel = document.getElementById("tokenPanel");
const alternativesPanel = document.getElementById("alternativesPanel");
const recentSessions = document.getElementById("recentSessions");

document.addEventListener("DOMContentLoaded", () => {
  renderRecentSessions();
});

intakeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const input = {
    hospital: document.getElementById("hospital").value,
    visitType: document.getElementById("visitType").value,
    ageGroup: document.getElementById("ageGroup").value,
    patientCategory: document.getElementById("patientCategory").value,
    consultWindow: document.getElementById("consultWindow").value,
    chiefComplaint: document.getElementById("chiefComplaint").value,
    associatedSymptom: document.getElementById("associatedSymptom").value,
    intensity: document.getElementById("intensity").value,
    duration: document.getElementById("duration").value,
    mobilitySupport: document.getElementById("mobilitySupport").value,
    yourToken: document.getElementById("yourToken").value,
    travelTime: document.getElementById("travelTime").value,
    arrivalFlexibility: document.getElementById("arrivalFlexibility").value
  };

  const recommendation = getCareRecommendation(input);
  const waitInfo = getWaitingEstimate(input.hospital, recommendation.department, input.consultWindow, input);
  const bestVisit = getBestVisitOption(input.hospital, recommendation.department, input.consultWindow, input, recommendation);
  const tokenInfo = getTokenEstimate(input.hospital, recommendation.department, input.yourToken);
  const alternatives = getAlternativeHospitals(input.hospital, recommendation.department, input.consultWindow);
  const smartAction = getSmartRecommendation(input, recommendation, waitInfo, bestVisit, alternatives);
  const checklist = getPreparedVisitChecklist(input, recommendation, smartAction);

  renderVisitSummary(input, recommendation, waitInfo, smartAction, checklist);
  renderWaitingEstimate(input, recommendation, waitInfo, bestVisit, smartAction);
  renderTokenEstimate(tokenInfo);
  renderAlternativeHospitals(alternatives, recommendation.department, input.consultWindow);

  saveRecentSession({
    chiefComplaint: input.chiefComplaint,
    department: recommendation.department,
    facility: input.hospital,
    urgency: recommendation.urgency
  });
});

/* -------------------- CORE LOGIC -------------------- */

function getCareRecommendation(input) {
  const selectedSymptoms = [input.chiefComplaint];
  if (input.associatedSymptom) {
    selectedSymptoms.push(input.associatedSymptom);
  }

  let matchedRule = symptomRules.find(rule => {
    if (rule.match.length !== selectedSymptoms.length) return false;
    return rule.match.every(symptom => selectedSymptoms.includes(symptom));
  });

  if (!matchedRule) {
    matchedRule = symptomRules.find(rule => {
      return rule.match.length === 1 && rule.match[0] === input.chiefComplaint;
    });
  }

  if (!matchedRule) {
    matchedRule = {
      department: "General Medicine",
      urgency: "Routine",
      carePath: "General OPD",
      note: "General Medicine is recommended as the default first step."
    };
  }

  const urgency = adjustUrgency(matchedRule.urgency, input);
  const carePath = adjustCarePath(matchedRule.carePath, urgency);
  const readinessScore = getVisitReadinessScore(input, urgency);
  const visitAdvice = getVisitAdvice(urgency, input.visitType);

  return {
    department: matchedRule.department,
    urgency,
    carePath,
    note: matchedRule.note,
    readinessScore,
    visitAdvice
  };
}

function adjustUrgency(baseUrgency, input) {
  const levels = ["Routine", "Visit Today", "Urgent", "Emergency"];
  let index = levels.indexOf(baseUrgency);

  if (input.intensity === "Severe" && index < levels.length - 1) {
    index += 1;
  }

  if (input.duration === "1+ week" && index < 2) {
    index += 1;
  }

  if (input.ageGroup === "Senior" && input.intensity !== "Mild" && index < 2) {
    index += 1;
  }

  if (input.mobilitySupport === "Yes" && index < 2) {
    index = Math.max(index, 1);
  }

  if (
    input.chiefComplaint === "Chest Pain" &&
    input.associatedSymptom === "Breathlessness"
  ) {
    index = 3;
  }

  return levels[index];
}

function adjustCarePath(baseCarePath, urgency) {
  if (urgency === "Emergency") return "Immediate Emergency Care";
  if (urgency === "Urgent") return "Emergency / Fast Review";
  if (urgency === "Visit Today") return "Priority OPD";
  return baseCarePath;
}

function getVisitReadinessScore(input, urgency) {
  let score = 100;

  if (input.visitType === "First Visit") score -= 8;
  if (input.arrivalFlexibility === "Low") score -= 12;
  if (input.mobilitySupport === "Yes") score -= 8;
  if (input.travelTime && Number(input.travelTime) > 30) score -= 8;

  if (urgency === "Visit Today") score -= 10;
  if (urgency === "Urgent") score -= 18;
  if (urgency === "Emergency") score -= 25;

  return Math.max(score, 45);
}

function getVisitAdvice(urgency, visitType) {
  if (urgency === "Emergency") {
    return "Do not delay. Immediate emergency care is recommended.";
  }

  if (urgency === "Urgent") {
    return "Prefer the earliest available time slot and avoid delay.";
  }

  if (visitType === "First Visit") {
    return "Try to arrive a little earlier for registration and first-time guidance.";
  }

  return "Standard OP visit planning is suitable.";
}

function getWaitingEstimate(hospital, department, consultWindow, input) {
  const baseWait = hospitalData[hospital].departments[department][consultWindow];
  let adjustedWait = baseWait;

  if (input.patientCategory === "Senior Priority") adjustedWait -= 5;
  if (input.patientCategory === "Pediatric Priority") adjustedWait -= 4;
  if (input.intensity === "Moderate") adjustedWait -= 4;
  if (input.intensity === "Severe") adjustedWait -= 8;
  if (input.visitType === "Follow-up") adjustedWait -= 3;

  adjustedWait = Math.max(adjustedWait, 8);

  return {
    predictedWait: adjustedWait,
    crowdLevel: getCrowdLevel(adjustedWait),
    loadStatus: getLoadStatus(adjustedWait)
  };
}

function getCrowdLevel(wait) {
  if (wait <= 20) return "Low";
  if (wait <= 45) return "Medium";
  return "High";
}

function getLoadStatus(wait) {
  if (wait <= 20) return "Light Rush";
  if (wait <= 45) return "Moderate Rush";
  return "Heavy Rush";
}

function getBestVisitOption(hospital, department, consultWindow, input, recommendation) {
  const slots = hospitalData[hospital].departments[department];
  const entries = Object.entries(slots);

  let bestSlot = entries[0][0];
  let bestWait = entries[0][1];

  entries.forEach(([slot, wait]) => {
    if (wait < bestWait) {
      bestSlot = slot;
      bestWait = wait;
    }
  });

  const currentWait = slots[consultWindow];
  const timeSaved = Math.max(currentWait - bestWait, 0);
  const travelTime = input.travelTime ? Number(input.travelTime) : 0;

  let mode = "Current Slot Works Fine";

  if (recommendation.urgency === "Emergency") {
    mode = "Emergency Priority";
  } else if (recommendation.urgency === "Urgent") {
    mode = "Fastest Consultation Needed";
  } else if (timeSaved >= 20) {
    mode = "Strongly Recommended to Switch Slot";
  } else if (timeSaved >= 8) {
    mode = "Better Slot Available";
  }

  let leaveAdvice = "Travel-time advice unavailable.";
  if (travelTime > 0) {
    if (recommendation.urgency === "Emergency") {
      leaveAdvice = "Leave immediately. Waiting-time optimization should not delay emergency care.";
    } else {
      leaveAdvice = `For ${formatSlot(bestSlot)}, plan to leave about ${travelTime} minutes earlier.`;
    }
  }

  return {
    bestSlot,
    bestWait,
    currentWait,
    timeSaved,
    travelTime,
    mode,
    leaveAdvice
  };
}

function getTokenEstimate(hospital, department, yourToken) {
  if (!yourToken || Number(yourToken) <= 0) return null;

  const live = hospitalData[hospital].live[department];
  const tokenNumber = Number(yourToken);

  if (tokenNumber <= live.currentToken) {
    return {
      status: "active",
      currentToken: live.currentToken,
      yourToken: tokenNumber,
      patientsAhead: 0,
      eta: 0,
      avgConsultTime: live.avgConsultTime,
      doctors: live.doctors
    };
  }

  const patientsAhead = tokenNumber - live.currentToken;
  const eta = Math.ceil((patientsAhead * live.avgConsultTime) / live.doctors);

  return {
    status: "waiting",
    currentToken: live.currentToken,
    yourToken: tokenNumber,
    patientsAhead,
    eta,
    avgConsultTime: live.avgConsultTime,
    doctors: live.doctors
  };
}

function getAlternativeHospitals(selectedHospital, department, consultWindow) {
  const options = [];

  Object.keys(hospitalData).forEach(hospital => {
    if (hospital !== selectedHospital) {
      const wait = hospitalData[hospital].departments[department][consultWindow];
      options.push({
        hospital,
        wait,
        crowdLevel: getCrowdLevel(wait)
      });
    }
  });

  options.sort((a, b) => a.wait - b.wait);
  return options;
}

/* -------------------- NEW CREATIVE FEATURES -------------------- */

function getSmartRecommendation(input, recommendation, waitInfo, bestVisit, alternatives) {
  const bestAlternative = alternatives.length ? alternatives[0] : null;

  if (recommendation.urgency === "Emergency") {
    return {
      title: "Immediate Action Recommended",
      message: "Do not optimize for waiting time. Seek immediate emergency care at the selected hospital or the nearest available emergency facility.",
      reason: "Emergency symptoms should be prioritized over queue reduction."
    };
  }

  if (recommendation.urgency === "Urgent") {
    return {
      title: "Prefer Fastest Same-Day Consultation",
      message: "Choose the earliest possible consultation rather than waiting for a later low-rush slot.",
      reason: "Urgent cases benefit more from faster medical review than lower queue time."
    };
  }

  if (bestAlternative && bestAlternative.wait + 8 < waitInfo.predictedWait) {
    return {
      title: "Alternative Hospital May Save Time",
      message: `${bestAlternative.hospital} may reduce your waiting time by about ${waitInfo.predictedWait - bestAlternative.wait} minutes for the same department.`,
      reason: "A meaningful waiting-time difference was detected across hospitals."
    };
  }

  if (bestVisit.timeSaved >= 10 && bestVisit.bestSlot !== input.consultWindow) {
    return {
      title: "Better Time Slot Available",
      message: `Switching to ${formatSlot(bestVisit.bestSlot)} may save around ${bestVisit.timeSaved} minutes compared to your current selection.`,
      reason: "The same hospital has a lower predicted load in another time slot."
    };
  }

  if (waitInfo.predictedWait <= 20) {
    return {
      title: "Current Selection Looks Good",
      message: "You can continue with the selected hospital and time slot. The current waiting estimate is already reasonable.",
      reason: "The predicted waiting time is low enough for a standard OP visit."
    };
  }

  return {
    title: "Proceed With Basic Preparation",
    message: "The current hospital and slot are acceptable, but arriving slightly early can help reduce registration delays.",
    reason: "No strong alternative advantage was detected."
  };
}

function getPreparedVisitChecklist(input, recommendation, smartAction) {
  const items = [];

  items.push("Keep a valid ID and basic patient details ready before leaving.");
  items.push(`Visit the ${recommendation.department} department based on the current symptom selection.`);

  if (input.visitType === "First Visit") {
    items.push("Arrive 15–20 minutes early for registration and first-time guidance.");
  } else {
    items.push("Carry your previous prescription or follow-up records if available.");
  }

  if (input.yourToken) {
    items.push("Keep your token number ready for quick verification at the hospital.");
  }

  if (input.ageGroup === "Senior" || input.mobilitySupport === "Yes") {
    items.push("If possible, take a family member or support person for easier movement and faster assistance.");
  }

  if (recommendation.urgency === "Visit Today" || recommendation.urgency === "Urgent") {
    items.push("Prefer same-day consultation and avoid delaying the visit unnecessarily.");
  }

  if (recommendation.urgency === "Emergency") {
    items.push("Do not wait for a better slot. Go immediately to emergency care.");
  }

  items.push(`Smart action: ${smartAction.title}.`);

  return items.slice(0, 5);
}

/* -------------------- RENDERING -------------------- */

function renderVisitSummary(input, recommendation, waitInfo, smartAction, checklist) {
  const urgencyClass = getUrgencyClass(recommendation.urgency);
  const isEmergency = recommendation.urgency === "Emergency";

  summaryPanel.innerHTML = `
    <div class="panel-header">
      <h2>Visit Summary</h2>
      <p>Main recommendation, urgency, smart action, and visit preparation checklist</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Main Symptom</div>
        <div class="kpi-value">${input.chiefComplaint}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Suggested Department</div>
        <div class="kpi-value">${recommendation.department}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Urgency Level</div>
        <div class="kpi-value">
          <span class="badge ${getUrgencyClass(recommendation.urgency)}">${recommendation.urgency}</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Estimated Wait</div>
        <div class="kpi-value">${waitInfo.predictedWait} mins</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Care Path</div>
        <div class="kpi-value">${recommendation.carePath}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Visit Score</div>
        <div class="kpi-value">${recommendation.readinessScore}/100</div>
      </div>
    </div>

    <div class="smart-box">
      <div class="smart-title">Smart Recommendation</div>
      <strong>${smartAction.title}</strong><br>
      ${smartAction.message}<br><br>
      <strong>Why:</strong> ${smartAction.reason}
    </div>

    <div class="note-box ${isEmergency ? "warning" : ""}">
      <strong>Recommendation Note:</strong> ${recommendation.note}<br><br>
      <strong>Visit Advice:</strong> ${recommendation.visitAdvice}
    </div>

    <div class="checklist">
      ${checklist.map(item => `<div class="check-item">• ${item}</div>`).join("")}
    </div>
  `;
}

function renderWaitingEstimate(input, recommendation, waitInfo, bestVisit, smartAction) {
  waitPanel.innerHTML = `
    <div class="panel-header">
      <h2>Waiting Time Estimate</h2>
      <p>Estimated OP waiting time, crowd level, best time slot, and travel advice</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Hospital</div>
        <div class="kpi-value">${input.hospital}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Department</div>
        <div class="kpi-value">${recommendation.department}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Selected Time Slot</div>
        <div class="kpi-value">${formatSlot(input.consultWindow)}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Estimated Wait</div>
        <div class="kpi-value">${waitInfo.predictedWait} mins</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Crowd Level</div>
        <div class="kpi-value">
          <span class="badge ${waitInfo.crowdLevel.toLowerCase()}">${waitInfo.crowdLevel}</span>
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Hospital Rush</div>
        <div class="kpi-value">${waitInfo.loadStatus}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Best Time Slot</div>
        <div class="kpi-value">${formatSlot(bestVisit.bestSlot)}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Time Saved</div>
        <div class="kpi-value">${bestVisit.timeSaved} mins</div>
      </div>
    </div>

    <div class="note-box">
      <strong>Travel Advice:</strong> ${bestVisit.leaveAdvice}<br><br>
      <strong>Slot Decision:</strong> ${bestVisit.mode}
    </div>

    <div class="smart-box">
      <div class="smart-title">Quick Action</div>
      ${smartAction.message}
    </div>
  `;
}

function renderTokenEstimate(tokenInfo) {
  if (!tokenInfo) {
    tokenPanel.innerHTML = `
      <div class="panel-header">
        <h2>Token Wait Estimator</h2>
        <p>If a token is already assigned, estimate how many patients are ahead</p>
      </div>
      <div class="placeholder">
        If the hospital already gave you a token during registration, enter it to estimate your waiting time.
      </div>
    `;
    return;
  }

  tokenPanel.innerHTML = `
    <div class="panel-header">
      <h2>Token Wait Estimator</h2>
      <p>If a token is already assigned, estimate how many patients are ahead</p>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Current Serving Token</div>
        <div class="kpi-value">${tokenInfo.currentToken}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Your Token</div>
        <div class="kpi-value">${tokenInfo.yourToken}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Patients Ahead</div>
        <div class="kpi-value">${tokenInfo.patientsAhead}</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Estimated Extra Wait</div>
        <div class="kpi-value">${tokenInfo.eta} mins</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Avg Consult Time</div>
        <div class="kpi-value">${tokenInfo.avgConsultTime} mins</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Doctors Available</div>
        <div class="kpi-value">${tokenInfo.doctors}</div>
      </div>
    </div>

    <div class="note-box">
      ${
        tokenInfo.status === "active"
          ? "Your token is already being served or is very close."
          : "Estimated wait is calculated using patients ahead, average consultation time, and number of doctors."
      }
    </div>
  `;
}

function renderAlternativeHospitals(alternatives, department, consultWindow) {
  if (!alternatives.length) {
    alternativesPanel.innerHTML = `
      <div class="panel-header">
        <h2>Other Hospital Options</h2>
        <p>Compare estimated waiting times in other hospitals for the same department</p>
      </div>
      <div class="placeholder">No alternative hospitals available.</div>
    `;
    return;
  }

  const cards = alternatives.map(option => `
    <div class="alt-card">
      <div class="alt-title">${option.hospital}</div>
      <div class="alt-meta">
        Department: <strong>${department}</strong><br>
        Time Slot: <strong>${formatSlot(consultWindow)}</strong><br>
        Estimated Wait: <strong>${option.wait} mins</strong><br>
        Crowd Level: <strong>${option.crowdLevel}</strong>
      </div>
    </div>
  `).join("");

  alternativesPanel.innerHTML = `
    <div class="panel-header">
      <h2>Other Hospital Options</h2>
      <p>Compare estimated waiting times in other hospitals for the same department</p>
    </div>

    <div class="alt-list">
      ${cards}
    </div>
  `;
}

/* -------------------- HELPERS -------------------- */

function getUrgencyClass(urgency) {
  switch (urgency) {
    case "Routine":
      return "routine";
    case "Visit Today":
      return "same-day";
    case "Urgent":
      return "urgent";
    case "Emergency":
      return "emergency";
    default:
      return "routine";
  }
}

function formatSlot(slot) {
  switch (slot) {
    case "morning":
      return "Morning (9 AM - 12 PM)";
    case "afternoon":
      return "Afternoon (1 PM - 4 PM)";
    case "evening":
      return "Evening (5 PM - 8 PM)";
    default:
      return slot;
  }
}

/* -------------------- LOCAL STORAGE -------------------- */

function saveRecentSession(session) {
  const existing = JSON.parse(localStorage.getItem("mediqueueRecentSessions")) || [];
  existing.unshift(session);

  const trimmed = existing.slice(0, 5);
  localStorage.setItem("mediqueueRecentSessions", JSON.stringify(trimmed));

  renderRecentSessions();
}

function renderRecentSessions() {
  const existing = JSON.parse(localStorage.getItem("mediqueueRecentSessions")) || [];

  if (!existing.length) {
    recentSessions.innerHTML = "No recent checks yet.";
    return;
  }

  recentSessions.innerHTML = existing.map(item => `
    <div class="recent-card">
      <strong>${item.chiefComplaint}</strong> → ${item.department}<br>
      <small>${item.facility} • ${item.urgency}</small>
    </div>
  `).join("");
}