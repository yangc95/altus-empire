import React from 'react';
import DispensaryEntry from './dispensary_entry';

class DispensaryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dispensaries: props.dispensaries
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.dispensaries !== this.props.dispensaries) {
            this.setState({
                dispensaries: this.props.dispensaries
            })
        }
    }

    render() {
        const {dispensaries} = this.state;
        const items = dispensaries.map(dispensary => <DispensaryEntry dispensary={dispensary}/>)
        return (
            <div className="dispensary-list">
                {items}
            </div>
        )
    }
}

export default DispensaryList;