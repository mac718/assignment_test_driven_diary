const dateAndTime = require('date-and-time');
const fs = require('fs');

var entries = [];
const diary = {
  entry: (entry, date = '') => {
    entries.push({'entry': entry, 'date': date});
  },

  entriesAndDates: () => {
    return entries;
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
    console.log(dateAndTime.format(now, 'ddd MMM DD YYYY')); 
    return taggedEntries;
  },

  today: () => {
    let todaysEntries = [];
    entries.forEach(entry => {
      let now = new Date();
      let formattedDate = dateAndTime.format(now, 'ddd MMM DD YYYY');
      if(entry['date'] == formattedDate){
        todaysEntries.push(entry['entry']);
      }
    })
    return todaysEntries;
  }, 

  date: (date) => {
    let entriesOnDate = []
    entries.forEach(entry => {
      if(entry['date'] != ''){
        entry['date'] = new Date(entry['date']);   
        date = new Date(date);
        if(dateAndTime.format(date, 'ddd MMM DD YYYY') == dateAndTime.format(entry['date'], 'ddd MMM DD YYYY')){
          entriesOnDate.push(entry['entry']);
        }
      }
    })
    return entriesOnDate;
  },

  search: (term) => {
    let results = [];
    entries.forEach(entry => {
      let splitEntry = entry['entry'].split(' ');
      let mappedEntry = splitEntry.map( word => {
        return /[a-zA-Z']*/.exec(word)[0];
      })
      if(mappedEntry.includes(term)) {
        results.push(entry['entry']);
      }
    })
    return results;
  },

  save: (file) => {
    console.log(diary.entriesAndDates());
    fs.writeFileSync('./diary.json', JSON.stringify(diary.entriesAndDates()));
  }
}

module.exports = diary;