/**
--- Day 3: Spiral Memory ---
http://adventofcode.com/2017/day/3

Each square on the grid is allocated in a spiral pattern starting at a location 
marked 1 and then counting up while spiraling outward. For example, the first 
few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must 
be carried back to square 1 (the location of the only access port for this memory 
system) by programs that can only move up, down, left, or right. They always 
take the shortest path: the Manhattan Distance between the location of the data 
and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your 
puzzle input all the way to the access port?

*/

'use strict';


const input = 368078;

function solve(input) {
  const initialState = { 
    x: 0, 
    y: 0,
    size: 1,
    dir: 'R',
    dirChangeCount: 0,
    sums: { '0,0': 1 },
    secondStar: undefined
  }

  const { x, y, secondStar } = [...Array(input + 1).keys()].splice(2, input)
    .reduce(reducer, initialState)

  return {
    firstStar: Math.abs(x) + Math.abs(y),
    secondStar
  }
}

function reducer({ x, y, dir, size, dirChangeCount, sums, secondStar }, n) {
  const { x: newX, y: newY } = move({ x, y, dir })

  if (!secondStar) {
    const sum = computeSum(sums, newX, newY)
    sums[`${newX},${newY}`] = sum
    if (sum > input) {
      secondStar = sum
    }
  }

  if (dirChangeCount === 4) {
    dirChangeCount = 0
    size++
  }

  let newDir = dir
  if (shouldChangeDir(dir, newX, newY, size)) {
    newDir = getNextDir(dir)
    dirChangeCount++
  }

  return { x: newX, y: newY, dir: newDir, size, dirChangeCount, sums, secondStar}
}

function move({ x, y, dir}) {
  switch(dir) {
    case 'R': return { x: ++x, y }
    case 'L': return { x: --x, y }
    case 'U': return { x, y: --y }
    case 'D': return { x, y: ++y }
  }
}

function shouldChangeDir(dir, x, y, size) {
  return (
    (['R', 'L'].includes(dir) && Math.abs(x) >= size) ||
    (['U', 'D'].includes(dir) && Math.abs(y) >= size)
  )
}

function getNextDir(dir) {
  return { 'R': 'U', 'U': 'L', 'L': 'D', 'D': 'R' }[dir]
}

function computeSum(sums, x, y) {
  const s = (x, y) => sums[`${x},${y}`] || 0
  return (
    s(x, y + 1) +
    s(x, y - 1) +
    s(x + 1, y - 1) +
    s(x + 1, y) +
    s(x + 1, y + 1) +
    s(x - 1, y - 1) +
    s(x - 1, y) +
    s(x - 1, y + 1)
  )
}

console.log(solve(input))
