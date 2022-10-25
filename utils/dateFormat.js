module.exports = {
    //Helper function to display time in specific format
    format_date: (date) => {
       let newDate = new Date(date).toDateString();
       let month = newDate.split(' ')[1];
       let day = newDate.split(' ')[2];
       let year = newDate.split(' ')[3];
       let time = new Date(date).toLocaleTimeString();
       return `${month} ${day}, ${year} at ${time}`;
      },
}