var entries = [];
const diary = {
  entry: (entry) => {
    entries.push(entry);
  },

  entries: () => {
    return entries;
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