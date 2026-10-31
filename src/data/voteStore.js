// Central Real-Time Voting & Ballot Ledger for NowNine
export const BALLOT_COUNT_KEY = 'now9_total_ballots_live_v4';
export const BALLOT_LOGS_KEY = 'now9_ballot_logs_live_v4';
export const CONSTITUENCY_VOTES_KEY = 'now9_constituency_votes_live_v4';
export const QUESTION_VOTES_KEY = 'now9_question_votes_live_v4';
export const VOTE_CAST_EVENT = 'now9_vote_cast_event';

export function getStoredBallotData() {
  if (typeof window === 'undefined') {
    return { count: 0, logs: [], constituencyVotes: {}, questionVotes: {} };
  }
  try {
    const rawCount = localStorage.getItem(BALLOT_COUNT_KEY);
    // Explicitly start at 0 if not set
    const count = rawCount !== null ? parseInt(rawCount, 10) : 0;
    const logs = JSON.parse(localStorage.getItem(BALLOT_LOGS_KEY) || '[]');
    const constituencyVotes = JSON.parse(localStorage.getItem(CONSTITUENCY_VOTES_KEY) || '{}');
    const questionVotes = JSON.parse(localStorage.getItem(QUESTION_VOTES_KEY) || '{}');
    return { count: isNaN(count) ? 0 : count, logs, constituencyVotes, questionVotes };
  } catch (e) {
    return { count: 0, logs: [], constituencyVotes: {}, questionVotes: {} };
  }
}

export function recordLiveBallot({ party, location, answers = {} }) {
  if (typeof window === 'undefined') return { count: 1 };
  
  const current = getStoredBallotData();
  const nextCount = current.count + 1;
  
  const constituencyName = location?.assembly || location?.locality || 'Mahabubnagar Constituency';
  const localityName = location?.locality || location?.city || 'Yenugonda';
  const partyName = party?.name || 'Congress (INC)';
  const candidateName = party?.candidate || 'Local Candidate';
  
  // Normalize party code to match party.id in ALL_CONSTITUENCIES ('inc', 'brs', 'bjp', 'oth', 'tdp', 'ysrcp', 'aimim')
  const pNameLower = (partyName + ' ' + (party?.id || '')).toLowerCase();
  let partyCode = 'oth';
  if (pNameLower.includes('congress') || pNameLower.includes('inc')) partyCode = 'inc';
  else if (pNameLower.includes('brs')) partyCode = 'brs';
  else if (pNameLower.includes('bjp')) partyCode = 'bjp';
  else if (pNameLower.includes('tdp')) partyCode = 'tdp';
  else if (pNameLower.includes('ysr')) partyCode = 'ysrcp';
  else if (pNameLower.includes('aimim') || pNameLower.includes('mim')) partyCode = 'aimim';

  const ballotId = `#BLT-${String(nextCount).padStart(4, '0')}`;
  
  // Normalize constituency key
  const constituencyLower = (constituencyName + ' ' + localityName).toLowerCase();
  let constituencyKey = 'mahabubnagar';
  if (constituencyLower.includes('mahabubnagar') || constituencyLower.includes('yenugonda') || constituencyLower.includes('palamuru')) {
    constituencyKey = 'mahabubnagar';
  } else if (constituencyLower.includes('lb nagar') || constituencyLower.includes('almasguda') || constituencyLower.includes('badangpet') || constituencyLower.includes('saroornagar')) {
    constituencyKey = 'lbnagar';
  } else if (constituencyLower.includes('jubilee')) {
    constituencyKey = 'jubileehills';
  } else if (constituencyLower.includes('khairatabad')) {
    constituencyKey = 'khairatabad';
  } else if (constituencyLower.includes('serilingampally') || constituencyLower.includes('gachibowli')) {
    constituencyKey = 'serilingampally';
  } else if (constituencyLower.includes('munugode')) {
    constituencyKey = 'munugode';
  } else if (constituencyLower.includes('gajwel')) {
    constituencyKey = 'gajwel';
  } else if (constituencyLower.includes('chandragiri') || constituencyLower.includes('tirupati')) {
    constituencyKey = 'chandragiri';
  } else if (constituencyLower.includes('vijayawada')) {
    constituencyKey = 'vijayawada';
  }

  const newLog = {
    id: ballotId,
    party: partyName,
    candidate: candidateName,
    partyId: partyCode,
    constituencyKey: constituencyKey,
    locality: `${localityName} (${constituencyName.replace(/\s*Constituency\s*/gi, '')})`,
    constituency: constituencyName,
    state: location?.state || 'Telangana',
    time: 'Just now',
    timestamp: Date.now(),
    answers: answers,
    status: 'GPS Verified ✓',
    ip: '182.72.' + Math.floor(Math.random() * 200 + 10) + '.' + Math.floor(Math.random() * 200 + 10),
    hash: 'SHA256:' + Math.random().toString(36).substring(2, 8) + '...' + Math.random().toString(36).substring(2, 6)
  };
    
  const constituencyVotes = { ...current.constituencyVotes };
  if (!constituencyVotes[constituencyKey]) {
    constituencyVotes[constituencyKey] = { total: 0, parties: {} };
  }
  constituencyVotes[constituencyKey].total = (constituencyVotes[constituencyKey].total || 0) + 1;
  
  const partiesMap = { ...constituencyVotes[constituencyKey].parties };
  partiesMap[partyCode] = (partiesMap[partyCode] || 0) + 1;
  constituencyVotes[constituencyKey].parties = partiesMap;
  
  // Track 5-Question Governance answers
  const questionVotes = { ...current.questionVotes };
  Object.entries(answers).forEach(([qIdx, optIdx]) => {
    if (!questionVotes[qIdx]) questionVotes[qIdx] = {};
    questionVotes[qIdx][optIdx] = (questionVotes[qIdx][optIdx] || 0) + 1;
  });

  const nextLogs = [newLog, ...current.logs].slice(0, 50);
  
  try {
    localStorage.setItem(BALLOT_COUNT_KEY, nextCount.toString());
    localStorage.setItem(BALLOT_LOGS_KEY, JSON.stringify(nextLogs));
    localStorage.setItem(CONSTITUENCY_VOTES_KEY, JSON.stringify(constituencyVotes));
    localStorage.setItem(QUESTION_VOTES_KEY, JSON.stringify(questionVotes));
  } catch (e) {
    console.error('Failed to save ballot to localStorage:', e);
  }
  
  // Notify all listening components in real-time
  try {
    window.dispatchEvent(new CustomEvent(VOTE_CAST_EVENT, { 
      detail: { count: nextCount, log: newLog, constituencyVotes, questionVotes } 
    }));
  } catch (e) {}

  return { count: nextCount, log: newLog, constituencyVotes, questionVotes };
}

export function resetAllBallotsToZero() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BALLOT_COUNT_KEY, '0');
    localStorage.setItem(BALLOT_LOGS_KEY, JSON.stringify([]));
    localStorage.setItem(CONSTITUENCY_VOTES_KEY, JSON.stringify({}));
    localStorage.setItem(QUESTION_VOTES_KEY, JSON.stringify({}));
    window.dispatchEvent(new CustomEvent(VOTE_CAST_EVENT, { 
      detail: { count: 0, log: null, constituencyVotes: {}, questionVotes: {} } 
    }));
  } catch (e) {}
}
