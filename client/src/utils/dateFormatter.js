const dateFormatter = date => {
    if(!date) return
    let d = new Date(date.replace(/-/g, '\/').replace(/T.+/, ''));
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${ye}-${mo}-${da}`;
  };
  
  export default dateFormatter;
