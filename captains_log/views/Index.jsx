const React = require('react');

class Index extends React.Component {
    render(){
        const { logs } = this.props;

        return(
            <div>
                <nav>
                    <a href="/logs/new">New Log</a><br/>
                </nav>
                <ul>
                    {logs.map((log,i) =>{
                    })};
                    return(
                        <li key={i}>
                        Title:{logs.title}<br/>
                        </li>
                    )
                    
                </ul>
            </div>
        )
    }
}