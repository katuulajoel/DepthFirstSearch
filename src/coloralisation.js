var ROW = 0;
var COL = 0;

// Initialize direction vectors
var dRow = [0, 1, 0, -1];
var dCol = [-1, 0, 1, 0];

function isValid(vis, row, col) {
  // If cell is out of bounds
  if (row < 0 || col < 0 || row >= ROW || col >= COL) return false;

  // If the cell is already visited
  if (vis[row][col]) return false;

  // Otherwise, it can be visited
  return true;
}

function isColorable(row, col, color, grid) {
  if (grid[row][col] !== color) return false;

  // Otherwise, it can be visited
  return true;
}

// Function to perform DFS
// Traversal on the matrix grid[]
export default function (grid, setColor) {
  // TODO: for now only eight but this can be made dynamic with hex values
  let colorList = [
    "red",
    "blue",
    "green",
    "black",
    "purple",
    "brown",
    "orange",
    "pink"
  ];

  ROW = grid.length;
  COL = grid[0].length;

  var vis = Array.from(Array(ROW), () => Array(COL).fill(false));

  // Initialize a stack of pairs and
  // push the starting cell into it
  var st = [];
  st.push([0, 0]);

  var color = grid[0][0];
  var choosenColor = colorList[0];
  colorList.shift();
  var st2 = [];
  var colors = 1;

  // Iterate until the
  // stack is not empty
  while (st.length !== 0) {
    // Pop the top pair
    var curr = st[st.length - 1];
    st.pop();
    var row = curr[0];
    var col = curr[1];

    if (st.length === 0 && st2.length > 0) {
      var nextColor = st2[st2.length - 1];
      st2.pop();
      var _color = grid[nextColor[0]][nextColor[1]];
      if (isValid(vis, nextColor[0], nextColor[1])) {
        if (color !== _color) {
          colors++;
          choosenColor = colorList[0];
          colorList.shift();
        }
        color = _color;
        st.push([nextColor[0], nextColor[1]]);
      }
    }

    // Check if the current popped
    // cell is a valid cell or not
    if (!isValid(vis, row, col)) continue;

    if (!isColorable(row, col, color, grid)) {
      if (st2.findIndex((elem) => elem[0] === row && elem[1] === col) === -1)
        st2.push([row, col]);
      continue;
    }

    // Mark the current
    // cell as visited
    vis[row][col] = true;

    setColor([row, col], choosenColor);

    // Push all the adjacent cells
    for (var i = 0; i < 4; i++) {
      var adjx = row + dRow[i];
      var adjy = col + dCol[i];
      if (isValid(vis, adjx, adjy)) {
        st.push([adjx, adjy]);
      }
    }
  }

  return colors;
}
