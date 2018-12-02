const diary = require('../lib/diary');
const date = require('date-and-time');
describe('Diary', () => {
  
  describe('.entries', () => {
    it('lists the entries in the diary', () => {
      expect(diary.entries().length).toEqual(0);
    })
  })

  describe('.entry', () => {
    it('Adds and entry to the journal', () => {
      diary.entry('Hey');
      expect(diary.entries().length).toEqual(1);
    })
  })

  describe('.tags', () => {
    it('Lists the tags contained in all entries', () => {
      expect(diary.tags()[0]).toEqual(null);
      diary.entry("Sup brah! #brahsforever");
      expect(diary.tags()[0]).toEqual('brahsforever');
    })
  })

  describe('.entriesWithTag', () => {
    it('Returns a list of entries with the given tag', () => {
      diary.entry("Sup brah! #brahsforever");
      expect(diary.entriesWithTag('brahsforever')).toContain("Sup brah! #brahsforever");
    })
  })

  describe('.today', () => {
    it('Returns a list of entries written today', () =>{
      let now = new Date();
      let formattedDate = date.format(now, 'ddd MMM DD YYYY');
      diary.entry('YO', formattedDate);
      expect(diary.today()).toContain('YO');
    })

    it('Does not include entries not written today', () => {
      let earlierDate = new Date('10/10/10');
      let earlierDateFormatted = date.format(earlierDate, 'ddd MMM DD YYYY');
      diary.entry('Sup!', earlierDateFormatted);
      expect(diary.today()).not.toContain('Sup!');
    })
  })
})