const diary = require('../lib/diary');
const dateAndTime = require('date-and-time');
const fs = require('fs');

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
      diary.entry('NRA forever! #simpsons')
      expect(diary.tags()).toEqual(['brahsforever', 'simpsons']);

    })
  })

  describe('.entriesWithTag', () => {
    it('Returns a list of entries with the given tag', () => {
      diary.entry("Sup brah! #brahsforever");
      expect(diary.entriesWithTag('brahsforever')).toContain("Sup brah! #brahsforever");
    })

    it('Does not return entries without the specified tag', () => {
      diary.entry("Sup brah! #brahsforever");
      diary.entry('I have no tag');
      expect(diary.entriesWithTag('brahsforever')).not.toContain('I have no tag');
    })
  })

  describe('.today', () => {
    it('Returns a list of entries written today', () =>{
      let now = new Date();
      let formattedDate = dateAndTime.format(now, 'ddd MMM DD YYYY');
      diary.entry('YO', formattedDate);
      expect(diary.today()).toContain('YO');
    })

    it('Does not include entries not written today', () => {
      let earlierDate = new Date('10/10/10');
      let earlierDateFormatted = dateAndTime.format(earlierDate, 'ddd MMM DD YYYY');
      diary.entry('Sup!', earlierDateFormatted);
      expect(diary.today()).not.toContain('Sup!');
    })
  })

  describe('.date', () => {
    it('Returns a list of entries written on the specified date', () => {
      diary.entry("Yo, it's the 10th!", new Date('10/10/10'));
      expect(diary.date('10/10/10')).toContain("Yo, it's the 10th!");
    })  
  })

  describe('.search', () => {
    it('Returns a list of entries containing the search term', () => {
      diary.entry('Cosmo');
      expect(diary.search('Cosmo')).toContain('Cosmo');
    })
  })

  describe('.save', () => {
    it('persists the current state of the diary to the given file', () => {
      let savedDiary;
      diary.save('./diary')
      savedDiary = fs.readFileSync('./diary.json');
      expect(JSON.stringify(JSON.parse(savedDiary))).toEqual(JSON.stringify(diary.entriesAndDates()));
    })
  })
})