import React from 'react';
import DispensaryEntry from './dispensary_entry';
import '../../styles/dispensary_list.css';


class DispensaryList extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dispensaries: props.dispensaries
        }

        this.deepDup = this.deepDup.bind(this)
    }

    deepDup(arr){
        return arr.map(el => el instanceof Array ? this.deepDup(el) : el)
    }

    componentDidUpdate(prevProps) {
        this._isMounted = true;
        debugger;
        if ( ( prevProps.dispensaries !== this.props.dispensaries) 
            && (JSON.stringify(prevProps.dispensaries) === JSON.stringify(this.props.dispensaries)) 
            && (this.props.dispensaries.length !== 1) ) {
            if (this.props.searchKeyword !== "") {
                return this.props.fetchSearchByNameDispensary(this.props.searchKeyword)
                    .then(() => {
                        if(this._isMounted) {
                            const dispensaryClone = this.deepDup(this.props.dispensaries)
                            this.setState({
                                dispensaries: this.props.dispensaries
                            })
                        }
                    })
            } else {
                this.setState({
                    dispensaries: this.props.dispensaries
                }, this.props.fetchDispensaries);
            }
            this.setState({
                dispensaries: this.props.dispensaries
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        
        const {dispensaries} = this.props;
        const items = dispensaries.length ? 
                    dispensaries.map(dispensary => <DispensaryEntry key={dispensary._id} dispensary={dispensary} />)
            : <div className="dispensary-entry-container">
                No Results
                </div>;
        return (
            <div className="dispensary-list">
                {items}
            </div>
        )
    }
}

export default DispensaryList;