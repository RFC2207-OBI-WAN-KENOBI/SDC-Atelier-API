import React from "react";
import ReactDOM from "react-dom";
import AnswerReport from './AnswerReport.jsx';
class AnswerComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerList: this.props.answerList,
      answerArr: [],
      nameSeller: false,
      reported: false,
      currentAns: {}

    }
    this.formatDate = this.formatDate.bind(this);
    this.checkName = this.checkName.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sortByHelp = this.sortByHelp.bind(this);
  }


  formatDate(dateStr){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString([],options);
  }

  checkName(nameStr) {
    if (nameStr === 'Seller') {
      this.state.nameSeller = true;
    }
    return nameStr;
  }

  handleClick(ans, e) {
    var currentArr = this.state.answerArr;
    var index = currentArr.indexOf(ans);
    var tempObj = ans;
    tempObj.helpfulness+=1;
    currentArr.splice(index, 1, tempObj);
    this.setState({answerArr: currentArr});
    this.sortByHelp();
  }


  sortByHelp() {
    var aList = this.state.answerList;
    var key = Object.keys(this.state.answerList);
    var arr = [];
    //populate an array of answer objects at specific key
  for (var i = 0; i < key.length; i++) {
    arr.push(aList[key[i]]);
  }
  //console.log(arr);
  //if array length is greater than one meaning there is more than one asnwer
  if (arr.length > 1) {
  //compare the helpfullness of each answer and sort it greatest first to lowest last
    for (var i = 0; i < arr.length; i++) {
      if (arr[i+1]) {
        if(arr[i].helpfulness < arr[i+1].helpfulness) {
          var temp = arr[i];
          arr[i] = arr[i+1];
          arr[i+1] = temp;
        }
      }
    }
    this.setState({answerArr: arr});
  }
  this.setState({answerArr: arr});
  }

  componentDidMount() {
    this.sortByHelp();
  }




  render() {


    return(

      <div id='AComp'>
      {this.state.answerArr.map((ans) =>
      <div id="AWrapper">
        <div style={{display:'none'}}>{this.checkName(ans.answerer_name)}</div>
        <h1 id='ALetter'>A: </h1><p id="Abody">{ans.body}</p>
          <span>By:</span><span style={this.state.nameSeller ? {fontWeight: 'bold'} : {}}> {ans.answerer_name},</span>
          <span> {this.formatDate(ans.date)}</span>
          <span> | Helpful? <button onClick={(e) => this.handleClick(ans, e)}>Yes? </button> ({ans.helpfulness})</span>
          <span> | <AnswerReport ansObj={ans}/></span>
      </div>
      )}
      </div>
    )
  }




}

export default AnswerComp;

