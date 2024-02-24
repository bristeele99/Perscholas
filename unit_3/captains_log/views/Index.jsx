const React = require('react');

class Index extends React.Component {
  render() {
    const { logs } = this.props;

    return (
      <div>
        <nav>
          <a href="/logs/new">Add Log</a><br/>
          <a href="/logs">All Logs</a>
        </nav>
        <ul>
          {logs.map((log, i) => {
            const createdAt = new Date(log.createdAt);
            // console.log(log.createdAt)
            const formattedDate = createdAt.toLocaleString().slice(0, 8);
            const formattedTime = createdAt.toLocaleString().slice(9, 14);

            return (
              <li key={i}>
                Title: {log.title}<br />
                Entry: {log.entry}<br />
                Ship Is Broken: {log.shipIsBroken ? 'Yes' : 'No'}<br />
                <a href={`/logs/${log._id}`}>Log Details</a>
                <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                <input type="hidden" name="_method" value="DELETE" />
                    <input type="submit" value="DELETE"/>
                </form>
                <p>Created At: {formattedDate} {formattedTime}</p><br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
