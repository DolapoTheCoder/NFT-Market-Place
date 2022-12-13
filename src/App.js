import './App.css';
import MenuBar from './components/MenuBar';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import Test from './components/Test';

function App() {
  const FadeUp = batch(Fade(), Move(), Sticky());
  return (
    <>
      <MenuBar/>
      <div className="App">
        <ScrollContainer>
          <ScrollPage>
            <Animator animation={FadeUp}>
              <header>NFT Market Place!</header>
            </Animator>
          </ScrollPage>
          <ScrollPage>
              <Test/>
          </ScrollPage>
        </ScrollContainer>
      </div>
    </>
  );
}

export default App;