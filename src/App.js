import React from 'react';
import ReactDOM from 'react-dom';

const randColorSeq = [
  { color: "#4FE0F3" },
  { color: "#E112E1" },
  { color: "#FAEB21" },
  { color: "#EB7C36" },
  { color: "#C2FF4B" },
  { color: "#46C74E" },
  { color: "#8907AE" },
  { color: "#465ED3" },
  { color: "#D5004A" }
];

function CheckButtonColor({
  seqCheck, defColor, ctr, btn
}) {
  const [btnColor, setButtonColor] = React.useState('');

  React.useEffect(() => {
    if (ctr === 0) {
      setButtonColor(defColor);
    }
  }, [ctr]);

  return (
    <button
      style={{ backgroundColor: `${btnColor}`, width: '150px', height: '65px', margin: '5px', borderRadius: '5px' }}
      onClick={(x) => {
        if (ctr < randColorSeq.length && btnColor === defColor) {
          let color = seqCheck(x, btn.color);
          if (color) {
            setButtonColor(color);
          }
        }
      }}
    >
    </button>
  );
}

function App() {
  const [buttons, setButtons] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [ctr, setCtr] = React.useState(0);
  const [changeColor, setChangeColor] = React.useState("#50A38E");

  const randomizeButtons = () => {
    const randomizedButtons = [...randColorSeq]
      .sort(() => Math.random() - 0.5)
      .map((color) => ({ ...color }));

    setButtons(randomizedButtons);
  };

  //shuffle the color sequence
  const randomizeColors = () => {
    const randomizedColors = [...randColorSeq]
      .sort(() => Math.random() - 0.5)
      .map((color) => ({ ...color }));

    setColors(randomizedColors);
    randomizeButtons();
  };
  //shuffle the buttons

  //check Sequence
  const seqCheck = (event, colorCode) => {
    let color = null;
    console.log(colorCode, colors[ctr].color, ctr);
    if (colorCode === colors[ctr].color) {
      console.log("correct");
      color = colorCode;
      setCtr((prevState) => {
        if (ctr === colors.length - 1) {
          alert("Good Job!");
          randomizeButtons();
          randomizeColors();
          return 0;
        }
        return prevState + 1;
      });
    } else {
      color = null;
      setCtr(0);
    }

    return color;
  };

  console.log(colors);

  return (
    <div className="App">
      <button onClick={randomizeColors} style={{ margin: '20px', position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
        New Game
      </button>

      <div className="seqColor" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', marginTop: 'calc(40vh - 50px)', marginBottom: '5px' }}>
        {colors.map((color, index) => (
          <div
            className="color"
            style={{ width: 40, height: 40 }}
            key={color.color}
          >
            <div
              className="box"
              style={{ width: 40, height: 40, backgroundColor: color.color }}
            />
          </div>
        ))}
      </div>

      <div className="btnColor" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '5px', justifyContent: 'center', alignItems: 'center', marginTop: '5px', marginBottom: '5px' }}>
        {buttons.map((btn) => (
          <div className="button" key={btn.color}>
            <CheckButtonColor
              ctr={ctr}
              seqCheck={seqCheck}
              defColor={changeColor}
              btn={btn}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
