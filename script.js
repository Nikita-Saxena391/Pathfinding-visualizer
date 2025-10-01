const grid = document.getElementById("grid");
const rows = 20, cols = 20;
let start = [0, 0];
let end = [rows - 1, cols - 1];
let gridArr = [];


function createGrid() {
  grid.innerHTML = "";
  gridArr = [];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      if (r === start[0] && c === start[1]) cell.classList.add("start");
      if (r === end[0] && c === end[1]) cell.classList.add("end");

      cell.addEventListener("click", () => {
        if (!cell.classList.contains("start") && !cell.classList.contains("end")) {
          cell.classList.toggle("wall");
        }
      });

      grid.appendChild(cell);
      row.push(cell);
    }
    gridArr.push(row);
  }
}


async function runBFS() {
  let queue = [start];
  let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  let parent = Array.from({ length: rows }, () => Array(cols).fill(null));

  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    let [r, c] = queue.shift();

    if (!(r === start[0] && c === start[1]) && !(r === end[0] && c === end[1])) {
      gridArr[r][c].classList.add("visited");
      await new Promise(resolve => setTimeout(resolve, 30));
    }

    if (r === end[0] && c === end[1]) {
      drawPath(parent);
      return;
    }

    let directions = [[1,0],[-1,0],[0,1],[0,-1]];
    for (let [dr, dc] of directions) {
      let nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && !gridArr[nr][nc].classList.contains("wall")) {
        queue.push([nr, nc]);
        visited[nr][nc] = true;
        parent[nr][nc] = [r, c];
      }
    }
  }
}


function drawPath(parent) {
  let [r, c] = end;
  while (parent[r][c] !== null) {
    [r, c] = parent[r][c];
    if (!(r === start[0] && c === start[1])) {
      gridArr[r][c].classList.add("path");
    }
  }
}


function resetGrid() {
  createGrid();
}

createGrid();
