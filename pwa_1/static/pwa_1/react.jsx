//import React from 'react';

class BlogContent extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.props.content}</div>
      </div>
    );
  }
}

const maincontent=<BlogContent title="Welcome" content="test blog" />;
ReactDOM.render(maincontent, document.getElementById('maincontent'));

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

  clickme() {
    maincontent.props = {
      title: this.props.title,
      content: this.props.content,
    }
  }
  render() {
    return (
      <li>
        <a href="#" onClick={this.clickme()}>{this.props.title}</a>
      </li>
    );
  }
}

class BlogSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: this.props.clicked
    };
  }
  items() {
    return [[1, "foo", "faa"], [2, "foo2","ullaiia"], [3, "geaafa", "ksskk2343"]].map(function(curval) {
      var key = curval[0];
      var title = curval[1];
      var content = curval[2];
      console.log(key + " " + title + " " + content);
      return (<BlogItem key={key} title={title} content={content} clicked={false} />);
    });
  }
  render() {
    return (
      <ul>{this.items()}</ul>
    );
  }
}

const sidebar=<BlogSidebar />
ReactDOM.render(sidebar, document.getElementById('sidebar'));


// export default BlogContent;
// export default BlogItems;
