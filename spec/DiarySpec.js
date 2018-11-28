const diary = require('../lib/diary');
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
})