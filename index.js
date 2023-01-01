import '@logseq/libs';

Date.prototype.getWeek = function () {
  var target  = new Date(this.valueOf());
  var dayNr   = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  var firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
}

Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}

function parseDate(dateString) {
  return new Date(dateString.substring(0, 4), 
                      dateString.substring(4, 6) - 1, 
                      dateString.substring(6));
}

const main = async () => {

  logseq.Editor.registerSlashCommand('insertWeekNumber', async (e) => {
    const currentPage = await logseq.Editor.getCurrentPage()
    if (currentPage && currentPage['journal?']) {
      const journalDay = currentPage.journalDay + ""

      const date = parseDate(journalDay)
      const week = date.getWeek()
      const weekYear = date.getWeekYear()

      logseq.Editor.updateBlock(e.uuid, `[[Year${weekYear}/Week${week}]]`)
    }
  })
  
}

logseq.ready(main).catch(console.error);
