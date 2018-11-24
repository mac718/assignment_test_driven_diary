describe('Diary', () => {
  describe('.entry', () => {
    it('adds a new entry to the diary', () => {
      class Diary {
        entry() {};
        entries() {};
      };
      let diary = new Diary();
      let entry = diary.entry('Hello');
      expect(diary.entries()).toContain(entry);
    })
  })
})