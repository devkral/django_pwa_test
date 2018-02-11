//import React from 'react';

class BlogContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.content,
    };
  }
  update_s(title, content) {
    return this.setState({
      title: title,
      content: content,
    })
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div>{this.state.content}</div>
      </div>
    );
  }
}

var maincontent = ReactDOM.render(<BlogContent title="" content="" />, document.getElementById('maincontent'));

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: this.props.clicked
    };
  }
  disabled() {
    if (this.state.clicked){
      return "disabled=disabled";
    } else {
      return "";
    }
  }
  render() {
    var title = this.props.title;
    var content = this.props.content;
    var update_content = function(event){
      event.preventDefault()
      maincontent.update_s(title, content);
    }
    return (
      <li>
        <a href="" onClick={update_content}>{title}</a>
      </li>
    );
  }
}

class BlogSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.update_items();
    if (this.state.items.length > 0){
      var item = this.state.items[0]
      maincontent.update_s(item[0], item[1]);
    }
  }

  _update_items() {

  }

  update_items() {

  }

  items() {
    return this.state.items.map(function(curval) {
      return (<BlogItem key={curval.id} title={curval.title} \
              content={curval.content} author={curval.author} />);
    });
  }
  render() {
    return (
      <ul>{this.items()}</ul>
    );
  }
}

var itemlist = ReactDOM.render(<BlogSidebar />, document.getElementById('sidebar'));


// export default BlogContent;
// export default BlogItems;
