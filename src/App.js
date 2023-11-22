import './App.css';
import { useEffect, useState} from "react"
import axios from "axios";

function App() {

  const [data,setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(()=>{

    axios.get('https://gist.githubusercontent.com/anishbajpai014/d482191cb4fff429333c5ec64b38c197/raw/b11f56c3177a9ddc6649288c80a004e7df41e3b9/HiringTask.json')
    .then((res)=>{
      const text = res.data;
      const jsonData = text.startsWith('/') ? JSON.parse(text.substring(1)).data : text.data;
      setData(jsonData);
      const index = Math.floor(jsonData.length/2);
      setCurrentIndex(index)
    })
  },[])

  const handleSwipe = (direction) => {
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0) {
      setCurrentIndex(data.length-1);
      return;
    }
    if(newIndex === data.length){
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(newIndex)
  };

  return (
    <div className="card-slider">
      {data.map((card, index) => (
        <div
          key={index}
          className={`card ${index === currentIndex ? 'active' : ''}`}
        >
          <h2>{card.id}</h2>
          <p>{card.text}</p>
        </div>
      ))}
      <div className="navigation">
        <button onClick={() => handleSwipe('left')}>Swipe Left</button>
        <button onClick={() => handleSwipe('right')}>Swipe Right</button>
      </div>
    </div>
  );
}

export default App;
