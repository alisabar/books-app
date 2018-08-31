import React from 'react';
import {setDateTime, setDateTimeNormal, getCurrentDate} from '../date';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Book from './book';
import FormHelperText from '@material-ui/core/FormHelperText';


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
        width: '100%',
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
    this.repairInputString=this.repairInputString.bind(this);
    this.repairAuthorName=this.repairAuthorName.bind(this);
    this.repairBookTitle=this.repairBookTitle.bind(this);
    this.replaceInvalid=this.replaceInvalid.bind(this);
    this.setNewValues=this.setNewValues.bind(this);
    this.dontSaveChanges=this.dontSaveChanges.bind(this);
    this.handleCloseExistingBookModal=this.handleCloseExistingBookModal.bind(this);
    this.handleCloseError=this.handleCloseError.bind(this);
    this.handleCloseEdit=this.handleCloseEdit.bind(this);
    this.addNewBook = this.addNewBook.bind(this);
    this.editBook=this.editBook.bind(this);
    this.setBooksValues = this.props.setBooksValues;
    this.editBookValues=this.props.editBookValues;
    this.editBooksValues=this.props.editBooksValues;
    this.setPublishedDate=this.props.setPublishedDate;
    this.setBookTitle=this.props.setBookTitle;


        this.state = {

            open:this.props.open,
            authorName:this.props.authorName ? this.props.authorName:'' ,
            bookTitle:this.props.bookTitle ? this.props.bookTitle:'',
            publishedDate:this.props.publishedDate ? this.props.publishedDate : getCurrentDate(),
            bookList:this.props.bookList ? this.props.bookList:'',
            validAuthorName:true,
            validBookTitle:true,
            validPublishedDate:true,
            feedback:false,
            feedBackDelete:false,
            existingBook:false,
        };
    }
    // componentWillMount(){
    //     this.setState({authorName:this.props.authorName ? this.props.authorName:'',
    //      bookTitle:this.props.bookTitle ? this.props.bookTitle: '',
    //      publishedDate:this.props.publishedDate ? this.props.publishedDate :getCurrentDate()});
    //
    //
    // }
    editBook=(e)=>{
        e.preventDefault();
        if(this.state.authorName.length===0 || this.state.bookTitle.length===0){
            this.setState({validAuthorName:false, validBookTitle:false});
        }
        else{
            if (this.state.validAuthorName && this.state.validBookTitle) {
                const newAuthorName=this.repairInputString(this.state.authorName,false);
                const newBookTitle=this.repairInputString(this.state.bookTitle,false);
                this.setState({authorName:newAuthorName , bookTitle:newBookTitle},()=>{
                   if (this.editBooksValues) {
                      this.editBooksValues({
                          authorName:this.state.authorName,
                          publishedDate:this.state.publishedDate,
                          bookTitle:this.state.bookTitle,
                      });
                   }
                });

                this.handleCloseEdit();

            }
        }

    };
    addNewBook=(authorName ,bookTitle)=>{
        console.log('this.state.bookList: ',this.state.bookList);
        let books=this.props.bookList ? this.props.bookList: '' ;
        const newTitle=bookTitle;
        const oldBook=books.filter(book=>book.key===newTitle);
        console.log('oldBook: ', oldBook);
        if(oldBook.length>0){
            if(oldBook[0].key===newTitle){
                console.log('oldBook[0]: ', oldBook[0]);
                console.log('oldBook[0].key: ', oldBook[0].key);

                this.setState({existingBook:true, feedback:false});
            }

            this.handleCloseError();
        }

        else {
            books.push(<div key={bookTitle ? bookTitle : ''} className="col-sm-12 col-md-6 col-lg-4">
                <Book
                    key={bookTitle ? bookTitle : ''}
                    bookId={this.state.bookList.length}
                    authorName={authorName ? authorName : ''}
                    publishedDate={this.state.publishedDate ? this.state.publishedDate: ''}
                    bookTitle={bookTitle ? bookTitle : ''}
                    deleted={m => {
                        this.deleteBook(m.bookId);
                    }}

                />
            </div>);

            this.setState({bookList: books},()=>{ if (this.setBooksValues) {
              this.setBooksValues({
                books:this.state.bookList ? this.state.bookList :''
              });
            }});
            this.handleClose();
        }
    };

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
    handleCloseError=()=>{

            this.setState({ open: false, feedback:false });

    };
    handleClose = () => {

            this.setState({ open: false, feedback:true });
            this.props.close();

    };
    handleCloseExistingBookModal=()=>{
          this.setState({existingBook: false });
          this.setState({feedback:false});
    };
    handleCloseEdit=()=>{
         this.setState({open: false, feedback:true,});
         this.props.close();
    };

  replaceInvalid=(words)=>{
    console.log("in replaceInvalid.");
    console.log("words: ",words);
    const validSentence=words.toString().replace(/[^a-zA-Z ]/g, '');
    console.log("validSentence: ",validSentence);
    return validSentence;

  };
  repairAuthorName=(event)=>{
    event.preventDefault();
    const areThereInvalidSignes=this.state.validAuthorName;
    const str=this.state.authorName ? this.state.authorName:'';
    if(str.length==0){
        this.setState({validAuthorName:false});
    }
    else {
        const newAuthor = this.repairInputString(str, areThereInvalidSignes);
        this.setState({authorName: newAuthor, validAuthorName: true});
    }

  };
  repairBookTitle=(event)=>{
    event.preventDefault();
    const areThereInvalidSignes=this.state.validBookTitle;
    const str=this.state.bookTitle ? this.state.bookTitle:'';
    if(str.length==0){
        this.setState({validBookTitle:false});
    }
    else{
            const newAuthor=this.repairInputString(str,areThereInvalidSignes);
            this.setState({bookTitle:newAuthor,validBookTitle:true});
    }
  };

    validateString=(str)=>{
      const validRegEx = /^[^\\\/&@$!%#^*]*$/|/^$|\s+/;
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
      this.setState({publishedDate:setDateTime(newDate)});
    };
    dontSaveChanges=(e)=>{
        e.preventDefault();
        this.setState({ open: false, feedback:false });

            this.props.close();


    };
    setNewValues=(e)=>{
        e.preventDefault();
        if(this.state.authorName.length===0 || this.state.bookTitle.length===0){
            this.setState({validAuthorName:false, validBookTitle:false});
        }
        else{
            if (this.state.validAuthorName && this.state.validBookTitle) {
                const newAuthorName=this.repairInputString(this.state.authorName,false);
                const newBookTitle=this.repairInputString(this.state.bookTitle,false);
                this.setState({authorName:newAuthorName , bookTitle:newBookTitle});

                if(this.setBooksValues){
                    this.addNewBook(newAuthorName,newBookTitle);
                }

            }



        }

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
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <TextField
                              id="author"
                              label="Author Name"
                              className={classes.textField}
                              value={this.state.authorName ? this.state.authorName : ''}
                              onChange={this.validateAuthorName}
                              margin="normal"
                            />
                            <FormHelperText>{this.state.validAuthorName || !this.state.authorName.length===0 ? '':'Error. Wrong or empty input.'}</FormHelperText>
                        </div>
                         <div className="col-sm-12 col-md-4 col-lg-4" className={classes.repairButton}>
                            <Button color="primary"  disabled={this.state.validAuthorName ? true : false} onClick={(event)=>this.repairAuthorName(event)}>
                                Repair Input
                            </Button>
                         </div>
                     </div>
                     <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8">
                            <TextField
                              id="name"
                              label="Book Title"
                              className={classes.textField}
                              value={this.state.bookTitle ? this.state.bookTitle : ''}
                              onChange={this.validateBookTitle}
                              margin="normal"
                            />
                             <FormHelperText>{this.state.validBookTitle || !this.state.bookTitle.length===0  ? '':'Error. Wrong or empty input.'}</FormHelperText>
                         </div>
                         <div className="col-sm-12 col-md-4 col-lg-4" className={classes.repairButton}>
                             <Button color="primary"  disabled={this.state.validBookTitle ? true : false} onClick={(event)=>this.repairBookTitle(event)}>
                                Repair Input
                             </Button>
                         </div>
                     </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-8 col-lg-8" >
                            <TextField
                              id="date"
                              label="Publication Date(mm-dd-yyyy)"
                              type="date"
                              className={classes.textField}
                              defaultValue={this.state.publishedDate ? this.state.publishedDate : getCurrentDate()}
                              onChange={this.validatePublishedDate}
                              margin="normal"
                            />
                        </div>
                      </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <Button
                                color="primary"
                                disabled={this.state.validAuthorName && this.state.validBookTitle ? false : true}
                                onClick={this.setBooksValues? (event)=>this.setNewValues(event) : (event)=>this.editBook(event) }
                            >
                                apply
                            </Button>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <Button
                                color="secondary"
                                onClick={(event)=>this.dontSaveChanges(event)}
                            >
                                cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.feedback && !this.state.existingBook}
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
                                {this.state.authorName }
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
                                {this.state.bookTitle }
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
                                {setDateTimeNormal(this.state.publishedDate)}
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
              <Modal
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.existingBook}
                onClose={this.handleCloseExistingBookModal}
              >
                <div className={classes.modalFeedBack}>
                     <Typography  className={classes.feedbackMessage}>
                          Error! Book already exists!
                     </Typography>
                     <br/>
                     <Button
                        className={classes.buttonFeedBack}
                        color="secondary"
                        onClick={this.handleCloseExistingBookModal}
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