import { BrowserRouter, Route, Routes } from "react-router-dom"

import Body from "./Body"
import Login from "./Login"
import Profile from "./Profile"
import { Provider } from "react-redux"
import AppStore from "./utils/AppStore"
import Feed from "./Feed"
import Connections from "./Connections"
import Requests from "./Requests"
import Chat from "./Chat"

function App() {
 

  return (
    <>
    <Provider store={AppStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element = {<Body/>}>
              <Route path="/" element={<Feed/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/chat/:targetUserId" element={<Chat/>}/>

            </Route>

        
          </Routes>
        </BrowserRouter>
    </Provider>
    </>
     

   
   
    
  )
}

export default App
