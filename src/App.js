import './App.css';
import MenuBar from './components/MenuBar';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, Sticky } from "react-scroll-motion";
import ListNft from './components/ListNft';
import Home from './components/Home';

function App() {
  const FadeUp = batch(Fade(), Move(), Sticky());
  return (
    <>
      <MenuBar/>
      <div className="App">
        <ScrollContainer>
          <ScrollPage>
            <Animator animation={FadeUp}>
              <Home/>
            </Animator>
          </ScrollPage>
          <ScrollPage>
              <ListNft/>
          </ScrollPage>
        </ScrollContainer>
      </div>
    </>
  );
}

export default App;