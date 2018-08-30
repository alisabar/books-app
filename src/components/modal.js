import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

const dateFormat = require('dateformat');

const styles = theme => ({
     paper: {
        position: 'absolute',
        left:'25%',
        width:'50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
     },
    modalFeedBack:{
        position: 'absolute',
        left:'25%',
        width:'50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: 200,
    },
    feedbackMessage:{
         marginLeft:'2%',
    },
    repairButton:{
      marginTop:'7%',
    },
    buttonFeedBack:{
        marginLeft: '40%',
    }
});

class MyModal extends React.Component {
    constructor(props) {

        super(props);

    this.handleClose=this.handleClose.bind(this);
    this.handleCloseFidBack=this.handleCloseFidBack.bind(this);
    this.validateString=this.validateString.bind(this);
    this.validateAuthorName=this.validateAuthorName.bind(this);
    this.validateBookTitle=this.validateBookTitle.bind(this);
    this.validatePublishedDate=this.validatePublishedDate.bind(this);
    this.setDateTime=this.setDateTime.bind(this);
    this.repairInputString=this.repairInputString.bind(this);
    this.repairAuthorName=this.repairAuthorName.bind(this);
    this.repairBookTitle=this.repairBookTitle.bind(this);
    this.replaceInvalid=this.replaceInvalid.bind(this);
    this.setNewValues=this.setNewValues.bind(this);
    this.setBooksValues = this.props.setBooksValues;
    this.setAuthorName = this.props.setAuthorName;
    this.setPublishedDate=this.props.setPublishedDate;
    this.setBookTitle=this.props.setBookTitle;

        this.state = {

            open:this.props.open,
            authorName:this.props.authorName ? this.props.authorName:'' ,
            bookTitle:this.props.bookTitle ? this.props.bookTitle: '',
            publishedDate:this.props.publishedDate ? this.props.publishedDate :'',
            validAuthorName:true,
            validBookTitle:true,
            validPublishedDate:true,
            feedback:false,
            feedBackDelete:false,
        };
    }
    repairInputString=(str,invalidSigns)=> {
    let validSentence="";
     if(!invalidSigns) {
           validSentence=this.replaceInvalid(str);
     }
     console.log("validSentence: ",validSentence);
     const words= validSentence.split(" ");
     let newAuthorName="";
     const wordsWithUpperCase= words.map(word=>{
        console.log("word:",word);
        const wordWithoutFirstLetter = word.slice(1);
        console.log("wordWithoutFirstLetter:",wordWithoutFirstLetter);
        const firstLetter=word.charAt(0);
        console.log("firstLetter:",firstLetter);
        const upperCaseFirstLetter=firstLetter.toUpperCase();
        console.log("upperCaseFirstLetter:",upperCaseFirstLetter);
        const newWord=upperCaseFirstLetter.concat(wordWithoutFirstLetter);
        console.log("newWord:",newWord);
        newAuthorName=newAuthorName.concat(" ",newWord);
    });
     newAuthorName=newAuthorName.trim();
     return newAuthorName;

  };

    handleCloseFidBack=()=>{
          this.setState({ feedback: false });
    };

    handleClose = () => {
        this.setState({ open: false, feedback:true });
        this.props.close();

    };


  replaceInvalid=(words)=>{
    console.log("in replaceInvalid.");
    console.log("words: ",words);
    const validSentence=words.replace(/[^a-zA-Z ]/g, '');
    console.log("validSentence: ",validSentence);
    return validSentence;

  };
  repairAuthorName=(event)=>{
    event.preventDefault();
    const areThereInvalidSignes=this.state.validAuthorName;
    const str=this.state.authorName ? this.state.authorName:'';
    const newAuthor=this.repairInputString(str,areThereInvalidSignes);
    this.setState({authorName:newAuthor,validAuthorName:true});
     if(this.setAuthorName){
      this.setAuthorName({authorName:newAuthor});
    }

  };
  repairBookTitle=(event)=>{
    event.preventDefault();
    const areThereInvalidSignes=this.state.validBookTitle;
    const str=this.state.bookTitle ? this.state.bookTitle:'';
    const newAuthor=this.repairInputString(str,areThereInvalidSignes);
    this.setState({bookTitle:newAuthor,validBookTitle:true});

  };
  setDateTime(itemDate) {
    const date = new Date(itemDate);
    const formateDate = dateFormat(date,"shortDate");
    return formateDate;
  }

