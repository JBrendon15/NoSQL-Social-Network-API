module.exports = {
    format_date: (date) => {
       let newDate = new Date(date).toDateString();
       let month = newDate.split(' ')[1];
       let day = newDate.split(' ')[2];
       let year = newDate.split(' ')[3];
       let time = new Date(date).toLocaleTimeString();
       return `${month} ${day}, ${year} at ${time}`;
      },
}