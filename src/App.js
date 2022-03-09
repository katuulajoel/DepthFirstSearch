import { useEffect, useState } from "react";
import "./styles.css";
import dfs from "./coloralisation";

export default function App() {
  var grid = [
    ["a", "a", "a", "c"],
    ["b", "b", "a", "b"],
    ["b", "c", "c", "b"]
  ];

  // var grid = [ [ "a", "a", "a" ],
  //            [ "b", "b", "a" ],
  //            [ "b", "c", "c" ] ];

  const [colorGrid, setColorGrid] = useState(
    grid.map((row) => row.map((col) => ({ value: col, color: "grey" })))
  );

  const [colors, setColors] = useState(0);

  const setColor = (node, color) => {
    let _colorGrid = colorGrid;
    _colorGrid[node[0]][node[1]] = {
      value: grid[node[0]][node[1]],
      color
    };
    setColorGrid(_colorGrid);
  };

  useEffect(() => {
    setColors(dfs(grid, setColor));
  }, []);

  return (
    <div className="App">
      <h1>Colors: {colors}</h1>
      <div className="color_grid">
        {colorGrid?.map((row, i) => (
          <div className="grid_row" key={`row_${i}`}>
            {row.map((col, j) => (
              <div
                className="grid_col"
                key={`col_${j}`}
                style={{ backgroundColor: col.color }}
              >
                {col.value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
