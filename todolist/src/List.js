import React, {Component} from 'react';
import './List.css'

class List extends Component {

    constructor(props) {
        super(props);
        this.addHandler = this.addHandler.bind(this);
        this.state = {items:[]};
    }

    addHandler() {
        var newContent = this.refs.content.value;
        if (newContent.length == 0) return;
        var oldList = this.state.items;
        var newList = oldList.concat([{
            id: oldList.length + 1, content: newContent, finished:false
        }]);

        this.setState({ items: newList.sort(this.cmp) })
        this.refs.content.value = ""
    }

    removeItem(index, e) {
        var items = this.state.items;
        items.splice(index, 1);
        this.setState({
            items: items
        });
    }

    cmp(item1, item2) {
        if (item1.finished && !item2.finished) {
            return 1;
        } else if (!item1.finished && item2.finished) {
            return -1;
        } return 0;
    }

    finishItem(index, e) {
        if (e) {
            e.preventDefault();
            this.state.items[index].finished = true; 
            this.state.items.sort(this.cmp);
            this.setState(this.state);
        }
    }

    render() {
        return (
            <div>
                <hr/>
                <div className="row" >
                    <div className="col-md-6 col-md-offset-3">
                        <div className="input-group">
                    <input type="text" ref="content" className='form-control input-lg'/><span className="input-group-addon btn btn-success button" onClick={this.addHandler}>添加</span>
                </div>
                    </div>
                </div>
                <div>          
                    <table className="table table-condense" width="20%" >
                        <caption>
                            <h3>
                                任务列表
                            </h3>
                        </caption>
                        <tbody>
                            {
                                this.state.items.map((item, index) => (<tr key={item.id} className={item.finished ? "finished" : "unfinished"}>
                                    <td className="idCol">{item.id}</td>
                                    <td className="contdentCol">{item.content}</td>
                                    <td className="stateCol">{item.finished ?
                                        <span>已完成</span> :
                                        <a href="#" onDoubleClick={e => this.finishItem(index, e)}>未完成</a>}</td>
                                    <td className="optionCol">
                                        <a href="#" onClick={e=>this.removeItem(index, e)}>
                                            删除
                                        </a>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default List