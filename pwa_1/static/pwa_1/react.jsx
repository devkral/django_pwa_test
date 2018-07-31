//import React from 'react';

class BlogContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      author: "",
      author_email: "",
      title: "",
      content: "",
      editlevel: 0
    };
  }
  update_s(item) {
    return this.setState({
      id: item.id,
      author: item.author,
      author_email: item.author_email,
      title: item.title,
      content: item.content,
      editlevel: 0
    })
  }

  render_title_field(){
    if (this.state.editlevel==0){
      return (
        <div>{this.state.title}</div>
      )
    } else {
      return (
        <input type="text" value={this.state.title}/>
      )
    }
  }

  render_content_field(){
    if (this.state.editlevel==0){
      return (
        <div>{this.state.content}</div>
      )
    } else {
      return (
        <textarea defaultValue={this.state.content}/>
      )
    }
  }

  render_update_button(){
    if (this.state.id==-1){
      return ""
    }
    return (
      <button>
        update
      </button>
    )
  }
  render_delete_button(){
    if (this.state.id==-1){
      return ""
    }
    return (
      <button>
        update
      </button>
    )
  }

  render() {
    return (
      <div>
        <h1>{this.render_title_field()}</h1>
        <div>{this.render_content_field()}</div>
        <div>
          <div>
            <button>+</button>
            {this.render_update_button()}
            {this.render_delete_button()}
          </div>
          <span>by: {this.state.author} </span>
        </div>
      </div>
    );
  }
}
var maincontent = ReactDOM.render(<BlogContent />, document.getElementById('maincontent'));

class BlogItem extends React.Component {
  render() {
    var item = this.props.item;
    var update_content = function(event){
      event.preventDefault()
      itemlist.setState({selected: item.id});
      maincontent.update_s(item);
    }
    return (
      <a href="" onClick={update_content}>{item.title}</a>
    );
  }
}

class BlogSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selected: -1
    };
    Promise.resolve(this.fetch_items());
    if (this.state.items.length > 0){
      var item = this.state.items[0]
      this.setState({selected: item.id});
      maincontent.update_s(item);
    }
  }

  fetch_items() {
    return pwa.fetch([{"pwa_1.BlogPost": {}}], "blogposts", true).then(function(response){
      return response.json().then(function (data) {
        itemlist.setState({items: data[0]});
      }, function(data){return Promise.reject("Error parsing");});
    }, function(response){return Promise.reject("Error retrieving");})
  }

  items() {
    return this.state.items.map(function(curval) {
      return (<BlogItem key={curval.id} item={curval} sidebar={this} />);
    });
  }
  render() {
    return (
      <div>
        {this.items()}
      </div>
    );
  }
}

var itemlist = ReactDOM.render(<BlogSidebar />, document.getElementById('sidebar'));


// export default BlogContent;
// export default BlogItems;
