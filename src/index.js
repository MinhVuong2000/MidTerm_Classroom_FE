import ReactDOM from 'react-dom';
import Classes from './Components/Classes/Classes';
import FormDialog from './Components/FormDialog/FormDialog';
import Header from './Components/Header/Header';


function App(){
  return (
    <div>
      <Header/>
      <FormDialog sx={{display:"flex", justifyContent:"flex-end", marginTop:10}}/>
      <Classes/>
    </div>
  )
}

// -------

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);