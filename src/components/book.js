import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MyModal from './modal';
import '../App.css';
const dateFormat = require('dateformat');

const styles = theme => ({
  media: {
    height: 100,
  },
  card: {
    backgroundColor: theme.secondary,
    boxShadow: theme.shadows[5],
    marginTop:'10%',
    width:'100%',
    padding: '5%',
      minHeight:370,
      // maxHeight: 351,
      // overflow: 'auto'
  },

  title: {
    textAlign: 'left',
    marginLeft:0,
    fontSize: 14,
  },
  blackTitle:{
      color:"#212121",
  },
});

class Book extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpen=this.handleOpen.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.setDateTime=this.setDateTime.bind(this);
    this.deleteMe=this.deleteMe.bind(this);
    this.setBookValues=this.setBookValues.bind(this);
    this.cutLongString=this.cutLongString.bind(this);
    this.toggleHover=this.toggleHover.bind(this);

    this.deleted = this.props.deleted;


    this.state = {

        id: this.props
        ? this.props.bookId
        : 0,
        authorName: this.props
        ? this.props.authorName
        : '',
         publishedDate: this.props
        ? this.props.publishedDate
        : '',
        bookTitle: this.props
        ? this.props.bookTitle
        : '',
        bookImage: this.props
        ? this.props.bookImage
        : '',
        showLongTitle:false,
        shortBookTitle:'',
        open:false,
    };
  }
  componentDidMount(){
    this.state.bookTitle.length>0 ? this.cutLongString(this.state.bookTitle): false;

  }
  deleteMe=()=>{
    if (this.deleted) {
      this.deleted({
        bookId: this.state.id,
      });
    }
  };
  setBookValues=(o)=>{
       this.setState({authorName:o.authorName ? o.authorName: 'error'});
       this.setState({publishedDate: o.publishedDate ? o.publishedDate : ''});
       this.setState({bookTitle:o.bookTitle ? o.bookTitle :'erroe'});
  };

  setDateTime(itemDate) {
    const date = new Date(itemDate);
    const formateDate = dateFormat(date,"shortDate");
    return formateDate;
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
    handleClose = () => {
    this.setState({ open: false });
  };
  cutLongString=(str)=> {

      let newArray = [];
      const words = str.split(" ");
      if (words.length > 12) {
          for (let i = 0; i < 4; i++) {
              newArray[i] = words[i];
          }
          let newString = newArray.toString();
          const more='...';
          newString=newString.concat(more);
          this.setState({shortBookTitle:newString});
      }



  };


  toggleHover=()=>{
     this.setState(prevState => ({
      showLongTitle: !prevState.showLongTitle
    }));
  };
  render(){
    const { classes } = this.props;
    return(
        <div>

        <Card className={classes.card}>

          <CardContent>
            <Typography className="classes.title" color="primary" >
                <b>{this.state.showLongTitle ? this.state.bookTitle: this.state.shortBookTitle?  this.state.shortBookTitle : this.state.bookTitle}</b>
            </Typography>

             <Typography className="classes.blackTitle" >
                {this.state.authorName}
            </Typography>

            <Typography className="classes.blackTitle" >
                {this.state.publishedDate}
            </Typography>
            <div >
                <img src={this.state.bookImage} height="200"></img>
            </div>

          </CardContent>
        </Card>
            {this.state.shortBookTitle ?
                <Button size="small" color="secondary" onClick={this.toggleHover}>
                    {!this.state.showLongTitle ? 'more' : 'hide'}</Button> : ''}
            <Button  size="small" color="primary" onClick={this.handleOpen}>Edit</Button>
            <Button  size="small" color="secondary" onClick={this.deleteMe}><DeleteIcon/></Button>
            <MyModal
                open={this.state.open}
                close={()=> this.handleClose()}
                authorName={this.state.authorName? this.state.authorName:''}
                publishedDate={this.state.publishedDate ? this.state.publishedDate: '' }
                bookTitle={this.state.bookTitle? this.state.bookTitle :''}
                setBooksValues={(o) => {this.setBookValues(o)}}
            >
            </MyModal>

        </div>
      )
  }

}
Book.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Book);