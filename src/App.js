import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { userName: '', message: '', totalMessages: [] };
  }

  handleUserNameChange(e) {
    this.setState({ userName: e.target.value });
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  handleSubmit(e) {
if(this.state.userName != '' && this.state.message != ''){
    var data = {userName: this.state.userName, message: this.state.message};

    fetch('http://localhost:8080/', {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body:JSON.stringify(data)
        })
        .then(()=>
        {
          var oldMessages = this.state.totalMessages;
          var newMessages = oldMessages.concat(data);
          this.setState({
            totalMessages:newMessages
          });
        }
      )
      .then(this.setState({
        userName:'',
        message:''
      }))
      .catch((error)=>{console.error('Fetch Error', error)});
      }
    }

    //   shouldComponentUpdate(){
    //     fetch('http://localhost:8080/', {headers:{
    //   "Content-Type": "application/json",
    //   'Accept': 'application/json'
    // }})
    // .then((result)=>{
    //   //console.log(result.json() + 'Test2');
    //   var res = JSON.stringify(result);
    // }).catch((err)=>{
    //   console.log(err);
    // })
    //     return true;
    //   }

      // handleSubmit(e){
    // var prevMessages = this.state.totalMessages;
    // if (this.state.userName != '' && this.state.message != '') {
    //   prevMessages.push({ userName: this.state.userName, message: this.state.message })
    //   this.setState({
    //     totalMessages: prevMessages
    //   }, function () {
        
    //     var data = {name: this.state.userName, message: this.state.message};

    //     fetch('http://localhost:8080/', {
    //     method:"POST",
    //     headers:{
    //       "Content-Type": "application/json",
    //       'Accept': 'application/json'
    //     },
    //     body:JSON.stringify(data)
    //     })
    //     .then((res)=>{res.json()})
    //     .catch((error)=>{console.error('Fetch Error', error)});
        
    //     this.setState({
    //       userName: '',
    //       message: ''
    //     })
    //   });
    // }
  // }

  componentDidMount(){
    fetch('http://localhost:8080/', {headers:{
      "Content-Type": "application/json",
      'Accept': 'application/json'
    }})
    .then((result)=>{
      var res = result.json();
      res.then((output)=>{
        var totalMessages = output.map(element => {
          return({
            userName: element.name,
            message: element.message
          });
        });
        this.setState({totalMessages:totalMessages});
      }).catch(function(err){
        console.log(err);
      })
    })
    .catch(function(err){
      console.log(err);
    });
  }

  render() {
    var count = 0;
    if (this.state.totalMessages.length > 0) {
      count = this.state.totalMessages.length;
    }

    var final;

    if (this.state.totalMessages.length > 0) {
      final = this.state.totalMessages.map((eachUser) => {
        return <div>
          <ul>
            <li>Name : {eachUser.userName}</li>
            <li>Message : {eachUser.message}</li>
          </ul>
        </div>
      })
    } else {
      final = <h4>No Messages to show... Have fun</h4>
    }



    return (
      <div>
        <div>
          <input type='text' placeholder='Please Enter User Name...' value={this.state.userName} onChange={this.handleUserNameChange} />
        </div>
        <div>
          <input type='text' placeholder='Please Enter your Message' value={this.state.message} onChange={this.handleMessageChange} />
        </div>
        <div>
          <input type='submit' onClick={this.handleSubmit} />
        </div>
        <div>
          <label>Total Messages Count is   {count}</label>
        </div>
        <div>
          {final}
        </div>
      </div>
    );
  }
}

export default App;