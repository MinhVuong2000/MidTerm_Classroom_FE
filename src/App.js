import Header from './Components/Header/Header';
import FormDialog from './Components/FormDialog/FormDialog';
import React from 'react'
import RouterURL from './Components/RouterURL/RouterURL';

export default function App() {
    return (
      <div>
        <Header/>
        <JoinClass sx={{display:"flex", justifyContent:"flex-end", marginTop:10}}/>
        <FormDialog sx={{display:"flex", justifyContent:"flex-end", marginTop:10}}/>
        <RouterURL/>
      </div>
    )
}