    validateString=(str)=>{
      const validRegEx = /^[^\\\/&@$!%#^*]*$/;
      return str.match(validRegEx);
    };

    validateAuthorName=event=>{

        const str= event.target.value;
        this.setState({authorName:str});
       const isValidName=this.validateString(str);
       this.setState({validAuthorName:isValidName});
    };

    validateBookTitle=event=>{
       const str= event.target.value;
       this.setState({bookTitle:str});
       const isValidTitle=this.validateString(str);
       this.setState({validBookTitle:isValidTitle});
    };

    validatePublishedDate=(event)=> {
      const newDate=event.target.value;
      this.setState({publishedDate:this.setDateTime(newDate)});
    };

    setNewValues=(e)=>{
        e.preventDefault();
        if (this.state.validAuthorName && this.state.validBookTitle && this.setBooksValues) {
            const newAuthorName=this.repairInputString(this.state.authorName,false);
            const newBookTitle=this.repairInputString(this.state.bookTitle,false);
            this.setState({authorName:newAuthorName , bookTitle:newBookTitle});

          this.setBooksValues({
              authorName: newAuthorName ? newAuthorName : '',
              bookTitle: newBookTitle ? newBookTitle : '',
              publishedDate: this.state.publishedDate ? this.state.publishedDate:'',
          });
        }
        this.handleClose();
   };
    render(){
        const { classes } = this.props;
        return(
            <div className="container">
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.props.open}
              onClose={this.handleClose}
            >
                <div  className={classes.paper}>
                     <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <TextField
                              id="author"
                              label="Author Name"
                              className={classes.textField}
                              value={this.state.authorName ? this.state.authorName : ''}
                              onChange={this.validateAuthorName}
                              margin="normal"
                            />
                            <FormHelperText>{this.state.validAuthorName ? '':'Error. Wrong input.'}</FormHelperText>
                        </div>
                         <div className="col-sm-12 col-md-6 col-lg-6" className={classes.repairButton}>
                            <Button color="primary"  disabled={this.state.validAuthorName ? true : false} onClick={(event)=>this.repairAuthorName(event)}>
                                Repair Input
                            </Button>
                         </div>
                     </div>
                     <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <TextField
                              id="name"
                              label="Book Title"
                              className={classes.textField}
                              value={this.state.bookTitle ? this.state.bookTitle : ''}
                              onChange={this.validateBookTitle}
                              margin="normal"
                            />
                             <FormHelperText>{this.state.validBookTitle ? '':'Error. Wromg input.'}</FormHelperText>
                         </div>
                         <div className="col-sm-12 col-md-6 col-lg-6" className={classes.repairButton}>
                             <Button color="primary"  disabled={this.state.validBookTitle ? true : false} onClick={(event)=>this.repairBookTitle(event)}>
                                Repair Input
                             </Button>
                         </div>
                     </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <TextField
                              id="date"
                              label="Publication Date"
                              type="date"
                              className={classes.textField}
                              defaultValue={this.state.publishedDate ? this.state.publishedDate : ''}
                              onChange={this.validatePublishedDate}
                              margin="normal"
                            />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <Button
                                color="primary"
                                disabled={this.state.validAuthorName && this.state.validBookTitle ? false : true}
                                onClick={(event)=>this.setNewValues(event)}
                            >
                                apply
                            </Button>
                        </div>
                       </div>
                </div>
            </Modal>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.feedback}
              onClose={this.handleCloseFidBack}
            >
                <div className={classes.modalFeedBack}>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <Typography color="primary" className={classes.feedbackMessage}>
                                The book was successfully edited!
                            </Typography>
                        </div>
                    </div>
                        <br/>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <Typography  className={classes.feedbackMessage}>
                                <b>New Author Name:</b>
                            </Typography>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-8">
                            <Typography  className={classes.feedbackMessage}>
                                {this.state.authorName? this.state.authorName :'' }
                            </Typography>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <Typography  className={classes.feedbackMessage}>
                                <b>New Book Title:</b>
                            </Typography>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-8">
                            <Typography  className={classes.feedbackMessage}>
                                {this.state.bookTitle? this.state.bookTitle :'' }
                            </Typography>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <Typography  className={classes.feedbackMessage}>
                                <b>New Date:</b>
                            </Typography>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-8">
                            <Typography  className={classes.feedbackMessage}>
                                {this.state.publishedDate? this.state.publishedDate :'' }
                            </Typography>
                        </div>
                    </div>
                    <br/>
                    <Button
                        className={classes.buttonFeedBack}
                        color="secondary"
                        onClick={this.handleCloseFidBack}
                    >
                    OK
                    </Button>

                </div>
            </Modal>
            </div>
        )
    }
}
MyModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MyModal);