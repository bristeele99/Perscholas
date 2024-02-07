const React = require('react');

class Edit extends React.Component {
    render() {
        return (
            <form action ={`/logs/${this.props.log._id}?_method=PUT`} method="POST">
                Title:<input type='text'name="title" defaultValue={this.props.log.title}/><br/>
                Entry:<textarea name="entry" defaultValue={this.props.log.entry}></textarea><br/>
                Ship Is Broken: <input type="checkbox" name="shipIsBroken" defaultChecked={this.props.log.shipIsBroken}/><br/>
                <a href='/logs'>Back to Logs</a><br/>
                <input type="submit" value="Edit Log"/>
            </form>
        )
    }
}

module.exports = Edit;