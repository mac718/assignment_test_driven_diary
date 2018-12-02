const date = require('date-and-time');

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
    let now = new Date();
    console.log(date.format(now, 'ddd MMM DD YYYY')); 
    return taggedEntries;
  },

  today: () => {
    let todaysEntries = [];
    entries.forEach(entry => {
      let now = new Date();
      let formattedDate = date.format(now, 'ddd MMM DD YYYY');
      if(entry['date'] == formattedDate){
        todaysEntries.push(entry['entry']);
      }
    })
    return todaysEntries;
  }
}

module.exports = diary;