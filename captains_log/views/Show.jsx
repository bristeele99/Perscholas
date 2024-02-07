const React = require('react')
class Show extends React.Component {
  render () {
   const log = this.props.log
   const createdAt= new Date(log.createdAt);
   const formattedDate = createdAt.toLocaleString().slice(0, 8);
    const formattedTime = createdAt.toLocaleString().slice(9, 14);
    return (
      <div>
      <h1> Show Page </h1>
        Title:{log.title}<br/>
        Entry:{log.entry}<br/>
        {log.shipIsBroken ? 'The ship is broken!' : 'It is ready for sailing!' }<br/>
        <p>Timestamp:{formattedDate}{formattedTime}</p><br/>
        <a href='/logs'>Back to Logs</a>
      </div>
      );
     }
   }
  module.exports  = Show;