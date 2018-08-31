import React from 'react';
import axios from 'axios';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Header from './header';
import MyModal from './modal';
import Book from './book';
import '../App.css';
import {withStyles} from "@material-ui/core/styles/index";
import {setDateTime} from "../date";


const styles = theme => ({
       buttonFeedBack:{
        marginLeft: '40%',
    },
    modalFeedBack:{
        position: 'absolute',
        left:'25%',
        width:'50%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    modal:{
         zIndex:'2',
    },
  card: {
      marginTop:'1%',
      backgroundColor:'#FFCCBC',
  },

    feedbackMessage:{
         marginLeft:'2%',
    },

});


    class Books extends React.Component {
       constructor(props) {
           super(props);

           this.createData = this.createData.bind(this);
           this.deleteBook = this.deleteBook.bind(this);
           this.handleOpen = this.handleOpen.bind(this);
           this.handleClose = this.handleClose.bind(this);
           this.handleCloseFeedbackDelete = this.handleCloseFeedbackDelete.bind(this);
           this.updateList=this.updateList.bind(this);
           //this.handleCloseExistingBookModal=this.handleCloseExistingBookModal.bind(this);
           this.state = {
               open: false,
               feedBackDelete:false,
               booksList: '',
               booksAfterDelete: '',
               bookWasDeleted: false,
            //   existingBook:false,
           };
       }

        handleOpen = () => {
             this.setState({ open: true });
        };

        handleClose = () => {
             this.setState({ open: false });
        };
        handleCloseFeedbackDelete=()=>{
             this.setState({ feedBackDelete: false });
        };
        // handleCloseExistingBookModal=()=>{
        //       this.setState({ existingBook: false });
        // };
        componentWillMount(){

           axios.get(`https://www.googleapis.com/books/v1/volumes?q=cat&filter=paid-ebooks&startIndex=0&maxResults=26`)
          .then(res => {
            const books = res.data;

            //console.log(books.items.length);
            //console.log(JSON.stringify(books.items));
            this.createData(books.items);
          });
        }

         createData=(books) => {
          const newBooks=books.map((book,index)=>
              <div key={book.volumeInfo.title} className="col-sm-12 col-md-6 col-lg-4">
                <Book
                  key={book.volumeInfo.title}
                  bookId={index}
                  authorName={book.volumeInfo.authors}
                  publishedDate={book.volumeInfo.publishedDate}
                  bookTitle={book.volumeInfo.title}
                  bookImage={book.volumeInfo.imageLinks.thumbnail}
                  deleted={o => {
                      this.deleteBook(o.bookId);
                    }}
                />

              </div>
           );

         this.setState({booksList:newBooks});
        };

        deleteBook=(id)=>{
            var listBeforeDelete=this.state.booksList;
            listBeforeDelete[id]=null;
            this.setState({bookWasDeleted:true, booksAfterDelete:listBeforeDelete});
            this.setState({feedBackDelete:true});
        };

        updateList=(o)=>{
            const books=o.books;
            this.setState({booksList:books});
        };

        render() {
           const { classes } = this.props;
          return (
              <div>
                  <div>
                      <Header ></Header>
                  </div>
                  <div className="container">
                      <Card className={classes.card}>
                          <CardActions>
                                 <Button variant="fab" color="primary" mini aria-label="Add"  onClick={this.handleOpen}><AddIcon/></Button>
                          </CardActions>
                            <CardContent>
                                  <div className="row">
                                      {this.state.bookWasDeleted ? this.state.booksAfterDelete? this.state.booksAfterDelete: ''  :this.state.booksList ? this.state.booksList:''}
                                  </div>
                            </CardContent>
                      </Card>
                  </div>

                  <MyModal
                       open={this.state.open}
                       close={()=> this.handleClose()}
                       bookList={this.state.booksList ? this.state.booksList : ''}
                       authorName={''}
                       publishedDate={''}
                       bookTitle={''}
                       setBooksValues={(o)=>this.updateList(o)}
                  >
                  </MyModal>
                  {/*<Modal*/}
                        {/*className={classes.modal}*/}
                        {/*aria-labelledby="simple-modal-title"*/}
                        {/*aria-describedby="simple-modal-description"*/}
                        {/*open={this.state.existingBook}*/}
                        {/*onClose={this.handleCloseExistingBookModal}*/}
                  {/*>*/}
                        {/*<div className={classes.modalFeedBack}>*/}
                             {/*<Typography  className={classes.feedbackMessage}>*/}
                                  {/*Error! Book already exists!*/}
                             {/*</Typography>*/}
                             {/*<br/>*/}
                             {/*<Button*/}
                                {/*className={classes.buttonFeedBack}*/}
                                {/*color="secondary"*/}
                                {/*onClick={this.handleCloseExistingBookModal}*/}
                              {/*>*/}
                              {/*OK*/}
                              {/*</Button>*/}
                          {/*</div>*/}
                  {/*</Modal>*/}
                  <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.feedBackDelete}
                        onClose={this.handleCloseFeedbackDelete}
                  >
                         <div className={classes.modalFeedBack}>
                             <Typography  className={classes.feedbackMessage}>
                                  Book was deleted successfully!
                             </Typography>
                             <br/>
                             <Button
                                className={classes.buttonFeedBack}
                                color="secondary"
                                onClick={this.handleCloseFeedbackDelete}
                              >
                              OK
                              </Button>
                          </div>
                  </Modal>
              </div>
          );
        };

    }
Books.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Books);

