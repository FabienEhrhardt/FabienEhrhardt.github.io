let scormAPI = null;

function initSCORM() {
  scormAPI = getAPI();
  if (scormAPI) {
    scormAPI.LMSInitialize("");
  }
}

function terminerSCORM() {
  if (scormAPI) {
    scormAPI.LMSCommit("");
    scormAPI.LMSFinish("");
  }
}

function setScore(score) {
  if (scormAPI) {
    scormAPI.LMSSetValue("cmi.core.score.raw", score);
    scormAPI.LMSSetValue("cmi.core.lesson_status", score >= 50 ? "passed" : "failed");
  }
}

function getAPI() {
  let win = window;
  while (win) {
    if (win.API) return win.API;
    if (win.parent && win.parent !== win) {
      win = win.parent;
    } else {
      break;
    }
  }
  return null;
}
