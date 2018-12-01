var entries = [];
const diary = {
  entry: (entry, date = '') => {
    entries.push({'entry': entry, 'date': date});
  },

  entries: () => {
    let entriesContent = [];
    entries.forEach(entry => {
      entriesContent.push(entry['entry']);
    });
    console.log(entriesContent);
    return entriesContent;
  }, 

  tags: () =>{
    let tags = [];
    diary.entries().forEach(entry => {
      let pattern = /#\w*/
      if(pattern.exec(entry)){
        tags.push(pattern.exec(entry)[0].slice(1));
      }
    })
    return tags;
  },

  entriesWithTag: (targetTag) => {
    let taggedEntries = [];
    diary.entries().forEach(entry => {
      let pattern = /#\w*/
      if(pattern.exec(entry)){
        let tags = pattern.exec(entry);
        tags.forEach(tag => {
          if(tag.slice(1) == targetTag) {
            taggedEntries.push(entry);
          }
        })
      }
    })
    return taggedEntries;
  }
}

module.exports = diary;